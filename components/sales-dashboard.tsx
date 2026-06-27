"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatMoney } from "@/lib/format";
import {
  getDateRange,
  toQueryRange,
  formatRangeLabel,
  type DateRangePreset,
} from "@/lib/date-range";
import type { Sale } from "@/lib/types";
import { DEFAULT_SERVICES } from "@/lib/types";
import { AdminLogoutButton } from "@/components/admin-login";
import { AdminSettingsPanel } from "@/components/admin-settings-panel";
import { SalesDateFilter } from "@/components/sales-date-filter";
import { SalesForm } from "@/components/sales-form";
import { SalesTable } from "@/components/sales-table";

export function SalesDashboard() {
  const [preset, setPreset] = useState<DateRangePreset>("past-week");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [services, setServices] = useState<string[]>(DEFAULT_SERVICES);
  const [sales, setSales] = useState<Sale[]>([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const range = useMemo(
    () => getDateRange(preset, customFrom, customTo),
    [preset, customFrom, customTo],
  );

  const loadSettings = useCallback(async () => {
    const response = await fetch("/api/settings", { cache: "no-store" });
    if (!response.ok) return;

    const data = (await response.json()) as { services: string[] };
    if (data.services?.length) {
      setServices(data.services);
    }
  }, []);

  const loadSales = useCallback(async () => {
    const query = toQueryRange(range);
    const params = new URLSearchParams({
      from: query.from,
      to: query.to,
    });

    const response = await fetch(`/api/sales?${params.toString()}`, {
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
  }, [range]);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    setLoading(true);
    void loadSales();
    const interval = window.setInterval(() => {
      void loadSales();
    }, 2000);

    return () => window.clearInterval(interval);
  }, [loadSales]);

  function onCreated(sale: Sale) {
    const soldAt = sale.sold_at.slice(0, 10);
    if (soldAt >= range.from && soldAt <= range.to) {
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

  async function onUpdateService(id: string, service: string) {
    const response = await fetch(`/api/sales/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service }),
    });

    if (!response.ok) return;

    const data = (await response.json()) as { sale: Sale };
    setSales((current) =>
      current.map((sale) => (sale.id === id ? data.sale : sale)),
    );
    setLastUpdated(new Date());
  }

  function onPresetChange(nextPreset: DateRangePreset) {
    setPreset(nextPreset);
    if (nextPreset === "custom" && !customFrom && !customTo) {
      const current = getDateRange("past-week");
      setCustomFrom(current.from);
      setCustomTo(current.to);
    }
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl px-3 py-6 sm:px-4 sm:py-10">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-rose-700 sm:text-sm">
            Live sales ledger
          </p>
          <h1 className="font-serif text-2xl text-rose-950 sm:text-3xl md:text-4xl">Venus Admin</h1>
          <p className="mt-2 break-words text-sm text-rose-800/70">{formatRangeLabel(range)}</p>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-3">
          <AdminSettingsPanel
            services={services}
            onServicesUpdated={setServices}
          />
          <AdminLogoutButton />
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:mb-8 sm:gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-rose-100 bg-white/80 p-4 shadow-sm sm:p-6">
          <p className="text-sm text-rose-800/70">Period total</p>
          <p className="mt-2 break-words font-serif text-2xl text-rose-950 sm:text-3xl">
            {formatMoney(total)}
          </p>
        </div>
        <div className="rounded-3xl border border-rose-100 bg-white/80 p-4 shadow-sm sm:p-6">
          <p className="text-sm text-rose-800/70">Sales count</p>
          <p className="mt-2 font-serif text-2xl text-rose-950 sm:text-3xl">{count}</p>
        </div>
        <div className="rounded-3xl border border-rose-100 bg-white/80 p-4 shadow-sm sm:p-6">
          <p className="text-sm text-rose-800/70">Live status</p>
          <p className="mt-2 font-serif text-2xl text-rose-950 sm:text-3xl">
            {loading ? "Syncing" : "Live"}
          </p>
          <p className="mt-2 text-xs text-rose-800/60">
            {lastUpdated
              ? `Updated ${lastUpdated.toLocaleTimeString("en-MY")}`
              : "Waiting for first sync"}
          </p>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <SalesDateFilter
          range={range}
          customFrom={customFrom}
          customTo={customTo}
          onPresetChange={onPresetChange}
          onCustomFromChange={setCustomFrom}
          onCustomToChange={setCustomTo}
        />
        <a
          href="/"
          className="inline-block text-sm text-rose-800 underline-offset-4 hover:underline"
        >
          Back to website
        </a>
      </div>

      <div className="grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
        <SalesForm services={services} onCreated={onCreated} />
        <div className="min-w-0">
          {error ? <p className="mb-4 text-sm text-rose-700">{error}</p> : null}
          <SalesTable
            sales={sales}
            onDelete={onDelete}
            onUpdateService={onUpdateService}
          />
        </div>
      </div>
    </div>
  );
}
