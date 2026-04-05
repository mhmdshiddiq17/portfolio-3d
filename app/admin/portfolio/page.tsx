'use client';

import { useState, useEffect } from 'react';
import { FolderKanban, Plus, Edit, Trash2, ExternalLink, Code2, Lock } from 'lucide-react'
import Link from 'next/link'

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
  featured: boolean;
  isRestricted: boolean;
  order: number;
  createdAt: string;
}

async function getPortfolios() {
  const response = await fetch('/api/portfolio');
  const data = await response.json();
  return data.projects || [];
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getPortfolios().then(setProjects).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setProjects(projects.filter(p => p.id !== id));
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Portfolio Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-darker font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2"
        >
          <Plus size={20} />
          <span>New Project</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="glass rounded-xl p-4 glow-border">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
          />
          <FolderKanban className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Projects List */}
      <div className="glass rounded-xl overflow-hidden glow-border">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <FolderKanban className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-white mb-2">No projects yet</h3>
            <p className="text-gray-400 mb-6">Create your first portfolio project</p>
            <Link
              href="/admin/portfolio/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-darker font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <Plus size={20} />
              <span>Create Project</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-darker/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-darker/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-4">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FolderKanban className="text-primary" size={24} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-white font-semibold">{project.title}</h3>
                            {project.isRestricted && (
                              <div title="Restricted access">
                                <Lock size={14} className="text-red-400" />
                              </div>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-1 mt-1">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {project.category ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-secondary/20 text-secondary border border-secondary/30">
                          {project.category}
                        </span>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {project.featured && (
                          <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
                            Featured
                          </span>
                        )}
                        {project.isRestricted && (
                          <span className="px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                            Restricted
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 font-mono text-sm">{project.order}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                            title="View Live"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                            title="View Code"
                          >
                            <Code2 size={18} />
                          </a>
                        )}
                        <Link
                          href={`/admin/portfolio/${project.id}/edit`}
                          className="p-2 text-gray-400 hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
