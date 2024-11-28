// src/components/Toucan.tsx
'use client';
import { useEffect, useRef } from 'react';

const polygons = [
    // Main Body - More cohesive shape
    { id: 1, clipPath: 'polygon(35% 30%, 65% 30%, 65% 65%, 35% 65%)', color: 'var(--megaman)', translateZ: '25px', animationDelay: 0 },
    { id: 2, clipPath: 'polygon(33% 32%, 67% 32%, 67% 63%, 33% 63%)', color: 'var(--frozen-turquoise)', translateZ: '22px', animationDelay: 0.1 },
    
    // Head shape - Adjusted for better eye placement
    { id: 3, clipPath: 'polygon(40% 25%, 60% 25%, 65% 35%, 35% 35%)', color: 'var(--megaman)', translateZ: '28px', animationDelay: 0.2 },
    
    // Beak - Longer and more defined
    { id: 4, clipPath: 'polygon(63% 33%, 95% 30%, 98% 38%, 63% 43%)', color: 'var(--electric-lettuce)', translateZ: '30px', animationDelay: 0.3 },
    { id: 5, clipPath: 'polygon(63% 43%, 98% 38%, 96% 46%, 63% 48%)', color: 'var(--lime-lightning)', translateZ: '32px', animationDelay: 0.4 },
    
    // Enhanced Eye - Closer to beak, more visible
    { id: 6, clipPath: 'circle(4.5% at 55% 34%)', color: 'gray', translateZ: '35px', animationDelay: 0.5, type: 'eye-socket' },
    { id: 7, clipPath: 'circle(4% at 55% 34%)', color: '#FFFFFF', translateZ: '36px', animationDelay: 0.6, type: 'eye-white' },
    { id: 8, clipPath: 'circle(2% at 55% 34%)', color: 'var(--eye-pupil)', translateZ: '37px', animationDelay: 0.7, type: 'eye-pupil' },
    
    // Refined Smile - More precise positioning
    { id: 'smile-1', clipPath: 'polygon(75% 40%, 85% 40%, 83% 42%, 75% 42%)', color: '#FFFFFF', translateZ: '33px', animationDelay: 0.35 },
    { id: 'smile-2', clipPath: 'polygon(85% 40%, 90% 39%, 88% 41%, 83% 42%)', color: '#FFFFFF', translateZ: '33px', animationDelay: 0.35 },
// Left Wing - More complex geometric segments
{ 
    id: 9, 
    clipPath: 'polygon(30% 40%, 50% 40%, 45% 60%, 25% 60%)', // Main wing
    color: 'var(--megaman)', 
    translateZ: '15px', 
    animationDelay: 0, 
    type: 'wing-left' 
  },
  { 
    id: 10, 
    clipPath: 'polygon(25% 60%, 45% 60%, 40% 75%, 20% 75%)', // Lower segment
    color: 'var(--frozen-turquoise)', 
    translateZ: '14px', 
    animationDelay: 0, 
    type: 'wing-left' 
  },
  { 
    id: 11, 
    clipPath: 'polygon(28% 42%, 48% 42%, 43% 58%, 23% 58%)', // Overlay detail
    color: 'var(--heart-of-ice)', 
    translateZ: '16px', 
    animationDelay: 0, 
    type: 'wing-left' 
  },
  
  // Right Wing - Mirrored complex segments
  { 
    id: 12, 
    clipPath: 'polygon(65% 40%, 85% 40%, 80% 60%, 60% 60%)', 
    color: 'var(--megaman)', 
    translateZ: '15px', 
    animationDelay: 0, 
    type: 'wing-right' 
  },
  { 
    id: 13, 
    clipPath: 'polygon(60% 60%, 80% 60%, 75% 75%, 55% 75%)', 
    color: 'var(--frozen-turquoise)', 
    translateZ: '14px', 
    animationDelay: 0, 
    type: 'wing-right' 
  },
  { 
    id: 14, 
    clipPath: 'polygon(63% 42%, 83% 42%, 78% 58%, 58% 58%)', 
    color: 'var(--heart-of-ice)', 
    translateZ: '16px', 
    animationDelay: 0, 
    type: 'wing-right' 
  }
  ];

interface ToucanProps {
    className?: string;
    scale?: number;
    enableEyeTracking?: boolean;
}

const handleEyeMovement = (e: MouseEvent) => {
    const eyeWhite = document.querySelector('[data-type="eye-white"]') as HTMLDivElement;
    const eyePupil = document.querySelector('[data-type="eye-pupil"]') as HTMLDivElement;
    if (!eyeWhite || !eyePupil) return;
  
    const rect = eyeWhite.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
    
    // Increased movement radius for more dramatic eye movement
    const radius = 6;
    
    // Wider boundaries but still contained
    const moveX = Math.min(Math.max(Math.cos(angle) * radius, -5), 5);
    const moveY = Math.min(Math.max(Math.sin(angle) * radius, -5), 5);
    
    eyePupil.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
    eyePupil.style.transform = `translate(${moveX}px, ${moveY}px) translateZ(37px)`;
  };

export const Toucan = ({
    className = '',
    scale = 0.6,
    enableEyeTracking = true
}: ToucanProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const toucanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!enableEyeTracking) return;

        const handleEyeMovement = (e: MouseEvent) => {
            const eyeWhite = document.querySelector('[data-type="eye-white"]') as HTMLDivElement;
            const eyePupil = document.querySelector('[data-type="eye-pupil"]') as HTMLDivElement;
            if (!eyeWhite || !eyePupil) return;

            const rect = eyeWhite.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;

            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const radius = 2;

            const moveX = Math.cos(angle) * radius;
            const moveY = Math.sin(angle) * radius;

            eyePupil.style.transform = `translate(${moveX}px, ${moveY}px) translateZ(36px)`;
        };

        window.addEventListener('mousemove', handleEyeMovement);
        return () => window.removeEventListener('mousemove', handleEyeMovement);
    }, [enableEyeTracking]);

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
        
          // Adjust sensitivity by multiplying with a factor (e.g., 1.5)
          targetRotateY = ((mouseX - centerX) / (window.innerWidth / 2)) * 25 * 1.5;
          targetRotateX = ((mouseY - centerY) / (window.innerHeight / 2)) * -25 * 1.5;
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
<div 
  ref={containerRef} 
  className={`
    relative w-[600px] h-[600px] transform-gpu  // Reduced from 800px
    perspective-[2000px] animate-hover
    ${className}
  `}
  style={{ 
    transform: `scale(${scale || 0.4})`,  // Reduced from 0.6
    transformStyle: 'preserve-3d' 
  }}
>
            <div
                className="
          absolute w-full h-full 
          transform-gpu blur-sm -z-10 
          pointer-events-none
          transition-transform duration-100 ease-out
        "
                style={{ transformStyle: 'preserve-3d' }}
            >
                {polygons.map((polygon) => (
                    <div
                        key={`shadow-${polygon.id}`}
                        className="
              absolute w-full h-full 
              bg-black/10 scale-90 
              translate-y-3
              transition-transform duration-100 ease-out
            "
                        style={{
                            clipPath: polygon.clipPath,
                        }}
                    />
                ))}
            </div>
            <div ref={toucanRef} className="relative w-full h-full transform-gpu transition-none"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {polygons.map((polygon) => (
                    <div
                        key={polygon.id}
                        data-type={polygon.type}
                        className={`
            absolute w-full h-full 
            transition-transform duration-200 ease-out
            transform-gpu
            dark:filter dark:brightness-90
            ${polygon.type === 'eye-pupil' && 'dark:animate-glow'}
            ${polygon.type === 'wing-left' && 'animate-wing-flap-left'}
            ${polygon.type === 'wing-right' && 'animate-wing-flap-right'}
          `}
                        style={{
                            clipPath: polygon.clipPath,
                            backgroundColor: polygon.color,
                            transform: `translateZ(${polygon.translateZ})`,
                            animationDelay: `${polygon.animationDelay}s`,
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};