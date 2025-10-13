# Database Setup Checklist

Use this checklist to set up the contact form database step by step.

## ✅ Pre-Setup (Already Complete)

- [x] Prisma schema created (`prisma/schema.prisma`)
- [x] API endpoints created (`app/api/contacts/route.ts`)
- [x] Prisma client configured (`lib/prisma.ts`)
- [x] Contact form updated to use API
- [x] Dependencies installed (`@prisma/client`, `prisma`)
- [x] Prisma Client generated (`npx prisma generate`)
- [x] Documentation created

## 📋 Your Setup Steps

### Step 1: Choose Database Option

Choose ONE of these options:

#### Option A: Local PostgreSQL
- [ ] Install PostgreSQL
  ```bash
  sudo apt install postgresql postgresql-contrib
  ```
- [ ] Start PostgreSQL service
  ```bash
  sudo systemctl start postgresql
  ```
- [ ] Create database
  ```bash
  sudo -u postgres createdb grandcoeur_db
  ```
- [ ] (Optional) Create dedicated user
  ```bash
  sudo -u postgres psql
  CREATE USER grandcoeur_user WITH PASSWORD 'your_password';
  GRANT ALL PRIVILEGES ON DATABASE grandcoeur_db TO grandcoeur_user;
  \q
  ```

#### Option B: Cloud Database (Recommended for beginners)

**Supabase (Free Tier):**
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Sign up / Log in
- [ ] Create new project
- [ ] Go to Settings → Database
- [ ] Copy "Connection string" (URI format)

**Railway (Free Tier):**
- [ ] Go to [railway.app](https://railway.app)
- [ ] Sign up / Log in
- [ ] New Project → Add PostgreSQL
- [ ] Copy DATABASE_URL from Variables tab

**Neon (Free Tier):**
- [ ] Go to [neon.tech](https://neon.tech)
- [ ] Sign up / Log in
- [ ] Create new project
- [ ] Copy connection string

### Step 2: Configure Environment

- [ ] Create `.env` file in project root
  ```bash
  cp .env.example .env
  ```

- [ ] Edit `.env` with your database URL
  
  **For Local PostgreSQL:**
  ```env
  DATABASE_URL="postgresql://postgres:password@localhost:5432/grandcoeur_db"
  ```
  
  **For Cloud Database:**
  ```env
  DATABASE_URL="<paste your connection string here>"
  ```

- [ ] Verify `.env` is in `.gitignore` (already done)

### Step 3: Apply Database Schema

- [ ] Run database push command
  ```bash
  npx prisma db push
  ```
  
  **OR** create a proper migration (recommended):
  ```bash
  npx prisma migrate dev --name init_contacts_table
  ```

- [ ] Verify success (should see: "Your database is now in sync")

### Step 4: Verify Database Setup

- [ ] Open Prisma Studio
  ```bash
  npx prisma studio
  ```

- [ ] Check that you see:
  - Browser opens at `http://localhost:5555`
  - `contacts` table is visible
  - Table has correct columns (id, full_name, phone, etc.)

### Step 5: Test the Contact Form

- [ ] Start development server
  ```bash
  npm run dev
  ```

- [ ] Open browser to `http://localhost:3000`

- [ ] Navigate to contact section

- [ ] Fill out the form:
  - Nom et prénom: "Test User"
  - Numéro de téléphone: "0612345678"
  - Type de condition: "Test"
  - Adresse: "Test Address"
  - Message: "Test message"

- [ ] Click "Envoyer le message avec ♥"

- [ ] Verify success message appears

- [ ] Check form fields are cleared

### Step 6: Verify Data Storage

- [ ] Go back to Prisma Studio (`http://localhost:5555`)

- [ ] Refresh the page

- [ ] Click on `contacts` table

- [ ] Verify your test submission appears with:
  - Correct data in all fields
  - Auto-generated `id`
  - `created_at` timestamp
  - `updated_at` timestamp

### Step 7: Test API Directly (Optional)

- [ ] Test POST endpoint with curl or Postman:
  ```bash
  curl -X POST http://localhost:3000/api/contacts \
    -H "Content-Type: application/json" \
    -d '{
      "fullName": "API Test",
      "phone": "0612345678",
      "conditionType": "Test",
      "address": "API Test Address",
      "message": "Testing via API"
    }'
  ```

- [ ] Test GET endpoint:
  ```bash
  curl http://localhost:3000/api/contacts?limit=5
  ```

- [ ] Verify responses are correct

## 🎉 Success Criteria

Your setup is complete when ALL of these are true:

- [ ] ✅ No errors when running `npx prisma db push`
- [ ] ✅ Prisma Studio shows `contacts` table
- [ ] ✅ Form submission shows success message
- [ ] ✅ Data appears in Prisma Studio after submission
- [ ] ✅ No TypeScript errors in VS Code
- [ ] ✅ No console errors in browser DevTools
- [ ] ✅ Form clears after successful submission

## 🚨 Troubleshooting

### Problem: "Cannot connect to database"

**Check:**
- [ ] DATABASE_URL is correct in `.env`
- [ ] Database is running (`sudo systemctl status postgresql`)
- [ ] Network/firewall allows connection
- [ ] For cloud DB: Check your internet connection

**Try:**
```bash
# Test connection
npx prisma db pull
```

### Problem: "Table does not exist"

**Solution:**
```bash
# Re-run migration
npx prisma db push
```

### Problem: Form submits but shows error

**Check:**
- [ ] Browser DevTools console for errors
- [ ] Terminal where dev server is running for errors
- [ ] All form fields are filled
- [ ] DATABASE_URL is set correctly

### Problem: TypeScript errors

**Solution:**
```bash
# Regenerate Prisma Client
npx prisma generate

# Restart VS Code TypeScript server
# Press Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### Problem: "prisma command not found"

**Solution:**
```bash
# Reinstall Prisma
npm install -D prisma --legacy-peer-deps
npm install @prisma/client --legacy-peer-deps
```

## 📚 Next Steps After Setup

Once everything works:

### For Production Deployment

- [ ] Change DATABASE_URL to production database
- [ ] Enable SSL: add `?sslmode=require` to DATABASE_URL
- [ ] Set up automated backups
- [ ] Add monitoring/alerts
- [ ] Create admin dashboard (optional)

### For Development

- [ ] Use Prisma Studio to view submissions
- [ ] Export data: File → Export as CSV
- [ ] Create database backups:
  ```bash
  pg_dump -U postgres grandcoeur_db > backup.sql
  ```

### For Team Collaboration

- [ ] Share `.env.example` (not `.env`!)
- [ ] Document DATABASE_URL format
- [ ] Add setup instructions to team wiki
- [ ] Create development/staging databases

## 🆘 Need Help?

### Read Documentation
1. `DATABASE_SETUP.md` - Complete setup guide
2. `DATABASE_MIGRATION.md` - Migration details
3. `DATABASE_REFERENCE.md` - API & query reference
4. `DATABASE_ARCHITECTURE.md` - System architecture
5. `IMPLEMENTATION_SUMMARY.md` - What was implemented

### Check Resources
- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Common Commands Reference
```bash
# Generate Prisma Client
npx prisma generate

# Apply schema changes
npx prisma db push

# Create migration
npx prisma migrate dev --name <migration_name>

# Open database GUI
npx prisma studio

# Check database status
npx prisma db pull

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

---

**Last Updated:** October 12, 2025  
**Status:** Ready for setup  
**Estimated Time:** 15-30 minutes
