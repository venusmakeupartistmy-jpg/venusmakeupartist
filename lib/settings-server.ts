import { unstable_noStore as noStore } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { verifyPassword } from "@/lib/password";
import { DEFAULT_SERVICES } from "@/lib/types";
import {
  isValidWhatsAppNumber,
  normalizeWhatsAppNumber,
} from "@/lib/whatsapp";
import {
  mergeWebsitePackages,
  normalizeWebsitePackages,
  type WebsitePackage,
} from "@/lib/website-packages";
import {
  mergeSaleButtons,
  normalizeSaleButtons,
  type SaleButton,
} from "@/lib/sale-buttons";

const PASSWORD_KEY = "admin_password_hash";
const SERVICES_KEY = "service_presets";
const SALE_BUTTONS_KEY = "sale_buttons";
const WHATSAPP_KEY = "whatsapp_number";
const WEBSITE_PACKAGES_KEY = "website_packages";

async function getSetting<T>(key: string): Promise<T | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error || !data) return null;
  return data.value as T;
}

async function setSetting(key: string, value: unknown) {
  const supabase = createServiceClient();
  const { error } = await supabase.from("app_settings").upsert(
    {
      key,
      value,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) throw new Error(error.message);
}

function normalizePasswordHash(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.includes(":") ? trimmed : null;
}

export async function getStoredPasswordHash() {
  return normalizePasswordHash(await getSetting<string>(PASSWORD_KEY));
}

export async function getServicePresets() {
  const stored = await getSetting<string[]>(SERVICES_KEY);
  if (stored?.length) return stored.filter(Boolean);
  return [...DEFAULT_SERVICES];
}

export async function saveServicePresets(services: string[]) {
  const cleaned = services.map((item) => item.trim()).filter(Boolean);
  if (cleaned.length === 0) {
    throw new Error("At least one service name is required.");
  }

  await setSetting(SERVICES_KEY, cleaned);
  return cleaned;
}

export async function getWhatsAppNumber() {
  noStore();

  const stored = await getSetting<string>(WHATSAPP_KEY);
  if (typeof stored === "string" && stored.trim()) {
    return normalizeWhatsAppNumber(stored);
  }

  const envNumber = process.env.WHATSAPP_NUMBER ?? "";
  return normalizeWhatsAppNumber(envNumber);
}

export async function saveWhatsAppNumber(input: string) {
  const trimmed = input.trim();

  if (!trimmed) {
    await setSetting(WHATSAPP_KEY, "");
    return "";
  }

  const normalized = normalizeWhatsAppNumber(trimmed);
  if (!isValidWhatsAppNumber(normalized)) {
    throw new Error(
      "Enter a valid WhatsApp number with country code (e.g. 60123456789).",
    );
  }

  await setSetting(WHATSAPP_KEY, normalized);
  return normalized;
}

export async function getWebsitePackages() {
  noStore();
  const stored = await getSetting<unknown>(WEBSITE_PACKAGES_KEY);
  return mergeWebsitePackages(stored);
}

export async function saveWebsitePackages(input: unknown) {
  const cleaned = normalizeWebsitePackages(input);
  await setSetting(WEBSITE_PACKAGES_KEY, cleaned);
  return cleaned;
}

export async function getSaleButtons() {
  noStore();
  const stored = await getSetting<unknown>(SALE_BUTTONS_KEY);
  return mergeSaleButtons(stored);
}

export async function saveSaleButtons(input: unknown) {
  const cleaned = normalizeSaleButtons(input);
  await setSetting(SALE_BUTTONS_KEY, cleaned);
  return cleaned;
}

export async function verifyAdminPassword(password: string) {
  const storedHash = await getStoredPasswordHash();
  if (storedHash) {
    return verifyPassword(password, storedHash);
  }

  const envPassword = process.env.ADMIN_PASSWORD ?? "";
  return Boolean(envPassword) && password === envPassword;
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  const valid = await verifyAdminPassword(currentPassword);
  if (!valid) {
    throw new Error("Current password is incorrect.");
  }

  if (newPassword.length < 8) {
    throw new Error("New password must be at least 8 characters.");
  }

  const { hashPassword } = await import("@/lib/password");
  await setSetting(PASSWORD_KEY, await hashPassword(newPassword));
}
