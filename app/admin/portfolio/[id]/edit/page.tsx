'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

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

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    longDescription: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
    tags: '',
    category: '',
    featured: false,
    isRestricted: false,
    order: 0,
  });

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/portfolio/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch project');
        }

        const project: Portfolio = data.project;
        setFormData({
          title: project.title,
          slug: project.slug,
          description: project.description,
          longDescription: project.longDescription,
          image: project.image || '',
          liveUrl: project.liveUrl || '',
          githubUrl: project.githubUrl || '',
          tags: project.tags,
          category: project.category || '',
          featured: project.featured,
          isRestricted: project.isRestricted,
          order: project.order,
        });
      } catch (error) {
        console.error('Error fetching project:', error);
        alert('Failed to load project. Please try again.');
        router.push('/admin/portfolio');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProject();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/portfolio/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update project');
      }

      alert('Project updated successfully!');
      router.push('/admin/portfolio');
    } catch (error) {
      console.error('Error updating project:', error);
      alert((error as Error).message || 'Failed to update project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/portfolio"
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Edit Project</h1>
          <p className="text-gray-400">Update portfolio project details</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="glass rounded-xl p-6 glow-border">
          <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({
                  ...formData,
                  title: e.target.value,
                  slug: generateSlug(e.target.value)
                })}
                required
                className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="E-Commerce Platform"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="e-commerce-platform"
              />
              <p className="text-gray-500 text-xs mt-1">URL-friendly identifier (auto-generated from title)</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Short Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="A brief description for the project card..."
              />
            </div>

            {/* Long Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Detailed Description *
              </label>
              <textarea
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                required
                rows={8}
                className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="Full project description with details about features, tech stack, and challenges..."
              />
            </div>
          </div>
        </div>

        {/* Links & Media */}
        <div className="glass rounded-xl p-6 glow-border">
          <h2 className="text-2xl font-bold text-white mb-6">Links & Media</h2>

          <div className="space-y-4">
            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cover Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="https://images.unsplash.com/photo-..."
              />
              <p className="text-gray-500 text-xs mt-1">Recommended size: 800x600px</p>
            </div>

            {/* Live URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Live Demo URL
              </label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="https://myproject.com"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="glass rounded-xl p-6 glow-border">
          <h2 className="text-2xl font-bold text-white mb-6">Classification</h2>

          <div className="space-y-4">
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Technologies & Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
              />
              <p className="text-gray-500 text-xs mt-1">Comma-separated technologies</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary/50 transition-colors"
              >
                <option value="">Select category</option>
                <option value="Web Apps">Web Apps</option>
                <option value="Mobile">Mobile</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Blockchain">Blockchain</option>
              </select>
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                min="0"
                className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="0"
              />
              <p className="text-gray-500 text-xs mt-1">Lower numbers appear first</p>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6 pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-700 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-gray-300">Featured Project</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isRestricted}
                  onChange={(e) => setFormData({ ...formData, isRestricted: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-700 text-red-500 focus:ring-red-500 focus:ring-offset-0"
                />
                <span className="text-gray-300">
                  Restricted Access
                  <span className="text-gray-500 text-xs block">Hide live & code links</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-darker font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>

          <Link
            href="/admin/portfolio"
            className="px-8 py-3 border-2 border-gray-700 text-gray-300 font-semibold rounded-lg hover:border-gray-600 transition-all duration-300"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
