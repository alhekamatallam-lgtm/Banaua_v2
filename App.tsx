

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
import ScrollToTopButton from './components/ScrollToTopButton';

// Helper function that creates an image set from the API data.
const createImageSet = (originalUrl?: string, webpUrl?: string): ImageSet => {
    if (!originalUrl || typeof originalUrl !== 'string') {
        return { webp: '', original: '' };
    }
    return {
        webp: (webpUrl && webpUrl.trim() !== '') ? webpUrl : '',
        original: originalUrl,
    };
};


// --- Interfaces ---
export interface ImageSet {
    webp: string;
    original: string;
}

// Interfaces for the NEW API data structure
interface GalleryProjectItemFromAPI {
    public_id: string;
    secure_url: string;
    webp_url: string;
    format: string;
    tags: "exterior" | "enterior" | "Our_Proj" | string;
}

interface HeroItemFromAPI {
    public_id: string;
    secure_url: string;
    webp_url: string;
    format: string;
    tags: "hero";
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

interface ApiData {
  logo: LogoItemFromAPI[];
  about: AboutData[];
  contact: ContactData[];
  Banaua: HeroItemFromAPI[]; // New sheet for Hero images
  Our_Projects: GalleryProjectItemFromAPI[]; // Now only contains gallery projects
}

// Interfaces for Processed Data used by components
interface ProcessedLogoItem {
    logoSet: ImageSet;
    areaSet?: ImageSet;
}

export interface ProcessedOurProjectItem {
    link_photo_set: ImageSet;
    define: "Interior design" | "Exterior design" | "Our execution";
}

interface ProcessedApiData {
  hero_images: ImageSet[];
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
        const response = await fetch('https://script.google.com/macros/s/AKfycbwAN5ePyP6cvHZUoH93XAbPUCxPc3yXI0HpENPv-3As6fPKrcImZjGo3WA4a_8I3jAj/exec');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: { success: boolean; data: ApiData } = await response.json();
        
        if (result.success) {
          const apiData = result.data as any; // Use 'as any' for robust key access

          // 1. Process Hero images robustly, checking for different casings
          const heroImagesFromApi = apiData.Banaua || apiData.banaua || [];
          const heroImages = heroImagesFromApi.map((p: HeroItemFromAPI) => createImageSet(p.secure_url, p.webp_url));
          
          // Helper to map new tags to old 'define' categories more robustly
          const mapTagToDefine = (tag: string): ProcessedOurProjectItem['define'] => {
              // Make the logic more forgiving: handle potential string issues, trim whitespace, and convert to lowercase.
              const cleanTag = typeof tag === 'string' ? tag.trim().toLowerCase() : '';
              switch(cleanTag) {
                  case 'enterior': // Typo from original sheet, kept for compatibility.
                  case 'interior':
                      return 'Interior design';
                  case 'exterior':
                      return 'Exterior design';
                  case 'our_proj':
                      return 'Our execution';
                  default:
                      // CRUCIAL FALLBACK: If an image is in the 'Our_Projects' sheet but has an unrecognized or missing tag,
                      // we will assume it's a project and display it, instead of hiding it.
                      return 'Our execution';
              }
          }

          // 2. Process Gallery projects robustly with the new forgiving logic
          const galleryProjectsFromApi = apiData.Our_Projects || apiData.our_projects || [];
          const galleryProjects = galleryProjectsFromApi
            .map((p: GalleryProjectItemFromAPI) => {
                // Skip any entries that are malformed or missing a URL
                if (!p || !p.secure_url) return null;

                return {
                    link_photo_set: createImageSet(p.secure_url, p.webp_url),
                    define: mapTagToDefine(p.tags) // This will now always return a valid category
                };
            })
            .filter((p): p is ProcessedOurProjectItem => p !== null); // Filter out any null (malformed) entries


          const processedData: ProcessedApiData = {
              hero_images: heroImages,
              our_projects: galleryProjects,
              logo: (apiData.logo || []).map((item: LogoItemFromAPI) => ({
                logoSet: createImageSet(item.logo, item.logo_webp),
                areaSet: item.area ? createImageSet(item.area, item.area_webp) : undefined,
              })),
              about: apiData.about || [],
              contact: apiData.contact || [],
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
  
  return (
    <>
      <AnimatePresence>
        {loading && <LoadingSpinner />}
      </AnimatePresence>

      {data && (
        <div className="bg-[#F9F7F5] text-[#1A1A1A] antialiased">
          <Header logoSet={data.logo?.[0]?.logoSet} contactData={data.contact?.[0]} />
          <main>
            <Hero heroImages={data.hero_images} />
            {data.about?.[0] && data.logo?.[0] && <About aboutData={data.about[0]} logoSet={data.logo[0]?.logoSet} />}
            {data.about?.[0] && data.logo?.[0] && <VisionMission aboutData={data.about[0]} logoSet={data.logo[0]?.logoSet} />}
            <Fields />
            <Advantages />
            <OurWork logoSet={data.logo?.[0]?.logoSet} ourProjects={data.our_projects} />
            <Stats />
            <WorkAreas logoSet={data.logo?.[0]?.logoSet} areaImageSet={data.logo?.[0]?.areaSet} />
            {data.contact?.[0] && <Contact contactData={data.contact[0]} />}
          </main>
          <Footer logoSet={data.logo?.[0]?.logoSet} />
          <ScrollToTopButton />
        </div>
      )}
    </>
  );
};

export default App;