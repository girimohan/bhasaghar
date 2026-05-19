# BhasaGhar — Deployment Guide

## Prerequisites

- [Vercel account](https://vercel.com)
- [Supabase account](https://supabase.com)
- [Stripe account](https://stripe.com)
- Node.js 20+, Git

---

## Step 1 — Supabase Setup

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com) → New project
2. Name: `bhasaghar`, region: `eu-central-1` (Frankfurt, for European users)
3. Save your **database password**

### 1.2 Run Migrations
In Supabase Dashboard → SQL Editor:
1. Open `supabase/migrations/001_initial_schema.sql`
2. Paste and run
3. Open `supabase/seed.sql`
4. Paste and run (adds courses, lessons, vocabulary, stories, cultural content)

### 1.3 Storage Buckets
In Supabase Dashboard → Storage:
1. Create bucket: `avatars` (public)
2. Create bucket: `course-covers` (public)
3. Create bucket: `lesson-videos` (private)
4. Create bucket: `story-images` (public)

Add RLS policies for each bucket (allow authenticated uploads to own folder).

### 1.4 Auth Settings
In Supabase Dashboard → Auth → Settings:
- Enable Email provider
- Set Site URL to your Vercel domain: `https://bhasaghar.vercel.app`
- Add redirect URL: `https://bhasaghar.vercel.app/auth/callback`

### 1.5 Get API Keys
In Settings → API:
- Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon / public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy `service_role / secret key` → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2 — Stripe Setup

1. Go to [stripe.com](https://stripe.com) → Developers → API keys
2. Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy **Secret key** → `STRIPE_SECRET_KEY`
4. Create products for each plan:
   - Basic (€19/month)
   - Standard (€35/month)
   - Premium (€59/month)
5. Copy each price ID and add to `src/lib/constants.ts`
6. Set up webhook endpoint: `https://bhasaghar.vercel.app/api/webhooks/stripe`
7. Copy Webhook Signing Secret → `STRIPE_WEBHOOK_SECRET`

---

## Step 3 — Deploy to Vercel

### 3.1 Push to GitHub
```bash
git init
git add .
git commit -m "Initial BhasaGhar commit"
git remote add origin https://github.com/YOUR_USERNAME/bhasaghar.git
git push -u origin main
```

### 3.2 Import to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Root directory: `/` (default)

### 3.3 Environment Variables
In Vercel → Project Settings → Environment Variables, add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `STRIPE_SECRET_KEY` | Your Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Your Stripe webhook secret |
| `NEXT_PUBLIC_SITE_URL` | `https://bhasaghar.vercel.app` |

### 3.4 Deploy
Click **Deploy**. Vercel will build and deploy automatically.

---

## Step 4 — Post-Deployment

### 4.1 Custom Domain
In Vercel → Domains:
- Add your domain (e.g., `bhasaghar.com`)
- Update DNS records at your registrar
- Update `NEXT_PUBLIC_SITE_URL` to new domain
- Update Supabase Auth → Site URL

### 4.2 Create First Admin User
1. Register via `/en/register`
2. In Supabase Dashboard → Table Editor → `profiles`
3. Find your user and set `role` = `admin`

### 4.3 Add Teachers
1. Admin logs in
2. Go to `/en/admin/teachers`
3. New teachers register and admin activates them

### 4.4 Verify Everything
- [ ] Home page loads
- [ ] `/en/courses` shows seeded courses
- [ ] `/en/library` shows cultural content
- [ ] Register + email confirmation works
- [ ] Login redirects to correct dashboard
- [ ] Admin panel accessible at `/en/admin`
- [ ] `/ne/` Nepali language route works

---

## Local Development

```bash
# Install dependencies
npm install

# Copy env file and fill in values
copy .env.local.example .env.local

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | TailwindCSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Payments | Stripe |
| i18n | next-intl (en + ne) |
| Deployment | Vercel |

---

## Support

For setup help, contact: hello@bhasaghar.com
