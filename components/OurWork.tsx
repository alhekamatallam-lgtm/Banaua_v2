

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import type { ProcessedOurProjectItem as OurProject, ImageSet } from '../App';

// --- Component Props ---
interface OurWorkProps {
  ourProjects?: OurProject[];
  logoSet?: ImageSet;
}

type FilterType = "الكل" | "تنفيذنا" | "تصميم داخلي" | "تصاميم واجهات";

// Mapping from Arabic filter names to English data values
const filterMap: Record<FilterType, 'All' | OurProject['define']> = {
    "الكل": "All",
    "تنفيذنا": "Our execution",
    "تصميم داخلي": "Interior design",
    "تصاميم واجهات": "Exterior design",
};

const OurWork: React.FC<OurWorkProps> = ({ ourProjects = [], logoSet }) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>("تنفيذنا");

    const filteredProjects = useMemo(() => {
        const englishFilter = filterMap[activeFilter];
        if (englishFilter === "All") {
            return ourProjects;
        }
        return ourProjects.filter(p => p.define === englishFilter);
    }, [activeFilter, ourProjects]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
    };
    
    const introText = "من الفكرة إلى التسليم.. تنفذ";
    const introTextEnd = "مشاريعها بروح تُعبر عن الإبداع والفخامة.";

    const filters: FilterType[] = ["الكل", "تنفيذنا", "تصميم داخلي", "تصاميم واجهات"];

    return (
        <motion.section
            id="our-work"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="py-20 md:py-24 bg-[#F9F7F5] overflow-hidden"
        >
            <div className="container mx-auto px-6">
                <motion.div variants={itemVariants} className="text-center mb-10">
                    <h2 className="section-intro-heading text-4xl md:text-5xl text-[#1A1A1A]">
                        أعمالنا
                    </h2>
                    <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto flex justify-center items-center flex-wrap gap-x-2">
                        <span>{introText}</span>
                        {logoSet?.original && (
                            <picture className="inline-block h-8 w-auto mx-1 align-middle -mt-1">
                                {logoSet.webp && <source srcSet={logoSet.webp} type="image/webp" />}
                                <img
                                    src={logoSet.original}
                                    alt="شعار بنايا"
                                    className="h-full w-full object-contain"
                                />
                            </picture>
                        )}
                        <span>{introTextEnd}</span>
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div variants={itemVariants} className="flex justify-center items-center gap-x-2 md:gap-x-4 mb-12 flex-wrap">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2 rounded-full text-base font-semibold transition-all duration-300 ease-in-out border-2 ${
                                activeFilter === filter
                                    ? 'bg-[#642C32] text-white border-[#642C32] shadow-lg'
                                    : 'bg-white text-[#642C32] border-[#E0D5CB] hover:bg-[#F9F7F5] hover:border-[#C8B8A6]'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Swiper Slider */}
            {ourProjects.length > 0 && (
                <motion.div variants={itemVariants} className='w-full'>
                    <Swiper
                        key={activeFilter} // Re-initialize swiper on filter change to avoid bugs
                        dir="rtl"
                        modules={[Navigation, Pagination, Autoplay, EffectFade]}
                        effect={'fade'}
                        fadeEffect={{ crossFade: true }}
                        spaceBetween={30}
                        slidesPerView={1}
                        centeredSlides={true}
                        navigation
                        pagination={{ clickable: true }}
                        loop={filteredProjects.length > 1}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        className="w-full h-auto pb-14 ken-burns-slider"
                    >
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                                <SwiperSlide key={project.link_photo_set.original + index} className="px-4 md:px-12 lg:px-24">
                                    <div className="aspect-video rounded-2xl overflow-hidden shadow-lg group">
                                        <picture className="w-full h-full">
                                            {project.link_photo_set.webp && <source srcSet={project.link_photo_set.webp} type="image/webp" />}
                                            <img
                                                src={project.link_photo_set.original}
                                                alt={`مشروع بنايا ${index + 1} - ${project.define}`}
                                                className="w-full h-full object-cover image-color-enhance transition-transform duration-500 ease-in-out group-hover:scale-105 slide-image"
                                                loading="lazy"
                                            />
                                        </picture>
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide className="px-4 md:px-12 lg:px-24">
                                <div className="aspect-video rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 text-xl font-medium border border-gray-200">
                                    لا توجد مشاريع في هذا التصنيف حالياً.
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </motion.div>
            )}
        </section>
    );
};

export default OurWork;