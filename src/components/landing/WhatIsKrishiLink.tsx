import { Users, Scale, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const WhatIsKrishiLink = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t('what.feature1.title'),
      description: t('what.feature1.desc'),
    },
    {
      icon: Scale,
      title: t('what.feature2.title'),
      description: t('what.feature2.desc'),
    },
    {
      icon: MessageCircle,
      title: t('what.feature3.title'),
      description: t('what.feature3.desc'),
    },
  ];

  return (
    <section id="about" className="py-20 section-pattern">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            <span className="gradient-text">{t('what.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('what.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-krishi-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
