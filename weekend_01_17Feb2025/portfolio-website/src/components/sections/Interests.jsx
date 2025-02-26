import React, { useState } from 'react';
import { Home, Map, BookOpen, Code, Music, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const Interests = () => {
  const [activeTab, setActiveTab] = useState('travel');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Interest categories
  const interestCategories = [
    {
      id: 'travel',
      title: 'Travel Adventures',
      icon: <Map className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      description: 'Exploring new places, experiencing different cultures and creating unforgettable memories.'
    },
    {
      id: 'reading',
      title: 'Reading',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-amber-500 to-amber-600',
      description: 'Expanding my knowledge and perspective through books across various genres.'
    },
    {
      id: 'coding',
      title: 'Coding',
      icon: <Code className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      description: "Building innovative solutions and pushing the boundaries of what is possible with code."
    },
    {
      id: 'music',
      title: 'Guitar',
      icon: <Music className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
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
  React.useEffect(() => {
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

  // Render appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'travel':
        const destinations = interestContent.travel.destinations;
        return (
          <div className="mt-12">
            {/* Image carousel */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 max-w-5xl mx-auto">
              <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio container */}
                <img
                  src={destinations[currentImageIndex].image}
                  alt={destinations[currentImageIndex].name}
                  className="absolute inset-0 w-full h-full object-contain bg-gray-900"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/1200x675?text=${destinations[currentImageIndex].name}`;
                  }}
                />

                {/* Fullscreen button */}
                <button
                  onClick={() => toggleFullscreen(destinations[currentImageIndex].image)}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-blue-600 transition-colors z-10"
                  aria-label="View fullscreen"
                >
                  <Maximize2 size={20} />
                </button>

                {/* Destination info overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{destinations[currentImageIndex].name}</h3>
                  <p className="text-gray-200 text-lg max-w-3xl">{destinations[currentImageIndex].description}</p>
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={() => navigateImages('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-blue-600 transition-colors"
                aria-label="Previous destination"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={() => navigateImages('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-blue-600 transition-colors"
                aria-label="Next destination"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Destination thumbnails */}
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 max-w-5xl mx-auto">
              {destinations.map((destination, index) => (
                <button
                  key={destination.name}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-blue-500 shadow-lg shadow-blue-500/20 scale-105"
                      : "border-gray-700 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View ${destination.name}`}
                >
                  <div className="aspect-square relative">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/120x120?text=${destination.name}`;
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'reading':
        const books = interestContent.reading.books;
        return (
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {books.map((book) => (
                <div
                  key={book.title}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl hover:border-amber-500 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="relative pt-[75%] overflow-hidden"> {/* 4:3 aspect ratio container */}
                    <img
                      src={book.image}
                      alt={book.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/400x300?text=${book.title}`;
                      }}
                    />
                    <button
                      onClick={() => toggleFullscreen(book.image)}
                      className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-amber-600 transition-colors"
                      aria-label="View fullscreen"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-1">{book.title}</h3>
                    <p className="text-amber-400 mb-4">by {book.author}</p>
                    <p className="text-gray-300">{book.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'coding':
        const projects = interestContent.coding.projects;
        return (
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl hover:border-green-500 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="relative pt-[66.666%] overflow-hidden"> {/* 3:2 aspect ratio container */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/400x300?text=${project.title}`;
                      }}
                    />
                    <button
                      onClick={() => toggleFullscreen(project.image)}
                      className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-green-600 transition-colors"
                      aria-label="View fullscreen"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'music':
        const journey = interestContent.music.journey;
        return (
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
              <div className="md:flex">
                <div className="md:w-1/2 relative">
                  <div className="relative pt-[75%] md:pt-0 md:h-full">
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
                <div className="md:w-1/2 p-8 flex items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">My Musical Journey</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">{journey.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="interests" className="py-32 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-gray-900/0"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900/0 to-gray-900/0"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-10 relative z-10">
        {/* Home Navigation Button */}
        <div className="flex justify-start mb-16">
          <a
            href="#hero"
            className="flex items-center px-8 py-4 text-xl font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 shadow-lg transition-all duration-300"
          >
            <Home className="w-6 h-6 mr-3" />
            Back to Home
          </a>
        </div>

        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block mb-8">
            Interests & Hobbies
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Beyond technology, these are the passions that inspire creativity and balance in my life
          </p>
          <div className="w-40 h-2 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-10 rounded-full"></div>
        </div>

        {/* Interest Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center p-2 bg-gray-800 rounded-xl shadow-xl">
            {interestCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveTab(category.id);
                  setCurrentImageIndex(0);
                }}
                className={`px-6 py-4 m-1 rounded-lg text-lg font-medium transition-all duration-300 flex items-center ${
                  activeTab === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {React.cloneElement(category.icon, { className: 'mr-2' })}
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active interest description */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <p className="text-xl text-gray-300">
            {interestCategories.find(cat => cat.id === activeTab)?.description}
          </p>
        </div>

        {/* Content for selected interest */}
        {renderContent()}
      </div>

      {/* Fullscreen image viewer */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={handleFullscreenBackdropClick}
        >
          <div className="relative max-w-screen-xl max-h-screen w-full h-full flex items-center justify-center">
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-red-600 p-3 rounded-full text-white transition-colors"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Interests;