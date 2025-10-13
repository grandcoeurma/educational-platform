# Contact Form Database Setup

This guide will help you set up the persistent storage for the contact form.

## 🗄️ Database Structure

The contact form data is stored in a PostgreSQL database with the following schema:

**Table: `contacts`**

| Column         | Type      | Description                                    |
|----------------|-----------|------------------------------------------------|
| id             | TEXT      | Unique identifier (auto-generated CUID)        |
| full_name      | TEXT      | Full name from "Nom et prénom"                 |
| phone          | TEXT      | Phone number from "Numéro de téléphone"        |
| condition_type | TEXT      | Type de condition de l'enfant                  |
| address        | TEXT      | Address from "Adresse"                         |
| message        | TEXT      | Message content                                |
| created_at     | TIMESTAMP | Creation timestamp                             |
| updated_at     | TIMESTAMP | Last update timestamp                          |

## 📋 Prerequisites

1. **PostgreSQL Database**
   - Install PostgreSQL locally OR
   - Use a cloud provider (Supabase, Railway, Neon, etc.)

2. **Node.js & npm**
   - Already installed in your project

## 🚀 Setup Steps

### Step 1: Install PostgreSQL (if needed)

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**On macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Or use a cloud provider:**
- [Supabase](https://supabase.com) (Free tier available)
- [Railway](https://railway.app) (Free tier available)
- [Neon](https://neon.tech) (Free tier available)

### Step 2: Create Database

**Local PostgreSQL:**
```bash
# Login to PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE grandcoeur_db;

# Create user (optional, for better security)
CREATE USER grandcoeur_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE grandcoeur_db TO grandcoeur_user;

# Exit
\q
```

**Cloud Provider:**
- Follow their UI to create a database
- They will provide you with a `DATABASE_URL`

### Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your database URL:

**Local Database:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/grandcoeur_db"
```

**Cloud Database:**
```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

### Step 4: Run Database Migration

Apply the schema to create the `contacts` table:

```bash
npx prisma db push
```

Or create a proper migration (recommended for production):

```bash
npx prisma migrate dev --name init_contacts_table
```

### Step 5: Verify Setup

Open Prisma Studio to view your database:

```bash
npx prisma studio
```

This will open a browser window at `http://localhost:5555` where you can view your database tables.

## 🔧 Alternative: Manual SQL Setup

If you prefer to run SQL directly:

```bash
# Connect to your database
psql -U postgres -d grandcoeur_db

# Run the migration
\i prisma/migrations/001_create_contacts_table.sql

# Verify
\d contacts
```

## 🧪 Testing the Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section on your website

3. Fill out and submit the form

4. Check the database:
   ```bash
   npx prisma studio
   ```
   
   Or via SQL:
   ```sql
   SELECT * FROM contacts ORDER BY created_at DESC;
   ```

## 🔐 Security Best Practices

1. **Never commit `.env` file**
   - Already in `.gitignore`
   - Use different credentials for production

2. **Use strong passwords**
   - Generate secure passwords for database users

3. **Enable SSL in production**
   - Add `?sslmode=require` to your DATABASE_URL

4. **Limit database user permissions**
   ```sql
   -- Create user with limited permissions
   CREATE USER app_user WITH PASSWORD 'secure_password';
   GRANT SELECT, INSERT ON contacts TO app_user;
   ```

5. **Set up backups**
   - Use `pg_dump` for manual backups
   - Or enable automated backups via your cloud provider

## 📊 Viewing Contacts (Admin)

The API includes a GET endpoint for retrieving contacts:

```
GET /api/contacts?limit=10&offset=0
```

You can create an admin dashboard to view submissions by:
1. Adding authentication (e.g., NextAuth.js)
2. Creating a protected admin page
3. Calling the GET endpoint to display contacts

## 🛠️ Troubleshooting

### Connection Issues

**Error: "Connection refused"**
- Check if PostgreSQL is running: `sudo systemctl status postgresql`
- Verify your DATABASE_URL is correct

**Error: "Database does not exist"**
- Create the database: `createdb grandcoeur_db`

**Error: "Password authentication failed"**
- Check your username and password in DATABASE_URL
- Ensure the user has access to the database

### Migration Issues

**Error: "Prisma schema file not found"**
- Ensure you're in the project root directory
- Check that `prisma/schema.prisma` exists

**Error: "Table already exists"**
- The table may have been created already
- Run: `npx prisma db pull` to sync your schema

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🤝 Support

For issues specific to:
- Database setup → Check `DATABASE_MIGRATION.md`
- Prisma → Visit [Prisma Community](https://www.prisma.io/community)
- PostgreSQL → Visit [PostgreSQL Community](https://www.postgresql.org/community/)
