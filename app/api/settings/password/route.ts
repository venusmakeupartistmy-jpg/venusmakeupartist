import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth-server";
import { changeAdminPassword } from "@/lib/settings-server";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const body = (await request.json()) as {
    currentPassword?: string;
    newPassword?: string;
  };

  if (!body.currentPassword?.trim() || !body.newPassword?.trim()) {
    return NextResponse.json(
      { error: "Current and new password are required." },
      { status: 400 },
    );
  }

  try {
    await changeAdminPassword(body.currentPassword, body.newPassword);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not change password." },
      { status: 400 },
    );
  }
}
