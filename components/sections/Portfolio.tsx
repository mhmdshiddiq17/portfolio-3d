'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string;
  category?: string;
  featured: boolean;
  isRestricted: boolean;
  order: number;
}

const categories = ['All', 'Web Apps', 'Mobile', 'AI/ML', 'Blockchain'];

export default function Portfolio() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null);
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => {
        if (!project.category) return false;
        if (activeCategory === 'Web Apps') return project.category === 'Web Apps';
        if (activeCategory === 'Mobile') return project.category === 'Mobile';
        if (activeCategory === 'AI/ML') return project.category === 'AI/ML';
        if (activeCategory === 'Blockchain') return project.category === 'Blockchain';
        return true;
      });

  if (loading) {
    return (
      <section id="portfolio" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {filteredProjects.map((project, index) => {
            const tags = project.tags.split(',').map(tag => tag.trim());

            return (
              <motion.div
                key={project.id}
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
                      style={{ backgroundImage: `url(${project.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent opacity-60" />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-primary text-darker px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </div>
                    )}

                    {/* Restricted Badge */}
                    {project.isRestricted && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Lock size={14} />
                        Restricted
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
                      {tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.isRestricted ? (
                        <div className="flex items-center gap-2 text-red-400">
                          <Lock size={18} />
                          <span className="text-sm font-medium">Restricted</span>
                        </div>
                      ) : (
                        <>
                          {project.liveUrl && (
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
                          )}
                          {project.githubUrl && (
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
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
              className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                ✕
              </button>

              <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedProject.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop'})` }}
                />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.longDescription}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.split(',').map((tag) => (
                  <span
                    key={tag.trim()}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

              {selectedProject.isRestricted ? (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <Lock size={24} className="text-red-400" />
                  <div>
                    <h3 className="text-white font-semibold">Access Restricted</h3>
                    <p className="text-gray-400 text-sm">This project is not available for public access.</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  {selectedProject.liveUrl && (
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
                  )}
                  {selectedProject.githubUrl && (
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
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
