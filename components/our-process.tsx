'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Lightbulb, 
  Compass, 
  Code2, 
  Rocket,
  ChevronRight
} from 'lucide-react';

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef(null);

  const steps = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Discovery",
      duration: "1-2 Weeks",
      description: "Understanding your vision, goals, and technical requirements through in-depth consultation.",
      details: [
        "Stakeholder Interviews",
        "Technical Requirements Gathering",
        "Market & Competition Analysis",
        "Project Scope Definition"
      ]
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Design & Planning",
      duration: "2-3 Weeks",
      description: "Creating detailed blueprints and visual designs that align with your brand and objectives.",
      details: [
        "UI/UX Design",
        "Technical Architecture",
        "Data Model Design",
        "Timeline & Milestone Planning"
      ]
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Development",
      duration: "4-8 Weeks",
      description: "Bringing your vision to life with clean, efficient code and stunning visualizations.",
      details: [
        "Frontend Development",
        "Backend Integration",
        "Data Visualization Implementation",
        "Security Implementation"
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
        "Maintenance & Updates"
      ]
    }
  ];

  
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
      {/* Updated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,var(--primary),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,var(--accent),transparent_70%)]" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Our Process
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            A systematic approach to creating elegant, efficient solutions
          </p>
        </div>

        <div className="relative">
          {/* Updated Connection Line */}
          <div className="absolute top-[45px] left-0 w-full h-px bg-white/20">
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
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                >
                  <div className={`transition-transform duration-300 group-hover:scale-110
                    ${activeStep >= index ? 'text-white' : 'text-white/60'}`}>
                    {step.icon}
                  </div>
                </button>

                {/* Step Content remains the same */}
                <div className={`text-center transition-all duration-500 ${
                  activeStep === index ? 'transform-none opacity-100' : 'opacity-60'
                }`}>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    {step.duration}
                  </p>
                  <p className="text-white/80 mb-6">
                    {step.description}
                  </p>

                  <div className={`space-y-3 text-left transition-all duration-500 max-h-0 overflow-hidden
                    ${activeStep === index ? 'max-h-[200px]' : ''}`}>
                    {step.details.map((detail, dIndex) => (
                      <div key={dIndex} className="flex items-center text-white/60 text-sm">
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

        {/* Updated Call to Action */}
        <div className="mt-20 text-center">
          <button className="px-8 py-4 rounded-full relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-transform duration-300 group-hover:scale-105" />
            <span className="relative z-10 text-white font-semibold">
              Start Your Journey
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;