import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { WhatIsKrishiLink } from '@/components/landing/WhatIsKrishiLink';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Benefits } from '@/components/landing/Benefits';
import { ContactSection } from '@/components/landing/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhatIsKrishiLink />
        <HowItWorks />
        <Benefits />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
