import React from 'react';
import { motion } from 'framer-motion';
import type { ImageSet } from '../App';

interface WorkAreasProps {
  logoSet?: ImageSet;
  areaImageSet?: ImageSet;
}

const WorkAreas: React.FC<WorkAreasProps> = ({ logoSet, areaImageSet }) => {
    const textVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const imageVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 } },
    };
    
    const fallbackImage: ImageSet = {
        original: "https://i.ibb.co/Jqj8vWq/saudi-map-no-text.png",
        webp: ""
    };

    const imageSetToUse = areaImageSet?.original ? areaImageSet : fallbackImage;

    return (
        <motion.section
            id="work-areas"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="py-20 md:py-24 bg-[#F9F7F5]"
        >
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content (Right side in RTL) */}
                <motion.div variants={textVariants} className="text-right">
                    <h2 className="section-intro-heading text-4xl md:text-5xl text-[#642C32] mb-6">
                        مناطق العمل
                    </h2>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-700 flex justify-start items-center flex-wrap gap-x-2">
                        <span>تغطي أعمال</span>
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
                        <span>كل مناطق المملكة ودول الخليج.</span>
                    </p>
                </motion.div>

                {/* Frameless image with entrance animation */}
                <motion.div variants={imageVariants}>
                    <picture>
                        {imageSetToUse.webp && <source srcSet={imageSetToUse.webp} type="image/webp" />}
                        <img 
                            src={imageSetToUse.original} 
                            alt="خريطة مناطق عمل بنايا"
                            className="w-full h-auto"
                        />
                    </picture>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default WorkAreas;