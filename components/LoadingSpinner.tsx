import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div
      className="h-screen w-full flex items-center justify-center bg-[#F9F7F5] fixed inset-0 z-[100]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      aria-live="polite"
      aria-busy="true"
    >
      <img
        src="https://i.ibb.co/fYCg9Lh8/3.png"
        alt="Banaya Horizon Logo - Loading"
        className="h-[100px] w-auto"
        aria-label="Loading..."
      />
    </motion.div>
  );
};

export default LoadingSpinner;
