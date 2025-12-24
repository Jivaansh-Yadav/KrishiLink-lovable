import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import type { User } from '@/integrations/supabase';

interface AuthContextType {
  user: SupabaseUser | null;
  profile: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: Error | null }>;
  signIn: (identifier: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateProfile: (data: Partial<User>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!error && data) {
      setProfile(data as User);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const generateUsername = (role: string) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${role}${randomNum}`;
  };

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      const username = generateUsername(userData.role || 'user');
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const insertData = {
          id: data.user.id,
          email,
          username,
          first_name: userData.first_name || '',
          mobile: userData.mobile || '',
          state: userData.state || '',
          district: userData.district || '',
          village: userData.village || '',
          postal_code: userData.postal_code || '',
          role: userData.role || 'farmer',
          last_name: userData.last_name || null,
        };
        
        const { error: profileError } = await supabase
          .from('users')
          .insert(insertData as never);

        if (profileError) throw profileError;
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (identifier: string, password: string) => {
    try {
      let email = identifier;

      // Check if identifier is not an email
      if (!identifier.includes('@')) {
        const { data: userData } = await supabase
          .from('users')
          .select('email')
          .or(`username.eq.${identifier},mobile.eq.${identifier}`)
          .single();

        if (userData) {
          email = (userData as { email: string }).email;
        }
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      const { error } = await supabase
        .from('users')
        .update(data as never)
        .eq('id', user.id);

      if (error) throw error;
      
      await fetchProfile(user.id);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
