"use client";

import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";

type Props = {
  className?: string;
  compact?: boolean;
};

export function LanguageSwitcher({ className = "", compact = false }: Props) {
  const { locale, setLocale, t } = useLocale();

  const options: { value: Locale; label: string }[] = [
    { value: "en", label: t.language.en },
    { value: "zh", label: t.language.zh },
  ];

  return (
    <div
      className={`inline-flex items-center rounded-full border border-gold/25 bg-white/40 p-0.5 ${className}`}
      role="group"
      aria-label={t.language.label}
    >
      {options.map((option) => {
        const active = locale === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLocale(option.value)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 text-[0.625rem] font-medium tracking-[0.08em] uppercase transition sm:px-3 sm:text-xs ${
              active
                ? "bg-gold text-espresso shadow-sm"
                : "text-mocha hover:text-espresso"
            }`}
          >
            {compact && option.value === "en" ? "EN" : compact && option.value === "zh" ? "中文" : option.label}
          </button>
        );
      })}
    </div>
  );
}
