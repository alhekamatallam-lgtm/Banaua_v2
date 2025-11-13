import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  aboutData: {
    about_title: string;
    about_content: string;
  };
  logoUrl?: string;
}

const About: React.FC<AboutProps> = ({ aboutData, logoUrl }) => {
  
  // Helper function for content paragraphs
  const renderContentWithLogo = (text: string) => {
    if (!text || !logoUrl || !text.includes('بنايا')) {
      return text;
    }
    
    const parts = text.split('بنايا');
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <img 
                src={logoUrl} 
                alt="شعار بنايا" 
                className="inline-block h-6 w-auto mx-1 align-middle -mt-1" 
              />
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  // Helper function for the professionally styled title
  const renderProfessionalTitle = () => {
    const title = aboutData?.about_title || 'عن بنايا هورايزون';
    if (!logoUrl || !title.includes('بنايا')) {
      return <span>{title}</span>;
    }
    
    const parts = title.split('بنايا');
    
    return (
      <div className="flex justify-end items-center gap-x-3">
        <span>{parts[0]}</span>
        <img 
          src={logoUrl} 
          alt="شعار بنايا" 
          className="h-10 md:h-12 w-auto" // Height matched to text-4xl/5xl for balance
        />
        <span>{parts[1]}</span>
      </div>
    );
  };

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      viewport={{ once: true }}
      className="pt-20 md:pt-32 bg-[#F9F7F5] overflow-hidden"
    >
      <div className="container mx-auto px-6 text-right">
        <div className="max-w-4xl ml-auto">
             <h2 className="section-intro-heading text-4xl md:text-5xl">
              {renderProfessionalTitle()}
            </h2>
            <p className="readable-text ml-auto text-xl font-medium leading-relaxed text-justify">
              {renderContentWithLogo(aboutData?.about_content || '...جاري تحميل المحتوى')}
            </p>
        </div>
      </div>
    </motion.section>
  );
};

export default About;