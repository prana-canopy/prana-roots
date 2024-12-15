'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Users,
  Search,
  Smartphone,
  Share2,
  Trophy,
  Zap,
  Cpu,
  Shield,
  Info,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MetricCard } from './metric-card';
import { cards } from './data/success-stories-data';

interface SuccessStoriesProps {
  value: string;
}

interface TabButtonProps {
  tab: 'overview' | 'metrics' | 'features';
  label: string;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function SuccessStories({ value }: SuccessStoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'features'>('overview');
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const TabButton = ({ tab, label }: TabButtonProps) => (
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
    <TooltipProvider delayDuration={100}>
      <div className="w-full h-full flex flex-col">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-16">
          <div className="relative h-[500px] sm:h-[600px] md:h-[700px] perspective">
            {/* Navigation Buttons */}
            <div className="absolute inset-x-1 sm:inset-x-2 md:inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20">
              {['prev', 'next'].map((direction) => (
                <button
                  key={direction}
                  onClick={() => {
                    setDirection(direction as 'prev' | 'next');
                    setCurrentIndex(
                      direction === 'next'
                        ? (currentIndex + 1) % cards.length
                        : (currentIndex - 1 + cards.length) % cards.length
                    );
                  }}
                  className={`p-2 sm:p-3 md:p-4 rounded-full 
                    ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} 
                    backdrop-blur-md transition-all duration-300 
                    hover:scale-110 active:scale-95
                    text-white shadow-lg`}
                  aria-label={`Show ${direction} slide`}
                >
                  {direction === 'prev' ? '←' : '→'}
                </button>
              ))}
            </div>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    setDirection('next');
                    setCurrentIndex((currentIndex + 1) % cards.length);
                  } else if (swipe > swipeConfidenceThreshold) {
                    setDirection('prev');
                    setCurrentIndex((currentIndex - 1 + cards.length) % cards.length);
                  }
                }}
                className="absolute w-full h-full"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      theme === 'dark'
                        ? 'from-[var(--megaman)]/20 via-[var(--frozen-turquoise)]/15 to-[var(--heart-of-ice)]/20'
                        : 'from-[var(--megaman)]/10 via-[var(--frozen-turquoise)]/5 to-[var(--heart-of-ice)]/10'
                    } backdrop-blur-md border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} h-full`}
                  >
                    <div className="relative h-full p-3 sm:p-6 md:p-8 flex flex-col">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
                        <div className="space-y-1 sm:space-y-2">
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                            <motion.span
                              className="inline-block bg-clip-text text-transparent cursor-pointer"
                              style={{
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundImage: 'linear-gradient(to right, #ffc0cb, #ffb6c1)',
                              }}
                              initial={{
                                backgroundImage: 'linear-gradient(to right, #ffc0cb, #ffb6c1)',
                              }}
                              whileHover={{
                                backgroundImage: 'linear-gradient(to right, #ff1493, #ff0066)',
                                scale: 1.05,
                                textShadow: '0 0 8px rgba(255,20,147,0.3)',
                              }}
                              transition={{
                                duration: 0.15,
                                ease: [0.23, 1, 0.32, 1],
                              }}
                            >
                              {cards[currentIndex].title}
                            </motion.span>
                          </h2>
                          <p
                            className={`text-sm sm:text-base md:text-lg ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}
                          >
                            <motion.span
                              className="inline-block bg-clip-text cursor-default"
                              style={{
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundImage:
                                  theme === 'dark'
                                    ? 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.8))'
                                    : 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.8))',
                              }}
                              whileHover={{
                                backgroundImage:
                                  theme === 'dark'
                                    ? 'linear-gradient(to right, #e0e0e0, #a0a0a0, #e0e0e0)'
                                    : 'linear-gradient(to right, #1a1a1a, #404040, #1a1a1a)',
                                backgroundSize: '200% 100%',
                                backgroundPosition: ['0% 0%', '100% 0%'],
                              }}
                              transition={{
                                duration: 0.15,
                                ease: [0.23, 1, 0.32, 1],
                                backgroundPosition: {
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'linear',
                                },
                              }}
                            >
                              {cards[currentIndex].description}
                            </motion.span>
                          </p>
                        </div>
                        <div className="flex gap-1 sm:gap-2">
                          <TabButton tab="overview" label="Overview" />
                        </div>
                      </div>

                      {/* Content based on active tab */}
                      <div className="flex-1 overflow-y-auto">
                        {activeTab === 'overview' && (
                          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                            {/* Left Column: Performance Metrics */}
                            <div className="space-y-3 sm:space-y-4">
                              {/* Key Metrics */}
                              <div
                                className={`
                                                   bg-white/10 
                                                   ${theme === 'dark' ? 'backdrop-blur-md' : ''} 
                                                   rounded-lg p-2 sm:p-4 border 
                                                   ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} 
                                                   relative overflow-visible
                                                   transition-opacity duration-300
                                                   hover:opacity-80
                                                `}
                              >
                                <h3
                                  className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-2 sm:mb-3`}
                                >
                                  Performance Metrics
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 relative">
                                  {/* Adding a relative wrapper for each MetricCard to contain its tooltip */}
                                  <div className="relative z-[5]">
                                    <MetricCard
                                      icon={<Search className="w-5 h-5" />}
                                      label="SEO"
                                      value="100"
                                      trend={15}
                                      caption="Search optimization"
                                      index={0}
                                    />
                                  </div>
                                  <div className="relative z-[4]">
                                    <MetricCard
                                      icon={<Users className="w-5 h-5" />}
                                      label="Accessibility"
                                      value="94"
                                      trend={12}
                                      caption="WCAG compliance"
                                      index={1}
                                    />
                                  </div>
                                  <div className="relative z-[3]">
                                    <MetricCard
                                      icon={<Shield className="w-5 h-5" />}
                                      label="Security"
                                      value="100"
                                      trend={0}
                                      caption="Best practices"
                                      index={2}
                                    />
                                  </div>
                                  <div className="relative z-[2]">
                                    <MetricCard
                                      icon={<Zap className="w-5 h-5" />}
                                      label="Performance"
                                      value="98"
                                      trend={8}
                                      caption="Loading speed"
                                      index={3}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Client Testimonial */}
                              {cards[currentIndex].testimonial && (
                                <motion.div
                                  className={`bg-white/5 backdrop-blur-sm rounded-lg border 
                                    ${theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20'} 
                                    relative group overflow-hidden`}
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                >
                                  {/* Gradient Background */}
                                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />

                                  <div className="relative p-4">
                                    <div className="flex items-center gap-3">
                                      {/* Author Image */}
                                      <motion.div
                                        className="relative shrink-0"
                                        whileHover={{ scale: 1.05 }}
                                      >
                                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--megaman)]/20 group-hover:ring-[var(--megaman)]/40 transition-all">
                                          <img
                                            src={cards[currentIndex].testimonial.image}
                                            alt={cards[currentIndex].testimonial.author}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      </motion.div>

                                      {/* Author Info */}
                                      <div className="flex-1 min-w-0">
                                        <h4
                                          className={`font-medium text-sm truncate
                                          ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                        >
                                          {cards[currentIndex].testimonial.author}
                                        </h4>
                                        <p
                                          className={`text-xs truncate
                                          ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}
                                        >
                                          {cards[currentIndex].testimonial.company}
                                        </p>
                                      </div>

                                      {/* Quote Icon */}
                                      <div
                                        className={`shrink-0 opacity-20 group-hover:opacity-40 transition-opacity
                                        ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                      >
                                        <svg
                                          className="w-6 h-6"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                        >
                                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                      </div>
                                    </div>

                                    {/* Quote Text */}
                                    <p
                                      className={`text-sm mt-2 line-clamp-2 leading-relaxed
                                      ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}
                                    >
                                      "{cards[currentIndex].testimonial.quote}"
                                    </p>
                                  </div>
                                </motion.div>
                              )}

                              {/* Technical Insights */}
                              <div
                                className={`bg-white/5 backdrop-blur-sm rounded-lg p-3 border 
                                ${theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20'} 
                                relative group overflow-hidden`}
                              >
                                {/* Gradient Background */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />

                                <div className="relative space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Cpu
                                        className={`w-4 h-4 ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}
                                      />
                                      <h3
                                        className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                      >
                                        Technical Insights
                                      </h3>
                                    </div>
                                  </div>

                                  {/* Tech Categories */}
                                  <div className="grid grid-cols-3 gap-1.5">
                                    {/* Frontend */}
                                    <div className="group/tech relative rounded-md">
                                      <div
                                        className={`absolute inset-0 rounded-md opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300
                                        bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#2563EB]`}
                                      />
                                      <div
                                        className={`relative flex flex-col gap-1 p-1.5 rounded-md text-xs h-full
                                        border ${
                                          theme === 'dark'
                                            ? 'bg-black/20 border-white/20'
                                            : 'bg-white/60 border-black/20'
                                        }
                                        group-hover/tech:border-[#3B82F6]/40
                                        transition-all duration-300`}
                                      >
                                        <div className="flex items-center gap-1.5">
                                          <div
                                            className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                                            ${theme === 'dark' ? 'bg-black/30' : 'bg-white/80'}`}
                                          >
                                            <Smartphone className="w-2.5 h-2.5 text-[#3B82F6]" />
                                          </div>
                                          <span
                                            className={`font-medium ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}
                                          >
                                            Frontend
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {cards[currentIndex].techStack
                                            .filter((tech) =>
                                              [
                                                'React',
                                                'Next.js',
                                                'TailwindCSS',
                                                'TypeScript',
                                                'Framer Motion',
                                              ].includes(tech)
                                            )
                                            .map((tech, i) => (
                                              <span
                                                key={i}
                                                className={`px-1 py-0.5 rounded text-[10px] 
                                                ${
                                                  theme === 'dark'
                                                    ? 'bg-black/30 text-white/80'
                                                    : 'bg-white/80 text-black/80'
                                                }
                                                group-hover/tech:text-[#3B82F6]`}
                                              >
                                                {tech}
                                              </span>
                                            ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Backend */}
                                    <div className="group/tech relative rounded-md">
                                      <div
                                        className={`absolute inset-0 rounded-md opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300
                                        bg-gradient-to-br from-[#34D399] via-[#10B981] to-[#059669]`}
                                      />
                                      <div
                                        className={`relative flex flex-col gap-1 p-1.5 rounded-md text-xs h-full
                                        border ${
                                          theme === 'dark'
                                            ? 'bg-black/20 border-white/20'
                                            : 'bg-white/60 border-black/20'
                                        }
                                        group-hover/tech:border-[#10B981]/40
                                        transition-all duration-300`}
                                      >
                                        <div className="flex items-center gap-1.5">
                                          <div
                                            className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                                            ${theme === 'dark' ? 'bg-black/30' : 'bg-white/80'}`}
                                          >
                                            <Shield className="w-2.5 h-2.5 text-[#10B981]" />
                                          </div>
                                          <span
                                            className={`font-medium ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}
                                          >
                                            Backend
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {cards[currentIndex].techStack
                                            .filter((tech) =>
                                              [
                                                'Node.js',
                                                'Express',
                                                'MongoDB',
                                                'Socket.io',
                                              ].includes(tech)
                                            )
                                            .map((tech, i) => (
                                              <span
                                                key={i}
                                                className={`px-1 py-0.5 rounded text-[10px] 
                                                ${
                                                  theme === 'dark'
                                                    ? 'bg-black/30 text-white/80'
                                                    : 'bg-white/80 text-black/80'
                                                }
                                                group-hover/tech:text-[#10B981]`}
                                              >
                                                {tech}
                                              </span>
                                            ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Infrastructure */}
                                    <div className="group/tech relative rounded-md">
                                      <div
                                        className={`absolute inset-0 rounded-md opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300
                                        bg-gradient-to-br from-[#F472B6] via-[#EC4899] to-[#DB2777]`}
                                      />
                                      <div
                                        className={`relative flex flex-col gap-1 p-1.5 rounded-md text-xs h-full
                                        border ${
                                          theme === 'dark'
                                            ? 'bg-black/20 border-white/20'
                                            : 'bg-white/60 border-black/20'
                                        }
                                        group-hover/tech:border-[#EC4899]/40
                                        transition-all duration-300`}
                                      >
                                        <div className="flex items-center gap-1.5">
                                          <div
                                            className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                                            ${theme === 'dark' ? 'bg-black/30' : 'bg-white/80'}`}
                                          >
                                            <Share2 className="w-2.5 h-2.5 text-[#EC4899]" />
                                          </div>
                                          <span
                                            className={`font-medium ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}
                                          >
                                            Deployment & CMS
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {cards[currentIndex].techStack
                                            .filter((tech) =>
                                              ['Vercel', 'Sanity', 'Cloudinary'].includes(tech)
                                            )
                                            .map((tech, i) => (
                                              <span
                                                key={i}
                                                className={`px-1 py-0.5 rounded text-[10px] 
                                                ${
                                                  theme === 'dark'
                                                    ? 'bg-black/30 text-white/80'
                                                    : 'bg-white/80 text-black/80'
                                                }
                                                group-hover/tech:text-[#EC4899]`}
                                              >
                                                {tech}
                                              </span>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Column: Preview & Description */}
                            <div className="space-y-3 sm:space-y-4">
                              {/* Site Preview with Timeline */}
                              <div className="flex gap-2 sm:gap-3">
                                {/* Site Preview */}
                                <div
                                  className={`flex-1 relative w-full h-fit rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} group hover:border-[var(--megaman)] transition-all duration-500`}
                                >
                                  {/* Browser Frame */}
                                  <div
                                    className={`h-6 sm:h-8 md:h-10 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'} flex items-center px-3 md:px-4 space-x-2 md:space-x-3`}
                                  >
                                    <div className="flex space-x-1.5 md:space-x-2">
                                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 transition-transform group-hover:scale-110"></div>
                                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500 transition-transform group-hover:scale-110"></div>
                                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 transition-transform group-hover:scale-110"></div>
                                    </div>
                                  </div>
                                  <a
                                    href={cards[currentIndex].url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block cursor-pointer"
                                  >
                                    <div className="relative w-full">
                                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10" />
                                      <img
                                        src={cards[currentIndex].previewImage}
                                        alt={cards[currentIndex].title}
                                        className="w-full h-full object-cover
                                          filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 
                                          transform group-hover:scale-105 transition-all duration-700 ease-out"
                                      />
                                    </div>
                                  </a>
                                </div>

                                {/* Compact Timeline */}
                                <div
                                  className={`hidden lg:flex flex-col w-[180px] bg-white/5 backdrop-blur-sm rounded-lg border 
                                  ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} 
                                  relative group overflow-hidden`}
                                >
                                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />

                                  <div className="relative p-3">
                                    <div className="flex items-center gap-1.5 mb-3">
                                      <Clock
                                        className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}
                                      />
                                      <span
                                        className={`text-sm ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}
                                      >
                                        Timeline
                                      </span>
                                    </div>

                                    <div className="relative space-y-3">
                                      {/* Vertical line */}
                                      <div className="absolute left-[5px] top-[10px] w-[1px] h-[calc(100%-20px)] bg-white/10" />

                                      {[
                                        { phase: 'Discovery', duration: '1-2w' },
                                        { phase: 'Design', duration: '2w' },
                                        { phase: 'Development', duration: '4w' },
                                        { phase: 'Testing', duration: '1w' },
                                        { phase: 'Launch', duration: '1w' },
                                      ].map((item, index) => (
                                        <div
                                          key={index}
                                          className="relative flex items-center group/item cursor-pointer"
                                        >
                                          <div
                                            className="absolute left-0 w-[11px] h-[11px] rounded-full border-2 
                                            transition-all duration-500 group-hover/item:scale-125
                                            before:absolute before:inset-0 before:rounded-full 
                                            before:opacity-0 group-hover/item:before:opacity-100
                                            before:transition-opacity before:duration-500
                                            after:absolute after:inset-0 after:rounded-full after:blur-[2px]
                                            after:transition-opacity after:duration-500
                                            after:opacity-0 group-hover/item:after:opacity-50"
                                            style={
                                              {
                                                borderColor: 'rgb(244 114 182)',
                                                backgroundImage:
                                                  'linear-gradient(to right, rgba(244, 114, 182, 0.3), rgba(236, 72, 153, 0.3))',
                                                '--dot-hover-gradient':
                                                  'linear-gradient(to right, rgb(244 114 182), rgb(236 72 153))',
                                                '--dot-glow': 'rgb(244 114 182)',
                                              } as React.CSSProperties
                                            }
                                          >
                                            <div
                                              className="absolute inset-0 rounded-full transition-opacity duration-500 opacity-0 group-hover/item:opacity-100"
                                              style={{
                                                backgroundImage: 'var(--dot-hover-gradient)',
                                              }}
                                            />
                                            <div
                                              className="absolute inset-0 rounded-full transition-opacity duration-500 opacity-0 group-hover/item:opacity-30 blur-sm"
                                              style={{
                                                backgroundColor: 'var(--dot-glow)',
                                              }}
                                            />
                                          </div>
                                          <div
                                            className="flex items-center justify-between w-full pl-6 py-1 
                                            transition-all duration-300 group-hover/item:translate-x-1"
                                          >
                                            <span
                                              className={`text-xs font-medium transition-all duration-300 bg-clip-text text-transparent`}
                                              style={{
                                                backgroundImage:
                                                  theme === 'dark'
                                                    ? 'linear-gradient(to right, #ffffff, #d1d5db, #ffffff)'
                                                    : 'linear-gradient(to right, #1f2937, #4b5563, #1f2937)',
                                              }}
                                            >
                                              {item.phase}
                                            </span>
                                            <span
                                              className={`text-[10px] transition-all duration-300`}
                                              style={{
                                                color: theme === 'dark' ? '#d1d5db' : '#4b5563',
                                                opacity: 0.8,
                                              }}
                                            >
                                              {item.duration}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Project Info */}
                              <div
                                className={`bg-white/5 backdrop-blur-sm rounded-lg p-3 border 
                                ${theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20'} 
                                relative group overflow-hidden`}
                              >
                                {/* Gradient Background */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />

                                <div className="relative space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Info
                                        className={`w-4 h-4 ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}
                                      />
                                      <h3
                                        className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}
                                      >
                                        Project Highlights
                                      </h3>
                                    </div>
                                    <div
                                      className={`text-xs px-2 py-0.5 rounded-full bg-white/5 border
                                      ${
                                        theme === 'dark'
                                          ? 'border-white/20 text-white/90 bg-white/10'
                                          : 'border-black/20 text-black/90 bg-black/5'
                                      }`}
                                    >
                                      {cards[currentIndex].techStack.length} Technologies
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-1.5">
                                    {cards[currentIndex].features
                                      .slice(0, 4)
                                      .map((feature, index) => (
                                        <div key={index} className="group/item relative rounded-md">
                                          {/* Golden Gradient Background - Moved inside to respect border radius */}
                                          <div
                                            className={`absolute inset-0 rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300
                                          bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#F0B90B]`}
                                          />

                                          {/* Content Container */}
                                          <div
                                            className={`relative flex items-center gap-1.5 p-1.5 rounded-md text-xs
                                          border ${
                                            theme === 'dark'
                                              ? 'bg-black/20 border-white/20'
                                              : 'bg-white/60 border-black/20'
                                          }
                                          group-hover/item:border-[#FFD700]/40
                                          transition-all duration-300`}
                                          >
                                            {/* Icon Container */}
                                            <div
                                              className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                                            ${
                                              theme === 'dark'
                                                ? 'bg-black/30 group-hover/item:bg-black/40'
                                                : 'bg-white/80 group-hover/item:bg-white'
                                            }`}
                                            >
                                              <Trophy className="w-3 h-3 text-[#FFD700] opacity-80 group-hover/item:opacity-100" />
                                            </div>

                                            {/* Text Container */}
                                            <span
                                              className={`truncate font-medium
                                            ${
                                              theme === 'dark'
                                                ? 'text-white/90 group-hover/item:text-white'
                                                : 'text-black/90 group-hover/item:text-black'
                                            }
                                            group-hover/item:text-shadow-sm`}
                                            >
                                              {feature}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                  </div>

                                  <div className="flex items-center gap-1.5 pt-0.5">
                                    {cards[currentIndex].techStack
                                      .slice(0, 5)
                                      .map((tech, index) => (
                                        <motion.div
                                          key={index}
                                          className={`px-1.5 py-0.5 text-[10px] rounded border
                                          ${
                                            theme === 'dark'
                                              ? 'bg-black/20 border-white/20 text-white/90 hover:bg-black/30'
                                              : 'bg-white/60 border-black/20 text-black/90 hover:bg-white/80'
                                          }
                                          hover:border-[#FFD700]/40 hover:text-[#FFD700] cursor-pointer
                                          transition-all duration-300`}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          {tech}
                                        </motion.div>
                                      ))}
                                    {cards[currentIndex].techStack.length > 5 && (
                                      <span
                                        className={`text-[10px] font-medium
                                        ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}
                                      >
                                        +{cards[currentIndex].techStack.length - 5} more
                                      </span>
                                    )}
                                  </div>
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
                    setDirection(index > currentIndex ? 'next' : ('prev' as 'prev' | 'next'));
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                    ${
                      currentIndex === index
                        ? `${theme === 'dark' ? 'bg-white w-6' : 'bg-black w-6'}`
                        : `${theme === 'dark' ? 'bg-white/50 hover:bg-white/70' : 'bg-black/50 hover:bg-black/70'}`
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
