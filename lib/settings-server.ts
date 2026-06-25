import { createServiceClient } from "@/lib/supabase/server";
import { verifyPassword } from "@/lib/password";
import { DEFAULT_SERVICES } from "@/lib/types";

const PASSWORD_KEY = "admin_password_hash";
const SERVICES_KEY = "service_presets";

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
  const { error } = await supabase.from("app_settings").upsert({
    key,
    value,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
}

export async function getStoredPasswordHash() {
  return getSetting<string>(PASSWORD_KEY);
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
