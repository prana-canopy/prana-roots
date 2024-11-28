// src/components/Toucan.tsx
'use client';
import { useEffect, useRef } from 'react';

const polygons = [
    // Main Body - More oval/slim shape
    { id: 1, clipPath: 'polygon(35% 35%, 65% 35%, 62% 70%, 38% 70%)', color: 'var(--megaman)', translateZ: '25px', animationDelay: 0 },
    { id: 2, clipPath: 'polygon(33% 37%, 67% 37%, 64% 68%, 36% 68%)', color: 'var(--frozen-turquoise)', translateZ: '22px', animationDelay: 0.1 },
    
    // Head shape - More curved
    { id: 3, clipPath: 'polygon(40% 30%, 60% 30%, 65% 40%, 35% 40%)', color: 'var(--megaman)', translateZ: '28px', animationDelay: 0.2 },
    
    // Beak - Longer and more curved
    { id: 4, clipPath: 'polygon(65% 35%, 95% 32%, 98% 40%, 65% 45%)', color: 'var(--electric-lettuce)', translateZ: '30px', animationDelay: 0.3 },
    { id: 5, clipPath: 'polygon(65% 45%, 98% 40%, 96% 48%, 65% 50%)', color: 'var(--lime-lightning)', translateZ: '32px', animationDelay: 0.4 },
    
      // Curved Smile - slight curve upward
  { 
    id: 'smile-1', 
    clipPath: 'polygon(70% 42%, 85% 42%, 83% 44%, 70% 44%)', 
    color: '#FFFFFF', 
    translateZ: '33px', 
    animationDelay: 0.35 
  },
  { 
    id: 'smile-2', 
    clipPath: 'polygon(85% 42%, 90% 41%, 88% 43%, 83% 44%)', 
    color: '#FFFFFF', 
    translateZ: '33px', 
    animationDelay: 0.35 
  },
  
    // Enhanced Eye with better movement range
    { id: 6, clipPath: 'circle(6% at 45% 35%)', color: '#FFFFFF', translateZ: '35px', animationDelay: 0.5, type: 'eye-socket' },
    { id: 7, clipPath: 'circle(5% at 45% 35%)', color: '#FFFFFF', translateZ: '36px', animationDelay: 0.6, type: 'eye-white' },
    { id: 8, clipPath: 'circle(2.5% at 45% 35%)', color: 'var(--eye-pupil)', translateZ: '37px', animationDelay: 0.7, type: 'eye-pupil' },
    
    // Left Wing Group - More connected segments
    { id: 9, clipPath: 'polygon(20% 40%, 35% 40%, 33% 70%, 18% 65%)', color: 'var(--megaman)', translateZ: '20px', animationDelay: 0.8, type: 'wing-left' },
    { id: 10, clipPath: 'polygon(18% 42%, 33% 42%, 31% 68%, 16% 63%)', color: 'var(--frozen-turquoise)', translateZ: '18px', animationDelay: 0.8, type: 'wing-left' },
    { id: 11, clipPath: 'polygon(16% 44%, 31% 44%, 29% 66%, 14% 61%)', color: 'var(--heart-of-ice)', translateZ: '16px', animationDelay: 0.8, type: 'wing-left' },
    
    // Right Wing Group - More connected segments
    { id: 12, clipPath: 'polygon(65% 40%, 80% 40%, 77% 65%, 63% 70%)', color: 'var(--megaman)', translateZ: '20px', animationDelay: 0.8, type: 'wing-right' },
    { id: 13, clipPath: 'polygon(67% 42%, 82% 42%, 79% 63%, 65% 68%)', color: 'var(--frozen-turquoise)', translateZ: '18px', animationDelay: 0.8, type: 'wing-right' },
    { id: 14, clipPath: 'polygon(69% 44%, 84% 44%, 81% 61%, 67% 66%)', color: 'var(--heart-of-ice)', translateZ: '16px', animationDelay: 0.8, type: 'wing-right' },
  ];

interface ToucanProps {
    className?: string;
    scale?: number;
    enableEyeTracking?: boolean;
}

// Enhanced eye movement function with larger range
const handleEyeMovement = (e: MouseEvent) => {
    const eyeWhite = document.querySelector('[data-type="eye-white"]') as HTMLDivElement;
    const eyePupil = document.querySelector('[data-type="eye-pupil"]') as HTMLDivElement;
    if (!eyeWhite || !eyePupil) return;
  
    const rect = eyeWhite.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
    
    // Increased movement radius for more noticeable eye movement
    const radius = 4;
    
    const moveX = Math.cos(angle) * radius;
    const moveY = Math.sin(angle) * radius;
    
    // Smoother transition for eye movement
    eyePupil.style.transition = 'transform 0.2s ease-out';
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