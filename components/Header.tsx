
import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const navItems = [
    { name: 'الرئيسية', id: 'hero' },
    { name: 'عن الشركة', id: 'about' },
    { name: 'رؤيتنا ورسالتنا', id: 'vision-mission' },
    { name: 'مشاريعنا', id: 'projects' },
    { name: 'تواصل معنا', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#F9F7F5]/80 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#9A6641] tracking-wider">بنايا الأفق</h1>
        <nav className="hidden md:flex space-x-reverse space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[#1A1A1A] hover:text-[#9A6641] transition-colors duration-300 font-medium"
            >
              {item.name}
            </button>
          ))}
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button can be added here */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
