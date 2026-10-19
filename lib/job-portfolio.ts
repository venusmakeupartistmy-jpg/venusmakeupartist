/** Resume / CV content for job applications — edit this file to update the page. */

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
  caption?: string;
};

export const WORK_CATEGORIES: { id: WorkCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bridal", label: "Bridal" },
  { id: "soft-glam", label: "Soft glam" },
  { id: "event", label: "Event" },
  { id: "hair", label: "Hair" },
  { id: "creative", label: "Creative" },
];

export const resume = {
  name: "Venus",
  fullName: "Venus",
  headline: "Makeup Artist & Hair Stylist",
  location: "Kuala Lumpur, Malaysia",
  email: "", // e.g. "hello@example.com"
  phone: "", // e.g. "+60 12-345 6789"
  instagram: "https://www.instagram.com/venusss_makeupartist/",
  instagramHandle: "@venusss_makeupartist",
  website: "https://venusmakeupartist.site",
  websiteLabel: "venusmakeupartist.site",
  headshot: "/portfolio/profile.jpg",
  summary:
    "Professional makeup artist and hair stylist with hands-on experience in bridal, ROM, and event beauty. Skilled in skin prep, colour matching, soft glam, and lasting looks for photography and long event days. Reliable, client-focused, and available for salon, studio, or on-location appointments across the Klang Valley.",
  experience: [
    {
      role: "Makeup Artist & Hair Stylist",
      org: "Venus Makeup Artist (Independent)",
      location: "Kuala Lumpur / Klang Valley",
      period: "Present",
      bullets: [
        "Provide bridal, ROM, and event makeup and hairstyling for private clients.",
        "Conduct bridal trials and deliver wedding-day looks designed for longevity and photography.",
        "Manage client consultations, bookings, and on-location appointments.",
        "Maintain a consistent professional standard for soft glam, formal, and creative looks.",
      ],
    },
  ],
  skills: {
    technical: [
      "Bridal makeup",
      "Soft glam & evening makeup",
      "ROM / solemnisation looks",
      "Hairstyling & updos",
      "Skin prep & colour matching",
      "Touch-up & longevity techniques",
    ],
    professional: [
      "Client consultation",
      "On-location / travel service",
      "Time management for event schedules",
      "Portfolio & social presentation",
    ],
  },
  education: [
    {
      title: "Professional makeup & hair training",
      detail: "Add school / course name, year, and certificate here.",
      period: "",
    },
  ],
  languages: ["English", "Bahasa Malaysia", "Chinese (optional — edit as needed)"],
  extras: [
    "Available for full-time, part-time, or freelance makeup artist roles",
    "Own kit for bridal and event work",
    "Willing to travel within Klang Valley",
  ],
};

/** Keep as alias so older imports still work if referenced. */
export const portfolioProfile = {
  name: resume.name,
  fullName: resume.fullName,
  title: resume.headline,
  location: resume.location,
  email: resume.email,
  phone: resume.phone,
  instagram: resume.instagram,
  instagramHandle: resume.instagramHandle,
  website: resume.website,
  headshot: resume.headshot,
  summary: resume.summary,
  skills: [...resume.skills.technical, ...resume.skills.professional],
  highlights: resume.experience[0]
    ? resume.experience[0].bullets.map((detail, index) => ({
        title: `Highlight ${index + 1}`,
        detail,
      }))
    : [],
};

/**
 * Selected work samples (attach more photos for applications).
 * Drop files in public/portfolio/ and add entries below (target 20–30).
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
