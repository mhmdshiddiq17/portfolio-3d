'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Calendar, Clock, TrendingUp, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { formatReadingTime, formatDate, formatLocaleDate } from '@/utils/blogHelpers';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  category: string | null;
  publishedAt: string;
  views: number;
  content?: string;
}

export default function FeaturedBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { getHistoryItem, addToHistory, isLoaded: historyLoaded } = useReadingHistory();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog?featured=true&limit=3');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-20 relative">
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="text-primary" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Featured Blog Posts
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Latest insights, tutorials, and thoughts on technology and development
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
            <p className="text-gray-400 mb-6">We're preparing some great content for you!</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 glass text-white font-semibold rounded-lg hover:glow-border transition-all duration-300"
            >
              Visit Blog
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl overflow-hidden hover:glow-border transition-all duration-300 group"
                onMouseEnter={() => {
                  // Track when user shows interest in this post
                  if (historyLoaded) {
                    const estimatedTime = Math.max(1, Math.ceil(post.excerpt.length / 200));
                    addToHistory({
                      postId: post.id,
                      slug: post.slug,
                      title: post.title,
                      readingTime: estimatedTime,
                    });
                  }
                }}
              >
                <Link 
                  href={`/blog/${post.slug}`}
                  onClick={() => {
                    // Track click on post
                    if (historyLoaded) {
                      const estimatedTime = Math.max(1, Math.ceil(post.excerpt.length / 200));
                      addToHistory({
                        postId: post.id,
                        slug: post.slug,
                        title: post.title,
                        readingTime: estimatedTime,
                      });
                    }
                  }}
                >
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-6xl">📝</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      {post.category && (
                        <span className="px-3 py-1 bg-primary/90 text-darker text-xs font-semibold rounded-full backdrop-blur-sm">
                          {post.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta - Real reading time and history based data */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{formatLocaleDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>
                          {historyLoaded ? (
                            (() => {
                              const historyItem = getHistoryItem(post.id);
                              if (historyItem?.readingTime) {
                                return formatReadingTime(historyItem.readingTime);
                              }
                              // Fallback: estimate from excerpt if no content
                              const estimatedTime = Math.max(1, Math.ceil(post.excerpt.length / 200));
                              return formatReadingTime(estimatedTime);
                            })()
                          ) : (
                            'Loading...'
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Reading Progress Badge (if previously read) */}
                    {historyLoaded && (() => {
                      const historyItem = getHistoryItem(post.id);
                      if (historyItem && historyItem.progress && historyItem.progress > 0) {
                        return (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                              <span>Progress</span>
                              <span>{historyItem.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                              <div
                                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${historyItem.progress}%` }}
                              />
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* Read More Link */}
                    <div className="flex items-center text-primary text-sm font-semibold group-hover:text-secondary transition-colors">
                      <span>Read More</span>
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-darker font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-lg"
            >
              <span>View All Posts</span>
              <ArrowRight size={24} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
