'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import BackgroundModern from '@/components/3d/BackgroundModern';

export default function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundModern />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-primary text-lg font-semibold mb-2">Hello, I'm</h2>
              <h1 className="text-5xl md:text-5xl font-bold text-white mb-4 glow-text">
                Muhammad Shiddiq Wicahyo
              </h1>
              <h2 className="text-2xl md:text-xl text-gray-300 font-light">
                Software Engineer | Full-Stack Developer | Tech Enthusiast
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg max-w-lg"
            >
              Crafting exceptional digital experiences with cutting-edge technologies.
              Passionate about creating innovative solutions that make a difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-darker font-semibold rounded-lg glow-border hover:bg-secondary transition-all duration-300"
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300"
              >
                View Work
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 pt-4"
            >
              <motion.a
                href="https://github.com/mhmdshiddiq17"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-12 h-12 glass rounded-lg flex items-center justify-center text-primary hover:text-white transition-all duration-300"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/mhmdshiddiq"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                className="w-12 h-12 glass rounded-lg flex items-center justify-center text-primary hover:text-white transition-all duration-300"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:mhmdshiddiq17@gmail.com"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="w-12 h-12 glass rounded-lg flex items-center justify-center text-primary hover:text-white transition-all duration-300"
              >
                <Mail size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[500px]">
              {/* Profile Image Frame */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                {/* Outer glowing ring */}
                <div className="relative w-80 h-80">
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 rounded-full border-2 border-primary/30 glow-border"
                  />
                  
                  <motion.div
                    animate={{
                      rotate: -360,
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -inset-4 rounded-full border border-secondary/20"
                  />

                  {/* Profile image container */}
                  <div className="absolute inset-4 rounded-full overflow-hidden">
                    {/* Animated gradient border */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(45deg, #00f0ff, #00a8ff, #0066ff, #00f0ff)',
                        backgroundSize: '300% 300%',
                      }}
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Profile image */}
                    <motion.div
                      className="absolute inset-1 rounded-full overflow-hidden bg-darker"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src="/spotify.jpeg"
                        alt="Profile"
                        className="w-full h-full object-cover co"
                      />
                    </motion.div>
                  </div>

                  {/* Floating tech icons around profile */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute -top-2 -right-2 w-12 h-12 glass rounded-lg flex items-center justify-center glow-border"
                  >
                    <span className="text-2xl">⚛️</span>
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute -bottom-2 -left-2 w-12 h-12 glass rounded-lg flex items-center justify-center glow-border"
                  >
                    <span className="text-2xl">🚀</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-10 right-10 glass px-4 py-2 rounded-lg glow-border"
              >
                <span className="text-primary font-semibold">✨ Open to Freelance</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-20 left-0 glass px-4 py-2 rounded-lg glow-border"
              >
                <span className="text-secondary font-semibold">🚀 10+ Projects</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center text-primary"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
