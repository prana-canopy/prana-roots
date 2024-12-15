'use client';

import React, { useEffect, useState } from 'react';
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
   ChevronLeft,
   ChevronRight,
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

const slideVariants = {
   enter: (direction: number) => ({
      x: direction > 0 ? 1500 : -1500,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(8px)',
   }),
   center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
         duration: 0.7,
         ease: [0.32, 0.72, 0, 1],
         opacity: { duration: 0.4 },
         filter: { duration: 0.4 },
      }
   },
   exit: (direction: number) => ({
      x: direction < 0 ? 1500 : -1500,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(8px)',
      transition: {
         duration: 0.7,
         ease: [0.32, 0.72, 0, 1],
         opacity: { duration: 0.4 },
         filter: { duration: 0.4 },
      }
   })
};

const NavigationButton = ({
   direction,
   onClick,
   disabled
}: {
   direction: 'prev' | 'next';
   onClick: () => void;
   disabled: boolean;
}) => {
   const { resolvedTheme: theme } = useTheme();
   const isDark = theme === 'dark';

   return (
      <motion.button
         onClick={onClick}
         className={`
        relative group
        p-3 sm:p-4 md:p-5
        rounded-full pointer-events-auto
        ${isDark ? 'bg-white/5' : 'bg-black/5'}
        backdrop-blur-md
        border
        ${isDark ? 'border-white/10' : 'border-black/10'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-300
      `}
         whileHover={!disabled ? {
            scale: 1.1,
            backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
         } : undefined}
         whileTap={!disabled ? { scale: 0.95 } : undefined}
         initial={false}
         aria-label={`Show ${direction} slide`}
         disabled={disabled}
      >
         {direction === 'prev' ? (
            <ChevronLeft className={`w-6 h-6 ${isDark ? 'text-white/70' : 'text-black/70'} group-hover:${isDark ? 'text-white' : 'text-black'} transition-colors`} />
         ) : (
            <ChevronRight className={`w-6 h-6 ${isDark ? 'text-white/70' : 'text-black/70'} group-hover:${isDark ? 'text-white' : 'text-black'} transition-colors`} />
         )}
         <motion.div
            className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/5' : 'bg-black/5'} opacity-0 transition-opacity`}
            initial={false}
            whileHover={{ opacity: 1 }}
         />
      </motion.button>
   );
};

const cardVariants = {
   initial: { opacity: 0, y: 20 },
   animate: {
      opacity: 1,
      y: 0,
      transition: {
         delay: 0.2,
         duration: 0.5,
         ease: [0.23, 1, 0.32, 1]
      }
   }
};

const titleVariants = {
   initial: { backgroundPosition: '200% 0' },
   hover: {
      backgroundPosition: '0 0',
      transition: {
         duration: 0.8,
         ease: [0.23, 1, 0.32, 1]
      }
   }
};

export default function SuccessStories({ value }: SuccessStoriesProps) {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isAnimating, setIsAnimating] = useState(false);
   const [direction, setDirection] = useState(0); // -1 for left, 1 for right
   const { resolvedTheme: theme } = useTheme();
   const [mounted, setMounted] = useState(false);


   useEffect(() => {
      setMounted(true);
   }, []);

   const handleSlideChange = (navDirection: 'next' | 'prev') => {
      if (isAnimating) return;

      setIsAnimating(true);
      const newDirection = navDirection === 'next' ? 1 : -1;
      setDirection(newDirection);

      setCurrentIndex((prev) => {
         if (navDirection === 'next') {
            return (prev + 1) % cards.length;
         }
         return (prev - 1 + cards.length) % cards.length;
      });
   };


   const swipeConfidenceThreshold = 5000;
   const swipePower = (offset: number, velocity: number) => {
      return Math.abs(offset) * velocity;
   };

   const handleDragEnd = (e: any, { offset, velocity }: any) => {
      const swipe = swipePower(offset.x, velocity.x);

      if (swipe < -swipeConfidenceThreshold) {
         handleSlideChange('next');
      } else if (swipe > swipeConfidenceThreshold) {
         handleSlideChange('prev');
      }
   };

   if (!mounted) return null;

   return (
      <TooltipProvider delayDuration={100}>
         <div className="w-full flex flex-col min-h-screen">
            <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-16 flex-1">
               <div className="perspective w-full overflow-hidden">
                  <AnimatePresence
                     mode="wait"
                     initial={false}
                     custom={direction}
                     onExitComplete={() => setIsAnimating(false)}
                  >
                     <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        onDragEnd={handleDragEnd}
                        className="w-full"
                     >
                        <div className="w-full rounded-2xl">
                           <motion.div
                              variants={cardVariants}
                              initial="initial"
                              animate="animate"
                              className={`w-full bg-gradient-to-br ${theme === 'dark'
                                 ? 'from-[var(--megaman)]/20 via-[var(--frozen-turquoise)]/15 to-[var(--heart-of-ice)]/20'
                                 : 'from-[var(--megaman)]/10 via-[var(--frozen-turquoise)]/5 to-[var(--heart-of-ice)]/10'
                                 } backdrop-blur-md border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'
                                 }`}
                           >
                              <div className="p-3 sm:p-6 md:p-8">
                                 {/* Header */}
                                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
                                    <div className="space-y-1 sm:space-y-2">
                                       <motion.h2
                                          className="text-xl sm:text-2xl md:text-3xl font-bold"
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.3, duration: 0.5 }}
                                       >
                                          <motion.span
                                             className="inline-block bg-gradient-to-r from-pink-600 to-pink-300 bg-[length:200%_auto] bg-clip-text text-transparent cursor-pointer"
                                             variants={{
                                                initial: { scale: 1 },
                                                hover: {
                                                   scale: 1.1, // Increase scale for a larger effect
                                                   backgroundPosition: '100% 0', // Change gradient position for a more dynamic effect
                                                   transition: { duration: 0.3 },
                                                },
                                             }}
                                             initial="initial"
                                             whileHover="hover"
                                          >
                                             {cards[currentIndex].title}
                                          </motion.span>
                                       </motion.h2>
                                       <motion.p
                                          className={`text-sm sm:text-base md:text-lg ${theme === 'dark' ? 'text-white/80' : 'text-black/80'
                                             }`}
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.4 }}
                                       >
                                          {cards[currentIndex].description}
                                       </motion.p>
                                    </div>
                                    <motion.div
                                       className="flex w-full"
                                       initial={{ opacity: 0, x: 20 }}
                                       animate={{ opacity: 1, x: 0 }}
                                       transition={{ delay: 0.5 }}
                                    >
                                       <Timeline
                                          items={[
                                             { phase: 'Discovery', duration: '1-2w' },
                                             { phase: 'Design', duration: '2w' },
                                             { phase: 'Development', duration: '4w' },
                                             { phase: 'Testing', duration: '1w' },
                                             { phase: 'Launch', duration: '1w' },
                                          ]}
                                       />
                                    </motion.div>
                                 </div>

                                 {/* Content */}
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {/* Left Column */}
                                    <div className="space-y-3 sm:space-y-4">
                                       <motion.div
                                          className="flex gap-2 sm:gap-3"
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.6 }}
                                       >
                                          <SitePreview
                                             title={cards[currentIndex].title}
                                             url={cards[currentIndex].url}
                                             previewImage={cards[currentIndex].previewImage}
                                          />
                                       </motion.div>
                                       {cards[currentIndex].testimonial && (
                                          <motion.div
                                             initial={{ opacity: 0, y: 20 }}
                                             animate={{ opacity: 1, y: 0 }}
                                             transition={{ delay: 0.7 }}
                                          >
                                             <Testimonial
                                                quote={cards[currentIndex].testimonial.quote}
                                                author={cards[currentIndex].testimonial.author}
                                                company={cards[currentIndex].testimonial.company}
                                                image={cards[currentIndex].testimonial.image}
                                             />
                                          </motion.div>
                                       )}
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-3">
                                       <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.8 }}
                                       >
                                          <TechnicalHighlights
                                             techStack={cards[currentIndex].techStack}
                                             currentIndex={currentIndex}
                                          />
                                       </motion.div>
                                       <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.9 }}
                                       >
                                          <PerformanceMetrics />
                                       </motion.div>
                                       <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 1 }}
                                       >
                                          <ProjectHighlights
                                             features={cards[currentIndex].features}
                                             techStack={cards[currentIndex].techStack}
                                          />
                                       </motion.div>
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                        </div>
                     </motion.div>
                  </AnimatePresence>
                  <div className="sticky top-1/2 -translate-y-1/2 flex justify-between z-20 pointer-events-none px-4">
                     <NavigationButton
                        direction="prev"
                        onClick={() => handleSlideChange('prev')}
                        disabled={isAnimating}
                     />
                     <NavigationButton
                        direction="next"
                        onClick={() => handleSlideChange('next')}
                        disabled={isAnimating}
                     />
                  </div>
               </div>
            </div>
         </div>
      </TooltipProvider>
   );
}