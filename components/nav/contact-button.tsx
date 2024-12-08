'use client';

import { Phone } from 'lucide-react';

interface ContactButtonProps {
  isMobile?: boolean;
}

export function ContactButton({ isMobile = false }: ContactButtonProps) {
  return (
    <button 
      className={`
        group relative px-4 py-2 text-sm font-medium 
        bg-primary hover:bg-primary/90 
        dark:bg-primary-light dark:hover:bg-primary 
        text-black dark:text-black rounded-full 
        transition-all duration-200 
        hover:shadow-md hover:scale-110 hover:rotate-1 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2ee89e] 
        overflow-hidden
        ${isMobile ? 'w-full' : ''}
      `}
      aria-label="Contact us"
    >
      <div className="absolute inset-0 w-0 bg-black transition-all duration-300 ease-out group-hover:w-full opacity-10" />
      <span className={`relative flex items-center ${isMobile ? 'justify-center' : ''} gap-2`}>
        <Phone className="w-4 h-4" aria-hidden="true" />
        Let's Talk
      </span>
    </button>
  );
}
