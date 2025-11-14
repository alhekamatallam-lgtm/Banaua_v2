
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import type { ImageSet } from '../App';
import type { Swiper as SwiperClass } from 'swiper';


interface HeroProps {
  heroImages?: ImageSet[];
}

// New mouse icon component
const MouseScrollIcon = () => (
    <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="37" rx="10.5" stroke="white" strokeWidth="3"/>
        <motion.circle 
            cx="12" 
            cy="12" 
            r="3" 
            fill="white"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
    </svg>
);


const Hero: React.FC<HeroProps> = ({ heroImages = [] }) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const defaultDescription = "نصنع البهجة للمكان";

  const scrollToWork = () => {
    document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.2, // Time between each word appearing
      },
    },
  };

  const word = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center text-white"
    >
      <div className="absolute inset-0 z-0">
        <Swiper
            onSwiper={setSwiper}
            dir="rtl"
            spaceBetween={0}
            centeredSlides={true}
            loop={heroImages.length > 1}
            effect={'fade'}
            fadeEffect={{ crossFade: true }}
            autoplay={{
                delay: 7000,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={heroImages.length > 1}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            className="w-full h-full ken-burns-slider"
        >
            {heroImages.map((imageSet, index) => (
                 <SwiperSlide key={imageSet.original + index}>
                    <picture className="w-full h-full">
                        {imageSet.webp && <source srcSet={imageSet.webp} type="image/webp" />}
                        <img
                          src={imageSet.original}
                          alt={`Banaya Horizon Project ${index + 1}`}
                          className="w-full h-full object-cover slide-image image-color-enhance"
                        />
                    </picture>
                 </SwiperSlide>
            ))}
        </Swiper>
        <div className="absolute inset-0 bg-black/15"></div>
      </div>

      <motion.div
        className="relative z-10 text-center px-4"
      >
        <motion.h2
          variants={sentence}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => {
            setTimeout(() => {
              if (swiper && !swiper.destroyed) {
                swiper.slideNext();
              }
            }, 1500); // 1.5s pause after animation, then slide
          }}
          className="text-white text-4xl md:text-6xl lg:text-7xl"
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
           {defaultDescription.split(' ').map((char, index) => (
            <motion.span
              key={char + '-' + index}
              variants={word}
              className="inline-block mr-4" // Use margin for spacing
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 z-20"
      >
         <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          onClick={scrollToWork}
          className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer ring-1 ring-white/20 hover:bg-white/20 transition-all duration-300"
          title="تصفح أعمالنا"
        >
          <MouseScrollIcon />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;