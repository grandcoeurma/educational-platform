# Vercel Deployment Fix - Prisma Client Error

## Problem
When deploying to Vercel, you encountered this error:
```
Error: Cannot find module '.prisma/client/default'
```

This happens because Prisma Client needs to be generated during the build process on Vercel.

## Solution Applied

### 1. Updated `package.json` Scripts
Added two important scripts:

```json
"scripts": {
  "build": "prisma generate && next build",
  "postinstall": "prisma generate"
}
```

- **`postinstall`**: Automatically runs after `npm install` or `pnpm install`, generating Prisma Client
- **`build`**: Ensures Prisma Client is generated before building Next.js

### 2. Created `vercel.json` Configuration
Created a Vercel-specific configuration:

```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "pnpm install"
}
```

This ensures Vercel uses the correct commands during deployment.

## Deployment Steps

### Step 1: Commit and Push Changes
```bash
git add .
git commit -m "fix: Add Prisma generate to build process for Vercel deployment"
git push origin master
```

### Step 2: Configure Environment Variables on Vercel
Make sure your `DATABASE_URL` is set in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your PostgreSQL connection string
   - **Environment**: Production, Preview, Development (select all)

Example format:
```
postgresql://username:password@host:port/database?schema=public
```

### Step 3: Redeploy
After pushing the changes, Vercel will automatically redeploy. If not, you can:
1. Go to your Vercel dashboard
2. Click **Deployments**
3. Click **Redeploy** on the latest deployment

## Verification

After deployment succeeds, verify:
1. ✅ Build completes without errors
2. ✅ Contact form works correctly
3. ✅ Database connections work

## Common Issues & Solutions

### Issue 1: Database Connection Error
**Error**: `Can't reach database server`
**Solution**: 
- Verify your `DATABASE_URL` in Vercel environment variables
- Ensure your database allows connections from Vercel's IP addresses
- For hosted databases (like Supabase, Railway, Neon), check firewall settings

### Issue 2: Different pnpm Version
**Error**: pnpm version mismatch
**Solution**: Add to `package.json`:
```json
"packageManager": "pnpm@8.15.0"
```

### Issue 3: Missing Prisma CLI
**Error**: `prisma: command not found`
**Solution**: Already fixed - `prisma` is in `devDependencies`

## File Changes Summary

### Modified Files:
1. ✅ `package.json` - Added `postinstall` script and updated `build` script
2. ✅ `vercel.json` - Created with build configuration

### Environment Variables Needed:
- `DATABASE_URL` - PostgreSQL connection string

## Testing Locally

To test the build process locally before deploying:

```bash
# Clean install
rm -rf node_modules .next
npm ci

# This should automatically run prisma generate
npm run build

# Test the production build
npm start
```

## Additional Recommendations

### 1. Add Prisma Studio Script (Optional)
Add to `package.json` scripts:
```json
"prisma:studio": "prisma studio"
```

### 2. Database Migration on Vercel
If you need to run migrations on Vercel, you have two options:

**Option A: Manual Migration**
```bash
# Run locally then push
npx prisma migrate deploy
git push
```

**Option B: Add to Build (Not Recommended for Production)**
```json
"build": "prisma migrate deploy && prisma generate && next build"
```

⚠️ **Warning**: Running migrations during build is risky for production. Better to run migrations separately.

### 3. Monitor Build Logs
Always check Vercel build logs:
1. Go to Vercel Dashboard
2. Click on your deployment
3. View **Build Logs** tab
4. Look for "✔ Generated Prisma Client"

## Success Indicators

You'll know it worked when you see in the Vercel build logs:
```
✔ Generated Prisma Client (v6.17.1) to ./node_modules/@prisma/client
```

And then:
```
✓ Compiled successfully
```

## Next Steps

1. ✅ Commit the changes
2. ✅ Push to GitHub
3. ✅ Verify DATABASE_URL in Vercel
4. ✅ Wait for automatic deployment
5. ✅ Test the contact form on production

## Support

If you still encounter issues:
- Check Vercel build logs for specific errors
- Verify all environment variables are set
- Ensure your database is accessible from Vercel
- Check the Vercel Functions logs for runtime errors

---

**Date Fixed**: October 15, 2025
**Status**: Ready for deployment ✅
