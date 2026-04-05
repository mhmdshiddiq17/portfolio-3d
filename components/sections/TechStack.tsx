'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Globe, Zap, Users, Target, Server, Cloud } from 'lucide-react';

const techCategories = [
  {
    title: 'Frontend Development',
    icon: Code2,
    level: 95,
    color: 'from-primary to-secondary',
    technologies: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'Vue.js', level: 82 },
    ],
  },
  {
    title: 'Backend Development',
    icon: Server,
    level: 85,
    color: 'from-secondary to-accent',
    technologies: [
      { name: 'Node.js', level: 88 },
      { name: 'PostgreSQL', level: 80 },
      {name: 'Laravel', level: 90},
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    level: 80,
    color: 'from-accent to-primary',
    technologies: [
      { name: 'Docker', level: 78 },
      { name: 'CI/CD', level: 85 },
    ],
  },
];

const additionalSkills = [
  { name: 'Team Leadership', level: 90, icon: Users },
  { name: 'Problem Solving', level: 95, icon: Target },
  { name: 'Communication', level: 88, icon: Globe },
];

export default function TechStack() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="tech-stack" className="py-20 relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 glow-text">
            Tech Stack
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {techCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="glass rounded-2xl p-8 glow-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                      <Icon size={28} className="text-darker" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${category.level}%` } : {}}
                            transition={{ duration: 1, delay: 0.3 + categoryIndex * 0.1 }}
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                          />
                        </div>
                        <span className="text-primary font-semibold text-sm">{category.level}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-4">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + categoryIndex * 0.1 + techIndex * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 font-medium">{tech.name}</span>
                        <span className="text-primary font-semibold text-sm">{tech.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${tech.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.7 + categoryIndex * 0.1 + techIndex * 0.05 }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-2xl p-8 glow-border"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Soft Skills & Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-xl bg-darker/50 hover:bg-darker transition-colors cursor-pointer"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Icon size={32} className="text-darker" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{skill.name}</h4>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 1 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    />
                  </div>
                  <p className="text-primary font-semibold">{skill.level}%</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {[
            { label: 'Years Experience', value: '2.5+', icon: '📅' },
            { label: 'Projects Completed', value: '10+', icon: '🚀' },
            { label: 'Technologies', value: '5+', icon: '⚡' },
            { label: 'Happy Clients', value: '5+', icon: '😊' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-xl p-6 text-center hover:glow-border transition-all duration-300"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
