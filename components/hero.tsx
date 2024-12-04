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
    title: "Technical Excellence",
    description: "Bringing enterprise-grade engineering expertise to create solutions that scale with your ambitions."
  },
  {
    title: "Creative Vision",
    description: "Thoughtfully crafted digital experiences that resonate with your audience and elevate your brand."
  },
  {
    title: "Strategic Growth",
    description: "Data-driven strategies and solutions that consistently deliver meaningful results for your business."
  },
  {
    title: "Proven Expertise",
    description: "Years of experience solving complex technical challenges, now focused on empowering local businesses."
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
          className="absolute top-12 lg:top-0 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:-translate-x-[5%]
                     w-screen lg:w-[800px] h-screen lg:h-[800px] xl:w-[900px] xl:h-[900px] 2xl:w-[1000px] 2xl:h-[1000px]
                     transform-gpu pointer-events-none
                     opacity-15 lg:opacity-90 transition-opacity duration-300
                     flex items-start lg:items-start justify-center"
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
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-start min-h-[calc(100vh-80px)]">
          {/* Main Content */}
          <div className="space-y-8 pt-4 sm:pt-8 lg:pt-12">
            <div className="space-y-6 relative backdrop-blur-sm lg:backdrop-blur-none bg-background/50 lg:bg-transparent rounded-2xl lg:rounded-none p-6 lg:p-0">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-sky-300 text-transparent bg-clip-text leading-[1.1] pb-1 relative">
                Crafted with Purpose.<br/>
                <span className="inline-block mt-1">Built for Growth.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground relative">
                Deep technical expertise meets genuine creative vision. We build sophisticated digital solutions that help ambitious local businesses thrive in the modern landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-lg 
                  font-medium transition-colors cursor-pointer">
                  Start Your Journey
                </button>
              </div>
            </div>

            {/* Features Grid - Mobile Only */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative lg:hidden">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-xl bg-background/80 backdrop-blur-sm
                    hover:bg-background/90 transition-colors duration-200
                    shadow-sm hover:shadow-md
                    relative z-10 cursor-pointer"
                >
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid - Desktop Only */}
          <div className="hidden lg:block relative">
            <div className="relative mt-[15%] pr-12">
              {features.map((feature, index) => {
                const positions = [
                  "left-0 top-0",
                  "left-[50%] top-0",
                  "left-0 top-[60%]",
                  "left-[50%] top-[60%]"
                ];
                
                return (
                  <div 
                    key={index} 
                    className={`absolute ${positions[index]} w-[280px] group
                      transition-transform duration-300 ease-out hover:z-10`}
                  >
                    <div className="relative bg-background/60 backdrop-blur-md 
                      rounded-xl shadow-sm
                      hover:bg-background/80 hover:shadow-md
                      transition-all duration-300 cursor-pointer">
                      
                      {/* Content */}
                      <div className="p-5 min-h-[100px] select-none">
                        {/* The title that shows by default */}
                        <h3 className="font-medium text-lg text-foreground/90 
                          transition-colors duration-300 group-hover:opacity-0">
                          {feature.title}
                        </h3>
                        
                        {/* Description with integrated title */}
                        <div className="absolute inset-0 rounded-xl bg-background/95 
                          opacity-0 group-hover:opacity-100 transition-all duration-300
                          flex items-center p-5">
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            {feature.title === "Technical Excellence" && (
                              <>
                                Our <span className="font-medium text-primary">Technical Excellence</span> drives 
                                innovation through enterprise-grade engineering practices and cutting-edge solutions.
                              </>
                            )}
                            {feature.title === "Creative Vision" && (
                              <>
                                With a clear <span className="font-medium text-primary">Creative Vision</span>, we 
                                craft digital experiences that captivate and convert.
                              </>
                            )}
                            {feature.title === "Strategic Growth" && (
                              <>
                                Focused on <span className="font-medium text-primary">Strategic Growth</span>, we 
                                align technology with your business objectives for lasting success.
                              </>
                            )}
                            {feature.title === "Proven Expertise" && (
                              <>
                                Our <span className="font-medium text-primary">Proven Expertise</span> in digital 
                                transformation helps local businesses thrive in the modern landscape.
                              </>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Minimal accent line */}
                      <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary/50
                        group-hover:w-full transition-all duration-300" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
