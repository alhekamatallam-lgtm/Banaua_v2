import React from 'react';
import { motion } from 'framer-motion';

// SVG Icons as React Components
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const TiktokIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.999a2 2 0 012 2v8a2 2 0 11-4 0V7.5a.5.5 0 00-1 0V13a6 6 0 106-6h-2a4 4 0 11-4 4V4.999a2 2 0 012-2z"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>;
const SnapchatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5c-5.25 0-9.5 4.25-9.5 9.5 0 2.5 1 4.75 2.5 6.5-1 1-2.5 2-2.5 2s2-1 3-2.5c1.75 1.5 4 2.5 6.5 2.5 5.25 0 9.5-4.25 9.5-9.5S17.25 2.5 12 2.5z"></path></svg>;

interface ContactProps {
  contactData: {
    address: string;
    phone1: string;
    phone2: string;
    email: string;
    instagram: string;
    tiktok: string;
    x: string;
    snapchat: string;
  };
}

const Contact: React.FC<ContactProps> = ({ contactData }) => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            تواصل معنا
          </h2>
          <div className="w-24 h-1 bg-[#642C32] mx-auto mb-12"></div>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="max-w-4xl mx-auto bg-[#F9F7F5] p-8 md:p-12 rounded-lg shadow-lg"
        >
            <div className="grid md:grid-cols-2 gap-8 text-right">
                {/* Contact Details */}
                <div className="space-y-6">
                    <div className="flex items-start justify-end">
                        <p className="mr-4 text-lg text-gray-700">{contactData.address}</p>
                        <div className="bg-[#9A6641] p-3 rounded-full text-white"><LocationIcon /></div>
                    </div>
                    <div className="flex items-center justify-end">
                        <p className="mr-4 text-lg text-gray-700" dir="ltr">{contactData.phone1}</p>
                        <div className="bg-[#9A6641] p-3 rounded-full text-white"><PhoneIcon /></div>
                    </div>
                    <div className="flex items-center justify-end">
                        <p className="mr-4 text-lg text-gray-700" dir="ltr">{contactData.phone2}</p>
                        <div className="bg-[#9A6641] p-3 rounded-full text-white"><PhoneIcon /></div>
                    </div>
                     <div className="flex items-center justify-end">
                        <p className="mr-4 text-lg text-gray-700">{contactData.email}</p>
                        <div className="bg-[#9A6641] p-3 rounded-full text-white"><MailIcon /></div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="space-y-4 flex flex-col items-end">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">تابعنا على</h3>
                    <div className="flex space-x-reverse space-x-4">
                        <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 hover:bg-[#9A6641] text-gray-600 hover:text-white rounded-full transition-colors"><InstagramIcon /></a>
                        <a href={contactData.tiktok} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 hover:bg-[#9A6641] text-gray-600 hover:text-white rounded-full transition-colors"><TiktokIcon /></a>
                        <a href={contactData.x} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 hover:bg-[#9A6641] text-gray-600 hover:text-white rounded-full transition-colors"><XIcon /></a>
                        <a href={contactData.snapchat} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-200 hover:bg-[#9A6641] text-gray-600 hover:text-white rounded-full transition-colors"><SnapchatIcon /></a>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
