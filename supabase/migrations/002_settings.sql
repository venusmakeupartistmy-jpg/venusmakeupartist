-- App settings (admin password hash, service presets, etc.)
create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_settings enable row level security;

create policy "No direct public access to settings"
  on public.app_settings
  for all
  using (false)
  with check (false);
