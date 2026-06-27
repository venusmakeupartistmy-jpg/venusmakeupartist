import Image from "next/image";
import { INSTAGRAM_URL } from "@/components/site-header";

type Props = {
  src: string;
  alt: string;
  label?: string;
  href?: string;
  className?: string;
};

export function PortfolioImage({
  src,
  alt,
  label,
  href = INSTAGRAM_URL,
  className = "",
}: Props) {
  const image = (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
        className="gallery-image object-cover"
      />
      {label ? (
        <>
          <div className="gallery-overlay absolute inset-0 bg-espresso/15 md:bg-espresso/0" />
          <div className="gallery-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/85 via-espresso/40 to-transparent p-3 sm:p-4">
            <p className="text-[0.65rem] tracking-[0.18em] text-gold-light uppercase sm:text-xs sm:tracking-[0.2em]">
              {label}
            </p>
          </div>
        </>
      ) : null}
    </>
  );

  if (label) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`gallery-card group relative block min-w-0 overflow-hidden ${className}`}
      >
        {image}
      </a>
    );
  }

  return (
    <div className={`gallery-card relative min-w-0 overflow-hidden ${className}`}>
      {image}
    </div>
  );
}
