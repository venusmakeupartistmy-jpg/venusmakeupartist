import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createAdminToken,
} from "@/lib/auth";
import { verifyAdminPassword } from "@/lib/settings-server";

export async function POST(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Admin secret is not configured." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as { password?: string };
  if (!body.password || !(await verifyAdminPassword(body.password))) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, await createAdminToken(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
