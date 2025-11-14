import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ImageSet } from '../App';

// --- SVG Icons ---
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const TiktokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.66 2.83 2.85 2.85 0 0 1-2.94-2.85 2.86 2.86 0 0 1 2.84-2.88c.1 0 .19.01.28.02V10.1a6.3 6.3 0 0 0-3.37.95 6.44 6.44 0 0 0-3.3 5.8 6.49 6.49 0 0 0 6.51 6.49 6.47 6.47 0 0 0 6.36-5.62V6.69h3.38V2h-3.38v4.69z"></path>
    </svg>
);


const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
    </svg>
);

const SnapchatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20.7 21.6" fill="currentColor">
        <path d="M12.7,1.3c-2.4-0.8-5.2-0.4-7.4,1.1C3,3.9,1.6,6.2,1.4,8.8c-0.1,2.1,0.5,4.2,1.8,5.9c0.8,1.1,1.4,2.3,1.4,3.7v2.1c0,0.5,0.4,1,1,1h7.5c0.5,0,1-0.4,1-1v-2.1c0-1.4,0.6-2.6,1.4-3.7c1.3-1.7,1.9-3.8,1.8-5.9C19.1,6.2,17.7,3.9,15.4,2.4C14.6,1.8,13.6,1.4,12.7,1.3z" />
    </svg>
);

// Helper to format social media URLs correctly
const formatSocialUrl = (baseUrl: string, value?: string): string | undefined => {
    if (!value || value.trim() === '') return undefined;
    
    const cleanValue = value.trim().replace(/^@/, '');

    if (cleanValue.startsWith('http://') || cleanValue.startsWith('https://')) {
        return cleanValue;
    }

    return `${baseUrl}${cleanValue}`;
};

// Interfaces
interface ContactData {
    instagram?: string;
    tiktok?: string;
    x?: string;
    snapchat?: string;
}

interface HeaderProps {
    logoSet?: ImageSet;
    contactData?: ContactData;
}

const Header: React.FC<HeaderProps> = ({ logoSet, contactData }) => {
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

  const socialLinks = contactData ? [
    { icon: <InstagramIcon />, href: formatSocialUrl('https://www.instagram.com/', contactData.instagram), name: "Instagram" },
    { icon: <TiktokIcon />, href: "https://www.tiktok.com/@banaya_ksa", name: "TikTok" },
    { icon: <XIcon />, href: formatSocialUrl('https://x.com/', contactData.x), name: "X" },
    { icon: <SnapchatIcon />, href: "https://www.snapchat.com/@banaya_ksa", name: "Snapchat" },
  ].filter(link => link.href) : [];


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <a href="https://banaya.sa/" target="_blank" rel="noopener noreferrer" aria-label="Visit Banaya Horizon Website">
            {logoSet?.original ? (
                <picture>
                  {logoSet.webp && <source srcSet={logoSet.webp} type="image/webp" />}
                  <img 
                    src={logoSet.original} 
                    alt="Banaya Horizon Logo" 
                    className={`h-10 transition-all duration-500 ${!isScrolled ? 'brightness-0 invert' : ''}`} 
                  />
                </picture>
            ) : (
                <h1 className={`text-2xl font-bold tracking-wider transition-colors duration-300 ${
                    isScrolled ? 'text-[#9A6641]' : 'text-white'
                }`}>
                  بنايا الأفق
                </h1>
            )}
          </a>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center gap-x-3 md:gap-x-6">
            {/* Social Icons */}
            {socialLinks.length > 0 && (
                 <div className="flex items-center gap-x-2 md:gap-x-4">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Follow us on ${social.name}`}
                            className={`transition-all duration-300 ease-in-out hover:scale-110 ${
                                isScrolled ? 'text-[#9A6641] hover:text-[#642C32]' : 'text-white hover:opacity-80'
                            }`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            )}
           
            {/* Action Button */}
            <button
              onClick={scrollToContact}
              className="whitespace-nowrap rounded-2xl bg-[#642C32] px-3 py-2 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#9A6641] md:px-6 md:py-3 md:text-base"
            >
              ابدأ مشروعك الآن
            </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;