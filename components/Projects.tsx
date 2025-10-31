import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';

interface Slide {
  link: string;
  description: string;
}

interface ProjectsProps {
  slides: Slide[];
}

const variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    opacity: 1,
    x: '0%',
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? '100%' : '-100%',
  }),
};

const Projects: React.FC<ProjectsProps> = ({ slides }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, slides.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setTimeout(() => paginate(1), 4000);
    return () => clearTimeout(timer);
  }, [page, slides.length]);

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">أعمالنا</h2>
          <div className="w-24 h-1 bg-[#642C32] mx-auto mb-8"></div>
        </motion.div>

        <div className="relative h-[350px] md:h-[600px] w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-2xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              className="absolute h-full w-full"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
              }}
            >
              <img src={slides[imageIndex].link} alt={slides[imageIndex].description} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <h3 className="text-white text-xl md:text-3xl font-bold text-right tracking-wide">{slides[imageIndex].description}</h3>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
             <button onClick={() => paginate(-1)} className="bg-white/50 hover:bg-white text-[#1A1A1A] p-3 rounded-full transition shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
             </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <button onClick={() => paginate(1)} className="bg-white/50 hover:bg-white text-[#1A1A1A] p-3 rounded-full transition shadow-lg">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center space-x-reverse space-x-3 mt-6">
            {slides.map((_, i) => (
                <button
                    key={i}
                    onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === imageIndex ? 'bg-[#9A6641]' : 'bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`Go to slide ${i + 1}`}
                ></button>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
