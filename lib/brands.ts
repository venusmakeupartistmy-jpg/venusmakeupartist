export type Brand = {
  id: string;
  name: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
};

export const BRANDS: Brand[] = [
  {
    id: "nars",
    name: "NARS",
    logoSrc: "/brands/nars.svg",
    logoWidth: 120,
    logoHeight: 32,
  },
  {
    id: "mac",
    name: "M·A·C",
    logoSrc: "/brands/mac.svg",
    logoWidth: 120,
    logoHeight: 32,
  },
  {
    id: "laura-mercier",
    name: "Laura Mercier",
    logoSrc: "/brands/laura-mercier.svg",
    logoWidth: 180,
    logoHeight: 48,
  },
  {
    id: "sephora",
    name: "Sephora",
    logoSrc: "/brands/sephora.svg",
    logoWidth: 1000,
    logoHeight: 130,
  },
];
