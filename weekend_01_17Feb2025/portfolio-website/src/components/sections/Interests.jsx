import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Book, Code, Globe } from 'lucide-react';
import Card from '../ui/Card';

const Interests = () => {
  const interests = [
    {
      icon: <Code size={32} />,
      title: 'Programming',
      description: 'Passionate about creating elegant solutions through code.',
    },
    {
      icon: <Book size={32} />,
      title: 'Research',
      description: 'Always eager to learn and explore new technologies.',
    },
    {
      icon: <Globe size={32} />,
      title: 'Travel',
      description: 'Exploring new cultures and gaining diverse perspectives.',
    },
    {
      icon: <Coffee size={32} />,
      title: 'Coffee & Code',
      description: 'Perfect combination for productive development sessions.',
    },
  ];

  return (
    <section id="interests" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Interests & Hobbies
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full">
                <div className="text-blue-500 mb-4 flex justify-center">
                  {interest.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{interest.title}</h3>
                <p className="text-gray-400">{interest.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;