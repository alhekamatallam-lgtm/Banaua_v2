
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#642C32] text-white">
      <div className="container mx-auto px-6 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} بنايا الأفق. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};

export default Footer;
