# Venus Makeup Artist

Website and live sales ledger for **venusmakeupartist.site**.

## Features

- Public makeup artist homepage
- Password-protected admin area at `/admin`
- Live sales ledger that refreshes every 2 seconds
- Record client, service, amount, payment method, and notes
- Daily totals and sales count

## Setup

### 1. Create a new Supabase project

Use a **separate** Supabase project from Sihamla.

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project, e.g. `venus-makeup-artist`
3. In **SQL Editor**, run the migration in `supabase/migrations/001_sales.sql`

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Generate a random admin secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Run locally

```bash
npm install
npm run dev
```

Open:

- Website: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

### 4. Deploy to Vercel

1. Push this repo to GitHub
2. Import it in Vercel under your `venusmakeupartist` project
3. Add the same environment variables in Vercel → **Settings → Environment Variables**
4. Deploy

Your domain `venusmakeupartist.site` is already added in Vercel.

## Admin

- URL: `/admin`
- Password: value of `ADMIN_PASSWORD` in your env vars
- Sales sync automatically every 2 seconds while the page is open
