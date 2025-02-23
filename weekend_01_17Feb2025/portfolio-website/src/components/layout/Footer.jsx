import React from 'react';
import * as LucideIcons from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              <LucideIcons.Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <LucideIcons.Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <LucideIcons.Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;