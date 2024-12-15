'use client';

import { useEffect, useState } from 'react';
import { Leaf, Sparkles, Scale, Target } from 'lucide-react';

const WhyChooseSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [rotation, setRotation] = useState(0);

  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Nature-Inspired Innovation',
      description:
        "We blend natural principles with digital innovation, creating solutions that feel organic and intuitive. Our approach draws from nature's time-tested patterns to solve complex digital challenges.",
      highlight: '20% lower carbon footprint',
      color: 'var(--megaman)',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Boutique Quality',
      description:
        'Every project receives dedicated attention to detail through our craft-focused approach. We take pride in delivering solutions that exceed expectations and stand the test of time.',
      highlight: '100% client satisfaction',
      color: 'var(--frozen-turquoise)',
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: 'Balanced Approach',
      description:
        'We strike the perfect balance between aesthetics and functionality, ensuring solutions that are both beautiful and effective. Our focus on harmony creates experiences that truly resonate.',
      highlight: '98% performance score',
      color: 'var(--heart-of-ice)',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev - 120);
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleFeatureClick = (index) => {
    const currentRotation = rotation % 360;
    const targetRotation = -120 * index;
    const adjustment = targetRotation - currentRotation;
    setRotation(rotation + adjustment);
    setActiveFeature(index);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[var(--megaman)] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[var(--frozen-turquoise)] blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent">
              Prana
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Our unique approach combines nature-inspired design with technical excellence
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(300px, 30vw, 500px)] text-center">
            <div className="transition-all duration-700 ease-in-out">
              <div className="mb-8">
                <div
                  className="w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all duration-700"
                  style={{ backgroundColor: `${features[activeFeature].color}20` }}
                >
                  {features[activeFeature].icon}
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-6 transition-all duration-700">
                {features[activeFeature].title}
              </h3>

              <p className="text-lg text-white/80 mb-8 transition-all duration-700">
                {features[activeFeature].description}
              </p>

              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white transition-all duration-700">
                <Target className="w-5 h-5" />
                {features[activeFeature].highlight}
              </div>
            </div>
          </div>

          {/* Orbital Track */}
          <div className="relative w-full aspect-square max-w-[800px] mx-auto">
            {/* Orbital Path */}
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />

            {/* Orbital Items */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-in-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {features.map((feature, index) => {
                const angle = index * 120 - 90; // Start from the top
                const radius = `calc(50% - 50px)`; // Dynamic radius considering icon size
                return (
                  <button
                    key={index}
                    onClick={() => handleFeatureClick(index)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20
                      rounded-full flex items-center justify-center transition-all duration-500
                      hover:scale-110 cursor-pointer"
                    style={{
                      transform: `rotate(${angle}deg) translate(${radius}) rotate(-${angle}deg)`,
                      backgroundColor: `${feature.color}20`,
                      borderWidth: 2,
                      borderColor: activeFeature === index ? feature.color : 'transparent',
                    }}
                  >
                    {feature.icon}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => handleFeatureClick(index)}
              className={`h-1 rounded-full transition-all duration-300 
                ${index === activeFeature ? 'w-8 bg-[var(--frozen-turquoise)]' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
