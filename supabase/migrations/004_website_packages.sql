-- Website package prices shown on the public homepage.
-- Key: website_packages  json array of { id, category, title, description, priceLabel }

insert into public.app_settings (key, value)
values (
  'website_packages',
  '[
    {
      "id": "bridal-makeup-hairdo",
      "category": "bridal",
      "title": "Bridal makeup & hairdo",
      "description": "Complete wedding-day glam — flawless makeup and a styled hairdo designed to last from solemnisation through reception.",
      "priceLabel": "From RM 450"
    },
    {
      "id": "bridal-trial",
      "category": "bridal",
      "title": "Bridal trial (makeup & hairdo)",
      "description": "A full trial session to perfect your wedding makeup, hairstyle, and tones before the big day.",
      "priceLabel": "From RM 180"
    },
    {
      "id": "bridal-touchup",
      "category": "bridal",
      "title": "Bridal touch-up",
      "description": "On-the-day makeup and hair touch-ups to keep you fresh and photo-ready all day long.",
      "priceLabel": "From RM 120"
    },
    {
      "id": "rom-makeup-hairdo",
      "category": "event",
      "title": "ROM makeup & hairdo",
      "description": "Natural, polished makeup and a neat hairdo for registry and solemnisation ceremonies.",
      "priceLabel": "From RM 180"
    },
    {
      "id": "dinner-event",
      "category": "event",
      "title": "Dinner & event makeup & hairdo",
      "description": "Soft glam to full evening looks — makeup and hairstyling tailored to your outfit and occasion.",
      "priceLabel": "From RM 180"
    },
    {
      "id": "bridesmaid",
      "category": "event",
      "title": "Bridesmaid makeup & hairdo",
      "description": "Coordinated makeup and hair styling for your bridal party, matched to your wedding theme.",
      "priceLabel": "From RM 150"
    },
    {
      "id": "touchup-refresh",
      "category": "event",
      "title": "Touch-up & hair refresh",
      "description": "Quick makeup and hair touch-ups for events — ideal for long celebrations or outfit changes.",
      "priceLabel": "From RM 100"
    }
  ]'::jsonb
)
on conflict (key) do nothing;
