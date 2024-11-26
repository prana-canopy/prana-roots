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
                {/* Card Container with Perspective */}
                <div className="w-full max-w-4xl h-[500px] perspective">
                  {/* Flipping Card */}
                  <div className="relative w-full h-full transition-transform duration-700 preserve-3d 
                    hover:rotate-y-180 cursor-pointer"
                  >
                    {/* Front Side */}
                    <div className="absolute w-full h-full backface-hidden rounded-2xl
                      bg-gradient-to-br from-pink-500/10 to-purple-600/10 backdrop-blur-md
                      border border-pink-500/20 dark:border-purple-500/30
                      shadow-xl transition-all duration-500"
                    >
                      <div className="h-full w-full p-8 flex flex-col items-center justify-center">
                        {/* Project Logo/Icon */}
                        <div className="mb-8 w-24 h-24 rounded-full 
                          bg-gradient-to-br from-pink-400 to-purple-600
                          flex items-center justify-center
                          shadow-lg shadow-pink-500/20">
                          <span className="text-4xl">🍷</span>
                        </div>

                        {/* Project Title */}
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center 
                          bg-clip-text text-transparent 
                          bg-gradient-to-r from-pink-400 to-purple-500">
                          Pinky's Up Social
                        </h3>

                        {/* Project Brief */}
                        <p className="text-lg text-center max-w-md
                          text-white/90 dark:text-slate-100 important-text">
                          A sophisticated social platform for wine enthusiasts to connect, share, and discover.
                        </p>

                        {/* Hover Instruction */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2
                          text-sm text-white/70 dark:text-slate-200 flex items-center gap-2">
                          <span>Hover to see details</span>
                          <svg className="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14m0 0l-6-6m6 6l6-6" 
                              stroke="currentColor" strokeWidth="2" 
                              strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute w-full h-full backface-hidden rounded-2xl rotate-y-180
                      bg-white/5 dark:bg-indigo-500/10 backdrop-blur-md
                      border border-white/20 dark:border-indigo-500/30
                      shadow-xl transition-all duration-500"
                    >
                      <div className="h-full w-full p-8 flex flex-col items-center justify-between">
                        {/* Project Header */}
                        <div className="text-center mb-4">
                          <h4 className="text-2xl font-bold mb-2 
                            bg-gradient-to-r from-pink-400 to-purple-500 
                            bg-clip-text text-transparent text-shadow">
                            Pinky's Up Social
                          </h4>
                          <p className="text-white/80 dark:text-slate-200 text-sm">
                            Social Media Platform
                          </p>
                        </div>

                        {/* Project Details */}
                        <div className="w-full space-y-4">
                          {/* Tech Stack */}
                          <div className="space-y-2">
                            <h5 className="text-white/90 dark:text-slate-100 font-semibold">
                              Tech Stack
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Prisma', 'tRPC'].map((tech) => (
                                <span key={tech} className="px-2 py-1 text-xs rounded-full
                                  bg-pink-500/20 text-white dark:text-slate-50 border border-pink-500/30">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Key Features */}
                          <div className="space-y-2">
                            <h5 className="text-white/90 dark:text-slate-100 font-semibold">
                              Key Features
                            </h5>
                            <ul className="text-sm text-white/80 dark:text-slate-200 space-y-1 list-disc list-inside">
                              <li>Real-time messaging & notifications</li>
                              <li>Social authentication</li>
                              <li>Interactive post creation</li>
                              <li>Responsive design</li>
                            </ul>
                          </div>

                          {/* Metrics */}
                          <div className="flex justify-around text-center">
                            <div>
                              <div className="text-lg font-bold text-pink-400">99%</div>
                              <div className="text-xs text-white/70">Performance</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-purple-400">100%</div>
                              <div className="text-xs text-white/70">Accessibility</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-pink-400">98%</div>
                              <div className="text-xs text-white/70">SEO</div>
                            </div>
                          </div>
                        </div>

                        {/* Visit Link */}
                        <a href="https://www.pinkysup.social" 
                           target="_blank"
                           rel="noopener noreferrer" 
                           className="mt-4 px-6 py-2 rounded-full
                             bg-gradient-to-r from-pink-500 to-purple-600
                             text-white font-medium text-sm
                             hover:shadow-lg hover:shadow-pink-500/25
                             transition-all duration-300
                             hover:scale-105 active:scale-95">
                          Visit Project
                        </a>
                      </div>
                    </div>
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
