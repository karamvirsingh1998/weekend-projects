// src/App.jsx
import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/layout/LoadingScreen';
import SectionWrapper from './components/SectionWrapper';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import ResearchPapers from './components/sections/ResearchPapers';
import Interests from './components/sections/Interests';
import Ideas from './components/sections/Ideas';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
          {/* Hero section (with integrated navigation) */}
          <SectionWrapper id="hero" isHero={true}>
            <Hero />
          </SectionWrapper>

          {/* Other sections */}
          <SectionWrapper id="about">
            <About />
          </SectionWrapper>
          <SectionWrapper id="projects">
            <Projects />
          </SectionWrapper>
          <SectionWrapper id="skills">
            <Skills />
          </SectionWrapper>
          <SectionWrapper id="research">
            <ResearchPapers />
          </SectionWrapper>
          <SectionWrapper id="interests">
            <Interests />
          </SectionWrapper>
          <SectionWrapper id="ideas">
            <Ideas />
          </SectionWrapper>
          <SectionWrapper id="contact">
            <Contact />
          </SectionWrapper>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;