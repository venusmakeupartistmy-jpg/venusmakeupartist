"use client";

import { BRANDS } from "@/lib/site-content";

export function BrandMarquee() {
  const items = [...BRANDS, ...BRANDS];

  return (
    <div className="brand-marquee-mask mt-8 overflow-hidden">
      <div className="brand-marquee-track flex w-max gap-10">
        {items.map((brand, index) => (
          <span
            key={`${brand}-${index}`}
            className="shrink-0 text-sm tracking-[0.15em] text-mocha/60 uppercase"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
