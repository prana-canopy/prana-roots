'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { MetricCard } from './metric-card';
import { Search, Users, Shield, Zap, Clock } from 'lucide-react';

export const PerformanceMetrics = () => {
   const { resolvedTheme: theme } = useTheme();

   return (
      <div
         className={`
            bg-white/10 
            ${theme === 'dark' ? 'backdrop-blur-md' : ''} 
            rounded-lg p-4 border 
            ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} 
            relative overflow-visible
            transition-all duration-300
            hover:opacity-80
            group
            hover:border-[var(--megaman)]
         `}
      >
         {/* Gradient hover effect */}
         <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />

         {/* Content wrapped in relative container */}
         <div className="relative z-10">
            <div className="flex items-center mb-3">
               <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`} />
               <h3 className={`text-sm font-medium ml-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Performance Metrics
               </h3>
            </div>
            <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 relative">
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
      </div>
   );
}; 