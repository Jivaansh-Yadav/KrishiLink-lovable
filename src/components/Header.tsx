import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { AuthModal } from './auth/AuthModal';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#how-it-works', label: t('nav.howItWorks') },
    { href: '#benefits', label: t('nav.benefits') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setAuthMode('register');
      setAuthModalOpen(true);
    }
  };

  const handleLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            {user ? (
              <>
                <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                  {t('nav.dashboard')}
                </Button>
                <Button variant="outline" onClick={signOut}>
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={handleLogin} className="hidden sm:inline-flex">
                  {t('nav.login')}
                </Button>
                <Button onClick={handleGetStarted}>
                  {t('nav.getStarted')}
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <nav className="container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-2 px-4 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {!user && (
                <Button variant="ghost" onClick={handleLogin} className="justify-start">
                  {t('nav.login')}
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};
