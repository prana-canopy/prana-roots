'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';
import RotatingCarousel from '@/components/rotating-carousel';
import { Navbar } from '@/components/navbar';

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

// Memoized polygon configuration
const polygons = [
  // Base Shape
  { id: 1, clipPath: 'polygon(40% 40%, 60% 40%, 50% 60%)', color: 'var(--frozen-turquoise)', translateZ: '0px' },
  { id: 2, clipPath: 'polygon(35% 35%, 65% 35%, 50% 45%)', color: 'var(--megaman)', translateZ: '5px' },
  { id: 3, clipPath: 'polygon(30% 30%, 70% 30%, 50% 40%)', color: 'var(--heart-of-ice)', translateZ: '10px' },
  
  // Beak
  { id: 4, clipPath: 'polygon(45% 40%, 55% 40%, 50% 50%)', color: 'var(--lime-lightning)', translateZ: '20px' },
  { id: 5, clipPath: 'polygon(47% 42%, 53% 42%, 50% 48%)', color: 'var(--electric-lettuce)', translateZ: '25px' },
  { id: 6, clipPath: 'polygon(48% 44%, 52% 44%, 50% 46%)', color: 'var(--thallium-flame)', translateZ: '30px' },
  
  // Head Detail
  { id: 7, clipPath: 'polygon(35% 35%, 45% 30%, 40% 40%)', color: 'var(--fake-jade)', translateZ: '15px' },
  { id: 8, clipPath: 'polygon(55% 30%, 65% 35%, 60% 40%)', color: 'var(--fake-jade)', translateZ: '15px' },
  
  // Wings - More Dynamic
  { id: 9, clipPath: 'polygon(25% 45%, 45% 40%, 35% 60%)', color: 'var(--thallium-flame)', translateZ: '15px' },
  { id: 10, clipPath: 'polygon(55% 40%, 75% 45%, 65% 60%)', color: 'var(--thallium-flame)', translateZ: '15px' },
  
  // Eyes - More Prominent
  { id: 11, clipPath: 'polygon(42% 31%, 45% 34%, 43% 37%)', color: '#FFFFFF', translateZ: '40px' },
  { id: 12, clipPath: 'polygon(43% 32%, 44.5% 34%, 43.5% 36%)', color: 'var(--eye-pupil)', translateZ: '45px' },
  { id: 13, clipPath: 'polygon(57% 31%, 60% 34%, 58% 37%)', color: '#FFFFFF', translateZ: '40px' },
  { id: 14, clipPath: 'polygon(58% 32%, 59.5% 34%, 58.5% 36%)', color: 'var(--eye-pupil)', translateZ: '45px' },
  
  // Additional Detail Layers
  { id: 15, clipPath: 'polygon(40% 55%, 45% 60%, 42% 65%)', color: 'var(--megaman)', translateZ: '5px' },
  { id: 16, clipPath: 'polygon(55% 55%, 60% 60%, 58% 65%)', color: 'var(--megaman)', translateZ: '5px' },
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
<div className="w-full max-w-7xl mx-auto px-8 mt-16 -mb-12 md:-mb-8 lg:mb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start relative">
          {/* Left Content */}
          <div className="space-y-14 pt-4 md:pt-8">
            <div className="text-center py-6">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 bg-clip-text text-transparent drop-shadow-md">
                Innovate Locally with Cutting-Edge Technology
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto italic">
                Empowering local enterprises with state-of-the-art solutions, insightful analytics, and seamless digital integration to elevate your business.
              </p>
              <button 
                className="mt-6 px-8 py-3 bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                aria-label="Explore Our Solutions"
              >
                Explore Our Solutions
              </button>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl 
              text-gray-600 dark:text-slate-200 important-text
              tracking-wider font-light">
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-6 justify-start items-center pt-4">
            </div>
          </div>

          {/* Toucan Container */}
          <div className="relative w-full flex justify-center md:justify-end lg:w-auto lg:block lg:absolute lg:top-[-160px] lg:right-[-180px] xl:right-[-240px]">
            <div ref={containerRef} className="toucan-container cursor-pointer">
              <div className="toucan-shadow">
                {polygons.map((polygon) => (
                  <div
                    key={`shadow-${polygon.id}`}
                    className="polygon-shadow cursor-pointer"
                    style={{
                      clipPath: polygon.clipPath,
                    }}
                  />
                ))}
              </div>
              <div ref={toucanRef} className="toucan-wrap cursor-pointer">
                {polygons.map((polygon) => (
                  <div 
                    key={polygon.id} 
                    className={`polygon ${isInitialLoad ? 'fly-in' : ''}`}
                    style={{
                      clipPath: polygon.clipPath,
                      backgroundColor: polygon.color,
                      transform: `translateZ(${polygon.translateZ})`,
                      animationDelay: `${(polygon.id * 0.1)}s`,
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>
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