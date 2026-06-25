"use client";

import { useCallback, useEffect, useState } from "react";
import { formatDate, formatMoney, todayIsoDate } from "@/lib/format";
import type { Sale } from "@/lib/types";
import { AdminLogoutButton } from "@/components/admin-login";
import { SalesForm } from "@/components/sales-form";
import { SalesTable } from "@/components/sales-table";

export function SalesDashboard() {
  const [selectedDate, setSelectedDate] = useState(todayIsoDate());
  const [sales, setSales] = useState<Sale[]>([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const loadSales = useCallback(async () => {
    const response = await fetch(`/api/sales?date=${selectedDate}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      setError("Could not load sales.");
      setLoading(false);
      return;
    }

    const data = (await response.json()) as {
      sales: Sale[];
      total: number;
      count: number;
    };

    setSales(data.sales);
    setTotal(data.total);
    setCount(data.count);
    setLastUpdated(new Date());
    setError("");
    setLoading(false);
  }, [selectedDate]);

  useEffect(() => {
    setLoading(true);
    void loadSales();
    const interval = window.setInterval(() => {
      void loadSales();
    }, 2000);

    return () => window.clearInterval(interval);
  }, [loadSales]);

  function onCreated(sale: Sale) {
    const saleDay = sale.sold_at.slice(0, 10);
    if (saleDay === selectedDate) {
      setSales((current) => [sale, ...current]);
      setTotal((current) => current + Number(sale.amount));
      setCount((current) => current + 1);
      setLastUpdated(new Date());
    }
  }

  async function onDelete(id: string) {
    const response = await fetch(`/api/sales/${id}`, { method: "DELETE" });
    if (!response.ok) return;
    await loadSales();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-rose-700">
            Live sales ledger
          </p>
          <h1 className="font-serif text-4xl text-rose-950">Venus Admin</h1>
          <p className="mt-2 text-rose-800/70">
            {formatDate(`${selectedDate}T12:00:00.000Z`)}
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-sm">
          <p className="text-sm text-rose-800/70">Today&apos;s total</p>
          <p className="mt-2 font-serif text-3xl text-rose-950">
            {formatMoney(total)}
          </p>
        </div>
        <div className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-sm">
          <p className="text-sm text-rose-800/70">Sales count</p>
          <p className="mt-2 font-serif text-3xl text-rose-950">{count}</p>
        </div>
        <div className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-sm">
          <p className="text-sm text-rose-800/70">Live status</p>
          <p className="mt-2 font-serif text-3xl text-rose-950">
            {loading ? "Syncing" : "Live"}
          </p>
          <p className="mt-2 text-xs text-rose-800/60">
            {lastUpdated
              ? `Updated ${lastUpdated.toLocaleTimeString("en-MY")}`
              : "Waiting for first sync"}
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <label className="text-sm font-medium text-rose-950">
          View date
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="mt-2 block rounded-xl border border-rose-200 px-4 py-2 outline-none focus:ring-2 focus:ring-rose-300"
          />
        </label>
        <a
          href="/"
          className="text-sm text-rose-800 underline-offset-4 hover:underline"
        >
          Back to website
        </a>
      </div>

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <SalesForm onCreated={onCreated} />
        <div>
          {error ? <p className="mb-4 text-sm text-rose-700">{error}</p> : null}
          <SalesTable sales={sales} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
}
