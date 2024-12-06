'use client';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';
import RotatingCarousel from '@/components/rotating-carousel';
import { Navbar } from '@/components/navbar';
import ServicesSection from '@/components/services';
import WhyChooseSection from '@/components/why-choose';
import ProcessSection from '@/components/our-process';
import PortfolioSection from '@/components/portfolio-section';
import PricingSection from '@/components/pricing';
import ContactSection from '@/components/contact';
import FAQSection from '@/components/faq';
import InsightsSection from '@/components/insights';
import AboutSection from '@/components/about';
import Hero from '@/components/hero';

interface Feature {
  title: string;
  description: string;
  cta?: string;
}

// Enhanced features with CTAs
const features: Feature[] = [
  {
    title: "Enterprise-Grade Solutions",
    description: "Access powerful tools and technologies typically reserved for large enterprises",
    cta: "Explore Solutions"
  },
  {
    title: "Local Support",
    description: "Get personalized support from our local team of experts",
    cta: "Contact Team"
  },
  {
    title: "Scalable Platform",
    description: "Grow your business with solutions that scale with your needs",
    cta: "View Options"
  },
  {
    title: "Data Security",
    description: "Keep your business data secure with enterprise-level security measures",
    cta: "Learn More"
  }
];

export default function Home() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { resolvedTheme: theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden">
      <Navbar />
      <Hero />
      {/* Rotating Carousel */}
      {/* <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <RotatingCarousel />
      </div>
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <ServicesSection />
      </div>
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <AboutSection />
      </div>
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <WhyChooseSection />
      </div>
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <ProcessSection />
      </div>
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <PortfolioSection />
      </div>
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <PricingSection />
      </div>
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <ContactSection />
      </div>
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <FAQSection />
      </div>
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <InsightsSection />
      </div> */}

    </main>
  );
}