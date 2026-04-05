'use client';

import { motion } from 'framer-motion';
import { Heart, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">mhmd</span>
              <span className="text-white">shiddiq</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting exceptional digital experiences with cutting-edge technologies.
              Passionate about creating innovative solutions that make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Experience', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>''
            <h4 className="text-lg font-semibold text-white mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'TypeScript', 'Laravel', 'PostgreSQL','Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-400 text-sm flex items-center gap-2">
            © {new Date().getFullYear()} mhmdshiddiq. All rights reserved.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-gray-400 text-sm"
          >
            <span>Made with</span>
            mhmdshiddiq
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
