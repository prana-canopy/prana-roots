import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const AnimatedToucan = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isWingFluttering, setIsWingFluttering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme: theme } = useTheme();

  // 3D rotation effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

      container.style.transform = `
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

  const floatingAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const beakAnimation = {
    y: [0, 2, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 5,
      ease: "easeInOut"
    }
  };

  const wingFlutterAnimation = {
    initial: { rotate: 0 },
    animate: { 
      rotate: isWingFluttering ? [-5, 0, -5] : 0,
      transition: {
        duration: 0.3,
        repeat: isWingFluttering ? Infinity : 0,
        ease: "easeInOut"
      }
    }
  };

  const shimmerVariants = {
    initial: { filter: "brightness(1)" },
    hover: {
      filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const mainPaths = [
    // Beak - Angular triangular segments - Upper beak
    { d: "M320,140 L380,120 L350,145 Z", fill: "#2ee89e", group: "beak-upper" },
    { d: "M350,145 L380,120 L390,135 Z", fill: "#1eebc3", group: "beak-upper" },
    { d: "M350,145 L390,135 L360,160 Z", fill: "#00b4e4", group: "beak-upper" },
    // Yellow face area - Triangular pattern
    { d: "M300,140 L320,140 L310,160 Z", fill: "#fff06e", group: "face" },
    { d: "M310,160 L320,140 L335,165 Z", fill: "#ffe566", group: "face" },
    { d: "M280,140 L300,140 L290,160 Z", fill: "#ffd700", group: "face" },
    { d: "M290,160 L300,140 L310,160 Z", fill: "#ffcd00", group: "face" },
    // Main black body - Triangle matrix
    { d: "M260,140 L280,140 L270,160 Z", fill: "#151515", group: "body" },
    { d: "M270,160 L280,140 L290,160 Z", fill: "#1a1a1a", group: "body" },
    { d: "M240,140 L260,140 L250,160 Z", fill: "#202020", group: "body" },
    { d: "M250,160 L260,140 L270,160 Z", fill: "#252525", group: "body" },
    // Middle section
    { d: "M250,160 L270,160 L260,180 Z", fill: "#151515", group: "body" },
    { d: "M260,180 L270,160 L280,180 Z", fill: "#1a1a1a", group: "body" },
    { d: "M230,160 L250,160 L240,180 Z", fill: "#202020", group: "body" },
    { d: "M240,180 L250,160 L260,180 Z", fill: "#252525", group: "body" }
  ];

  const wingPaths = [
    // Left wing
    { d: "M220,160 L240,160 L230,180 Z", fill: "#151515", group: "wing-left" },
    { d: "M230,180 L240,160 L250,180 Z", fill: "#1a1a1a", group: "wing-left" },
    { d: "M200,160 L220,160 L210,180 Z", fill: "#202020", group: "wing-left" },
    { d: "M210,180 L220,160 L230,180 Z", fill: "#252525", group: "wing-left" },
    { d: "M180,160 L200,160 L190,180 Z", fill: "#151515", group: "wing-left" },
    { d: "M190,180 L200,160 L210,180 Z", fill: "#1a1a1a", group: "wing-left" },
    // Right wing
    { d: "M270,160 L290,160 L280,180 Z", fill: "#151515", group: "wing-right" },
    { d: "M280,180 L290,160 L300,180 Z", fill: "#1a1a1a", group: "wing-right" },
    { d: "M300,180 L290,160 L310,160 Z", fill: "#202020", group: "wing-right" }
  ];

  const tailPaths = [
    { d: "M230,180 L250,180 L240,200 Z", fill: "#151515", group: "tail" },
    { d: "M240,200 L250,180 L260,200 Z", fill: "#1a1a1a", group: "tail" },
    { d: "M210,180 L230,180 L220,200 Z", fill: "#202020", group: "tail" },
    { d: "M220,200 L230,180 L240,200 Z", fill: "#252525", group: "tail" },
    { d: "M220,180 L230,180 L225,190 Z", fill: "#00b4e4", group: "feet" },
    { d: "M225,190 L230,180 L235,190 Z", fill: "#1eebc3", group: "feet" }
  ];

  const lowerBeakPaths = [
    { d: "M320,140 L350,145 L335,165 Z", fill: "#00d5c3", group: "beak-lower" },
    { d: "M335,165 L350,145 L360,160 Z", fill: "#00b4e4", group: "beak-lower" },
    { d: "M335,165 L360,160 L345,180 Z", fill: "#1eebc3", group: "beak-lower" }
  ];

  const eyeParts = [
    { d: "M295,145 L305,143 L300,153 Z", fill: "#ffffff" },
    { d: "M297,147 L302,146 L300,151 Z", fill: "#6366f1" },
    { d: "M295,145 L300,153 L293,150 Z", fill: "#000000" }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={containerRef} className="relative w-full max-w-4xl">
        <div className="absolute inset-0 bg-[#00D5C3] opacity-5 blur-3xl rounded-full" />
        <motion.div 
          animate={floatingAnimation} 
          className="w-full"
        >
          <motion.svg 
            viewBox="0 0 500 500" 
            className="w-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence>
              {mainPaths.map((path, index) => (
                <motion.path
                  key={index}
                  d={path.d}
                  fill={path.fill}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  variants={shimmerVariants}
                  whileHover="hover"
                  transition={{ 
                    opacity: { duration: 0.6, delay: index * 0.01 },
                    filter: { duration: 0.3 }
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  style={{
                    filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.15))",
                    opacity: hoveredIndex === null || hoveredIndex === index || 
                      (mainPaths[hoveredIndex] && mainPaths[hoveredIndex].group === path.group) ? 1 : 0.7,
                    cursor: 'pointer'
                  }}
                />
              ))}
            </AnimatePresence>

            <motion.g
              variants={wingFlutterAnimation}
              initial="initial"
              animate="animate"
              onHoverStart={() => setIsWingFluttering(true)}
              onHoverEnd={() => setIsWingFluttering(false)}
              style={{ transformOrigin: "240px 160px" }}
            >
              {wingPaths.map((path, index) => (
                <motion.path
                  key={`wing-${index}`}
                  d={path.d}
                  fill={path.fill}
                  variants={shimmerVariants}
                  whileHover="hover"
                  transition={{ filter: { duration: 0.3 } }}
                  style={{ 
                    filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.15))",
                    cursor: 'pointer'
                  }}
                />
              ))}
            </motion.g>

            {tailPaths.map((path, index) => (
              <motion.path
                key={`tail-${index}`}
                d={path.d}
                fill={path.fill}
                variants={shimmerVariants}
                whileHover="hover"
                transition={{ filter: { duration: 0.3 } }}
                style={{ 
                  filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.15))",
                  cursor: 'pointer'
                }}
              />
            ))}

            {lowerBeakPaths.map((path, index) => (
              <motion.path
                key={`beak-lower-${index}`}
                d={path.d}
                fill={path.fill}
                animate={beakAnimation}
                variants={shimmerVariants}
                whileHover="hover"
                style={{ 
                  filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.15))",
                  cursor: 'pointer'
                }}
              />
            ))}

            {eyeParts.map((eye, index) => (
              <motion.path
                key={`eye-${index}`}
                d={eye.d}
                fill={eye.fill}
                initial={{ opacity: 1, scaleY: 1 }}
                animate={{ 
                  scaleY: [1, 0.1, 1], 
                  transition: { 
                    duration: 0.2, 
                    repeat: Infinity, 
                    repeatDelay: 3 
                  } 
                }}
                style={{ 
                  transformOrigin: "300px 147px",
                  filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.15))"
                }}
              />
            ))}
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedToucan;