'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedToucan from './toucan-poly';
import { features } from '@/lib/constants';

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] mt-20 overflow-hidden">
      {/* Optimized Background with reduced complexity */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,226,132,0.08),rgba(255,255,255,0))]" />
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(255,255,255,0.1),transparent)]"
        />
      </div>
      
      {/* Main Hero Content with Parallax */}
      <motion.div 
        style={{ scale }}
        className="relative w-full max-w-[1920px] mx-auto h-[calc(100vh-5rem)] flex items-center justify-center"
      >
        <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center px-6">
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-end justify-center lg:w-[60%] z-10 lg:h-full lg:py-[15vh]">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center lg:text-right lg:max-w-[85%] xl:max-w-[80%]"
            >
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold 
                  bg-gradient-to-br from-primary via-sky-300 to-primary/80 
                  text-transparent bg-clip-text leading-[1.1] tracking-tight">
                  Crafted with Purpose.<br/>
                  <span className="inline-block mt-2">Built for Growth.</span>
                </h1>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8 text-lg sm:text-xl lg:text-2xl text-muted-foreground font-light tracking-wide"
              >
                Deep technical expertise meets creative vision. We craft sophisticated digital solutions.
              </motion.p>
            </motion.div>
          </div>

          {/* Right Content with Improved Toucan Container */}
          <div className="flex flex-col items-center lg:items-start justify-center lg:w-[40%] lg:h-full lg:py-[15vh]">
            <div className="flex flex-col items-center relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] 
                         lg:w-[min(35vw,500px)] lg:h-[min(35vw,500px)]
                         transform-gpu -mb-32"
              >
                <AnimatedToucan />
              </motion.div>

              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="group relative px-8 py-3 overflow-hidden mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 w-3 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                <span className="relative text-lg font-medium text-primary group-hover:text-primary-foreground">
                  Start Your Journey
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Optimized Features Grid */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-8 rounded-2xl bg-background/40 backdrop-blur-sm
                border border-white/5 transition-all duration-300
                hover:shadow-[0_0_25px_-5px_rgba(0,0,0,0.1),0_0_10px_-5px_rgba(0,0,0,0.04)]
                relative cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="font-medium text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}