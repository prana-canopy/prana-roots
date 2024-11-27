'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, DotIcon } from './icons';
import { Eye, MousePointerClick, Clock, Users } from 'lucide-react';

interface CarouselCard {
  title: string;
  description: string;
  icon: string;
}

const cards: CarouselCard[] = [
  {
    title: "Web Development",
    description: "Creating modern, responsive websites with cutting-edge technologies.",
    icon: "/pinkys.png"
  },
  {
    title: "Coming Soon",
    description: "Exciting new features are on the way!",
    icon: "https://source.unsplash.com/random/800x600/?technology"
  },
  {
    title: "Coming Soon",
    description: "Stay tuned for updates!",
    icon: "https://source.unsplash.com/random/800x600/?innovation"
  }
];

export default function RotatingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
    setIsAutoPlaying(false); // Stop auto-playing
    setTimeout(() => setIsAutoPlaying(true), 7000); // Restart auto-playing after 7 seconds
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 7000); // Rotate every 7 seconds

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  useEffect(() => {
    // Removed the auto-flip interval
  }, []);

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

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const generateRandomMetrics = () => {
    return Array.from({ length: 12 }).map(() => Math.floor(Math.random() * 100));
  };

  const [metrics, setMetrics] = useState<number[]>(generateRandomMetrics());

  useEffect(() => {
    metrics.forEach((metric, index) => {
      const element = document.getElementById(`metric-${index}`);
      if (element) {
        let start = 0;
        const end = metric;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / end));
        const timer = setInterval(() => {
          start += 1;
          element.innerText = `${start}%`;
          if (start === end) {
            clearInterval(timer);
          }
        }, stepTime);
      }
    });
  }, [metrics]);

  useEffect(() => {
    setMetrics(generateRandomMetrics());
  }, [currentIndex]);

  const statsData = [
    { name: "Mon", visits: 200 },
    { name: "Tue", visits: 300 },
    { name: "Wed", visits: 400 },
    { name: "Thu", visits: 350 },
    { name: "Fri", visits: 500 },
    { name: "Sat", visits: 450 },
    { name: "Sun", visits: 400 },
  ];

  function MetricCard({ title, value, change, icon }) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{title}</h4>
          {icon}
        </div>
        <div className="text-2xl font-bold mt-2">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {change > 0 ? (
            <span className="text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7 7 7" />
              </svg>
              {change}%
            </span>
          ) : (
            <span className="text-red-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7" />
              </svg>
              {Math.abs(change)}%
            </span>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 relative overflow-hidden">
      <div className="relative h-[600px] w-full perspective-1000">
        {/* Arrow Navigation */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full 
            bg-black/30 dark:bg-indigo-500/20 backdrop-blur-sm border border-white/20 
            hover:bg-black/40 dark:hover:bg-indigo-500/30 transition-all duration-300
            hover:scale-110 active:scale-95 group"
        >
          <ChevronLeftIcon className="w-8 h-8 text-white dark:text-white group-hover:text-white" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full 
            bg-black/30 dark:bg-indigo-500/20 backdrop-blur-sm border border-white/20 
            hover:bg-black/40 dark:hover:bg-indigo-500/30 transition-all duration-300
            hover:scale-110 active:scale-95 group"
        >
          <ChevronRightIcon className="w-8 h-8 text-white dark:text-white group-hover:text-white" />
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
                <div className="w-full max-w-4xl h-[500px] perspective relative">
                  {/* Discover More Button */}
                  <button
                    onClick={handleFlip}
                    className="absolute top-4 right-4 z-20 px-6 py-2 rounded-full 
                      bg-black-900/20 dark:bg-indigo-500/40 backdrop-blur-lg text-gray-800 font-medium shadow-2xl border border-white/30 hover:bg-white/30
                      transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                  >
                    {isFlipped ? 'Preview' : 'Statistics'}
                  </button>
                  {/* Flipping Card */}
                  <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    {/* Front Side */}
                    <div className="absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-pink-400/20 to-pink-600/20 backdrop-blur-md border border-pink-400/30 shadow-xl transition-all duration-500">
                      <img src={cards[currentIndex].icon} alt="App Showcase" className="w-full h-full object-cover rounded-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 p-4 text-white">
                          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent">
                            {cards[currentIndex].title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute w-full h-full backface-hidden rounded-2xl rotate-y-180
                      bg-white/5 dark:bg-indigo-500/10 backdrop-blur-md
                      border border-white/20 dark:border-indigo-500/30
                      shadow-xl transition-all duration-500"
                    >
                      <div className="w-full h-full p-6 flex flex-col items-center justify-between space-y-4 overflow-hidden">
                        {/* Project Header */}
                        <div className="text-left mb-2">
                          <h4 className="text-2xl font-bold mb-1 
                            bg-gradient-to-r from-pink-400 to-gray-800 
                            bg-clip-text text-transparent text-shadow">
                            Pinky's Up Social
                          </h4>
                          <p className="text-white/80 dark:text-slate-200 text-base">
                            Social Media Platform
                          </p>
                        </div>

                        {/* Key Metrics */}
                        <div className="w-full p-4 text-black dark:text-white">
                          <h2 className="text-2xl font-bold mb-4">Website Statistics</h2>
                          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <MetricCard
                              title="Total Visits"
                              value="1,234"
                              change={2.5}
                              icon={<Eye className="h-4 w-4 text-muted-foreground" />}
                            />
                            <MetricCard
                              title="Bounce Rate"
                              value="42%"
                              change={-1.5}
                              icon={<MousePointerClick className="h-4 w-4 text-muted-foreground" />}
                            />
                            <MetricCard
                              title="Avg. Session"
                              value="3m 42s"
                              change={0.8}
                              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
                            />
                            <MetricCard
                              title="Unique Visitors"
                              value="876"
                              change={1.2}
                              icon={<Users className="h-4 w-4 text-muted-foreground" />}
                            />
                          </div>
                          <div className="mt-4">
                            <h3 className="text-lg font-semibold">Visits Overview</h3>
                            <p className="text-center text-sm mt-2">Graphical data representation coming soon!</p>
                          </div>
                        </div>

                        {/* Testimonials with Profile Picture */}
                        <div className="w-full px-2 py-1 bg-white/20 dark:bg-white/10 rounded-lg shadow-md text-black dark:text-white text-center flex items-center justify-center my-4">
                          <img src="https://source.unsplash.com/random/100x100/?person" alt="Reviewer" className="w-10 h-10 rounded-full mr-2" />
                          <div>
                            <p className="italic">"An exceptional platform that has transformed our engagement!"</p>
                            <span className="block mt-1 text-xs text-gray-800 dark:text-white/70">- Tech Reviewer</span>
                          </div>
                        </div>

                        {/* Additional Information */}
                        <div className="w-full px-3 py-1 bg-white/20 dark:bg-white/10 rounded-lg shadow-md text-black dark:text-white">
                          <h5 className="text-base font-semibold mb-1">Features & Highlights</h5>
                          <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Real-time messaging & notifications</li>
                            <li>Social authentication with multiple providers</li>
                            <li>Interactive post creation and sharing</li>
                            <li>Responsive and adaptive design</li>
                            <li>Comprehensive analytics and reporting tools</li>
                          </ul>
                        </div>
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
          carousel-navigation flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 dark:bg-white/10">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`transition-all duration-300 hover:scale-125 ${
                currentIndex === index ? 'bg-pink-500 dark:bg-pink-500' : 'bg-gray-300 dark:bg-gray-600'
              } w-3 h-3 rounded-full`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
