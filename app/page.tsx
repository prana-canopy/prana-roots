'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';
import RotatingCarousel from '@/components/rotating-carousel';
import { Navbar } from '@/components/navbar';
import { Toucan } from '@/components/toucan';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const toucanRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();


  // Consolidated load effect
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Optimized toucan animation
  useEffect(() => {
    const container = containerRef.current;
    const toucan = toucanRef.current;
    if (!container || !toucan) return;

    let bounds = container.getBoundingClientRect();
    let mouseX = bounds.left + bounds.width / 2;
    let mouseY = bounds.top + bounds.height / 2;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      bounds = container.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      mouseX = e.clientX;
      mouseY = e.clientY;

      targetRotateY = ((mouseX - centerX) / (window.innerWidth / 2)) * 25;
      targetRotateX = ((mouseY - centerY) / (window.innerHeight / 2)) * -25;
    };

    const animate = () => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;

      toucan.style.transform = `
        rotateX(${currentRotateX}deg) 
        rotateY(${currentRotateY}deg)
      `;

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateRotation = useCallback((mouseX: number, mouseY: number) => {
    if (toucanRef.current) {
      const toucanRect = toucanRef.current.getBoundingClientRect();
      const toucanCenterX = toucanRect.left + toucanRect.width / 2;
      const toucanCenterY = toucanRect.top + toucanRect.height / 2;

      const dx = mouseX - toucanCenterX;
      const dy = mouseY - toucanCenterY;

      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      return Math.max(-25, Math.min(25, angle));
    }
    return 0;
  }, []);

  const isThemeToggleClick = useCallback((e: MouseEvent) => {
    const target = e.target as Element;
    return !!(
      target.closest('.theme-toggle') ||
      target.closest('button[aria-label="Toggle theme"]') ||
      target.closest('svg')
    );
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden">
      <Navbar />
{/* Hero Section */}
<div className="
  relative w-full max-w-7xl mx-auto 
  px-4 sm:px-6 lg:px-8 
  min-h-[80vh] 
  flex flex-col justify-center
  pt-24 lg:pt-32
">
  {/* Toucan Container - Improved responsive positioning */}
  <div className="
    absolute 
    right-[-20px] sm:right-[40px] md:right-[40px] lg:right-00  // Adjusted right positioning
    top-1/2 transform -translate-y-1/3
    w-[50px] sm:w-[300px] md:w-[400px] lg:w-[600px]  // Reduced base width
    pointer-events-none
    overflow-visible  // Allow overflow for animation
  ">
    <div className="
      relative
      transform-gpu
      scale-[0.25] sm:scale-[0.35] md:scale-[0.45] lg:scale-[0.85] xl:scale-[1]  // Smaller initial scales
    ">
      <Toucan 
        scale={1}
        enableEyeTracking 
        className="
          transform 
          transition-all duration-500
          hover:scale-[1.05]
        "
      />
    </div>
  </div>

  {/* Text Content - Adjusted max-width for better spacing */}
  <div className="relative z-10 max-w-[100%] sm:max-w-[80%] md:max-w-[650px]">
    <h1 className="
      text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
      font-bold leading-tight
      text-gray-600
    ">
      Empowering Businesses with{' '}
      <span className="
        inline-block
        bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)]
        bg-clip-text text-transparent
      ">
        Nature-Inspired Innovation
      </span>
    </h1>
    
    <p className="
      mt-6 
      text-base sm:text-lg md:text-xl
      text-gray-300
      max-w-[100%] sm:max-w-[500px]
      leading-relaxed
      metallic-shine
    ">
      Prana's local branch offers boutique-quality websites and data solutions, integrating technology and nature. Our services empower businesses with security and innovation, fostering growth and sustainability.
    </p>

    <div className="mt-8 flex flex-wrap gap-4">
{/* Update button colors */}
<button className="
  px-8 py-4
  bg-gradient-to-r from-[var(--primary)] to-[var(--accent-green)]
  text-white font-semibold 
  rounded-full 
  shadow-lg hover:shadow-xl 
  transition-all duration-300
  hover:scale-105
  glow
">
  Explore Solutions
</button>
      <button className="
  px-8 py-4
  border-2 border-[var(--primary)]
  text-[var(--primary)]
  hover:bg-gradient-to-r hover:from-[var(--primary)] hover:to-[var(--accent-green)]
  font-semibold 
  rounded-full 
  transition-all duration-300
  hover:text-white
">
  Learn More
</button>
    </div>
  </div>
</div>

      {/* Rotating Carousel */}
      <div className="w-full py-4 md:py-8 lg:py-16 bg-gradient-to-b from-transparent to-background/80">
        <RotatingCarousel />
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