import { INSTAGRAM_URL, SiteFooter, SiteHeader } from "@/components/site-header";
import { PortfolioImage } from "@/components/portfolio-image";
import { portfolioImages } from "@/lib/portfolio";
import Image from "next/image";

const services = [
  {
    title: "Bridal makeup",
    description:
      "Timeless bridal glam with luminous skin, sculpted features, and a finish that photographs beautifully from ceremony to reception.",
    price: "From RM 450",
  },
  {
    title: "Dinner & event",
    description:
      "Soft glam to full evening looks for dinners, celebrations, and red-carpet moments — polished, camera-ready, and long-wearing.",
    price: "From RM 180",
  },
  {
    title: "Creative & photoshoot",
    description:
      "Editorial, character, and portrait styling with precise detail for campaigns, content creation, and artistic projects.",
    price: "From RM 220",
  },
];

const profileImage = portfolioImages[0];
const feedImages = portfolioImages.slice(1);

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-editorial-glow">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,184,150,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,184,150,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-24 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-28">
            <div>
              <p className="text-xs tracking-[0.35em] text-gold uppercase">
                Kuala Lumpur makeup artist
              </p>
              <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-cream md:text-7xl">
                Goddess glam.
                <span className="block text-gold-gradient">Skin-first artistry.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-gold-light/85 md:text-lg">
                Venus creates personal, bridal, dinner and creative makeup with
                the warm, luminous aesthetic captured across her Instagram
                portfolio — refined glam rooted in flawless skin and soft
                sculpting.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-[0.12em] text-espresso uppercase transition hover:bg-champagne"
                >
                  View Instagram
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-gold/35 px-7 py-3 text-sm font-medium tracking-[0.12em] text-gold-light uppercase transition hover:border-gold hover:bg-white/5"
                >
                  Book a session
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold/25 via-transparent to-blush/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-black/20 p-3 shadow-2xl shadow-black/40 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-2">
                  {feedImages.slice(0, 3).map((image) => (
                    <PortfolioImage
                      key={image.src}
                      src={image.src}
                      alt={image.label}
                      className="aspect-[3/4] rounded-xl"
                    />
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between px-2 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full border border-gold/30">
                      <Image
                        src={profileImage.src}
                        alt={profileImage.label}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.25em] text-gold uppercase">
                        @venusss_makeupartist
                      </p>
                      <p className="mt-1 font-serif text-xl text-cream">
                        Captured looks
                      </p>
                    </div>
                  </div>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-gold/30 px-4 py-2 text-xs tracking-[0.15em] text-gold uppercase transition hover:bg-gold/10"
                  >
                    Follow
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-cream py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs tracking-[0.35em] text-taupe uppercase">
                  Portfolio
                </p>
                <h2 className="mt-3 font-serif text-4xl text-espresso md:text-5xl">
                  From the feed
                </h2>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm tracking-[0.15em] text-gold uppercase transition hover:text-mocha"
              >
                See all on Instagram →
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {feedImages.map((image) => (
                <PortfolioImage
                  key={image.src}
                  src={image.src}
                  alt={image.label}
                  label={image.label}
                  className="aspect-[4/5] rounded-2xl"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="border-y border-gold/15 bg-background py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.35em] text-taupe uppercase">
                Services
              </p>
              <h2 className="mt-3 font-serif text-4xl text-espresso md:text-5xl">
                Makeup for every moment
              </h2>
              <p className="mt-4 text-mocha/80">
                Personal styling sessions tailored to your features, outfit, and
                the mood of your event.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="rounded-[1.75rem] border border-gold/20 bg-cream/70 p-7 shadow-sm transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10"
                >
                  <div className="h-px w-10 bg-gold" />
                  <h3 className="mt-5 font-serif text-3xl text-espresso">
                    {service.title}
                  </h3>
                  <p className="mt-4 leading-7 text-mocha/80">
                    {service.description}
                  </p>
                  <p className="mt-8 text-sm tracking-[0.15em] text-gold uppercase">
                    {service.price}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#f8f3ec_0%,#efe4d7_100%)] py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs tracking-[0.35em] text-taupe uppercase">
                The Venus touch
              </p>
              <h2 className="mt-3 font-serif text-4xl text-espresso md:text-5xl">
                Warm tones. Soft sculpt. Lasting wear.
              </h2>
            </div>
            <ul className="space-y-4 text-mocha/85">
              <li className="flex gap-3 border-b border-gold/15 pb-4">
                <span className="text-gold">01</span>
                Skin-first prep with seamless, photo-ready base work
              </li>
              <li className="flex gap-3 border-b border-gold/15 pb-4">
                <span className="text-gold">02</span>
                Customised tones that complement your undertone
              </li>
              <li className="flex gap-3 border-b border-gold/15 pb-4">
                <span className="text-gold">03</span>
                Glam finishes inspired by editorial beauty photography
              </li>
              <li className="flex gap-3">
                <span className="text-gold">04</span>
                On-location service available across Kuala Lumpur
              </li>
            </ul>
          </div>
        </section>

        <section id="contact" className="bg-espresso py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-[2rem] border border-gold/20 bg-[linear-gradient(145deg,#241c18_0%,#1a1410_100%)] px-8 py-12 md:px-12">
              <p className="text-xs tracking-[0.35em] text-gold uppercase">
                Contact
              </p>
              <h2 className="mt-3 font-serif text-4xl text-cream md:text-5xl">
                Ready for your next look?
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-gold-light/80">
                DM Venus on Instagram to check availability, share your event
                details, or book a trial session. Follow{" "}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold transition hover:text-champagne"
                >
                  @venusss_makeupartist
                </a>{" "}
                for the latest bridal, dinner, and creative work.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-[0.12em] text-espresso uppercase transition hover:bg-champagne"
                >
                  Message on Instagram
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-gold/35 px-7 py-3 text-sm font-medium tracking-[0.12em] text-gold-light uppercase transition hover:border-gold hover:bg-white/5"
                >
                  View portfolio
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
