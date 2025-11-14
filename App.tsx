
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import VisionMission from './components/VisionMission';
import Fields from './components/Fields';
import Advantages from './components/Advantages';
import OurWork from './components/OurWork';
import Stats from './components/Stats';
import WorkAreas from './components/WorkAreas';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// New helper function that creates an image set from the API data.
// It prefers the pre-generated WebP URL but uses the original as a fallback.
const createImageSet = (originalUrl?: string, webpUrl?: string): ImageSet => {
    if (!originalUrl || typeof originalUrl !== 'string') {
        return { webp: '', original: '' };
    }
    return {
        webp: (webpUrl && webpUrl.trim() !== '') ? webpUrl : '',
        original: originalUrl,
    };
};


// --- Updated Interfaces ---
export interface ImageSet {
    webp: string;
    original: string;
}

// Define interfaces for the API data structure for type safety
interface BanauaItem {
  description: string;
  link: string;
  link_webp?: string;
}

interface LogoItemFromAPI {
  logo: string;
  logo_webp?: string;
  area?: string;
  area_webp?: string;
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

interface OurProjectItemFromAPI {
  link_photo: string;
  link_webp?: string;
  define: "Interior design" | "Exterior design" | "Our execution";
}

interface ApiData {
  Banaua: BanauaItem[];
  logo: LogoItemFromAPI[];
  about: AboutData[];
  contact: ContactData[];
  Our_Projects: OurProjectItemFromAPI[];
}


// --- Interfaces for Processed Data ---
interface ProcessedLogoItem {
    logoSet: ImageSet;
    areaSet?: ImageSet;
}

interface ProcessedBanauaItem {
    description: string;
    linkSet: ImageSet;
}

interface ProcessedOurProjectItem {
    link_photo_set: ImageSet;
    define: "Interior design" | "Exterior design" | "Our execution";
}

interface ProcessedApiData {
  Banaua: ProcessedBanauaItem[];
  logo: ProcessedLogoItem[];
  about: AboutData[];
  contact: ContactData[];
  our_projects: ProcessedOurProjectItem[];
}

const App: React.FC = () => {
  const [data, setData] = useState<ProcessedApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the new production API endpoint
        const response = await fetch('https://script.google.com/macros/s/AKfycbznMtSB-jzE8PEZ1J5-_obRQcOTZxbDn-pglLnKLfxgFpgNhulchTquW8sxxZxJAUl4/exec');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: { success: boolean; data: ApiData } = await response.json();
        
        if (result.success) {
          
          // Process projects with robust WebP logic
          const projectsFromApi = (result.data.Our_Projects || []).map((item: OurProjectItemFromAPI) => {
              // The primary URL is the webp link if it exists, otherwise the original photo link.
              // This addresses the issue where link_photo might be empty.
              const primaryUrl = (item.link_webp && item.link_webp.trim() !== '') ? item.link_webp : item.link_photo;
        
              return {
                  define: item.define,
                  // We use the primary URL for both 'webp' and 'original'. The <picture> element
                  // with type="image/webp" correctly triggers Cloudinary to serve the optimized format.
                  link_photo_set: createImageSet(primaryUrl, primaryUrl)
              };
          });
        
          // --- Data Patch ---
          const projectToPatch = projectsFromApi.find(p => p.link_photo_set.original.includes('i.ibb.co/w0Y8mY0/7.jpg'));
          if (projectToPatch && projectToPatch.define === "Our execution") {
            projectToPatch.define = "Exterior design";
          }
          // --- End of Patch ---

          const processedData: ProcessedApiData = {
              logo: (result.data.logo || []).map((item: LogoItemFromAPI) => ({
                logoSet: createImageSet(item.logo, item.logo_webp),
                areaSet: item.area ? createImageSet(item.area, item.area_webp) : undefined,
              })),
              about: result.data.about,
              contact: result.data.contact,
              Banaua: (result.data.Banaua || []).map((item: BanauaItem) => ({
                  description: item.description,
                  linkSet: createImageSet(item.link, item.link_webp)
              })),
              our_projects: projectsFromApi,
          };
          
          setData(processedData);

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
  
  const heroData = data?.Banaua[0];

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingSpinner />}
      </AnimatePresence>

      {data && (
        <div className="bg-[#F9F7F5] text-[#1A1A1A] antialiased">
          <Header logoSet={data.logo[0]?.logoSet} contactData={data.contact[0]} />
          <main>
            <Hero heroData={heroData} />
            {data.about && data.logo && <About aboutData={data.about[0]} logoSet={data.logo[0]?.logoSet} />}
            {data.about && data.logo && <VisionMission aboutData={data.about[0]} logoSet={data.logo[0]?.logoSet} />}
            <Fields />
            <Advantages />
            <OurWork logoSet={data.logo[0]?.logoSet} ourProjects={data.our_projects} />
            <Stats />
            <WorkAreas logoSet={data.logo[0]?.logoSet} areaImageSet={data.logo[0]?.areaSet} />
            {data.contact && <Contact contactData={data.contact[0]} />}
          </main>
          <Footer logoSet={data.logo[0]?.logoSet} />
        </div>
      )}
    </>
  );
};

export default App;
