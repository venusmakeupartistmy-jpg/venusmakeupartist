-- Venus Makeup Artist — sales ledger
create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  client_name text not null default '',
  service text not null,
  amount numeric(10, 2) not null check (amount >= 0),
  payment_method text not null default 'cash'
    check (payment_method in ('cash', 'card', 'transfer', 'other')),
  notes text not null default '',
  sold_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists sales_sold_at_idx on public.sales (sold_at desc);

alter table public.sales enable row level security;

-- API routes use the service role key; block direct public access.
create policy "No direct public access"
  on public.sales
  for all
  using (false)
  with check (false);

alter publication supabase_realtime add table public.sales;
