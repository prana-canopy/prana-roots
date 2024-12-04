'use client';
import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import AnimatedToucan from './toucan-poly';

interface Feature {
  title: string;
  description: string;
  cta?: string;
}

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

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const toucanRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme: theme } = useTheme();

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

  return (
    <section className="relative w-full mt-12 sm:mt-24 overflow-hidden">
      {/* Background with grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Main Hero Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
        {/* Floating Toucan Container - Positioned absolutely */}
        <div 
          ref={containerRef} 
          className="absolute top-12 lg:top-1/2 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:-translate-x-0 lg:-translate-y-1/2 
                     w-screen lg:w-[800px] h-screen lg:h-[800px] xl:w-[900px] xl:h-[900px] 
                     transform-gpu pointer-events-none
                     opacity-15 lg:opacity-90 transition-opacity duration-300
                     flex items-start lg:items-center justify-center"
          style={{ willChange: 'transform' }}
        >
          <div 
            ref={toucanRef} 
            className="w-[90vw] h-[90vw] sm:w-[70vw] sm:h-[70vw] lg:w-full lg:h-full"
          >
            <AnimatedToucan theme={theme || 'dark'} />
          </div>
        </div>

        {/* Content Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-80px)]">
          {/* Main Content - Takes up more space */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-8 pt-4 sm:pt-8 lg:pt-0">
            <div className="space-y-6 relative backdrop-blur-sm lg:backdrop-blur-none bg-background/50 lg:bg-transparent rounded-2xl lg:rounded-none p-6 lg:p-0">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text leading-[1.1] relative">
                Elevate Your Digital Presence
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground relative">
                Transform your online presence with our cutting-edge web solutions. We specialize in creating stunning, high-performance websites that drive results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-lg font-medium transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            {/* Features Grid - Spans full width on mobile, partial on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              <div className="absolute -right-24 bottom-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="
                    p-6 rounded-xl border bg-background/80 backdrop-blur-sm
                    hover:bg-background/90 transition-colors duration-200
                    shadow-sm hover:shadow-md
                    relative z-10
                  "
                >
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Spacer for Toucan overlap - only visible on large screens */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 relative min-h-[600px]"></div>
        </div>
      </div>

      {/* Gradient Transition */}
      <div className="
        absolute bottom-0 left-0 right-0 h-32
        bg-gradient-to-b from-transparent to-background/95
        pointer-events-none
      "/>
    </section>
  );
}
