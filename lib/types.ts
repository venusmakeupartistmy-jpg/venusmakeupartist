export type PaymentMethod = "cash" | "card" | "transfer" | "other";

export type Sale = {
  id: string;
  client_name: string;
  service: string;
  amount: number;
  payment_method: PaymentMethod;
  notes: string;
  sold_at: string;
  created_at: string;
};

export type SaleInput = {
  client_name: string;
  service: string;
  amount: number;
  payment_method: PaymentMethod;
  notes: string;
  sold_at?: string;
};

export const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "cash", label: "Cash" },
  { value: "card", label: "Card" },
  { value: "transfer", label: "Bank transfer" },
  { value: "other", label: "Other" },
];

export const DEFAULT_SERVICES = [
  "Bridal makeup",
  "Party / event makeup",
  "Photoshoot makeup",
  "Trial session",
  "Touch-up",
  "Makeup class",
  "Product sale",
];
