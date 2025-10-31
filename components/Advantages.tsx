import React from 'react';
import { motion } from 'framer-motion';

// Minimalist SVG Icons
const IdentityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s5-8 10-8 10 8 10 8-5 8-10 8-10-8-10-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const StandardsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;
const CreativityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"></path></svg>;
const TrustIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>;
const SupervisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const PartnershipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;


const advantagesData = [
  { icon: <IdentityIcon />, title: "هوية سعودية بروح عصرية", content: "نستوحي تصاميمنا من العمارة المحلية وذوق المجتمع السعودي، بلمسات حديثة تعبّر عن الرقي والفخامة." },
  { icon: <StandardsIcon />, title: "تنفيذ بمعايير هندسية عالية", content: "نعتمد على كوادر هندسية مؤهلة تضمن جودة التنفيذ ودقّته في جميع التفاصيل." },
  { icon: <CreativityIcon />, title: "إبداع في الفكرة ودقة في التفاصيل", content: "كل مشروع نبدأه نحوله إلى تحفة تصميمية تُجسّد التوازن بين الجمال والوظيفة." },
  { icon: <TrustIcon />, title: "ثقة تُبنى على الالتزام", content: "نلتزم بالمواعيد، ونعمل بشفافية كاملة مع عملائنا وشركائنا." },
  { icon: <SupervisionIcon />, title: "إشراف مباشر وضمان ممتد", content: "نقدم إشرافًا ميدانيًا دقيقًا مع ضمان جودة طويلة الأمد." },
  { icon: <PartnershipIcon />, title: "شراكات نوعية مع أفضل الموردين", content: "نتعاون مع نخبة من الموردين المحليين والعالميين لضمان استخدام مواد فائقة الجودة." },
];

const Advantages: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="advantages"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 md:py-24 bg-[#F9F7F5]" // Use a slightly different background for contrast
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-intro-heading text-4xl md:text-5xl text-[#642C32]">
            مميزاتنا
          </h2>
        </div>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {advantagesData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white p-8 rounded-2xl text-right transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-[#9A6641]/30"
            >
              <div className="mb-5 text-[#9A6641]">
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-3">
                {item.title}
              </h3>
              <p className="text-lg font-light leading-relaxed text-gray-600">
                {item.content}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Advantages;