"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/format";
import type { SaleButton } from "@/lib/sale-buttons";
import {
  PAYMENT_METHODS,
  type PaymentMethod,
  type Sale,
} from "@/lib/types";

type Props = {
  saleButtons: SaleButton[];
  onCreated: (sale: Sale) => void;
  className?: string;
};

export function SalesForm({ saleButtons, onCreated, className = "" }: Props) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function recordSale(buttonId: string) {
    const preset = saleButtons.find((item) => item.id === buttonId);
    if (!preset || activeId) return;

    setError("");
    setActiveId(buttonId);

    const response = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: "",
        service: preset.label,
        amount: preset.amount,
        payment_method: paymentMethod,
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
        Tap a button — saved instantly. Rename buttons in Settings.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {PAYMENT_METHODS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setPaymentMethod(item.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
              paymentMethod === item.value
                ? "bg-rose-900 text-white"
                : "border border-rose-200 text-rose-900 hover:bg-rose-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {saleButtons.map((preset) => {
          const busy = activeId === preset.id;
          const disabled = activeId !== null && !busy;

          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => void recordSale(preset.id)}
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
    </section>
  );
}
