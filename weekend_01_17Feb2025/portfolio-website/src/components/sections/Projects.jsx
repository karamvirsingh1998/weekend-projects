import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ExternalLink, ArrowRight, ChevronLeft, ChevronRight, Code, Server, Database, Globe, Award, Shield, Search } from 'lucide-react';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);

  // Project categories with icons
  const categories = [
    { id: 'all', label: 'All Projects', icon: <Globe className="w-4 h-4" /> },
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
    {
      id: 2,
      title: 'Voice-Enabled FAQ Chatbot',
      company: 'UnifyApps',
      category: 'voice-tech',
      description: 'Built an advanced voice-enabled FAQ chatbot with custom LLMs, RAG, ASR, and Query Refinement capabilities. This interactive system provided intuitive user experiences for customers seeking information.',
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
      description: 'Engineered a sophisticated Business Analytics Tool utilizing Text-to-SQL models with domain-specific LLMs and semantic parsing. This system enabled non-technical users to generate complex database queries through natural language input.',
      impact: [
        '92% accuracy on complex queries',
        'Support for multiple database schemas',
        'Reduced report generation time by 75%'
      ],
      technologies: ['Text-to-SQL', 'Domain-specific LLMs', 'Semantic Parsing', 'Database Integration'],
      image: '/projects/business-analytics.png',
      accolades: 'Best Enterprise Solution Award'
    },
    {
      id: 4,
      title: 'LLM Adapter Optimization',
      company: 'UnifyApps',
      category: 'ai-agents',
      description: 'Optimized distributed training workflows using LORA (Low-Rank Adaptation) and incorporated LoRAX to enable efficient adapter loading. This innovation significantly improved model deployment efficiency and performance.',
      impact: [
        '15+ models served through adapters',
        '10+ fine-tuned models on shared GPUs',
        'Reduced serving costs by over 80%'
      ],
      technologies: ['LORA', 'LoRAX', 'Distributed Training', 'Model Quantization', 'GPU Optimization'],
      image: '/projects/llm-optimization.png',
      accolades: 'Technical Excellence Award'
    },
    {
      id: 5,
      title: 'Conversational AI Ecosystem',
      company: 'Sprinklr',
      category: 'voice-tech',
      description: 'Architected a comprehensive Conversational AI ecosystem integrating voicebot, chatbot, real-time speech analysis, and advanced analytics. This system transformed customer service operations for enterprise clients.',
      impact: [
        'Achieved 50% call deflection rate',
        '50% reduction in call agent workforce',
        'Improved first-call resolution by 40%'
      ],
      technologies: ['ASR', 'TTS', 'LLM', 'Wav2vec2', 'Whisper', 'Transformer Architectures'],
      image: '/projects/conversational-ai.png',
      accolades: 'Customer Experience Innovation Award'
    },
    {
      id: 6,
      title: 'High-Performance Inference System',
      company: 'Sprinklr',
      category: 'ai-agents',
      description: 'Refined system performance to handle 1500 RPS (Request-per-Second) via model quantization, batching, and distributed inference. This high-throughput system maintained high accuracy while minimizing computational resources.',
      impact: [
        '1500 RPS throughput capacity',
        'Maintained high accuracy despite optimization',
        'Reduced infrastructure costs by 60%'
      ],
      technologies: ['Model Quantization', 'Batching', 'Distributed Inference', 'Load Balancing'],
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

  // Set active project when filtered projects change
  React.useEffect(() => {
    setCurrentProjectIndex(0);
  }, [activeCategory, searchQuery]);

  // Handle next/prev navigation
  const handlePrevProject = () => {
    setCurrentProjectIndex((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) =>
      prev === filteredProjects.length - 1 ? 0 : prev + 1
    );
  };

  // Project showcase variants
  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const [slideDirection, setSlideDirection] = useState(1);

  // Handle project navigation with direction effect
  const navigateToProject = (index) => {
    setSlideDirection(index > currentProjectIndex ? 1 : -1);
    setCurrentProjectIndex(index);
  };

  return (
    <section id="projects" className="py-32 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
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
            Featured Projects
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Showcase of innovative solutions I've developed throughout my career
          </p>
          <div className="w-40 h-2 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-10 rounded-full"></div>
        </div>

        {/* Search and filter controls */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            {/* Search bar */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 text-white text-lg rounded-xl focus:ring-2 focus:ring-blue-500 block w-full pl-10 p-4"
                placeholder="Search projects or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-xl text-lg font-medium transition-all flex items-center ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {React.cloneElement(category.icon, { className: 'mr-2' })}
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            {/* Featured project showcase */}
            <div className="relative overflow-hidden h-full" ref={containerRef}>
              <AnimatePresence initial={false} custom={slideDirection}>
                <motion.div
                  key={filteredProjects[currentProjectIndex].id}
                  custom={slideDirection}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="w-full"
                >
                  <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                    <div className="md:flex">
                      {/* Project image */}
                      <div className="md:w-2/5 relative">
                        <div className="aspect-[4/3] bg-gray-900">
                          <img
                            src={filteredProjects[currentProjectIndex].image}
                            alt={filteredProjects[currentProjectIndex].title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              const project = filteredProjects[currentProjectIndex];
                              e.target.src = `https://via.placeholder.com/600x450?text=${project.title}`;
                            }}
                          />
                          {/* Company badge */}
                          <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-blue-400 font-medium">{filteredProjects[currentProjectIndex].company}</span>
                          </div>
                          {/* Accolade badge (if exists) */}
                          {filteredProjects[currentProjectIndex].accolades && (
                            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-2 rounded-full flex items-center">
                              <Award className="w-4 h-4 mr-2 text-white" />
                              <span className="text-white text-sm font-medium">{filteredProjects[currentProjectIndex].accolades}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project details */}
                      <div className="md:w-3/5 p-8">
                        <h3 className="text-3xl font-bold text-white mb-3">{filteredProjects[currentProjectIndex].title}</h3>
                        <p className="text-gray-300 text-lg mb-6">{filteredProjects[currentProjectIndex].description}</p>

                        {/* Impact section */}
                        <div className="mb-6">
                          <h4 className="text-blue-400 font-semibold mb-3 flex items-center">
                            <Shield className="w-5 h-5 mr-2" />
                            Key Impact
                          </h4>
                          <ul className="space-y-2">
                            {filteredProjects[currentProjectIndex].impact.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span className="text-gray-300">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="mb-4">
                          <h4 className="text-blue-400 font-semibold mb-3 flex items-center">
                            <Code className="w-5 h-5 mr-2" />
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {filteredProjects[currentProjectIndex].technologies.map(tech => (
                              <span
                                key={tech}
                                className="px-3 py-1.5 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={() => {
                  setSlideDirection(-1);
                  handlePrevProject();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 backdrop-blur-sm p-4 rounded-full shadow-lg text-white border border-gray-700 hover:bg-blue-600 transition-all z-20"
                aria-label="Previous project"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={() => {
                  setSlideDirection(1);
                  handleNextProject();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 backdrop-blur-sm p-4 rounded-full shadow-lg text-white border border-gray-700 hover:bg-blue-600 transition-all z-20"
                aria-label="Next project"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Project navigation dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {filteredProjects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => navigateToProject(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentProjectIndex
                      ? 'bg-blue-500 w-6'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Projects thumbnail grid */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="bg-blue-500/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Globe className="w-5 h-5 text-blue-400" />
                </span>
                All Projects ({filteredProjects.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    onClick={() => navigateToProject(index)}
                    className={`bg-gray-800 rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 ${
                      index === currentProjectIndex
                        ? 'border-blue-500 shadow-lg'
                        : 'border-gray-700 hover:border-blue-400'
                    }`}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <h4 className="text-white font-bold truncate">{project.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // No results state
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-12 text-center max-w-2xl mx-auto border border-gray-700">
            <Server className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium flex items-center mx-auto"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;