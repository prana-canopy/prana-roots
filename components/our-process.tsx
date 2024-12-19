import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Compass, Code2, Rocket, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';

const ProcessTitle = () => {
  const { resolvedTheme: theme } = useTheme();

  return (
    <div className="w-full max-w-6xl mx-auto px-3 mb-12">
      <motion.span
        className="text-[clamp(2rem,5vw,3rem)] font-bold inline-block
          text-transparent bg-clip-text cursor-pointer leading-[1.1] tracking-tight"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--primary), #38bdf8, #818cf8, var(--primary))',
          backgroundSize: '200% auto'
        }}
        whileHover={{
          backgroundPosition: 'right center'
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        Our Process
      </motion.span>
      <motion.p 
        className="mt-4 text-lg text-muted-foreground max-w-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        From concept to completion, we follow a refined approach that ensures your vision comes to life. 
        Each step is crafted to deliver innovation while maintaining clarity and purpose.
      </motion.p>
    </div>
  );
};

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
      <div className="w-full max-w-6xl mx-auto p-2">
         <ProcessTitle />
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
                      group-hover:from-white/60 group-hover:to-white/20 dark:group-hover:from-white/5 dark:group-hover:to-transparent
                      border border-black/20 dark:border-white/10
                      transition-all duration-500 cursor-pointer
                      flex items-center justify-center group
                      ${isCompleted ? 'ring-2 ring-emerald-400/40 dark:ring-emerald-300/30 shadow-lg shadow-emerald-400/20 dark:shadow-emerald-300/20' : ''}
                      ${isActive ? 'ring-2 ring-emerald-400/70 dark:ring-emerald-300/50 shadow-xl shadow-emerald-400/30 dark:shadow-emerald-300/30' : ''}
                      mx-auto mb-2`}
                              onClick={() => {
                                 setActiveStep(isActive ? null : index);
                                 setCurrentStep(isActive ? index - 1 : index);
                              }}
                           >
                              {/* Glow effect behind the icon */}
                              <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)] blur-xl`} />
                              <div className={`absolute inset-0 rounded-full ${isCompleted ? 'bg-gradient-to-br from-[var(--frozen-turquoise)]/20 via-[var(--megaman)]/10 to-transparent dark:from-[var(--frozen-turquoise)]/15 dark:via-[var(--megaman)]/10 dark:to-transparent' : ''}`} />
                              {/* Icon with bounce animation */}
                              <motion.div
                                whileHover={{ 
                                  scale: 1.2,
                                  rotate: [0, -10, 10, -10, 10, 0],
                                  transition: {
                                    duration: 0.5,
                                    rotate: {
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                      duration: 1
                                    }
                                  }
                                }}
                                className="relative z-10"
                              >
                                <Icon className={`w-6 h-6 transition-all duration-300 
                                  ${isCompleted 
                                    ? 'text-[var(--frozen-turquoise)] dark:text-[var(--frozen-turquoise)] group-hover:text-[var(--megaman)] dark:group-hover:text-[var(--megaman)]' 
                                    : 'text-gray-400 dark:text-white/40 group-hover:text-gray-600 dark:group-hover:text-white/70'}
                                  ${isActive ? 'text-[var(--megaman)] dark:text-[var(--frozen-turquoise)] scale-110' : ''}`} />
                              </motion.div>
                           </div>

                           {/* Title & Duration */}
                           <div className="text-center group">
                              <motion.h3
                                 className={`text-xs font-medium mb-1 relative z-10 
                                    ${isCompleted 
                                      ? 'text-gray-900 dark:text-white' 
                                      : 'text-gray-600 dark:text-gray-300'} 
                                    ${isActive ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : ''}
                                    group-hover:text-emerald-600 dark:group-hover:text-emerald-200
                                    transition-colors duration-300`}
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
                                    <motion.div
                                       className={`rounded-lg
                                          backdrop-blur
                                          group relative
                                          bg-white/8 dark:bg-black/10
                                          ${theme === 'dark' ? 'backdrop-blur-md' : ''} 
                                          rounded-lg p-4 border 
                                          ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} 
                                          relative overflow-hidden
                                          transition-all duration-500
                                          hover:border-emerald-400/70
                                          hover:shadow-lg hover:shadow-emerald-400/20 dark:hover:shadow-emerald-300/20
                                          group`}
                                       initial={{ y: 20 }}
                                       animate={{ y: 0 }}
                                       transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                       {/* Gradient hover effect */}
                                       <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-700 ease-out bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />

                                       <div className="relative z-10">
                                          <motion.p 
                                             className="text-sm text-gray-600 dark:text-white/70 mb-3 group-hover:text-gray-800 dark:group-hover:text-white/90 transition-colors duration-300"
                                             initial={{ opacity: 0 }}
                                             animate={{ opacity: 1 }}
                                             transition={{ delay: 0.1 }}
                                          >
                                             {step.description}
                                          </motion.p>
                                          <motion.ul className="space-y-2">
                                             {step.details.map((detail, detailIndex) => (
                                                <motion.li
                                                   key={detail}
                                                   initial={{ opacity: 0, x: -20 }}
                                                   animate={{ opacity: 1, x: 0 }}
                                                   transition={{ 
                                                      delay: 0.2 + (detailIndex * 0.1),
                                                      type: "spring",
                                                      stiffness: 100
                                                   }}
                                                   className="flex items-center text-xs text-gray-500 dark:text-white/50 group-hover:text-gray-700 dark:group-hover:text-white/70 transition-colors duration-300"
                                                >
                                                   <ChevronRight className="w-3 h-3 mr-2 text-emerald-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-colors duration-300" />
                                                   {detail}
                                                </motion.li>
                                             ))}
                                          </motion.ul>
                                       </div>
                                    </motion.div>
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