import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')
  console.log('📊 Database URL:', process.env.DATABASE_URL?.split('@')[1] || 'not set')

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  console.log('👤 Creating admin user:', adminEmail)

  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
      bio: 'Administrator dan penulis blog',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create sample blog posts
  const samplePosts = [
    {
      title: 'Selamat Datang di Blog Saya',
      slug: 'selamat-datang-di-blog-saya',
      excerpt: 'Ini adalah post pertama di blog portfolio saya. Temukan artikel menarik seputar teknologi dan development.',
      content: `# Selamat Datang! 👋

Halo! Ini adalah post pertama di blog portfolio saya. Di sini saya akan berbagi pengalaman, tutorial, dan insight seputar web development.

## Apa yang akan Anda temukan di sini?

- **Tutorial** panduan langkah demi langkah
- **Best Practices** tips dan trik development
- **Career Advice** pengalaman kerja dan tips karir
- **Tech Reviews** review teknologi terbaru

Stay tuned untuk konten-konten menarik lainnya! 🚀`,
      coverImage: null,
      published: true,
      featured: true,
      authorId: admin.id,
      category: 'Technology',
      tags: 'welcome, blog, portfolio',
      seoTitle: 'Selamat Datang di Blog Portfolio - Tech Insights',
      seoDescription: 'Blog portfolio dengan artikel menarik seputar teknologi dan web development',
      publishedAt: new Date(),
    },
    {
      title: 'Memulai dengan Next.js 15 dan React 19',
      slug: 'memulai-dengan-nextjs-15-dan-react-19',
      excerpt: 'Panduan lengkap memulai project dengan Next.js 15 terbaru dan React 19, termasuk fitur-fitur baru dan improvement performa.',
      content: `# Next.js 15 dan React 19 🚀

Next.js 15 hadir dengan banyak improvement dan fitur baru. Mari kita jelajahi apa saja yang baru!

## Fitur Baru di Next.js 15

### 1. Improved Performance
- Faster build times
- Better caching strategies
- Optimized bundle size

### 2. React 19 Integration
- Enhanced Server Components
- Improved Suspense
- Better error handling

## Getting Started

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

Selamat mengoding! 💻`,
      coverImage: null,
      published: true,
      featured: true,
      authorId: admin.id,
      category: 'Tutorial',
      tags: 'nextjs, react, tutorial, web development',
      seoTitle: 'Panduan Lengkap Next.js 15 dan React 19',
      seoDescription: 'Tutorial lengkap memulai project dengan Next.js 15 dan React 19 terbaru',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      title: 'Tips Karir untuk Full Stack Developer',
      slug: 'tips-karir-full-stack-developer',
      excerpt: 'Pengalaman dan tips untuk成长为 sukses sebagai Full Stack Developer di 2024 dan beyond.',
      content: `# Tips Karir Full Stack Developer 💼

Menjadi Full Stack Developer adalah perjalanan yang menantang tapi rewarding. Berikut tips dari pengalaman saya:

## 1. Master the Fundamentals
- JavaScript/TypeScript yang kuat
- Understanding database concepts
- Knowledge tentang API design

## 2. Keep Learning
Technology selalu berkembang. Pastikan untuk:
- Follow tech blogs dan channels
- Join developer communities
- Build side projects

## 3. Soft Skills Matter
- Communication skills
- Problem-solving abilities
- Team collaboration

Good luck pada perjalanan karir Anda! 🌟`,
      coverImage: null,
      published: true,
      featured: false,
      authorId: admin.id,
      category: 'Career',
      tags: 'career, tips, full stack, developer',
      seoTitle: 'Tips Karir Full Stack Developer 2024',
      seoDescription: 'Pengalaman dan tips karir untuk Full Stack Developer',
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
  ]

  console.log('📝 Creating sample blog posts...')

  for (const postData of samplePosts) {
    await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {},
      create: postData,
    })
  }

  console.log('✅ Sample blog posts created')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
