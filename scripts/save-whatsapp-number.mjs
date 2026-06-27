import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import path from "path";

const number = process.argv[2] ?? "";
if (!number) {
  console.error("Usage: node scripts/save-whatsapp-number.mjs <phone>");
  process.exit(1);
}

const envPath = path.join(process.cwd(), ".env.local");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (!match) continue;
  process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
}

const digits = number.replace(/\D/g, "");
const normalized = digits.startsWith("0") ? `60${digits.slice(1)}` : digits;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const { error } = await supabase.from("app_settings").upsert(
  {
    key: "whatsapp_number",
    value: normalized,
    updated_at: new Date().toISOString(),
  },
  { onConflict: "key" },
);

if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(`Saved WhatsApp number: ${normalized} (+${normalized.slice(0, 2)} ${normalized.slice(2)})`);
