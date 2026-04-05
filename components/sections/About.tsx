'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Globe, Zap, Users, Target } from 'lucide-react';

const skills = [
  { name: 'Frontend Development', level: 95, icon: Code2 },
  { name: 'Backend Development', level: 85, icon: Database },
  { name: 'Cloud & DevOps', level: 80, icon: Globe },
];

const highlights = [
  {
    title: 'Innovation Focus',
    description: 'Always exploring new technologies and methodologies to stay ahead of the curve.',
    icon: '💡',
  },
  {
    title: 'Quality Driven',
    description: 'Committed to delivering clean, maintainable, and well-tested code.',
    icon: '✅',
  },
  {
    title: 'Collaborative Spirit',
    description: 'Strong believer in teamwork and knowledge sharing within the community.',
    icon: '🤝',
  },
  {
    title: 'Continuous Learning',
    description: 'Dedicated to personal and professional growth through continuous education.',
    icon: '📚',
  },
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 glow-text">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate developer with a knack for creating elegant solutions to complex problems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 glow-border">
              <h3 className="text-2xl font-bold text-primary mb-4">My Journey</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                With over 2.5 years of experience in software development, I've had the privilege of
                working with startups and enterprises alike. My journey began with a fascination for
                how technology can transform ideas into reality.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                I specialize in full-stack development, with expertise in modern JavaScript frameworks,
                cloud architecture, and agile methodologies. I believe in writing code that's not just
                functional, but also maintainable and scalable.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you can find me contributing to open-source projects, mentoring
                aspiring developers, or exploring the latest in tech innovations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">2.5+</h4>
                <p className="text-gray-400">Years Experience</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">10+</h4>
                <p className="text-gray-400">Projects Completed</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">5</h4>
                <p className="text-gray-400">Happy Clients</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <h4 className="text-3xl font-bold text-primary mb-2">5+</h4>
                <p className="text-gray-400">Technologies</p>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 glow-border">
              <h3 className="text-2xl font-bold text-primary mb-6">Technical Skills</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon size={18} className="text-primary" />
                          <span className="text-white font-medium">{skill.name}</span>
                        </div>
                        <span className="text-primary font-semibold">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-xl p-6 text-center hover:glow-border transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-4">{highlight.icon}</div>
              <h4 className="text-xl font-bold text-white mb-2">{highlight.title}</h4>
              <p className="text-gray-400 text-sm">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
