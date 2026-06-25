"use client";

import Link from "next/link";
import { useState } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/venusss_makeupartist/";

const NAV_LINKS = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-espresso/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-serif text-2xl tracking-wide text-cream">
          Venus<span className="text-gold-gradient">.</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm tracking-[0.12em] text-gold-light uppercase md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-champagne"
            >
              {link.label}
            </a>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-gold/40 px-4 py-2 text-gold transition hover:bg-gold/10"
          >
            Instagram
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
          className="rounded-full border border-gold/30 px-3 py-2 text-xs tracking-[0.15em] text-gold uppercase md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm tracking-[0.12em] text-gold-light uppercase">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-gold/15 px-4 py-3 transition hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-gold/30 px-4 py-3 text-gold transition hover:bg-gold/10"
            >
              Instagram
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/15 bg-espresso px-4 py-10 text-center">
      <p className="font-serif text-2xl text-cream">Venus Makeup Artist</p>
      <p className="mt-2 text-sm tracking-[0.2em] text-taupe uppercase">
        Kuala Lumpur, Malaysia
      </p>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block text-sm tracking-[0.15em] text-gold uppercase transition hover:text-champagne"
      >
        @venusss_makeupartist
      </a>
    </footer>
  );
}

export { INSTAGRAM_URL };
