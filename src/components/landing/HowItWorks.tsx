import { UserPlus, Search, PhoneCall, Handshake } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: UserPlus,
      step: '01',
      title: t('how.step1.title'),
      description: t('how.step1.desc'),
    },
    {
      icon: Search,
      step: '02',
      title: t('how.step2.title'),
      description: t('how.step2.desc'),
    },
    {
      icon: PhoneCall,
      step: '03',
      title: t('how.step3.title'),
      description: t('how.step3.desc'),
    },
    {
      icon: Handshake,
      step: '04',
      title: t('how.step4.title'),
      description: t('how.step4.desc'),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">{t('how.title')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple steps to start trading crops directly
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-krishi-gold to-primary transform -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-card border-4 border-primary flex items-center justify-center shadow-lg mx-auto">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-krishi-gold rounded-full flex items-center justify-center text-sm font-bold text-krishi-green-900">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
