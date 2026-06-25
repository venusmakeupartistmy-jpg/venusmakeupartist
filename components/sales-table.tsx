"use client";

import { formatDateTime, formatMoney } from "@/lib/format";
import type { Sale } from "@/lib/types";

type Props = {
  sales: Sale[];
  onDelete: (id: string) => void;
};

export function SalesTable({ sales, onDelete }: Props) {
  if (sales.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-rose-200 bg-white/60 p-10 text-center text-rose-800/70">
        No sales recorded for this day yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white/80 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-rose-50/80 text-rose-900">
            <tr>
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Notes</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t border-rose-100">
                <td className="px-4 py-3 whitespace-nowrap">
                  {formatDateTime(sale.sold_at)}
                </td>
                <td className="px-4 py-3">{sale.client_name || "—"}</td>
                <td className="px-4 py-3">{sale.service}</td>
                <td className="px-4 py-3 capitalize">{sale.payment_method}</td>
                <td className="px-4 py-3 font-medium text-rose-950">
                  {formatMoney(Number(sale.amount))}
                </td>
                <td className="px-4 py-3 max-w-xs truncate text-rose-800/80">
                  {sale.notes || "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onDelete(sale.id)}
                    className="text-xs text-rose-700 underline-offset-2 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
