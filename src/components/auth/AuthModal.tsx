import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { indianStates } from '@/lib/indian-states';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'login' | 'register';
  onModeChange: (mode: 'login' | 'register') => void;
}

export const AuthModal = ({ open, onOpenChange, mode, onModeChange }: AuthModalProps) => {
  const { t } = useLanguage();
  const { signUp, signIn, resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  
  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [role, setRole] = useState<'farmer' | 'buyer'>('farmer');
  const [password, setPassword] = useState('');
  const [loginIdentifier, setLoginIdentifier] = useState('');

  const validateMobile = (value: string) => /^\d{10}$/.test(value);
  const validateEmail = (value: string) => value.includes('@');
  const validatePassword = (value: string) => /^(?=.*[A-Za-z])(?=.*\d).+$/.test(value);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateMobile(mobile)) {
      toast({ title: 'Invalid mobile number', description: 'Please enter a 10-digit mobile number', variant: 'destructive' });
      return;
    }
    if (!validateEmail(email)) {
      toast({ title: 'Invalid email', description: 'Please enter a valid email address', variant: 'destructive' });
      return;
    }
    if (!validatePassword(password)) {
      toast({ title: 'Weak password', description: 'Password must contain at least one letter and one number', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, {
      first_name: firstName,
      last_name: lastName || null,
      mobile: `+91${mobile}`,
      state,
      district,
      village,
      postal_code: postalCode,
      role,
    });
    setLoading(false);

    if (error) {
      toast({ title: 'Registration failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Registration successful!', description: 'Please check your email to verify your account.' });
      onOpenChange(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(loginIdentifier, password);
    setLoading(false);

    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
      onOpenChange(false);
      navigate('/dashboard');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: 'Email required', description: 'Please enter your email address', variant: 'destructive' });
      return;
    }
    
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      toast({ title: 'Reset failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Check your email', description: 'Password reset link has been sent.' });
      setShowResetPassword(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading gradient-text">
            {showResetPassword ? t('auth.resetPassword') : mode === 'login' ? t('auth.welcomeBack') : t('auth.createAccount')}
          </DialogTitle>
        </DialogHeader>

        {showResetPassword ? (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">{t('auth.email')}</Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('auth.resetPassword')}
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={() => setShowResetPassword(false)}>
              Back to Login
            </Button>
          </form>
        ) : mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">{t('auth.loginWith')}</Label>
              <Input
                id="identifier"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                placeholder="Username, Email, or Mobile"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={() => setShowResetPassword(true)}
            >
              {t('auth.forgotPassword')}
            </Button>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('auth.login')}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button type="button" variant="link" className="p-0 h-auto" onClick={() => onModeChange('register')}>
                Register
              </Button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('auth.firstName')}</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('auth.lastName')}</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">{t('auth.mobile')}</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md text-sm text-muted-foreground">
                  +91
                </span>
                <Input
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="rounded-l-none"
                  placeholder="10-digit number"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('auth.state')}</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">{t('auth.district')}</Label>
                <Input
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="village">{t('auth.village')}</Label>
                <Input
                  id="village"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">{t('auth.postalCode')}</Label>
                <Input
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-digit code"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('auth.role')}</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={role === 'farmer' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setRole('farmer')}
                >
                  🌾 {t('auth.farmer')}
                </Button>
                <Button
                  type="button"
                  variant={role === 'buyer' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setRole('buyer')}
                >
                  🛒 {t('auth.buyer')}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password">{t('auth.password')}</Label>
              <div className="relative">
                <Input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Must contain letter and number"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('auth.register')}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button type="button" variant="link" className="p-0 h-auto" onClick={() => onModeChange('login')}>
                Login
              </Button>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
