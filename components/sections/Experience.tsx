'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Building2 } from 'lucide-react';

const experiences = [
  {
    title: 'Software Engineer',
    company: 'PT AGRINAS PANGAN NUSANTARA (Persero)',
    location: 'Indonesia, Jakarta',
    period: '2026',
    description: 'Leading development of enterprise-scale applications using Next.js, Node.js, and cloud technologies. Mentoring junior developers and architecting scalable solutions.',
    achievements: [
      'Architected microservices infrastructure reducing deployment time by 60%',
      'Led team of 5 developers in delivering flagship product',
      'Implemented CI/CD pipelines improving code quality and delivery speed',
    ],
    technologies: ['React.js', 'TypeScript', 'Node.js', 'Laravel', 'PostgreSQL', 'TRPC'],
  },
  {
    title: 'Full Stack Developer Application Support',
    company: 'Berijalan - Astra Credit Companies',
    location: 'Yogyakarta, Indonesia',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple client projects focusing on React and Node.js. Collaborated with design teams to implement pixel-perfect UIs.',
    achievements: [
      'Delivered 15+ client projects with 100% satisfaction rate',
      'Optimized application performance improving load times by 40%',
      'Introduced automated testing reducing bugs by 50%',
    ],
    technologies: ['React', 'Vue.js', 'Node.js', 'MongoDB', 'Express', 'AWS'],
  },
  {
    title: 'Frontend Developer Seva.ID',
    company: 'Berijalan - Astra Credit Companies',
    location: 'Yogyakarta, Indonesia',
    period: '2019 - 2020',
    description: 'Created responsive and interactive user interfaces for various clients. Specialized in React and modern CSS frameworks.',
    achievements: [
      'Built 20+ responsive websites for diverse clients',
      'Developed reusable component library used across projects',
      'Collaborated with UX team to improve user engagement by 35%',
    ],
    technologies: ['React', 'JavaScript', 'SASS', 'Webpack', 'Git', 'Figma'],
  },
  {
    title: 'Cloud Computing Cohort',
    company: 'Bangkit Academy By Google, GoTo and Traveloka',
    location: 'Online',
    period: '2023',
    description: 'Started career building web applications and learning best practices in software development.',
    achievements: [
      'Contributed to 3 major product features',
      'Learned agile development methodologies',
      'Participated in code reviews and team planning',
    ],
    technologies: ['JavaScript', 'HTML', 'CSS', 'jQuery', 'PHP', 'MySQL'],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 glow-text">
            Work Experience
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A journey through my professional career and achievements
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col lg:flex-row gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full glow-border top-8" />

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass rounded-2xl p-8 glow-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-primary mb-1">
                          <Building2 size={18} />
                          <span className="font-semibold">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin size={16} />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-secondary bg-secondary/10 px-4 py-2 rounded-lg">
                        <Calendar size={18} />
                        <span className="font-semibold">{exp.period}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.1 + i * 0.1 }}
                            className="flex items-start gap-2 text-gray-400"
                          >
                            <span className="text-primary mt-1">✓</span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
