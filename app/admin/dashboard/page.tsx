import { prisma } from '@/lib/prisma'
import { FileText, Eye, Calendar, Plus, Edit } from 'lucide-react'
import Link from 'next/link'
import { DashboardFullscreen } from '@/components/admin/DashboardFullscreen'

async function getDashboardStats() {
  const [totalPosts, publishedPosts, draftPosts, totalViews] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.post.aggregate({
      where: { published: true },
      _sum: { views: true },
    }),
  ])

  const recentPosts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalViews: totalViews._sum.views || 0,
    recentPosts,
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'from-primary to-secondary',
      trend: '+2 this week',
    },
    {
      title: 'Published',
      value: stats.publishedPosts,
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      trend: 'Active posts',
    },
    {
      title: 'Drafts',
      value: stats.draftPosts,
      icon: Edit,
      color: 'from-yellow-500 to-orange-500',
      trend: 'Pending review',
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'from-purple-500 to-pink-500',
      trend: 'All time',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening with your blog.</p>
        </div>
        <DashboardFullscreen />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.title}
              className="glass rounded-xl p-6 glow-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                  <p className="text-gray-500 text-xs mt-1">{stat.trend}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link
          href="/admin/posts/new"
          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-darker font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2"
        >
          <Plus size={20} />
          <span>New Post</span>
        </Link>
        <Link
          href="/blog"
          target="_blank"
          className="px-6 py-3 glass text-white font-semibold rounded-lg hover:glow-border transition-all duration-300 flex items-center gap-2"
        >
          <Eye size={20} />
          <span>View Blog</span>
        </Link>
      </div>

      {/* Recent Posts */}
      <div className="glass rounded-xl p-6 glow-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-primary hover:text-secondary transition-colors text-sm font-semibold"
          >
            View All →
          </Link>
        </div>

        <div className="space-y-4">
          {stats.recentPosts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400 mb-4">No posts yet. Create your first post!</p>
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-darker font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                <Plus size={20} />
                <span>Create Post</span>
              </Link>
            </div>
          ) : (
            stats.recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 bg-darker/50 rounded-lg hover:bg-darker transition-colors group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        post.published
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    {post.featured && (
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">
                    {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right mr-4">
                    <p className="text-gray-400 text-sm">{post.views} views</p>
                  </div>

                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="p-2 text-gray-400 hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 text-gray-400 hover:text-secondary transition-colors"
                    title="View"
                  >
                    <Eye size={18} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6 glow-border">
          <h3 className="text-xl font-bold text-white mb-4">Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Published Posts</span>
                <span className="text-white font-semibold">{stats.publishedPosts}</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  style={{ width: `${(stats.publishedPosts / stats.totalPosts) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Draft Posts</span>
                <span className="text-white font-semibold">{stats.draftPosts}</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                  style={{ width: `${(stats.draftPosts / stats.totalPosts) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 glow-border">
          <h3 className="text-xl font-bold text-white mb-4">Tips</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Keep your posts updated with fresh content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Use featured posts to highlight important content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Engage with your audience through comments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Monitor your views to understand popular topics</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
