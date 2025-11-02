import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
    logoUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ logoUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
            {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt="Banaya Horizon Logo" 
                  className={`h-10 transition-all duration-500 ${!isScrolled ? 'brightness-0 invert' : ''}`} 
                />
            ) : (
                <h1 className={`text-2xl font-bold tracking-wider transition-colors duration-300 ${
                    isScrolled ? 'text-[#9A6641]' : 'text-white'
                }`}>
                  بنايا الأفق
                </h1>
            )}
        </div>
        
        {/* Action Button */}
        <button
          onClick={scrollToContact}
          className="bg-[#642C32] text-white font-bold py-3 px-6 rounded-2xl hover:bg-[#9A6641] transition-colors duration-300"
        >
          ابدأ مشروعك الآن
        </button>
      </div>
    </motion.header>
  );
};

export default Header;