'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Cpu, Smartphone, Shield, Share2 } from 'lucide-react';
import { cards } from './data/success-stories-data'; // Adjust the import path as necessary

interface TechnicalHighlightsProps {
   techStack: string[];
   currentIndex: number;
}

export const TechnicalHighlights = ({ techStack, currentIndex }: TechnicalHighlightsProps) => {
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
            hover:opacity-95
            group
            hover:border-[var(--megaman)]
         `}
      >
         {/* Add gradient hover effect */}
         <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />

         {/* Content wrapped in relative container */}
         <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-2">
                  <Cpu className={`w-4 h-4 ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`} />
                  <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                     Technical Insights
                  </h3>
               </div>
            </div>

            {/* Tech Categories */}
            <div className="grid grid-cols-3 gap-1.5">
               {/* Frontend */}
               <div className="group/tech relative rounded-md">
                  <div className={`absolute inset-0 rounded-md opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#2563EB]`} />
                  <div className={`relative flex flex-col gap-1 p-1.5 rounded-md text-xs h-full border ${theme === 'dark' ? 'bg-black/20 border-white/20' : 'bg-white/60 border-black/20'} group-hover/tech:border-[#3B82F6]/40 transition-all duration-300`}>
                     <div className="flex items-center gap-1.5">
                        <div className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-black/30' : 'bg-white/80'}`}>
                           <Smartphone className="w-2.5 h-2.5 text-[#3B82F6]" />
                        </div>
                        <span className={`font-medium ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}>Frontend</span>
                     </div>
                     <div className="flex flex-wrap gap-1">
                        {techStack.filter(tech => ['React', 'Next.js', 'TailwindCSS', 'TypeScript', 'Framer Motion'].includes(tech)).map((tech, i) => (
                           <span key={i} className={`px-1 py-0.5 rounded text-[10px] ${theme === 'dark' ? 'bg-black/30 text-white/80' : 'bg-white/80 text-black/80'} group-hover/tech:text-[#3B82F6]`}>
                              {tech}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Backend */}
               <div className="group/tech relative rounded-md">
                  <div className={`absolute inset-0 rounded-md opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#34D399] via-[#10B981] to-[#059669]`} />
                  <div className={`relative flex flex-col gap-1 p-1.5 rounded-md text-xs h-full border ${theme === 'dark' ? 'bg-black/20 border-white/20' : 'bg-white/60 border-black/20'} group-hover/tech:border-[#10B981]/40 transition-all duration-300`}>
                     <div className="flex items-center gap-1.5">
                        <div className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-black/30' : 'bg-white/80'}`}>
                           <Shield className="w-2.5 h-2.5 text-[#10B981]" />
                        </div>
                        <span className={`font-medium ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}>Backend</span>
                     </div>
                     <div className="flex flex-wrap gap-1">
                        {techStack.filter(tech => ['Node.js', 'Express', 'MongoDB', 'Socket.io'].includes(tech)).map((tech, i) => (
                           <span key={i} className={`px-1 py-0.5 rounded text-[10px] ${theme === 'dark' ? 'bg-black/30 text-white/80' : 'bg-white/80 text-black/80'} group-hover/tech:text-[#10B981]`}>
                              {tech}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Infrastructure */}
               <div className="group/tech relative rounded-md">
                  <div className={`absolute inset-0 rounded-md opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#F472B6] via-[#EC4899] to-[#DB2777]`} />
                  <div className={`relative flex flex-col gap-1 p-1.5 rounded-md text-xs h-full border ${theme === 'dark' ? 'bg-black/20 border-white/20' : 'bg-white/60 border-black/20'} group-hover/tech:border-[#EC4899]/40 transition-all duration-300`}>
                     <div className="flex items-center gap-1.5">
                        <div className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-black/30' : 'bg-white/80'}`}>
                           <Share2 className="w-2.5 h-2.5 text-[#EC4899]" />
                        </div>
                        <span className={`font-medium ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}>Deployment & CMS</span>
                     </div>
                     <div className="flex flex-wrap gap-1">
                        {techStack.filter(tech => ['Vercel', 'Sanity', 'Cloudinary'].includes(tech)).map((tech, i) => (
                           <span key={i} className={`px-1 py-0.5 rounded text-[10px] ${theme === 'dark' ? 'bg-black/30 text-white/80' : 'bg-white/80 text-black/80'} group-hover/tech:text-[#EC4899]`}>
                              {tech}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}; 