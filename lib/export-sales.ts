import type { Sale } from "@/lib/types";

function escapeCsv(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function salesToCsv(sales: Sale[]) {
  const headers = [
    "Date",
    "Time",
    "Client",
    "Service",
    "Amount (MYR)",
    "Notes",
  ];

  const rows = sales.map((sale) => {
    const date = new Date(sale.sold_at);
    const datePart = date.toLocaleDateString("en-MY");
    const timePart = date.toLocaleTimeString("en-MY", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return [
      datePart,
      timePart,
      sale.client_name,
      sale.service,
      Number(sale.amount).toFixed(2),
      sale.notes,
    ].map(escapeCsv);
  });

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
}

export function downloadSalesCsv(sales: Sale[], filename: string) {
  const blob = new Blob([`\uFEFF${salesToCsv(sales)}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
