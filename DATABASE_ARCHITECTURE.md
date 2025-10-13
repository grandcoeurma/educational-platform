# Contact Form Database Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          Contact Form Component                          │  │
│  │          (contact-section.tsx)                           │  │
│  │                                                          │  │
│  │  Input Fields:                                          │  │
│  │  • Nom et prénom        → fullName                      │  │
│  │  • Numéro de téléphone  → phone                         │  │
│  │  • Type de condition    → conditionType                 │  │
│  │  • Adresse             → address                        │  │
│  │  • Message             → message                        │  │
│  │                                                          │  │
│  │  [Envoyer le message avec ♥] Button                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              │ HTTP POST                        │
│                              │ /api/contacts                    │
│                              ▼                                  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS SERVER                             │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          API Route Handler                               │  │
│  │          (app/api/contacts/route.ts)                     │  │
│  │                                                          │  │
│  │  POST /api/contacts:                                    │  │
│  │  1. Validate required fields                           │  │
│  │  2. Call Prisma Client                                 │  │
│  │  3. Return success/error response                      │  │
│  │                                                          │  │
│  │  GET /api/contacts:                                     │  │
│  │  1. Query with pagination                              │  │
│  │  2. Return contacts array                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              │                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          Prisma Client                                   │  │
│  │          (lib/prisma.ts)                                │  │
│  │                                                          │  │
│  │  • Singleton instance                                   │  │
│  │  • Connection pooling                                   │  │
│  │  • Type-safe queries                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              │ SQL Queries                      │
│                              ▼                                  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │
┌─────────────────────────────────────────────────────────────────┐
│                    POSTGRESQL DATABASE                          │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          Table: contacts                                 │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  id              TEXT       PRIMARY KEY                  │  │
│  │  full_name       TEXT       NOT NULL                     │  │
│  │  phone           TEXT       NOT NULL                     │  │
│  │  condition_type  TEXT       NOT NULL                     │  │
│  │  address         TEXT       NOT NULL                     │  │
│  │  message         TEXT       NOT NULL                     │  │
│  │  created_at      TIMESTAMP  DEFAULT NOW()                │  │
│  │  updated_at      TIMESTAMP  AUTO-UPDATE                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Indexes:                                                       │
│  • idx_contacts_created_at (created_at DESC)                   │
│  • idx_contacts_phone (phone)                                  │
│                                                                 │
│  Connection: DATABASE_URL (from .env)                          │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Form Submission Flow

```
User fills form
      ↓
Clicks "Envoyer le message avec ♥"
      ↓
Frontend calls fetch('/api/contacts', {...})
      ↓
API validates fields
      ↓
Prisma Client creates record
      ↓
PostgreSQL stores data
      ↓
Success response sent back
      ↓
Form shows success message
      ↓
Form fields cleared
```

### 2. Form Field → Database Column Mapping

```
┌────────────────────────────┬─────────────────┬──────────────────┐
│ Form Label                 │ Form Field      │ DB Column        │
├────────────────────────────┼─────────────────┼──────────────────┤
│ Nom et prénom              │ fullName        │ full_name        │
│ Numéro de téléphone        │ phone           │ phone            │
│ Type de condition          │ conditionType   │ condition_type   │
│ Adresse                    │ address         │ address          │
│ Message                    │ message         │ message          │
│ (auto)                     │ -               │ id               │
│ (auto)                     │ -               │ created_at       │
│ (auto)                     │ -               │ updated_at       │
└────────────────────────────┴─────────────────┴──────────────────┘
```

## File Structure

```
educational-platform/
│
├── .env                          # Database credentials (NOT in git)
├── .env.example                  # Template for .env
│
├── app/
│   └── api/
│       └── contacts/
│           └── route.ts          # POST & GET endpoints
│
├── components/
│   └── contact-section.tsx       # Contact form UI
│
├── lib/
│   └── prisma.ts                 # Prisma client singleton
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/
│       └── 001_create_contacts_table.sql
│
└── Documentation/
    ├── DATABASE_SETUP.md         # Setup guide
    ├── DATABASE_MIGRATION.md     # Migration details
    ├── DATABASE_REFERENCE.md     # Quick reference
    ├── IMPLEMENTATION_SUMMARY.md # This implementation
    └── DATABASE_ARCHITECTURE.md  # This file
```

## Technology Stack

```
┌─────────────────────────────────────────┐
│           Frontend Layer                │
│  • Next.js 15 (React)                   │
│  • TypeScript                           │
│  • Framer Motion (animations)           │
│  • Tailwind CSS (styling)               │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│           API Layer                     │
│  • Next.js API Routes                   │
│  • RESTful endpoints                    │
│  • JSON request/response                │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│           ORM Layer                     │
│  • Prisma Client                        │
│  • Type-safe queries                    │
│  • Connection pooling                   │
│  • Migration management                 │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│           Database Layer                │
│  • PostgreSQL 14+                       │
│  • ACID compliance                      │
│  • Indexes for performance              │
│  • Timestamps for auditing              │
└─────────────────────────────────────────┘
```

## Environment Configuration

```
Development:
┌──────────────────────────────────────────┐
│ DATABASE_URL                             │
│ "postgresql://postgres:password@         │
│  localhost:5432/grandcoeur_db"           │
└──────────────────────────────────────────┘

Production:
┌──────────────────────────────────────────┐
│ DATABASE_URL                             │
│ "postgresql://user:pass@                 │
│  host.provider.com:5432/db               │
│  ?sslmode=require"                       │
└──────────────────────────────────────────┘
```

## Security Layers

```
1. Environment Variables
   ├── Credentials never in code
   ├── Different per environment
   └── .env not committed to git

2. API Validation
   ├── Required fields check
   ├── Type validation
   └── Error handling

3. Database Access
   ├── Prepared statements (Prisma)
   ├── SQL injection prevention
   └── Connection pooling

4. Transport Security
   ├── HTTPS in production
   ├── SSL database connections
   └── Secure headers
```

## Scalability Considerations

```
Current Setup:
├── Single database instance
├── Connection pooling via Prisma
└── Suitable for 1000s of submissions

Future Enhancements:
├── Read replicas for GET requests
├── Redis caching layer
├── Database sharding
├── CDN for static assets
└── Load balancer for API
```

## Monitoring & Observability

```
Database Monitoring:
├── Prisma Studio (development)
├── pg_stat_statements (queries)
├── Connection pool metrics
└── Query performance logs

Application Monitoring:
├── API response times
├── Error rates
├── Form submission success rate
└── Database connection health
```

## Backup Strategy

```
Automated Backups:
├── Daily full backup
├── Point-in-time recovery
├── 30-day retention
└── Offsite storage

Manual Backups:
└── pg_dump command for exports
```

## Deployment Flow

```
1. Code Changes
   ├── Update schema.prisma
   ├── Create migration
   └── Test locally

2. Version Control
   ├── Commit changes
   ├── Push to repository
   └── Create PR

3. CI/CD Pipeline
   ├── Run tests
   ├── Build application
   └── Deploy to staging

4. Database Migration
   ├── Apply migrations
   ├── Verify schema
   └── Test endpoints

5. Production Deployment
   ├── Deploy application
   ├── Run migrations
   └── Monitor logs
```

## API Response Examples

### Success Response (201)
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès!",
  "id": "clxy1z2w30000abc123def456"
}
```

### Validation Error (400)
```json
{
  "error": "Tous les champs sont obligatoires"
}
```

### Server Error (500)
```json
{
  "error": "Une erreur est survenue. Veuillez réessayer."
}
```

### GET Response (200)
```json
{
  "contacts": [
    {
      "id": "clxy1z2w30000abc123def456",
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
  "limit": 10,
  "offset": 0
}
```

---

**Last Updated:** October 12, 2025
