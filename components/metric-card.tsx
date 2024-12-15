import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTheme } from 'next-themes';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Info, TrendingUp } from 'lucide-react';

interface MetricCardProps {
   icon: React.ReactElement;
   label: string;
   value: string;
   trend: number;
   caption: string;
   index: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
   icon,
   label,
   value,
   trend,
   caption,
   index,
}: MetricCardProps) => {
   const [count, setCount] = useState(0);
   const [isHovered, setIsHovered] = useState(false);
   const cardRef = useRef(null);
   const isInView = useInView(cardRef, { once: true, amount: 0.3 });
   const numericValue = parseInt(value.replace(/,/g, ''));
   const { resolvedTheme: theme } = useTheme();

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
         className={`
            relative overflow-hidden backdrop-blur-md rounded-lg p-2
            transition-all duration-300 hover:scale-105 h-[100px] sm:h-[100px]
            before:absolute before:-inset-[1px] before:rounded-lg 
            before:bg-gradient-to-r before:from-pink-300/50 before:to-pink-500/50
            before:opacity-0 hover:before:opacity-100
            before:transition-opacity before:duration-300
            before:-z-10
            after:absolute after:inset-0 after:rounded-lg after:content-['']
            after:transition-all after:duration-300
            after:-z-20
            ${theme === 'dark' ? 'bg-[#111]/90 after:bg-[#111]/90' : 'bg-white/90 after:bg-white/90'}
            border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}
         `}
      >
         {/* Background Pattern */}
         <div className="absolute inset-0 overflow-hidden rounded-lg opacity-5"></div>

         {/* Content */}
         <div className="relative z-10 flex flex-col h-full">
            {/* Top Section */}
            <div className="flex items-start justify-between mb-1 gap-1 sm:gap-2">
               {' '}
               {/* Reduced gap on mobile */}
               {/* Label with adjusted size */}
               <div
                  className={`text-[8px] sm:text-[8px] md:text-[10px] lg:text-xs font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}
               >
                  {label}
               </div>
               {/* Icon container with overflow handling */}
               <div
                  className={`p-0.5 sm:p-1 md:p-1 rounded-lg shrink-0 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}
               >
                  {React.cloneElement(icon as React.ReactElement, {
                     className: 'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3',
                  })}
               </div>
            </div>

            {/* Value */}
            <div className={`text-xl font-bold mb-1 relative group/value`}>
               {value.includes('%') ? (
                  <>
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        key={`${count}-${theme}`} // Add theme to key
                        className="relative inline-block"
                     >
                        <motion.span
                           key={theme} // Add key here
                           className={`inline-block bg-clip-text text-transparent bg-gradient-to-r 
                  ${theme === 'dark'
                                 ? 'from-white via-white to-white'
                                 : 'from-[#000000] via-[#333333] to-[#000000]'
                              }`}
                           whileHover={{
                              backgroundImage:
                                 theme === 'dark'
                                    ? 'linear-gradient(to right, #ffffff, #a0a0a0, #ffffff)'
                                    : 'linear-gradient(to right, #000000, #333333, #000000)',
                              scale: 1.05,
                              transition: { duration: 0.3 },
                           }}
                        >
                           {Math.floor(count)}
                        </motion.span>
                     </motion.div>
                     <span className={`text-xs font-normal ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>%</span>
                  </>
               ) : (
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                     key={`${count}-${theme}`} // Add theme to key
                     className="relative inline-block"
                  >
                     <motion.span
                        key={theme} // Add key here
                        className={`inline-block bg-clip-text text-transparent bg-gradient-to-r 
               ${theme === 'dark'
                              ? 'from-white via-white to-white'
                              : 'from-[#000000] via-[#333333] to-[#000000]'
                           }`}
                        whileHover={{
                           backgroundImage:
                              theme === 'dark'
                                 ? 'linear-gradient(to right, #ffffff, #a0a0a0, #ffffff)'
                                 : 'linear-gradient(to right, #000000, #333333, #000000)',
                           scale: 1.05,
                           transition: { duration: 0.3 },
                        }}
                     >
                        {count.toLocaleString()}
                     </motion.span>
                  </motion.div>
               )}
            </div>
            {/* Bottom Section */}
            <div className="space-y-0.5">
               <div
                  className={`flex items-center gap-1 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}
               >
                  <motion.div
                     initial={{ scale: 0 }}
                     animate={isInView ? { scale: 1 } : { scale: 0 }}
                     transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                     className="flex items-center gap-0.5 text-[10px] font-medium whitespace-nowrap"
                  >
                     {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                     <TrendingUp className="w-2 h-2" />
                  </motion.div>
                  <div className="h-0.5 flex-grow rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}">
                     <motion.div
                        initial={{ width: 0 }}
                        animate={
                           isInView ? { width: `${Math.min(Math.abs(trend) * 5, 100)}%` } : { width: 0 }
                        }
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${trend >= 0 ? 'bg-green-400' : 'bg-red-400'}`}
                     />
                  </div>
               </div>

               {/* Caption with Tooltip */}
               <div className="relative">
                  <div
                     className={`text-[8px] leading-none ${theme === 'dark' ? 'text-white/40' : 'text-black/40'} flex items-center gap-1`}
                  >
                     <span>{caption}</span>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <motion.button
                              whileHover={{ scale: 1.1 }}
                              className={`
                        p-0.5 rounded-full cursor-help transition-colors duration-200
                        ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'}
                      `}
                           >
                              <Info className="w-2 h-2" />
                           </motion.button>
                        </TooltipTrigger>
                        <TooltipPrimitive.Portal>
                           <TooltipContent
                              side={index < 2 ? 'right' : 'left'}
                              className={`
                        z-[60]
                        backdrop-blur-md
                        border-pink-500/20
                        max-w-[180px] sm:max-w-[200px]
                        text-[10px] sm:text-[11px]
                        px-2 py-1.5 sm:px-3 sm:py-2
                        ${theme === 'dark'
                                    ? 'bg-black/90 text-white border-white/20'
                                    : 'bg-white/90 text-black border-black/10'
                                 }
                      `}
                           >
                              {label === 'SEO' &&
                                 'Perfect search engine optimization score, ensuring maximum visibility and reach for your target audience'}
                              {label === 'Accessibility' &&
                                 'High accessibility compliance score, making your site usable for people of all abilities'}
                              {label === 'Security' &&
                                 'Perfect security score, implementing all recommended web security best practices'}
                              {label === 'Performance' &&
                                 'Exceptional loading speed and performance optimization across all devices'}
                           </TooltipContent>
                        </TooltipPrimitive.Portal>
                     </Tooltip>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
   );
};
