import Image from "next/image";

type LogoProps = {
  className?: string;
};

function BrandImageLogo({
  src,
  alt,
  width,
  height,
  className = "",
}: LogoProps & {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`brand-logo object-contain ${className}`}
      unoptimized
    />
  );
}

export function NarsLogo({ className = "" }: LogoProps) {
  return (
    <BrandImageLogo
      src="/brands/nars.png"
      alt="NARS"
      width={1171}
      height={494}
      className={className}
    />
  );
}

export function MacLogo({ className = "" }: LogoProps) {
  return (
    <BrandImageLogo
      src="/brands/mac.png"
      alt="M·A·C"
      width={634}
      height={73}
      className={className}
    />
  );
}

export function LauraMercierLogo({ className = "" }: LogoProps) {
  return (
    <BrandImageLogo
      src="/brands/laura-mercier.svg"
      alt="Laura Mercier"
      width={640}
      height={128}
      className={className}
    />
  );
}

export function SephoraLogo({ className = "" }: LogoProps) {
  return (
    <BrandImageLogo
      src="/brands/sephora.svg"
      alt="Sephora"
      width={1000}
      height={130}
      className={className}
    />
  );
}

export const BRAND_LOGO_COMPONENTS = {
  nars: NarsLogo,
  mac: MacLogo,
  "laura-mercier": LauraMercierLogo,
  sephora: SephoraLogo,
} as const;
