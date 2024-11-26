'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselCard {
  title: string;
  description: string;
  icon: string;
}

const cards: CarouselCard[] = [
  {
    title: "Web Development",
    description: "Creating modern, responsive websites with cutting-edge technologies.",
    icon: "🌐"
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    icon: "📱"
  },
  {
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and serverless applications.",
    icon: "☁️"
  },
  {
    title: "AI Integration",
    description: "Implementing AI and machine learning solutions for business growth.",
    icon: "🤖"
  },
  {
    title: "Data Analytics",
    description: "Transform raw data into actionable business insights.",
    icon: "📊"
  }
];

export default function RotatingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + cards.length) % cards.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 relative overflow-hidden">
      <div className="relative h-[600px] w-full perspective-1000">
        {/* Arrow Navigation - Moved outside AnimatePresence */}
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full 
            bg-gradient-to-br from-background/20 to-background/5
            backdrop-blur-lg
            border-2 border-white/20 
            hover:border-[var(--megaman)]
            hover:bg-[var(--megaman)]/10
            hover:scale-110
            active:scale-95
            transition-all duration-300 
            flex items-center justify-center
            shadow-lg shadow-black/20
            hover:shadow-[var(--megaman)]/20"
          onClick={() => {
            setIsAutoPlaying(false);
            paginate(-1);
          }}
          aria-label="Previous slide"
        >
          <span className="text-3xl transform hover:-translate-x-1 transition-transform duration-300 dark:text-white text-black">←</span>
        </button>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full 
            bg-gradient-to-br from-background/20 to-background/5
            backdrop-blur-lg
            border-2 border-white/20 
            hover:border-[var(--megaman)]
            hover:bg-[var(--megaman)]/10
            hover:scale-110
            active:scale-95
            transition-all duration-300 
            flex items-center justify-center
            shadow-lg shadow-black/20
            hover:shadow-[var(--megaman)]/20"
          onClick={() => {
            setIsAutoPlaying(false);
            paginate(1);
          }}
          aria-label="Next slide"
        >
          <span className="text-3xl transform hover:translate-x-1 transition-transform duration-300 dark:text-white text-black">→</span>
        </button>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full"
            onHoverStart={() => setIsAutoPlaying(false)}
            onHoverEnd={() => setIsAutoPlaying(true)}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div 
                className="w-[320px] h-[500px] transform-style-3d rounded-[2rem] p-8 transition-all duration-500 relative group"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: `
                    0 0 1px 1px rgba(255, 255, 255, 0.1),
                    inset 0 0 30px rgba(255, 255, 255, 0.1),
                    0 20px 40px -10px rgba(0, 0, 0, 0.5)
                  `,
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Holographic Effect Overlay */}
                <div 
                  className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(125deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.3) 70%, transparent 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'holographic 2s linear infinite'
                  }}
                />

                {/* Card Content */}
                <div className="relative h-full flex flex-col items-center">
                  {/* Top Border Design */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--megaman)] to-transparent opacity-50" />
                  
                  {/* Icon Container */}
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative">
                    <div className="text-6xl relative z-10 animate-float">{cards[currentIndex].icon}</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--megaman)] to-[var(--frozen-turquoise)] opacity-10 rounded-full blur-md" />
                  </div>

                  {/* Title with Gradient */}
                  <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent">
                    {cards[currentIndex].title}
                  </h3>

                  {/* Separator Line */}
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[var(--megaman)] to-transparent mb-6" />

                  {/* Description */}
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {cards[currentIndex].description}
                  </p>

                  {/* Bottom Design Element */}
                  <div className="mt-auto pt-6 w-full">
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-[var(--frozen-turquoise)] to-transparent opacity-30" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4 pb-4">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`relative h-3 transition-all duration-300 rounded-full 
                ${index === currentIndex 
                  ? 'w-12 bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)]' 
                  : 'w-3 bg-white/20 hover:bg-white/40'} 
                hover:scale-110 active:scale-95`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`absolute inset-0 rounded-full blur transition-opacity duration-300
                ${index === currentIndex 
                  ? 'opacity-50 bg-[var(--megaman)]' 
                  : 'opacity-0 bg-white/40'}`} 
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
