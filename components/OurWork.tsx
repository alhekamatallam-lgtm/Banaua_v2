import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Icons for the cards
const InteriorDesignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 15h20"></path><path d="M2 9h20"></path><path d="M12 3v18"></path></svg>;
const ExteriorDesignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const ExecutionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>;

interface OurProject {
    link_photo: string;
    define: string;
}

interface OurWorkProps {
  logoUrl?: string;
  ourProjects?: OurProject[];
}

const OurWork: React.FC<OurWorkProps> = ({ logoUrl, ourProjects = [] }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };
  
  const workCards = [
    { icon: <InteriorDesignIcon />, title: "التصميم الداخلي", category: "Interior design" },
    { icon: <ExteriorDesignIcon />, title: "تصاميم الواجهات", category: "Exterior design" },
    { icon: <ExecutionIcon />, title: "تنفيذنا", category: "Our execution" },
  ];

  const imagesToShow = activeCategory
    ? ourProjects.filter(p => p.define === activeCategory)
    : ourProjects;

  return (
    <motion.section
      id="our-work"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="py-20 md:py-24 bg-[#F9F7F5]"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-16">
          <h2 className="section-intro-heading text-4xl md:text-5xl text-[#1A1A1A] mb-8">
            أعمالنا
          </h2>
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-700 flex justify-center items-center flex-wrap gap-x-2">
            <span>من الفكرة إلى التسليم..</span>
            <span>تنفذ</span>
            {logoUrl && (
              <img
                src={logoUrl}
                alt="شعار بنايا"
                className="inline-block h-8 w-auto mx-1 align-middle -mt-1"
              />
            )}
            <span>مشاريعها بروح تُعبر عن الإبداع والفخامة.</span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {workCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-[#9A6641]/30 cursor-pointer"
              onMouseEnter={() => setActiveCategory(card.category)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="mb-5 text-[#9A6641] flex justify-center">
                {card.icon}
              </div>
              <h3 className="text-2xl font-semibold text-[#1A1A1A]">
                {card.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {imagesToShow.length > 0 && (
            <div className="mt-16 marquee-container h-[300px]">
                <div className="marquee flex gap-8 pb-4 h-full items-center">
                    {[...imagesToShow, ...imagesToShow].map((item, index) => (
                        <div
                            key={`${item.link_photo}-${index}`}
                            className="flex-shrink-0 h-full aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out"
                        >
                            <img 
                                src={item.link_photo} 
                                alt={item.define} 
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </motion.section>
  );
};

export default OurWork;