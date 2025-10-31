
import React from 'react';
import { motion } from 'framer-motion';

const VisionMission: React.FC = () => {
  const cardVariants = {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section id="vision-mission" className="py-20 md:py-32 bg-[#F9F7F5]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold text-[#9A6641] mb-4">رؤيتنا</h3>
            <p className="text-gray-600 leading-relaxed">
              أن نكون الخيار الأول في عالم التصميم والبناء في المملكة، من خلال تقديم تصاميم مبتكرة ومستدامة تترك بصمة إيجابية في حياة الناس والمجتمع.
            </p>
          </motion.div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold text-[#9A6641] mb-4">رسالتنا</h3>
            <p className="text-gray-600 leading-relaxed">
              الالتزام بتحويل أفكار عملائنا إلى حقيقة ملموسة عبر تصاميم فريدة وتنفيذ دقيق، مع التركيز على الجودة، والابتكار، ورضا العميل في كل خطوة من خطوات المشروع.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
