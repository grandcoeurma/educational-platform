# Database Migration Plan for Contact Form

## Overview
This document describes the database setup for storing contact form submissions for the Grand Cœur educational platform.

## Database Choice
**PostgreSQL** - A robust, open-source relational database that works well with Next.js and Prisma.

## Connection Configuration
All database connection details are stored in environment variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Example:
```env
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/grandcoeur_db"
```

## Database Schema

### Table: `contacts`

| Column Name      | Type      | Constraints          | Description                                    |
|------------------|-----------|----------------------|------------------------------------------------|
| id               | TEXT      | PRIMARY KEY          | Auto-generated unique identifier (CUID)        |
| full_name        | TEXT      | NOT NULL             | Full name from "Nom et prénom" field           |
| phone            | TEXT      | NOT NULL             | Phone number from "Numéro de téléphone" field  |
| condition_type   | TEXT      | NOT NULL             | Child's condition type                         |
| address          | TEXT      | NOT NULL             | Address from "Adresse" field                   |
| message          | TEXT      | NOT NULL             | Message content                                |
| created_at       | TIMESTAMP | NOT NULL DEFAULT NOW | When the contact was created                   |
| updated_at       | TIMESTAMP | NOT NULL             | When the contact was last updated              |

## SQL CREATE TABLE Statement

```sql
-- Create contacts table
CREATE TABLE contacts (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    condition_type TEXT NOT NULL,
    address TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL
);

-- Create index on created_at for efficient sorting
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
```

## Migration Steps

### Prerequisites
1. Install PostgreSQL on your system
2. Create a database named `grandcoeur_db` (or your preferred name)
3. Set up database user with appropriate permissions

### Installation Steps

1. **Install Prisma CLI and Client**
   ```bash
   pnpm add -D prisma
   pnpm add @prisma/client
   ```

2. **Create `.env` file** (based on `.env.example`)
   ```bash
   cp .env.example .env
   ```

3. **Update DATABASE_URL** in `.env` with your actual credentials
   ```env
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/grandcoeur_db"
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Run the migration** to create the database table
   ```bash
   npx prisma db push
   ```
   
   Or use Prisma Migrate for production:
   ```bash
   npx prisma migrate dev --name init_contacts_table
   ```

6. **Verify the migration**
   ```bash
   npx prisma studio
   ```
   This opens a web UI to view your database tables.

### Alternative: Manual SQL Execution

If you prefer to run SQL directly:

1. Connect to your PostgreSQL database:
   ```bash
   psql -U postgres -d grandcoeur_db
   ```

2. Execute the CREATE TABLE statement:
   ```sql
   CREATE TABLE contacts (
       id TEXT PRIMARY KEY,
       full_name TEXT NOT NULL,
       phone TEXT NOT NULL,
       condition_type TEXT NOT NULL,
       address TEXT NOT NULL,
       message TEXT NOT NULL,
       created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP(3) NOT NULL
   );
   
   CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
   ```

3. Verify the table was created:
   ```sql
   \d contacts
   ```

## Environment Variables

### Development (.env.local or .env)
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/grandcoeur_db"
```

### Production
Set the `DATABASE_URL` environment variable in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- Railway: Variables tab
- Heroku: Config Vars

## Security Notes

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use strong passwords** for database users
3. **Limit database user permissions** to only what's needed (INSERT, SELECT on contacts table)
4. **Use SSL connections** in production (append `?sslmode=require` to DATABASE_URL)
5. **Regularly backup** the database

## Rollback Plan

To remove the contacts table:

```sql
DROP TABLE IF EXISTS contacts;
```

Or with Prisma:
```bash
npx prisma migrate reset
```

## Testing

After setup, test the database connection:

```bash
npx prisma db pull
npx prisma studio
```

You should see the `contacts` table in Prisma Studio.

## Support

For issues:
- Prisma docs: https://www.prisma.io/docs
- PostgreSQL docs: https://www.postgresql.org/docs/
