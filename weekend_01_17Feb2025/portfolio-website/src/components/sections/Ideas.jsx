import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Lightbulb, MessageCircle, Sparkles, Zap, Layers, HelpCircle, Briefcase, DollarSign, BarChart, Bot, ChevronDown, ChevronUp, Star, Circle } from 'lucide-react';

const Ideas = () => {
  const [expandedIdea, setExpandedIdea] = useState(null);
  const [hoverIdea, setHoverIdea] = useState(null);
  const containerRef = useRef(null);

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

  // Expand/collapse idea details
  const toggleIdea = (id) => {
    setExpandedIdea(expandedIdea === id ? null : id);

    // Scroll to the expanded idea
    if (expandedIdea !== id && containerRef.current) {
      setTimeout(() => {
        const element = document.getElementById(`idea-${id}`);
        if (element) {
          const container = containerRef.current;
          const elementPosition = element.offsetTop;
          const containerScrollTop = container.scrollTop;
          const containerHeight = container.clientHeight;

          if (elementPosition < containerScrollTop || elementPosition > containerScrollTop + containerHeight) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    }
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

  return (
    <section id="ideas" className="py-32 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-gray-900/0 to-gray-900/0"></div>
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
          <h2 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 inline-block mb-8">
            Future Innovations
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Exploring the intersection of imagination and possibility with these conceptual projects
          </p>
          <div className="w-40 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto mt-10 rounded-full"></div>
        </div>

        {/* Lightbulb decoration */}
        <div className="absolute top-40 left-0 text-yellow-500/5 transform -rotate-12">
          <Lightbulb size={400} strokeWidth={1} />
        </div>
        <div className="absolute bottom-40 right-0 text-amber-500/5 transform rotate-12">
          <Sparkles size={300} strokeWidth={1} />
        </div>

        {/* Ideas Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10" ref={containerRef}>
          {ideas.map((idea) => (
            <motion.div
              id={`idea-${idea.id}`}
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border shadow-xl transition-all duration-300 ${
                expandedIdea === idea.id
                  ? "border-yellow-500"
                  : hoverIdea === idea.id
                  ? "border-yellow-500/50"
                  : "border-gray-700"
              }`}
              onMouseEnter={() => setHoverIdea(idea.id)}
              onMouseLeave={() => setHoverIdea(null)}
            >
              {/* Card header */}
              <div
                className={`p-6 cursor-pointer ${
                  expandedIdea === idea.id
                    ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/10"
                    : "hover:bg-gray-700/50"
                }`}
                onClick={() => toggleIdea(idea.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-xl mr-4 ${
                      expandedIdea === idea.id
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-gray-700/80 text-gray-300"
                    }`}>
                      {React.cloneElement(idea.icon, { size: 24 })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{idea.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-gray-700/80 text-gray-300 rounded-full text-sm font-medium border border-gray-600">
                          {idea.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(idea.statusColor)}`}>
                          {idea.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    {expandedIdea === idea.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
                <p className="text-gray-300 mt-3">{idea.description}</p>
              </div>

              {/* Expandable content */}
              <AnimatePresence>
                {expandedIdea === idea.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      {/* Key features */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center">
                          <Layers className="w-5 h-5 mr-2" />
                          Key Features
                        </h4>
                        <ul className="space-y-2 pl-2">
                          {idea.details.map((detail, idx) => (
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
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white font-semibold flex items-center">
                            <Zap className="w-4 h-4 text-amber-400 mr-2" />
                            Challenge
                          </h4>
                          <p className="text-gray-400 ml-6">{idea.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold flex items-center">
                            <Star className="w-4 h-4 text-amber-400 mr-2" />
                            Potential Impact
                          </h4>
                          <p className="text-gray-400 ml-6">{idea.potentialImpact}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold flex items-center">
                            <Bot className="w-4 h-4 text-amber-400 mr-2" />
                            Implementation
                          </h4>
                          <p className="text-gray-400 ml-6">{idea.implementation}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <div className="max-w-3xl mx-auto mt-20 text-center">
          <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl p-8 backdrop-blur-sm border border-yellow-500/30">
            <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Have an innovative idea to collaborate on?</h3>
            <p className="text-gray-300 mb-8 text-lg">I'm always open to discussing new concepts and potential collaborations in AI, automation, and intelligent systems.</p>
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl font-medium inline-flex items-center transition-transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Let's Discuss Your Idea
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ideas;