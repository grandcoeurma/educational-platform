# Contact Form Database - Quick Reference

## 📝 Form Field Mapping

This document shows how form fields map to database columns.

| Form Label (French)              | Form Field Name | Database Column  | Type   |
|----------------------------------|-----------------|------------------|--------|
| Nom et prénom                    | fullName        | full_name        | TEXT   |
| Numéro de téléphone              | phone           | phone            | TEXT   |
| Type de condition de l'enfant    | conditionType   | condition_type   | TEXT   |
| Adresse                          | address         | address          | TEXT   |
| Message                          | message         | message          | TEXT   |
| *(auto-generated)*               | -               | id               | TEXT   |
| *(auto-generated)*               | -               | created_at       | TIMESTAMP |
| *(auto-generated)*               | -               | updated_at       | TIMESTAMP |

## 🔌 API Endpoints

### POST /api/contacts
Create a new contact form submission.

**Request Body:**
```json
{
  "fullName": "Jean Dupont",
  "phone": "0612345678",
  "conditionType": "Autisme",
  "address": "123 Rue Example, Casablanca",
  "message": "Je souhaite avoir plus d'informations..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès!",
  "id": "clxxx..."
}
```

**Error Response (400/500):**
```json
{
  "error": "Tous les champs sont obligatoires"
}
```

### GET /api/contacts
Retrieve contact submissions (for admin use).

**Query Parameters:**
- `limit` (optional): Number of contacts to retrieve (default: 10)
- `offset` (optional): Number of contacts to skip (default: 0)

**Example:**
```
GET /api/contacts?limit=20&offset=0
```

**Response:**
```json
{
  "contacts": [
    {
      "id": "clxxx...",
      "full_name": "Jean Dupont",
      "phone": "0612345678",
      "condition_type": "Autisme",
      "address": "123 Rue Example, Casablanca",
      "message": "Je souhaite avoir plus d'informations...",
      "created_at": "2025-10-12T10:30:00.000Z",
      "updated_at": "2025-10-12T10:30:00.000Z"
    }
  ],
  "total": 45,
  "limit": 20,
  "offset": 0
}
```

## 🗂️ Database Schema (Prisma)

```prisma
model Contact {
  id             String   @id @default(cuid())
  full_name      String
  phone          String
  condition_type String
  address        String
  message        String
  created_at     DateTime @default(now())
  updated_at     DateTime @updatedAt

  @@map("contacts")
}
```

## 💾 Common Queries

### View recent contacts
```sql
SELECT * FROM contacts 
ORDER BY created_at DESC 
LIMIT 10;
```

### Search by phone
```sql
SELECT * FROM contacts 
WHERE phone = '0612345678';
```

### Count total submissions
```sql
SELECT COUNT(*) FROM contacts;
```

### Filter by condition type
```sql
SELECT * FROM contacts 
WHERE condition_type = 'Autisme'
ORDER BY created_at DESC;
```

### Get submissions from last 7 days
```sql
SELECT * FROM contacts 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

## 🔍 Prisma Client Usage

### Create a contact
```typescript
const contact = await prisma.contact.create({
  data: {
    full_name: "Jean Dupont",
    phone: "0612345678",
    condition_type: "Autisme",
    address: "123 Rue Example",
    message: "Message content..."
  }
})
```

### Find all contacts
```typescript
const contacts = await prisma.contact.findMany({
  orderBy: { created_at: 'desc' },
  take: 10
})
```

### Find by ID
```typescript
const contact = await prisma.contact.findUnique({
  where: { id: "clxxx..." }
})
```

### Search
```typescript
const contacts = await prisma.contact.findMany({
  where: {
    OR: [
      { full_name: { contains: "Jean" } },
      { phone: { contains: "0612" } }
    ]
  }
})
```

## 📦 Files Created

1. **`prisma/schema.prisma`** - Prisma schema definition
2. **`lib/prisma.ts`** - Prisma client singleton
3. **`app/api/contacts/route.ts`** - API endpoints (POST & GET)
4. **`prisma/migrations/001_create_contacts_table.sql`** - SQL migration
5. **`.env.example`** - Environment variables template
6. **`DATABASE_SETUP.md`** - Complete setup guide
7. **`DATABASE_MIGRATION.md`** - Detailed migration documentation

## 🔐 Environment Variables Required

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Example for local development:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/grandcoeur_db"
```

Example for production (with SSL):
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

## ✅ Setup Checklist

- [ ] PostgreSQL installed/configured
- [ ] Database created
- [ ] `.env` file created with DATABASE_URL
- [ ] Prisma dependencies installed (`@prisma/client`, `prisma`)
- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Migration applied (`npx prisma db push`)
- [ ] Tested form submission
- [ ] Verified data in database (`npx prisma studio`)

## 📞 Testing

1. Start dev server: `npm run dev`
2. Navigate to contact form
3. Submit a test message
4. Check database: `npx prisma studio`
5. View API response in browser DevTools

---

**Last Updated:** October 12, 2025
