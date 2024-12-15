'use client';

import React from 'react';
import { History } from 'lucide-react'; // Import the Clock icon
import { useTheme } from 'next-themes';

interface TimelineItem {
   phase: string;
   duration: string;
}

interface TimelineProps {
   items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
   const { resolvedTheme: theme } = useTheme();

   return (
      <div
         className={`
            bg-white/10 
            ${theme === 'dark' ? 'backdrop-blur-md' : ''} 
            rounded-lg p-2 sm:p-4 border 
            ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} 
            relative overflow-visible
            transition-all duration-300
            hover:opacity-80
            group
            hover:border-[var(--megaman)]
         `}
      >
         {/* Add gradient hover effect */}
         <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />

         {/* Content wrapped in relative container */}
         <div className="relative z-10">
            <div className="flex items-center gap-2">
               <History className={`w-4 h-4 ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`} />
               <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Timeline
               </h3>
            </div>
            <div className="relative space-y-3">
               {/* Vertical line */}
               <div className="absolute left-[5px] top-[10px] w-[1px] h-[calc(100%-20px)] bg-white/10" />

               {items.map((item, index) => (
                  <div key={index} className="relative flex items-center group/item cursor-pointer">
                     <div
                        className="absolute left-0 w-[11px] h-[11px] rounded-full border-2 
                           transition-all duration-500 group-hover/item:scale-125
                           before:absolute before:inset-0 before:rounded-full 
                           before:opacity-0 group-hover/item:before:opacity-100
                           before:transition-opacity before:duration-500
                           after:absolute after:inset-0 after:rounded-full after:blur-[2px]
                           after:transition-opacity after:duration-500
                           after:opacity-0 group-hover/item:after:opacity-50"
                        style={{
                           borderColor: 'rgb(244 114 182)',
                           backgroundImage: 'linear-gradient(to right, rgba(244, 114, 182, 0.3), rgba(236, 72, 153, 0.3))',
                           '--dot-hover-gradient': 'linear-gradient(to right, rgb(244 114 182), rgb(236 72 153))',
                           '--dot-glow': 'rgb(244 114 182)',
                        } as React.CSSProperties}
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
                     <div className="flex items-center justify-between w-full pl-6 py-1 transition-all duration-300 group-hover/item:translate-x-1">
                        <span
                           className={`text-xs font-medium transition-all duration-300 bg-clip-text text-transparent`}
                           style={{
                              backgroundImage: theme === 'dark'
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
   );
}; 