import React, { useState, useEffect } from 'react';
import { Home, Map, BookOpen, Code, Music, ChevronLeft, ChevronRight, Maximize2, X, Grid, Layout } from 'lucide-react';

const Interests = () => {
  const [activeTab, setActiveTab] = useState('travel');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [viewMode, setViewMode] = useState('carousel'); // 'gallery' or 'carousel'

  // Interest categories
  const interestCategories = [
    {
      id: 'travel',
      title: 'Travel Adventures',
      icon: <Map className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      hoverColor: 'hover:text-blue-400',
      accentColor: 'text-blue-400',
      borderColor: 'border-blue-500',
      description: 'Exploring new places, experiencing different cultures and creating unforgettable memories.'
    },
    {
      id: 'reading',
      title: 'Reading',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-amber-500 to-amber-600',
      hoverColor: 'hover:text-amber-400',
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-500',
      description: 'Expanding my knowledge and perspective through books across various genres.'
    },
    {
      id: 'coding',
      title: 'Coding',
      icon: <Code className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      hoverColor: 'hover:text-green-400',
      accentColor: 'text-green-400',
      borderColor: 'border-green-500',
      description: "Building innovative solutions and pushing the boundaries of what is possible with code."
    },
    {
      id: 'music',
      title: 'Guitar',
      icon: <Music className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      hoverColor: 'hover:text-purple-400',
      accentColor: 'text-purple-400',
      borderColor: 'border-purple-500',
      description: 'Learning to play guitar and exploring the joy of creating music.'
    }
  ];

  // Content for each interest
  const interestContent = {
    travel: {
      destinations: [
        {
          name: 'Dubai',
          image: '/interests/dubai.jpeg',
          description: 'Exploring the blend of modern architecture and rich cultural heritage in Dubai.'
        },
        {
          name: 'Singapore',
          image: '/interests/singapore.jpeg',
          description: 'Experiencing the perfect harmony of nature and urban development in Singapore.'
        },
        {
          name: 'Spiti Valley',
          image: '/interests/spiti.jpeg',
          description: 'Discovering the untouched beauty and serenity of Spiti Valley.'
        },
        {
          name: 'Manali',
          image: '/interests/manali.jpeg',
          description: 'Enjoying the breathtaking mountain views and adventure sports in Manali.'
        },
        {
          name: 'Hyderabad',
          image: '/interests/hyderabad.jpeg',
          description: 'Savoring the historic charm and culinary delights of Hyderabad.'
        },
        {
          name: 'Delhi',
          image: '/interests/delhi.jpeg',
          description: 'Exploring the blend of heritage and modernity in Delhi.'
        },
        {
          name: 'Gurgaon',
          image: '/interests/gurgaon.jpeg',
          description: 'Experiencing the dynamic urban lifestyle and tech culture of Gurgaon.'
        },
        {
          name: 'Ladakh',
          image: '/interests/ladakh.jpeg',
          description: 'Witnessing the majestic landscapes and pristine beauty of Ladakh.'
        },
        {
          name: 'Goa',
          image: '/interests/goa.jpeg',
          description: 'Relaxing on the beautiful beaches and enjoying the vibrant culture of Goa.'
        }
      ]
    },
    reading: {
      books: [
        {
          title: 'Rich Dad Poor Dad',
          author: 'Robert Kiyosaki',
          image: '/interests/richdad.png',
          description: 'A personal finance classic that challenges conventional wisdom about money and investing.'
        },
        {
          title: 'The Art of War',
          author: 'Sun Tzu',
          image: '/interests/artofwar.png',
          description: 'Ancient Chinese military treatise with timeless strategic wisdom applicable to various aspects of life.'
        },
        {
          title: 'Seven Habits of Highly Effective People',
          author: 'Stephen R. Covey',
          image: '/interests/sevenhabits.png',
          description: 'Powerful lessons in personal change and principles for effectiveness in life and business.'
        },
        {
          title: 'Harry Potter Series',
          author: 'J.K. Rowling',
          image: '/interests/harrypotter.png',
          description: 'The magical journey of Harry Potter and his friends that captivated millions worldwide.'
        },
        {
          title: 'The Girl in Room 105',
          author: 'Chetan Bhagat',
          image: '/interests/girlinroom.png',
          description: 'An unlove story that combines mystery, intrigue, and contemporary Indian society.'
        }
      ]
    },
    coding: {
      projects: [
        {
          title: 'AI Projects',
          image: '/interests/aiprojects.jpg',
          description: 'Building and experimenting with various AI models and applications.'
        },
        {
          title: 'Web Development',
          image: '/interests/webdev.jpg',
          description: 'Creating responsive and interactive web applications using modern frameworks.'
        },
        {
          title: 'Competitive Programming',
          image: '/interests/competitive.jpg',
          description: 'Solving algorithmic challenges to sharpen problem-solving skills.'
        }
      ]
    },
    music: {
      journey: {
        image: '/interests/guitar.jpg',
        description: 'Recently embarked on a musical journey, learning to play the guitar. Exploring various styles and techniques, from basic chords to more complex arrangements. Music provides a creative outlet and balance to my technical pursuits.'
      }
    }
  };

  // Navigation for image gallery
  const navigateImages = (direction) => {
    const content = interestContent[activeTab];
    const items = activeTab === 'travel' ? content.destinations :
                 activeTab === 'reading' ? content.books :
                 activeTab === 'coding' ? content.projects : null;

    if (!items) return;

    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % items.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  // Toggle fullscreen image view
  const toggleFullscreen = (imgSrc) => {
    if (fullscreenImage === imgSrc) {
      setFullscreenImage(null);
    } else {
      setFullscreenImage(imgSrc);
    }
  };

  // Close fullscreen on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setFullscreenImage(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Close fullscreen on click outside
  const handleFullscreenBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setFullscreenImage(null);
    }
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === 'gallery' ? 'carousel' : 'gallery');
  };

  // Get current content based on active tab
  const getCurrentItems = () => {
    switch (activeTab) {
      case 'travel': return interestContent.travel.destinations;
      case 'reading': return interestContent.reading.books;
      case 'coding': return interestContent.coding.projects;
      default: return [];
    }
  };

  // Get current active category
  const activeCategory = interestCategories.find(cat => cat.id === activeTab);

  // Get current items
  const currentItems = getCurrentItems();

  // Render carousel view
  const renderCarouselView = () => {
    const currentItem = activeTab === 'music'
      ? {
          title: 'My Musical Journey',
          image: interestContent.music.journey.image,
          description: interestContent.music.journey.description
        }
      : currentItems[currentImageIndex];

    if (!currentItem) return null;

    return (
      <div className="rounded-xl overflow-hidden bg-gray-800 shadow-2xl border border-gray-700">
        <div className="relative">
          {/* Image container with proper aspect ratio preservation */}
          <div className="relative h-96">
            <img
              src={currentItem.image}
              alt={currentItem.name || currentItem.title}
              className="absolute inset-0 w-full h-full object-contain bg-gray-900"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/800x450?text=${currentItem.name || currentItem.title}`;
              }}
            />

            {/* Fullscreen button */}
            <button
              onClick={() => toggleFullscreen(currentItem.image)}
              className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-blue-600 transition-colors z-10"
              aria-label="View fullscreen"
            >
              <Maximize2 size={16} />
            </button>

            {/* Navigation buttons (only if multiple items) */}
            {activeTab !== 'music' && currentItems.length > 1 && (
              <>
                <button
                  onClick={() => navigateImages('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => navigateImages('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Info overlay */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white">
                {currentItem.name || currentItem.title}
              </h3>
              {activeTab === 'reading' && (
                <span className={`${activeCategory?.accentColor} text-sm`}>by {currentItem.author}</span>
              )}
            </div>
            <p className="text-gray-300">{currentItem.description}</p>

            {/* Pagination indicators */}
            {activeTab !== 'music' && currentItems.length > 1 && (
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  {currentItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? activeCategory?.borderColor
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to item ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail scrollbar (only for non-music tabs with multiple items) */}
        {activeTab !== 'music' && currentItems.length > 1 && (
          <div className="bg-gray-900 border-t border-gray-700 p-4">
            <div className="flex space-x-2 overflow-x-auto pb-2 px-2">
              {currentItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 rounded-md overflow-hidden transition-all ${
                    index === currentImageIndex
                      ? `ring-2 ${activeCategory?.borderColor} shadow-lg scale-105`
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="w-16 h-16 relative">
                    <img
                      src={item.image}
                      alt={item.name || item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/80?text=${item.name || item.title}`;
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render gallery view
  const renderGalleryView = () => {
    if (activeTab === 'music') {
      const journey = interestContent.music.journey;
      return (
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
          <div className="sm:flex">
            <div className="sm:w-1/2 relative">
              <div className="relative h-64 sm:h-full">
                <img
                  src={journey.image}
                  alt="Guitar journey"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/600x400?text=Guitar+Journey";
                  }}
                />
                <button
                  onClick={() => toggleFullscreen(journey.image)}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-purple-600 transition-colors"
                  aria-label="View fullscreen"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
            <div className="sm:w-1/2 p-6">
              <h3 className="text-2xl font-bold text-white mb-4">My Musical Journey</h3>
              <p className="text-gray-300 leading-relaxed">{journey.description}</p>
            </div>
          </div>
        </div>
      );
    }

    // For travel, reading, coding
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item, index) => {
          const itemName = item.name || item.title;
          return (
            <div
              key={index}
              className={`bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-102 hover:${activeCategory?.borderColor}`}
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={itemName}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/400x300?text=${itemName}`;
                  }}
                />
                <button
                  onClick={() => toggleFullscreen(item.image)}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
                  aria-label="View fullscreen"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white truncate">{itemName}</h3>
                  {activeTab === 'reading' && (
                    <span className={`${activeCategory?.accentColor} text-xs`}>{item.author}</span>
                  )}
                </div>
                <p className="text-gray-300 text-sm line-clamp-2">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="interests" className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-gray-900/0"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900/0 to-gray-900/0"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header with home button and view toggle */}
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <a
              href="#hero"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 shadow transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </a>

            <h2 className="text-3xl md:text-4xl font-bold text-white order-first w-full sm:order-none sm:w-auto">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Interests & Hobbies
              </span>
            </h2>

            <button
              onClick={toggleViewMode}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 shadow transition-all duration-300"
            >
              {viewMode === 'gallery' ? (
                <>
                  <Layout className="w-4 h-4 mr-2" />
                  Carousel View
                </>
              ) : (
                <>
                  <Grid className="w-4 h-4 mr-2" />
                  Gallery View
                </>
              )}
            </button>
          </div>

          {/* Interest category tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center p-1 bg-gray-800 rounded-xl shadow-lg">
              {interestCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id);
                    setCurrentImageIndex(0);
                  }}
                  className={`m-1 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center
                    ${activeTab === category.id
                      ? `${category.color} text-white shadow-lg`
                      : `text-gray-400 ${category.hoverColor} hover:bg-gray-700`
                    }`}
                >
                  {React.cloneElement(category.icon, { className: 'mr-2' })}
                  {category.title}
                </button>
              ))}
            </div>

            {/* Interest description */}
            <div className="text-center mt-4 mb-8">
              <p className="text-gray-300">
                {activeCategory?.description}
              </p>
            </div>
          </div>

          {/* Content for selected interest */}
          {viewMode === 'gallery' ? renderGalleryView() : renderCarouselView()}
        </div>
      </div>

      {/* Fullscreen image viewer */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={handleFullscreenBackdropClick}
        >
          <div className="relative max-w-screen-xl max-h-screen w-full h-full flex items-center justify-center">
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-screen object-contain"
            />
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-red-600 p-3 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Interests;