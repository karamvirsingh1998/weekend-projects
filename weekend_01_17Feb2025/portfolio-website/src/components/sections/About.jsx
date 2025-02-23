import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/api/placeholder/400/400"
                alt="Profile"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <p className="text-lg text-gray-300 mb-6">
                Your detailed biography goes here. Describe your journey, passions, and expertise.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Education:</span>
                  <span className="text-gray-300">Your University, Degree</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Experience:</span>
                  <span className="text-gray-300">X years in the field</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Location:</span>
                  <span className="text-gray-300">Your Location</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;