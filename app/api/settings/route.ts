import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth-server";
import {
  getServicePresets,
  saveServicePresets,
} from "@/lib/settings-server";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorized();

  try {
    const services = await getServicePresets();
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load settings." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const body = (await request.json()) as { services?: string[] };
  if (!Array.isArray(body.services)) {
    return NextResponse.json({ error: "Services list is required." }, { status: 400 });
  }

  try {
    const services = await saveServicePresets(body.services);
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save settings." },
      { status: 400 },
    );
  }
}
