import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import Card from '../ui/Card';

const Ideas = () => {
  const [selectedIdea, setSelectedIdea] = useState(null);

  const ideas = [
    {
      id: 1,
      title: "AI-Powered Education Platform",
      description: "A personalized learning platform that adapts to each student's learning style and pace using artificial intelligence.",
      category: "AI/ML",
      status: "In Progress",
      details: "The platform will use machine learning algorithms to analyze student performance and create customized learning paths..."
    },
    {
      id: 2,
      title: "Sustainable Smart Home System",
      description: "An integrated home automation system focusing on energy efficiency and sustainability.",
      category: "IoT",
      status: "Concept",
      details: "The system will combine IoT sensors, renewable energy management, and smart algorithms to optimize home resource usage..."
    },
    {
      id: 3,
      title: "Healthcare Blockchain Solution",
      description: "A secure and efficient way to manage medical records using blockchain technology.",
      category: "Blockchain",
      status: "Research Phase",
      details: "This solution will provide a decentralized approach to storing and sharing medical records while ensuring privacy..."
    }
  ];

  return (
    <section id="ideas" className="min-h-screen py-20 bg-gray-900 flex items-center">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Innovative Ideas
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="p-6 cursor-pointer hover:transform hover:scale-[1.02] transition-transform"
                onClick={() => setSelectedIdea(selectedIdea === idea.id ? null : idea.id)}
              >
                <div className="flex items-center mb-4">
                  <Lightbulb className="text-yellow-500 mr-2" size={24} />
                  <h3 className="text-xl font-semibold">{idea.title}</h3>
                </div>

                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    {idea.category}
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    {idea.status}
                  </span>
                </div>

                <p className="text-gray-400 mb-4">{idea.description}</p>

                {selectedIdea === idea.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-700"
                  >
                    <p className="text-gray-300">{idea.details}</p>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ideas;