
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            عن <span className="text-[#9A6641]">بنايا الأفق</span>
          </h2>
          <div className="w-24 h-1 bg-[#642C32] mx-auto mb-8"></div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
            بنايا الأفق هي شركة سعودية متخصصة في تقديم حلول متكاملة في مجالات التصميم المعماري والداخلي، وتنفيذ المشاريع بأعلى معايير الجودة والإتقان. نسعى لتحقيق تطلعات عملائنا من خلال إبداعات تجمع بين الأصالة والمعاصرة.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
