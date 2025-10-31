
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import VisionMission from './components/VisionMission';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-[#F9F7F5] text-[#1A1A1A] antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <VisionMission />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
