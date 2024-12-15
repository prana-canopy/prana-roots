'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Wine, Calendar, Grid, Star, Info } from 'lucide-react';

interface ProjectHighlightsProps {
   features: string[];
   techStack: string[];
}

export const ProjectHighlights = ({ features, techStack }: ProjectHighlightsProps) => {
   const { resolvedTheme: theme } = useTheme();

   // Map features to icons
   const featureIcons = {
      'Animated Mocktail Showcase': <Wine className={`w-4 h-4 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`} />,
      'Interactive Booking System': <Calendar className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />,
      'Responsive Gallery Grid': <Grid className={`w-4 h-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />,
      'Custom Brand Elements': <Star className={`w-4 h-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />,
   };


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
         <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)] rounded-lg" />

         <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`} />
                  <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                     Project Highlights
                  </h3>
               </div>
               <div className={`text-xs px-2 py-0.5 rounded-full bg-white/5 border
                  ${theme === 'dark'
                     ? 'border-white/20 text-white/90 bg-white/10'
                     : 'border-black/20 text-black/90 bg-black/5'
                  }`}
               >
                  {techStack.length} Technologies
               </div>
            </div>

            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-1.5">
                  {features.slice(0, 4).map((feature, index) => (
                     <div key={index} className="group/item relative rounded-md">
                        {/* Golden Gradient Background */}
                        <div className={`absolute inset-0 rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300
                           bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#F0B90B]`}
                        />

                        {/* Content Container */}
                        <div className={`relative flex items-center gap-1.5 p-1.5 rounded-md text-xs
                           border ${theme === 'dark'
                              ? 'bg-black/20 border-white/20'
                              : 'bg-white/60 border-black/20'}
                           group-hover/item:border-[#FFD700]/40
                           transition-all duration-300`}
                        >
                           {/* Icon Container */}
                           <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center`}>
                              {featureIcons[feature as keyof typeof featureIcons] || <Star className="w-4 h-4" />}
                           </div>

                           {/* Text Container */}
                           <span className={`truncate font-medium
                              ${theme === 'dark'
                                 ? 'text-white/90 group-hover/item:text-white'
                                 : 'text-black/90 group-hover/item:text-black'}
                              group-hover/item:text-shadow-sm`}
                           >
                              {feature}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="flex items-center gap-1.5 pt-1">
                  {techStack.slice(0, 5).map((tech, index) => (
                     <div key={index} className={`px-1.5 py-0.5 text-[10px] rounded border
                        ${theme === 'dark'
                           ? 'bg-black/20 border-white/20 text-white/90 hover:bg-black/30'
                           : 'bg-white/60 border-black/20 text-black/90 hover:bg-white/80'}
                        hover:border-[#FFD700]/40 hover:text-[#FFD700] cursor-pointer
                        transition-all duration-300`}
                     >
                        {tech}
                     </div>
                  ))}
                  {techStack.length > 5 && (
                     <span className={`text-[10px] font-medium
                        ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}
                     >
                        +{techStack.length - 5} more
                     </span>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}; 