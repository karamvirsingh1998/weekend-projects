// src/components/sections/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const Hero = () => {
  // Navigation icons with increased size
  const navIcons = [
    {
      id: 'about',
      name: 'About',
      icon: <LucideIcons.User size={40} />,
      color: 'bg-blue-600',
      background: 'bg-blue-900/30'
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: <LucideIcons.Briefcase size={40} />,
      color: 'bg-green-600',
      background: 'bg-green-900/30'
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: <LucideIcons.Code2 size={40} />,
      color: 'bg-yellow-600',
      background: 'bg-yellow-900/30'
    },
    {
      id: 'research',
      name: 'Research',
      icon: <LucideIcons.GraduationCap size={40} />,
      color: 'bg-purple-600',
      background: 'bg-purple-900/30'
    },
    {
      id: 'citations',
      name: 'Citations',
      icon: <LucideIcons.FileText size={40} />,
      color: 'bg-cyan-600',
      background: 'bg-cyan-900/30'
    },
    {
      id: 'ideas',
      name: 'Ideas',
      icon: <LucideIcons.Lightbulb size={40} />,
      color: 'bg-amber-600',
      background: 'bg-amber-900/30'
    },
    {
      id: 'interests',
      name: 'Interests',
      icon: <LucideIcons.Heart size={40} />,
      color: 'bg-pink-600',
      background: 'bg-pink-900/30'
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: <LucideIcons.Mail size={40} />,
      color: 'bg-indigo-600',
      background: 'bg-indigo-900/30'
    }
  ];

  const handleNavClick = (id) => {
    if (id === 'resume') {
      // Handle resume download or view
      console.log('Download resume');
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="h-screen w-full flex items-stretch overflow-hidden bg-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23FFFFFF' fill-opacity='0.05'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Left Section (35%) - Profile Photo & About */}
      <div className="w-[35%] h-full flex flex-col p-8">
        <div className="flex flex-col justify-center h-full">
          {/* Profile Photo - Moved down slightly with top margin */}
          <div className="flex-[0.3] flex items-center justify-center mt-32">
            <motion.div
              className="w-full max-w-xl aspect-square rounded-lg border-4 border-blue-500 overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/images/profile.jpeg"
                alt="Karamvir Singh"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load');
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400?text=Karamvir+Singh';
                }}
              />
            </motion.div>
          </div>

          {/* About Section - Enhanced with better visuals and interactions */}
          <div className="flex-[0.4] flex flex-col justify-center text-center relative z-10">
            {/* Decorative elements */}
            <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>

            {/* Name with gradient text and animated underline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative mb-2"
            >
              <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Karamvir Singh
              </h1>
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mt-2 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "180px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>

            {/* Animated job title with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <p className="text-2xl md:text-3xl text-gray-300 font-medium">
                  Staff AI Engineer
                </p>
                <motion.div
                  initial={{ height: "100%" }}
                  animate={{ height: 0 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                  className="absolute inset-0 bg-gray-900"
                />
              </div>
            </motion.div>

            {/* Social links with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center space-x-8"
            >
              <motion.a
                href="https://github.com/karamvirsingh1998"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                <LucideIcons.Github size={32} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/karamvir-singh-842838177/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                <LucideIcons.Linkedin size={32} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
              </motion.a>

              <motion.a
                href="https://x.com/9876349269"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                <LucideIcons.Twitter size={32} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
              </motion.a>
            </motion.div>

            {/* Download Resume Button with enhanced styling */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative mx-auto mt-10 px-8 py-3 overflow-hidden group bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <div className="flex items-center">
                <LucideIcons.Download size={18} className="mr-2" />
                <span>Download Resume</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Right Section (65%) - Navigation Icons Grid */}
      <div className="w-[65%] h-full bg-gradient-to-r from-gray-900 to-gray-800 p-8 flex items-center">
        <div className="w-full">
          <div className="grid grid-cols-4 gap-4 h-full">
            <div className="col-span-4 grid grid-cols-4 grid-rows-2 gap-8">
              {navIcons.map((item, index) => {
                // Calculate row and column position
                const row = Math.floor(index / 4);
                const col = index % 4;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`cursor-pointer`}
                    style={{
                      gridRow: row + 1,
                      gridColumn: col + 1
                    }}
                  >
                    <div className={`p-6 w-full aspect-square rounded-lg ${item.background} border-2 border-${item.color.split('-')[1]}-500/50 shadow-lg hover:shadow-${item.color.split('-')[1]}-500/30 transition-all flex flex-col items-center justify-center gap-4`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                      <div className="text-white text-xl font-medium">
                        {item.name}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;