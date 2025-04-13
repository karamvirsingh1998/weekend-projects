import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, Filter, ArrowRight, Home, Search, Calendar, Clock, Award, Bookmark, ChevronRight } from 'lucide-react';

// Enhanced Knowledge Sharing Component with premium UI
const KnowledgeSharing = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeItem, setActiveItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Combined data for all items
  const items = [
    // Publication
    {
      id: 1,
      type: 'publication',
      title: "Advancing Educational Insights: Explainable AI Models for Informed Decision Making",
      source: "International Journal of Research in Applied Science & Engineering Technology",
      date: "2023",
      description: "This research explores how explainable AI models can enhance educational decision-making processes by providing transparent insights and interpretable outcomes.",
      link: "https://www.ijraset.com/best-journal/advancing-educational-insights-explainable-ai-models-for-informed-decision-making",
      image: "/citations/paper1.png",
      tags: ["Explainable AI", "Education", "Decision Making"]
    },
    // Blogs
    {
      id: 2,
      type: 'blog',
      title: "Encoding vs Embedding Models: Both Output Numbers, Different Stories",
      source: "Medium",
      date: "Jan 15, 2025",
      description: "An in-depth exploration of the fundamental differences between encoding and embedding models in AI, clarifying how these seemingly similar processes serve vastly different purposes.",
      link: "https://medium.com/@karamvirhapal/encoding-vs-embedding-models-both-output-numbers-different-stories-5c85eced1801",
      image: "/citations/medium1.png",
      readTime: "8 min read",
      tags: ["AI", "Machine Learning", "NLP"]
    },
    {
      id: 3,
      type: 'blog',
      title: "Langflow vs LangGraph: A Comprehensive Guide to AI Application Development",
      source: "Medium",
      date: "Nov 20, 2024",
      description: "A detailed comparison between Langflow and LangGraph, two powerful frameworks for developing AI applications, highlighting their strengths, weaknesses, and ideal use cases.",
      link: "https://medium.com/@karamvirhapal/langflow-vs-langgraph-a-comprehensive-guide-to-ai-application-development-aca306bb5c31",
      image: "/citations/medium2.png",
      readTime: "10 min read",
      tags: ["Langflow", "LangGraph", "AI Development"]
    },
    // Courses
    {
      id: 4,
      type: 'course',
      title: "Deep Learning Specialization",
      source: "Coursera",
      instructor: "Andrew Ng",
      date: "2022",
      description: "Comprehensive specialization covering neural networks, deep learning, structuring ML projects, CNNs, and sequence models.",
      link: "https://www.coursera.org/account/accomplishments/specialization/certificate/FDDJVR77JGD7",
      image: "/citations/coursera.png",
      tags: ["Neural Networks", "Deep Learning", "CNN", "RNN", "TensorFlow"]
    },
    {
      id: 5,
      type: 'course',
      title: "Problem Solving Certificate",
      source: "HackerRank",
      date: "2020",
      description: "Certificate validating intermediate-level problem-solving skills in algorithms, data structures, and computational thinking.",
      link: "https://www.hackerrank.com/certificates/7f86be3fe508",
      image: "/citations/hackerrank.png",
      tags: ["Algorithms", "Data Structures", "Problem Solving"]
    },
    {
      id: 6,
      type: 'course',
      title: "Machine Learning A-Z",
      source: "Udemy",
      instructor: "Kirill Eremenko & Hadelin de Ponteves",
      date: "2019",
      description: "Comprehensive course covering all aspects of machine learning including regression, classification, clustering, and reinforcement learning.",
      link: "https://www.udemy.com/certificate/UC-L5MS4F1J/",
      image: "/citations/udemy.png",
      tags: ["Machine Learning", "Regression", "Classification", "Python"]
    }
  ];

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and search items
  const filteredItems = items
    .filter(item => filter === 'all' || item.type === filter)
    .filter(item => 
      searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  
  // Navigate to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  // Type-specific styling with enhanced colors
  const getTypeStyles = (type) => {
    switch(type) {
      case 'publication':
        return {
          badge: 'bg-gradient-to-r from-blue-500 to-blue-700 text-white',
          border: 'border-blue-500',
          tag: 'bg-blue-900/30 text-blue-300 border border-blue-500/30',
          icon: <BookOpen className="w-4 h-4 mr-1" />,
          gradientFrom: 'from-blue-600',
          gradientTo: 'to-blue-400'
        };
      case 'blog':
        return {
          badge: 'bg-gradient-to-r from-purple-500 to-purple-700 text-white',
          border: 'border-purple-500',
          tag: 'bg-purple-900/30 text-purple-300 border border-purple-500/30',
          icon: <Bookmark className="w-4 h-4 mr-1" />,
          gradientFrom: 'from-purple-600',
          gradientTo: 'to-purple-400'
        };
      case 'course':
        return {
          badge: 'bg-gradient-to-r from-green-500 to-green-700 text-white',
          border: 'border-green-500',
          tag: 'bg-green-900/30 text-green-300 border border-green-500/30',
          icon: <Award className="w-4 h-4 mr-1" />,
          gradientFrom: 'from-green-600',
          gradientTo: 'to-green-400'
        };
      default:
        return {
          badge: 'bg-gradient-to-r from-gray-600 to-gray-800 text-white',
          border: 'border-gray-500',
          tag: 'bg-gray-800 text-gray-300 border border-gray-600/30',
          icon: <Bookmark className="w-4 h-4 mr-1" />,
          gradientFrom: 'from-gray-600',
          gradientTo: 'to-gray-400'
        };
    }
  };

  // Animation classes for items
  const getAnimationClass = (index) => {
    return `animate-fade-in opacity-0 animation-delay-${index * 100}`;
  };

  return (
    <section id="publications" className="py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header with 3D effect */}
          <div className="mb-16 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                {/* Improved Home Button with hover effect */}
                <button
                  onClick={() => scrollToSection('hero')}
                  className="p-3 rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-700/50 transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg group"
                  aria-label="Back to home"
                >
                  <Home className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </button>
                
                <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 inline-block drop-shadow-2xl">
                  Knowledge Sharing
                </h2>
              </div>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Research publications, blog posts, and professional certifications that showcase my expertise in AI engineering.
              </p>
              <div className="w-32 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 mx-auto mt-8 rounded-full shadow-glow"></div>
            </div>
          </div>

          {/* Enhanced Search and Filter Container */}
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl blur-lg"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl">
              {/* Search input */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-2/3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search by title, description, or tags..." 
                    className="block w-full pl-10 pr-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-300 placeholder-gray-500 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Filter Pills with improved design */}
                <div className="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-1/3">
                  {['all', 'publication', 'blog', 'course'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilter(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        filter === type
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-glow-sm scale-105'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700/50'
                      }`}
                    >
                      {type === 'all' ? 'All' : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-6 text-gray-400 font-medium">
                Showing {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
                {filter !== 'all' && ` in ${filter}s`}
                {searchTerm && ` for "${searchTerm}"`}
              </div>

              {/* Enhanced Knowledge Items Grid */}
              {filteredItems.length === 0 ? (
                <div className="bg-gray-800/30 rounded-xl p-10 text-center border border-gray-700/50">
                  <p className="text-gray-400 text-lg">No items found matching your criteria. Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="grid gap-8 grid-cols-1">
                  {filteredItems.map((item, index) => {
                    const styles = getTypeStyles(item.type);
                    
                    return (
                      <div 
                        key={item.id}
                        className={`group bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-opacity-100 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-${styles.gradientFrom}/10 ${getAnimationClass(index)}`}
                        onMouseEnter={() => setActiveItem(item.id)}
                        onMouseLeave={() => setActiveItem(null)}
                      >
                        <div className="md:flex relative">
                          {/* Gradient overlay on hover */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                          
                          {/* Image container with enhanced styling */}
                          <div className="md:w-1/3 lg:w-1/4 h-60 md:h-auto overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://via.placeholder.com/400x400?text=${item.type}`;
                              }}
                            />
                            {/* Enhanced Type Badge */}
                            <div className="absolute top-4 left-4 z-20">
                              <span className={`px-4 py-1.5 rounded-lg text-sm font-medium ${styles.badge} shadow-lg flex items-center`}>
                                {styles.icon}
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </span>
                            </div>
                          </div>

                          <div className="md:w-2/3 lg:w-3/4 p-6 md:p-8 relative">
                            <div className="flex flex-col justify-between h-full">
                              <div>
                                <div className="mb-4">
                                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">{item.title}</h3>
                                  
                                  {/* Source and date with icons */}
                                  <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mt-2">
                                    <span className="flex items-center">
                                      <BookOpen className="w-4 h-4 mr-1" />
                                      {item.source}
                                    </span>
                                    <span className="flex items-center">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      {item.date}
                                    </span>
                                    {item.readTime && (
                                      <span className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {item.readTime}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <p className="text-gray-300 mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{item.description}</p>

                                {/* Enhanced Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                  {item.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className={`px-3 py-1 rounded-lg text-xs font-medium ${styles.tag} transition-all duration-300 hover:scale-105`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Enhanced Link Button */}
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center px-4 py-2 rounded-lg bg-gray-900/80 hover:bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium border border-gray-700 group-hover:border-opacity-0 group-hover:shadow-lg`}
                              >
                                {item.type === 'publication' ? 'Read Publication' : 
                                item.type === 'blog' ? 'Read on Medium' : 'View Certificate'}
                                <ChevronRight size={16} className="ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* Enhanced Call-to-action */}
          <div className="mt-16 flex justify-center">
            <a
              href="https://medium.com/@karamvirhapal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg transition-all duration-300 hover:shadow-glow hover:scale-105 font-medium text-base relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-90 transition-opacity duration-500 transform translate-x-full group-hover:translate-x-0"></span>
              <span className="relative z-10 flex items-center">
                View More Content
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        
        .shadow-glow {
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
        }
        
        .shadow-glow-sm {
          box-shadow: 0 0 10px rgba(96, 165, 250, 0.3);
        }
        
        .loader {
          border: 4px solid rgba(96, 165, 250, 0.1);
          border-radius: 50%;
          border-top: 4px solid rgba(96, 165, 250, 0.8);
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default KnowledgeSharing;