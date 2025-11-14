
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- SVG Icons ---

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const TiktokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.66 2.83 2.85 2.85 0 0 1-2.94-2.85 2.86 2.86 0 0 1 2.84-2.88c.1 0 .19.01.28.02V10.1a6.3 6.3 0 0 0-3.37.95 6.44 6.44 0 0 0-3.3 5.8 6.49 6.49 0 0 0 6.51 6.49 6.47 6.47 0 0 0 6.36-5.62V6.69h3.38V2h-3.38v4.69z"></path>
    </svg>
);


const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
    </svg>
);

const SnapchatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" >
        <path d="M11.9,1.3C9.2,0.5,6.1,1,3.9,2.8c-2,1.7-3.3,4.2-3.4,6.9c-0.2,2.6,0.6,5.2,2.2,7.3c1,1.3,1.7,2.8,1.7,4.6v2.6c0,0.7,0.5,1.2,1.2,1.2h9.2c0.7,0,1.2-0.5,1.2-1.2v-2.6c0-1.7,0.7-3.2,1.7-4.6c1.6-2.1,2.4-4.7,2.2-7.3C23.5,7,22.1,4.5,20.2,2.8C18.9,1.8,17.3,1.3,15.7,1.1C14.5,1,13.2,1,11.9,1.3z"/>
    </svg>
);

// Helper to format social media URLs correctly
const formatSocialUrl = (baseUrl: string, value?: string): string | undefined => {
    if (!value || value.trim() === '') return undefined;
    
    const cleanValue = value.trim().replace(/^@/, '');

    if (cleanValue.startsWith('http://') || cleanValue.startsWith('https://')) {
        return cleanValue;
    }

    return `${baseUrl}${cleanValue}`;
};

interface ContactData {
    address: string;
    phone1: string;
    phone2: string;
    email: string;
    instagram: string;
    tiktok: string;
    x: string;
    snapchat: string;
}

interface ContactProps {
    contactData: ContactData;
}

const Contact: React.FC<ContactProps> = ({ contactData }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isFormTouched, setIsFormTouched] = useState(false);

    const validate = (field?: string, value?: string) => {
        const tempErrors: { [key: string]: string } = { ...errors };

        const checkField = (name: string, val: string) => {
             switch (name) {
                case 'name':
                    if (!val.trim()) tempErrors.name = 'الاسم الكامل مطلوب';
                    else delete tempErrors.name;
                    break;
                case 'phone':
                    if (!val.trim()) tempErrors.phone = 'رقم الجوال مطلوب';
                    else if (!/^[0-9\s+-]+$/.test(val)) tempErrors.phone = 'الرجاء إدخال رقم جوال صحيح';
                    else delete tempErrors.phone;
                    break;
                case 'email':
                    if (!val.trim()) tempErrors.email = 'البريد الإلكتروني مطلوب';
                    else if (!/\S+@\S+\.\S+/.test(val)) tempErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';
                    else delete tempErrors.email;
                    break;
                case 'message':
                    if (!val.trim()) tempErrors.message = 'الرسالة مطلوبة';
                    else delete tempErrors.message;
                    break;
                default:
                    break;
            }
        };

        if (field && value !== undefined) {
            checkField(field, value);
        } else {
            Object.keys(formData).forEach(key => {
                checkField(key, formData[key as keyof typeof formData]);
            });
        }
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (isFormTouched) {
           validate(name, value);
        }
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!isFormTouched) setIsFormTouched(true);
        const { name, value } = e.target;
        validate(name, value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFormTouched(true);
        if (!validate()) {
            return;
        }
        
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Use the new production API endpoint for form submissions
        const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbznMtSB-jzE8PEZ1J5-_obRQcOTZxbDn-pglLnKLfxgFpgNhulchTquW8sxxZxJAUl4/exec";

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send data with the required 'sheet' property for the backend
                body: JSON.stringify({
                    sheet: "ContactForm",
                    ...formData
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', phone: '', email: '', message: '' });
                setIsFormTouched(false);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const contactItems = [
        {
            icon: <PhoneIcon />,
            title: "اتصل بنا",
            content: (
                <>
                    <a href={`tel:${contactData.phone1}`} className="block hover:text-[#9A6641] transition-colors">{contactData.phone1}</a>
                    {contactData.phone2 && <a href={`tel:${contactData.phone2}`} className="block hover:text-[#9A6641] transition-colors mt-1">{contactData.phone2}</a>}
                </>
            ),
            aria: "Phone numbers",
        },
        {
            icon: <MailIcon />,
            title: "راسلنا",
            content: <a href={`mailto:${contactData.email}`} className="hover:text-[#9A6641] transition-colors">{contactData.email}</a>,
            aria: "Email address",
        },
        {
            icon: <MapPinIcon />,
            title: "موقعنا",
            content: <p>{contactData.address}</p>,
            aria: "Our address",
        },
    ];
    
    const socialLinks = [
        { icon: <InstagramIcon />, href: formatSocialUrl('https://www.instagram.com/', contactData.instagram), name: "Instagram" },
        { icon: <TiktokIcon />, href: "https://www.tiktok.com/@banaya_ksa", name: "TikTok" },
        { icon: <XIcon />, href: formatSocialUrl('https://x.com/', contactData.x), name: "X" },
        { icon: <SnapchatIcon />, href: "https://www.snapchat.com/add/banaya_ksa", name: "Snapchat" },
    ].filter(link => link.href);


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <motion.section
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="bg-[#F9F7F5] py-20 md:py-24"
        >
            <div className="container mx-auto px-6">
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className="section-intro-heading text-4xl md:text-5xl text-[#642C32]">
                        تواصل معنا
                    </h2>
                    <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
                        نحن هنا لتحويل أفكارك إلى واقع. تواصل معنا لبدء مشروعك القادم.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center"
                >
                    {contactItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white p-8 rounded-2xl shadow-sm"
                        >
                            <div className="flex justify-center text-[#642C32] mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                            <div className="text-lg text-gray-700 font-medium" aria-label={item.aria}>
                                {item.content}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                
                {/* --- Quick Contact Form --- */}
                <motion.div variants={itemVariants} className="mt-20">
                    <div className="text-center mb-12">
                         <h3 className="text-3xl font-bold text-[#642C32]">
                            أو أرسل لنا مباشرة
                        </h3>
                        <p className="mt-2 text-lg text-gray-600">
                            املأ النموذج أدناه وسنتواصل معك في أقرب وقت.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
                        noValidate
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mb-8">
                            <div className="relative">
                                <label htmlFor="name" className="block text-right mb-2 font-semibold text-gray-700">
                                    الاسم الكامل
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-4 py-3 bg-gray-50 rounded-lg border transition-all duration-300 ${errors.name ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9A6641]'}`}
                                    required
                                    aria-invalid={!!errors.name}
                                    aria-describedby="name-error"
                                />
                                {errors.name && <p id="name-error" className="text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div className="relative">
                                <label htmlFor="phone" className="block text-right mb-2 font-semibold text-gray-700">
                                    رقم الجوال
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-4 py-3 bg-gray-50 rounded-lg border transition-all duration-300 ${errors.phone ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9A6641]'}`}
                                    required
                                    aria-invalid={!!errors.phone}
                                    aria-describedby="phone-error"
                                />
                                {errors.phone && <p id="phone-error" className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                            </div>
                        </div>
                        <div className="relative mb-8">
                            <label htmlFor="email" className="block text-right mb-2 font-semibold text-gray-700">
                                البريد الإلكتروني
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 bg-gray-50 rounded-lg border transition-all duration-300 ${errors.email ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9A6641]'}`}
                                required
                                aria-invalid={!!errors.email}
                                aria-describedby="email-error"
                            />
                            {errors.email && <p id="email-error" className="text-red-600 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className="relative mb-8">
                            <label htmlFor="message" className="block text-right mb-2 font-semibold text-gray-700">
                                كيف يمكننا مساعدتك؟
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-4 py-3 bg-gray-50 rounded-lg border transition-all duration-300 resize-none ${errors.message ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400' : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9A6641]'}`}
                                required
                                aria-invalid={!!errors.message}
                                aria-describedby="message-error"
                            ></textarea>
                            {errors.message && <p id="message-error" className="text-red-600 text-sm mt-1">{errors.message}</p>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#642C32] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#9A6641] transition-colors duration-300 text-lg focus:outline-none focus:ring-4 focus:ring-[#9A6641]/50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'جارٍ الإرسال...' : 'إرسال'}
                            </button>
                        </div>
                        <div className="h-12 mt-4 text-center">
                            {submitStatus === 'success' && (
                                <p className="text-green-600 bg-green-100 p-3 rounded-lg">
                                    تم استلام رسالتك بنجاح! سنتواصل معك قريباً.
                                </p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-600 bg-red-100 p-3 rounded-lg">
                                    حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.
                                </p>
                            )}
                        </div>
                    </form>
                </motion.div>

                {socialLinks.length > 0 && (
                    <motion.div variants={itemVariants} className="mt-20 text-center">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">تابعنا على شبكات التواصل</h3>
                        <div className="flex justify-center items-center gap-x-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow us on ${social.name}`}
                                    className="text-[#9A6641] hover:text-[#642C32] transition-all duration-300 ease-in-out hover:scale-110"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
};

export default Contact;
