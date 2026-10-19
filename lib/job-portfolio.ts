/** Professional work portfolio for job applications — add photos in public/portfolio/. */

export type WorkCategory =
  | "bridal"
  | "soft-glam"
  | "event"
  | "creative"
  | "hair";

export type WorkPiece = {
  id: string;
  src: string;
  alt: string;
  category: WorkCategory;
  /** Short caption shown in lightbox / on hover */
  caption?: string;
};

export const WORK_CATEGORIES: { id: WorkCategory | "all"; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "bridal", label: "Bridal" },
  { id: "soft-glam", label: "Soft glam" },
  { id: "event", label: "Event" },
  { id: "hair", label: "Hair" },
  { id: "creative", label: "Creative" },
];

export const portfolioProfile = {
  name: "Venus",
  fullName: "Venus Makeup Artist",
  title: "Professional Makeup Artist & Hair Stylist",
  location: "Kuala Lumpur, Malaysia",
  email: "", // optional — add if you want it public
  phone: "", // optional
  instagram: "https://www.instagram.com/venusss_makeupartist/",
  instagramHandle: "@venusss_makeupartist",
  website: "https://venusmakeupartist.site",
  headshot: "/portfolio/profile.jpg",
  summary:
    "Makeup artist and hair stylist based in Kuala Lumpur, specialising in bridal, ROM, and event beauty. Focused on refined skin finish, balanced colour, and looks that photograph well and last through long event days. Available for salon, studio, or on-location work across the Klang Valley.",
  skills: [
    "Bridal makeup",
    "Soft glam & evening makeup",
    "ROM & solemnisation looks",
    "Hairstyling & updos",
    "Skin prep & colour matching",
    "On-location / travel appointments",
    "Client consultation",
    "Touch-up & longevity techniques",
  ],
  highlights: [
    {
      title: "Bridal & ROM",
      detail:
        "Full bridal packages including trial, wedding-day makeup and hair, with looks designed for photos and long wear.",
    },
    {
      title: "Events & dinners",
      detail:
        "Soft glam and polished evening makeup for dinners, parties, and formal occasions.",
    },
    {
      title: "On-location service",
      detail:
        "Travels across Kuala Lumpur and the Klang Valley for home, hotel, and venue appointments.",
    },
  ],
};

/**
 * Selected work for the portfolio grid.
 * To add photos later (aim for 20–30):
 * 1. Drop images into public/portfolio/ (e.g. work-07.jpg)
 * 2. Add an entry below with id, src, alt, and category
 */
export const portfolioWorks: WorkPiece[] = [
  {
    id: "w01",
    src: "/portfolio/ig-1.jpg",
    alt: "Bridal makeup and hair",
    category: "bridal",
    caption: "Bridal makeup & hair",
  },
  {
    id: "w02",
    src: "/portfolio/ig-2.jpg",
    alt: "Soft glam makeup with styled hair",
    category: "soft-glam",
    caption: "Soft glam & hairdo",
  },
  {
    id: "w03",
    src: "/portfolio/ig-3.jpg",
    alt: "Evening glam makeup",
    category: "event",
    caption: "Evening glam",
  },
  {
    id: "w04",
    src: "/portfolio/ig-4.jpg",
    alt: "Creative makeup look",
    category: "creative",
    caption: "Creative paint",
  },
  {
    id: "w05",
    src: "/portfolio/ig-5.jpg",
    alt: "Event hair and makeup",
    category: "event",
    caption: "Event hair & makeup",
  },
  {
    id: "w06",
    src: "/portfolio/ig-6.jpg",
    alt: "Dinner makeup and hair",
    category: "soft-glam",
    caption: "Dinner makeup & hair",
  },
];
