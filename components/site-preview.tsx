'use client';

import React from 'react';
import { useTheme } from 'next-themes';

interface SitePreviewProps {
   title: string;
   url: string;
   previewImage: string;
}

export const SitePreview: React.FC<SitePreviewProps> = ({ title, url, previewImage }) => {
   const { resolvedTheme: theme } = useTheme();

   return (
      <div className={`flex-1 relative w-full h-fit rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} group hover:border-[var(--megaman)] transition-all duration-500`}>
         {/* Browser Frame */}
         <div className={`h-6 sm:h-8 md:h-10 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'} flex items-center px-3 md:px-4 space-x-2 md:space-x-3`}>
            <div className="flex space-x-1.5 md:space-x-2">
               <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 transition-transform group-hover:scale-110"></div>
               <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500 transition-transform group-hover:scale-110"></div>
               <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 transition-transform group-hover:scale-110"></div>
            </div>
         </div>
         <a href={url} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
            <div className="relative w-full">
               <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10" />
               <img
                  src={previewImage}
                  alt={title}
                  className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-700 ease-out"
               />
            </div>
         </a>
      </div>
   );
}; 