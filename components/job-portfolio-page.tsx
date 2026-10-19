"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  WORK_CATEGORIES,
  portfolioProfile,
  portfolioWorks,
  type WorkCategory,
  type WorkPiece,
} from "@/lib/job-portfolio";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  whatsappNumber?: string;
};

export function JobPortfolioPage({ whatsappNumber = "" }: Props) {
  const [filter, setFilter] = useState<WorkCategory | "all">("all");
  const [active, setActive] = useState<WorkPiece | null>(null);

  const works = useMemo(() => {
    if (filter === "all") return portfolioWorks;
    return portfolioWorks.filter((item) => item.category === filter);
  }, [filter]);

  const whatsappHref = whatsappNumber ? buildWhatsAppUrl(whatsappNumber) : "";

  useEffect(() => {
    if (!active) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
      if (!active) return;

      const index = works.findIndex((item) => item.id === active.id);
      if (index < 0) return;

      if (event.key === "ArrowRight") {
        setActive(works[(index + 1) % works.length] ?? null);
      }
      if (event.key === "ArrowLeft") {
        setActive(works[(index - 1 + works.length) % works.length] ?? null);
      }
    }

    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active, works]);

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-espresso">
      <header className="border-b border-espresso/10 bg-[#f7f4ef]/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="font-serif text-xl italic text-espresso sm:text-2xl">
              {portfolioProfile.name}
            </p>
            <p className="mt-0.5 truncate text-xs tracking-[0.14em] text-taupe uppercase">
              Portfolio
            </p>
          </div>
          <nav className="flex shrink-0 items-center gap-2 text-xs tracking-[0.12em] uppercase sm:gap-3">
            <a href="#work" className="hidden text-mocha transition hover:text-espresso sm:inline">
              Work
            </a>
            <a href="#about" className="hidden text-mocha transition hover:text-espresso sm:inline">
              About
            </a>
            <a href="#contact" className="text-mocha transition hover:text-espresso">
              Contact
            </a>
            <Link
              href="/"
              className="rounded-full border border-espresso/15 px-3 py-2 text-mocha transition hover:bg-espresso/5"
            >
              Website
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Intro — clean CV-style header */}
        <section className="border-b border-espresso/10">
          <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-[200px_1fr] md:items-start">
            <div className="relative mx-auto aspect-[4/5] w-40 overflow-hidden rounded-sm bg-espresso/5 sm:w-48 md:mx-0 md:w-full">
              <Image
                src={portfolioProfile.headshot}
                alt={`${portfolioProfile.fullName} headshot`}
                fill
                priority
                sizes="200px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 text-center md:text-left">
              <p className="text-xs font-medium tracking-[0.28em] text-taupe uppercase">
                {portfolioProfile.location}
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
                {portfolioProfile.fullName}
              </h1>
              <p className="mt-2 text-base text-mocha sm:text-lg">
                {portfolioProfile.title}
              </p>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-mocha/90 md:mx-0 sm:text-base">
                {portfolioProfile.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-full bg-espresso px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-[#f7f4ef] uppercase transition hover:bg-mocha"
                  >
                    WhatsApp
                  </a>
                ) : null}
                <a
                  href={portfolioProfile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-espresso/20 px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-espresso uppercase transition hover:bg-espresso/5"
                >
                  Instagram
                </a>
                <a
                  href="#work"
                  className="inline-flex min-h-11 items-center rounded-full border border-espresso/20 px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-espresso uppercase transition hover:bg-espresso/5"
                >
                  View work
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills + highlights */}
        <section id="about" className="border-b border-espresso/10 bg-white/50">
          <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl text-espresso sm:text-3xl">
                Skills
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {portfolioProfile.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border-b border-espresso/10 py-2 text-sm text-mocha"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-espresso sm:text-3xl">
                Experience focus
              </h2>
              <div className="mt-5 space-y-5">
                {portfolioProfile.highlights.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-sm font-medium tracking-[0.08em] text-espresso uppercase">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mocha/90">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Work gallery */}
        <section id="work" className="border-b border-espresso/10">
          <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium tracking-[0.28em] text-taupe uppercase">
                  Selected work
                </p>
                <h2 className="mt-2 font-serif text-2xl text-espresso sm:text-3xl">
                  Portfolio
                </h2>
                <p className="mt-2 text-sm text-mocha/80">
                  {works.length} look{works.length === 1 ? "" : "s"}
                  {filter !== "all" ? ` · ${WORK_CATEGORIES.find((c) => c.id === filter)?.label}` : ""}
                </p>
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Filter work by category"
              className="mt-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {WORK_CATEGORIES.map((category) => {
                const selected = filter === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setFilter(category.id)}
                    className={`min-h-10 shrink-0 rounded-full px-4 py-2 text-xs tracking-[0.12em] uppercase transition ${
                      selected
                        ? "bg-espresso text-[#f7f4ef]"
                        : "border border-espresso/15 text-mocha hover:bg-espresso/5"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            {works.length === 0 ? (
              <p className="mt-10 text-sm text-mocha/70">
                No pieces in this category yet.
              </p>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
                {works.map((piece) => (
                  <button
                    key={piece.id}
                    type="button"
                    onClick={() => setActive(piece)}
                    className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-espresso/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso/40"
                  >
                    <Image
                      src={piece.src}
                      alt={piece.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/75 to-transparent p-3 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                      <span className="block text-[0.65rem] tracking-[0.16em] text-[#f7f4ef]/90 uppercase">
                        {piece.caption ?? piece.alt}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            <p className="mt-8 text-xs leading-relaxed text-taupe">
              Gallery expands as new work is added. Aim for 20–30 selected pieces
              across bridal, soft glam, event, hair, and creative.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-espresso text-[#f7f4ef]">
          <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <p className="text-xs font-medium tracking-[0.28em] text-champagne/80 uppercase">
              Contact
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Available for opportunities
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#f7f4ef]/75 sm:text-base">
              Open to makeup and hair roles, collaborations, and professional
              bookings. Reach out via WhatsApp or Instagram with the role or
              brief details.
            </p>

            <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="tracking-[0.14em] text-champagne/70 uppercase">
                  Based in
                </dt>
                <dd className="mt-1">{portfolioProfile.location}</dd>
              </div>
              <div>
                <dt className="tracking-[0.14em] text-champagne/70 uppercase">
                  Instagram
                </dt>
                <dd className="mt-1">
                  <a
                    href={portfolioProfile.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {portfolioProfile.instagramHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="tracking-[0.14em] text-champagne/70 uppercase">
                  Website
                </dt>
                <dd className="mt-1">
                  <a
                    href={portfolioProfile.website}
                    className="underline-offset-4 hover:underline"
                  >
                    venusmakeupartist.site
                  </a>
                </dd>
              </div>
              {whatsappHref ? (
                <div>
                  <dt className="tracking-[0.14em] text-champagne/70 uppercase">
                    WhatsApp
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      Message Venus
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full bg-[#f7f4ef] px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-espresso uppercase transition hover:bg-champagne"
                >
                  WhatsApp
                </a>
              ) : null}
              <a
                href={portfolioProfile.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-[#f7f4ef]/30 px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-[#f7f4ef] uppercase transition hover:bg-white/10"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-espresso/10 bg-[#f7f4ef] py-6 text-center text-xs text-taupe">
        <p>
          © {new Date().getFullYear()} {portfolioProfile.fullName} ·{" "}
          <Link href="/" className="underline-offset-2 hover:underline">
            Main website
          </Link>
        </p>
      </footer>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/90 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 rounded-full border border-white/25 px-3 py-2 text-xs tracking-[0.14em] text-white uppercase"
          >
            Close
          </button>
          <div
            className="relative max-h-[85vh] w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-black/40 sm:aspect-[4/5]">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-[#f7f4ef]/85">
              {active.caption ?? active.alt}
            </p>
            <p className="mt-1 text-center text-xs text-[#f7f4ef]/50">
              Use ← → keys to browse · Esc to close
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
