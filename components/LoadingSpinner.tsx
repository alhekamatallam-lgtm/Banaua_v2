import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F9F7F5]">
      <motion.div
        className="w-16 h-16 border-4 border-[#642C32] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: 'linear',
          repeat: Infinity,
        }}
        aria-label="Loading..."
      />
    </div>
  );
};

export default LoadingSpinner;
