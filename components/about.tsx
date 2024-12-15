'use client';

import { useState } from 'react';
import {
  Network,
  Users,
  Workflow,
  Code2,
  Globe,
  Leaf,
  LineChart,
  Shield,
  ArrowRight,
} from 'lucide-react';

const AboutSection = () => {
  const [activeCapability, setActiveCapability] = useState(0);

  const capabilities = [
    {
      icon: <Network className="w-6 h-6" />,
      title: 'Network-Driven Expertise',
      description:
        "We leverage a curated network of specialists to scale and adapt to each project's unique needs, ensuring the right expertise at the right time.",
      metrics: [
        { label: 'Specialist Network', value: '20+' },
        { label: 'Countries', value: '5+' },
        { label: 'Industries Served', value: '10+' },
      ],
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: 'Agile Methodology',
      description:
        'Our flexible approach allows us to scale teams up or down based on project requirements, maintaining efficiency without compromising quality.',
      metrics: [
        { label: 'Project Success Rate', value: '98%' },
        { label: 'Avg. Delivery Time', value: '-20%' },
        { label: 'Client Satisfaction', value: '100%' },
      ],
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Reach',
      description:
        'With a distributed model, we bring together the best talent regardless of location, offering round-the-clock development and support.',
      metrics: [
        { label: 'Time Zones Covered', value: '12' },
        { label: 'Remote Projects', value: '50+' },
        { label: 'Global Clients', value: '15+' },
      ],
    },
  ];

  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Custom Development',
      description: 'Tailored solutions that adapt to your unique needs',
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: 'Data Visualization',
      description: 'Transform complex data into compelling stories',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security First',
      description: 'Enterprise-grade security in every solution',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-[var(--megaman)]/10 to-transparent" />
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[var(--frozen-turquoise)]/10 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Main Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Boutique Studio,{' '}
            <span className="bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] bg-clip-text text-transparent">
              Global Impact
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            We're a dynamic digital studio that combines technical excellence with nature-inspired
            innovation to create impactful solutions.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20
                hover:bg-white/20 transition-all duration-500"
            >
              <div className="text-[var(--frozen-turquoise)] mb-6 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-white/60">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Capabilities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h3 className="text-3xl font-bold text-white mb-8">Adaptive Capabilities</h3>
            <div className="space-y-4">
              {capabilities.map((capability, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCapability(index)}
                  className={`w-full p-6 rounded-xl text-left transition-all duration-300 
                    ${
                      activeCapability === index
                        ? 'bg-gradient-to-r from-[var(--megaman)]/20 to-[var(--frozen-turquoise)]/20 border border-white/20'
                        : 'hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        activeCapability === index
                          ? 'bg-white/20 text-[var(--frozen-turquoise)]'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {capability.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{capability.title}</h4>
                      <p className="text-white/60">{capability.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Display */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-2 gap-8">
              {capabilities[activeCapability].metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[var(--frozen-turquoise)] mb-2">
                    {metric.value}
                  </div>
                  <div className="text-white/60">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl 
            bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)]
            text-white font-semibold hover:shadow-lg transition-all duration-300 
            hover:scale-105"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
