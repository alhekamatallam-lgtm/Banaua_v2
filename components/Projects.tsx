import React from 'react';
import { motion } from 'framer-motion';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Define the interface for a single slide
interface Slide {
  link: string;
  description: string;
}

// Define the props for the Projects component
interface ProjectsProps {
  slides: Slide[];
}

const Projects: React.FC<ProjectsProps> = ({ slides }) => {
  if (!slides || slides.length === 0) {
    return null; // Don't render anything if there are no slides
  }

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="w-full h-[90vh] md:h-screen bg-black relative mt-4"
    >
      <div className="absolute top-16 left-0 right-0 z-20 text-center">
        <h2 className="section-intro-heading !border-b-0 text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            من مشاريعنا
        </h2>
      </div>
      <Swiper
        dir="rtl" // Set direction to Right-to-Left
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        effect={'fade'} // Smooth fade effect
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.link}
                alt={slide.description}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-white text-3xl md:text-5xl max-w-3xl"
                    style={{ textShadow: '0px 2px 10px rgba(0,0,0,0.8)' }}
                >
                  {slide.description}
                </motion.h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default Projects;