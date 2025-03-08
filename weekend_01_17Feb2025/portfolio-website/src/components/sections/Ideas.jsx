import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Lightbulb, MessageCircle, Sparkles, Zap, Layers,
  HelpCircle, Briefcase, BarChart, Bot, Star, Circle,
  X, ChevronLeft, ChevronRight, ArrowRight
} from 'lucide-react';

const Ideas = () => {
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [hoverIdea, setHoverIdea] = useState(null);
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Ideas with enhanced data
  const ideas = [
    {
      id: 1,
      title: "Support Ticket Automation",
      description: "An intelligent system that automates support ticket resolution using data from previously solved tickets in the same domain.",
      category: "Enterprise AI",
      status: "Concept Phase",
      statusColor: "emerald",
      icon: <HelpCircle />,
      details: [
        "Analyzes patterns in previously resolved tickets to build a knowledge base",
        "Automatically resolves common issues without human intervention",
        "Escalates to human agents when confidence is low or when novel issues arise",
        "Ensures accurate responses with reliability verification",
        "Integrates with existing ticketing systems like Zendesk, Intercom, and Freshdesk"
      ],
      challenge: "Ensuring high accuracy while maintaining transparency about AI vs. human responses",
      potentialImpact: "Can reduce support workload by 60-70% while maintaining high customer satisfaction",
      implementation: "Requires RAG architecture, fine-tuned LLMs on domain-specific data, and integration APIs"
    },
    {
      id: 2,
      title: "Investment Portfolio Advisor",
      description: "A personalized financial tool that recommends optimal investment allocations based on user goals, risk tolerance, and market conditions.",
      category: "FinTech",
      status: "Research Phase",
      statusColor: "blue",
      icon: <BarChart />,
      details: [
        "Users input investment amount and financial goals",
        "System analyzes current market trends and historical performance",
        "Provides diversified investment recommendations across different asset classes",
        "Considers tax implications and fee structures",
        "Regularly rebalances portfolio based on market changes and goal progress"
      ],
      challenge: "Balancing algorithmic recommendations with regulatory compliance and risk disclosure",
      potentialImpact: "Democratizes financial advice and portfolio management for everyday investors",
      implementation: "Combines financial modeling, market data APIs, and personalization algorithms"
    },
    {
      id: 3,
      title: "WhatsApp Intelligence Assistant",
      description: "An AI-powered assistant integrated with WhatsApp that helps users search conversation history, find information, and connect with relevant contacts.",
      category: "Conversational AI",
      status: "Idea Validation",
      statusColor: "amber",
      icon: <MessageCircle />,
      details: [
        "Identifies contacts who can help with specific problems or questions",
        "Searches past messages to find relevant information quickly",
        "Analyzes conversation patterns to suggest relevant connections",
        "Maintains privacy by processing data locally when possible",
        "Integrates with both personal and business WhatsApp accounts"
      ],
      challenge: "Balancing privacy concerns with functionality and WhatsApp's API limitations",
      potentialImpact: "Transforms WhatsApp from a simple messaging app to a knowledge management tool",
      implementation: "Requires WhatsApp Business API, NLP for message understanding, and secure data handling"
    },
    {
      id: 4,
      title: "ML-Driven Contract Analyzer",
      description: "An intelligent system that automatically reviews legal contracts, highlighting potential issues and suggesting improvements.",
      category: "Legal Tech",
      status: "Early Planning",
      statusColor: "purple",
      icon: <Briefcase />,
      details: [
        "Scans contracts to identify problematic clauses or missing elements",
        "Compares against best practices and industry standards",
        "Provides risk assessment based on historical legal precedents",
        "Generates plain-language summaries of complex legal documents",
        "Adapts to different contract types and jurisdictions"
      ],
      challenge: "Ensuring legal accuracy while handling diverse document formats and legal frameworks",
      potentialImpact: "Could save thousands of billable hours and reduce legal risks for businesses",
      implementation: "Combines NLP, document understanding, and legal knowledge bases"
    },
    {
      id: 5,
      title: "Voice-First Developer Assistant",
      description: "A voice-controlled AI assistant specialized in helping developers write, debug, and optimize code through natural conversation.",
      category: "Developer Tools",
      status: "Vision Stage",
      statusColor: "pink",
      icon: <Zap />,
      details: [
        "Allows hands-free coding through voice commands and dictation",
        "Provides context-aware code suggestions and explanations",
        "Helps debug by analyzing error messages and suggesting fixes",
        "Integrates with IDEs and version control systems",
        "Adapts to individual coding style and preferences over time"
      ],
      challenge: "Creating a natural voice interface for the highly technical and precise domain of programming",
      potentialImpact: "Could transform developer workflows and make coding more accessible",
      implementation: "Requires advanced ASR, code generation models, and IDE integration capabilities"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "Enterprise AI": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      "FinTech": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Conversational AI": "bg-amber-500/20 text-amber-400 border-amber-500/30",
      "Legal Tech": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "Developer Tools": "bg-pink-500/20 text-pink-400 border-pink-500/30"
    };
    return colors[category] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const getIconBgColor = (category) => {
    const colors = {
      "Enterprise AI": "bg-emerald-500/20 text-emerald-400",
      "FinTech": "bg-blue-500/20 text-blue-400",
      "Conversational AI": "bg-amber-500/20 text-amber-400",
      "Legal Tech": "bg-purple-500/20 text-purple-400",
      "Developer Tools": "bg-pink-500/20 text-pink-400"
    };
    return colors[category] || "bg-gray-500/20 text-gray-400";
  };

  const getStatusColor = (color) => {
    const colors = {
      emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      pink: "bg-pink-500/20 text-pink-400 border-pink-500/30"
    };
    return colors[color] || colors.blue;
  };

  // Check if carousel needs navigation arrows
  useEffect(() => {
    const checkScrollPosition = () => {
      if (!carouselRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check

      // Check after images and content might have loaded
      setTimeout(checkScrollPosition, 500);

      return () => carousel.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  // Scroll the carousel
  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const { clientWidth } = carouselRef.current;
    const scrollAmount = clientWidth * 0.8;

    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section id="ideas" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-gray-900/0 to-gray-900/0"></div>
        <Lightbulb className="absolute top-40 left-20 text-yellow-500/10" size={200} strokeWidth={1} />
        <Sparkles className="absolute bottom-40 right-20 text-amber-500/10" size={150} strokeWidth={1} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Home Navigation Button */}


        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 inline-block mb-4">
            Future Innovations
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Exploring the intersection of imagination and possibility
          </p>
        </div>

        {/* Horizontal Carousel */}
        <div className="relative">
          {/* Left Navigation Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 backdrop-blur-sm p-3 rounded-full border border-gray-700 text-white shadow-lg hover:bg-gray-700 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Ideas Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto pb-8 pt-4 px-4 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {ideas.map((idea) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idea.id * 0.1 }}
                className={`snap-start flex-shrink-0 w-72 mx-3 bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden border shadow-xl transition-all duration-300 ${
                  hoverIdea === idea.id
                    ? "border-yellow-500/50 transform scale-105"
                    : "border-gray-700 hover:border-gray-500"
                }`}
                onMouseEnter={() => setHoverIdea(idea.id)}
                onMouseLeave={() => setHoverIdea(null)}
                onClick={() => setSelectedIdea(idea)}
              >
                <div className="p-5 h-full flex flex-col">
                  {/* Card Icon */}
                  <div className={`p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4 ${getIconBgColor(idea.category)}`}>
                    {React.cloneElement(idea.icon, { size: 24 })}
                  </div>

                  {/* Card Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{idea.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{idea.description}</p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(idea.category)}`}>
                        {idea.category}
                      </span>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(idea.statusColor)}`}>
                        {idea.status}
                      </span>
                    </div>
                    <button
                      className="w-full mt-2 px-4 py-2 bg-gray-700/60 hover:bg-yellow-600/20 border border-gray-600 hover:border-yellow-600/40 rounded-lg text-gray-300 hover:text-yellow-400 transition-colors flex items-center justify-center text-sm font-medium"
                    >
                      <span>View Details</span>
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Final CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="snap-start flex-shrink-0 w-72 mx-3 bg-gradient-to-br from-yellow-500/30 to-amber-600/20 backdrop-blur-sm rounded-xl overflow-hidden border border-yellow-500/30 shadow-xl flex items-center justify-center"
            >
              <div className="p-6 text-center">
                <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Have an idea?</h3>
                <p className="text-gray-300 mb-4 text-sm">Let's collaborate on your next innovation</p>
                <a
                  href="#contact"
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-medium inline-flex items-center transition-transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discuss Your Idea
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Navigation Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 backdrop-blur-sm p-3 rounded-full border border-gray-700 text-white shadow-lg hover:bg-gray-700 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Modal for Detailed View */}
        <AnimatePresence>
          {selectedIdea && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedIdea(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-gray-800 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-5 flex justify-between items-center z-10">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getIconBgColor(selectedIdea.category)}`}>
                      {React.cloneElement(selectedIdea.icon, { size: 20 })}
                    </div>
                    <h3 className="text-xl font-bold text-white">{selectedIdea.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedIdea(null)}
                    className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/50"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedIdea.category)}`}>
                      {selectedIdea.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedIdea.statusColor)}`}>
                      {selectedIdea.status}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6">{selectedIdea.description}</p>

                  {/* Key features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center">
                      <Layers className="w-5 h-5 mr-2" />
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
                      {selectedIdea.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-yellow-500 mr-2 mt-1.5">
                            <Circle size={6} fill="currentColor" />
                          </span>
                          <span className="text-gray-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Implementation details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700/30 p-4 rounded-xl">
                      <h4 className="text-white font-semibold flex items-center mb-2">
                        <Zap className="w-4 h-4 text-amber-400 mr-2" />
                        Challenge
                      </h4>
                      <p className="text-gray-400 text-sm">{selectedIdea.challenge}</p>
                    </div>
                    <div className="bg-gray-700/30 p-4 rounded-xl">
                      <h4 className="text-white font-semibold flex items-center mb-2">
                        <Star className="w-4 h-4 text-amber-400 mr-2" />
                        Potential Impact
                      </h4>
                      <p className="text-gray-400 text-sm">{selectedIdea.potentialImpact}</p>
                    </div>
                    <div className="bg-gray-700/30 p-4 rounded-xl">
                      <h4 className="text-white font-semibold flex items-center mb-2">
                        <Bot className="w-4 h-4 text-amber-400 mr-2" />
                        Implementation
                      </h4>
                      <p className="text-gray-400 text-sm">{selectedIdea.implementation}</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 text-center">
                    <a
                      href="#contact"
                      onClick={() => setSelectedIdea(null)}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl font-medium inline-flex items-center transition-transform hover:scale-105"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Discuss This Idea
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Ideas;