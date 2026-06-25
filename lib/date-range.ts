export type DateRangePreset = "past-week" | "this-month" | "custom";

export type DateRange = {
  preset: DateRangePreset;
  from: string;
  to: string;
};

const MYT_OFFSET = "+08:00";

function formatIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDayIso(date: string) {
  return `${date}T00:00:00.000${MYT_OFFSET}`;
}

function endOfDayIso(date: string) {
  return `${date}T23:59:59.999${MYT_OFFSET}`;
}

export function todayIsoDate() {
  return formatIsoDate(new Date());
}

export function getDateRange(
  preset: DateRangePreset,
  customFrom?: string,
  customTo?: string,
): DateRange {
  const today = todayIsoDate();
  const now = new Date();

  if (preset === "past-week") {
    const fromDate = new Date(now);
    fromDate.setDate(fromDate.getDate() - 6);
    return {
      preset,
      from: formatIsoDate(fromDate),
      to: today,
    };
  }

  if (preset === "this-month") {
    const fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
    return {
      preset,
      from: formatIsoDate(fromDate),
      to: today,
    };
  }

  const from = customFrom || today;
  const to = customTo || customFrom || today;

  return {
    preset: "custom",
    from: from <= to ? from : to,
    to: to >= from ? to : from,
  };
}

export function toQueryRange(range: DateRange) {
  return {
    from: startOfDayIso(range.from),
    to: endOfDayIso(range.to),
  };
}

export function formatRangeLabel(range: DateRange) {
  const formatter = new Intl.DateTimeFormat("en-MY", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (range.preset === "past-week") return "Past 7 days";
  if (range.preset === "this-month") return "This month";

  const from = formatter.format(new Date(`${range.from}T12:00:00`));
  const to = formatter.format(new Date(`${range.to}T12:00:00`));
  return range.from === range.to ? from : `${from} – ${to}`;
}
