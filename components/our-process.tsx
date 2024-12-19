import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Compass, Code2, Rocket, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';

const ProcessFlow = () => {
   const [activeStep, setActiveStep] = useState<number | null>(null);
   const [currentStep, setCurrentStep] = useState(0);
   const [isLargeScreen, setIsLargeScreen] = useState(false);
   const { resolvedTheme: theme } = useTheme();

   useEffect(() => {
      const checkScreenSize = () => {
         setIsLargeScreen(window.matchMedia("(min-width: 1024px)").matches);
      };

      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);

      return () => window.removeEventListener('resize', checkScreenSize);
   }, []);

   const steps = [
      {
         icon: Lightbulb,
         title: 'Discovery & Planning',
         duration: '1-4 Weeks',
         description: 'Understanding your vision and technical requirements.',
         details: [
            'Stakeholder Interviews',
            'Requirements Gathering',
            'Market Analysis',
            'Scope Definition',
            'Timeline Planning',
         ],
      },
      {
         icon: Compass,
         title: 'Design & Architecture',
         duration: '2-8 Weeks',
         description: 'Creating detailed blueprints and designs.',
         details: ['UI/UX Design', 'Architecture', 'Data Modeling', 'System Integration Planning'],
      },
      {
         icon: Code2,
         title: 'Development & Integration',
         duration: '4-16 Weeks',
         description: 'Developing efficient code and stunning visuals.',
         details: ['Frontend Development', 'Backend Integration', 'Data Visualization', 'Security', 'System Integration'],
      },
      {
         icon: Rocket,
         title: 'Launch & Support',
         duration: 'Ongoing',
         description: 'Smooth deployment and continued support.',
         details: ['Quality Assurance', 'Optimization', 'Deployment', 'Maintenance', 'Support'],
      },
   ];

   return (
      <div className="w-full max-w-6xl mx-auto p-3">
         <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 lg:left-0 top-0 lg:top-8 w-1 lg:w-full lg:h-1 h-full 
          bg-gray-100 dark:bg-white/5">
               <motion.div
                  className="w-full lg:h-full bg-gradient-to-b lg:bg-gradient-to-r from-teal-300 to-emerald-400 dark:from-teal-200 dark:to-emerald-300"
                  initial={{ height: "0%", width: "0%" }}
                  animate={{
                     height: !isLargeScreen ? `${(currentStep + 1) * (100 / steps.length)}%` : "100%",
                     width: isLargeScreen ? `${(currentStep + 1) * (100 / steps.length)}%` : "100%"
                  }}
                  transition={{ duration: 0.5 }}
               />
            </div>

            <div className="grid lg:grid-cols-4 gap-6 lg:gap-4">
               {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = activeStep === index;
                  const isCompleted = index <= currentStep;

                  return (
                     <div key={step.title} className="relative">
                        <motion.div
                           className="group"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: index * 0.1 }}
                        >
                           {/* Circular Container */}
                           <div
                              className={`relative w-16 h-16 rounded-full backdrop-blur-md 
                      bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-transparent
                      hover:from-white/90 hover:to-white/50 dark:hover:from-white/20 dark:hover:to-white/5
                      border border-primary/20 
                      transition-all duration-300 cursor-pointer
                      flex items-center justify-center group
                      ${isActive ? 'ring-2 ring-emerald-400/50 dark:ring-emerald-300/30' : ''}
                      mx-auto mb-2`}
                              onClick={() => {
                                 setActiveStep(isActive ? null : index);
                                 if (index <= currentStep + 1) setCurrentStep(index);
                              }}
                           >
                              {/* Glow effect behind the icon */}
                              <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-primary via-primary-light to-accent blur-xl`} />
                              <div className={`absolute inset-0 rounded-full ${isCompleted ? 'bg-gradient-to-br from-primary/20 via-primary-light/20 to-accent/20' : ''}`} />
                              {/* Icon with increased contrast on hover */}
                              <Icon className={`w-6 h-6 relative z-10 transition-all duration-300 ${isCompleted ? 'text-primary dark:text-primary-light group-hover:text-primary-dark dark:group-hover:text-primary' : 'text-gray-400 dark:text-white/40 group-hover:text-gray-600 dark:group-hover:text-white/70'}`} />
                           </div>

                           {/* Title & Duration */}
                           <div className="text-center group">
                              <motion.h3
                                 className="text-xs font-medium relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)] hover:from-[var(--heart-of-ice)] hover:via-[var(--frozen-turquoise)] hover:to-[var(--megaman)] transition-all duration-300"
                                 animate={{
                                    backgroundPosition: ["0%", "100%", "0%"],
                                 }}
                                 transition={{
                                    duration: 5,
                                    ease: "linear",
                                    repeat: Infinity,
                                 }}
                              >
                                 {step.title}
                              </motion.h3>
                              <p className="text-[10px] text-gray-500 dark:text-white/40">
                                 {step.duration}
                              </p>
                           </div>

                           {/* Expandable Content */}
                           <AnimatePresence>
                              {isActive && (
                                 <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden mt-4 ml-12"
                                 >
                                    {/* <div className="rounded-lg backdrop-blur-md bg-white/10 border border-white/20 hover:border-[var(--megaman)] transition-all duration-300 p-3 group relative"> */}
                                    <div
                                       className={`rounded-lg
            backdrop-blur
            group relative
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
                                          <p className="text-[10px] text-gray-600 dark:text-white/60 mb-2">
                                             {step.description}
                                          </p>
                                          <div className="grid grid-cols-2 gap-1">
                                             {step.details.map((detail, idx) => (
                                                <motion.div
                                                   key={detail}
                                                   initial={{ opacity: 0, x: -10 }}
                                                   animate={{ opacity: 1, x: 0 }}
                                                   transition={{ delay: idx * 0.05 }}
                                                   className="flex items-center space-x-1"
                                                >
                                                   <motion.div 
                                                      className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-300 dark:to-teal-300 ring-2 ring-emerald-400/20 dark:ring-emerald-300/20"
                                                      initial={{ scale: 0.8 }}
                                                      animate={{ scale: 1 }}
                                                      transition={{
                                                         duration: 1.5,
                                                         repeat: Infinity,
                                                         repeatType: "reverse",
                                                         ease: "easeInOut"
                                                      }}
                                                   />
                                                   <span className="text-[10px] text-gray-500 dark:text-white/40">{detail}</span>
                                                </motion.div>
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </motion.div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default ProcessFlow;