"use client";

import Link from "next/link";
import { useState } from "react";
import { WhatsAppContactLine } from "@/components/whatsapp-button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const INSTAGRAM_URL = "https://www.instagram.com/venusss_makeupartist/";

const NAV_LINKS = [
  { href: "#bridal", label: "Bridal" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

type HeaderProps = {
  whatsappNumber?: string;
};

export function SiteHeader({ whatsappNumber = "" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const whatsappHref = whatsappNumber ? buildWhatsAppUrl(whatsappNumber) : "";

  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex w-full min-w-0 max-w-6xl items-center justify-between px-4 py-3 sm:py-4">
        <Link
          href="/"
          className="font-serif text-xl italic tracking-[0.03em] text-espresso sm:text-2xl"
        >
          Venus Makeup Artist
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="type-nav rounded-lg px-3 py-2 text-mocha transition hover:bg-gold/10 hover:text-espresso"
            >
              {link.label}
            </a>
          ))}
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium tracking-[0.1em] text-white uppercase transition hover:bg-[#20bd5a]"
            >
              WhatsApp
            </a>
          ) : null}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="ml-1 rounded-full border border-gold/30 px-4 py-2 text-xs tracking-[0.1em] text-gold uppercase transition hover:bg-gold/10"
          >
            Instagram
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
          className="rounded-lg border border-gold/25 px-3 py-2 text-xs tracking-[0.12em] text-mocha uppercase lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-gold/10 bg-cream px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2 text-sm tracking-[0.1em] text-mocha uppercase">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gold/15 px-4 py-3 transition hover:bg-gold/5"
              >
                {link.label}
              </a>
            ))}
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-[#25D366] px-4 py-3 text-center text-white"
              >
                WhatsApp
              </a>
            ) : null}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-gold/25 px-4 py-3 text-gold"
            >
              Instagram
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter({ whatsappNumber = "" }: { whatsappNumber?: string }) {
  const whatsappHref = whatsappNumber ? buildWhatsAppUrl(whatsappNumber) : "";

  return (
    <footer className="border-t border-gold/15 bg-espresso text-cream">
      <div className="mx-auto grid w-full min-w-0 max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
        <div>
          <p className="font-serif text-2xl italic tracking-[0.02em] text-cream">Venus Makeup Artist</p>
          <p className="type-body mt-3 text-sm text-gold-light/75">
            Professional makeup &amp; hairdo services in Kuala Lumpur. Bridal,
            ROM, and event packages — available across the Klang Valley.
          </p>
        </div>

        <div>
          <p className="type-eyebrow text-gold">Bridal</p>
          <ul className="mt-4 space-y-2 text-sm text-gold-light/80">
            <li>
              <a href="#bridal" className="transition hover:text-champagne">
                Bridal makeup & hairdo
              </a>
            </li>
            <li>
              <a href="#bridal" className="transition hover:text-champagne">
                Bridal trial (makeup &amp; hairdo)
              </a>
            </li>
            <li>
              <a href="#portfolio" className="transition hover:text-champagne">
                Work gallery
              </a>
            </li>
            <li>
              <a href="#testimonials" className="transition hover:text-champagne">
                Testimonials
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="type-eyebrow text-gold">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-gold-light/80">
            <li>
              <a href="#services" className="transition hover:text-champagne">
                ROM & solemnisation
              </a>
            </li>
            <li>
              <a href="#services" className="transition hover:text-champagne">
                Dinner & event
              </a>
            </li>
            <li>
              <a href="#services" className="transition hover:text-champagne">
                Bridesmaid makeup &amp; hairdo
              </a>
            </li>
            <li>
              <a href="#services" className="transition hover:text-champagne">
                Touch-up &amp; hair refresh
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="type-eyebrow text-gold">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-gold-light/80">
            <li>Kuala Lumpur, Malaysia</li>
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
                  WhatsApp
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/10 px-4 py-5 text-center text-xs text-taupe">
        © {new Date().getFullYear()} Venus Makeup Artist · Kuala Lumpur, Malaysia
      </div>
    </footer>
  );
}

export { INSTAGRAM_URL };
