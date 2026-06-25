"use client";

import { useState } from "react";
import { formatDateTime, formatMoney } from "@/lib/format";
import type { Sale } from "@/lib/types";

type Props = {
  sales: Sale[];
  onDelete: (id: string) => void;
  onUpdateService: (id: string, service: string) => Promise<void>;
};

function ServiceEditor({
  sale,
  savingId,
  onSave,
  onCancel,
}: {
  sale: Sale;
  savingId: string | null;
  onSave: (service: string) => void;
  onCancel: () => void;
}) {
  const [draftService, setDraftService] = useState(sale.service);

  return (
    <div className="flex flex-col gap-2">
      <input
        value={draftService}
        onChange={(event) => setDraftService(event.target.value)}
        className="rounded-lg border border-rose-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSave(draftService.trim())}
          disabled={savingId === sale.id}
          className="text-xs text-rose-900 underline-offset-2 hover:underline disabled:opacity-60"
        >
          {savingId === sale.id ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-rose-700 underline-offset-2 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function SalesTable({ sales, onDelete, onUpdateService }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function saveService(id: string, service: string) {
    if (!service) return;

    setSavingId(id);
    await onUpdateService(id, service);
    setSavingId(null);
    setEditingId(null);
  }

  if (sales.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-rose-200 bg-white/60 p-10 text-center text-rose-800/70">
        No sales recorded for this period yet.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 md:hidden">
        {sales.map((sale) => (
          <article
            key={sale.id}
            className="rounded-3xl border border-rose-100 bg-white/80 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-rose-800/70">{formatDateTime(sale.sold_at)}</p>
                <p className="mt-1 font-medium text-rose-950">
                  {formatMoney(Number(sale.amount))}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onDelete(sale.id)}
                className="text-xs text-rose-700 underline-offset-2 hover:underline"
              >
                Delete
              </button>
            </div>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-rose-800/70">Client</dt>
                <dd className="mt-1 text-rose-950">{sale.client_name || "—"}</dd>
              </div>
              <div>
                <dt className="text-rose-800/70">Service</dt>
                <dd className="mt-1 text-rose-950">
                  {editingId === sale.id ? (
                    <ServiceEditor
                      sale={sale}
                      savingId={savingId}
                      onSave={(service) => void saveService(sale.id, service)}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{sale.service}</span>
                      <button
                        type="button"
                        onClick={() => setEditingId(sale.id)}
                        className="text-xs text-rose-700 underline-offset-2 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-rose-800/70">Payment</dt>
                <dd className="mt-1 capitalize text-rose-950">{sale.payment_method}</dd>
              </div>
              {sale.notes ? (
                <div>
                  <dt className="text-rose-800/70">Notes</dt>
                  <dd className="mt-1 text-rose-950">{sale.notes}</dd>
                </div>
              ) : null}
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-3xl border border-rose-100 bg-white/80 shadow-sm md:block">
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
                  <td className="px-4 py-3">
                    {editingId === sale.id ? (
                      <ServiceEditor
                        sale={sale}
                        savingId={savingId}
                        onSave={(service) => void saveService(sale.id, service)}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{sale.service}</span>
                        <button
                          type="button"
                          onClick={() => setEditingId(sale.id)}
                          className="text-xs text-rose-700 underline-offset-2 hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
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
    </>
  );
}
