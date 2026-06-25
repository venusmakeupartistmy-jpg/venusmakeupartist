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
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover"
      />
      {label ? (
        <>
          <div className="absolute inset-0 bg-espresso/0 transition group-hover:bg-espresso/25" />
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-espresso/80 to-transparent p-4 transition group-hover:translate-y-0">
            <p className="text-xs tracking-[0.2em] text-gold-light uppercase">
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
        className={`group relative overflow-hidden ${className}`}
      >
        {image}
      </a>
    );
  }

  return <div className={`relative overflow-hidden ${className}`}>{image}</div>;
}
