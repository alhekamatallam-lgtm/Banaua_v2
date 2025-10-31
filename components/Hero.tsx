import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  heroData?: {
    link: string;
    description: string;
  };
}

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

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
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
        <div className="absolute inset-0 bg-black/50"></div>
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 text-center px-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeInOut' }}
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
        className="absolute bottom-10 z-20 cursor-pointer"
        onClick={scrollToProjects}
        title="انتقل إلى المشاريع"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;