'use client';
import { motion } from 'framer-motion';
import AnimatedToucan from './toucan-poly';
import { features } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] mt-20 overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,226,132,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(255,255,255,0.1),transparent)]"
        />
      </div>
      
      {/* Main Hero Content */}
      <div className="relative w-full max-w-[1920px] mx-auto h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center px-6">
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-end justify-center lg:w-[70%] z-10 lg:h-full lg:py-[15vh]">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-center lg:text-right lg:max-w-[85%] xl:max-w-[80%]"
            >
              <div className="relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -top-2 left-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"
                />
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-br from-primary via-sky-300 to-primary/80 
                  text-transparent bg-clip-text leading-[1.1] tracking-tight pb-1 mt-2">
                  Crafted with Purpose.<br/>
                  <span className="inline-block mt-2">Built for Growth.</span>
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"
                />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 max-w-2xl"
              >
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-light tracking-wide">
                  Deep technical expertise meets creative vision. We craft sophisticated digital solutions.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center lg:items-start justify-center lg:w-[30%] lg:h-full lg:py-[15vh]">
            <div className="flex flex-col items-center relative">
              {/* Toucan */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] 
                         lg:w-[min(30vw,500px)] lg:h-[min(30vw,500px)]
                         transform-gpu pointer-events-none -mb-32"
              >
                <AnimatedToucan />
              </motion.div>

              {/* CTA Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-center gap-6"
              >
                <button className="group relative px-8 py-3 overflow-hidden">
                  <div className="absolute inset-0 w-3 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full" />
                  <span className="relative text-lg font-medium text-primary group-hover:text-primary-foreground">
                    Start Your Journey
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              className="group p-8 rounded-2xl bg-background/40 backdrop-blur-sm
                border border-white/5
                hover:bg-background/60 transition-all duration-500
                hover:shadow-[0_0_25px_-5px_rgba(0,0,0,0.1),0_0_10px_-5px_rgba(0,0,0,0.04)]
                relative cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="font-medium text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
