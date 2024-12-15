'use client';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';
import RotatingCarousel from '@/components/success-stories';
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
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
      const timer = setTimeout(() => setIsInitialLoad(false), 2000);
      return () => clearTimeout(timer);
   }, []);

   return (
      <main className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden">
         {/* Global Theme-aware Background Pattern */}
         <div className="fixed inset-0 -z-10" aria-hidden="true">
            {mounted && (
               <>
                  <div className={`absolute inset-0 ${theme === 'dark' ? 'gradient-1-dark' : 'gradient-1-light'}`} />
                  <div className={`absolute inset-0 ${theme === 'dark' ? 'gradient-2-dark' : 'gradient-2-light'}`} />
                  <div className={`absolute inset-0 ${theme !== 'dark' ? 'gradient-3-light' : ''}`} />
               </>
            )}
            <style jsx>{`
          .gradient-1-light {
            background: radial-gradient(circle at 50% 150%, rgba(45, 212, 191, 0.08), rgba(255, 255, 255, 0));
          }
          .gradient-1-dark {
            background: radial-gradient(circle at 50% 120%, rgba(120, 119, 198, 0.2), rgba(255, 255, 255, 0));
          }
          .gradient-2-light {
            background: radial-gradient(circle 1000px at 50% -20%, rgba(56, 189, 248, 0.05), transparent);
          }
          .gradient-2-dark {
            background: radial-gradient(circle at 50% 0%, rgba(255, 226, 132, 0.08), rgba(255, 255, 255, 0));
          }
          .gradient-3-light {
            background: radial-gradient(circle 800px at 60% 50%, rgba(94, 234, 212, 0.05), transparent);
          }
        `}</style>
         </div>

         <Navbar />
         <Hero />
         {/* Remove individual section backgrounds and use consistent spacing */}
         <div className="w-full space-y-24 md:space-y-32 lg:space-y-48">
            {/* <ProcessSection /> */}

            {/* <RotatingCarousel /> */}

            {/* <ServicesSection /> */}
            {/* <AboutSection /> */}
            {/* <WhyChooseSection /> */}

            {/* <PortfolioSection /> */}

            {/* <PricingSection /> 
        */}
            {/* <ContactSection />
        <FAQSection /> */}
            {/* <InsightsSection /> */}
         </div>
      </main>
   );
}