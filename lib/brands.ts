export type BrandId = "nars" | "mac" | "laura-mercier" | "sephora";

export type Brand = {
  id: BrandId;
  name: string;
};

export const BRANDS: Brand[] = [
  { id: "nars", name: "NARS" },
  { id: "mac", name: "M·A·C" },
  { id: "laura-mercier", name: "Laura Mercier" },
  { id: "sephora", name: "Sephora" },
];
