export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          first_name: string;
          last_name: string | null;
          username: string;
          email: string;
          mobile: string;
          state: string;
          district: string;
          village: string;
          postal_code: string;
          role: 'farmer' | 'buyer' | 'admin';
          alternate_mobile: string | null;
          whatsapp_number: string | null;
          profile_photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name?: string | null;
          username: string;
          email: string;
          mobile: string;
          state: string;
          district: string;
          village: string;
          postal_code: string;
          role: 'farmer' | 'buyer' | 'admin';
          alternate_mobile?: string | null;
          whatsapp_number?: string | null;
          profile_photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string | null;
          username?: string;
          email?: string;
          mobile?: string;
          state?: string;
          district?: string;
          village?: string;
          postal_code?: string;
          role?: 'farmer' | 'buyer' | 'admin';
          alternate_mobile?: string | null;
          whatsapp_number?: string | null;
          profile_photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      crops: {
        Row: {
          id: string;
          user_id: string;
          crop_name: string;
          quantity_kg: number;
          price_per_kg: number;
          image_url: string | null;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          crop_name: string;
          quantity_kg: number;
          price_per_kg: number;
          image_url?: string | null;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          crop_name?: string;
          quantity_kg?: number;
          price_per_kg?: number;
          image_url?: string | null;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      support: {
        Row: {
          id: string;
          user_id: string | null;
          subject: string;
          message: string;
          status: 'pending' | 'in_progress' | 'resolved';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          subject: string;
          message: string;
          status?: 'pending' | 'in_progress' | 'resolved';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          subject?: string;
          message?: string;
          status?: 'pending' | 'in_progress' | 'resolved';
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: 'farmer' | 'buyer' | 'admin';
      support_status: 'pending' | 'in_progress' | 'resolved';
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export type User = Tables<'users'>;
export type Crop = Tables<'crops'>;
export type Support = Tables<'support'>;
