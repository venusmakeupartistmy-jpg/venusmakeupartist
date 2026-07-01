import type { WebsitePackage } from "@/lib/website-packages";
import { en } from "./en";
import { zh } from "./zh";
export type { Locale, Translations } from "./types";
import type { Locale, Translations } from "./types";

export const translations: Record<Locale, Translations> = { en, zh };

export const LOCALE_STORAGE_KEY = "venus-locale";

export function localizePackage(
  pkg: WebsitePackage,
  locale: Locale,
): WebsitePackage {
  if (locale === "en") return pkg;

  const copy = translations.zh.packages[pkg.id];
  if (!copy) return pkg;

  return {
    ...pkg,
    title: copy.title,
    description: copy.description,
    priceLabel: localizePriceLabel(pkg.priceLabel),
  };
}

export function localizePriceLabel(priceLabel: string): string {
  const trimmed = priceLabel.trim();
  if (/^from\s/i.test(trimmed)) {
    return `${trimmed.replace(/^from\s/i, "").trim()} 起`;
  }
  return trimmed;
}

export function portfolioLabel(
  filename: string,
  fallback: string,
  locale: Locale,
): string {
  if (locale === "en") return fallback;
  return translations.zh.portfolioLabels[filename] ?? fallback;
}
