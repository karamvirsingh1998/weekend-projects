import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ExternalLink, ArrowRight, ChevronLeft, ChevronRight, Code, Server, Database, Globe, Award, Shield, Search, X, Filter, Tag } from 'lucide-react';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [fullscreenProject, setFullscreenProject] = useState(null);
  const containerRef = useRef(null);

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

  // Project categories with icons
  const categories = [
    { id: 'all', label: 'All', icon: <Globe className="w-4 h-4" /> },
    { id: 'ai-agents', label: 'AI Agents', icon: <Code className="w-4 h-4" /> },
    { id: 'voice-tech', label: 'Voice Tech', icon: <Server className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <Database className="w-4 h-4" /> }
  ];

  // Project data
  const projects = [
    {
      id: 1,
      title: 'MultiModal AI-Agentic Framework',
      company: 'UnifyApps',
      category: 'ai-agents',
      description: 'Architected a comprehensive framework integrating transformer-based models for cross-modal text, speech, and vision processing. The system successfully deployed across 10+ clients, seamlessly integrating their complex workflows.',
      impact: [
        'Achieved 1M+ in annual cost savings',
        '30% reduction in processing times',
        'Streamlined operations across multiple departments'
      ],
      technologies: ['LLMs', 'Transformers', 'MultiModal AI', 'Agentic Systems', 'RAG'],
      image: '/projects/multimodal-framework.png',
      accolades: 'Innovation Award 2024 at UnifyApps'
    },
    // ... other projects ...
    {
      id: 2,
      title: 'Voice-Enabled FAQ Chatbot',
      company: 'UnifyApps',
      category: 'voice-tech',
      description: 'Built an advanced voice-enabled FAQ chatbot with custom LLMs, RAG, ASR, and Query Refinement capabilities.',
      impact: [
        'Serving 50K+ monthly interactions',
        'Reduced customer support calls by 45%',
        'Improved user satisfaction ratings by 35%'
      ],
      technologies: ['ASR', 'TTS', 'LLMs', 'RAG', 'Query Refinement'],
      image: '/projects/voice-chatbot.png',
      accolades: 'Featured in AI Summit 2023'
    },
    {
      id: 3,
      title: 'Business Analytics Tool',
      company: 'UnifyApps',
      category: 'analytics',
      description: 'Engineered a sophisticated Business Analytics Tool utilizing Text-to-SQL models with domain-specific LLMs.',
      impact: [
        '92% accuracy on complex queries',
        'Support for multiple database schemas',
        'Reduced report generation time by 75%'
      ],
      technologies: ['Text-to-SQL', 'Domain-specific LLMs', 'Semantic Parsing'],
      image: '/projects/business-analytics.png',
      accolades: 'Best Enterprise Solution Award'
    },
    {
      id: 4,
      title: 'LLM Adapter Optimization',
      company: 'UnifyApps',
      category: 'ai-agents',
      description: 'Optimized distributed training workflows using LORA (Low-Rank Adaptation).',
      impact: [
        '15+ models served through adapters',
        '10+ fine-tuned models on shared GPUs',
        'Reduced serving costs by over 80%'
      ],
      technologies: ['LORA', 'LoRAX', 'Distributed Training', 'Model Quantization'],
      image: '/projects/llm-optimization.png',
      accolades: 'Technical Excellence Award'
    },
    {
      id: 5,
      title: 'Conversational AI Ecosystem',
      company: 'Sprinklr',
      category: 'voice-tech',
      description: 'Architected a comprehensive Conversational AI ecosystem integrating voicebot, chatbot, and real-time speech analysis.',
      impact: [
        'Achieved 50% call deflection rate',
        '50% reduction in call agent workforce',
        'Improved first-call resolution by 40%'
      ],
      technologies: ['ASR', 'TTS', 'LLM', 'Wav2vec2', 'Whisper'],
      image: '/projects/conversational-ai.png',
      accolades: 'Customer Experience Innovation Award'
    },
    {
      id: 6,
      title: 'High-Performance Inference System',
      company: 'Sprinklr',
      category: 'ai-agents',
      description: 'Refined system performance to handle 1500 RPS via model quantization, batching, and distributed inference.',
      impact: [
        '1500 RPS throughput capacity',
        'Maintained high accuracy despite optimization',
        'Reduced infrastructure costs by 60%'
      ],
      technologies: ['Model Quantization', 'Batching', 'Distributed Inference'],
      image: '/projects/inference-system.png',
      accolades: 'Performance Optimization Award'
    },
    {
      id: 7,
      title: 'Advanced TTS System',
      company: 'Sprinklr',
      category: 'voice-tech',
      description: 'Built an advanced Text-to-Speech system using VITS architecture with natural-sounding voice synthesis. This system provided human-like voice interactions for various client applications.',
      impact: [
        'Average MOS 4.6 (out of 5)',
        'Supported 12 languages and 30+ voices',
        'Reduced latency by 40% compared to previous system'
      ],
      technologies: ['VITS Architecture', 'Neural TTS', 'Voice Synthesis', 'Multi-lingual Support'],
      image: '/projects/tts-system.png',
      accolades: 'Voice Technology Innovation Award'
    },
    {
      id: 8,
      title: 'AI Support Bot',
      company: 'HighLevel',
      category: 'ai-agents',
      description: 'Worked with the Support Team on developing an ASK AI Support Bot for the entire platform to resolve queries of all agencies and sub-accounts. This system provided instant, accurate responses to customer questions.',
      impact: [
        '91% Relevancy rate',
        '94% Grounding accuracy',
        'Released successful Beta Version'
      ],
      technologies: ['LLMs', 'RAG', 'Query Understanding', 'Context Awareness'],
      image: '/projects/support-bot.png',
      accolades: 'Customer Support Solution Award'
    },
    {
      id: 9,
      title: 'Multi-Agent Routing System',
      company: 'HighLevel',
      category: 'ai-agents',
      description: 'Working with Conversations Team on revamping the agentic flows for Bots Across Vertical Domain utilizing Multi-Agent Routing. This intelligent routing system directs queries to the appropriate specialized agents.',
      impact: [
        'Improved overall accuracy from 75% to 92%',
        'Reduced response time by 65%',
        'Handling 20+ specialized domains'
      ],
      technologies: ['Multi-Agent Systems', 'Routing Algorithms', 'Intent Classification', 'Domain Specialization'],
      image: '/projects/multi-agent-routing.png',
      accolades: 'AI Architecture Excellence'
    },
    {
      id: 10,
      title: 'Content Generation Co-pilot',
      company: 'HighLevel',
      category: 'ai-agents',
      description: 'Working with Content Team to build Highly Co-pilot for generating Content Across Multiple Domains. This tool assists content creators with intelligent suggestions and automated content generation.',
      impact: [
        'Consolidated multiple platform integrations',
        'Reduced content creation time by 70%',
        'Supporting 15+ content verticals'
      ],
      technologies: ['LLMs', 'Content Generation', 'Domain Adaptation', 'Co-pilot Architecture'],
      image: '/projects/content-copilot.png',
    }
  ];

  // Filter projects based on category and search query
  const filteredProjects = projects.filter(project => {
    // Filter by category
    const categoryMatch = activeCategory === 'all' || project.category === activeCategory;

    // Filter by search query
    const searchLower = searchQuery.toLowerCase();
    const searchMatch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchLower));

    return categoryMatch && searchMatch;
  });

  // Update current project index when filters change
  React.useEffect(() => {
    setCurrentProjectIndex(0);
  }, [activeCategory, searchQuery]);

  // Project variants for animation
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  const [slideDirection, setSlideDirection] = useState(1);

  const handlePrevProject = () => {
    setSlideDirection(-1);
    setCurrentProjectIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNextProject = () => {
    setSlideDirection(1);
    setCurrentProjectIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
  };

  const openFullscreen = (project) => {
    setFullscreenProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-gray-900/0"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Sticky header with navigation and filters */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Back button and title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center justify-center p-3 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700"
            >
              <Home className="w-5 h-5 text-gray-300" />
            </button>
            <h2 className="text-3xl font-bold text-white">Projects</h2>
          </div>

          {/* Search and filters in dropdown on mobile */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 w-full pl-10 pr-4 py-2"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                showFilters || activeCategory !== 'all'
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-300'
              }`}
            >
              <Filter size={16} />
              <span>Filter</span>
              {activeCategory !== 'all' && (
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">1</span>
              )}
            </button>
          </div>
        </div>

        {/* Filter tags */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {React.cloneElement(category.icon, { size: 14 })}
                    {category.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProjects.length > 0 ? (
          <>
            {/* Featured project card */}
            <div className="mb-10 overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg" ref={containerRef}>
              <div className="relative h-[28rem]">
                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.div
                    key={filteredProjects[currentProjectIndex].id}
                    custom={slideDirection}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0"
                  >
                    <div className="grid md:grid-cols-2 h-full">
                      {/* Project image */}
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent z-10"></div>
                        <img
                          src={filteredProjects[currentProjectIndex].image}
                          alt={filteredProjects[currentProjectIndex].title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://via.placeholder.com/600x400?text=${filteredProjects[currentProjectIndex].title}`;
                          }}
                        />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                          <span className="bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-blue-400 font-medium">
                            {filteredProjects[currentProjectIndex].company}
                          </span>

                          {filteredProjects[currentProjectIndex].accolades && (
                            <div className="flex items-center gap-1 bg-amber-700/90 backdrop-blur-sm px-3 py-1 rounded-full">
                              <Award size={14} className="text-amber-200" />
                              <span className="text-white text-xs font-medium">{filteredProjects[currentProjectIndex].accolades}</span>
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-4 left-4 z-20">
                          <button
                            onClick={() => openFullscreen(filteredProjects[currentProjectIndex])}
                            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm text-white flex items-center gap-1.5"
                          >
                            <Maximize2 size={14} />
                            <span>Details</span>
                          </button>
                        </div>
                      </div>

                      {/* Project details */}
                      <div className="p-6 flex flex-col h-full overflow-auto">
                        <h3 className="text-2xl font-bold text-white mb-2">{filteredProjects[currentProjectIndex].title}</h3>
                        <p className="text-gray-300 text-base mb-4">{filteredProjects[currentProjectIndex].description}</p>

                        {/* Technologies */}
                        <div className="mb-4">
                          <h4 className="text-blue-400 text-sm font-medium mb-2 flex items-center gap-1.5">
                            <Code size={14} />
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {filteredProjects[currentProjectIndex].technologies.map(tech => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-blue-900/40 text-blue-300 rounded-md text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Impact section */}
                        <div className="mt-auto">
                          <h4 className="text-blue-400 text-sm font-medium mb-2 flex items-center gap-1.5">
                            <Shield size={14} />
                            Key Impact
                          </h4>
                          <ul className="space-y-1">
                            {filteredProjects[currentProjectIndex].impact.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-blue-500 mr-1.5 mt-1 text-xs">•</span>
                                <span className="text-gray-300 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                  <button
                    onClick={handlePrevProject}
                    className="p-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:bg-blue-600 transition-all"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNextProject}
                    className="p-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:bg-blue-600 transition-all"
                    aria-label="Next project"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Page indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-white text-sm">
                    {currentProjectIndex + 1} / {filteredProjects.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Project grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => openFullscreen(project)}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 cursor-pointer group hover:border-blue-500 transition-all"
                >
                  <div className="aspect-video relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/400x225?text=${project.title}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                    <div className="absolute top-2 right-2">
                      <span className="inline-block px-2 py-0.5 bg-gray-900/70 rounded text-xs text-gray-300 backdrop-blur-sm">
                        {project.company}
                      </span>
                    </div>
                    <div className="absolute inset-x-3 bottom-3 flex flex-col">
                      <h4 className="text-white font-medium text-sm line-clamp-1">{project.title}</h4>
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {project.technologies.slice(0, 2).map(tech => (
                          <span key={tech} className="px-1.5 py-0.5 bg-blue-900/40 text-blue-300 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 2 && (
                          <span className="px-1.5 py-0.5 bg-gray-700/60 text-gray-300 rounded text-xs">
                            +{project.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // No results state
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 text-center max-w-md mx-auto border border-gray-700">
            <Server className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-4 text-sm">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center mx-auto"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Show all projects
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen project modal */}
      <AnimatePresence>
        {fullscreenProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeFullscreen}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-auto border border-gray-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-gray-900">
                <img
                  src={fullscreenProject.image}
                  alt={fullscreenProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/1200x600?text=${fullscreenProject.title}`;
                  }}
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={closeFullscreen}
                    className="p-3 rounded-full bg-gray-900/60 backdrop-blur-sm text-white hover:bg-gray-700"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-gray-900/70 backdrop-blur-sm rounded-full text-blue-400 font-medium inline-flex items-center gap-1">
                    <Tag size={14} />
                    {fullscreenProject.category.replace('-', ' ')}
                  </span>
                  <span className="px-3 py-1 bg-gray-900/70 backdrop-blur-sm rounded-full text-white font-medium inline-flex items-center gap-1">
                    <Briefcase size={14} />
                    {fullscreenProject.company}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-white">{fullscreenProject.title}</h3>
                  {fullscreenProject.accolades && (
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 px-3 py-1.5 rounded-full">
                      <Award size={16} className="text-amber-200" />
                      <span className="text-white text-sm font-medium">{fullscreenProject.accolades}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-lg mb-8">{fullscreenProject.description}</p>

                <div className="grid sm:grid-cols-2 gap-8">
                  {/* Impact section */}
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Key Impact
                    </h4>
                    <ul className="space-y-2">
                      {fullscreenProject.impact.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {fullscreenProject.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-blue-900/40 text-blue-300 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Maximize2 = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="15 3 21 3 21 9"></polyline>
    <polyline points="9 21 3 21 3 15"></polyline>
    <line x1="21" y1="3" x2="14" y2="10"></line>
    <line x1="3" y1="21" x2="10" y2="14"></line>
  </svg>
);

const Briefcase = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

export default Projects;