'use client';
import { useTheme } from 'next-themes';
import AnimatedToucan from './toucan-poly';

interface Feature {
  title: string;
  description: string;
  cta?: string;
}

const features: Feature[] = [
  {
    title: "Technical Excellence",
    description: "Bringing enterprise-grade engineering expertise to create solutions that scale with your ambitions."
  },
  {
    title: "Creative Vision",
    description: "Thoughtfully crafted digital experiences that resonate with your audience and elevate your brand."
  },
  {
    title: "Strategic Growth",
    description: "Data-driven strategies and solutions that consistently deliver meaningful results for your business."
  },
  {
    title: "Proven Expertise",
    description: "Years of experience solving complex technical challenges, now focused on empowering local businesses."
  }
];

export default function Hero() {
  const { resolvedTheme: theme } = useTheme();

  return (
    <section className="relative w-full mt-12 sm:mt-24 overflow-hidden">
      {/* Background with grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Main Hero Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
        {/* Floating Toucan Container */}
        <div className="absolute top-12 lg:top-0 left-1/2 -translate-x-1/2 lg:left-auto lg:right-[15%] lg:-translate-x-0
                     w-screen lg:w-[600px] h-screen lg:h-[600px] xl:w-[700px] xl:h-[700px] 2xl:w-[800px] 2xl:h-[800px]
                     transform-gpu pointer-events-none
                     opacity-15 lg:opacity-90 transition-opacity duration-300
                     flex items-start lg:items-start justify-center">
          <div className="w-[90vw] h-[90vw] sm:w-[70vw] sm:h-[70vw] lg:w-full lg:h-full">
            <AnimatedToucan />
          </div>
        </div>

        {/* Content Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-8 items-start min-h-[calc(100vh-80px)]">
          {/* Main Content */}
          <div className="space-y-8 pt-4 sm:pt-8 lg:pt-12">
            <div className="space-y-6 relative backdrop-blur-sm lg:backdrop-blur-none bg-background/50 lg:bg-transparent rounded-2xl lg:rounded-none p-6 lg:p-0">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-sky-300 text-transparent bg-clip-text leading-[1.1] pb-1 relative">
                Crafted with Purpose.<br/>
                <span className="inline-block mt-1">Built for Growth.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground relative max-w-xl">
                Deep technical expertise meets genuine creative vision. We build sophisticated digital solutions that help ambitious local businesses thrive in the modern landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-lg 
                  font-medium transition-colors cursor-pointer">
                  Start Your Journey
                </button>
              </div>
            </div>

            {/* Features Grid - Mobile Only */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative lg:hidden">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-xl bg-background/80 backdrop-blur-sm
                    hover:bg-background/90 transition-colors duration-200
                    shadow-sm hover:shadow-md
                    relative z-10 cursor-pointer"
                >
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid - Desktop Only */}
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-1 gap-4 pt-24">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-xl bg-background/80 backdrop-blur-sm
                    hover:bg-background/90 transition-colors duration-200
                    shadow-sm hover:shadow-md
                    relative z-10 cursor-pointer"
                >
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Transition */}
      <div className="
        absolute bottom-0 left-0 right-0 h-32
        bg-gradient-to-b from-transparent to-background/95
        pointer-events-none
      "/>
    </section>
  );
}
