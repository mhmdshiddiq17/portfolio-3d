# Setup Database untuk Production

## Masalah
Login error 401 karena database belum di-setup di production (belum ada admin user).

## Solusi: Setup Database di Vercel

### Step 1: Pilih Database untuk Production

**⚠️ PENTING: JANGAN gunakan SQLite di production!**

Pilih salah satu opsi database:

#### Opsi 1: Vercel Postgres (Recommended)
Gratis untuk hobby projects, auto-scaling.

1. Di Vercel Dashboard → Project → **Storage**
2. Click **"Create Database"** → **"Postgres"**
3. Pilih plan **Hobby** (Free)
4. Copy **Connection String**

#### Opsi 2: Neon (PostgreSQL)
Gratis tier available, performa baik.

1. Sign up di [Neon](https://neon.tech/)
2. Create new project
3. Copy connection string

#### Opsi 3: Supabase (PostgreSQL)
Gratis tier dengan fitur lengkap.

1. Sign up di [Supabase](https://supabase.com/)
2. Create new project
3. Copy connection string

### Step 2: Setup Environment Variables di Vercel

1. Di Vercel Dashboard → Project → **Settings** → **Environment Variables**
2. Tambahkan variables berikut:

```
DATABASE_URL = [paste connection string dari step 1]
NEXTAUTH_URL = https://mhmdshiddiq-v2.vercel.app
NEXTAUTH_SECRET = [generate dengan: openssl rand -base64 32]
ADMIN_EMAIL = admin@portfolio.com
ADMIN_PASSWORD = [password yang kuat]
```

**PENTING:**
- `NEXTAUTH_URL` harus pakai `https://`
- `NEXTAUTH_URL` jangan pakai trailing slash
- `NEXTAUTH_SECRET` minimal 32 karakter

### Step 3: Update Build Command di Vercel

1. Di Vercel Dashboard → Project → **Settings** → **General**
2. Scroll ke **Build & Development Settings**
3. Update **Build Command**:

```
npx vercel-build
```

Ini akan otomatis menjalankan:
- `prisma generate` - Generate Prisma Client
- `prisma db push` - Push schema ke database
- `next build` - Build Next.js app

### Step 4: Deploy & Seed Database

Setelah environment variables ter-set:

1. **Push code ke GitHub** (jika belum)
2. **Vercel akan auto-deploy** dari GitHub
3. **Tunggu deploy selesai**

### Step 5: Seed Database (Manual)

Setelah deploy berhasil, jalankan seed command:

#### Cara 1: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Pull environment variables
vercel env pull .env

# Seed database
npx prisma db seed
```

#### Cara 2: Via Prisma Studio (GUI)
```bash
# Connect ke production database
npx prisma studio

# Buka Prisma Studio di browser
# Create admin user manually via GUI
```

#### Cara 3: Create Admin User Manual via SQL

Connect ke production database dan jalankan:

```sql
-- Insert admin user
INSERT INTO "User" (
  email,
  password,
  name,
  role,
  "bio",
  "createdAt",
  "updatedAt"
) VALUES (
  'admin@portfolio.com',
  '$2a$10$hashed_password_here', -- Ganti dengan hash dari bcrypt
  'Admin',
  'admin',
  'Administrator dan penulis blog',
  NOW(),
  NOW()
);
```

Untuk generate password hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

### Step 6: Verifikasi Setup

1. **Test login** ke `/auth/admin-login`
2. **Gunakan credentials** dari environment variables
3. **Check logs** di Vercel jika masih error

## Troubleshooting

### Error: "User tidak ditemukan"
**Cause**: Admin user belum ada di database
**Solution**: Jalankan seed command atau create admin user manual

### Error: "Password salah"
**Cause**: Password tidak match
**Solution**:
- Verify password di environment variables
- Re-hash password dengan bcrypt
- Re-seed database

### Error: Database connection timeout
**Cause**: Database tidak accessible dari Vercel
**Solution**:
- Check database connection string
- Verify database firewall allows Vercel IP
- Use Vercel Postgres untuk best compatibility

### Error: Prisma Client not generated
**Cause**: `prisma generate` tidak jalan
**Solution**:
- Check build command includes `prisma generate`
- Verify `postinstall` script exists
- Redeploy setelah update package.json

## Quick Checklist

Sebelum mencoba login lagi:

- [ ] Database sudah di-setup (Vercel Postgres/Neon/Supabase)
- [ ] Environment variables sudah ter-set dengan benar
- [ ] `DATABASE_URL` menggunakan production database string
- [ ] `NEXTAUTH_URL` menggunakan production domain dengan https
- [ ] `NEXTAUTH_SECRET` sudah di-set (min 32 chars)
- [ ] Build command sudah di-update ke `npx vercel-build`
- [ ] Deploy sudah selesai sukses
- [ ] Database sudah di-seed dengan admin user
- [ ] Admin user credentials sudah verified

## Testing Production Login

Setelah setup selesai:

1. Buka `https://mhmdshiddiq-v2.vercel.app/auth/admin-login`
2. Login dengan credentials dari environment variables
3. Check Vercel logs jika masih error
4. Monitor database queries via Prisma Studio

## Maintenance Tips

### Regular Database Backups
- Setup automated backups jika menggunakan paid database plan
- Export data regularly untuk safety

### Monitor Performance
- Check Vercel analytics
- Monitor database query performance
- Optimize slow queries

### Security Best Practices
- Rotate NEXTAUTH_SECRET periodically
- Update admin credentials regularly
- Monitor failed login attempts
- Use strong passwords (min 12 chars)

---

**Need Help?**
- Check `TROUBLESHOOTING.md` untuk error spesifik
- Review Vercel deployment logs
- Verify database connection string
- Test environment variables locally

**Last Updated**: 2025-04-05
