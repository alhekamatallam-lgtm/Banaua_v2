import React from 'react';
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9,2.2c-0.2,0-0.5,0-0.7,0.1C6.1,2.8,2.7,6.6,2.2,11.7c-0.1,0.9,0,1.9,0.2,2.8c0.2,0.7,0.5,1.4,0.9,2 c0.5,0.8,2.2,2.7,2.2,2.7c-0.1-0.1,0.5,0.4,0.5,0.4c0.1,0.1,0.2,0.2,0.3,0.2c0,0,0.1,0,0.1,0h4.8c0,0,0.1,0,0.1,0 c0.1,0,0.2-0.1,0.3-0.2c0,0,0.6-0.5,0.5-0.4c0,0,1.7-1.9,2.2-2.7c0.4-0.6,0.7-1.3,0.9-2c0.2-0.9,0.3-1.9,0.2-2.8 C21.1,6.5,17.2,2.5,11.9,2.2z M8.8,11.6c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S9.6,11.6,8.8,11.6z M15,11.6 c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S15.8,11.6,15,11.6z"/>
    </svg>
);

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
        { icon: <InstagramIcon />, href: contactData.instagram, name: "Instagram" },
        { icon: <TiktokIcon />, href: contactData.tiktok, name: "TikTok" },
        { icon: <XIcon />, href: contactData.x, name: "X" },
        { icon: <SnapchatIcon />, href: contactData.snapchat, name: "Snapchat" },
    ].filter(link => link.href && link.href.trim() !== '');

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
                            className="bg-white p-8 rounded-2xl"
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