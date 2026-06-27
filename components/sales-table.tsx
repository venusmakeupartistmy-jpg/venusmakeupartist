"use client";

import { useState } from "react";
import { formatDateTime, formatMoney } from "@/lib/format";
import {
  fromDatetimeLocalValue,
  toDatetimeLocalValue,
} from "@/lib/sale-utils";
import {
  PAYMENT_METHODS,
  type PaymentMethod,
  type Sale,
  type SaleUpdateInput,
} from "@/lib/types";

type Props = {
  sales: Sale[];
  services: string[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: SaleUpdateInput) => Promise<boolean>;
};

function SaleEditor({
  sale,
  services,
  saving,
  onSave,
  onCancel,
}: {
  sale: Sale;
  services: string[];
  saving: boolean;
  onSave: (input: SaleUpdateInput) => void;
  onCancel: () => void;
}) {
  const [clientName, setClientName] = useState(sale.client_name);
  const [service, setService] = useState(
    services.includes(sale.service) ? sale.service : sale.service || services[0],
  );
  const [customService, setCustomService] = useState(
    services.includes(sale.service) ? "" : sale.service,
  );
  const [amount, setAmount] = useState(String(sale.amount));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    sale.payment_method,
  );
  const [notes, setNotes] = useState(sale.notes);
  const [soldAt, setSoldAt] = useState(toDatetimeLocalValue(sale.sold_at));
  const [useCustomService, setUseCustomService] = useState(
    !services.includes(sale.service),
  );

  function handleSave() {
    const resolvedService = useCustomService ? customService.trim() : service;

    onSave({
      client_name: clientName,
      service: resolvedService,
      amount: Number(amount),
      payment_method: paymentMethod,
      notes,
      sold_at: fromDatetimeLocalValue(soldAt),
    });
  }

  return (
    <div className="space-y-3 rounded-2xl border border-rose-100 bg-rose-50/40 p-3 sm:p-4">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-rose-950">Date & time</span>
        <input
          type="datetime-local"
          value={soldAt}
          onChange={(event) => setSoldAt(event.target.value)}
          className="w-full rounded-xl border border-rose-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-rose-950">Client name</span>
        <input
          value={clientName}
          onChange={(event) => setClientName(event.target.value)}
          className="w-full rounded-xl border border-rose-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
          placeholder="Optional"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-rose-950">Service</span>
        {useCustomService ? (
          <input
            value={customService}
            onChange={(event) => setCustomService(event.target.value)}
            className="w-full rounded-xl border border-rose-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
          />
        ) : (
          <select
            value={service}
            onChange={(event) => setService(event.target.value)}
            className="w-full rounded-xl border border-rose-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
          >
            {services.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}
        <button
          type="button"
          onClick={() => setUseCustomService((current) => !current)}
          className="mt-2 text-xs text-rose-700 underline-offset-2 hover:underline"
        >
          {useCustomService ? "Use preset service" : "Use custom service"}
        </button>
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-rose-950">Amount (MYR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-xl border border-rose-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-rose-950">Payment</span>
          <select
            value={paymentMethod}
            onChange={(event) =>
              setPaymentMethod(event.target.value as PaymentMethod)
            }
            className="w-full rounded-xl border border-rose-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
          >
            {PAYMENT_METHODS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-rose-950">Notes</span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="min-h-20 w-full rounded-xl border border-rose-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-rose-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-rose-200 px-4 py-2 text-sm text-rose-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function SalesTable({ sales, services, onDelete, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function saveSale(id: string, input: SaleUpdateInput) {
    setSavingId(id);
    const ok = await onUpdate(id, input);
    setSavingId(null);
    if (ok) setEditingId(null);
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
            {editingId === sale.id ? (
              <SaleEditor
                sale={sale}
                services={services}
                saving={savingId === sale.id}
                onSave={(input) => void saveSale(sale.id, input)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-rose-800/70">
                      {formatDateTime(sale.sold_at)}
                    </p>
                    <p className="mt-1 font-medium text-rose-950">
                      {formatMoney(Number(sale.amount))}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingId(sale.id)}
                      className="text-xs text-rose-900 underline-offset-2 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(sale.id)}
                      className="text-xs text-rose-700 underline-offset-2 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-rose-800/70">Client</dt>
                    <dd className="mt-1 text-rose-950">{sale.client_name || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-rose-800/70">Service</dt>
                    <dd className="mt-1 text-rose-950">{sale.service}</dd>
                  </div>
                  <div>
                    <dt className="text-rose-800/70">Payment</dt>
                    <dd className="mt-1 capitalize text-rose-950">
                      {sale.payment_method}
                    </dd>
                  </div>
                  {sale.notes ? (
                    <div>
                      <dt className="text-rose-800/70">Notes</dt>
                      <dd className="mt-1 text-rose-950">{sale.notes}</dd>
                    </div>
                  ) : null}
                </dl>
              </>
            )}
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
                <tr key={sale.id} className="border-t border-rose-100 align-top">
                  {editingId === sale.id ? (
                    <td colSpan={7} className="px-4 py-4">
                      <SaleEditor
                        sale={sale}
                        services={services}
                        saving={savingId === sale.id}
                        onSave={(input) => void saveSale(sale.id, input)}
                        onCancel={() => setEditingId(null)}
                      />
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatDateTime(sale.sold_at)}
                      </td>
                      <td className="px-4 py-3">{sale.client_name || "—"}</td>
                      <td className="px-4 py-3">{sale.service}</td>
                      <td className="px-4 py-3 capitalize">{sale.payment_method}</td>
                      <td className="px-4 py-3 font-medium text-rose-950">
                        {formatMoney(Number(sale.amount))}
                      </td>
                      <td className="px-4 py-3 max-w-xs text-rose-800/80">
                        {sale.notes || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setEditingId(sale.id)}
                            className="text-xs text-rose-900 underline-offset-2 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(sale.id)}
                            className="text-xs text-rose-700 underline-offset-2 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
