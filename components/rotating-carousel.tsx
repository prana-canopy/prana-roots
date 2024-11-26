'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, DotIcon } from './icons';

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

  const prevSlide = () => {
    setIsAutoPlaying(false);
    paginate(-1);
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    paginate(1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 relative overflow-hidden">
      <div className="relative h-[600px] w-full perspective-1000">
        {/* Arrow Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full 
            bg-white/10 dark:bg-indigo-500/20 backdrop-blur-sm border border-white/20 
            hover:bg-white/20 dark:hover:bg-indigo-500/30 transition-all duration-300
            hover:scale-110 active:scale-95 group"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white/70 dark:text-white group-hover:text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full 
            bg-white/10 dark:bg-indigo-500/20 backdrop-blur-sm border border-white/20 
            hover:bg-white/20 dark:hover:bg-indigo-500/30 transition-all duration-300
            hover:scale-110 active:scale-95 group"
        >
          <ChevronRightIcon className="w-6 h-6 text-white/70 dark:text-white group-hover:text-white" />
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-4xl h-[500px] rounded-2xl overflow-hidden
                  bg-white/5 dark:bg-indigo-500/10 backdrop-blur-md
                  border border-white/20 dark:border-indigo-500/30
                  shadow-xl hover:shadow-2xl transition-all duration-500
                  group"
                >
                  <div className="relative h-full w-full p-8 flex flex-col items-center justify-center">
                    {/* Card Content */}
                    <div className="mb-6 text-6xl">{cards[currentIndex].icon}</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center 
                      bg-clip-text text-transparent 
                      bg-gradient-to-r from-white to-white/90
                      dark:from-white dark:to-indigo-200">
                      {cards[currentIndex].title}
                    </h3>
                    <p className="text-lg md:text-xl text-center max-w-2xl
                      text-white/80 dark:text-white/90">
                      {cards[currentIndex].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 
          carousel-navigation flex items-center space-x-2 px-4 py-2 rounded-full">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`transition-all duration-300 hover:scale-125 ${
                currentIndex === index ? 'text-white' : 'text-white/50'
              }`}
            >
              <DotIcon active={currentIndex === index} className="w-3 h-3" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
