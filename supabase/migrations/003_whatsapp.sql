-- Venus Makeup Artist — WhatsApp contact number for public website
-- Key: whatsapp_number  json string of digits (e.g. "60123456789")

insert into public.app_settings (key, value)
values ('whatsapp_number', '""'::jsonb)
on conflict (key) do nothing;
