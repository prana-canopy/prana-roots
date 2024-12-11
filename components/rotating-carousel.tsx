'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Eye, MousePointerClick, Clock, Users, Leaf, TrendingUp, Globe, Gauge, Search, Target, Smartphone, Share2, Star, PartyPopper, Trophy, Zap, Cpu, Shield, Activity, Info, TrendingDown, Code, Rocket } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import Image from 'next/image';

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
  url: string;
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
    title: "PINKYS UP DC",
    description: "Elevating nightlife experiences through social connectivity",
    previewImage: "pinkys.png",
    url: "https://pinkysup.social",
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
      quote: "Vitality didn't just build us a website - they created an ecosystem that revolutionized how we do business. Their attention to detail and understanding of the nightlife industry truly sets them apart.",
      author: "Brenda Periera Vargas",
      company: "Founder - PINKYS UP DC",
      image: "brenda.jpg"
    },
    techStack: [
      // Frontend
      "React", "Next.js", "TailwindCSS", "TypeScript", "Framer Motion",
      // Backend
      "Node.js", "Express", "MongoDB", "Socket.io",
      // Deployment & CMS
      "Vercel", "Sanity", "Cloudinary"
    ]
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

interface RotatingCarouselProps {
  value: string;
}

interface TabButtonProps {
  tab: 'overview' | 'metrics' | 'features';
  label: string;
}

interface MetricCardProps {
  icon: React.ReactElement;
  label: string;
  value: string;
  trend: number;
  caption: string;
  index: number;
}

interface TimelinePhase {
  title: string;
  description: string;
  duration: string;
  icon: React.ReactElement;
}

const timelinePhases: TimelinePhase[] = [
  {
    title: "Discovery",
    description: "Requirements gathering and project planning",
    duration: "1-2 weeks",
    icon: <Search className="w-4 h-4" />
  },
  {
    title: "Design",
    description: "UI/UX design and prototyping",
    duration: "2-3 weeks",
    icon: <Cpu className="w-4 h-4" />
  },
  {
    title: "Development",
    description: "Core functionality implementation",
    duration: "4-6 weeks",
    icon: <Code className="w-4 h-4" />
  },
  {
    title: "Testing",
    description: "Quality assurance and refinement",
    duration: "1-2 weeks",
    icon: <Shield className="w-4 h-4" />
  },
  {
    title: "Launch",
    description: "Deployment and monitoring",
    duration: "1 week",
    icon: <Rocket className="w-4 h-4" />
  }
];

const Timeline = () => {
  const { resolvedTheme: theme } = useTheme();
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-full h-[80%]" viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--megaman)" />
              <stop offset="50%" stopColor="var(--frozen-turquoise)" />
              <stop offset="100%" stopColor="var(--heart-of-ice)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Curved connecting lines with animation */}
          <path
            d="M 50,150 C 150,150 250,50 350,50"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            className={`opacity-30 transition-all duration-500 ${hoveredPhase !== null ? 'animate-pulse' : ''}`}
            filter="url(#glow)"
          />
          <path
            d="M 50,150 C 150,150 250,250 350,250"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            className={`opacity-30 transition-all duration-500 ${hoveredPhase !== null ? 'animate-pulse' : ''}`}
            filter="url(#glow)"
          />
        </svg>
      </div>

      <div className="relative grid grid-cols-5 gap-2">
        {timelinePhases.map((phase, index) => (
          <motion.div
            key={phase.title}
            className={`
              group relative p-2 rounded-lg backdrop-blur-sm
              ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}
              border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}
              transition-all duration-500
              hover:scale-105 hover:shadow-lg
              ${theme === 'dark' ? 'hover:shadow-cyan-500/20' : 'hover:shadow-cyan-500/30'}
              cursor-pointer
              hover:border-[var(--megaman)]
            `}
            onHoverStart={() => setHoveredPhase(index)}
            onHoverEnd={() => setHoveredPhase(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            <div className={`
              absolute inset-0 rounded-lg transition-all duration-500
              bg-gradient-to-r from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]
              opacity-0 group-hover:opacity-10
            `} />
            
            <div className="relative z-10">
              <div className={`
                p-1.5 rounded-lg mb-2 w-fit
                ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}
                transition-all duration-300
                group-hover:bg-gradient-to-r from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]
                group-hover:bg-opacity-20
              `}>
                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {phase.icon}
                </div>
              </div>
              
              <h4 className={`
                text-sm font-medium mb-1
                ${theme === 'dark' ? 'text-white' : 'text-black'}
                transition-colors duration-300
                group-hover:text-[var(--frozen-turquoise)]
              `}>
                {phase.title}
              </h4>
              
              <div className={`
                text-[10px] mb-1 line-clamp-2
                ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}
                transition-colors duration-300
                group-hover:text-opacity-90
              `}>
                {phase.description}
              </div>
              
              <div className={`
                text-[10px] font-medium
                ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}
                transition-colors duration-300
                group-hover:text-[var(--megaman)]
              `}>
                {phase.duration}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95
  })
};

export default function RotatingCarousel({ value }: RotatingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'features'>('overview');
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragEndX = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const TabButton = ({ tab, label }: TabButtonProps) => (
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

  const MetricCard = ({ icon, label, value, trend, caption, index }: MetricCardProps) => {
    const [count, setCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });
    const numericValue = parseInt(value.replace(/,/g, ''));
    
    useEffect(() => {
      if (!isInView) return;
      
      const duration = 2000;
      const steps = 60;
      const stepValue = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        if (current < numericValue) {
          current = Math.min(current + stepValue, numericValue);
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }, [numericValue, isInView]);

    return (
      <motion.div 
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`
          relative overflow-visible backdrop-blur-md rounded-lg p-2 
          transition-all duration-300 hover:scale-105 h-[90px] sm:h-[100px]
          before:absolute before:-inset-[1px] before:rounded-lg 
          before:bg-gradient-to-r before:from-pink-300/50 before:to-pink-500/50
          before:opacity-0 hover:before:opacity-100
          before:transition-opacity before:duration-300
          before:-z-10
          after:absolute after:inset-0 after:rounded-lg after:content-['']
          after:transition-all after:duration-300
          after:-z-20
          ${theme === 'dark' ? 'bg-[#111]/90 after:bg-[#111]/90' : 'bg-white/90 after:bg-white/90'}
          border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}
        `}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-lg opacity-5">
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Top Section */}
          <div className="flex items-start justify-between mb-1">
            <div className={`p-1 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
              {React.cloneElement(icon as React.ReactElement, {
                className: 'w-3 h-3'
              })}
            </div>
            <div className={`text-[10px] sm:text-xs font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
              {label}
            </div>
          </div>

          {/* Value */}
          <div className={`text-xl sm:text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {value.includes('%') ? (
              <>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  key={count}
                >
                  {Math.floor(count)}
                </motion.span>
                <span className="text-xs font-normal opacity-70">%</span>
              </>
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                key={count}
              >
                {count.toLocaleString()}
              </motion.span>
            )}
          </div>

          {/* Bottom Section */}
          <div className="space-y-0.5">
            <div className={`flex items-center gap-1 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              <motion.div 
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex items-center gap-0.5 text-[10px] font-medium whitespace-nowrap"
              >
                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                <TrendingUp className="w-2 h-2" />
              </motion.div>
              <div className="h-0.5 flex-grow rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${Math.min(Math.abs(trend) * 5, 100)}%` } : { width: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${trend >= 0 ? 'bg-green-400' : 'bg-red-400'}`}
                />
              </div>
            </div>
            
            {/* Caption with Tooltip */}
            <div className="relative">
              <div className={`text-[8px] leading-none ${theme === 'dark' ? 'text-white/40' : 'text-black/40'} flex items-center gap-1`}>
                <span>{caption}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className={`
                        p-0.5 rounded-full cursor-help transition-colors duration-200
                        ${theme === 'dark' 
                          ? 'hover:bg-white/10' 
                          : 'hover:bg-black/5'
                        }
                      `}
                    >
                      <Info className="w-2 h-2" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipPrimitive.Portal>
                    <TooltipContent
                      side={index < 2 ? "right" : "left"}
                      className={`
                        z-[60]
                        backdrop-blur-md
                        border-pink-500/20
                        max-w-[180px] sm:max-w-[200px]
                        text-[10px] sm:text-[11px]
                        px-2 py-1.5 sm:px-3 sm:py-2
                        ${theme === 'dark' 
                          ? 'bg-black/90 text-white border-white/20' 
                          : 'bg-white/90 text-black border-black/10'
                        }
                      `}
                    >
                      {label === "SEO Score" && "Perfect search engine optimization score, ensuring maximum visibility and reach for your target audience"}
                      {label === "Accessibility" && "High accessibility compliance score, making your site usable for people of all abilities"}
                      {label === "Security" && "Perfect security score, implementing all recommended web security best practices"}
                      {label === "Performance" && "Exceptional loading speed and performance optimization across all devices"}
                    </TooltipContent>
                  </TooltipPrimitive.Portal>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (!mounted) return null;

  return (
    <TooltipProvider delayDuration={100}>
      <div className="w-full h-full flex flex-col">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-16">
          <div className="relative h-[500px] sm:h-[600px] md:h-[700px] perspective">
            {/* Navigation Buttons */}
            <div className="absolute inset-x-1 sm:inset-x-2 md:inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20">
              {['prev', 'next'].map((direction) => (
                <button
                  key={direction}
                  onClick={() => {
                    setDirection(direction as "prev" | "next");
                    setCurrentIndex(
                      direction === 'next'
                        ? (currentIndex + 1) % cards.length
                        : (currentIndex - 1 + cards.length) % cards.length
                    );
                  }}
                  className={`p-2 sm:p-3 md:p-4 rounded-full 
                    ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} 
                    backdrop-blur-md transition-all duration-300 
                    hover:scale-110 active:scale-95
                    text-white shadow-lg`}
                  aria-label={`Show ${direction} slide`}
                >
                  {direction === 'prev' ? '←' : '→'}
                </button>
              ))}
            </div>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    setDirection('next');
                    setCurrentIndex((currentIndex + 1) % cards.length);
                  } else if (swipe > swipeConfidenceThreshold) {
                    setDirection('prev');
                    setCurrentIndex((currentIndex - 1 + cards.length) % cards.length);
                  }
                }}
                className="absolute w-full h-full"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    theme === 'dark' 
                      ? 'from-[var(--megaman)]/20 via-[var(--frozen-turquoise)]/15 to-[var(--heart-of-ice)]/20' 
                      : 'from-[var(--megaman)]/10 via-[var(--frozen-turquoise)]/5 to-[var(--heart-of-ice)]/10'
                  } backdrop-blur-md border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} h-full`}>
                    
                    <div className="relative h-full p-3 sm:p-6 md:p-8 flex flex-col">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
                        <div className="space-y-1 sm:space-y-2">
                          <motion.h2 
                            className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ffc0cb] to-[#ffb6c1] bg-clip-text text-transparent cursor-pointer`}
                            whileHover={{
                              backgroundImage: "linear-gradient(to right, #ffb6c1, #ffc0cb, #ffb6c1)",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {cards[currentIndex].title}
                          </motion.h2>
                          <p className={`text-sm sm:text-base md:text-lg ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                            {cards[currentIndex].description}
                          </p>
                        </div>
                        <div className="flex gap-1 sm:gap-2">
                          <TabButton tab="overview" label="Overview" />
                          <TabButton tab="metrics" label="Metrics" />
                          <TabButton tab="features" label="Features" />
                        </div>
                      </div>

                      {/* Content based on active tab */}
                      <div className="flex-1 overflow-y-auto">
                        {activeTab === 'overview' && (
                          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                            {/* Left Column: Performance Metrics */}
                            <div className="space-y-3 sm:space-y-4">
                              {/* Key Metrics */}
                              <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-2 sm:p-4 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} relative overflow-visible`}>
                                <h3 className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-2 sm:mb-3`}>
                                  Performance Metrics
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 relative">
                                  {/* Adding a relative wrapper for each MetricCard to contain its tooltip */}
                                  <div className="relative z-[5]">
                                    <MetricCard
                                      icon={<Search className="w-5 h-5" />}
                                      label="SEO Score"
                                      value="100"
                                      trend={15}
                                      caption="Search optimization"
                                      index={0}
                                    />
                                  </div>
                                  <div className="relative z-[4]">
                                    <MetricCard
                                      icon={<Users className="w-5 h-5" />}
                                      label="Accessibility"
                                      value="94"
                                      trend={12}
                                      caption="WCAG compliance"
                                      index={1}
                                    />
                                  </div>
                                  <div className="relative z-[3]">
                                    <MetricCard
                                      icon={<Shield className="w-5 h-5" />}
                                      label="Security"
                                      value="100"
                                      trend={0}
                                      caption="Best practices"
                                      index={2}
                                    />
                                  </div>
                                  <div className="relative z-[2]">
                                    <MetricCard
                                      icon={<Zap className="w-5 h-5" />}
                                      label="Performance"
                                      value="98"
                                      trend={8}
                                      caption="Loading speed"
                                      index={3}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Client Testimonial */}
                              {cards[currentIndex].testimonial && (
                                <motion.div 
                                  className={`bg-white/5 backdrop-blur-sm rounded-lg border 
                                    ${theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20'} 
                                    relative group overflow-hidden`}
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                >
                                  {/* Gradient Background */}
                                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />
                                  
                                  <div className="relative p-4">
                                    <div className="flex items-center gap-3">
                                      {/* Author Image */}
                                      <motion.div 
                                        className="relative shrink-0"
                                        whileHover={{ scale: 1.05 }}
                                      >
                                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--megaman)]/20 group-hover:ring-[var(--megaman)]/40 transition-all">
                                          <img 
                                            src={cards[currentIndex].testimonial.image}
                                            alt={cards[currentIndex].testimonial.author}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      </motion.div>
                                      
                                      {/* Author Info */}
                                      <div className="flex-1 min-w-0">
                                        <h4 className={`font-medium text-sm truncate
                                          ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                          {cards[currentIndex].testimonial.author}
                                        </h4>
                                        <p className={`text-xs truncate
                                          ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                                          {cards[currentIndex].testimonial.company}
                                        </p>
                                      </div>
                                      
                                      {/* Quote Icon */}
                                      <div className={`shrink-0 opacity-20 group-hover:opacity-40 transition-opacity
                                        ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                      </div>
                                    </div>
                                    
                                    {/* Quote Text */}
                                    <p className={`text-sm mt-2 line-clamp-2 leading-relaxed
                                      ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                                      "{cards[currentIndex].testimonial.quote}"
                                    </p>
                                  </div>
                                </motion.div>
                              )}

                              {/* Technical Insights */}
                              <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-3 border 
                                ${theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20'} 
                                relative group overflow-hidden`}
                              >
                                {/* Gradient Background */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />
                                
                                <div className="relative space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Cpu className={`w-4 h-4 ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`} />
                                      <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        Technical Insights
                                      </h3>
                                    </div>
                                  </div>

                                  {/* Tech Categories */}
                                  <div className="grid grid-cols-3 gap-1.5">
                                    {/* Frontend */}
                                    <div className="group/tech relative rounded-md">
                                      <div className={`absolute inset-0 rounded-md opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300
                                        bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#2563EB]`} 
                                      />
                                      <div className={`relative flex flex-col gap-1 p-1.5 rounded-md text-xs h-full
                                        border ${theme === 'dark' 
                                          ? 'bg-black/20 border-white/20' 
                                          : 'bg-white/60 border-black/20'}
                                        group-hover/tech:border-[#3B82F6]/40
                                        transition-all duration-300`}
                                      >
                                        <div className="flex items-center gap-1.5">
                                          <div className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                                            ${theme === 'dark' ? 'bg-black/30' : 'bg-white/80'}`}
                                          >
                                            <Smartphone className="w-2.5 h-2.5 text-[#3B82F6]" />
                                          </div>
                                          <span className={`font-medium ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}>
                                            Frontend
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {cards[currentIndex].techStack
                                            .filter(tech => ['React', 'Next.js', 'TailwindCSS', 'TypeScript', 'Framer Motion'].includes(tech))
                                            .map((tech, i) => (
                                              <span key={i} className={`px-1 py-0.5 rounded text-[10px] 
                                                ${theme === 'dark' 
                                                  ? 'bg-black/30 text-white/80' 
                                                  : 'bg-white/80 text-black/80'}
                                                group-hover/tech:text-[#3B82F6]`}
                                              >
                                                {tech}
                                              </span>
                                            ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Backend */}
                                    <div className="group/tech relative rounded-md">
                                      <div className={`absolute inset-0 rounded-md opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300
                                        bg-gradient-to-br from-[#34D399] via-[#10B981] to-[#059669]`} 
                                      />
                                      <div className={`relative flex flex-col gap-1 p-1.5 rounded-md text-xs h-full
                                        border ${theme === 'dark' 
                                          ? 'bg-black/20 border-white/20' 
                                          : 'bg-white/60 border-black/20'}
                                        group-hover/tech:border-[#10B981]/40
                                        transition-all duration-300`}
                                      >
                                        <div className="flex items-center gap-1.5">
                                          <div className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                                            ${theme === 'dark' ? 'bg-black/30' : 'bg-white/80'}`}
                                          >
                                            <Shield className="w-2.5 h-2.5 text-[#10B981]" />
                                          </div>
                                          <span className={`font-medium ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}>
                                            Backend
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {cards[currentIndex].techStack
                                            .filter(tech => ['Node.js', 'Express', 'MongoDB', 'Socket.io'].includes(tech))
                                            .map((tech, i) => (
                                              <span key={i} className={`px-1 py-0.5 rounded text-[10px] 
                                                ${theme === 'dark' 
                                                  ? 'bg-black/30 text-white/80' 
                                                  : 'bg-white/80 text-black/80'}
                                                group-hover/tech:text-[#10B981]`}
                                              >
                                                {tech}
                                              </span>
                                            ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Infrastructure */}
                                    <div className="group/tech relative rounded-md">
                                      <div className={`absolute inset-0 rounded-md opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300
                                        bg-gradient-to-br from-[#F472B6] via-[#EC4899] to-[#DB2777]`} 
                                      />
                                      <div className={`relative flex flex-col gap-1 p-1.5 rounded-md text-xs h-full
                                        border ${theme === 'dark' 
                                          ? 'bg-black/20 border-white/20' 
                                          : 'bg-white/60 border-black/20'}
                                        group-hover/tech:border-[#EC4899]/40
                                        transition-all duration-300`}
                                      >
                                        <div className="flex items-center gap-1.5">
                                          <div className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                                            ${theme === 'dark' ? 'bg-black/30' : 'bg-white/80'}`}
                                          >
                                            <Share2 className="w-2.5 h-2.5 text-[#EC4899]" />
                                          </div>
                                          <span className={`font-medium ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}>
                                            Deployment & CMS
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {cards[currentIndex].techStack
                                            .filter(tech => ['Vercel', 'Sanity', 'Cloudinary'].includes(tech))
                                            .map((tech, i) => (
                                              <span key={i} className={`px-1 py-0.5 rounded text-[10px] 
                                                ${theme === 'dark' 
                                                  ? 'bg-black/30 text-white/80' 
                                                  : 'bg-white/80 text-black/80'}
                                                group-hover/tech:text-[#EC4899]`}
                                              >
                                                {tech}
                                              </span>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Column: Preview & Description */}
                            <div className="space-y-3 sm:space-y-4">
                              {/* Site Preview with Timeline */}
                              <div className="flex gap-2 sm:gap-3">
                                {/* Site Preview */}
                                <div className={`flex-1 relative w-full h-fit rounded-lg overflow-hidden border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} group hover:border-[var(--megaman)] transition-all duration-500`}>
                                  {/* Browser Frame */}
                                  <div className={`h-6 sm:h-8 md:h-10 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'} flex items-center px-3 md:px-4 space-x-2 md:space-x-3`}>
                                    <div className="flex space-x-1.5 md:space-x-2">
                                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 transition-transform group-hover:scale-110"></div>
                                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500 transition-transform group-hover:scale-110"></div>
                                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 transition-transform group-hover:scale-110"></div>
                                    </div>
                                  </div>
                                  <a 
                                    href={cards[currentIndex].url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block cursor-pointer"
                                  >
                                    <div className="relative w-full">
                                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10" />
                                      <img 
                                        src={cards[currentIndex].previewImage}
                                        alt={cards[currentIndex].title}
                                        className="w-full h-full object-cover
                                          filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 
                                          transform group-hover:scale-105 transition-all duration-700 ease-out"
                                      />
                                    </div>
                                  </a>
                                </div>

                                {/* Compact Timeline */}
                                <div className={`hidden lg:flex flex-col w-[180px] bg-white/5 backdrop-blur-sm rounded-lg border 
                                  ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} 
                                  relative group overflow-hidden`}
                                >
                                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />
                                  
                                  <div className="relative p-3">
                                    <div className="flex items-center gap-1.5 mb-3">
                                      <Clock className="w-3.5 h-3.5 text-white/70" />
                                      <span className="text-sm text-white/90">Timeline</span>
                                    </div>

                                    <div className="relative space-y-3">
                                      {/* Vertical line */}
                                      <div className="absolute left-[5px] top-[10px] w-[1px] h-[calc(100%-20px)] bg-white/10" />
                                      
                                      {[
                                        { phase: "Discovery", duration: "1-2w" },
                                        { phase: "Design", duration: "2w" },
                                        { phase: "Development", duration: "4w" },
                                        { phase: "Testing", duration: "1w" },
                                        { phase: "Launch", duration: "1w" }
                                      ].map((item, index) => (
                                        <div 
                                          key={index} 
                                          className="relative flex items-center group/item cursor-pointer"
                                        >
                                          <div 
                                            className="absolute left-0 w-[11px] h-[11px] rounded-full border-2 
                                              transition-all duration-500 group-hover/item:scale-125
                                              before:absolute before:inset-0 before:rounded-full 
                                              before:opacity-0 group-hover/item:before:opacity-100
                                              before:transition-opacity before:duration-500
                                              after:absolute after:inset-0 after:rounded-full after:blur-[2px]
                                              after:transition-opacity after:duration-500
                                              after:opacity-0 group-hover/item:after:opacity-50"
                                            style={{
                                              borderColor: 'rgb(244 114 182)',
                                              backgroundImage: 'linear-gradient(to right, rgba(244, 114, 182, 0.3), rgba(236, 72, 153, 0.3))',
                                              '--dot-hover-gradient': 'linear-gradient(to right, rgb(244 114 182), rgb(236 72 153))',
                                              '--dot-glow': 'rgb(244 114 182)',
                                            } as React.CSSProperties}
                                          >
                                            <div className="absolute inset-0 rounded-full transition-opacity duration-500 opacity-0 group-hover/item:opacity-100"
                                                 style={{
                                                   backgroundImage: 'var(--dot-hover-gradient)',
                                                 }}
                                            />
                                            <div className="absolute inset-0 rounded-full transition-opacity duration-500 opacity-0 group-hover/item:opacity-30 blur-sm"
                                                 style={{
                                                   backgroundColor: 'var(--dot-glow)',
                                                 }}
                                            />
                                          </div>
                                          <div className="flex items-center justify-between w-full pl-6 py-1 
                                            transition-all duration-300 group-hover/item:translate-x-1">
                                            <span 
                                              className={`text-xs font-medium transition-all duration-300 bg-clip-text text-transparent`}
                                              style={{
                                                backgroundImage: theme === 'dark' 
                                                  ? 'linear-gradient(to right, #ffffff, #d1d5db, #ffffff)'
                                                  : 'linear-gradient(to right, #1f2937, #4b5563, #1f2937)'
                                              }}
                                            >
                                              {item.phase}
                                            </span>
                                            <span 
                                              className={`text-[10px] transition-all duration-300`}
                                              style={{
                                                color: theme === 'dark' ? '#d1d5db' : '#4b5563',
                                                opacity: 0.8
                                              }}
                                            >
                                              {item.duration}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Project Info */}
                              <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-3 border 
                                ${theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20'} 
                                relative group overflow-hidden`}
                              >
                                {/* Gradient Background */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br from-[var(--megaman)] via-[var(--frozen-turquoise)] to-[var(--heart-of-ice)]" />
                                
                                <div className="relative space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Info className={`w-4 h-4 ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`} />
                                      <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        Project Highlights
                                      </h3>
                                    </div>
                                    <div className={`text-xs px-2 py-0.5 rounded-full bg-white/5 border
                                      ${theme === 'dark' 
                                        ? 'border-white/20 text-white/90 bg-white/10' 
                                        : 'border-black/20 text-black/90 bg-black/5'
                                      }`}
                                    >
                                      {cards[currentIndex].techStack.length} Technologies
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-1.5">
                                    {cards[currentIndex].features.slice(0, 4).map((feature, index) => (
                                      <div
                                        key={index}
                                        className="group/item relative rounded-md"
                                      >
                                        {/* Golden Gradient Background - Moved inside to respect border radius */}
                                        <div className={`absolute inset-0 rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300
                                          bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#F0B90B]`} 
                                        />
                                        
                                        {/* Content Container */}
                                        <div className={`relative flex items-center gap-1.5 p-1.5 rounded-md text-xs
                                          border ${theme === 'dark' 
                                            ? 'bg-black/20 border-white/20' 
                                            : 'bg-white/60 border-black/20'}
                                          group-hover/item:border-[#FFD700]/40
                                          transition-all duration-300`}
                                        >
                                          {/* Icon Container */}
                                          <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                                            ${theme === 'dark' 
                                              ? 'bg-black/30 group-hover/item:bg-black/40' 
                                              : 'bg-white/80 group-hover/item:bg-white'}`}
                                          >
                                            <Trophy className="w-3 h-3 text-[#FFD700] opacity-80 group-hover/item:opacity-100" />
                                          </div>
                                          
                                          {/* Text Container */}
                                          <span className={`truncate font-medium
                                            ${theme === 'dark' 
                                              ? 'text-white/90 group-hover/item:text-white' 
                                              : 'text-black/90 group-hover/item:text-black'}
                                            group-hover/item:text-shadow-sm`}
                                          >
                                            {feature}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="flex items-center gap-1.5 pt-0.5">
                                    {cards[currentIndex].techStack.slice(0, 5).map((tech, index) => (
                                      <motion.div
                                        key={index}
                                        className={`px-1.5 py-0.5 text-[10px] rounded border
                                          ${theme === 'dark' 
                                            ? 'bg-black/20 border-white/20 text-white/90 hover:bg-black/30' 
                                            : 'bg-white/60 border-black/20 text-black/90 hover:bg-white/80'}
                                          hover:border-[#FFD700]/40 hover:text-[#FFD700] cursor-pointer
                                          transition-all duration-300`}
                                        whileHover={{ scale: 1.05 }}
                                      >
                                        {tech}
                                      </motion.div>
                                    ))}
                                    {cards[currentIndex].techStack.length > 5 && (
                                      <span className={`text-[10px] font-medium
                                        ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}
                                      >
                                        +{cards[currentIndex].techStack.length - 5} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'metrics' && (
                          <div className="h-full space-y-4 md:space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                              <MetricCard
                                icon={<Zap className="w-4 h-4 md:w-5 md:h-5" />}
                                label="Speed"
                                value="0.8s"
                                trend={65}
                                caption="Load time"
                                index={0}
                              />
                              <MetricCard
                                icon={<Gauge className="w-4 h-4 md:w-5 md:h-5" />}
                                label="Score"
                                value="98"
                                trend={12}
                                caption="PageSpeed"
                                index={1}
                              />
                              <MetricCard
                                icon={<Smartphone className="w-4 h-4 md:w-5 md:h-5" />}
                                label="Mobile"
                                value="99"
                                trend={8}
                                caption="Optimization"
                                index={2}
                              />
                              <MetricCard
                                icon={<Search className="w-4 h-4 md:w-5 md:h-5" />}
                                label="SEO"
                                value="96"
                                trend={15}
                                caption="Search Engine Optimization Score"
                                index={3}
                              />
                              <MetricCard
                                icon={<Users className="w-4 h-4 md:w-5 md:h-5" />}
                                label="Reach"
                                value="15.2K"
                                trend={25}
                                caption="Monthly Active Users"
                                index={4}
                              />
                              <MetricCard
                                icon={<Target className="w-4 h-4 md:w-5 md:h-5" />}
                                label="Core"
                                value="100"
                                trend={5}
                                caption="Core Web Vitals Score"
                                index={5}
                              />
                              <MetricCard
                                icon={<Smartphone className="w-4 h-4 md:w-5 md:h-5" />}
                                label="Mobile"
                                value="99"
                                trend={15}
                                caption="Mobile Responsiveness Score"
                                index={6}
                              />
                              <MetricCard
                                icon={<Share2 className="w-4 h-4 md:w-5 md:h-5" />}
                                label="Social"
                                value="8.9K"
                                trend={32}
                                caption="Social Media Shares"
                                index={7}
                              />
                            </div>

                            <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} h-[300px]`}>
                              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>
                                Performance Metrics
                              </h3>
                              <PlaceholderChart />
                            </div>
                          </div>
                        )}

                        {activeTab === 'features' && (
                          <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            <div className="space-y-4">
                              <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                                <h3 className={`text-lg md:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-3 md:mb-4`}>Key Features</h3>
                                <ul className="space-y-4">
                                  {cards[currentIndex].features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-white/90">
                                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[var(--frozen-turquoise)]" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-4 md:p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                                <h3 className={`text-lg md:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-3 md:mb-4`}>Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                  {cards[currentIndex].techStack.map((tech) => (
                                    <span 
                                      key={tech} 
                                      className={`px-2 py-1 md:px-3 md:py-1.5 text-sm rounded-full ${theme === 'dark' ? 'bg-white/20 text-white' : 'bg-black/10 text-black'}`}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="w-full h-[200px] mb-4">
                              <div className="relative p-4 bg-black/40 backdrop-blur-md rounded-lg">
                                <div className="flex items-center gap-2 mb-4">
                                  <Clock className="w-4 h-4 text-white/70" />
                                  <span className="text-sm text-white/90 font-medium">Timeline</span>
                                </div>
                                
                                <div className="relative flex flex-col gap-3">
                                  {[
                                    { phase: 'Discovery', duration: '1-2w' },
                                    { phase: 'Design', duration: '2w' },
                                    { phase: 'Development', duration: '4w' },
                                    { phase: 'Testing', duration: '1w' },
                                    { phase: 'Launch', duration: '1w' }
                                  ].map(({ phase, duration }, i) => (
                                    <div key={phase} className="flex items-center gap-3">
                                      <div className="relative">
                                        <div className="w-2 h-2 rounded-full bg-white/20" />
                                        {i < 4 && (
                                          <div className="absolute top-2 left-1/2 w-[1px] h-[calc(100%+8px)] -translate-x-1/2 bg-white/10" />
                                        )}
                                      </div>
                                      <div className="flex-1 flex items-center justify-between">
                                        <span className="text-sm text-white/70">{phase}</span>
                                        <span className="text-xs text-white/40">{duration}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className={`bg-white/10 ${theme === 'dark' ? 'backdrop-blur-md' : ''} rounded-lg p-6 border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
                              <h3 className={`text-lg md:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-3 md:mb-4`}>Implementation Timeline</h3>
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
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 'next' : 'prev' as "prev" | "next");
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
      </div>
    </TooltipProvider>
  );
}