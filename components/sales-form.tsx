"use client";

import { useEffect, useState } from "react";
import {
  PAYMENT_METHODS,
  type PaymentMethod,
  type Sale,
} from "@/lib/types";

type Props = {
  services: string[];
  onCreated: (sale: Sale) => void;
};

export function SalesForm({ services, onCreated }: Props) {
  const [clientName, setClientName] = useState("");
  const [service, setService] = useState(services[0] ?? "");
  const [customService, setCustomService] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service === "custom") return;
    if (!services.includes(service)) {
      setService(services[0] ?? "custom");
    }
  }, [service, services]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const resolvedService =
      service === "custom" ? customService.trim() : service;

    const response = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: clientName,
        service: resolvedService,
        amount: Number(amount),
        payment_method: paymentMethod,
        notes,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not save sale.");
      return;
    }

    const data = (await response.json()) as { sale: Sale };
    onCreated(data.sale);
    setClientName("");
    setAmount("");
    setNotes("");
    setCustomService("");
    setService(services[0] ?? "custom");
    setPaymentMethod("cash");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-sm backdrop-blur"
    >
      <h2 className="font-serif text-2xl text-rose-950">Record a sale</h2>
      <p className="mt-1 text-sm text-rose-800/70">
        New entries appear instantly in your live ledger.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium text-rose-950">Client name</span>
          <input
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            className="w-full rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
            placeholder="Optional"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-2 block font-medium text-rose-950">Amount (MYR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
            placeholder="0.00"
            required
          />
        </label>

        <label className="block text-sm md:col-span-2">
          <span className="mb-2 block font-medium text-rose-950">Service</span>
          <select
            value={service}
            onChange={(event) => setService(event.target.value)}
            className="w-full rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
          >
            {services.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
            <option value="custom">Custom service</option>
          </select>
        </label>

        {service === "custom" ? (
          <label className="block text-sm md:col-span-2">
            <span className="mb-2 block font-medium text-rose-950">
              Custom service name
            </span>
            <input
              value={customService}
              onChange={(event) => setCustomService(event.target.value)}
              className="w-full rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
              required
            />
          </label>
        ) : null}

        <label className="block text-sm">
          <span className="mb-2 block font-medium text-rose-950">Payment</span>
          <select
            value={paymentMethod}
            onChange={(event) =>
              setPaymentMethod(event.target.value as PaymentMethod)
            }
            className="w-full rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
          >
            {PAYMENT_METHODS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm md:col-span-2">
          <span className="mb-2 block font-medium text-rose-950">Notes</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="min-h-24 w-full rounded-xl border border-rose-200 px-4 py-3 outline-none focus:ring-2 focus:ring-rose-300"
            placeholder="Package details, location, deposit, etc."
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-xl bg-rose-900 px-5 py-3 font-medium text-white transition hover:bg-rose-800 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Add sale"}
      </button>
    </form>
  );
}
