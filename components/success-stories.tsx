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
import { PerformanceMetrics } from './performance-metrics';
import { ProjectHighlights } from './project-highlights';
import { TechnicalHighlights } from './technical-highlights';
import { Testimonial } from './testimonial';
import { Timeline } from './timeline';
import { cards } from './data/success-stories-data';
import { SitePreview } from './site-preview';

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
         className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === tab
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
         <div className="w-full flex flex-col min-h-screen">
            <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-16 flex-1">
               <div className="perspective w-full">

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
                        className="w-full"
                     >
                        <div className="w-full rounded-2xl">
                           <div
                              className={`w-full bg-gradient-to-br ${theme === 'dark'
                                 ? 'from-[var(--megaman)]/20 via-[var(--frozen-turquoise)]/15 to-[var(--heart-of-ice)]/20'
                                 : 'from-[var(--megaman)]/10 via-[var(--frozen-turquoise)]/5 to-[var(--heart-of-ice)]/10'
                                 } backdrop-blur-md border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}
                           >
                              <div className="p-3 sm:p-6 md:p-8">
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
                                       <p className={`text-sm sm:text-base md:text-lg ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                                          {cards[currentIndex].description}
                                       </p>
                                    </div>
                                    <div className="flex w-full">
                                       <Timeline items={[
                                          { phase: 'Discovery', duration: '1-2w' },
                                          { phase: 'Design', duration: '2w' },
                                          { phase: 'Development', duration: '4w' },
                                          { phase: 'Testing', duration: '1w' },
                                          { phase: 'Launch', duration: '1w' },
                                       ]} />
                                    </div>
                                 </div>
                                 {/* Content */}
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {/* Left Column */}
                                    <div className="space-y-3 sm:space-y-4">
                                       <div className="flex gap-2 sm:gap-3">
                                          <SitePreview
                                             title={cards[currentIndex].title}
                                             url={cards[currentIndex].url}
                                             previewImage={cards[currentIndex].previewImage}
                                          />
                                       </div>
                                       {cards[currentIndex].testimonial && (
                                          <Testimonial
                                             quote={cards[currentIndex].testimonial.quote}
                                             author={cards[currentIndex].testimonial.author}
                                             company={cards[currentIndex].testimonial.company}
                                             image={cards[currentIndex].testimonial.image}
                                          />
                                       )}
                                    </div>
                                    {/* Right Column */}
                                    <div className="space-y-3">
                                       <TechnicalHighlights techStack={cards[currentIndex].techStack} currentIndex={currentIndex} />
                                       <PerformanceMetrics />
                                       <ProjectHighlights
                                          features={cards[currentIndex].features}
                                          techStack={cards[currentIndex].techStack}
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  </AnimatePresence>
                  {/* Navigation Buttons */}
                  <div className="sticky top-1/2 -translate-y-1/2 flex justify-between z-20 pointer-events-none">
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
                           className={`p-2 sm:p-3 md:p-4 rounded-full pointer-events-auto
            ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/30 hover:bg-black/40'} 
            backdrop-blur-md transition-all duration-300 
            hover:scale-110 active:scale-95
            text-white shadow-lg`}
                           aria-label={`Show ${direction} slide`}
                        >
                           {direction === 'prev' ? '←' : '→'}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </TooltipProvider>
   );
}