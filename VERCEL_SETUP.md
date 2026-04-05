# Setup Vercel Postgres - Production Database

## ⚠️ SECURITY ALERT

Kredensial database Anda sudah terekspos! Mohon segera regenerate:

1. Vercel Dashboard → Your Project → Storage
2. Pilih database Postgres
3. Click **".env"** tab
4. Click **"Reset"** atau **"Regenerate"**
5. Copy connection strings yang baru

## Step-by-Step Setup

### 1. Environment Variables di Vercel

Di Vercel Dashboard → Project → Settings → Environment Variables, tambahkan:

```
DATABASE_URL = [paste POSTGRES_URL di sini]
NEXTAUTH_URL = https://mhmdshiddiq-v2.vercel.app
NEXTAUTH_SECRET = [generate dengan: openssl rand -base64 32]
ADMIN_EMAIL = admin@portfolio.com
ADMIN_PASSWORD = [password kuat minimal 12 karakter]
```

**Catatan Penting:**
- Gunakan **POSTGRES_URL** untuk DATABASE_URL (ini yang paling compatible)
- NEXTAUTH_URL harus pakai https://
- NEXTAUTH_URL jangan ada trailing slash
- NEXTAUTH_SECRET minimal 32 karakter random string

### 2. Generate NEXTAUTH_SECRET

**Cara 1: Menggunakan OpenSSL (Recommended)**
```bash
openssl rand -base64 32
```

**Cara 2: Online Generator**
Kunjungi: https://generate-secret.vercel.app/32

**Cara 3: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Setup Database Schema & Seed

**Option A: Via Local Machine (Recommended)**

1. Pull environment variables dari Vercel:
```bash
npm install -g vercel
vercel login
vercel env pull .env
```

2. Setup database:
```bash
npm run db:setup
```

Ini akan:
- Generate Prisma Client
- Push schema ke production database
- Seed dengan admin user dan sample posts

**Option B: Via Prisma Studio (GUI)**

1. Set DATABASE_URL di terminal:
```bash
export DATABASE_URL="postgres://your-connection-string"
```

2. Jalankan Prisma Studio:
```bash
npx prisma studio
```

3. Buka browser di `http://localhost:5555`
4. Create admin user manually via GUI

**Option C: Manual SQL (Advanced)**

Connect ke database dan jalankan:

```sql
-- Create admin user
INSERT INTO "User" (
  email,
  password,
  name,
  role,
  bio,
  "createdAt",
  "updatedAt"
) VALUES (
  'admin@portfolio.com',
  '$2a$10$[hash dari bcrypt]',
  'Admin',
  'admin',
  'Administrator dan penulis blog',
  NOW(),
  NOW()
);
```

Generate password hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

### 4. Verify Setup

Setelah database setup:

1. **Check tables created**:
```bash
npx prisma studio
```
Pastikan tables: User, Post, Session, Comment sudah ada.

2. **Verify admin user exists**:
Query di Prisma Studio atau SQL:
```sql
SELECT * FROM "User" WHERE email = 'admin@portfolio.com';
```

3. **Test login** setelah deploy selesai.

### 5. Deploy ke Vercel

Setelah environment variables ter-set dan database siap:

1. **Push code ke GitHub** (jika belum)
2. **Vercel akan otomatis redeploy**
3. **Tunggu deploy selesai** (± 2-3 menit)

### 6. Post-Deploy Checklist

Setelah deploy selesai:

- [ ] Buka website: `https://mhmdshiddiq-v2.vercel.app`
- [ ] Test login di: `/auth/admin-login`
- [ ] Gunakan credentials dari environment variables
- [ ] Check Vercel logs untuk errors
- [ ] Test blog pages
- [ ] Verify database connection

## Troubleshooting

### Error: "User tidak ditemukan"
**Cause**: Admin user belum ada di database
**Solution**: Jalankan `npm run db:setup` atau create admin user manual

### Error: "Password salah"
**Cause**: Password tidak match
**Solution**:
1. Check password di environment variables
2. Re-seed database dengan password yang benar
3. Atau update password via Prisma Studio

### Error: Database connection failed
**Cause**: Connection string salah atau database tidak accessible
**Solution**:
1. Verify DATABASE_URL di Vercel environment variables
2. Pastikan connection string menggunakan **POSTGRES_URL**
3. Check Prisma logs di Vercel

### Error: "Prisma Client not generated"
**Cause**: prisma generate tidak jalan
**Solution**:
1. Check `postinstall` script ada di package.json
2. Redeploy dari Vercel dashboard
3. Clear build cache: Vercel → Settings → Git → Clear Build Cache

## Security Best Practices

### 1. Protect Database Credentials
✅ **DO:**
- Regenerate connection strings setelah setup
- Never commit credentials ke Git
- Use environment variables
- Rotate credentials periodically

❌ **DON'T:**
- Share connection strings publicly
- Commit ke version control
- Use same credentials di multiple environments
- Share via chat/email without encryption

### 2. Password Security
✅ **DO:**
- Use strong passwords (min 12 chars)
- Mix uppercase, lowercase, numbers, symbols
- Use password manager
- Change regularly

❌ **DON'T:**
- Use simple passwords
- Reuse passwords dari tempat lain
- Share via plain text
- Store di code

### 3. NEXTAUTH_SECRET
✅ **DO:**
- Generate dengan secure random method
- Use different secret per environment
- Store in environment variables
- Regenerate jika compromised

❌ **DON'T:**
- Use simple strings
- Share publicly
- Use same secret di multiple apps
- Hardcode di files

## Monitoring & Maintenance

### Daily Checks
- [ ] Monitor Vercel logs untuk errors
- [ ] Check website accessibility
- [ ] Verify login functionality

### Weekly Tasks
- [ ] Review database performance
- [ ] Check for suspicious login attempts
- [ ] Backup database jika perlu

### Monthly Tasks
- [ ] Rotate NEXTAUTH_SECRET
- [ ] Update dependencies
- [ ] Review and update credentials
- [ ] Security audit

## Quick Reference

### Environment Variables Summary
```
DATABASE_URL          → Vercel Postgres connection string
NEXTAUTH_URL          → Production domain dengan https
NEXTAUTH_SECRET       → Random 32+ character string
ADMIN_EMAIL           → Admin email address
ADMIN_PASSWORD        → Strong password (12+ chars)
```

### Useful Commands
```bash
# Setup database
npm run db:setup

# Connect to production database
npx prisma studio

# Seed database
npm run db:seed

# Reset database
npm run db:reset

# Push schema changes
npx prisma db push
```

### Vercel Dashboard Links
- Project: https://vercel.com/dashboard
- Storage: https://vercel.com/dashboard/[project]/storage
- Environment Variables: https://vercel.com/dashboard/[project]/settings/environment-variables
- Logs: https://vercel.com/dashboard/[project]/logs

---

**🚨 IMPORTANT: Regenerate database credentials SEKARANG juga!**

Setelah regenerate, update environment variables di Vercel dan jalankan `npm run db:setup` lagi.

**Last Updated**: 2025-04-05
**Database**: Vercel Postgres
**Prisma Version**: 5.22.0
