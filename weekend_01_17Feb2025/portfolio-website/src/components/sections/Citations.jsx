import React, { useState } from 'react';
import { Home, Linkedin, ExternalLink, X } from 'lucide-react';

const Citations = () => {
  // State for the image popup
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
          // Get header height for offset calculation
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          // Calculate the element's position
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          // Scroll with offset
          window.scrollTo({
              top: elementPosition - headerHeight,
              behavior: 'smooth'
              });
          }
      };

  // Citation data
  const citations = [
    {
      id: 1,
      image: '/citations/pavitar.png',
      name: 'Pavitar Singh',
      role: 'Founder and CEO (Unifyapps) , Ex-CTO (Sprinklr)',
      linkedIn: 'http://linkedin.com/in/pavitar/',
    },
    {
      id: 2,
      image: '/citations/yogin.png',
      name: 'Yogin Patel',
      role: 'Head of AI (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/yogin-patel-4ba55321/',
    },
    {
      id: 3,
      image: '/citations/sachin.png',
      name: 'Sachin Bhardwaj',
      role: 'Head of AI (UnifyApps)',
      linkedIn: 'https://www.linkedin.com/in/sachin-bharadwaj-3518881/',
    },
    {
      id: 4,
      image: '/citations/aayush.png',
      name: 'Aayush Kubba',
      role: 'Senior Director Data Science (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/aayushkubba/',
    },
    {
      id: 5,
      image: '/citations/eli.png',
      name: 'Elisabetta Carta',
      role: 'Senior Product Manager AI (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/elisabetta-carta/',
    },
    {
      id: 6,
      image: '/citations/navaneshwar.png',
      name: 'Navaneshwar Reddy',
      role: 'Director of Engineering (UnifyApps)',
      linkedIn: 'https://www.linkedin.com/in/navaneshwar-reddy/',
    },
    {
      id: 7,
      image: '/citations/krit.png',
      name: 'Akshat Goyal',
      role: 'Director of Product Management (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/goyalakshat28/',
    },
    {
      id: 8,
      image: '/citations/akshat.png',
      name: 'Krit Patel',
      role: 'Associate Director of Engineering (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/krit-patel-061731171/',
    },
    {
      id: 9,
      image: '/citations/manoj.png',
      name: 'Manoj Kumar',
      role: 'Head India Operations (Kryptoblocks)',
      linkedIn: 'https://www.linkedin.com/in/manoj-kumar-kayastha/',
    }
  ];

  // Function to open the image modal
  const openImageModal = (image, name) => {
    setSelectedImage({ url: image, name: name });
  };

  // Function to close the image modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Close modal when clicking outside of the image
  const handleModalClick = (e) => {
    if (e.target.id === 'imageModal') {
      closeImageModal();
    }
  };

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background decorations - static, no animations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900/10"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-purple-900/10"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-10 relative z-10">
        {/* Home Navigation Button */}


        {/* Section header - no animations */}
        <div className="text-center mb-20">
          <h2 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block mb-8">
            Testimonials
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Endorsements from professionals who have experienced the impact of my work
          </p>
          <div className="w-40 h-2 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-10 rounded-full"></div>
        </div>

        {/* Grid of all testimonials - no motion/animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {citations.map((citation) => (
            <div
              key={citation.id}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl flex flex-col h-full hover:border-blue-500 transition-colors duration-300"
            >
              {/* Screenshot - fixed height container for consistent appearance */}
              <div
                className="h-64 overflow-hidden bg-gray-900 cursor-pointer relative group"
                onClick={() => openImageModal(citation.image, citation.name)}
              >
                <img
                  src={citation.image}
                  alt={`Testimonial from ${citation.name}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x300?text=Testimonial';
                  }}
                />
                {/* Zoom indicator on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Person info - static, no hover effects that could cause flickering */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{citation.name}</h3>
                  <p className="text-blue-400 mb-4">{citation.role}</p>
                </div>

                <a
                  href={citation.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-medium text-sm mt-2 self-start"
                >
                  <Linkedin size={16} className="mr-2" />
                  View LinkedIn Profile
                  <ExternalLink size={14} className="ml-2 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          id="imageModal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleModalClick}
        >
          <div className="relative max-w-5xl w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-gray-800/80 p-2 rounded-full text-white hover:bg-red-600 transition-colors duration-300"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Modal image - without title overlay */}
            <div className="max-h-[90vh] overflow-auto">
              <img
                src={selectedImage.url}
                alt={`Testimonial from ${selectedImage.name}`}
                className="w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x600?text=Unable+to+Load+Image';
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Citations;