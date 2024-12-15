'use client';

import React from 'react';
import { History } from 'lucide-react';
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
      <div className={`
         w-full
         bg-white/10 
         ${theme === 'dark' ? 'backdrop-blur-md' : ''} 
         rounded-lg p-2 border 
         ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} 
         relative overflow-hidden
         transition-all duration-300
         hover:opacity-80
         group
         hover:border-[var(--megaman)]
      `}>
         {/* Gradient hover effect */}
         <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />

         {/* Content container */}
         <div className="relative z-10 w-full">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
               <History className={`w-4 h-4 ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`} />
               <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Timeline
               </h3>
            </div>

            {/* Timeline container */}
            <div className="relative w-full px-[5px]">
               {/* Horizontal line - adjusted to account for circle radius */}
               <div className="absolute left-0 right-0 top-[4.5px] h-[1px] bg-white/10" />

               {/* Timeline items container */}
               <div className="relative flex w-full">
                  {items.map((item, index) => (
                     <div
                        key={index}
                        className={`
                           flex-1 group/item
                           ${index === 0 ? '-ml-[5px]' : ''}
                           ${index === items.length - 1 ? '-mr-[5px]' : ''}
                        `}
                     >
                        {/* Dot Container - ensures perfect centering */}
                        <div className="relative flex justify-center">
                           <div
                              className="w-[9px] h-[9px] rounded-full border-2 
                                 transition-all duration-500 group-hover/item:scale-125
                                 before:absolute before:inset-0 before:rounded-full 
                                 before:opacity-0 group-hover/item:before:opacity-100
                                 before:transition-opacity before:duration-500
                                 after:absolute after:inset-0 after:rounded-full after:blur-[2px]
                                 after:opacity-0 group-hover/item:after:opacity-50
                                 cursor-pointer"
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
                        </div>

                        {/* Content */}
                        <div className="mt-4 transition-all duration-300 group-hover/item:translate-y-1">
                           <div className="flex flex-col items-center text-center">
                              <span
                                 className="text-xs font-medium transition-all duration-300 bg-clip-text text-transparent"
                                 style={{
                                    backgroundImage: theme === 'dark'
                                       ? 'linear-gradient(to right, #ffffff, #d1d5db, #ffffff)'
                                       : 'linear-gradient(to right, #1f2937, #4b5563, #1f2937)',
                                 }}
                              >
                                 {item.phase}
                              </span>
                              <span
                                 className="text-[11px] transition-all duration-300 mt-0.5"
                                 style={{
                                    color: theme === 'dark' ? '#d1d5db' : '#4b5563',
                                    opacity: 0.8,
                                 }}
                              >
                                 {item.duration}
                              </span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Timeline;