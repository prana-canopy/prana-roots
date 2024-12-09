'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Eye, MousePointerClick, Clock, Users, Leaf, TrendingUp, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';

const PlaceholderChart = () => {
  const { resolvedTheme: theme } = useTheme();
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-lg border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
      <div className={`${theme === 'dark' ? 'text-white/70' : 'text-black/70'} text-center`}>
        <p className="mb-2">Chart Placeholder</p>
        <p className="text-sm">Visitor metrics visualization will appear here</p>
        <div className="mt-4 flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--megaman)]" />
            <span className="text-sm">Visitors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--frozen-turquoise)]" />
            <span className="text-sm">Engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--heart-of-ice)]" />
            <span className="text-sm">Conversions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricHistory {
  date: string;
  visitors: number;
  engagement: number;
  conversions: number;
}

interface CarouselCard {
  title: string;
  description: string;
  previewImage: string;
  metrics: {
    current: {
      visitors: string;
      engagement: string;
      timeSpent: string;
      conversion: string;
    };
    history: MetricHistory[];
  };
  features: string[];
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    image: string;
  };
  techStack: string[];
}

const generateMetricHistory = (baseline: number, days: number): MetricHistory[] => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    visitors: Math.floor(baseline * (1 + Math.sin(i / 3) * 0.3)),
    engagement: Math.floor(65 + Math.cos(i / 2) * 15),
    conversions: Math.floor(8 + Math.sin(i / 4) * 3),
  }));
};

const cards: CarouselCard[] = [
  {
    title: "Pinky's Up DC",
    description: "Elevating nightlife experiences through social connectivity",
    previewImage: "pinkys.png",
    metrics: {
      current: {
        visitors: "5,234",
        engagement: "78%",
        timeSpent: "6m 45s",
        conversion: "12.3%"
      },
      history: generateMetricHistory(5200, 14)
    },
    features: [
      "Real-time venue capacity tracking",
      "Social event discovery",
      "VIP reservations and experiences",
      "Interactive venue maps"
    ],
    testimonial: {
      quote: "Prana Roots transformed our digital presence and helped us connect with our audience in meaningful ways.",
      author: "Pinky's Up Team",
      company: "Pinky's Up Social",
      image: "pinkys.png"
    },
    techStack: ["React", "Next.js", "TailwindCSS", "Node.js"]
  },
  // {
  //   title: "Biodiversity Analytics Dashboard",
  //   description: "Connecting conservation with cutting-edge tech",
  //   previewImage: "pinkys.png",
  //   metrics: {
  //     current: {
  //       visitors: "3,156",
  //       engagement: "72%",
  //       timeSpent: "5m 03s",
  //       conversion: "9.4%"
  //     },
  //     history: generateMetricHistory(3100, 14)
  //   },
  //   features: [
  //     "Species tracking visualization",
  //     "Habitat health monitoring",
  //     "Conservation impact metrics",
  //     "Biodiversity mapping"
  //   ],
  //   testimonial: {
  //     quote: "The dashboard has revolutionized how we track and protect local ecosystems.",
  //     author: "Michael Torres",
  //     company: "Wildlife Conservation Tech",
  //     image: "pinkys.png"
  //   },
  //   techStack: ["React", "D3.js", "Python", "PostgreSQL"]
  // }
];

interface RotatingCarouselProps {
  value: string;
}

interface TabButtonProps {
  tab: 'overview' | 'metrics' | 'features';
  label: string;
}

export default function RotatingCarousel({ value }: RotatingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'features'>('overview');
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection(direction as "prev" | "next");
      setCurrentIndex(
        direction === 'next'
          ? (currentIndex + 1) % cards.length
          : (currentIndex - 1 + cards.length) % cards.length
      );
    }, 10000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const slideVariants = {
    enter: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: 'next' | 'prev') => ({
      zIndex: 0,
      x: direction === 'next' ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
    })
  };

  const MetricCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    trend: number;
    timeframe?: string;
    lastUpdated?: string;
    caption?: string;
  }> = ({ 
    icon, 
    label, 
    value, 
    trend, 
    timeframe = 'Last 30 days', 
    lastUpdated = 'Updated 2 hours ago',
    caption = 'Based on aggregated customer data'
  }) => {
    const [count, setCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });
    const numericValue = parseInt(value.replace(/,/g, ''));
    
    useEffect(() => {
      if (!isInView) return;
      
      const duration = 2000;
      const steps = 60;
      const stepValue = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        if (current < numericValue) {
          current = Math.min(current + stepValue, numericValue);
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }, [numericValue, isInView]);

    return (
      <motion.div 
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative overflow-visible ${theme === 'dark' ? 'bg-white/10' : 'bg-black/5'} backdrop-blur-md rounded-lg p-2.5 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} transition-all duration-300 hover:scale-105 h-[140px]`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-lg opacity-5">
          <motion.div 
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"
          />
          <motion.div 
            animate={{
              rotate: isHovered ? -360 : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-10 h-10 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-lg"
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className={`${theme === 'dark' ? 'text-white/70' : 'text-black/70'} text-[9px] uppercase tracking-wide font-medium`}>
                  {label}
                </span>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className={`p-1 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} shrink-0`}
                >
                  {React.cloneElement(icon as React.ReactElement, {
                    className: 'w-3.5 h-3.5'
                  })}
                </motion.div>
              </div>
              <div className="flex items-center justify-between text-[9px] leading-none mt-1">
                <span className={`${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                  {timeframe}
                </span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}
                >
                  {lastUpdated}
                </motion.span>
              </div>
            </div>
          </div>

          {/* Value and Trend */}
          <div className="flex-1 flex flex-col justify-between">
            <motion.div 
              className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} flex items-baseline gap-0.5 mt-1`}
            >
              {value.includes('%') ? (
                <>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    key={count}
                  >
                    {Math.floor(count)}
                  </motion.span>
                  <span className="text-xs font-normal opacity-70">%</span>
                </>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  key={count}
                >
                  {count.toLocaleString()}
                </motion.span>
              )}
            </motion.div>

            {/* Bottom Section */}
            <div className="space-y-1">
              <div className={`flex items-center gap-1.5 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="flex items-center gap-0.5 text-[11px] font-medium whitespace-nowrap"
                >
                  {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                  <TrendingUp className="w-2.5 h-2.5" />
                </motion.div>
                <div className={`h-0.5 flex-grow rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${Math.min(Math.abs(trend) * 5, 100)}%` } : { width: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${trend >= 0 ? 'bg-green-400' : 'bg-red-400'}`}
                  />
                </div>
              </div>
              
              {/* Caption */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative group"
              >
                <div className={`text-[9px] leading-none ${theme === 'dark' ? 'text-white/40' : 'text-black/40'} flex items-center gap-0.5`}>
                  <span>{caption}</span>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="cursor-help shrink-0"
                  >
                    ⓘ
                  </motion.div>
                </div>
                <div className="fixed z-50 bottom-full left-0 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className={`p-1.5 rounded text-[10px] leading-tight ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black'} backdrop-blur-md whitespace-nowrap shadow-lg border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                    Data collected and verified by our analytics team
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const TabButton: React.FC<TabButtonProps> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        activeTab === tab 
          ? `${theme === 'dark' ? 'bg-white/20 text-white' : 'bg-black/10 text-black'}`
          : `${theme === 'dark' ? 'text-white/70 hover:bg-white/10' : 'text-black/70 hover:bg-black/5'}`
      }`}
    >
      {label}
    </button>
  );

  if (!mounted) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="relative h-[700px] perspective">
        {/* Navigation Buttons */}
        <div className="absolute inset-x-2 md:inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20">
          {['prev', 'next'].map((direction) => (
            <button
              key={direction}
              onClick={() => {
                setDirection(direction as "prev" | "next");
                setCurrentIndex(
                  direction === 'next'
                    ? (currentIndex + 1) % cards.length
                    : (currentIndex - 1 + cards.length) % cards.length
                );
              }}
              className={`p-2 md:p-3 rounded-full ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} 
                backdrop-blur-md transition-colors duration-300 text-white`}
              aria-label={`Show ${direction} slide`}
            >
              {direction === 'prev' ? '←' : '→'}
            </button>
          ))}
        </div>

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
              opacity: { duration: 0.3 },
              scale: { duration: 0.4 }
            }}
            className="absolute w-full h-full"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-[var(--megaman)]/20 to-[var(--frozen-turquoise)]/20' : 'from-[var(--megaman)]/10 to-[var(--frozen-turquoise)]/10'} backdrop-blur-md border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} h-[700px]`}>
                
                <div className="relative h-full p-8 flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                      <motion.h2 
                        className={`text-3xl font-bold bg-gradient-to-r from-[#ffc0cb] to-[#ffb6c1] bg-clip-text text-transparent cursor-pointer`}
                        whileHover={{
                          backgroundImage: "linear-gradient(to right, #ffb6c1, #ffc0cb, #ffb6c1)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {cards[currentIndex].title}
                      </motion.h2>
                      <p className={`text-lg ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                        {cards[currentIndex].description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <TabButton tab="overview" label="Overview" />
                      <TabButton tab="metrics" label="Metrics" />
                      <TabButton tab="features" label="Features" />
                    </div>
                  </div>

                  {/* Content based on active tab */}
                  <div className="flex-1 overflow-hidden">
                    {activeTab === 'overview' && (
                      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                        {/* Left Column: Business Impact */}
                        <div className="space-y-4">
                          {/* Key Metrics */}
                          <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-4 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-3`}>
                              Business Impact
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              <MetricCard
                                icon={<Eye className="w-5 h-5" />}
                                label="Total Views"
                                value="125,000"
                                trend={12}
                                timeframe="30d"
                                lastUpdated="1h ago"
                                caption="Web visitors"
                              />
                              <MetricCard
                                icon={<MousePointerClick className="w-5 h-5" />}
                                label="Engagement"
                                value="68"
                                trend={8}
                                timeframe="Q4"
                                lastUpdated="Live"
                                caption="Time on site"
                              />
                              <MetricCard
                                icon={<Users className="w-5 h-5" />}
                                label="Customers"
                                value="15,200"
                                trend={-3}
                                timeframe="YTD"
                                lastUpdated="Daily"
                                caption="Active users"
                              />
                              <MetricCard
                                icon={<Globe className="w-5 h-5" />}
                                label="Market Share"
                                value="85"
                                trend={15}
                                timeframe="2023"
                                lastUpdated="Dec 8"
                                caption="Global reach"
                              />
                            </div>
                          </div>

                          {/* Client Testimonial */}
                          {cards[currentIndex].testimonial && (
                            <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-4 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                              <div className="flex items-center gap-3 mb-3">
                                <img 
                                  src={cards[currentIndex].testimonial.image}
                                  alt={cards[currentIndex].testimonial.author}
                                  className="w-12 h-12 rounded-full ring-2 ring-[var(--megaman)]/30"
                                />
                                <div>
                                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                    {cards[currentIndex].testimonial.author}
                                  </p>
                                  <p className={`text-sm ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                                    {cards[currentIndex].testimonial.company}
                                  </p>
                                </div>
                              </div>
                              <blockquote className={`${theme === 'dark' ? 'text-white/90' : 'text-black/90'} italic text-sm leading-relaxed`}>
                                "{cards[currentIndex].testimonial.quote}"
                              </blockquote>
                            </div>
                          )}

                          {/* Tech Stack */}
                          <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-4 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                            <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'} mb-3`}>
                              Technologies Used
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {cards[currentIndex].techStack.map((tech) => (
                                <span 
                                  key={tech} 
                                  className={`px-2 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-white/20 text-white' : 'bg-black/10 text-black'}`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Preview & Description */}
                        <div className="space-y-4">
                          {/* Site Preview */}
                          <div className={`relative w-full h-fit rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} group hover:border-[var(--megaman)] transition-all duration-300`}>
                            {/* Browser Frame */}
                            <div className={`h-6 md:h-8 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'} flex items-center px-2 md:px-4 space-x-2`}>
                              <div className="flex space-x-1 md:space-x-2">
                                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                              </div>
                            </div>
                            <div className="relative w-full">
                              <div className="absolute inset-0 bg-black/20 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500 z-10" />
                              <img 
                                src={cards[currentIndex].previewImage}
                                alt={`${cards[currentIndex].title} Preview`}
                                className="w-full h-auto object-contain
                                  filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 
                                  transform group-hover:scale-105 transition-all duration-500"
                              />
                            </div>
                          </div>

                          {/* Project Info */}
                          <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-4 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-2`}>
                              {cards[currentIndex].title}
                            </h2>
                            <p className={`text-sm ${theme === 'dark' ? 'text-white/80' : 'text-black/80'} mb-4`}>
                              {cards[currentIndex].description}
                            </p>
                            <a 
                              href="https://www.pinkysup.social" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                                bg-[var(--megaman)]/10 text-[var(--megaman)]
                                hover:bg-[var(--megaman)]/20 transition-colors duration-300"
                            >
                              Visit Website
                              <span aria-hidden="true">→</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'metrics' && (
                      <div className="h-full space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                          <MetricCard
                            icon={<Eye className="w-4 h-4 md:w-5 md:h-5 text-white/70" />}
                            label="Visitors"
                            value={cards[currentIndex].metrics.current.visitors}
                            trend={5.2}
                          />
                          <MetricCard
                            icon={<MousePointerClick className="w-4 h-4 md:w-5 md:h-5 text-white/70" />}
                            label="Engagement"
                            value={cards[currentIndex].metrics.current.engagement}
                            trend={3.8}
                          />
                          <MetricCard
                            icon={<Clock className="w-4 h-4 md:w-5 md:h-5 text-white/70" />}
                            label="Avg. Time"
                            value={cards[currentIndex].metrics.current.timeSpent}
                            trend={-2.1}
                          />
                          <MetricCard
                            icon={<Users className="w-4 h-4 md:w-5 md:h-5 text-white/70" />}
                            label="Conversion"
                            value={cards[currentIndex].metrics.current.conversion}
                            trend={7.4}
                          />
                        </div>

                        <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} h-[300px]`}>
                          <h3 className={`text-white ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>Performance Trends</h3>
                          <PlaceholderChart />
                        </div>
                      </div>
                    )}

                    {activeTab === 'features' && (
                      <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <div className="space-y-4 md:space-y-6">
                          <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                            <h3 className={`text-lg md:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-3 md:mb-4`}>Key Features</h3>
                            <ul className="space-y-4">
                              {cards[currentIndex].features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-white/90">
                                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[var(--frozen-turquoise)]" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-4 md:p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                            <h3 className={`text-lg md:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-3 md:mb-4`}>Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                              {cards[currentIndex].techStack.map((tech) => (
                                <span 
                                  key={tech} 
                                  className={`px-2 py-1 md:px-3 md:py-1.5 text-sm rounded-full ${theme === 'dark' ? 'bg-white/20 text-white' : 'bg-black/10 text-black'}`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                          <h3 className={`text-lg md:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-3 md:mb-4`}>Implementation Timeline</h3>
                          <div className="space-y-6">
                            <div className="relative pl-8 border-l-2 border-white/20">
                              <div className="absolute left-0 top-1.5 w-4 h-4 -translate-x-[9px] rounded-full bg-[var(--megaman)]" />
                              <h4 className={`text-white ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>Discovery & Planning</h4>
                              <p className={`text-white/70 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>2 weeks</p>
                            </div>
                            <div className="relative pl-8 border-l-2 border-white/20">
                              <div className="absolute left-0 top-1.5 w-4 h-4 -translate-x-[9px] rounded-full bg-[var(--frozen-turquoise)]" />
                              <h4 className={`text-white ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>Design & Development</h4>
                              <p className={`text-white/70 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>6-8 weeks</p>
                            </div>
                            <div className="relative pl-8 border-l-2 border-white/20">
                              <div className="absolute left-0 top-1.5 w-4 h-4 -translate-x-[9px] rounded-full bg-[var(--heart-of-ice)]" />
                              <h4 className={`text-white ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>Testing & Refinement</h4>
                              <p className={`text-white/70 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>2 weeks</p>
                            </div>
                            <div className="relative pl-8">
                              <div className="absolute left-0 top-1.5 w-4 h-4 -translate-x-[9px] rounded-full bg-[var(--electric-lettuce)]" />
                              <h4 className={`text-white ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>Launch & Support</h4>
                              <p className={`text-white/70 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Ongoing</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'next' : 'prev' as "prev" | "next");
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${currentIndex === index 
                  ? `${theme === 'dark' ? 'bg-white w-6' : 'bg-black w-6'}`
                  : `${theme === 'dark' ? 'bg-white/50 hover:bg-white/70' : 'bg-black/50 hover:bg-black/70'}`
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}