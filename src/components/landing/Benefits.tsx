import { Check, TrendingUp, Users, Shield, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Benefits = () => {
  const { t } = useLanguage();

  const farmerBenefits = [
    { icon: TrendingUp, text: t('benefits.farmers.point1') },
    { icon: Users, text: t('benefits.farmers.point2') },
    { icon: Shield, text: t('benefits.farmers.point3') },
    { icon: Phone, text: t('benefits.farmers.point4') },
  ];

  const buyerBenefits = [
    { icon: Check, text: t('benefits.buyers.point1') },
    { icon: TrendingUp, text: t('benefits.buyers.point2') },
    { icon: Users, text: t('benefits.buyers.point3') },
    { icon: Phone, text: t('benefits.buyers.point4') },
  ];

  return (
    <section id="benefits" className="py-20 section-pattern">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">{t('benefits.title')}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Farmers */}
          <div className="bg-gradient-to-br from-krishi-green-600 to-krishi-green-800 rounded-2xl p-8 text-krishi-green-50">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🌾</span>
              <h3 className="text-2xl font-heading font-bold">{t('benefits.farmers.title')}</h3>
            </div>
            <ul className="space-y-4">
              {farmerBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-krishi-gold/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-4 w-4 text-krishi-gold-light" />
                  </div>
                  <span className="text-krishi-green-100">{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buyers */}
          <div className="bg-gradient-to-br from-krishi-gold to-krishi-earth rounded-2xl p-8 text-krishi-green-900">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🛒</span>
              <h3 className="text-2xl font-heading font-bold">{t('benefits.buyers.title')}</h3>
            </div>
            <ul className="space-y-4">
              {buyerBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-krishi-green-900/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-4 w-4 text-krishi-green-900" />
                  </div>
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
