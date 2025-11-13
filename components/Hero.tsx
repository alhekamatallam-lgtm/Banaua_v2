import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  heroData?: {
    link: string;
    description: string;
  };
}

// New mouse icon component
const MouseScrollIcon = () => (
    <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="37" rx="10.5" stroke="white" strokeWidth="3"/>
        <motion.circle 
            cx="12" 
            cy="12" 
            r="3" 
            fill="white"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
    </svg>
);


const Hero: React.FC<HeroProps> = ({ heroData }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  // Optimized default image
  const defaultImage = "https://images.unsplash.com/photo-1542337854-56de6c58fad6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=75";
  const defaultDescription = "نصنع البهجة للمكان";

  const scrollToWork = () => {
    // The target ID was updated from 'projects' to 'our-work' as the sections were merged.
    document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center text-white"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: backgroundY,
        }}
      >
        <img
          src={heroData?.link || defaultImage}
          alt="Modern Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/15"></div>
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 text-center px-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeInOut' }}
          className="text-white text-4xl md:text-6xl lg:text-7xl"
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
          {heroData?.description || defaultDescription}
        </motion.h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 z-20"
      >
         <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          onClick={scrollToWork}
          className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer ring-1 ring-white/20 hover:bg-white/20 transition-all duration-300"
          title="تصفح أعمالنا"
        >
          <MouseScrollIcon />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;