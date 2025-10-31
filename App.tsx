import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import VisionMission from './components/VisionMission';
import Fields from './components/Fields'; // Import new component
import Advantages from './components/Advantages'; // Import new component
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Define interfaces for the API data structure for type safety
interface BanauaItem {
  description: string;
  link: string;
}

interface LogoItem {
  logo: string;
}

interface AboutData {
  about_title: string;
  about_content: string;
  vision_title: string;
  vision_content: string;
  mission_title: string;
  mission_content: string;
}

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

interface ApiData {
  Banaua: BanauaItem[];
  logo: LogoItem[];
  about: AboutData[];
  contact: ContactData[];
}

// Performance optimization helper function for images
const optimizeImageUrl = (url: string, width = 1280, quality = 75): string => {
    if (!url) return '';
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'images.unsplash.com') {
            urlObj.searchParams.set('w', width.toString());
            urlObj.searchParams.set('q', quality.toString());
            urlObj.searchParams.set('auto', 'format');
            urlObj.searchParams.set('fit', 'crop');
            return urlObj.toString();
        }
        // For other domains like i.ibb.co, optimization is not possible via URL params
        return url;
    } catch (error) {
        return url; // Return original url if it's not a valid URL
    }
};

const App: React.FC = () => {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwvYNpJowi6dWgwSLrreUksae_zq84q2N5Irj9fLfltLrV6ay2cZuqZeipbU3AeS7G5/exec');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success) {
          // Optimize all images from the API
          const optimizedData = {
              ...result.data,
              Banaua: result.data.Banaua.map((item: BanauaItem) => ({
                  ...item,
                  link: optimizeImageUrl(item.link)
              }))
          };
          setData(optimizedData);
        } else {
          throw new Error('API request returned an error');
        }
      } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unknown error occurred while fetching data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="h-screen w-full flex items-center justify-center bg-[#F9F7F5] text-red-500 text-xl">حدث خطأ: {error}</div>;
  }
  
  const optimizedHeroData = data?.Banaua[0] ? { ...data.Banaua[0], link: optimizeImageUrl(data.Banaua[0].link, 1920, 80) } : undefined;


  return (
    <>
      <AnimatePresence>
        {loading && <LoadingSpinner />}
      </AnimatePresence>

      {data && (
        <div className="bg-[#F9F7F5] text-[#1A1A1A] antialiased">
          <Header logoUrl={data.logo[0]?.logo} />
          <main>
            <Hero heroData={optimizedHeroData} />
            {data.Banaua && <Projects slides={data.Banaua} />}
            {data.about && data.logo && <About aboutData={data.about[0]} logoUrl={data.logo[0]?.logo} />}
            {data.about && data.logo && <VisionMission aboutData={data.about[0]} logoUrl={data.logo[0]?.logo} />}
            <Fields />
            <Advantages />
            {data.contact && <Contact contactData={data.contact[0]} />}
          </main>
          <Footer logoUrl={data.logo[0]?.logo} />
        </div>
      )}
    </>
  );
};

export default App;