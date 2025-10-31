import React, { useState } from 'react';
import { motion } from 'framer-motion';

// SVG Icons as React Components (20x20px)
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const TiktokIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.999a2 2 0 012 2v8a2 2 0 11-4 0V7.5a.5.5 0 00-1 0V13a6 6 0 106-6h-2a4 4 0 11-4 4V4.999a2 2 0 012-2z"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>;
const SnapchatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5c-5.25 0-9.5 4.25-9.5 9.5 0 2.5 1 4.75 2.5 6.5-1 1-2.5 2-2.5 2s2-1 3-2.5c1.75 1.5 4 2.5 6.5 2.5 5.25 0 9.5-4.25 9.5-9.5S17.25 2.5 12 2.5z"></path></svg>;

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
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionStatus('submitting');
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setSubmissionStatus('success');
        form.reset();
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      setSubmissionStatus('error');
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="py-20 bg-[#F9F7F5] overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#642C32]">
            تواصل معنا
          </h2>
          <div className="w-24 h-1 bg-[#9A6641] mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-16 items-start">
            {/* Left Column on Desktop, Top on Mobile: Form */}
            <div className="bg-white p-8 sm:p-10 rounded-lg shadow-xl border border-gray-100 order-1 md:order-2 max-w-lg mx-auto w-full">
                {submissionStatus === 'success' ? (
                  <div className="text-center p-8 h-full flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-bold text-[#642C32] mb-4">تم الإرسال بنجاح!</h3>
                    <p className="text-gray-600">شكرًا لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                  </div>
                ) : (
                  <form 
                    action="https://formspree.io/f/YOUR_FORM_ID_HERE" // Replace with your Formspree form ID
                    method="POST"
                    onSubmit={handleSubmit} 
                    className="space-y-6 text-right"
                  >
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">الاسم</label>
                        <input type="text" name="name" id="name" required className="w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A6641] focus:border-[#9A6641] transition duration-200" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                        <input type="email" name="email" id="email" required className="w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A6641] focus:border-[#9A6641] transition duration-200" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">الرسالة</label>
                        <textarea name="message" id="message" rows={5} required className="w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9A6641] focus:border-[#9A6641] transition duration-200 resize-none"></textarea>
                    </div>
                    <div>
                        <button type="submit" disabled={submissionStatus === 'submitting'} className="w-full py-3 px-6 bg-[#9A6641] text-white font-bold rounded-xl hover:bg-[#642C32] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A6641] text-lg disabled:bg-gray-400">
                           {submissionStatus === 'submitting' ? '...جاري الإرسال' : 'إرسال الرسالة'}
                        </button>
                    </div>
                    {submissionStatus === 'error' && <p className="text-red-500 text-sm mt-2">حدث خطأ ما. يرجى المحاولة مرة أخرى.</p>}
                  </form>
                )}
            </div>

            {/* Right Column on Desktop, Bottom on Mobile: Info */}
            <div className="space-y-12 order-2 md:order-1">
                <div className="space-y-8 text-right">
                    {/* Address */}
                    <div className="flex justify-start items-start gap-5">
                        <div className="flex-shrink-0 bg-[#9A6641] p-4 rounded-full text-white"><LocationIcon /></div>
                        <div className="text-right">
                            <h4 className="font-bold text-xl text-[#1A1A1A]">عنوان</h4>
                            <p className="mt-1 text-gray-600">{contactData.address}</p>
                        </div>
                    </div>
                    {/* Phone */}
                    <div className="flex justify-start items-start gap-5">
                        <div className="flex-shrink-0 bg-[#9A6641] p-4 rounded-full text-white"><PhoneIcon /></div>
                        <div className="text-right">
                           <h4 className="font-bold text-xl text-[#1A1A1A]">الهاتف</h4>
                           <p className="mt-1 text-gray-600" dir="ltr">{contactData.phone1} / {contactData.phone2}</p>
                        </div>
                    </div>
                    {/* Email */}
                    <div className="flex justify-start items-start gap-5">
                         <div className="flex-shrink-0 bg-[#9A6641] p-4 rounded-full text-white"><MailIcon /></div>
                        <div className="text-right">
                           <h4 className="font-bold text-xl text-[#1A1A1A]">البريد الإلكتروني</h4>
                           <a href={`mailto:${contactData.email}`} className="mt-1 text-gray-600 hover:text-[#642C32]">{contactData.email}</a>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="text-right">
                   <h4 className="font-bold text-xl text-[#1A1A1A]">تابعنا على</h4>
                   <div className="mt-4 flex justify-start gap-4">
                       <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#9A6641] hover:bg-[#642C32] text-white rounded-full transition-colors"><InstagramIcon /></a>
                       <a href={contactData.tiktok} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#9A6641] hover:bg-[#642C32] text-white rounded-full transition-colors"><TiktokIcon /></a>
                       <a href={contactData.x} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#9A6641] hover:bg-[#642C32] text-white rounded-full transition-colors"><XIcon /></a>
                       <a href={contactData.snapchat} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#9A6641] hover:bg-[#642C32] text-white rounded-full transition-colors"><SnapchatIcon /></a>
                   </div>
                </div>
            </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;