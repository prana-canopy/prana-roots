'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface NavLogoProps {
   onLogoClick: () => void;
}

export function NavLogo({ onLogoClick }: NavLogoProps) {
   const { resolvedTheme: theme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   return (
      <div className="flex-shrink-0 flex items-center gap-2 sm:gap-4">
         <style jsx>{`
            @keyframes spinAndScale {
               0% {
                  transform: rotate(0deg) scale(1);
               }
               50% {
                  transform: rotate(180deg) scale(0.5);
               }
               100% {
                  transform: rotate(360deg) scale(1.1);
               }
            }
            .logo-hover:hover .logo-inner {
               animation: spinAndScale 0.7s cubic-bezier(0.76, 0, 0.24, 1);
            }
         `}</style>
         <div
            onClick={onLogoClick}
            className="w-24 sm:w-32 h-16 sm:h-20 flex items-center justify-center cursor-pointer logo-hover p-4"
         >
            <div className="w-16 sm:w-24 h-8 sm:h-12 logo-inner">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="180 120 220 80"
                  className="w-full h-full"
                  aria-hidden="true"
               >
                  {/* SVG paths from original navbar */}
                  {/* Upper Beak */}
                  <path d="M320,140 L380,120 L350,145 Z" fill="#2ee89e" />
                  <path d="M350,145 L380,120 L390,135 Z" fill="#1eebc3" />
                  <path d="M350,145 L390,135 L360,160 Z" fill="#00b4e4" />

                  {/* Yellow Face */}
                  <path d="M300,140 L320,140 L310,160 Z" fill="#fff06e" />
                  <path d="M310,160 L320,140 L335,165 Z" fill="#ffe566" />
                  <path d="M280,140 L300,140 L290,160 Z" fill="#ffd700" />
                  <path d="M290,160 L300,140 L310,160 Z" fill="#ffcd00" />

                  {/* Main Body */}
                  <path d="M260,140 L280,140 L270,160 Z" fill="#151515" />
                  <path d="M270,160 L280,140 L290,160 Z" fill="#1a1a1a" />
                  <path d="M240,140 L260,140 L250,160 Z" fill="#202020" />
                  <path d="M250,160 L260,140 L270,160 Z" fill="#252525" />
                  <path d="M250,160 L270,160 L260,180 Z" fill="#151515" />
                  <path d="M260,180 L270,160 L280,180 Z" fill="#1a1a1a" />
                  <path d="M230,160 L250,160 L240,180 Z" fill="#202020" />
                  <path d="M240,180 L250,160 L260,180 Z" fill="#252525" />

                  {/* Wings */}
                  <path d="M220,160 L240,160 L230,180 Z" fill="#151515" />
                  <path d="M230,180 L240,160 L250,180 Z" fill="#1a1a1a" />
                  <path d="M200,160 L220,160 L210,180 Z" fill="#202020" />
                  <path d="M210,180 L220,160 L230,180 Z" fill="#252525" />
                  <path d="M180,160 L200,160 L190,180 Z" fill="#151515" />
                  <path d="M190,180 L200,160 L210,180 Z" fill="#1a1a1a" />
                  <path d="M270,160 L290,160 L280,180 Z" fill="#151515" />
                  <path d="M280,180 L290,160 L300,180 Z" fill="#1a1a1a" />
                  <path d="M300,180 L290,160 L310,160 Z" fill="#202020" />

                  {/* Tail and Feet */}
                  <path d="M230,180 L250,180 L240,200 Z" fill="#151515" />
                  <path d="M240,200 L250,180 L260,200 Z" fill="#1a1a1a" />
                  <path d="M210,180 L230,180 L220,200 Z" fill="#202020" />
                  <path d="M220,200 L230,180 L240,200 Z" fill="#252525" />
                  <path d="M220,180 L230,180 L225,190 Z" fill="#00b4e4" />
                  <path d="M225,190 L230,180 L235,190 Z" fill="#1eebc3" />

                  {/* Lower Beak */}
                  <path d="M320,140 L350,145 L335,165 Z" fill="#00d5c3" />
                  <path d="M335,165 L350,145 L360,160 Z" fill="#00b4e4" />
                  <path d="M335,165 L360,160 L345,180 Z" fill="#1eebc3" />

                  {/* Eye */}
                  <path d="M295,145 L305,143 L300,153 Z" fill="#ffffff" />
                  <path d="M297,147 L302,146 L300,151 Z" fill="#6366f1" />
                  <path d="M295,145 L300,153 L293,150 Z" fill="#000000" />
               </svg>
            </div>
         </div>
         <span
            onClick={onLogoClick}
            className="flex flex-col items-start leading-none relative group cursor-pointer"
         >
            <span className={`text-lg sm:text-2xl italic font-semibold tracking-wider 
               ${mounted ? (theme === 'dark' ? 'text-foreground group-hover:text-teal-400' : 'text-foreground group-hover:text-emerald-400') : 'text-transparent'}`}>
               Cosmic
            </span>
            <span className="text-[0.6rem] sm:text-xs tracking-wider text-foreground/70">by prana</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
         </span>
      </div>
   );
}