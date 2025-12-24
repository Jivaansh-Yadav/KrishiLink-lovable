import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Youtube, 
  Instagram, 
  Facebook, 
  Twitter 
} from 'lucide-react';
import { Logo } from './Logo';
import { DateTimeBar } from './DateTimeBar';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: Mail, label: 'support@krishilink.in', href: 'mailto:support@krishilink.in' },
    { icon: Phone, label: '+91 1800-XXX-XXXX', href: 'tel:+911800XXXXXX' },
    { icon: MessageCircle, label: 'WhatsApp Support', href: 'https://wa.me/911234567890' },
  ];

  const quickLinks = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.benefits'), href: '#benefits' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'X (Twitter)' },
  ];

  return (
    <footer className="bg-krishi-green-900 text-krishi-green-100">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-krishi-green-200 text-sm leading-relaxed">
              Connecting farmers with buyers for direct crop trading at fair prices. 
              Empowering Indian agriculture, one transaction at a time.
            </p>
            <div className="flex items-center gap-2 text-sm text-krishi-green-300">
              <MapPin className="h-4 w-4" />
              <span>{t('footer.address')}, New Delhi, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-krishi-green-200 hover:text-krishi-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href}
                    className="flex items-center gap-2 text-krishi-green-200 hover:text-krishi-gold transition-colors text-sm"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">{t('footer.social')}</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-krishi-green-800 hover:bg-krishi-gold rounded-lg transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-krishi-green-200 group-hover:text-krishi-green-900" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-krishi-green-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-krishi-green-300">
            {t('footer.madeWith')} • {t('footer.developedBy')}
          </p>
          <p className="text-sm text-krishi-green-400">
            © {new Date().getFullYear()} KrishiLink. All rights reserved.
          </p>
        </div>
      </div>
      <DateTimeBar />
    </footer>
  );
};
