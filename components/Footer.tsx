import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  logoUrl?: string;
}

const Footer: React.FC<FooterProps> = ({ logoUrl }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ background: 'linear-gradient(to right, #3B1E1E, #4A2C2A)' }}
    >
      <div className="container mx-auto px-6 py-6">
        <div
          className="flex justify-center items-center gap-2 text-center text-sm"
          style={{ color: '#E9D5C0' }}
        >
          <span>©</span>
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="شعار بنايا هورايزون" 
              className="h-7 cursor-pointer filter brightness-0 invert transition-all duration-300 ease-in-out hover:scale-105 hover:drop-shadow-[0_0_8px_#9A6641]"
            />
          ) : (
            <span>بنايا هورايزون</span>
          )}
          <span>| Banaya Horizon — All Rights Reserved.</span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;