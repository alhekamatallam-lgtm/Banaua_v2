import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  aboutData: {
    'عن بنايا هورايزون': string;
    'رؤيتنا': string;
    'رسالتنا': string;
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
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Vision & Mission Cards */}
          <div className="space-y-8 order-2 md:order-1">
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0px 15px 30px -10px rgba(0,0,0,0.1)' }}
              className="bg-white p-8 rounded-lg shadow-lg border border-gray-100"
            >
              <h4 className="mb-4">رؤيتنا</h4>
              <p>
                {aboutData['رؤيتنا']}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0px 15px 30px -10px rgba(0,0,0,0.1)' }}
              className="bg-white p-8 rounded-lg shadow-lg border border-gray-100"
            >
              <h4 className="mb-4">رسالتنا</h4>
              <p>
                {aboutData['رسالتنا']}
              </p>
            </motion.div>
          </div>
          
          {/* About Company Text */}
          <div className="order-1 md:order-2 text-right">
            <h2 className="section-intro-heading">
              من نحن
            </h2>
            <p className="readable-text">
              {aboutData['عن بنايا هورايزون']}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;