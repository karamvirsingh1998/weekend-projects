import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: 'Project 1',
      category: 'web',
      description: 'A modern web application built with React and Node.js',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      title: 'Project 2',
      category: 'mobile',
      description: 'Cross-platform mobile app developed with React Native',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Redux'],
      link: '#'
    },
    {
      title: 'Project 3',
      category: 'ai',
      description: 'Machine learning project for image recognition',
      image: '/api/placeholder/400/300',
      technologies: ['Python', 'TensorFlow', 'OpenCV'],
      link: '#'
    }
  ];

  const categories = ['all', 'web', 'mobile', 'ai'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="min-h-screen py-20 bg-gray-900 flex items-center">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Featured Projects
        </motion.h2>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full capitalize ${
                filter === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="text-blue-500 hover:text-blue-400 font-medium"
                  >
                    View Project →
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;