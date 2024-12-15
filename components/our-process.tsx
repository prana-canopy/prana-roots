'use client';

import { useState, useRef, useEffect } from 'react';
import { Lightbulb, Compass, Code2, Rocket, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const ProcessSection = () => {
   const [activeStep, setActiveStep] = useState(0);
   const [isIntersecting, setIsIntersecting] = useState(false);
   const sectionRef = useRef(null);
   const { resolvedTheme: theme } = useTheme();

   const steps = [
      {
         icon: Lightbulb,
         title: 'Discovery & Planning',
         duration: '1-4 Weeks',
         description: 'Understanding your vision and technical requirements.',
         details: ['Stakeholder Interviews', 'Requirements Gathering', 'Market Analysis', 'Scope Definition', 'Timeline Planning'],
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

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => setIsIntersecting(entry.isIntersecting),
         { threshold: 0.2 }
      );
      sectionRef.current && observer.observe(sectionRef.current);
      return () => observer.disconnect();
   }, []);

   return (
      <div ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 relative overflow-hidden">
         <div className="text-center mb-16">
            <motion.h2
               className="text-5xl font-bold mb-6 text-transparent bg-clip-text dark:metallic-gradient-light metallic-gradient-dark"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               whileHover={{ scale: 1.02 }}
               transition={{ duration: 0.3 }}
            >
               Our Process
            </motion.h2>
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
            >
               A systematic approach to creating elegant, efficient solutions.
            </motion.p>
         </div>

         <div className="relative">
            <div className="absolute top-[45px] left-0 w-full h-px bg-gray-300 dark:bg-white/20">
               <div
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                  style={{ width: `${((activeStep + 1) * 100) / steps.length}%` }}
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {steps.map((step, index) => (
                  <div
                     key={index}
                     className={`relative transition-opacity duration-500 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                     style={{ transitionDelay: `${index * 200}ms` }}
                  >
                     <button
                        onClick={() => setActiveStep(index)}
                        className={`w-[90px] h-[90px] rounded-full border-2 flex items-center justify-center mx-auto mb-8 group ${activeStep >= index
                           ? 'bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] border-transparent'
                           : 'border-gray-300 dark:border-white/20'
                           }`}
                     >
                        <step.icon className={`w-6 h-6 ${activeStep >= index ? 'text-white' : 'text-gray-500 dark:text-white/60'}`} />
                     </button>
                     <div className={`text-center ${activeStep === index ? 'opacity-100' : 'opacity-60'}`}>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{step.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-white/60">{step.duration}</p>
                        <p className="mb-6 text-gray-600 dark:text-white/80">{step.description}</p>
                        <div className={`space-y-3 ${activeStep === index ? 'max-h-[200px]' : 'max-h-0'} overflow-hidden`}>
                           {step.details.map((detail, dIndex) => (
                              <div key={dIndex} className="flex items-center text-sm text-gray-500 dark:text-white/60">
                                 <ChevronRight className="w-4 h-4 mr-2 text-[var(--accent)]" />
                                 {detail}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default ProcessSection;
