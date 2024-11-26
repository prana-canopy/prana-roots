'use client';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

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
  { id: 11, clipPath: 'polygon(42% 31%, 45% 34%, 43% 37%)', color: '#FFFFFF', translateZ: '40px' }, // Left eye white
  { id: 12, clipPath: 'polygon(43% 32%, 44.5% 34%, 43.5% 36%)', color: '#000000', translateZ: '45px' }, // Left eye pupil
  { id: 13, clipPath: 'polygon(57% 31%, 60% 34%, 58% 37%)', color: '#FFFFFF', translateZ: '40px' }, // Right eye white
  { id: 14, clipPath: 'polygon(58% 32%, 59.5% 34%, 58.5% 36%)', color: '#000000', translateZ: '45px' }, // Right eye pupil
  
  // Additional Detail Layers
  { id: 15, clipPath: 'polygon(40% 55%, 45% 60%, 42% 65%)', color: 'var(--megaman)', translateZ: '5px' },
  { id: 16, clipPath: 'polygon(55% 55%, 60% 60%, 58% 65%)', color: 'var(--megaman)', translateZ: '5px' },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const toucanRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden">
      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-border/40 bg-background/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex flex-col">
            <span 
              className="text-xl font-light tracking-wider"
              style={{
                background: 'linear-gradient(to right, var(--megaman), var(--frozen-turquoise))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.1em'
              }}
            >
              PRANA ROOTS
            </span>
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-light uppercase">
              Enterprise Solutions · Local Impact
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Hero Section with Toucan and Content */}
      <div className="w-full max-w-5xl mx-auto px-6 mt-20">
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-start relative">
          {/* Left Content */}
          <div className="space-y-8 pt-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent leading-tight">
              Elevate Your Business with Modern Solutions
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Transforming local businesses through innovative technology, data-driven insights, and seamless integration solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium
                bg-[var(--megaman)] text-white hover:bg-[var(--frozen-turquoise)]
                h-11 px-6 transition-colors">
                Get Started
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium
                border border-[var(--megaman)] text-[var(--megaman)] hover:bg-[var(--megaman)]/5
                h-11 px-6 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Toucan Container - Mobile: Below text, Desktop: Absolute positioned */}
          <div className="relative w-full flex justify-center md:justify-end lg:w-auto lg:block lg:absolute lg:top-[-90px] lg:right-[-40px] xl:right-[-60px]">
            <div ref={containerRef} className="toucan-container">
              <div className="toucan-shadow">
                {polygons.map((polygon) => (
                  <div
                    key={`shadow-${polygon.id}`}
                    className="polygon-shadow"
                    style={{
                      clipPath: polygon.clipPath,
                    }}
                  />
                ))}
              </div>
              <div ref={toucanRef} className="toucan-wrap">
                {polygons.map((polygon) => (
                  <div 
                    key={polygon.id} 
                    className={`polygon ${isInitialLoad ? 'fly-in' : ''}`}
                    style={{
                      clipPath: polygon.clipPath,
                      backgroundColor: polygon.color,
                      transform: `translateZ(${polygon.translateZ})`,
                      animationDelay: `${(polygon.id * 0.1)}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="w-full max-w-5xl mx-auto px-6 mt-16 lg:mt-24 space-y-24 pb-24">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Data Analytics",
              description: "Transform raw data into actionable insights with cutting-edge analytics solutions",
              icon: "📊"
            },
            {
              title: "Cloud Integration",
              description: "Seamless cloud infrastructure deployment and management for scalable operations",
              icon: "☁️"
            },
            {
              title: "Process Automation",
              description: "Streamline workflows with intelligent automation and business process optimization",
              icon: "⚡"
            }
          ].map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-background p-8 hover:shadow-lg transition-all duration-300
                hover:shadow-[var(--frozen-turquoise)]/10 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Feature Section */}
        <div className="relative rounded-xl border bg-background/50 backdrop-blur-sm p-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--megaman)]/5 to-[var(--frozen-turquoise)]/5" />
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent">
              Why Choose Prana Roots?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {[
                {
                  title: "Local Expertise",
                  description: "Deep understanding of local business landscape and challenges"
                },
                {
                  title: "Custom Solutions",
                  description: "Tailored technology solutions that fit your specific needs"
                },
                {
                  title: "Future-Ready",
                  description: "Stay ahead with cutting-edge technology implementation"
                },
                {
                  title: "Dedicated Support",
                  description: "Continuous assistance and maintenance for your systems"
                }
              ].map((feature, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent">
            Ready to Transform Your Business?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Let's discuss how our technology solutions can drive your business forward
          </p>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium
            bg-[var(--megaman)] text-white hover:bg-[var(--frozen-turquoise)]
            h-11 px-8 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}
