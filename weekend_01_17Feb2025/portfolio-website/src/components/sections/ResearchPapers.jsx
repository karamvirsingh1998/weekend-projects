import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Card from '../ui/Card';

const ResearchPapers = () => {
  const papers = [
    {
      title: "Machine Learning in Healthcare",
      journal: "International Journal of Medical Informatics",
      year: 2023,
      abstract: "This research explores the application of machine learning algorithms in healthcare diagnostics...",
      link: "#",
      tags: ["ML", "Healthcare", "AI"]
    },
    {
      title: "Blockchain Technology in Supply Chain",
      journal: "Journal of Business Logistics",
      year: 2023,
      abstract: "A comprehensive study on implementing blockchain technology in supply chain management...",
      link: "#",
      tags: ["Blockchain", "Supply Chain", "Technology"]
    },
    {
      title: "Sustainable Energy Systems",
      journal: "Renewable Energy Journal",
      year: 2022,
      abstract: "Analysis of sustainable energy systems and their implementation in urban environments...",
      link: "#",
      tags: ["Energy", "Sustainability", "Urban Planning"]
    }
  ];

  return (
    <section id="research" className="min-h-screen py-20 bg-gray-800 flex items-center">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Research Papers
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {papers.map((paper, index) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:transform hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
                    <p className="text-blue-400 mb-2">
                      {paper.journal} • {paper.year}
                    </p>
                  </div>
                  <a
                    href={paper.link}
                    className="text-blue-500 hover:text-blue-400 flex items-center"
                  >
                    Read Paper
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>

                <p className="text-gray-400 mb-4">{paper.abstract}</p>

                <div className="flex flex-wrap gap-2">
                  {paper.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchPapers;