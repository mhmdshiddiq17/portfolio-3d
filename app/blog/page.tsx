'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  category: string | null;
  tags: string | null;
  publishedAt: string;
  views: number;
  featured: boolean;
  author: {
    name: string;
    image: string | null;
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data.posts || []);
      setFilteredPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <section className="min-h-screen py-20 relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 glow-text">
            Blog
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Artikel, tutorial, dan insight seputar teknologi dan web development
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari artikel berdasarkan judul, kategori, atau konten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-darker border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            {searchQuery && (
              <p className="text-gray-400 text-sm mt-2 text-center">
                Ditemukan {filteredPosts.length} artikel untuk "{searchQuery}"
              </p>
            )}
          </motion.div>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading posts...</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <div className="glass rounded-2xl overflow-hidden glow-border">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    <div>
                      <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30">
                        Featured
                      </span>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4 hover:text-primary transition-colors">
                          {featuredPost.title}
                        </h2>
                      </Link>
                      <p className="text-gray-400 mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span>{featuredPost.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{formatDate(featuredPost.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>5 min read</span>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-semibold"
                      >
                        Baca Selengkapnya
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* All Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="glass rounded-xl overflow-hidden hover:glow-border transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`}>
                    {/* Cover Image */}
                    {post.coverImage ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-6xl">📝</span>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Category */}
                      {post.category && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                          {post.category}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mt-4 mb-2 hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>5 min</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {searchQuery ? `Tidak ada artikel untuk "${searchQuery}"` : 'Belum ada artikel'}
                </h3>
                <p className="text-gray-400">
                  {searchQuery ? 'Coba kata kunci lain' : 'Stay tuned untuk konten menarik!'}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
