import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { Home, FileText, LogOut, Mail, FolderKanban } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any).role !== 'admin') {
    redirect('/auth/admin-login')
  }

  return (
    <div className="min-h-screen bg-darker">
      {/* Admin Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-dark border-r border-gray-800 z-50">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            <span className="text-primary">Admin</span> Dashboard
          </h1>
          <p className="text-gray-400 text-sm">Blog Management System</p>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/posts"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-primary/10 rounded-lg transition-colors"
              >
                <FileText size={20} />
                <span>All Posts</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/posts/new"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-primary/10 rounded-lg transition-colors"
              >
                <FileText size={20} />
                <span>New Post</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/portfolio"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-primary/10 rounded-lg transition-colors"
              >
                <FolderKanban size={20} />
                <span>Portfolio</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/portfolio/new"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-primary/10 rounded-lg transition-colors"
              >
                <FolderKanban size={20} />
                <span>New Project</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/messages"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Mail size={20} />
                <span>Messages</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
