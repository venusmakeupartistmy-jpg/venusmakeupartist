import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth-server";
import { createServiceClient } from "@/lib/supabase/server";
import type { SaleInput } from "@/lib/types";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  const supabase = createServiceClient();
  let query = supabase
    .from("sales")
    .select("*")
    .order("sold_at", { ascending: false });

  if (date) {
    const start = `${date}T00:00:00.000+08:00`;
    const end = `${date}T23:59:59.999+08:00`;
    query = query.gte("sold_at", start).lte("sold_at", end);
  }

  const { data, error } = await query.limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const sales = data ?? [];
  const total = sales.reduce((sum, row) => sum + Number(row.amount), 0);

  return NextResponse.json({ sales, total, count: sales.length });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const body = (await request.json()) as SaleInput;

  if (!body.service?.trim()) {
    return NextResponse.json({ error: "Service is required." }, { status: 400 });
  }

  if (!Number.isFinite(body.amount) || body.amount < 0) {
    return NextResponse.json({ error: "Amount must be zero or more." }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("sales")
    .insert({
      client_name: body.client_name?.trim() ?? "",
      service: body.service.trim(),
      amount: body.amount,
      payment_method: body.payment_method ?? "cash",
      notes: body.notes?.trim() ?? "",
      sold_at: body.sold_at ?? new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ sale: data }, { status: 201 });
}
