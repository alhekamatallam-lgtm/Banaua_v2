import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// A self-contained, animated counter component that animates when it comes into view
const AnimatedCounter = ({ to }: { to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  // Trigger animation when the element is 50px into the viewport
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
            // Update the text content directly for performance, avoiding React re-renders
            node.textContent = Math.round(value).toString();
        },
      });
      // Cleanup function to stop the animation if the component unmounts
      return () => controls.stop();
    }
  }, [isInView, to]);

  // Start with 0 and let the animation update it
  return <span ref={nodeRef}>0</span>;
};

const statsData = [
  { value: 4, text: "سنوات من الخبرة في السوق السعودي" },
  { value: 22, text: "واجهة تم تصميمها" },
  { value: 38, text: "مشروع تم تنفيذه" },
  { value: 60, text: "عميل من الأفراد والجهات" },
];

const Stats: React.FC = () => {
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

    return (
        <motion.section
            id="stats"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="py-20 md:py-24 bg-[#F9F7F5]" // Swapped background for consistency
        >
            <div className="container mx-auto px-6 text-center">
                <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-16">
                    <h2 className="section-intro-heading text-4xl md:text-5xl text-[#642C32] mb-8">
                        بنايا في أرقام
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
                >
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white p-6 rounded-2xl" // Swapped card color for consistency
                        >
                            <p className="text-5xl md:text-6xl font-bold text-[#9A6641]">
                                <AnimatedCounter to={stat.value} />+
                            </p>
                            <p className="mt-4 text-base md:text-lg text-gray-700">{stat.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
                
                <motion.p 
                    variants={itemVariants} 
                    className="mt-16 text-xl text-gray-800 max-w-3xl mx-auto"
                >
                    مع توسع مستمر لتقديم خدماتنا ونصنع البهجة بما يرضي عملائنا.
                </motion.p>
            </div>
        </motion.section>
    );
};

export default Stats;