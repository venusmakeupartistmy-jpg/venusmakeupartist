"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  WORK_CATEGORIES,
  portfolioWorks,
  resume,
  type WorkCategory,
  type WorkPiece,
} from "@/lib/job-portfolio";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  whatsappNumber?: string;
};

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-b border-neutral-800 pb-1.5 text-[0.7rem] font-semibold tracking-[0.22em] text-neutral-900 uppercase">
      {children}
    </h2>
  );
}

export function JobPortfolioPage({ whatsappNumber = "" }: Props) {
  const [filter, setFilter] = useState<WorkCategory | "all">("all");
  const [active, setActive] = useState<WorkPiece | null>(null);

  const works = useMemo(() => {
    if (filter === "all") return portfolioWorks;
    return portfolioWorks.filter((item) => item.category === filter);
  }, [filter]);

  const whatsappHref = whatsappNumber ? buildWhatsAppUrl(whatsappNumber) : "";

  const contactBits = [
    resume.location,
    resume.email || null,
    resume.phone || null,
    resume.instagramHandle,
    resume.websiteLabel,
  ].filter(Boolean) as string[];

  useEffect(() => {
    if (!active) return;
    const current = active;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
        return;
      }

      const index = works.findIndex((item) => item.id === current.id);
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
    <div className="min-h-screen bg-neutral-200/80 text-neutral-900 print:bg-white">
      {/* Top bar — hidden when printing */}
      <div className="border-b border-neutral-300 bg-white print:hidden">
        <div className="mx-auto flex w-full max-w-[820px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className="text-xs tracking-[0.16em] text-neutral-500 uppercase">
            Resume
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs tracking-[0.12em] text-neutral-700 uppercase transition hover:bg-neutral-50"
            >
              Print / PDF
            </button>
            <Link
              href="/"
              className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs tracking-[0.12em] text-neutral-700 uppercase transition hover:bg-neutral-50"
            >
              Website
            </Link>
          </div>
        </div>
      </div>

      {/* Resume sheet */}
      <div className="mx-auto w-full max-w-[820px] px-3 py-6 sm:px-4 sm:py-10 print:max-w-none print:px-0 print:py-0">
        <article className="bg-white px-5 py-8 shadow-sm sm:px-10 sm:py-12 print:shadow-none">
          {/* Header */}
          <header className="flex flex-col gap-5 border-b border-neutral-800 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h1 className="font-serif text-4xl tracking-tight text-neutral-900 sm:text-5xl">
                {resume.fullName}
              </h1>
              <p className="mt-2 text-sm font-medium tracking-[0.08em] text-neutral-700 uppercase sm:text-base">
                {resume.headline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {contactBits.map((bit, index) => (
                  <span key={bit}>
                    {index > 0 ? (
                      <span className="mx-2 text-neutral-300" aria-hidden>
                        |
                      </span>
                    ) : null}
                    {bit === resume.instagramHandle ? (
                      <a
                        href={resume.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-2 hover:underline"
                      >
                        {bit}
                      </a>
                    ) : bit === resume.websiteLabel ? (
                      <a
                        href={resume.website}
                        className="underline-offset-2 hover:underline"
                      >
                        {bit}
                      </a>
                    ) : bit === resume.email && resume.email ? (
                      <a
                        href={`mailto:${resume.email}`}
                        className="underline-offset-2 hover:underline"
                      >
                        {bit}
                      </a>
                    ) : bit === resume.phone && resume.phone ? (
                      <a
                        href={`tel:${resume.phone.replace(/\s/g, "")}`}
                        className="underline-offset-2 hover:underline"
                      >
                        {bit}
                      </a>
                    ) : (
                      bit
                    )}
                  </span>
                ))}
              </p>
              {(whatsappHref || resume.email) && (
                <div className="mt-4 flex flex-wrap justify-center gap-2 print:hidden sm:justify-start">
                  {whatsappHref ? (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center rounded-full bg-neutral-900 px-4 py-1.5 text-[0.65rem] font-medium tracking-[0.14em] text-white uppercase"
                    >
                      WhatsApp
                    </a>
                  ) : null}
                  {resume.email ? (
                    <a
                      href={`mailto:${resume.email}`}
                      className="inline-flex min-h-9 items-center rounded-full border border-neutral-300 px-4 py-1.5 text-[0.65rem] font-medium tracking-[0.14em] text-neutral-800 uppercase"
                    >
                      Email
                    </a>
                  ) : null}
                </div>
              )}
            </div>

            <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100 sm:mx-0 sm:h-32 sm:w-32 print:h-24 print:w-24">
              <Image
                src={resume.headshot}
                alt={`${resume.fullName} photo`}
                fill
                priority
                sizes="128px"
                className="object-cover"
              />
            </div>
          </header>

          {/* Summary */}
          <section className="mt-7">
            <SectionTitle>Professional summary</SectionTitle>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-[0.9375rem]">
              {resume.summary}
            </p>
          </section>

          {/* Experience */}
          <section className="mt-7">
            <SectionTitle>Experience</SectionTitle>
            <div className="mt-4 space-y-6">
              {resume.experience.map((job) => (
                <div key={`${job.role}-${job.org}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-base font-semibold text-neutral-900">
                      {job.role}
                    </h3>
                    <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase sm:text-right">
                      {job.period}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-neutral-700">
                    {job.org}
                    <span className="text-neutral-400"> · </span>
                    {job.location}
                  </p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-700">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mt-7">
            <SectionTitle>Skills</SectionTitle>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                  Technical
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                  {resume.skills.technical.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                  Professional
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                  {resume.skills.professional.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="mt-7">
            <SectionTitle>Education & training</SectionTitle>
            <div className="mt-4 space-y-3">
              {resume.education.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600">{item.detail}</p>
                  </div>
                  {item.period ? (
                    <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
                      {item.period}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {/* Languages + extras */}
          <section className="mt-7 grid gap-7 sm:grid-cols-2">
            <div>
              <SectionTitle>Languages</SectionTitle>
              <p className="mt-3 text-sm text-neutral-700">
                {resume.languages.join(" · ")}
              </p>
            </div>
            <div>
              <SectionTitle>Additional information</SectionTitle>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-neutral-700">
                {resume.extras.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Work samples */}
          <section id="work" className="mt-7">
            <SectionTitle>Selected work</SectionTitle>
            <p className="mt-2 text-sm text-neutral-600">
              Sample looks for review. Tap to enlarge.
            </p>

            <div
              role="tablist"
              aria-label="Filter work"
              className="mt-4 flex gap-1.5 overflow-x-auto pb-1 print:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                    className={`min-h-9 shrink-0 rounded-full px-3 py-1.5 text-[0.65rem] tracking-[0.12em] uppercase transition ${
                      selected
                        ? "bg-neutral-900 text-white"
                        : "border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-2.5 print:grid-cols-4">
              {works.map((piece) => (
                <button
                  key={piece.id}
                  type="button"
                  onClick={() => setActive(piece)}
                  className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 print:break-inside-avoid"
                >
                  <Image
                    src={piece.src}
                    alt={piece.alt}
                    fill
                    sizes="(max-width: 640px) 33vw, 160px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-neutral-500 print:hidden">
              Add more photos in <code className="text-neutral-700">lib/job-portfolio.ts</code>{" "}
              (target 20–30 for applications).
            </p>
          </section>

          {/* References note */}
          <section className="mt-7 border-t border-neutral-200 pt-5">
            <p className="text-center text-xs tracking-[0.16em] text-neutral-500 uppercase">
              References available upon request
            </p>
          </section>
        </article>

        <p className="mt-4 text-center text-xs text-neutral-500 print:hidden">
          <Link href="/" className="underline-offset-2 hover:underline">
            Back to website
          </Link>
        </p>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 p-4 print:hidden"
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
            <p className="mt-3 text-center text-sm text-white/85">
              {active.caption ?? active.alt}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
