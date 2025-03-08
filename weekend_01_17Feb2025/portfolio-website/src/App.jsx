// src/App.jsx with direct scroll control
import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/layout/LoadingScreen';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import ResearchPapers from './components/sections/BloggingPublications';
import Interests from './components/sections/Interests';
import Citations from './components/sections/Citations';
import Ideas from './components/sections/Ideas';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Function to handle navigation between sections
  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId);

    // Wait for state update and then scroll
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        // Get header height
        const headerHeight = 80; // Fixed header height

        // Scroll to the section with explicit offset
        window.scrollTo({
          top: section.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    }, 10);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle initial hash navigation when page loads
  useEffect(() => {
    if (!isLoading) {
      // Get section ID from hash or default to hero
      const hash = window.location.hash.replace('#', '') || 'hero';

      // Set active section without scrolling
      setActiveSection(hash);

      // Scroll to section after a brief delay
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          const headerHeight = 80;
          window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: 'auto' // Use auto for immediate positioning
          });
        }
      }, 200);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
          {/* Navigation Header - Pass navigation function */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection('hero');
                  }}
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  Portfolio
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                  {['Home', 'About', 'Projects', 'Skills', 'Research', 'Interests', 'Ideas', 'Contact'].map((item) => {
                    const sectionId = item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase();
                    return (
                      <button
                        key={sectionId}
                        onClick={() => navigateToSection(sectionId)}
                        className={`px-3 py-2 rounded-lg font-medium ${
                          activeSection === sectionId
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden p-2 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </nav>
          </header>

          {/* Content Sections with fixed top padding */}
          <div id="hero" className="pt-0 min-h-screen">
            <Hero navigateToSection={navigateToSection} />
          </div>

          <div id="about" className="pt-20 min-h-screen">
            <About navigateToSection={navigateToSection} />
          </div>

          <div id="skills" className="pt-20 min-h-screen">
            <Skills navigateToSection={navigateToSection} />
          </div>

          <div id="citations" className="pt-20 min-h-screen">
            <Citations navigateToSection={navigateToSection} />
          </div>

          <div id="projects" className="pt-20 min-h-screen">
            <Projects navigateToSection={navigateToSection} />
          </div>

          <div id="research" className="pt-20 min-h-screen">
            <ResearchPapers navigateToSection={navigateToSection} />
          </div>

          <div id="ideas" className="pt-20 min-h-screen">
            <Ideas navigateToSection={navigateToSection} />
          </div>

          <div id="interests" className="pt-20 min-h-screen">
            <Interests navigateToSection={navigateToSection} />
          </div>

          <div id="contact" className="pt-20 min-h-screen">
            <Contact navigateToSection={navigateToSection} />
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default App;