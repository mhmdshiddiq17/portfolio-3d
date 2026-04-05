import { Calendar, Clock, User, Eye, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate, readingTime } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          name: true,
          image: true,
          bio: true,
        },
      },
    },
  })
  return post
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `mhmdshiddiq | ${post.title}`,
    description: post.excerpt || post.title,
    openGraph: {
      title: `mhmdshiddiq | ${post.title}`,
      description: post.excerpt || post.title,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author.name || ''],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-primary hover:text-secondary">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="min-h-screen py-20 relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          {/* Category */}
          {post.category && (
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm rounded-full border border-primary/30 mb-6">
              {post.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 glow-text">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 pb-8 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{readingTime(post.content)} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={18} />
              <span>{post.views} views</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full border border-secondary/20"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-12 rounded-2xl overflow-hidden glow-border">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="glass rounded-2xl p-8 md:p-12 glow-border">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-white mb-3 mt-4">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary hover:text-secondary transition-colors underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>
                ),
                code: ({ children }) => (
                  <code className="bg-darker px-2 py-1 rounded text-primary text-sm">{children}</code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-darker p-4 rounded-lg overflow-x-auto mb-4 border border-primary/20">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-gray-400 my-4">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Share this article</h3>
                <p className="text-gray-400 text-sm">Help others discover this content</p>
              </div>
              <div className="flex gap-3">
                <button className="w-10 h-10 glass rounded-lg flex items-center justify-center text-primary hover:text-white hover:glow-border transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Author Box */}
        <div className="mt-8 glass rounded-2xl p-8 glow-border">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-darker">
                {post.author.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{post.author.name}</h3>
              {post.author.bio && (
                <p className="text-gray-400 leading-relaxed">{post.author.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
