-- Venus Makeup Artist — dashboard settings
-- Stores admin password hash and editable service presets.
--
-- Keys used by the app:
--   admin_password_hash  text hash (salt:hex) set after password change in Settings
--   service_presets      json array of service name strings

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists app_settings_updated_at_idx
  on public.app_settings (updated_at desc);

alter table public.app_settings enable row level security;

drop policy if exists "No direct public access to settings"
  on public.app_settings;

create policy "No direct public access to settings"
  on public.app_settings
  for all
  using (false)
  with check (false);

-- Default service presets (safe to re-run; does not overwrite existing rows)
insert into public.app_settings (key, value)
values (
  'service_presets',
  '[
    "Bridal makeup",
    "Party / event makeup",
    "Photoshoot makeup",
    "Trial session",
    "Touch-up",
    "Makeup class",
    "Product sale"
  ]'::jsonb
)
on conflict (key) do nothing;
