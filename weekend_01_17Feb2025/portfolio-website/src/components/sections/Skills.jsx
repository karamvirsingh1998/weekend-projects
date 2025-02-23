import React from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '../ui/ProgressBar';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Technical Skills',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Machine Learning', level: 75 },
      ],
    },
    {
      title: 'Soft Skills',
      skills: [
        { name: 'Problem Solving', level: 95 },
        { name: 'Communication', level: 90 },
        { name: 'Leadership', level: 85 },
        { name: 'Team Work', level: 90 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Skills & Expertise
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-6">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <ProgressBar
                    key={skill.name}
                    label={skill.name}
                    value={skill.level}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;