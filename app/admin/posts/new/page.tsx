'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'Technology',
    tags: '',
    published: false,
    featured: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });

  const handleSubmit = async (publish = false) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          published: publish,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const post = await response.json();
      router.push(`/admin/posts/${post.id}/edit?success=true`);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: formData.slug || generateSlug(value),
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Create New Post</h1>
            <p className="text-gray-400">Write and publish your blog post</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-6 py-3 glass text-white font-semibold rounded-lg hover:glow-border transition-all duration-300 flex items-center gap-2"
          >
            <Eye size={20} />
            <span>{previewMode ? 'Edit' : 'Preview'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="glass rounded-xl p-6 glow-border">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors text-xl font-semibold"
              placeholder="Enter post title..."
              required
            />
          </div>

          {/* Content */}
          <div className="glass rounded-xl p-6 glow-border">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content (Markdown) *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors font-mono text-sm"
              placeholder="Write your content in Markdown..."
              required
            />
            <p className="text-gray-500 text-xs mt-2">
              Supports GitHub Flavored Markdown. Use ## for headings, ** for bold, etc.
            </p>
          </div>

          {/* Excerpt */}
          <div className="glass rounded-xl p-6 glow-border">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="Brief description of the post..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Options */}
          <div className="glass rounded-xl p-6 glow-border">
            <h3 className="text-lg font-bold text-white mb-4">Publish Options</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Published</label>
                <button
                  onClick={() => setFormData({ ...formData, published: !formData.published })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    formData.published ? 'bg-primary' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      formData.published ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Featured</label>
                <button
                  onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    formData.featured ? 'bg-primary' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      formData.featured ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => handleSubmit(false)}
                disabled={isLoading || !formData.title || !formData.content}
                className="flex-1 py-2 glass text-white font-semibold rounded-lg hover:glow-border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                <span>Save Draft</span>
              </button>
              <button
                onClick={() => handleSubmit(true)}
                disabled={isLoading || !formData.title || !formData.content}
                className="flex-1 py-2 bg-gradient-to-r from-primary to-secondary text-darker font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                <span>Publish</span>
              </button>
            </div>
          </div>

          {/* Permalink */}
          <div className="glass rounded-xl p-6 glow-border">
            <h3 className="text-lg font-bold text-white mb-4">Permalink</h3>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 bg-darker border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="post-url-slug"
            />
            <p className="text-gray-500 text-xs mt-2">
              /blog/{formData.slug || 'post-url-slug'}
            </p>
          </div>

          {/* Category & Tags */}
          <div className="glass rounded-xl p-6 glow-border">
            <h3 className="text-lg font-bold text-white mb-4">Category & Tags</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-darker border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option>Technology</option>
                  <option>Tutorial</option>
                  <option>Career</option>
                  <option>Projects</option>
                  <option>Thoughts</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-gray-500 text-xs mt-2">Separate tags with commas</p>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="glass rounded-xl p-6 glow-border">
            <h3 className="text-lg font-bold text-white mb-4">Cover Image</h3>
            <input
              type="url"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              className="w-full px-4 py-2 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors text-sm"
              placeholder="https://example.com/image.jpg"
            />
            {formData.coverImage && (
              <img
                src={formData.coverImage}
                alt="Cover preview"
                className="w-full h-32 object-cover rounded-lg mt-3"
              />
            )}
          </div>

          {/* SEO */}
          <div className="glass rounded-xl p-6 glow-border">
            <h3 className="text-lg font-bold text-white mb-4">SEO</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">SEO Title</label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  className="w-full px-4 py-2 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  placeholder="Custom SEO title"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Meta Description</label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  placeholder="Meta description for search engines"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Keywords</label>
                <input
                  type="text"
                  value={formData.seoKeywords}
                  onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                  className="w-full px-4 py-2 bg-darker border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
