
import React from 'react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            مشاريعنا
          </h2>
          <div className="w-24 h-1 bg-[#642C32] mx-auto mb-8"></div>
          <p className="text-lg text-gray-500">
            قريباً... سيتم عرض مجموعة من أبرز مشاريعنا التي نفخر بها.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
