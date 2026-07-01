export type Locale = "en" | "zh";

export type Testimonial = {
  quote: string;
  name: string;
  event: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PackageCopy = {
  title: string;
  description: string;
};

export type Translations = {
  common: {
    whatsapp: string;
    instagram: string;
    menu: string;
    close: string;
    brandName: string;
    location: string;
    copyright: string;
    chatOnWhatsApp: string;
  };
  language: {
    label: string;
    en: string;
    zh: string;
  };
  nav: {
    bridal: string;
    services: string;
    gallery: string;
    about: string;
    testimonials: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    availability: string;
    ctaBridal: string;
  };
  about: {
    imageAlt: string;
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    cta: string;
  };
  bridal: {
    imageAlt: string;
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    instagramLink: string;
  };
  testimonials: {
    eyebrow: string;
    items: Testimonial[];
  };
  brands: {
    eyebrow: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    whatsappLabel: string;
    instagramCta: string;
    galleryCta: string;
  };
  footer: {
    tagline: string;
    bridalHeading: string;
    bridalLinks: {
      makeupHairdo: string;
      trial: string;
      gallery: string;
      testimonials: string;
    };
    servicesHeading: string;
    servicesLinks: {
      rom: string;
      dinner: string;
      bridesmaid: string;
      touchup: string;
    };
    contactHeading: string;
  };
  packages: Record<string, PackageCopy>;
  portfolioLabels: Record<string, string>;
};
