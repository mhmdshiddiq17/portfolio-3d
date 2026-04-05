# Troubleshooting - Website Cannot Access

## Check这些问题

### 1. Apakah error yang muncul?

Mohon informasikan:
- Error message apa yang muncul?
- Blank page atau error tertentu?
- Browser console ada error?

### 2. Coba jalankan development server

```bash
npm run dev
```

Lalu buka `http://localhost:3000` dan check:
- Apakah website bisa diakses di local?
- Apakah ada error di terminal?
- Apakah ada error di browser console (F12)?

### 3. Check environment variables

Pastikan di Vercel:

```
DATABASE_URL = [PostgreSQL connection string]
NEXTAUTH_URL = https://mhmdshiddiq-v2.vercel.app
NEXTAUTH_SECRET = [generate baru: openssl rand -base64 32]
ADMIN_EMAIL = admin@portfolio.com
ADMIN_PASSWORD = [password kuat]
```

**PENTING:** 
- NEXTAUTH_SECRET harus di-generate baru, jangan gunakan default
- NEXTAUTH_URL harus pakai https:// untuk production

### 4. Coba test specific endpoints

#### Test Homepage
Buka: `https://mhmdshiddiq-v2.vercel.app`

#### Test Blog Page
Buka: `https://mhmdshiddiq-v2.vercel.app/blog`

#### Test Login Page
Buka: `https://mhmdshiddiq-v2.vercel.app/auth/admin-login`

### 5. Check Vercel Deployment Logs

1. Buka Vercel Dashboard
2. Pilih project Anda
3. Click "Deployments"
4. Pilih deployment terbaru
5. Click "Logs"
6. Lihat apakah ada error

### 6. Common Issues & Solutions

#### Issue: "Invalid NEXTAUTH_URL"
**Solution:**
- Pastikan NEXTAUTH_URL di Vercel: `https://mhmdshiddiq-v2.vercel.app`
- Jangan gunakan `http://` di production
- Jangan ada trailing slash

#### Issue: Database connection failed
**Solution:**
- Verify DATABASE_URL di Vercel environment variables
- Pastikan menggunakan PostgreSQL connection string yang benar
- Check database accessible dari Vercel

#### Issue: Build failed
**Solution:**
- Check Prisma schema valid
- Verify package.json scripts correct
- Clear build cache di Vercel

#### Issue: Runtime error
**Solution:**
- Check browser console (F12 → Console)
- Check Vercel logs
- Verify semua environment variables set

### 7. Quick Diagnosis Steps

Jalankan command ini untuk check:

```bash
# Check Prisma Client generated
npx prisma generate

# Test database connection
npx prisma studio

# Test build locally
npm run build
npm start
```

### 8. Generate Proper NEXTAUTH_SECRET

```bash
# Generate secure secret
openssl rand -base64 32
```

Copy output dan paste ke:
- Vercel Environment Variables → NEXTAUTH_SECRET
- File .env local untuk testing

## Next Steps

Mohon berikan informasi:
1. Screenshot error (jika ada)
2. Browser console errors (F12 → Console)
3. Vercel deployment logs
4. Apakah website bisa diakses di local development?

Dengan informasi ini, saya bisa memberikan solusi yang lebih spesifik.
