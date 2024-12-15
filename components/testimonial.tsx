'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion'; // Import for animations

interface TestimonialProps {
   quote: string;
   author: string;
   company: string;
   image: string;
}

export const Testimonial: React.FC<TestimonialProps> = ({ quote, author, company, image }) => {
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

         <div className="relative p-4">
            <div className="flex items-center gap-3">
               {/* Author Image */}
               <motion.div className="relative shrink-0" whileHover={{ scale: 1.05 }}>
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--megaman)]/20 group-hover:ring-[var(--megaman)]/40 transition-all">
                     <img
                        src={image}
                        alt={author}
                        className="w-full h-full object-cover"
                     />
                  </div>
               </motion.div>

               {/* Author Info */}
               <div className="flex-1 min-w-0">
                  <h4 className={`font-medium text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                     {author}
                  </h4>
                  <p className={`text-xs truncate ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                     {company}
                  </p>
               </div>

               {/* Quote Icon */}
               <div className={`shrink-0 opacity-20 group-hover:opacity-40 transition-opacity ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
               </div>
            </div>

            {/* Quote Text */}
            <p className={`text-sm mt-2 leading-relaxed ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
               "{quote}"
            </p>
         </div>
      </div>
   );
};