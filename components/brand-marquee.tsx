"use client";

import Image from "next/image";
import { BRANDS } from "@/lib/brands";

export function BrandMarquee() {
  const sequence = BRANDS.flatMap((brand) => [brand, brand]);
  const items = [...sequence, ...sequence];

  return (
    <div className="brand-marquee-mask mt-8 overflow-hidden">
      <div className="brand-marquee-track flex w-max items-center gap-12 sm:gap-16">
        {items.map((brand, index) => (
          <div
            key={`${brand.id}-${index}`}
            className="brand-logo-wrap flex h-10 shrink-0 items-center sm:h-11"
          >
            <Image
              src={brand.logoSrc}
              alt={brand.name}
              width={brand.logoWidth}
              height={brand.logoHeight}
              className="brand-logo h-7 w-auto max-w-[9rem] object-contain sm:h-8"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
