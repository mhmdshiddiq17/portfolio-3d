# Panduan Deploy ke Vercel

Panduan lengkap untuk deploy aplikasi portfolio 3D ini ke Vercel.

## Prerequisites

Sebelum memulai, pastikan Anda memiliki:
- Akun GitHub (untuk hosting code)
- Akun Vercel (gratis)
- Project sudah siap untuk deploy

## Persiapan Sebelum Deploy

### 1. Pastikan Code Berjalan di Local

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Setup database
npm run db:push
npm run db:seed

# Test aplikasi
npm run dev
```

Buka http://localhost:3000 dan pastikan semua fitur berjalan normal.

### 2. Update Environment Variables untuk Production

Generate `NEXTAUTH_SECRET` yang aman:

```bash
# Generate random string untuk NEXTAUTH_SECRET
openssl rand -base64 32
```

Atau gunakan: https://generate-secret.vercel.app/32

### 3. Push Code ke GitHub

```bash
# Initialize git repository
git init

# Add semua file
git add .

# Commit pertama
git commit -m "Initial commit: Portfolio 3D website"

# Create repository di GitHub, lalu:
git remote add origin https://github.com/username/portfolio-3d.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

## Deploy ke Vercel

### Opsi 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Import Project ke Vercel

1. Login ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import dari GitHub:
   - Pilih repository GitHub Anda
   - Klik **"Import"**

#### Step 2: Konfigurasi Project

Vercel akan otomatis mendeteksi ini sebagai Next.js project. Perlu konfigurasi:

**Build Settings** (biasanya otomatis):
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### Step 3: Environment Variables

Tambahkan environment variables berikut di Vercel:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="https://your-project.vercel.app"
NEXTAUTH_SECRET="your-generated-secret-min-32-characters"
ADMIN_EMAIL="your-email@example.com"
ADMIN_PASSWORD="your-secure-password"
```

**PENTING**:
- Ganti `https://your-project.vercel.app` dengan domain Vercel Anda
- Ganti `your-generated-secret-min-32-characters` dengan secret yang sudah di-generate
- Ganti `ADMIN_EMAIL` dan `ADMIN_PASSWORD` dengan kredensial yang aman

#### Step 4: Deploy

Klik **"Deploy"** dan tunggu proses deploy selesai.

### Opsi 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login ke Vercel

```bash
vercel login
```

#### Step 3: Deploy Project

```bash
# Deploy ke preview URL
vercel

# Deploy ke production
vercel --prod
```

Ikuti instruksi di terminal untuk setup environment variables.

## Setup Database di Production

### Problem: SQLite di Vercel

Vercel adalah serverless platform, artinya file system bersifat **read-only** dan **ephemeral**. Database SQLite tidak bisa digunakan langsung di production.

### Solusi 1: Gunakan Vercel Postgres (Recommended)

Vercel Postgres adalah database yang kompatibel dengan Vercel infrastructure.

#### Setup Vercel Postgres

1. Di Vercel Dashboard, buka project Anda
2. Masuk ke **"Storage"** tab
3. Klik **"Create Database"** → Pilih **"Postgres"**
4. Pilih plan (Free tier available)
5. Copy connection string

#### Update Environment Variables

Di Vercel Dashboard, update `DATABASE_URL`:

```
DATABASE_URL="postgres://user:password@host/database"
```

#### Update Prisma Schema

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ... rest of schema
```

#### Push Schema ke Production Database

```bash
# Push schema ke production database
npx prisma db push

# Seed production database
npx prisma db seed
```

### Solusi 2: Gunakan External Database Service

Alternatif database services yang kompatibel dengan Vercel:

- **Neon** (PostgreSQL, free tier available)
- **Supabase** (PostgreSQL, free tier available)
- **PlanetScale** (MySQL, free tier available)
- **Railway** (PostgreSQL, paid)

#### Example: Neon Database

1. Sign up di [Neon](https://neon.tech/)
2. Create new project
3. Copy connection string
4. Update `DATABASE_URL` di Vercel environment variables
5. Update `prisma/schema.prisma` untuk menggunakan `postgresql`

## Custom Domain (Optional)

### Setup Custom Domain di Vercel

1. Di Vercel Dashboard, buka **"Settings"** → **"Domains"**
2. Klik **"Add"** dan masukkan domain Anda
3. Pilih opsi yang sesuai:
   - **Add to existing project**: Gunakan existing domain
   - **Buy a domain**: Beli domain baru via Vercel
4. Follow instruksi DNS setup

### Update Environment Variables

Jika menggunakan custom domain, update `NEXTAUTH_URL`:

```
NEXTAUTH_URL="https://your-custom-domain.com"
```

## Post-Deploy Checklist

Setelah deploy selesai:

- [ ] Test semua halaman (Home, About, Blog, dll)
- [ ] Test admin login
- [ ] Test create/edit blog post
- [ ] Test 3D animations
- [ ] Test responsive design di mobile
- [ ] Test SEO metadata
- [ ] Check console untuk errors
- [ ] Test performance dengan [Lighthouse](https://pagespeed.web.dev/)

## Monitoring & Analytics

### Vercel Analytics

1. Install Vercel Analytics:

```bash
npm install @vercel/analytics
```

2. Update `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Error Tracking

Gunakan error tracking seperti:
- [Sentry](https://sentry.io/)
- [LogRocket](https://logrocket.com/)

## Troubleshooting

### Build Errors

Jika build gagal:

1. Check build logs di Vercel Dashboard
2. Pastikan environment variables sudah benar
3. Test locally dengan production environment:

```bash
npm run build
npm start
```

### Database Connection Issues

Jika database tidak terkoneksi:

1. Check `DATABASE_URL` environment variable
2. Pastikan database bisa diakses dari Vercel
3. Test connection string locally dengan production database

### NextAuth Issues

Jika authentication tidak berfungsi:

1. Pastikan `NEXTAUTH_URL` sesuai dengan domain production
2. Check `NEXTAUTH_SECRET` sudah ter-set dengan benar
3. Pastikan database NextAuth tables sudah ter-create

### 3D Components Not Loading

Jika 3D components tidak muncul:

1. Pastikan Next.js config sudah benar
2. Check bahwa `Scene3D.tsx` menggunakan `'use client'`
3. Verify Three.js dependencies tidak ter-block oleh CSP

## Performance Optimization

### Enable Vercel Edge Network

Vercel otomatis deploy ke Edge Network untuk static assets.

### Optimasi Gambar

Gunakan Next.js Image component:

```tsx
import Image from 'next/image'

<Image
  src="/profile.jpg"
  alt="Profile"
  width={400}
  height={400}
  priority
/>
```

### Environment-Specific Builds

Untuk environment variables:

```tsx
const isProduction = process.env.NODE_ENV === 'production'
```

## Update Code Setelah Deploy

Setiap kali ingin update code:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push

# Vercel akan otomatis redeploy
```

Atau deploy manual dari Vercel Dashboard.

## Cost Estimation

### Vercel Free Tier
- 100GB bandwidth per month
- Unlimited deployments
- Automatic HTTPS
- 1000 serverless function executions per day

### When to Upgrade
Upgrade ke Pro jika:
- Traffic > 1000 visitors/day
- Butuh custom domain
- Butuh lebih banyak function executions

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/vercel)

## Support

Jika mengalami issues:
- Check [Vercel Status](https://www.vercel-status.com/)
- Review [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)
- Ask di [Vercel Discord](https://vercel.com/discord)

---

**Selamat Deploy! 🚀** aplikasi portfolio 3D Anda sekarang siap untuk dunia lihat.
