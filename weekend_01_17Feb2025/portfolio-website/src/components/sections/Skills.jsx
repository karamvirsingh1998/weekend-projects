import React, { useState } from 'react';
import { Home } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Skill categories from resume
  const skillCategories = [
    {
      id: 'programming',
      title: 'Programming',
      skills: ['Python', 'C++']
    },
    {
      id: 'ai-agents',
      title: 'AI Agents',
      skills: ['Multi-Agent Orchestration', 'Agent Evaluations', 'Tool-Augmented Agents']
    },
    {
      id: 'llms',
      title: 'LLMs',
      skills: ['Retrieval Augmented Generation', 'LLM Fine-tuning (Lora, Peft)',
        'LLM Optimization (MLC, Lorax)', 'Responsible AI', 'Prompt Engineering', 'Vision LLMs']
    },
    {
      id: 'voice',
      title: 'Voice',
      skills: ['Automatic Speech Recognition', 'Text-to-Speech', 'Language Models']
    },
    {
      id: 'general',
      title: 'General',
      skills: ['Transformers', 'Classical ML', 'Deep Learning & NLP',
        'Operating Systems', 'OOPs', 'ML System Design']
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      skills: ['CI/CD Pipelines', 'Kubernetes', 'FastAPI', 'Docker',
        'Amazon Web Services (AWS)', 'Google Cloud Platform (GCP)']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Back to Home */}
        <div className="mb-10">
          <a
            href="#hero"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </a>
        </div>

        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive toolkit of technical capabilities developed over years of AI engineering
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            All
          </button>

          {skillCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories
            .filter(category => activeCategory === 'all' || category.id === activeCategory)
            .map(category => (
              <div key={category.id} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map(skill => (
                    <li key={skill} className="bg-gray-700 rounded-lg p-3 text-white">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Skills;