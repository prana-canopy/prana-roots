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
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <RotatingCarousel />
      </div>
      {/* Services */}
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <ServicesSection />
      </div>
      {/* About */}
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <AboutSection />
      </div>
      {/* Why Choose */}
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <WhyChooseSection />
      </div>
      {/* Our Process */}
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <ProcessSection />
      </div>
      {/* Portfolio */}
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <PortfolioSection />
      </div>
      {/* Pricing */}
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <PricingSection />
      </div>
      {/* Contact */}
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <ContactSection />
      </div>
      {/* FAQ */}
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <FAQSection />
      </div>
      {/* Insights */}
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <InsightsSection />
      </div>

      {/* Content Sections */}
      <div className="w-full max-w-6xl mx-auto px-8 py-24 space-y-32">
        {/* Feature Section */}
        <div className="relative rounded-2xl border bg-gradient-to-r from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)] p-12 overflow-hidden shadow-2xl dark:bg-gradient-to-r dark:from-[var(--dark-megaman)] dark:via-[var(--dark-frozen-turquoise)] dark:to-[var(--dark-heart-of-ice)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--megaman)]/10 to-[var(--frozen-turquoise)]/10 opacity-75 dark:from-[var(--dark-megaman)]/10 dark:to-[var(--dark-frozen-turquoise)]/10" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent dark:from-[var(--dark-megaman)] dark:to-[var(--dark-frozen-turquoise)]">
              Why Choose Prana Local?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="space-y-4 transform hover:scale-105 transition-transform duration-300"
                  aria-labelledby={`feature-title-${index}`}
                >
                  <h3
                    id={`feature-title-${index}`}
                    className="text-2xl font-semibold text-[var(--megaman)] dark:text-[var(--dark-megaman)]"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg dark:text-muted-foreground-dark">
                    {feature.description}
                  </p>
                  {feature.cta && (
                    <button
                      className="mt-2 inline-flex items-center justify-center rounded-md text-base font-medium
                      bg-[var(--frozen-turquoise)] text-white hover:bg-[var(--megaman)]
                      px-6 py-2 transition-all duration-200 hover:scale-105
                      shadow-md hover:shadow-lg"
                      aria-label={`Learn more about ${feature.title}`}
                    >
                      {feature.cta}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8 py-16 bg-gradient-to-b from-[var(--frozen-turquoise)]/10 to-[var(--heart-of-ice)]/10 rounded-2xl shadow-xl">
          <button
            className="inline-flex items-center justify-center rounded-full text-lg font-medium
              bg-[var(--megaman)] text-white hover:bg-[var(--frozen-turquoise)]
              px-12 py-4 transition-all duration-300 hover:scale-110
              shadow-lg hover:shadow-2xl"
            aria-label="Get Started with Prana Local"
          >
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}