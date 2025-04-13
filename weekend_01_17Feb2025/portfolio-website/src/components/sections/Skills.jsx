import React, { useState, useEffect, useRef } from 'react';
import { Home } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);

  // Skill categories from resume
  const skillCategories = [
    {
      id: 'programming',
      title: 'Programming',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      color: '#3b82f6',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'C++', level: 85 }
      ]
    },
    {
      id: 'ai-agents',
      title: 'AI Agents',
      icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.582 2.13l1.89.68a2.25 2.25 0 011.628 2.165c0 1.137-.84 2.098-1.958 2.192a48.424 48.424 0 01-12.884 0c-1.119-.094-1.958-1.055-1.958-2.192a2.25 2.25 0 011.628-2.165l1.89-.68a2.25 2.25 0 001.582-2.13V3.104M9 14.5h6m-3-3L9 14.5m0 0L3 14.5M9 14.5l3-3',
      color: '#8b5cf6',
      skills: [
        { name: 'Multi-Agent Orchestration', level: 92 },
        { name: 'Agent Evaluations', level: 90 },
        { name: 'Tool-Augmented Agents', level: 88 }
      ]
    },
    {
      id: 'llms',
      title: 'LLMs',
      icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25',
      color: '#ec4899',
      skills: [
        { name: 'Retrieval Augmented Generation', level: 95 },
        { name: 'LLM Fine-tuning (Lora, Peft)', level: 90 },
        { name: 'LLM Optimization (MLC, Lorax)', level: 85 },
        { name: 'Responsible AI', level: 88 },
        { name: 'Prompt Engineering', level: 95 },
        { name: 'Vision LLMs', level: 82 }
      ]
    },
    {
      id: 'voice',
      title: 'Voice',
      icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z',
      color: '#10b981',
      skills: [
        { name: 'Automatic Speech Recognition', level: 88 },
        { name: 'Text-to-Speech', level: 85 },
        { name: 'Language Models', level: 92 }
      ]
    },
    {
      id: 'general',
      title: 'General',
      icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
      color: '#f59e0b',
      skills: [
        { name: 'Transformers', level: 90 },
        { name: 'Classical ML', level: 85 },
        { name: 'Deep Learning & NLP', level: 92 },
        { name: 'Operating Systems', level: 80 },
        { name: 'OOPs', level: 85 },
        { name: 'ML System Design', level: 90 }
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z',
      color: '#06b6d4',
      skills: [
        { name: 'CI/CD Pipelines', level: 85 },
        { name: 'Kubernetes', level: 80 },
        { name: 'FastAPI', level: 90 },
        { name: 'Docker', level: 85 },
        { name: 'Amazon Web Services (AWS)', level: 88 },
        { name: 'Google Cloud Platform (GCP)', level: 82 }
      ]
    }
  ];

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

  // Generate all skills array
  const allSkills = skillCategories.flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      categoryId: category.id,
      categoryColor: category.color
    }))
  );

  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.categoryId === activeCategory);

  // Neural network animation
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Generate nodes based on filteredSkills
    const generateNodes = () => {
      const nodes = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;

      filteredSkills.forEach((skill, index) => {
        const angle = (index / filteredSkills.length) * Math.PI * 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        nodes.push({
          id: skill.name,
          x,
          y,
          targetX: x,
          targetY: y,
          radius: 5 + (skill.level / 10),
          color: skill.categoryColor,
          velocity: { x: 0, y: 0 },
          isHovered: skill.name === hoveredSkill,
          categoryId: skill.categoryId
        });
      });

      // Add central hub node
      nodes.push({
        id: 'hub',
        x: centerX,
        y: centerY,
        targetX: centerX,
        targetY: centerY,
        radius: 15,
        color: '#f0f0f0',
        velocity: { x: 0, y: 0 },
        isHovered: false,
        isPulsing: true
      });

      return nodes;
    };

    // Generate connections between nodes
    const generateConnections = (nodes) => {
      const connections = [];
      const hubNode = nodes.find(n => n.id === 'hub');
      
      if (!hubNode) return connections;

      // Connect all nodes to hub
      nodes.forEach(node => {
        if (node.id !== 'hub') {
          connections.push({
            source: hubNode,
            target: node,
            strength: 0.5,
            isActive: node.isHovered || node.categoryId === activeCategory || activeCategory === 'all'
          });
        }
      });

      // Connect nodes of same category
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          
          if (nodeA.id !== 'hub' && nodeB.id !== 'hub' && nodeA.categoryId === nodeB.categoryId) {
            connections.push({
              source: nodeA,
              target: nodeB,
              strength: 0.3,
              isActive: nodeA.isHovered || nodeB.isHovered || nodeA.categoryId === activeCategory || activeCategory === 'all'
            });
          }
        }
      }

      return connections;
    };

    // Draw network
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      connectionsRef.current.forEach(connection => {
        if (!connection.isActive) return;
        
        ctx.beginPath();
        ctx.moveTo(connection.source.x, connection.source.y);
        ctx.lineTo(connection.target.x, connection.target.y);
        ctx.strokeStyle = connection.target.isHovered || connection.source.isHovered
          ? `rgba(255, 255, 255, 0.7)`
          : `rgba(255, 255, 255, 0.2)`;
        ctx.lineWidth = connection.target.isHovered || connection.source.isHovered ? 2 : 1;
        ctx.stroke();
      });

      // Draw nodes
      nodesRef.current.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        // Glowing effect for hovered or pulsing nodes
        if (node.isHovered || node.isPulsing) {
          const pulseSize = node.isPulsing 
            ? 4 + 2 * Math.sin(Date.now() * 0.003) 
            : 8;
            
          const gradient = ctx.createRadialGradient(
            node.x, node.y, node.radius - 2,
            node.x, node.y, node.radius + pulseSize
          );
          gradient.addColorStop(0, node.color);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.arc(node.x, node.y, node.radius + pulseSize, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw actual node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isHovered ? '#ffffff' : node.color;
        ctx.fill();
      });
    };

    // Animation loop
    const animate = () => {
      // Update nodes
      nodesRef.current.forEach(node => {
        // Add some random movement
        node.x += (node.targetX - node.x) * 0.05 + (Math.random() - 0.5) * 0.5;
        node.y += (node.targetY - node.y) * 0.05 + (Math.random() - 0.5) * 0.5;
      });

      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    nodesRef.current = generateNodes();
    connectionsRef.current = generateConnections(nodesRef.current);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [filteredSkills, activeCategory, hoveredSkill]);

  return (
    <section id="skills" className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Neural network background */}
      <div ref={containerRef} className="absolute inset-0 opacity-30">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      
      {/* Digital circuit pattern overlay */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      
      {/* Content container */}
      <div className="container relative z-10 mx-auto px-6">
        {/* Section header with glowing effect */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive toolkit of technical capabilities developed over years of AI engineering
          </p>
        </div>

        {/* Category Navigation - futuristic tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
            style={{ '--color': '#6366f1' }}
          >
            <span className="z-10 relative">All Skills</span>
          </button>

          {skillCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              style={{ '--color': category.color }}
            >
              <span className="z-10 relative">
                <svg className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                </svg>
                {category.title}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Display - neuron-inspired design */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filteredSkills.map((skill) => {
            const category = skillCategories.find(cat => cat.id === skill.categoryId);
            
            return (
              <div 
                key={skill.name}
                className="skill-card"
                style={{ '--accent-color': skill.categoryColor }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="skill-header">
                  <h3 className="skill-name">{skill.name}</h3>
                  <div className="skill-category">
                    <svg className="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                    </svg>
                    <span>{category.title}</span>
                  </div>
                </div>
                
                <div className="skill-progress-container">
                  <div 
                    className="skill-progress-bar" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                  <div className="skill-level">{skill.level}%</div>
                </div>
                
                <div className="pulse-circles">
                  <div className="pulse-circle"></div>
                  <div className="pulse-circle delay-1"></div>
                  <div className="pulse-circle delay-2"></div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Category Feature Showcase */}
        {activeCategory !== 'all' && (
          <div className="mt-16 bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">
              <svg className="w-6 h-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: skillCategories.find(c => c.id === activeCategory)?.color }}>
                <path strokeLinecap="round" strokeLinejoin="round" d={skillCategories.find(c => c.id === activeCategory)?.icon} />
              </svg>
              {skillCategories.find(c => c.id === activeCategory)?.title} Expertise
            </h3>
            <p className="text-gray-300 mb-6">
              {activeCategory === 'programming' && "Proficient in multiple programming languages with a focus on performance optimization and clean code architecture."}
              {activeCategory === 'ai-agents' && "Specialized in developing and orchestrating AI agents that can work together to solve complex problems and automate intricate workflows."}
              {activeCategory === 'llms' && "Expert in large language model implementations, from fine-tuning for specialized tasks to deploying optimized models in production environments."}
              {activeCategory === 'voice' && "Developed advanced voice technologies that enable seamless human-computer interaction through natural language processing."}
              {activeCategory === 'general' && "Strong foundation in theoretical and practical aspects of machine learning and AI systems design."}
              {activeCategory === 'infrastructure' && "Experienced in building robust, scalable infrastructure for deploying and managing AI systems in cloud environments."}
            </p>
            <div className="flex flex-wrap gap-3">
              {skillCategories.find(c => c.id === activeCategory)?.skills.map(skill => (
                <span 
                  key={skill.name} 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: `${skillCategories.find(c => c.id === activeCategory)?.color}20`,
                    color: skillCategories.find(c => c.id === activeCategory)?.color,
                    border: `1px solid ${skillCategories.find(c => c.id === activeCategory)?.color}40` 
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .bg-circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .category-button {
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          color: #f0f0f0;
          background-color: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .category-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--color);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .category-button:hover::before {
          opacity: 0.1;
        }

        .category-button.active {
          background-color: var(--color);
          border-color: var(--color);
          box-shadow: 0 0 15px var(--color);
        }

        .category-button.active::before {
          opacity: 0.2;
        }

        .skill-card {
          position: relative;
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(4px);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--accent-color);
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-color);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(var(--accent-color), 0.3);
        }

        .skill-card:hover::before {
          width: 100%;
          opacity: 0.05;
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .skill-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
        }

        .skill-category {
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--accent-color);
          background-color: rgba(255, 255, 255, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 1rem;
        }

        .skill-progress-container {
          position: relative;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          margin-bottom: 0.5rem;
          overflow: hidden;
        }

        .skill-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-color), rgba(255, 255, 255, 0.5));
          border-radius: 4px;
          transition: width 1s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .skill-level {
          position: absolute;
          right: 0;
          top: 0.5rem;
          font-size: 0.875rem;
          color: var(--accent-color);
        }

        .pulse-circles {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          width: 20px;
          height: 20px;
        }

        .pulse-circle {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid var(--accent-color);
          opacity: 0;
          animation: pulse 3s infinite;
        }

        .delay-1 {
          animation-delay: 1s;
        }

        .delay-2 {
          animation-delay: 2s;
        }

        @keyframes pulse {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;