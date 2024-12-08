'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Lightbulb, 
  Compass, 
  Code2, 
  Rocket,
  ChevronRight
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);
  const { resolvedTheme: theme } = useTheme();
  const steps = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Discovery & Planning",
      duration: "1-4 Weeks",
      description: "Understanding your vision, goals, and technical requirements through in-depth consultation and planning.",
      details: [
        "Stakeholder Interviews",
        "Technical Requirements Gathering",
        "Market & Competition Analysis",
        "Project Scope Definition",
        "Timeline & Milestone Planning"
      ]
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Design & Architecture",
      duration: "2-8 Weeks",
      description: "Creating detailed blueprints and visual designs that align with your brand and objectives.",
      details: [
        "UI/UX Design",
        "Technical Architecture",
        "Data Model Design",
        "System Integration Planning"
      ]
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Development & Integration",
      duration: "4-16 Weeks",
      description: "Bringing your vision to life with clean, efficient code and stunning visualizations.",
      details: [
        "Frontend Development",
        "Backend Integration",
        "Data Visualization Implementation",
        "Security Implementation",
        "System Integration"
      ]
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Launch & Support",
      duration: "Ongoing",
      description: "Ensuring a smooth deployment and providing continued support for your success.",
      details: [
        "Testing & Quality Assurance",
        "Performance Optimization",
        "Deployment & Launch",
        "Maintenance & Updates",
        "Ongoing Support"
      ]
    }
  ];

  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 py-24 relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            className="text-5xl font-bold mb-6 text-transparent bg-clip-text cursor-pointer dark:metallic-gradient-light metallic-gradient-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Our Process
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
          >
            A systematic approach to creating elegant, efficient solutions
          </motion.p>
        </div>

        <div className="relative">
          {/* Updated Connection Line */}
          <div className={`absolute top-[45px] left-0 w-full h-px bg-gray-300 dark:bg-white/20`}>
            <div 
              className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-500"
              style={{ width: `${((activeStep + 1) * 100) / steps.length}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Updated Step Number & Icon */}
                <button
                  onClick={() => setActiveStep(index)}
                  className={`relative z-10 w-[90px] h-[90px] rounded-full border-2 
                    flex items-center justify-center mb-8 mx-auto
                    transition-all duration-300 group
                    ${activeStep >= index 
                      ? 'bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] border-transparent' 
                      : 'border-gray-300 dark:border-white/20 hover:border-gray-200 dark:hover:border-white/20'
                    }`}
                >
                  <div className={`transition-transform duration-300 group-hover:scale-110
                    ${activeStep >= index 
                      ? 'text-white' 
                      : 'text-gray-500 dark:text-white/60'
                    }`}>
                    {step.icon}
                  </div>
                </button>

                {/* Step Content remains the same */}
                <div className={`text-center transition-all duration-500 ${
                  activeStep === index ? 'transform-none opacity-100' : 'opacity-60'
                }`}>
                  <h3 className={`text-xl font-semibold mb-2 text-gray-800 dark:text-white`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm mb-4 text-gray-500 dark:text-white/60`}>
                    {step.duration}
                  </p>
                  <p className={`mb-6 text-gray-600 dark:text-white/80`}>
                    {step.description}
                  </p>

                  <div className={`space-y-3 text-left transition-all duration-500 max-h-0 overflow-hidden
                    ${activeStep === index ? 'max-h-[200px]' : ''}`}>
                    {step.details.map((detail, dIndex) => (
                      <div key={dIndex} className={`flex items-center text-sm text-gray-500 dark:text-white/60`}>
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
    </section>
  );
};

export default ProcessSection;