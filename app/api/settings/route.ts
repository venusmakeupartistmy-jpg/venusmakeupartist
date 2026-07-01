import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth-server";
import {
  getServicePresets,
  getSaleButtons,
  getWebsitePackages,
  getWhatsAppNumber,
  saveSaleButtons,
  saveServicePresets,
  saveWebsitePackages,
  saveWhatsAppNumber,
} from "@/lib/settings-server";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorized();

  try {
    const [services, whatsappNumber, websitePackages, saleButtons] = await Promise.all([
      getServicePresets(),
      getWhatsAppNumber(),
      getWebsitePackages(),
      getSaleButtons(),
    ]);
    return NextResponse.json({ services, whatsappNumber, websitePackages, saleButtons });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load settings." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const body = (await request.json()) as {
    services?: string[];
    whatsappNumber?: string;
    websitePackages?: unknown;
    saleButtons?: unknown;
  };

  if (
    !Array.isArray(body.services) &&
    body.whatsappNumber === undefined &&
    body.websitePackages === undefined &&
    body.saleButtons === undefined
  ) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  try {
    let services = await getServicePresets();
    let whatsappNumber = await getWhatsAppNumber();
    let websitePackages = await getWebsitePackages();
    let saleButtons = await getSaleButtons();

    if (Array.isArray(body.services)) {
      services = await saveServicePresets(body.services);
    }

    if (body.whatsappNumber !== undefined) {
      whatsappNumber = await saveWhatsAppNumber(body.whatsappNumber);
    }

    if (body.websitePackages !== undefined) {
      websitePackages = await saveWebsitePackages(body.websitePackages);
    }

    if (body.saleButtons !== undefined) {
      saleButtons = await saveSaleButtons(body.saleButtons);
    }

    return NextResponse.json({ services, whatsappNumber, websitePackages, saleButtons });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save settings." },
      { status: 400 },
    );
  }
}
