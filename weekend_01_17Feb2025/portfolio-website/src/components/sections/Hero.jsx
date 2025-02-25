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
      id: 'interests',
      name: 'Interests',
      icon: <LucideIcons.Heart size={40} />,
      color: 'bg-pink-600',
      background: 'bg-pink-900/30'
    },
    {
      id: 'ideas',
      name: 'Ideas',
      icon: <LucideIcons.Lightbulb size={40} />,
      color: 'bg-amber-600',
      background: 'bg-amber-900/30'
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: <LucideIcons.Mail size={40} />,
      color: 'bg-indigo-600',
      background: 'bg-indigo-900/30'
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: <LucideIcons.FileText size={40} />,
      color: 'bg-cyan-600',
      background: 'bg-cyan-900/30'
    },
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
          {/* Profile Photo (60% of left section height) */}
          <div className="flex-[0.6] flex items-center justify-center">
            <motion.div
              className="w-full max-w-md aspect-square rounded-full border-4 border-blue-500 overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="src/components/images/profile.jpeg"
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

          {/* About Section (40% of left section height) */}
          <div className="flex-[0.4] flex flex-col justify-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mb-3"
            >
              Karamvir Singh
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl text-gray-300 mb-6"
            >
              Staff AI Engineer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center space-x-6"
            >
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <LucideIcons.Github size={32} />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <LucideIcons.Linkedin size={32} />
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <LucideIcons.Twitter size={32} />
              </a>
            </motion.div>
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