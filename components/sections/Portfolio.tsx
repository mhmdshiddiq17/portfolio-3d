'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.',
    longDescription: 'Built a scalable e-commerce solution serving 10,000+ daily users. Implemented advanced features including real-time inventory updates, secure payment processing with Stripe, and comprehensive analytics dashboard for business insights.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Redis'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    title: 'AI Content Generator',
    description: 'An AI-powered content generation tool using GPT-4 for creating marketing copy, blog posts, and social media content.',
    longDescription: 'Developed an intelligent content creation platform leveraging OpenAI\'s GPT-4 API. Features include customizable tone and style, multi-language support, and SEO optimization suggestions.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    tags: ['React', 'Python', 'OpenAI', 'FastAPI', 'MongoDB'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description: 'A comprehensive dashboard for monitoring business metrics with real-time data visualization and custom reporting.',
    longDescription: 'Created a powerful analytics platform processing millions of events daily. Features include real-time data visualization, custom report generation, anomaly detection, and automated alerting system.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Vue.js', 'D3.js', 'Node.js', 'InfluxDB', 'WebSocket'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    title: 'Social Media Scheduler',
    description: 'A multi-platform social media management tool with scheduling, analytics, and team collaboration features.',
    longDescription: 'Built a comprehensive social media management platform supporting major networks. Features include bulk scheduling, AI-powered posting time optimization, team workflows, and detailed performance analytics.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'AWS', 'Docker', 'GraphQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    title: 'Fitness Tracking App',
    description: 'A mobile-first fitness application with workout plans, progress tracking, and social features.',
    longDescription: 'Developed a comprehensive fitness platform with personalized workout plans, nutrition tracking, progress visualization, and social challenges. Integrated with wearables for automatic activity tracking.',
    image: 'https://images.unsplash.com/photo-1461896836934- voices-1b?w=800&h=600&fit=crop',
    tags: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
  {
    title: 'Blockchain Explorer',
    description: 'A real-time blockchain explorer with transaction tracking, address analysis, and network statistics.',
    longDescription: 'Built a high-performance blockchain explorer processing millions of transactions. Features include real-time updates, advanced search filters, address labeling, and network visualization.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    tags: ['Next.js', 'Web3.js', 'GraphQL', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
  },
];

const categories = ['All', 'Web Apps', 'Mobile', 'AI/ML', 'Blockchain'];

export default function Portfolio() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => {
        if (activeCategory === 'Web Apps') return project.tags.includes('Next.js') || project.tags.includes('React') || project.tags.includes('Vue.js');
        if (activeCategory === 'Mobile') return project.tags.includes('React Native');
        if (activeCategory === 'AI/ML') return project.tags.includes('OpenAI') || project.title.includes('AI');
        if (activeCategory === 'Blockchain') return project.title.includes('Blockchain');
        return true;
      });

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 glow-text">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my best work and side projects
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-darker glow-border'
                  : 'glass text-gray-300 hover:text-primary hover:border-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="glass rounded-2xl overflow-hidden glow-border hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 h-full">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent opacity-60" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-primary text-darker px-3 py-1 rounded-full text-sm font-bold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-primary hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Live</span>
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-primary hover:text-white transition-colors"
                    >
                      <Github size={18} />
                      <span className="text-sm">Code</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedProject.image})` }}
                />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.longDescription}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <motion.a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary text-darker font-semibold rounded-lg glow-border hover:bg-secondary transition-all duration-300 flex items-center gap-2"
                >
                  <ExternalLink size={20} />
                  View Live
                </motion.a>
                <motion.a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300 flex items-center gap-2"
                >
                  <Github size={20} />
                  View Code
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
