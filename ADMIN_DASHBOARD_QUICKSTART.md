# Admin Dashboard - Quick Setup

## ✅ What Has Been Created

A complete admin dashboard with authentication to view and manage contact form submissions.

## 🎨 Design Features

- **Colors**: Matches landing page (red → orange → yellow gradients)
- **Animations**: Smooth Framer Motion transitions
- **Layout**: Modern glassmorphism with backdrop blur
- **Responsive**: Works on desktop, tablet, and mobile

## 📁 Files Created

### API Routes
1. **`app/api/admin/login/route.ts`** - Login endpoint
2. **`app/api/admin/logout/route.ts`** - Logout endpoint  
3. **`app/api/admin/check-session/route.ts`** - Session validation
4. **`app/api/contacts/route.ts`** - Updated with authentication check

### Pages
5. **`app/admin/page.tsx`** - Main admin dashboard UI

### Documentation
6. **`ADMIN_DASHBOARD_GUIDE.md`** - Complete usage guide
7. **`.env.example`** - Updated with admin credentials

## 🚀 Quick Start (3 Steps)

### Step 1: Add credentials to .env

Open your `.env` file and add:

```env
USER_ADMIN="admin"
USER_ADMIN_PASSWORD="adminpass"
```

⚠️ **Change these before deploying to production!**

### Step 2: Restart server

```bash
npm run dev
```

### Step 3: Access dashboard

Open your browser and go to:
```
http://localhost:3000/admin
```

Login with:
- **Username**: `admin`
- **Password**: `adminpass`

## 🎯 Features

### ✅ Authentication
- Secure login with environment variables
- 8-hour session cookies (HttpOnly, Secure)
- Auto-logout on session expiry
- Protected API endpoints

### ✅ Contact Management
- View all contact submissions
- Sortable table with pagination (10 per page)
- Search by name, phone, or condition type
- Detailed view modal for each contact

### ✅ Data Export
- Export to CSV with one click
- Filename: `contacts_YYYY-MM-DD.csv`
- Compatible with Excel/Google Sheets

### ✅ Statistics
- Total contacts count
- Current page count
- Total pages indicator
- Date/time stamps

### ✅ User Interface
- **Header**: Logo, title, logout button
- **Stats cards**: 3 colorful metric cards
- **Search bar**: Real-time filtering
- **Table view**: Clean, organized display
- **Detail modal**: Full contact information
- **Pagination**: Easy navigation

## 📊 Dashboard Sections

### 1. Stats Cards (Top)
```
┌─────────────┬─────────────┬─────────────┐
│ Total       │ This Page   │ Total Pages │
│ Contacts    │             │             │
├─────────────┼─────────────┼─────────────┤
│ [Red Icon]  │[Orange Icon]│[Yellow Icon]│
│    45       │     10      │      5      │
└─────────────┴─────────────┴─────────────┘
```

### 2. Search & Export Bar
```
┌──────────────────────────────────────────┐
│ 🔍 Search...          [Export CSV] 📥    │
└──────────────────────────────────────────┘
```

### 3. Contacts Table
```
┌────────┬──────────┬───────────┬──────────┬─────────┐
│ Date   │ Name     │ Phone     │ Condition│ Actions │
├────────┼──────────┼───────────┼──────────┼─────────┤
│ 13/10  │ [A] Ali  │ 0661...   │ Autisme  │ [View]  │
│ 12/10  │ [M] Marie│ 0522...   │ Trisomie │ [View]  │
└────────┴──────────┴───────────┴──────────┴─────────┘
```

### 4. Detail Modal (Click "Voir détails")
```
┌─────────────────────────────────────────┐
│  Détails du contact                     │
│  [Red-Orange gradient header]           │
├─────────────────────────────────────────┤
│  👤 Nom: Marie Dubois                   │
│  📞 Téléphone: 0661987399               │
│  ❤️  Condition: Autisme                 │
│  📍 Adresse: Casablanca...              │
│  💬 Message: [Full message text]        │
│  📅 Créé le: 13/10/2025                 │
├─────────────────────────────────────────┤
│          [Fermer] Button                │
└─────────────────────────────────────────┘
```

## 🎨 Color Scheme (From Landing Page)

### Primary Colors
- **Red**: `#EF4444` → `#DC2626` (buttons, accents)
- **Orange**: `#F97316` → `#EA580C` (gradients)
- **Yellow**: `#F59E0B` → `#D97706` (highlights)

### Backgrounds
- **Base**: `from-red-50 via-orange-50 to-yellow-50`
- **Cards**: `bg-white/80` with `backdrop-blur-lg`
- **Gradients**: `from-red-500 to-orange-500`

### Effects
- **Blur**: `backdrop-blur-lg`, `blur-3xl`
- **Shadows**: `shadow-lg`, `shadow-2xl`
- **Borders**: `border-red-100`, `border-red-200`
- **Hover**: `hover:bg-red-50`

## 🔒 Security Features

### Environment Variables
```env
# Static admin credentials (read from .env)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your_secure_password"
```

### Session Management
- Cookie-based authentication
- HttpOnly (prevents XSS attacks)
- Secure flag in production
- SameSite protection
- 8-hour expiration

### API Protection
```typescript
// All GET /api/contacts requests check session
if (!session) {
  return 401 Unauthorized
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (cards stack vertically)
- **Tablet**: 640px - 1024px (table scrolls horizontally)
- **Desktop**: > 1024px (full table view)

## 🔄 Workflow Example

### Typical Admin Session

1. **Login**: Enter credentials at `/admin`
2. **View Dashboard**: See stats and recent contacts
3. **Search**: Find specific contact by name/phone
4. **View Details**: Click "Voir détails" for full info
5. **Export**: Download CSV for reporting
6. **Logout**: Click logout button when done

## 🎯 Testing Checklist

- [ ] Access `/admin` page
- [ ] See login form with Grand Cœur branding
- [ ] Login with admin credentials
- [ ] View dashboard with stats
- [ ] See list of contacts (if any exist)
- [ ] Search for a contact
- [ ] Click "Voir détails" on a contact
- [ ] View full contact information in modal
- [ ] Close modal
- [ ] Click "Exporter CSV"
- [ ] Verify CSV downloads
- [ ] Test pagination (if > 10 contacts)
- [ ] Click logout
- [ ] Verify redirected to login

## 🚨 Important Notes

### Before Production Deployment

1. **Change credentials:**
   ```env
   ADMIN_USERNAME="admin_secure"
   ADMIN_PASSWORD="Very_Strong_Password_2025!"
   ```

2. **Enable HTTPS:**
   - Required for secure cookies
   - Use Let's Encrypt or cloud provider

3. **Set environment variables:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment
   - Railway/Heroku: Config Vars

4. **Test thoroughly:**
   - Login/logout flow
   - Session persistence
   - API authentication
   - CSV export

### Security Best Practices

- ✅ Use strong password (16+ characters)
- ✅ Never commit `.env` file
- ✅ Use HTTPS in production
- ✅ Enable CORS if needed
- ✅ Monitor failed login attempts
- ✅ Rotate passwords regularly
- ✅ Use password manager for credentials

## 📚 Additional Resources

- **Full Guide**: Read `ADMIN_DASHBOARD_GUIDE.md`
- **Database Setup**: Read `DATABASE_SETUP.md`
- **API Reference**: Read `DATABASE_REFERENCE.md`

## 🎉 Success!

Your admin dashboard is now ready to use! 

**Next Steps:**
1. Add admin credentials to `.env`
2. Access `/admin` in your browser
3. Login and view your contacts
4. Export data as needed

---

**Created:** October 13, 2025  
**Status:** ✅ Ready to use  
**Time to setup:** 2 minutes
