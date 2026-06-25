export const ADMIN_COOKIE = "venus_admin_session";

async function sign(value: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminToken(secret: string) {
  const payload = `admin:${Date.now()}`;
  return `${payload}.${await sign(payload, secret)}`;
}

export async function verifyAdminToken(
  token: string | undefined,
  secret: string,
) {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = await sign(payload, secret);
  if (signature.length !== expected.length) return false;

  let mismatch = 0;
  for (let index = 0; index < signature.length; index += 1) {
    mismatch |= signature.charCodeAt(index) ^ expected.charCodeAt(index);
  }

  return mismatch === 0;
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}
