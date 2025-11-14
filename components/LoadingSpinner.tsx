import React from 'react';
import { motion } from 'framer-motion';

const logoImageSet = {
    webp: "", // WebP is now provided by the API, so static version is removed.
    original: "https://i.ibb.co/fYCg9Lh8/3.png"
};

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
      <motion.picture
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
      >
        {logoImageSet.webp && <source srcSet={logoImageSet.webp} type="image/webp" />}
        <img
            src={logoImageSet.original}
            alt="Banaya Horizon Logo - Loading"
            className="h-[100px] w-auto"
            aria-label="Loading..."
        />
      </motion.picture>
    </motion.div>
  );
};

export default LoadingSpinner;