import React from 'react';

// SVG Icons for fields of work
const ArchitecturalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
const InteriorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"></path><path d="M2 15h20"></path><path d="M4 15v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path></svg>;
const SupervisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8.11 2.99"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path><path d="M12 12l5 5"></path></svg>;
const ManagementIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const FinishingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="M3.27 6.96 12 12.01l8.73-5.05"></path><path d="M12 22.08V12"></path></svg>;
const LandscapingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-6"></path><path d="M12 16a6 6 0 0 1-6-6V2h12v8a6 6 0 0 1-6 6z"></path><path d="M12 16a6 6 0 0 0 6-6V2"></path><path d="M12 2v4"></path></svg>;

const fieldsData = [
  { icon: <ArchitecturalIcon />, title: "التصميم المعماري", content: "نقدم حلولاً معمارية مبتكرة تجمع بين الأصالة والحداثة، مع مراعاة أدق التفاصيل لتحقيق رؤية العميل." },
  { icon: <InteriorIcon />, title: "التصميم الداخلي", content: "نصمم مساحات داخلية تعكس شخصيتك وتلبي احتياجاتك، محققين التوازن المثالي بين الجمال والوظيفة." },
  { icon: <SupervisionIcon />, title: "الإشراف على التنفيذ", content: "نضمن تنفيذ المشاريع بأعلى معايير الجودة ومن خلال إشراف هندسي دقيق يراقب كل مراحل العمل." },
  { icon: <ManagementIcon />, title: "إدارة المشاريع", content: "ندير مشاريعكم بكفاءة عالية، مع الالتزام بالجداول الزمنية والميزانيات المحددة لتحقيق أفضل النتائج." },
  { icon: <FinishingIcon />, title: "التشطيبات والديكور", content: "نهتم بأدق تفاصيل التشطيبات النهائية ونختار أجود المواد لنضيف لمسة من الفخامة والرقي لمساحاتكم." },
  { icon: <LandscapingIcon />, title: "تصميم وتنسيق الحدائق", content: "نحول المساحات الخارجية إلى واحات خضراء، بتصاميم طبيعية خلابة تزيد من جمالية مشاريعكم." },
];

const Fields: React.FC = () => {
    return (
        <section
            id="fields"
            className="py-20 md:py-24 bg-[#F9F7F5] overflow-hidden"
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="section-intro-heading text-4xl md:text-5xl text-[#1A1A1A]">
                        مجالاتنا
                    </h2>
                </div>
            </div>

            <div className="marquee-container">
                <div className="marquee flex gap-8 pb-4">
                    {[...fieldsData, ...fieldsData].map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[380px] bg-white p-8 rounded-2xl text-right transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100"
                        >
                            <div className="mb-5 text-[#642C32]">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-3">
                                {item.title}
                            </h3>
                            <p className="text-lg font-light leading-relaxed text-gray-700">
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Fields;