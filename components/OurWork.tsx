import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Define project interface
interface OurProject {
    link_photo: string;
    define: "Interior design" | "Exterior design" | "Our execution";
}

// Define component props
interface OurWorkProps {
  logoUrl?: string;
  ourProjects?: OurProject[];
}

// Helper function to get a more descriptive title
const getCategoryName = (define: OurProject['define']): string => {
    switch(define) {
        case "Interior design": return "تصميم داخلي";
        case "Exterior design": return "تصميم واجهة";
        case "Our execution": return "من تنفيذنا";
        default: return "مشروع";
    }
}

// High-res image URL helper for slider
const getHighResImageUrl = (url: string) => {
    if (!url) return '';
    // Request a higher resolution image for the full-screen slider
    return url.replace('w=800', 'w=1920').replace('q=75', 'q=90');
}

const OurWork: React.FC<OurWorkProps> = ({ logoUrl, ourProjects = [] }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filters = [
      { label: 'الكل', value: 'All' },
      { label: 'تنفيذنا', value: 'Our execution' },
      { label: 'تصميم داخلي', value: 'Interior design' },
      { label: 'تصاميم واجهات', value: 'Exterior design' },
  ];

  const filteredProjects = ourProjects.filter(project => {
      if (activeFilter === 'All') return true;
      return project.define === activeFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <>
      {/* Custom CSS for the Ken Burns effect */}
      <style>{`
        .ken-burns-slider .swiper-slide .slide-image {
          transform: scale(1);
          transition: transform 7000ms ease-out;
        }
        .ken-burns-slider .swiper-slide-active .slide-image {
          transform: scale(1.15);
        }
      `}</style>
      
      <motion.section
        id="our-work"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="pt-20 md:pt-24 bg-[#F9F7F5] overflow-hidden" // Added overflow-hidden
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-10">
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

          {/* Filter Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center items-center flex-wrap gap-3 md:gap-4 mb-12"
          >
            {filters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`py-2 px-6 rounded-full font-semibold transition-all duration-300 ease-in-out text-base
                  ${activeFilter === filter.value 
                    ? 'bg-[#642C32] text-white shadow-md' 
                    : 'bg-white text-[#642C32] border border-[#642C32]/30 hover:bg-[#642C32]/10'
                  }`
                }
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Full-screen Swiper Slider */}
        <motion.div variants={itemVariants} className="w-full h-[75vh] md:h-screen">
            <Swiper
                key={activeFilter} // Re-initializes Swiper when filter changes
                dir="rtl"
                spaceBetween={0}
                centeredSlides={true}
                loop={filteredProjects.length > 1} // Loop only if there's more than one slide
                effect={'fade'}
                fadeEffect={{ crossFade: true }}
                autoplay={{
                delay: 7000,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="w-full h-full ken-burns-slider"
            >
                {filteredProjects.map((project) => (
                    <SwiperSlide key={project.link_photo}>
                        <div className="relative w-full h-full">
                            <img
                                src={getHighResImageUrl(project.link_photo)}
                                alt={getCategoryName(project.define)}
                                className="w-full h-full object-cover slide-image"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
                             <div className="absolute bottom-0 right-0 p-6 md:p-10">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="bg-black/50 text-white text-xl md:text-2xl font-semibold px-5 py-3 rounded-lg backdrop-blur-sm"
                                >
                                    {getCategoryName(project.define)}
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
      </motion.section>
    </>
  );
};

export default OurWork;