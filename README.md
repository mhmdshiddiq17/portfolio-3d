# Modern 3D Portfolio Website with CMS Blog

A futuristic, modern portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Three.js. Features stunning 3D animations, smooth transitions, a fully responsive design, and a built-in CMS blog with authentication.

## Features

### Portfolio Features
- 🎨 **Modern Design**: Futuristic UI with glassmorphism effects and neon glow accents
- 🌐 **3D Background**: Interactive Three.js scene with floating geometric shapes and particles
- 📱 **Fully Responsive**: Optimized for all screen sizes
- ⚡ **Smooth Animations**: Powered by Framer Motion
- 🎯 **Sections**: Home, About, Work Experience, Tech Stack, Portfolio, and Contact
- 🔗 **Interactive Navigation**: Smooth scroll with active section highlighting
- 💫 **Dynamic Effects**: Hover animations, scroll reveals, and parallax effects
- 👤 **Profile Photo Frame**: Elegant animated frame for your profile picture

### CMS Blog Features
- 📝 **Full-Featured Blog**: Create, edit, and publish blog posts
- 🔐 **Authentication**: Secure admin login with NextAuth.js
- 💾 **SQLite Database**: Lightweight database with Prisma ORM
- ✍️ **Markdown Support**: Write posts in Markdown with syntax highlighting
- 🏷️ **Categories & Tags**: Organize content with categories and tags
- 📊 **SEO Friendly**: Built-in SEO optimization for each post
- 📈 **View Counter**: Track post popularity
- 💬 **Comment System**: Ready for user engagement (optional)

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Markdown**: React Markdown + Remark GFM

### Backend & Database
- **Authentication**: NextAuth.js v4
- **Database**: SQLite
- **ORM**: Prisma
- **API**: Next.js API Routes

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**:
```bash
cd portfolio-3d
```

2. **Install dependencies**:
```bash
npm install
```

3. **Setup environment variables**:
```bash
cp .env.example .env
```

Edit `.env` and update the following variables:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production-min-32-chars"
ADMIN_EMAIL="admin@portfolio.com"
ADMIN_PASSWORD="admin123"
```

4. **Setup database**:
```bash
# Push database schema
npm run db:push

# Seed database with sample data
npm run db:seed
```

5. **Run the development server**:
```bash
npm run dev
```

6. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## Admin Login

After setting up the database, you can login to the admin panel:

**URL**: http://localhost:3000/admin/login
**Default Credentials**:
- Email: `admin@portfolio.com`
- Password: `admin123`

⚠️ **Important**: Change the default credentials in production!

## Available Scripts

```bash
# Development
npm run dev              # Start development server

# Database
npm run db:push          # Push schema changes to database
npm run db:seed          # Seed database with sample data
npm run db:reset         # Reset and reseed database
npm run db:studio        # Open Prisma Studio (database GUI)

# Production
npm run build            # Build for production
npm start                # Start production server

# Linting
npm run lint             # Run ESLint
```

## Project Structure

```
portfolio-3d/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page component
│   ├── globals.css         # Global styles and Tailwind imports
│   ├── blog/               # Blog pages
│   │   ├── page.tsx        # Blog list page
│   │   └── [slug]/         # Blog post detail page
│   │       └── page.tsx
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth API
│   │   │   └── [...nextauth]/
│   │   └── blog/           # Blog CRUD API
│   │       ├── route.ts
│   │       └── [slug]/route.ts
│   └── admin/              # Admin panel (to be implemented)
├── components/
│   ├── Scene3D.tsx         # Three.js 3D background component
│   ├── Navbar.tsx          # Navigation bar with smooth scroll
│   ├── Footer.tsx          # Footer component
│   └── sections/
│       ├── Home.tsx        # Hero section with profile frame
│       ├── About.tsx       # About me section
│       ├── Experience.tsx  # Work experience timeline
│       ├── TechStack.tsx   # Technical skills showcase
│       ├── Portfolio.tsx   # Projects showcase
│       └── Contact.tsx     # Contact form
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   ├── auth.ts             # NextAuth configuration
│   └── utils.ts            # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seed script
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## Customization

### Personal Information

Update the following files with your information:

1. **components/sections/Home.tsx**: Name, title, social links, profile photo
2. **components/sections/About.tsx**: Bio, skills, stats
3. **components/sections/Experience.tsx**: Work history
4. **components/sections/TechStack.tsx**: Technical skills and technologies
5. **components/sections/Portfolio.tsx**: Projects showcase
6. **components/sections/Contact.tsx**: Contact information

### Adding Your Profile Photo

Replace the placeholder in `components/sections/Home.tsx`:

```tsx
{/* Replace the placeholder div with: */}
<img
  src="/your-photo.jpg"
  alt="Your Name"
  className="w-full h-full object-cover"
/>
```

Place your photo in the `public/` directory.

### Styling

The color scheme is defined in `tailwind.config.ts`:
- Primary: Cyan (#00f0ff)
- Secondary: Blue (#00a8ff)
- Accent: Dark Blue (#0066ff)
- Background: Dark Navy (#0a0e27)

### 3D Scene

Modify `components/Scene3D.tsx` to customize:
- Geometric shapes
- Particle effects
- Animation speeds
- Colors and materials

## Blog Management

### Creating a New Post

Currently, posts can be created through the API or directly in the database. An admin UI is planned for future updates.

**Via API** (requires authentication):
```bash
POST /api/blog
{
  "title": "Your Post Title",
  "slug": "your-post-slug",
  "excerpt": "Brief description",
  "content": "# Markdown content",
  "category": "Technology",
  "tags": "tag1, tag2, tag3",
  "published": true,
  "featured": false
}
```

### Blog Features

- **Markdown Support**: Write posts in Markdown with GitHub Flavored Markdown
- **SEO Optimization**: Each post has SEO meta tags
- **View Counter**: Track how many times each post is viewed
- **Categories**: Organize posts by category
- **Tags**: Add multiple tags to posts
- **Featured Posts**: Mark important posts as featured

## Database Schema

The application uses the following main tables:

- **User**: Admin user accounts
- **Post**: Blog posts with metadata
- **Session**: NextAuth session management
- **Comment**: Post comments (optional feature)

## Security Considerations

### For Production

1. **Change Default Credentials**: Always change the default admin email and password
2. **Use Strong NEXTAUTH_SECRET**: Generate a secure random string (min 32 characters)
3. **Enable HTTPS**: Always use HTTPS in production
4. **Database Backups**: Regular backups of your SQLite database
5. **Rate Limiting**: Implement rate limiting on API endpoints
6. **Input Validation**: All inputs are validated, but review for your specific needs

## Performance Optimization

- Three.js component is loaded dynamically with SSR disabled
- Images are optimized with Next.js Image component
- Lazy loading for heavy components
- Efficient animation with Framer Motion
- Database queries are optimized with Prisma
- Static generation where possible

## Troubleshooting

### Database Issues

If you encounter database issues:
```bash
# Reset database
npm run db:reset
```

### Authentication Issues

If login fails:
1. Check your `.env` file has correct values
2. Ensure database is seeded: `npm run db:seed`
3. Clear browser cookies and try again

### Build Errors

If build fails:
1. Delete `.next` directory: `rm -rf .next`
2. Delete `node_modules`: `rm -rf node_modules`
3. Reinstall: `npm install`
4. Rebuild: `npm run build`

## Roadmap

- [ ] Admin UI for blog management
- [ ] Rich text editor for blog posts
- [ ] Image upload for blog covers
- [ ] Comment system
- [ ] Dark/Light mode toggle
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Analytics dashboard

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.

## Credits

Built with ❤️ using modern web technologies.
