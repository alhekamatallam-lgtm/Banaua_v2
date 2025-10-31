import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
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
  'عن بنايا هورايزون': string;
  'رؤيتنا': string;
  'رسالتنا': string;
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
          setData(result.data);
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="h-screen w-full flex items-center justify-center bg-[#F9F7F5] text-red-500 text-xl">حدث خطأ: {error}</div>;
  }

  return (
    <div className="bg-[#F9F7F5] text-[#1A1A1A] antialiased">
      <Header logoUrl={data?.logo[0]?.logo} />
      <main>
        <Hero heroData={data?.Banaua[0]} />
        {data?.Banaua && <Projects slides={data.Banaua} />}
        {data?.about && <About aboutData={data.about[0]} />}
        {data?.contact && <Contact contactData={data.contact[0]} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;