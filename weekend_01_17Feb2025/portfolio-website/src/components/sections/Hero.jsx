import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section id="hero" className="h-screen relative overflow-hidden flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.img
          src="/api/placeholder/150/150"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-blue-500"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        />
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Your Name</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">Your Title • Your Specialty</p>
        <Button>Download Resume</Button>
      </motion.div>
    </section>
  );
};

export default Hero;