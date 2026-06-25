import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth-server";
import { createServiceClient } from "@/lib/supabase/server";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const { id } = await context.params;
  const body = (await request.json()) as { service?: string };

  if (!body.service?.trim()) {
    return NextResponse.json({ error: "Service is required." }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("sales")
    .update({ service: body.service.trim() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ sale: data });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const { id } = await context.params;
  const supabase = createServiceClient();
  const { error } = await supabase.from("sales").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
