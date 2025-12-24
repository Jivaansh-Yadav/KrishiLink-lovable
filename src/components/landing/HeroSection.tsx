import { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import heroBg from '@/assets/hero-bg.jpg';

export const HeroSection = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Indian farmers in lush green fields"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-krishi-green-900/90 via-krishi-green-900/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-2 bg-krishi-gold/20 text-krishi-gold-light rounded-full text-sm font-medium mb-6">
              🌾 Empowering Indian Farmers
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-krishi-green-50 leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t('hero.title')}
            <span className="block text-gradient-gold mt-2">Direct. Fair. Simple.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-krishi-green-200 mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              className="bg-krishi-gold hover:bg-krishi-gold-light text-krishi-green-900 font-semibold gap-2"
              onClick={() => {
                if (user) {
                  window.location.href = '/dashboard';
                } else {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }
              }}
            >
              {t('hero.cta')}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-krishi-green-200/30 text-krishi-green-100 hover:bg-krishi-green-800/50 gap-2"
            >
              <Play className="h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-krishi-green-700/50 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div>
              <p className="text-3xl font-heading font-bold text-krishi-gold">10K+</p>
              <p className="text-sm text-krishi-green-300">Active Farmers</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-krishi-gold">5K+</p>
              <p className="text-sm text-krishi-green-300">Verified Buyers</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-krishi-gold">₹50Cr+</p>
              <p className="text-sm text-krishi-green-300">Trade Value</p>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </section>
  );
};
