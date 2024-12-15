'use client';

import { useState, useRef } from 'react';
import {
  ExternalLink,
  Code2,
  LineChart,
  ArrowRight,
  ArrowLeft,
  Maximize,
  Globe,
  Monitor,
} from 'lucide-react';

const PortfolioSection = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const scrollRef = useRef(null);

  const projects = [
    {
      title: 'Digital Wellness Platform',
      type: 'Web Application',
      image:
        'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=800&q=80',
      description:
        'A comprehensive platform helping users track and improve their digital well-being.',
      metrics: {
        performance: 98,
        accessibility: 100,
        seo: 100,
      },
      tags: ['React', 'Node.js', 'MongoDB'],
      features: ['Interactive Recipe Builder', 'Social Sharing', 'Real-time Updates'],
    },
    {
      title: 'Mindfulness Analytics',
      type: 'Data Analytics',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      description: 'Advanced analytics dashboard for tracking mindfulness and meditation progress.',
      metrics: {
        performance: 95,
        accessibility: 98,
        seo: 98,
      },
      tags: ['Vue.js', 'Python', 'TensorFlow'],
      features: ['Real-time Data Streaming', 'Custom Visualizations', 'Predictive Analytics'],
    },
    {
      title: 'Eco-Tech Solutions',
      type: 'Enterprise Solution',
      image:
        'https://images.unsplash.com/photo-1536147210925-5cb7a4a4f63b?auto=format&fit=crop&w=800&q=80',
      description: 'Sustainable technology solutions for environmentally conscious businesses.',
      metrics: {
        performance: 97,
        accessibility: 100,
        seo: 99,
      },
      tags: ['Next.js', 'GraphQL', 'AWS'],
      features: ['Online Ordering System', 'Sustainability Tracker', 'Resource Management'],
    },
  ];

  const handleScroll = (direction) => {
    const element = scrollRef.current;
    if (element) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const ProjectMetric = ({ label, value }) => (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-white/10" />
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)]"
          style={{
            clipPath: `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
          {value}
        </div>
      </div>
      <span className="text-white/60 text-sm mt-2">{label}</span>
    </div>
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative">
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-5xl font-bold mb-6 text-white">Featured Work</h2>
        <p className="text-lg text-white/80 max-w-2xl">
          Explore our latest projects showcasing our commitment to quality and innovation
        </p>
      </div>

      {/* Project Showcase */}
      <div className="relative mb-12">
        {/* Main Project Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Project Image */}
          <div className="relative group">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/10">
              <img
                src={projects[activeProject].image}
                alt={projects[activeProject].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white flex items-center gap-2 hover:bg-white/30 transition-colors duration-300"
              >
                <Maximize className="w-4 h-4" />
                View Project
              </button>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {projects[activeProject].title}
              </h3>
              <p className="text-white/60">{projects[activeProject].type}</p>
            </div>

            <p className="text-white/80 text-lg">{projects[activeProject].description}</p>

            {/* Metrics */}
            <div className="flex justify-between max-w-xs">
              <ProjectMetric
                label="Performance"
                value={projects[activeProject].metrics.performance}
              />
              <ProjectMetric
                label="Accessibility"
                value={projects[activeProject].metrics.accessibility}
              />
              <ProjectMetric label="SEO" value={projects[activeProject].metrics.seo} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {projects[activeProject].tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold mb-4">Key Features</h4>
              {projects[activeProject].features.map((feature, index) => (
                <div key={index} className="flex items-center text-white/80">
                  <ArrowRight className="w-4 h-4 mr-2 text-[var(--frozen-turquoise)]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Navigation */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
          <button
            onClick={() =>
              setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
            }
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
              flex items-center justify-center text-white pointer-events-auto
              hover:bg-white/20 transition-colors duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveProject((prev) => (prev + 1) % projects.length)}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
              flex items-center justify-center text-white pointer-events-auto
              hover:bg-white/20 transition-colors duration-300"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Project Previews */}
      <div className="relative mt-12">
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => setActiveProject(index)}
              className={`flex-shrink-0 w-72 rounded-xl overflow-hidden transition-all duration-300
                ${activeProject === index ? 'ring-2 ring-[var(--frozen-turquoise)]' : 'opacity-60 hover:opacity-80'}`}
            >
              <div className="aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-md">
                <h4 className="text-white font-semibold">{project.title}</h4>
                <p className="text-white/60 text-sm">{project.type}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
