import Link from "next/link";

const INSTAGRAM_URL = "https://www.instagram.com/venusss_makeupartist/";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-espresso/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-serif text-2xl tracking-wide text-cream">
          Venus<span className="text-gold-gradient">.</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm tracking-[0.12em] text-gold-light uppercase">
          <a href="#portfolio" className="transition hover:text-champagne">
            Portfolio
          </a>
          <a href="#services" className="transition hover:text-champagne">
            Services
          </a>
          <a href="#contact" className="transition hover:text-champagne">
            Contact
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-gold/40 px-4 py-2 text-gold transition hover:bg-gold/10 sm:inline-block"
          >
            Instagram
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/15 bg-espresso px-4 py-10 text-center">
      <p className="font-serif text-2xl text-cream">Venus Makeup Artist</p>
      <p className="mt-2 text-sm tracking-[0.2em] text-taupe uppercase">
        Kuala Lumpur, Malaysia
      </p>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block text-sm tracking-[0.15em] text-gold uppercase transition hover:text-champagne"
      >
        @venusss_makeupartist
      </a>
    </footer>
  );
}

export { INSTAGRAM_URL };
