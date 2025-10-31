import React from 'react';

interface FooterProps {
  logoUrl?: string;
}

const Footer: React.FC<FooterProps> = ({ logoUrl }) => {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-center items-center gap-2 text-center text-sm text-gray-400">
          <span>©</span>
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="شعار بنايا هورايزون" 
              className="h-5"
            />
          ) : (
            <span>بنايا هورايزون</span>
          )}
          <span>| Banaya Horizon — All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;