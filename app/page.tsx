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
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      <div 
        className="fixed top-8 left-8 z-50 flex flex-col md:left-8 left-4"
      >
        <span className="text-sm tracking-[0.3em] text-muted-foreground font-light uppercase mb-1 pr-16">
          Enterprise Solutions · Local Impact
        </span>
        <span 
          className="text-2xl font-light tracking-wider pr-16"
          style={{
            background: 'linear-gradient(to right, var(--megaman), var(--frozen-turquoise))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.1em'
          }}
        >
          PRANA ROOTS
        </span>
      </div>
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
      <ThemeToggle />
    </main>
  );
}
