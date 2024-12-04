import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedToucan = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isWingFluttering, setIsWingFluttering] = useState(false);
  const [shimmering, setShimmering] = useState(null);

  const floatingAnimation = {
    y: [-5, 5, -5],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  };

  const beakAnimation = {
    y: [0, 2, 0],
    transition: { duration: 0.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }
  };

  const wingFlutterAnimation = {
    rotate: [0, -5, 0],
    transition: { duration: 0.3, repeat: 3, ease: "easeInOut" }
  };

  const shimmerAnimation = {
    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
    transition: { duration: 0.5, ease: "easeInOut" }
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
      <div className="relative w-full max-w-4xl">
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
            {mainPaths.map((path, index) => (
              <motion.path
                key={index}
                d={path.d}
                fill={path.fill}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  ...((shimmering === index) ? shimmerAnimation : {})
                }}
                transition={{ duration: 0.6, delay: index * 0.01, ease: [0.43, 0.13, 0.23, 0.96] }}
                whileHover={{ scale: 1.05, filter: "brightness(1.2)", z: 10, transition: { duration: 0.2 } }}
                onClick={() => {
                  setShimmering(index);
                  setTimeout(() => setShimmering(null), 500);
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                style={{
                  filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.15))",
                  opacity: hoveredIndex === null || hoveredIndex === index || (mainPaths[hoveredIndex] && mainPaths[hoveredIndex].group === path.group) ? 1 : 0.7,
                  cursor: 'pointer'
                }}
              />
            ))}
            <motion.g
              animate={isWingFluttering ? wingFlutterAnimation : {}}
              onHoverStart={() => setIsWingFluttering(true)}
              onHoverEnd={() => setIsWingFluttering(false)}
              style={{ transformOrigin: "240,160" }}
            >
              {wingPaths.map((path, index) => (
                <motion.path
                  key={`wing-${index}`}
                  d={path.d}
                  fill={path.fill}
                  animate={(shimmering === `wing-${index}`) ? shimmerAnimation : {}}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShimmering(`wing-${index}`);
                    setTimeout(() => setShimmering(null), 500);
                  }}
                  whileHover={{ filter: "brightness(1.2)", transition: { duration: 0.2 } }}
                  style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.15))", cursor: 'pointer' }}
                />
              ))}
            </motion.g>
            {tailPaths.map((path, index) => (
              <motion.path
                key={`tail-${index}`}
                d={path.d}
                fill={path.fill}
                animate={(shimmering === `tail-${index}`) ? shimmerAnimation : {}}
                onClick={(e) => {
                  e.stopPropagation();
                  setShimmering(`tail-${index}`);
                  setTimeout(() => setShimmering(null), 500);
                }}
                whileHover={{ scale: 1.05, filter: "brightness(1.2)", transition: { duration: 0.2 } }}
                style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.15))", cursor: 'pointer' }}
              />
            ))}
            {lowerBeakPaths.map((path, index) => (
              <motion.path
                key={`beak-${index}`}
                d={path.d}
                fill={path.fill}
                animate={beakAnimation}
                whileHover={{ scale: 1.05, filter: "brightness(1.2)", transition: { duration: 0.2 } }}
                style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.15))" }}
              />
            ))}
            {eyeParts.map((eye, index) => (
              <motion.path
                key={`eye-${index}`}
                d={eye.d}
                fill={eye.fill}
                initial={{ opacity: 1, scaleY: 1 }}
                animate={{ scaleY: [1, 0.1, 1], transition: { duration: 0.2, repeat: Infinity, repeatDelay: 3 } }}
                style={{ transformOrigin: "300px 147px", filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.15))" }}
              />
            ))}
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedToucan;