"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/format";
import type { SaleButton } from "@/lib/sale-buttons";
import type { Sale } from "@/lib/types";

type Props = {
  saleButtons: SaleButton[];
  onCreated: (sale: Sale) => void;
  className?: string;
};

export function SalesForm({ saleButtons, onCreated, className = "" }: Props) {
  const [pending, setPending] = useState<SaleButton | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function recordSale(preset: SaleButton) {
    if (activeId) return;

    setError("");
    setActiveId(preset.id);

    const response = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: "",
        service: preset.label,
        amount: preset.amount,
        notes: "",
      }),
    });

    setActiveId(null);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not save sale.");
      return;
    }

    const data = (await response.json()) as { sale: Sale };
    onCreated(data.sale);
  }

  return (
    <section
      className={`min-w-0 rounded-3xl border border-rose-100 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6 ${className}`}
    >
      <h2 className="font-serif text-xl text-rose-950 sm:text-2xl">Record a sale</h2>
      <p className="mt-1 text-sm text-rose-800/70">
        Tap a button, then confirm to save. Rename buttons in Settings.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {saleButtons.map((preset) => {
          const busy = activeId === preset.id;
          const disabled = activeId !== null && !busy;

          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => setPending(preset)}
              className="flex min-h-[3.25rem] items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-left transition hover:border-rose-400 hover:bg-rose-50/80 disabled:opacity-50"
            >
              <span className="min-w-0 text-sm font-medium leading-snug text-rose-950 sm:text-base">
                {busy ? "Saving…" : preset.label}
              </span>
              <span className="shrink-0 font-serif text-base text-rose-900 sm:text-lg">
                {formatMoney(preset.amount)}
              </span>
            </button>
          );
        })}
      </div>

      {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}

      {pending ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-espresso/40 p-0 sm:items-center sm:p-4"
          onClick={() => setPending(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="record-sale-title"
            className="w-full max-w-sm rounded-t-[2rem] border border-rose-100 bg-white p-5 shadow-2xl sm:rounded-[2rem] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h3
              id="record-sale-title"
              className="font-serif text-xl text-rose-950 sm:text-2xl"
            >
              Record this sale?
            </h3>
            <p className="mt-2 text-sm text-rose-800/70">
              {pending.label} · {formatMoney(pending.amount)}
            </p>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setPending(null)}
                className="flex-1 rounded-2xl border border-rose-200 px-4 py-2.5 text-sm font-medium text-rose-800"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={activeId !== null}
                onClick={() => {
                  setPending(null);
                  void recordSale(pending);
                }}
                className="flex-1 rounded-2xl bg-rose-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {activeId === pending.id ? "Saving…" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
