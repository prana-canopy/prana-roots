import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTheme } from 'next-themes';

interface MetricCardProps {
   icon: React.ReactElement;
   label: string;
   value: string;
   trend: number;
   caption: string;
   index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, trend, caption, index }) => {
   const [count, setCount] = useState(0);
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
         className={`relative overflow-visible backdrop-blur-md rounded-lg p-2 
        transition-all duration-300 hover:scale-105 h-[90px] sm:h-[100px]
        ${theme === 'dark' ? 'bg-[#111]/90 border-white/20' : 'bg-white/90 border-black/10'}
      `}
      >
         {/* Content */}
         <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-1">
               <div className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                  {React.cloneElement(icon, { className: 'w-3 h-3' })}
               </div>
               <div className={`text-[10px] sm:text-xs font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                  {label}
               </div>
            </div>
            <div className={`text-xl sm:text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
               {value.includes('%') ? (
                  <>
                     <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} key={count}>
                        {Math.floor(count)}
                     </motion.span>
                     <span className="text-xs font-normal opacity-70">%</span>
                  </>
               ) : (
                  <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} key={count}>
                     {count.toLocaleString()}
                  </motion.span>
               )}
            </div>
            <div className="space-y-0.5">
               <div className={`flex items-center gap-1 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <motion.div
                     initial={{ scale: 0 }}
                     animate={isInView ? { scale: 1 } : { scale: 0 }}
                     transition={{ type: "spring", stiffness: 500, damping: 30 }}
                     className="flex items-center gap-0.5 text-[10px] font-medium whitespace-nowrap"
                  >
                     {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                  </motion.div>
               </div>
            </div>
         </div>
      </motion.div>
   );
};

export default MetricCard;