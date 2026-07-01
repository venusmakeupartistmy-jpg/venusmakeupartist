"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/components/locale-provider";
import { WhatsAppContactLine } from "@/components/whatsapp-button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const INSTAGRAM_URL = "https://www.instagram.com/venusss_makeupartist/";

const NAV_KEYS = [
  { href: "#bridal", key: "bridal" as const },
  { href: "#services", key: "services" as const },
  { href: "#portfolio", key: "gallery" as const },
  { href: "#about", key: "about" as const },
  { href: "#testimonials", key: "testimonials" as const },
  { href: "#contact", key: "contact" as const },
];

type HeaderProps = {
  whatsappNumber?: string;
};

export function SiteHeader({ whatsappNumber = "" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();
  const whatsappHref = whatsappNumber ? buildWhatsAppUrl(whatsappNumber) : "";

  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex w-full min-w-0 max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:py-4">
        <Link
          href="/"
          className="font-serif text-xl italic tracking-[0.03em] text-espresso sm:text-2xl"
        >
          {t.common.brandName}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_KEYS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="type-nav rounded-lg px-3 py-2 text-mocha transition hover:bg-gold/10 hover:text-espresso"
            >
              {t.nav[link.key]}
            </a>
          ))}
          <LanguageSwitcher className="ml-1" compact />
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium tracking-[0.1em] text-white uppercase transition hover:bg-[#20bd5a]"
            >
              {t.common.whatsapp}
            </a>
          ) : null}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="ml-1 rounded-full border border-gold/30 px-4 py-2 text-xs tracking-[0.1em] text-gold uppercase transition hover:bg-gold/10"
          >
            {t.common.instagram}
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher compact />
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? t.common.close : t.common.menu}
            onClick={() => setOpen((current) => !current)}
            className="rounded-lg border border-gold/25 px-3 py-2 text-xs tracking-[0.12em] text-mocha uppercase"
          >
            {open ? t.common.close : t.common.menu}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-gold/10 bg-cream px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2 text-sm tracking-[0.1em] text-mocha uppercase">
            {NAV_KEYS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gold/15 px-4 py-3 transition hover:bg-gold/5"
              >
                {t.nav[link.key]}
              </a>
            ))}
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-[#25D366] px-4 py-3 text-center text-white"
              >
                {t.common.whatsapp}
              </a>
            ) : null}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-gold/25 px-4 py-3 text-gold"
            >
              {t.common.instagram}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter({ whatsappNumber = "" }: { whatsappNumber?: string }) {
  const { t } = useLocale();
  const whatsappHref = whatsappNumber ? buildWhatsAppUrl(whatsappNumber) : "";

  return (
    <footer className="border-t border-gold/15 bg-espresso text-cream">
      <div className="mx-auto grid w-full min-w-0 max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
        <div>
          <p className="font-serif text-2xl italic tracking-[0.02em] text-cream">
            {t.common.brandName}
          </p>
          <p className="type-body mt-3 text-sm text-gold-light/75">{t.footer.tagline}</p>
        </div>

        <div>
          <p className="type-eyebrow text-gold">{t.footer.bridalHeading}</p>
          <ul className="mt-4 space-y-2 text-sm text-gold-light/80">
            <li>
              <a href="#bridal" className="transition hover:text-champagne">
                {t.footer.bridalLinks.makeupHairdo}
              </a>
            </li>
            <li>
              <a href="#bridal" className="transition hover:text-champagne">
                {t.footer.bridalLinks.trial}
              </a>
            </li>
            <li>
              <a href="#portfolio" className="transition hover:text-champagne">
                {t.footer.bridalLinks.gallery}
              </a>
            </li>
            <li>
              <a href="#testimonials" className="transition hover:text-champagne">
                {t.footer.bridalLinks.testimonials}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="type-eyebrow text-gold">{t.footer.servicesHeading}</p>
          <ul className="mt-4 space-y-2 text-sm text-gold-light/80">
            <li>
              <a href="#services" className="transition hover:text-champagne">
                {t.footer.servicesLinks.rom}
              </a>
            </li>
            <li>
              <a href="#services" className="transition hover:text-champagne">
                {t.footer.servicesLinks.dinner}
              </a>
            </li>
            <li>
              <a href="#services" className="transition hover:text-champagne">
                {t.footer.servicesLinks.bridesmaid}
              </a>
            </li>
            <li>
              <a href="#services" className="transition hover:text-champagne">
                {t.footer.servicesLinks.touchup}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="type-eyebrow text-gold">{t.footer.contactHeading}</p>
          <ul className="mt-4 space-y-3 text-sm text-gold-light/80">
            <li>{t.common.location}</li>
            {whatsappNumber ? (
              <li>
                <WhatsAppContactLine phone={whatsappNumber} />
              </li>
            ) : null}
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-champagne"
              >
                @venusss_makeupartist
              </a>
            </li>
            {whatsappHref ? (
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium tracking-[0.1em] text-white uppercase transition hover:bg-[#20bd5a]"
                >
                  {t.common.whatsapp}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/10 px-4 py-5 text-center text-xs text-taupe">
        © {new Date().getFullYear()} {t.common.copyright}
      </div>
    </footer>
  );
}

export { INSTAGRAM_URL };
