'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';
import RotatingCarousel from '@/components/rotating-carousel';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Feature {
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <div>🚀</div>,
    title: "Digital Transformation",
    description: "Transform your business with cutting-edge digital solutions"
  },
  {
    icon: <div>📊</div>,
    title: "Data Analytics",
    description: "Make data-driven decisions with powerful analytics tools"
  },
  {
    icon: <div>🔄</div>,
    title: "Process Automation",
    description: "Streamline operations with intelligent automation solutions"
  }
];

const features: Feature[] = [
  {
    title: "Enterprise-Grade Solutions",
    description: "Access powerful tools and technologies typically reserved for large enterprises"
  },
  {
    title: "Local Support",
    description: "Get personalized support from our local team of experts"
  },
  {
    title: "Scalable Platform",
    description: "Grow your business with solutions that scale with your needs"
  },
  {
    title: "Data Security",
    description: "Keep your business data secure with enterprise-level security measures"
  }
];

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
  { id: 12, clipPath: 'polygon(43% 32%, 44.5% 34%, 43.5% 36%)', color: 'var(--eye-pupil)', translateZ: '45px' }, // Left eye pupil
  { id: 13, clipPath: 'polygon(57% 31%, 60% 34%, 58% 37%)', color: '#FFFFFF', translateZ: '40px' }, // Right eye white
  { id: 14, clipPath: 'polygon(58% 32%, 59.5% 34%, 58.5% 36%)', color: 'var(--eye-pupil)', translateZ: '45px' }, // Right eye pupil
  
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

  const calculateRotation = useCallback((mouseX: number, mouseY: number) => {
    if (toucanRef.current) {
      const toucanRect = toucanRef.current.getBoundingClientRect();
      const toucanCenterX = toucanRect.left + toucanRect.width / 2;
      const toucanCenterY = toucanRect.top + toucanRect.height / 2;
      
      const dx = mouseX - toucanCenterX;
      const dy = mouseY - toucanCenterY;
      
      // Limit rotation to +/- 25 degrees
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const limitedAngle = Math.max(-25, Math.min(25, angle));
      
      return limitedAngle;
    }
    return 0;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isThemeToggleClick = (e: MouseEvent) => {
    const target = e.target as Element;
    return !!(target.closest('.theme-toggle') || target.closest('button[aria-label="Toggle theme"]') || target.closest('svg'));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden">
      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border/40 bg-background/85">
        <div className="max-w-5xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <svg
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="41.28px"
                height="41.281px"
                viewBox="0 0 41.28 41.281"
                style={{
                  enableBackground: "new 0 0 41.28 41.281",
                  cursor: "pointer",
                }}
                xmlSpace="preserve"
                className="fill-current text-yellow-500 dark:text-green-500"
              >
                <g>
                  <g>
                    <polygon points="37.723,18.175 32.028,18.175 34.874,23.105" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="31.316,18.585 28.469,23.516 34.162,23.516" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="41.28,12.011 35.586,12.011 38.434,16.942" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="27.045,24.338 21.352,24.338 24.199,29.269" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="34.874,12.422 32.028,17.352 37.723,17.352" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="34.162,12.011 28.469,12.011 31.316,16.942" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="12.811,12.011 7.117,12.011 9.964,16.942" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="5.693,12.011 0,12.011 2.847,16.942" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="6.405,12.422 3.558,17.352 9.252,17.352" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="13.523,12.422 10.676,17.352 16.369,17.352" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="27.758,12.422 24.911,17.352 30.604,17.352" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="30.604,18.175 24.911,18.175 27.758,23.105" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="16.369,18.175 10.676,18.175 13.523,23.105" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="9.252,18.175 3.558,18.175 6.405,23.105" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="9.964,18.585 7.117,23.516 12.811,23.516" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="17.081,18.585 14.235,23.516 19.928,23.516" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="24.199,18.585 21.352,23.516 27.045,23.516" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                    <polygon points="19.928,24.338 14.235,24.338 17.081,29.269" className="hover:opacity-70 transition-opacity duration-200 cursor-pointer" />
                  </g>
                </g>
              </svg>
            </div>
            <span 
              className="text-2xl font-semibold tracking-wider"
              style={{
                background: 'linear-gradient(to right, var(--megaman), var(--frozen-turquoise))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.15em'
              }}
            >
              Prana <em>Local</em>
            </span>
          </div>
          <nav className="flex justify-center items-center gap-8">
            <ul className="menu flex space-x-8 text-white">
              {/* <li className="menu-item">Home</li> */}
              {/* <li className="menu-item">Solutions</li> */}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
      <div className="fixed top-0 right-0 m-4">
        <ThemeToggle />
      </div>

      {/* Hero Section with Toucan and Content */}
      <div className="w-full max-w-7xl mx-auto px-8 mt-32 -mb-12 md:-mb-8 lg:mb-0">
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start relative">
          {/* Left Content */}
          <div className="space-y-14 pt-8 md:pt-12">
            {/* Hero Title */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold 
                bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] 
                bg-clip-text text-transparent leading-[1.1]
                tracking-tight text-shadow max-w-3xl">
                Cutting Edge Tech for Local Businesses
              </h1>
              
              {/* Main Description */}
              <p className="text-xl md:text-2xl leading-relaxed
                max-w-2xl
                text-gray-700 dark:text-slate-100 important-text
                tracking-wide">
                Transforming local businesses through innovative technology, 
                data-driven insights, and seamless integration solutions.
              </p>

              {/* Subtitle */}
              <p className="text-lg md:text-xl 
                text-gray-600 dark:text-slate-200 important-text
                tracking-wider font-light">
                <span className="inline-block transform hover:scale-105 transition-transform duration-200">
                  Enterprise Solutions
                </span>
                <span className="mx-4 text-gray-400 dark:text-slate-400">·</span>
                <span className="inline-block transform hover:scale-105 transition-transform duration-200">
                  Local Impact
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-6 justify-start items-center pt-4">
              <button className="inline-flex items-center justify-center rounded-md text-base font-medium
                bg-[var(--megaman)] text-white hover:bg-[var(--frozen-turquoise)]
                px-10 py-4 transition-all duration-200 hover:scale-105
                shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-base font-medium
                border-2 border-[var(--megaman)] text-[var(--megaman)]
                hover:bg-[var(--megaman)] hover:text-white
                px-10 py-4 transition-all duration-200 hover:scale-105">
                Learn More
              </button>
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
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border bg-background p-10 hover:shadow-lg transition-all duration-300 hover:shadow-[var(--frozen-turquoise)]/10 hover:-translate-y-1"
            >
              <img src="https://via.placeholder.com/300x200" alt="App Showcase" className="w-full h-auto object-cover rounded-2xl shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent">
                    App Showcase
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">A stunning visual representation of our app's interface.</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Section */}
        <div className="relative rounded-2xl border bg-background/50 backdrop-blur-sm p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--megaman)]/5 to-[var(--frozen-turquoise)]/5" />
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold mb-12 bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent">
              Why Choose Prana Local?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {features.map((feature, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-medium">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8 py-12">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Let's discuss how our technology solutions can drive your business forward
          </p>
          <button className="inline-flex items-center justify-center rounded-md text-lg font-medium
            bg-[var(--megaman)] text-white hover:bg-[var(--frozen-turquoise)]
            px-10 py-4 transition-all duration-300 hover:scale-105
            shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}
