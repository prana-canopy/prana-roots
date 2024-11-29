'use client';

import { useState } from 'react';
import { 
  Code2, 
  LineChart,
  Database,
  Globe,
  ArrowRight,
  Blocks,
  Fingerprint
} from 'lucide-react';

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Custom Web Development",
      description: "Bespoke websites and web applications built with modern technologies.",
      deliverables: [
        "Responsive Website Development",
        "Progressive Web Applications",
        "E-commerce Solutions",
        "Content Management Systems",
        "API Development & Integration"
      ],
      technologies: ["React", "Next.js", "Node.js", "TypeScript"]
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Data Visualization",
      description: "Interactive dashboards and data-driven interfaces.",
      deliverables: [
        "Custom Chart Development",
        "Real-time Data Dashboards",
        "Interactive Infographics",
        "Performance Metrics Display",
        "Data Story Interfaces"
      ],
      technologies: ["D3.js", "WebGL", "Canvas", "SVG"]
    },
    {
      icon: <Blocks className="w-8 h-8" />,
      title: "Web Applications",
      description: "Full-stack applications with robust functionality.",
      deliverables: [
        "User Authentication Systems",
        "Database Architecture",
        "Real-time Features",
        "Third-party Integrations",
        "Automated Testing"
      ],
      technologies: ["PostgreSQL", "Redis", "WebSocket", "REST"]
    },
    {
      icon: <Fingerprint className="w-8 h-8" />,
      title: "Security Implementation",
      description: "Enterprise-grade security solutions and best practices.",
      deliverables: [
        "Security Audits",
        "Authentication Systems",
        "Data Encryption",
        "GDPR Compliance",
        "Security Monitoring"
      ],
      technologies: ["JWT", "OAuth", "HTTPS", "2FA"]
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Our Services
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Comprehensive web development and data solutions for modern businesses
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Service Navigation */}
        <div className="space-y-4">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveService(index)}
              className={`w-full p-6 rounded-xl text-left transition-all duration-300 
                ${activeService === index 
                  ? 'bg-gradient-to-r from-[var(--megaman)]/20 to-[var(--frozen-turquoise)]/20 border border-white/20' 
                  : 'hover:bg-white/5'
                }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  activeService === index 
                    ? 'bg-white/20 text-[var(--frozen-turquoise)]' 
                    : 'bg-white/10 text-white/60'
                }`}>
                  {service.icon}
                </div>
                <span className="text-lg font-semibold text-white">
                  {service.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Service Details */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              {services[activeService].title}
            </h3>
            <p className="text-white/80 text-lg">
              {services[activeService].description}
            </p>
          </div>

          {/* Deliverables */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">
              What's Included
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services[activeService].deliverables.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--frozen-turquoise)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {services[activeService].technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/10 text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;