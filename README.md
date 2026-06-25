# Venus Makeup Artist

Website and live sales ledger for **venusmakeupartist.site**.

## Features

- Public makeup artist homepage
- Password-protected sales dashboard at `/v-studio-ledger-x7k9`
- Live sales ledger that refreshes every 2 seconds
- Record client, service, amount, payment method, and notes
- Daily totals and sales count

## Setup

### 1. Create a new Supabase project

Use a **separate** Supabase project from Sihamla.

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project, e.g. `venus-makeup-artist`
3. In **SQL Editor**, run the migrations in order:
   - `supabase/migrations/001_sales.sql`
   - `supabase/migrations/002_settings.sql`

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
- Sales dashboard: [http://localhost:3000/v-studio-ledger-x7k9](http://localhost:3000/v-studio-ledger-x7k9)

### 4. Deploy to Vercel

1. Push this repo to GitHub
2. Import it in Vercel under your `venusmakeupartist` project
3. Add the same environment variables in Vercel → **Settings → Environment Variables**
4. Deploy

Your domain `venusmakeupartist.site` is already added in Vercel.

## Sales dashboard

- URL: `/v-studio-ledger-x7k9` (not linked on the public site)
- Password: value of `ADMIN_PASSWORD` in your env vars, or a password changed in **Settings**
- Filter sales by past week, this month, or a custom date range
- Edit service names in **Settings**, or edit a service on any sale row
- Change your dashboard password in **Settings**
- Sales sync automatically every 2 seconds while the page is open
