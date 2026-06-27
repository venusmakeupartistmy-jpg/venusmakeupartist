"use client";

import { BRAND_LOGO_COMPONENTS } from "@/components/brand-logos";
import { BRANDS, type BrandId } from "@/lib/brands";

const LOGO_SIZES: Record<BrandId, string> = {
  nars: "brand-logo h-12 w-auto sm:h-14",
  mac: "brand-logo h-10 w-auto max-w-[7.5rem] object-contain sm:h-11 sm:max-w-[8.5rem]",
  "laura-mercier": "brand-logo h-12 w-auto sm:h-14",
  sephora: "brand-logo h-12 w-auto sm:h-14",
};

export function BrandMarquee() {
  const items = [...BRANDS, ...BRANDS];

  return (
    <div className="brand-marquee-mask mt-8 overflow-hidden">
      <div className="brand-marquee-track flex w-max items-center gap-10 sm:gap-16">
        {items.map((brand, index) => {
          const Logo = BRAND_LOGO_COMPONENTS[brand.id];

          return (
            <div
              key={`${brand.id}-${index}`}
              className="flex h-12 shrink-0 items-center text-espresso sm:h-14"
            >
              <Logo className={LOGO_SIZES[brand.id]} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
