import React, { useState, useEffect, useMemo } from 'react';
import { Home, ExternalLink, ChevronLeft, ChevronRight, Code, Search, X, Filter, Tag } from 'lucide-react';

// Project data (moved outside component to prevent re-creation)
const projectsData = [
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
    image: '/projects/project.png'
  },
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
    image: '/projects/project_2.png'
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
    image: '/projects/project_2.png'
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
    image: '/projects/project_2.png'
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
    image: '/projects/project_2.png'
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
    image: '/projects/project_2.png'
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
    image: '/projects/project_2.png'
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
    image: '/projects/project_2.png'
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
    image: '/projects/project_2.png'
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
    image: '/projects/project_2.png',
  }
];

// Categories data
const categories = [
  { id: 'all', label: 'All', icon: <Home className="w-4 h-4" /> },
  { id: 'ai-agents', label: 'AI Agents', icon: <Code className="w-4 h-4" /> },
  { id: 'voice-tech', label: 'Voice Tech', icon: <ExternalLink className="w-4 h-4" /> },
  { id: 'analytics', label: 'Analytics', icon: <Tag className="w-4 h-4" /> }
];

// Main Project Card Component
const ProjectCard = ({ project, onClick }) => (
  <div
    className="bg-gray-800/80 rounded-lg overflow-hidden border border-gray-700 cursor-pointer group hover:border-blue-500 transition-all"
    onClick={() => onClick(project)}
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
        <span className="inline-block px-2 py-0.5 bg-gray-900/70 rounded text-xs text-gray-300">
          {project.company}
        </span>
      </div>
      <div className="absolute inset-x-3 bottom-3 flex flex-col">
        <h3 className="text-white font-medium text-sm line-clamp-1">{project.title}</h3>
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
    </div>
  </div>
);

// Featured Project Component
const FeaturedProject = ({ project, onNext, onPrev, currentIndex, totalCount, onViewDetails }) => (
  <div className="mb-10 overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-700 shadow-lg">
    <div className="grid md:grid-cols-2 h-[28rem]">
      {/* Project image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent z-10"></div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/600x400?text=${project.title}`;
          }}
        />

        {/* Company badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-gray-900/80 px-3 py-1 rounded-full text-sm text-blue-400 font-medium">
            {project.company}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 z-20">
          <button
            onClick={() => onViewDetails(project)}
            className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm text-white flex items-center gap-1.5"
          >
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Project details */}
      <div className="p-6 flex flex-col h-full overflow-auto">
        <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
        <p className="text-gray-300 text-base mb-4">{project.description}</p>

        {/* Technologies */}
        <div className="mb-4">
          <h3 className="text-blue-400 text-sm font-medium mb-2 flex items-center gap-1.5">
            <Code size={14} />
            Technologies
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map(tech => (
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
          <h3 className="text-blue-400 text-sm font-medium mb-2">
            Key Impact
          </h3>
          <ul className="space-y-1">
            {project.impact.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-500 mr-1.5 mt-1 text-xs">•</span>
                <span className="text-gray-300 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    
    {/* Navigation arrows */}
    <div className="absolute bottom-4 right-4 z-20 flex gap-2">
      <button
        onClick={onPrev}
        className="p-2 rounded-full bg-gray-800/80 border border-gray-700 hover:bg-blue-600"
        aria-label="Previous project"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={onNext}
        className="p-2 rounded-full bg-gray-800/80 border border-gray-700 hover:bg-blue-600"
        aria-label="Next project"
      >
        <ChevronRight size={18} />
      </button>
    </div>

    {/* Page indicator */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-gray-900/80 px-3 py-1 rounded-full">
      <span className="text-white text-sm">
        {currentIndex + 1} / {totalCount}
      </span>
    </div>
  </div>
);

// Project Details Modal Component
const ProjectModal = ({ project, onClose }) => (
  <div 
    className="fixed inset-0 z-50 bg-gray-900/95 flex items-center justify-center p-4 overflow-auto"
    onClick={onClose}
  >
    <div 
      className="bg-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-auto border border-gray-700 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative aspect-video bg-gray-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/1200x600?text=${project.title}`;
          }}
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-gray-900/60 text-white hover:bg-gray-700"
          >
            <X size={18} />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gray-900/70 rounded-full text-white font-medium">
            {project.company}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">{project.title}</h2>
        <p className="text-gray-300 text-lg mb-6">{project.description}</p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Impact section */}
          <div>
            <h3 className="text-blue-400 font-semibold mb-3">
              Key Impact
            </h3>
            <ul className="space-y-2">
              {project.impact.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-blue-400 font-semibold mb-3">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
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
    </div>
  </div>
);

// Projects Section Component
const Projects = () => {
  // State with fewer variables
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    showFilters: false
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects based on category and search query - memoized
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      // Category filter
      const categoryMatch = filters.category === 'all' || project.category === filters.category;
      
      // Search filter
      const searchLower = filters.search.toLowerCase();
      const searchMatch = filters.search === '' ||
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchLower));
      
      return categoryMatch && searchMatch;
    });
  }, [filters]);

  // Reset current index when filters change
  useEffect(() => {
    setCurrentIndex(0);
  }, [filters.category, filters.search]);

  // Navigation handlers
  const handlePrevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNextProject = () => {
    setCurrentIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: 'all',
      search: '',
      showFilters: false
    });
  };

  // Handler for scrolling to sections
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

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-gray-900/0"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header with navigation and filters */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Back button and title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center justify-center p-3 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700"
            >
              <Home className="w-5 h-5 text-gray-300" />
            </button>
            <h1 className="text-3xl font-bold text-white">Projects</h1>
          </div>

          {/* Search and filters */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 w-full pl-10 pr-4 py-2"
                placeholder="Search projects..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              {filters.search && (
                <button
                  onClick={() => setFilters({...filters, search: ''})}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter button */}
            <button
              onClick={() => setFilters({...filters, showFilters: !filters.showFilters})}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                filters.showFilters || filters.category !== 'all'
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-300'
              }`}
            >
              <Filter size={16} />
              <span>Filter</span>
              {filters.category !== 'all' && (
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">1</span>
              )}
            </button>
          </div>
        </div>

        {/* Filter categories */}
        {filters.showFilters && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setFilters({...filters, category: category.id})}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filters.category === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {React.cloneElement(category.icon, { size: 14 })}
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredProjects.length > 0 ? (
          <>
            {/* Featured project card */}
            <div className="relative">
              {filteredProjects.length > 0 && (
                <FeaturedProject
                  project={filteredProjects[currentIndex]}
                  onNext={handleNextProject}
                  onPrev={handlePrevProject}
                  currentIndex={currentIndex}
                  totalCount={filteredProjects.length}
                  onViewDetails={setSelectedProject}
                />
              )}
            </div>

            {/* Project grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  onClick={setSelectedProject}
                />
              ))}
            </div>
          </>
        ) : (
          // No results state
          <div className="bg-gray-800/80 rounded-xl p-8 text-center max-w-md mx-auto border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-4 text-sm">Try adjusting your search or filter criteria</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium mx-auto"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>

      {/* Project details modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;