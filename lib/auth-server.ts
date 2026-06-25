import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";

export async function isAdminAuthenticated() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get("venus_admin_session")?.value;
  return verifyAdminToken(token, secret);
}
