# Troubleshooting Guide - Login Error 401

## Problem
When trying to login admin at `/api/auth/callback/credentials`, you get:
- **Status**: 401 Unauthorized
- **Endpoint**: `/api/auth/callback/credentials`

## Root Cause
NextAuth with `strategy: 'jwt'` should NOT use database adapter. The adapter is only needed for database session strategy.

## Solution Applied

### 1. Removed Custom Adapter from `lib/auth.ts`
The custom Prisma adapter has been removed since we're using JWT strategy.

**Before:**
```typescript
export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(), // ❌ This causes issues with JWT
  session: {
    strategy: 'jwt', // ❌ Conflict with adapter
  },
  // ...
}
```

**After:**
```typescript
export const authOptions: NextAuthOptions = {
  // No adapter for JWT strategy ✅
  session: {
    strategy: 'jwt', // ✅ Works without adapter
  },
  // ...
}
```

### 2. Environment Variables Checklist

Make sure these are set correctly in Vercel:

```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-min-32-chars
DATABASE_URL=your-database-connection-string
```

**Important Notes:**
- `NEXTAUTH_URL` must use `https://` in production
- `NEXTAUTH_URL` should NOT have trailing slash
- `NEXTAUTH_SECRET` must be same as used in local development (if you want to keep same sessions)

### 3. Database Seeding

Ensure admin user exists in production database:

```bash
# If using Vercel Postgres or external database
npx prisma db push

# Then seed the database
npx prisma db seed
```

Or manually create admin user via database client:
```sql
INSERT INTO User (email, password, name, role)
VALUES (
  'your-email@example.com',
  'hashed-password',
  'Admin Name',
  'admin'
);
```

## Testing Steps

### 1. Check Environment Variables in Vercel
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify all variables are set
3. Redeploy if changes were made

### 2. Check Database Connection
1. Test database connection string
2. Verify user table exists and has records
3. Check admin user credentials

### 3. Test Login Flow
1. Go to `/auth/admin-login`
2. Enter admin credentials
3. Check browser console for errors
4. Check Network tab for the exact error response

## Common Issues & Solutions

### Issue 1: "User tidak ditemukan"
**Cause**: Admin user doesn't exist in database
**Solution**: Seed database with admin user

### Issue 2: "Password salah"
**Cause**: Wrong password or password hash mismatch
**Solution**:
- Verify password in environment variables
- Re-seed database with correct credentials

### Issue 3: NEXTAUTH_URL mismatch
**Cause**: `NEXTAUTH_URL` doesn't match actual domain
**Solution**:
- Set `NEXTAUTH_URL=https://your-domain.vercel.app`
- Redeploy application

### Issue 4: Database connection timeout
**Cause**: Database not accessible from Vercel
**Solution**:
- Use Vercel Postgres or external database
- Don't use SQLite in production
- Check database firewall settings

## Monitoring & Debugging

### Enable NextAuth Debug Mode
Add to `lib/auth.ts`:
```typescript
export const authOptions: NextAuthOptions = {
  debug: true, // Add this for development
  // ... rest of config
}
```

### Check Logs in Vercel
1. Go to Vercel Dashboard → Your Project → Logs
2. Filter by `/api/auth/*`
3. Look for specific error messages

### Test Credentials API Directly
```bash
curl -X POST https://your-domain.vercel.app/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-password"
  }'
```

## Prevention

### Best Practices for Production
1. **Never use SQLite in production** - Use Vercel Postgres or external database
2. **Always set strong NEXTAUTH_SECRET** - Generate with `openssl rand -base64 32`
3. **Keep NEXTAUTH_URL consistent** - Use the actual production domain
4. **Seed database properly** - Ensure admin user exists before first login
5. **Monitor Vercel logs** - Check regularly for authentication errors

### Security Checklist
- [ ] Change default admin credentials
- [ ] Use strong NEXTAUTH_SECRET (min 32 characters)
- [ ] Enable HTTPS only
- [ ] Set up rate limiting for login attempts
- [ ] Monitor failed login attempts
- [ ] Regular database backups

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [NextAuth Credentials Provider](https://next-auth.js.org/providers/credentials)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/vercel)

## Still Having Issues?

1. Check Vercel deployment logs
2. Verify database is accessible
3. Test environment variables locally with production values
4. Enable debug mode temporarily
5. Check NextAuth.js GitHub issues for similar problems

---

**Last Updated**: 2025-04-05
**NextAuth Version**: v4.24.10
**Next.js Version**: v15.1.3
