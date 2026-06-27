const BOOKING_MESSAGE =
  "Hi Venus, I'd like to enquire about a makeup booking.";

export function normalizeWhatsAppNumber(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("0")) {
    return `60${digits.slice(1)}`;
  }

  return digits;
}

export function isValidWhatsAppNumber(input: string): boolean {
  const normalized = normalizeWhatsAppNumber(input);
  return normalized.length >= 10 && normalized.length <= 15;
}

export function buildWhatsAppUrl(phone: string, message = BOOKING_MESSAGE): string {
  const normalized = normalizeWhatsAppNumber(phone);
  if (!normalized) return "";

  const base = `https://wa.me/${normalized}`;
  if (!message) return base;

  return `${base}?text=${encodeURIComponent(message)}`;
}

export function formatWhatsAppDisplay(phone: string): string {
  const normalized = normalizeWhatsAppNumber(phone);
  if (!normalized) return "";

  if (normalized.startsWith("60") && normalized.length >= 11) {
    const local = normalized.slice(2);
    return `+60 ${local.slice(0, 2)}-${local.slice(2, 5)} ${local.slice(5)}`;
  }

  return `+${normalized}`;
}

export { BOOKING_MESSAGE };
