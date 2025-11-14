import React from 'react';
import { motion } from 'framer-motion';
import type { ImageSet } from '../App';

interface AboutProps {
  aboutData: {
    about_title: string;
    about_content: string;
  };
  logoSet?: ImageSet;
}

const About: React.FC<AboutProps> = ({ aboutData, logoSet }) => {
  
  // Helper function for content paragraphs
  const renderContentWithLogo = (text: string) => {
    if (!text || !logoSet?.original || !text.includes('بنايا')) {
      return text;
    }
    
    const parts = text.split('بنايا');
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <picture className="inline-block h-6 w-auto mx-1 align-middle -mt-1">
                  {logoSet.webp && <source srcSet={logoSet.webp} type="image/webp" />}
                  <img src={logoSet.original} alt="شعار بنايا" className="h-full w-full object-contain" />
              </picture>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  // Helper function for the professionally styled title
  const renderProfessionalTitle = () => {
    const title = aboutData?.about_title || 'عن بنايا هورايزون';
    if (!logoSet?.original || !title.includes('بنايا')) {
      return <span>{title}</span>;
    }
    
    const parts = title.split('بنايا');
    
    return (
      <div className="flex justify-center items-center gap-x-3">
        <span>{parts[0]}</span>
        <picture className="h-10 md:h-12 w-auto">
          {logoSet.webp && <source srcSet={logoSet.webp} type="image/webp" />}
          <img src={logoSet.original} alt="شعار بنايا" className="h-full w-full object-contain" />
        </picture>
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
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
             <h2 className="section-intro-heading text-4xl md:text-5xl">
              {renderProfessionalTitle()}
            </h2>
            <p className="readable-text mx-auto text-xl font-medium leading-relaxed text-center">
              {renderContentWithLogo(aboutData?.about_content || '...جاري تحميل المحتوى')}
            </p>
        </div>
      </div>
    </motion.section>
  );
};

export default About;