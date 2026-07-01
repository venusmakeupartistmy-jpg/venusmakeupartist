/** Admin-only one-tap sale buttons — separate from public website packages. */
export type SaleButton = {
  id: string;
  label: string;
  amount: number;
};

export const SALE_BUTTON_COUNT = 10;

/** Starter labels for the ledger — rename in Settings anytime. */
export const DEFAULT_SALE_BUTTONS: SaleButton[] = [
  { id: "btn-01", label: "Bridal full", amount: 450 },
  { id: "btn-02", label: "Bridal trial", amount: 180 },
  { id: "btn-03", label: "Bridal touch-up", amount: 120 },
  { id: "btn-04", label: "ROM", amount: 180 },
  { id: "btn-05", label: "Event / dinner", amount: 180 },
  { id: "btn-06", label: "Bridesmaid", amount: 150 },
  { id: "btn-07", label: "Touch-up", amount: 100 },
  { id: "btn-08", label: "Makeup only", amount: 120 },
  { id: "btn-09", label: "Hair only", amount: 100 },
  { id: "btn-10", label: "Product", amount: 50 },
];

function sanitizeButton(raw: unknown, fallback: SaleButton): SaleButton {
  if (!raw || typeof raw !== "object") return fallback;

  const item = raw as Record<string, unknown>;
  if (item.id !== fallback.id) return fallback;

  const label = typeof item.label === "string" ? item.label.trim() : "";
  const amount = Number(item.amount);

  return {
    id: fallback.id,
    label: label || fallback.label,
    amount: Number.isFinite(amount) && amount >= 0 ? amount : fallback.amount,
  };
}

export function mergeSaleButtons(stored: unknown): SaleButton[] {
  if (!Array.isArray(stored)) return [...DEFAULT_SALE_BUTTONS];

  const byId = new Map(
    stored
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const id = (item as SaleButton).id;
        return typeof id === "string" ? ([id, item] as const) : null;
      })
      .filter(Boolean) as [string, unknown][],
  );

  return DEFAULT_SALE_BUTTONS.map((fallback) =>
    sanitizeButton(byId.get(fallback.id), fallback),
  );
}

export function normalizeSaleButtons(input: unknown): SaleButton[] {
  if (!Array.isArray(input)) {
    throw new Error("Sale buttons must be an array.");
  }

  return DEFAULT_SALE_BUTTONS.map((fallback) => {
    const raw = input.find(
      (item) =>
        item &&
        typeof item === "object" &&
        (item as SaleButton).id === fallback.id,
    );
    const button = sanitizeButton(raw, fallback);

    if (!button.label.trim()) {
      throw new Error(`Button name is required for slot ${fallback.id}.`);
    }

    return button;
  });
}

export function saleButtonLabels(buttons: SaleButton[]): string[] {
  return buttons.map((button) => button.label.trim()).filter(Boolean);
}
