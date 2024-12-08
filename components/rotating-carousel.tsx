'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, MousePointerClick, Clock, Users, Leaf, TrendingUp, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';

const PlaceholderChart = () => {
  const { resolvedTheme: theme } = useTheme();
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-lg border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
      <div className={`${theme === 'dark' ? 'text-white/70' : 'text-black/70'} text-center`}>
        <p className="mb-2">Chart Placeholder</p>
        <p className="text-sm">Visitor metrics visualization will appear here</p>
        <div className="mt-4 flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--megaman)]" />
            <span className="text-sm">Visitors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--frozen-turquoise)]" />
            <span className="text-sm">Engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--heart-of-ice)]" />
            <span className="text-sm">Conversions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricHistory {
  date: string;
  visitors: number;
  engagement: number;
  conversions: number;
}

interface CarouselCard {
  title: string;
  description: string;
  previewImage: string;
  metrics: {
    current: {
      visitors: string;
      engagement: string;
      timeSpent: string;
      conversion: string;
    };
    history: MetricHistory[];
  };
  features: string[];
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    image: string;
  };
  techStack: string[];
}

const generateMetricHistory = (baseline: number, days: number): MetricHistory[] => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    visitors: Math.floor(baseline * (1 + Math.sin(i / 3) * 0.3)),
    engagement: Math.floor(65 + Math.cos(i / 2) * 15),
    conversions: Math.floor(8 + Math.sin(i / 4) * 3),
  }));
};

const cards: CarouselCard[] = [
  {
    title: "Pinky's Up Social",
    description: "Elevating nightlife experiences through social connectivity",
    previewImage: "pinkys.png",
    metrics: {
      current: {
        visitors: "5,234",
        engagement: "78%",
        timeSpent: "6m 45s",
        conversion: "12.3%"
      },
      history: generateMetricHistory(5200, 14)
    },
    features: [
      "Real-time venue capacity tracking",
      "Social event discovery",
      "VIP reservations and experiences",
      "Interactive venue maps"
    ],
    testimonial: {
      quote: "Prana Roots transformed our digital presence and helped us connect with our audience in meaningful ways.",
      author: "Pinky's Up Team",
      company: "Pinky's Up Social",
      image: "pinkys.png"
    },
    techStack: ["React", "Next.js", "TailwindCSS", "Node.js"]
  },
  // {
  //   title: "Biodiversity Analytics Dashboard",
  //   description: "Connecting conservation with cutting-edge tech",
  //   previewImage: "pinkys.png",
  //   metrics: {
  //     current: {
  //       visitors: "3,156",
  //       engagement: "72%",
  //       timeSpent: "5m 03s",
  //       conversion: "9.4%"
  //     },
  //     history: generateMetricHistory(3100, 14)
  //   },
  //   features: [
  //     "Species tracking visualization",
  //     "Habitat health monitoring",
  //     "Conservation impact metrics",
  //     "Biodiversity mapping"
  //   ],
  //   testimonial: {
  //     quote: "The dashboard has revolutionized how we track and protect local ecosystems.",
  //     author: "Michael Torres",
  //     company: "Wildlife Conservation Tech",
  //     image: "pinkys.png"
  //   },
  //   techStack: ["React", "D3.js", "Python", "PostgreSQL"]
  // }
];

export default function RotatingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'features'>('overview');
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    })
  };

  const MetricCard = ({ icon, label, value, trend }) => (
    <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-black/5'} backdrop-blur-md rounded-lg p-4 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>{label}</span>
        {icon}
      </div>
      <div className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{value}</div>
      <div className={`text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        <TrendingUp className="w-4 h-4" />
      </div>
    </div>
  );

  const TabButton = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        activeTab === tab 
          ? `${theme === 'dark' ? 'bg-white/20 text-white' : 'bg-black/10 text-black'}`
          : `${theme === 'dark' ? 'text-white/70 hover:bg-white/10' : 'text-black/70 hover:bg-black/5'}`
      }`}
    >
      {label}
    </button>
  );

  if (!mounted) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="relative h-[700px] perspective">
        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-20 px-4">
          {['prev', 'next'].map((direction) => (
            <button
              key={direction}
              onClick={() => {
                const newDirection = direction === 'next' ? 1 : -1;
                setDirection(newDirection);
                setCurrentIndex((currentIndex + newDirection + cards.length) % cards.length);
              }}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
            >
              <Leaf 
                className={`w-6 h-6 text-white transition-transform ${
                  direction === 'next' ? 'rotate-90' : '-rotate-90'
                } group-hover:scale-110`}
              />
            </button>
          ))}
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.4 }
            }}
            className="absolute w-full h-full"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-[var(--megaman)]/20 to-[var(--frozen-turquoise)]/20' : 'from-[var(--megaman)]/10 to-[var(--frozen-turquoise)]/10'} backdrop-blur-md border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`} />
              
              <div className="relative h-full p-8 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-2">
                    <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {cards[currentIndex].title}
                    </h2>
                    <p className={`text-lg ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                      {cards[currentIndex].description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <TabButton tab="overview" label="Overview" />
                    <TabButton tab="metrics" label="Metrics" />
                    <TabButton tab="features" label="Features" />
                  </div>
                </div>

                {/* Content based on active tab */}
                <div className="flex-1 overflow-hidden">
                  {activeTab === 'overview' && (
                    <div className="h-full grid grid-cols-1 gap-8">
                      {/* Site Preview */}
                      <div className={`relative rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} group hover:border-[var(--megaman)] transition-all duration-300`}>
                        {/* Browser Frame */}
                        <div className={`h-8 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'} flex items-center px-4 space-x-2`}>
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                        </div>
                        {/* Image Container */}
                        <div className="relative w-full overflow-hidden" style={{ paddingBottom: "45%" }}>
                          <div className="absolute inset-0 bg-black/20 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500 z-10" />
                          <img 
                            src={cards[currentIndex].previewImage}
                            alt={`${cards[currentIndex].title} Preview`}
                            className="absolute inset-0 w-full h-full object-cover object-center 
                              filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 
                              transform group-hover:scale-105 transition-all duration-500"
                          />
                        </div>
                      </div>

                      {/* Quick Stats & Testimonial */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <MetricCard
                              icon={<Globe className="w-5 h-5 text-white/70" />}
                              label="Active Users"
                              value={cards[currentIndex].metrics.current.visitors}
                              trend={5.2}
                            />
                            <MetricCard
                              icon={<Clock className="w-5 h-5 text-white/70" />}
                              label="Avg. Session"
                              value={cards[currentIndex].metrics.current.timeSpent}
                              trend={3.8}
                            />
                          </div>
                        </div>
                        
                        {cards[currentIndex].testimonial && (
                          <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                            <div className="flex items-center gap-4 mb-4">
                              <img 
                                src={cards[currentIndex].testimonial.image}
                                alt={cards[currentIndex].testimonial.author}
                                className="w-12 h-12 rounded-full"
                              />
                              <div>
                                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                  {cards[currentIndex].testimonial.author}
                                </p>
                                <p className={`text-white/70 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'} text-sm`}>
                                  {cards[currentIndex].testimonial.company}
                                </p>
                              </div>
                            </div>
                            <p className={`text-white/90 ${theme === 'dark' ? 'text-white/90' : 'text-black/90'} italic`}>
                              "{cards[currentIndex].testimonial.quote}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'metrics' && (
                    <div className="h-full space-y-6">
                      <div className="grid grid-cols-4 gap-4">
                        <MetricCard
                          icon={<Eye className="w-5 h-5 text-white/70" />}
                          label="Visitors"
                          value={cards[currentIndex].metrics.current.visitors}
                          trend={5.2}
                        />
                        <MetricCard
                          icon={<MousePointerClick className="w-5 h-5 text-white/70" />}
                          label="Engagement"
                          value={cards[currentIndex].metrics.current.engagement}
                          trend={3.8}
                        />
                        <MetricCard
                          icon={<Clock className="w-5 h-5 text-white/70" />}
                          label="Avg. Time"
                          value={cards[currentIndex].metrics.current.timeSpent}
                          trend={-2.1}
                        />
                        <MetricCard
                          icon={<Users className="w-5 h-5 text-white/70" />}
                          label="Conversion"
                          value={cards[currentIndex].metrics.current.conversion}
                          trend={7.4}
                        />
                      </div>

                      <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} h-[300px]`}>
                        <h3 className={`text-white ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>Performance Trends</h3>
                        <PlaceholderChart />
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="h-full grid grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                          <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>Key Features</h3>
                          <ul className="space-y-4">
                            {cards[currentIndex].features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-white/90">
                                <div className="w-2 h-2 rounded-full bg-[var(--frozen-turquoise)]" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                          <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>Tech Stack</h3>
                          <div className="flex flex-wrap gap-2">
                            {cards[currentIndex].techStack.map((tech) => (
                              <span 
                                key={tech} 
                                className={`px-3 py-1.5 rounded-full ${theme === 'dark' ? 'bg-white/20 text-white' : 'bg-black/10 text-black'}`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                        <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>Implementation Timeline</h3>
                        <div className="space-y-6">
                          <div className="relative pl-8 border-l-2 border-white/20">
                            <div className="absolute left-0 top-1.5 w-4 h-4 -translate-x-[9px] rounded-full bg-[var(--megaman)]" />
                            <h4 className={`text-white ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>Discovery & Planning</h4>
                            <p className={`text-white/70 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>2 weeks</p>
                          </div>
                          <div className="relative pl-8 border-l-2 border-white/20">
                            <div className="absolute left-0 top-1.5 w-4 h-4 -translate-x-[9px] rounded-full bg-[var(--frozen-turquoise)]" />
                            <h4 className={`text-white ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>Design & Development</h4>
                            <p className={`text-white/70 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>6-8 weeks</p>
                          </div>
                          <div className="relative pl-8 border-l-2 border-white/20">
                            <div className="absolute left-0 top-1.5 w-4 h-4 -translate-x-[9px] rounded-full bg-[var(--heart-of-ice)]" />
                            <h4 className={`text-white ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>Testing & Refinement</h4>
                            <p className={`text-white/70 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>2 weeks</p>
                          </div>
                          <div className="relative pl-8">
                            <div className="absolute left-0 top-1.5 w-4 h-4 -translate-x-[9px] rounded-full bg-[var(--electric-lettuce)]" />
                            <h4 className={`text-white ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>Launch & Support</h4>
                            <p className={`text-white/70 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Ongoing</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${currentIndex === index 
                  ? `${theme === 'dark' ? 'bg-white w-6' : 'bg-black w-6'}`
                  : `${theme === 'dark' ? 'bg-white/50 hover:bg-white/70' : 'bg-black/50 hover:bg-black/70'}`
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}