import React, { useState } from 'react';
import { BookOpen, ExternalLink, Filter, ArrowRight, Home } from 'lucide-react';

// Knowledge Sharing Component - A unified academic portfolio display
const KnowledgeSharing = () => {
  const [filter, setFilter] = useState('all');
  
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

  // Filter items based on current filter
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.type === filter);
  
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

  // Type-specific styling
  const getTypeStyles = (type) => {
    switch(type) {
      case 'publication':
        return {
          badge: 'bg-blue-600 text-white',
          border: 'border-blue-500',
          tag: 'bg-blue-900/40 text-blue-300'
        };
      case 'blog':
        return {
          badge: 'bg-purple-600 text-white',
          border: 'border-purple-500',
          tag: 'bg-purple-900/40 text-purple-300'
        };
      case 'course':
        return {
          badge: 'bg-green-600 text-white',
          border: 'border-green-500',
          tag: 'bg-green-900/40 text-green-300'
        };
      default:
        return {
          badge: 'bg-gray-600 text-white',
          border: 'border-gray-500',
          tag: 'bg-gray-700 text-gray-300'
        };
    }
  };

  return (
    <section id="publications" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              {/* Home Button */}
              <button
                onClick={() => scrollToSection('hero')}
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
                aria-label="Back to home"
              >
                <Home className="w-5 h-5 text-gray-300" />
              </button>
              
              <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block">
                Knowledge Sharing
              </h2>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Research publications, blog posts, and professional certifications that showcase my expertise in AI engineering.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['all', 'publication', 'blog', 'course'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {type === 'all' ? 'All' : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
              </button>
            ))}
          </div>

          {/* Knowledge Items */}
          <div className="space-y-8">
            {filteredItems.map((item) => {
              const styles = getTypeStyles(item.type);
              
              return (
                <div 
                  key={item.id}
                  className={`bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:${styles.border} transition-all duration-300 shadow-md`}
                >
                  <div className="sm:flex">
                    <div className="sm:w-1/4 h-48 sm:h-auto overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/400x400?text=${item.type}`;
                        }}
                      />
                      {/* Type Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-md text-sm font-medium ${styles.badge}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="sm:w-3/4 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <p className="text-gray-400 text-sm mt-1">
                            {item.source} • {item.date}
                            {item.readTime && ` • ${item.readTime}`}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4">{item.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map(tag => (
                          <span
                            key={tag}
                            className={`px-2 py-1 rounded-md text-xs font-medium ${styles.tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Link */}
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                      >
                        {item.type === 'publication' ? 'Read Publication' : 
                         item.type === 'blog' ? 'Read on Medium' : 'View Certificate'}
                        <ExternalLink size={14} className="ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* More Content Links */}
          <div className="mt-16 flex justify-center">
            <a
              href="https://medium.com/@karamvirhapal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-all hover:opacity-90 font-medium text-sm"
            >
              View More Content
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeSharing;