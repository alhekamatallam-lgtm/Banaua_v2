import React from 'react';
import { motion } from 'framer-motion';

interface VisionMissionProps {
  aboutData: {
    vision_title: string;
    vision_content: string;
    mission_title: string;
    mission_content: string;
  };
  logoUrl?: string;
}

const VisionMission: React.FC<VisionMissionProps> = ({ aboutData, logoUrl }) => {
  
  // Helper function to replace "بنايا" with the logo
  const renderTextWithLogo = (text: string) => {
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
                className="inline-block h-7 w-auto mx-1 align-middle -mt-1" 
              />
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  const cardVariants = {
    offscreen: { opacity: 0, y: 40 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.section
      id="vision-mission"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      className="pb-20 md:pb-32 bg-[#F9F7F5] relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-12 items-stretch max-w-6xl mx-auto">
          {/* Vision Card (Right) */}
          <motion.div variants={cardVariants} className="bg-white/80 backdrop-blur-sm p-8 lg:p-10 rounded-2xl shadow-lg border border-white/20 text-right">
            <h3 className="text-3xl font-bold text-[#642C32] mb-4">
              {aboutData.vision_title || 'رؤيتنا'}
            </h3>
            <p className="text-xl leading-relaxed text-justify">
              {renderTextWithLogo(aboutData.vision_content || '...جاري تحميل المحتوى')}
            </p>
          </motion.div>
          
          {/* Divider */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/5 w-0.5 bg-[#9A6641]/30 rounded-full"></div>

          {/* Mission Card (Left) */}
          <motion.div variants={cardVariants} className="bg-white/80 backdrop-blur-sm p-8 lg:p-10 rounded-2xl shadow-lg border border-white/20 text-right">
             <h3 className="text-3xl font-bold text-[#642C32] mb-4">
              {aboutData.mission_title || 'رسالتنا'}
            </h3>
            <p className="text-xl leading-relaxed text-justify">
              {renderTextWithLogo(aboutData.mission_content || '...جاري تحميل المحتوى')}
            </p>
          </motion.div>
        </div>
      </div>
      {/* Decorative Accent */}
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#9A6641]/5 rounded-full -z-0"></div>
    </motion.section>
  );
};

export default VisionMission;