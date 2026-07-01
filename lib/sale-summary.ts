import type { SaleButton } from "@/lib/sale-buttons";
import { calculateCommissionTotal } from "@/lib/sale-buttons";
import type { Sale } from "@/lib/types";

const MULTIPLIER_PATTERN = /^(.+?)\s×(\d+)$/;

export function parseSaleService(service: string) {
  const trimmed = service.trim();
  const match = trimmed.match(MULTIPLIER_PATTERN);

  if (match) {
    const quantity = Number(match[2]);
    return {
      label: match[1].trim(),
      quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    };
  }

  return { label: trimmed, quantity: 1 };
}

export type SaleButtonSummaryRow = {
  id: string;
  label: string;
  unitPrice: number;
  quantity: number;
  total: number;
  commissionAmount: number;
  commissionTotal: number;
};

export type SalesByButtonSummary = {
  rows: SaleButtonSummaryRow[];
  other: { quantity: number; total: number } | null;
  grandTotal: number;
  grandCommission: number;
};

export function summarizeSalesByButtons(
  sales: Sale[],
  buttons: SaleButton[],
): SalesByButtonSummary {
  const buttonByLabel = new Map(
    buttons.map((button) => [button.label.trim(), button]),
  );
  const totals = new Map<string, { quantity: number; total: number }>();

  for (const button of buttons) {
    totals.set(button.id, { quantity: 0, total: 0 });
  }

  let otherQuantity = 0;
  let otherTotal = 0;

  for (const sale of sales) {
    const { label, quantity } = parseSaleService(sale.service);
    const amount = Number(sale.amount);
    const button = buttonByLabel.get(label);

    if (button) {
      const row = totals.get(button.id)!;
      row.quantity += quantity;
      row.total += amount;
    } else {
      otherQuantity += quantity;
      otherTotal += amount;
    }
  }

  const rows = buttons.map((button) => {
    const rowQuantity = totals.get(button.id)!.quantity;
    const commissionAmount = button.commission_amount ?? 0;

    return {
      id: button.id,
      label: button.label,
      unitPrice: button.amount,
      quantity: rowQuantity,
      total: totals.get(button.id)!.total,
      commissionAmount,
      commissionTotal: calculateCommissionTotal(rowQuantity, commissionAmount),
    };
  });

  const grandCommission = rows.reduce((sum, row) => sum + row.commissionTotal, 0);

  return {
    rows,
    other:
      otherQuantity > 0 || otherTotal > 0
        ? { quantity: otherQuantity, total: otherTotal }
        : null,
    grandTotal: sales.reduce((sum, sale) => sum + Number(sale.amount), 0),
    grandCommission,
  };
}
