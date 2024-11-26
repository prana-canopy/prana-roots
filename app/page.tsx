'use client';
import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const toucanWrap = container.querySelector('.toucan-wrap') as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate angle and distance from center
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const distance = Math.min(Math.hypot(e.clientX - centerX, e.clientY - centerY) / (rect.width / 2), 1);
      
      // Enhanced movement ranges
      const maxHeadTilt = 15;
      const maxBodyTilt = 10;
      
      // Calculate movements with smooth easing
      const ease = (t: number) => t * t * (3 - 2 * t); // Smooth easing function
      const easedDistance = ease(distance);
      
      // Calculate head and body movement
      const tiltX = (e.clientX - centerX) / (rect.width / 2) * maxHeadTilt;
      const tiltY = (e.clientY - centerY) / (rect.height / 2) * maxHeadTilt;
      const bodyTiltX = tiltX * 0.6; // Body moves less than head
      const bodyTiltY = tiltY * 0.6;

      // Apply transforms with easing
      const easedTiltX = ease(Math.abs(tiltX) / maxHeadTilt) * Math.sign(tiltX) * maxHeadTilt;
      const easedTiltY = ease(Math.abs(tiltY) / maxHeadTilt) * Math.sign(tiltY) * maxHeadTilt;
      const easedBodyTiltX = ease(Math.abs(bodyTiltX) / maxBodyTilt) * Math.sign(bodyTiltX) * maxBodyTilt;
      const easedBodyTiltY = ease(Math.abs(bodyTiltY) / maxBodyTilt) * Math.sign(bodyTiltY) * maxBodyTilt;

      // Apply head tilt with hover offset
      toucanWrap.style.transform = `
        translateY(${Math.sin(Date.now() / 1000) * 15}px)
        rotateX(${-easedTiltY}deg) 
        rotateY(${easedTiltX}deg) 
        rotateZ(${easedTiltX * 0.1}deg)
        translateX(${easedBodyTiltX * 0.5}px)
      `;
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div ref={containerRef} className="toucan-container">
        <div className="toucan-wrap">
          {polygons.map((poly) => (
            <div 
              key={poly.id} 
              className="polygon fly-in"
              style={{
                clipPath: poly.clipPath,
                backgroundColor: poly.color,
                transform: `translateZ(${poly.translateZ})`,
                animationDelay: `${poly.id * 0.15}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
