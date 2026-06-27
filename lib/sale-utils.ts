import type { PaymentMethod, SaleUpdateInput } from "@/lib/types";

const PAYMENT_METHODS: PaymentMethod[] = ["cash", "card", "transfer", "other"];

export function toDatetimeLocalValue(iso: string) {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function fromDatetimeLocalValue(value: string) {
  return new Date(value).toISOString();
}

export function validateSaleUpdate(body: SaleUpdateInput) {
  if (!body.service?.trim()) {
    return "Service is required.";
  }

  if (!Number.isFinite(body.amount) || body.amount < 0) {
    return "Amount must be zero or more.";
  }

  if (!PAYMENT_METHODS.includes(body.payment_method)) {
    return "Invalid payment method.";
  }

  if (!body.sold_at || Number.isNaN(Date.parse(body.sold_at))) {
    return "Invalid date and time.";
  }

  return null;
}
