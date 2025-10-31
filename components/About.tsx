import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  aboutData: {
    'عن بنايا هورايزون': string;
  };
}

const About: React.FC<AboutProps> = ({ aboutData }) => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      viewport={{ once: true }}
      className="py-20 md:py-32 bg-[#F9F7F5] overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
             <h2 className="section-intro-heading">
              من نحن
            </h2>
            <p className="readable-text mx-auto">
              {aboutData['عن بنايا هورايزون']}
            </p>
        </div>
      </div>
    </motion.section>
  );
};

export default About;