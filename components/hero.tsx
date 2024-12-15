'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
const ParticleEffect = dynamic(() => import('./ParticleEffect'), { ssr: false });
const AnimatedToucan = dynamic(() => import('./toucan-poly'), { ssr: false });
import { features } from '@/lib/constants';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import ProcessSection from './our-process';
import PricingSection from './pricing';
import ContactSection from './contact';
import FAQSection from './faq';
import SuccessStories from './success-stories';

export default React.memo(function Hero() {
   const { scrollY } = useScroll();
   const opacity = useTransform(scrollY, [0, 300], [1, 0]);
   const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
   const { resolvedTheme: theme } = useTheme();
   const [mounted, setMounted] = useState(false);
   const processRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      setMounted(true);
   }, []);

   const scrollToProcess = () => {
      processRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
   };

   return (
      <section
         className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-background to-muted/50"
         aria-labelledby="hero-heading"
      >
         <ParticleEffect />
         {/* Theme-dependent background effects */}
         <div className="absolute inset-0 -z-10" aria-hidden="true">
            <style jsx>{`
          .gradient-1-light {
            background: radial-gradient(
              circle at 50% 120%,
              rgba(45, 212, 191, 0.25),
              rgba(255, 255, 255, 0)
            );
          }
          .gradient-1-dark {
            background: radial-gradient(
              circle at 50% 120%,
              rgba(120, 119, 198, 0.2),
              rgba(255, 255, 255, 0)
            );
          }
          .gradient-2-light {
            background: radial-gradient(
              circle 800px at 50% 50%,
              rgba(56, 189, 248, 0.2),
              transparent
            );
          }
          .gradient-2-dark {
            background: radial-gradient(
              circle at 50% 0%,
              rgba(255, 226, 132, 0.08),
              rgba(255, 255, 255, 0)
            );
          }
          .gradient-3-light {
            background: radial-gradient(
              circle 600px at 60% 50%,
              rgba(94, 234, 212, 0.15),
              transparent
            );
          }
        `}</style>
            <div
               className={`absolute inset-0 ${mounted ? (theme === 'dark' ? 'gradient-1-dark' : 'gradient-1-light') : ''}`}
            />
            <div
               className={`absolute inset-0 ${mounted ? (theme === 'dark' ? 'gradient-2-dark' : 'gradient-2-light') : ''}`}
            />
            <div
               className={`absolute inset-0 ${mounted ? (theme === 'dark' ? '' : 'gradient-3-light') : ''}`}
            />
            <motion.div
               style={{ opacity }}
               className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(255,255,255,0.1),transparent)]"
            />
         </div>

         {/* Main Content */}
         <motion.div
            style={{ scale }}
            className="relative w-full max-w-[1920px] mx-auto min-h-screen flex items-center justify-center pt-20"
         >
            <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center px-6 py-0 lg:py-0">
               {/* Left Content */}
               <div className="flex flex-col items-center lg:items-end justify-center lg:w-[60%] z-10">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                     className="text-center lg:text-right lg:max-w-[85%] xl:max-w-[80%]"
                  >
                     <motion.h1
                        id="hero-heading"
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold 
                text-transparent bg-clip-text leading-[1.1] tracking-tight cursor-pointer"
                        style={{
                           backgroundImage:
                              'linear-gradient(to bottom right, var(--primary), #7dd3fc, var(--primary))',
                        }}
                        whileHover={{
                           backgroundImage:
                              'linear-gradient(to bottom right, #7dd3fc, var(--primary), #7dd3fc)',
                        }}
                        transition={{ duration: 0.3 }}
                     >
                        Inhale Innovation.
                        <br />
                        <span className="inline-block mt-2"> Exhale Growth.</span>
                     </motion.h1>

                     <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-8 text-lg sm:text-xl lg:text-2xl text-muted-foreground font-light tracking-wide"
                     >
                        We create cutting-edge digital solutions that transform businesses—small and
                        large—unlocking their full potential with innovation and precision
                     </motion.p>
                  </motion.div>
               </div>

               {/* Right Content - Simplified Toucan Container */}
               <div className="flex flex-col items-center justify-center lg:w-[40%] -mt-24 lg:-mt-48 md:-mt-24 sm:-mt-24">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                     className="w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] -ml-16"
                  >
                     <AnimatedToucan />
                  </motion.div>

                  <motion.button
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.3 }}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={scrollToProcess}
                     className="group relative px-8 py-3 overflow-hidden 
                       -mt-64 sm:-mt-64 md:-mt-64 lg:-mt-80
                       bg-background/80 backdrop-blur-sm
                       shadow-lg hover:shadow-xl
                       transition-all duration-300"
                     aria-label="Fly with us"
                  >
                     <div
                        className="absolute inset-0 w-3 border border-primary bg-primary transition-all duration-300 ease-out group-hover:w-full group-hover:bg-primary group-active:bg-background border-active:border-primary"
                        aria-hidden="true"
                     />
                     <span className={`relative italic text-lg font-medium 
               ${mounted ? (theme === 'dark' ? 'text-gray-100 group-hover:text-gray-900' : 'text-foreground group-hover:text-primary-foreground') : 'text-transparent'}
               group-active:text-primary transition-all duration-75`}>
                        Catch these vibes
                     </span>
                  </motion.button>
               </div>
            </div>
         </motion.div>

         {/* Optimized Features Grid */}
         {/* <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-8 rounded-2xl bg-background/40 backdrop-blur-sm
                border border-white/5 transition-all duration-300
                hover:shadow-[0_0_25px_-5px_rgba(0,0,0,0.1),0_0_10px_-5px_rgba(0,0,0,0.04)]
                relative cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              <h3 className="font-medium text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div> */}
         <div ref={processRef}>
            <SuccessStories value="featured" />
            <ProcessSection />
            <PricingSection />
            <FAQSection />
            <ContactSection />
         </div>
      </section>
   );
});
