import { INSTAGRAM_URL, SiteFooter, SiteHeader } from "@/components/site-header";
import { BrandMarquee } from "@/components/brand-marquee";
import { GalleryGrid } from "@/components/gallery-grid";
import { PortfolioImage } from "@/components/portfolio-image";
import { Reveal } from "@/components/reveal";
import {
  WhatsAppContactLine,
  WhatsAppCta,
  WhatsAppFloatingButton,
} from "@/components/whatsapp-button";
import {
  FAQ_ITEMS,
  TESTIMONIALS,
} from "@/lib/site-content";
import { portfolioImages } from "@/lib/portfolio";
import { getWebsitePackages, getWhatsAppNumber } from "@/lib/settings-server";
import { packagesByCategory } from "@/lib/website-packages";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Image from "next/image";

const feedImages = portfolioImages.slice(1);
const heroImage = feedImages[0] ?? portfolioImages[0];

export default async function HomePage() {
  const [whatsappNumber, websitePackages] = await Promise.all([
    getWhatsAppNumber(),
    getWebsitePackages(),
  ]);
  const { bridal: bridalPackages, event: eventPackages } =
    packagesByCategory(websitePackages);
  const bookingHref = whatsappNumber
    ? buildWhatsAppUrl(whatsappNumber)
    : "#contact";

  return (
    <>
      <SiteHeader whatsappNumber={whatsappNumber} />
      {whatsappNumber ? <WhatsAppFloatingButton phone={whatsappNumber} /> : null}

      <main className="min-w-0 overflow-x-hidden">
        {/* Hero — Beauty on Demand */}
        <section className="relative min-h-[70vh] overflow-hidden bg-espresso sm:min-h-[80vh]">
          <Image
            src={heroImage.src}
            alt={heroImage.label}
            fill
            priority
            sizes="100vw"
            className="animate-ken-burns object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/75 to-espresso/40" />
          <div className="relative mx-auto flex min-h-[70vh] w-full min-w-0 max-w-6xl flex-col justify-center px-4 py-20 sm:min-h-[80vh] sm:py-28">
            <p className="type-eyebrow animate-hero-in text-gold">
              Makeup &amp; hairdo · Kuala Lumpur
            </p>
            <h1 className="type-display animate-hero-in-delay-1 mt-4 max-w-2xl text-4xl text-cream sm:text-5xl md:text-6xl lg:text-7xl">
              Beauty on demand
            </h1>
            <p className="type-body animate-hero-in-delay-2 mt-5 max-w-xl text-sm text-gold-light/90 sm:text-base">
              Venus Makeup Artist specialises in professional makeup and hairdo
              services — bridal, ROM, dinner, and event styling with skin-first
              artistry and a finish that lasts all day.
            </p>
            <p className="animate-hero-in-delay-3 mt-4 text-sm text-gold-light/70">
              Available across Kuala Lumpur &amp; Klang Valley · Ready for travel
            </p>
            <div className="animate-hero-in-delay-4 mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#bridal"
                className="btn-lift w-fit max-w-[13.5rem] rounded-full bg-gold px-4 py-2.5 text-center text-xs leading-snug font-medium tracking-[0.06em] text-espresso uppercase transition hover:bg-champagne sm:max-w-none sm:px-7 sm:py-3 sm:text-sm sm:leading-normal sm:tracking-[0.12em]"
              >
                Bridal makeup &amp; hairdo
              </a>
              {whatsappNumber ? (
                <WhatsAppCta phone={whatsappNumber} variant="primary" />
              ) : (
                <a
                  href="#contact"
                  className="w-fit rounded-full bg-[#25D366] px-5 py-2.5 text-center text-xs font-medium tracking-[0.08em] text-white uppercase sm:px-7 sm:py-3 sm:text-sm sm:tracking-[0.12em]"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Welcome / About */}
        <section id="about" className="bg-cream py-16 sm:py-24">
          <div className="mx-auto grid w-full min-w-0 max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center md:gap-14">
            <Reveal direction="left">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl shadow-espresso/10">
                <Image
                  src={feedImages[1]?.src ?? heroImage.src}
                  alt="Venus makeup artistry"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="image-zoom-hover object-cover"
                />
              </div>
            </Reveal>
            <Reveal direction="right" delay={120}>
              <div className="min-w-0">
                <p className="type-eyebrow text-taupe">Welcome</p>
                <h2 className="type-section-title mt-3 text-3xl text-espresso sm:text-4xl md:text-5xl">
                  Personalised makeup &amp; hairdo you can trust
                </h2>
              <p className="type-body mt-5 text-mocha/85">
                Venus brings expert bridal makeup and hairstyling to every
                client — from soft natural glam to polished evening looks. With
                on-location service across KL, Venus is the artist to call when
                you want skilled, trusted makeup and hairdo in one session.
              </p>
              <p className="type-body mt-4 text-mocha/85">
                Every appointment includes skin-first prep, customised tones for
                your undertone, and a hairstyle designed to complement your
                makeup and last through your event.
              </p>
              <a
                href={whatsappNumber ? bookingHref : "#contact"}
                {...(whatsappNumber
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="btn-lift mt-8 inline-block rounded-full border border-gold/40 px-7 py-3 text-sm tracking-[0.12em] text-gold uppercase transition hover:bg-gold/10"
              >
                Book a session
              </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Featured Bridal */}
        <section id="bridal" className="border-y border-gold/15 bg-background py-16 sm:py-24">
          <div className="mx-auto grid w-full min-w-0 max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center md:gap-14">
            <Reveal direction="right" className="min-w-0 md:order-2">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl shadow-espresso/10">
                <Image
                  src={feedImages[2]?.src ?? heroImage.src}
                  alt="Bridal makeup by Venus"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="image-zoom-hover object-cover"
                />
              </div>
            </Reveal>
            <Reveal direction="left" delay={120} className="min-w-0 md:order-1">
              <div>
              <p className="type-eyebrow text-taupe">
                Bridal makeup &amp; hairdo
              </p>
              <h2 className="type-section-title mt-3 text-3xl text-espresso sm:text-4xl md:text-5xl">
                Your wedding day deserves the perfect look
              </h2>
              <p className="type-body mt-5 text-mocha/85">
                Planning your wedding is unforgettable — and choosing the right
                bridal artist is one of the most important decisions. Venus
                understands how to bring your vision to life and make you feel
                confident and beautiful on your special day.
              </p>
              <div className="mt-8 space-y-4">
                {bridalPackages.map((service, index) => (
                  <Reveal key={service.id} delay={index * 80} direction="up">
                  <div className="border-b border-gold/15 pb-4 last:border-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="type-subheading text-xl text-espresso">
                        {service.title}
                      </h3>
                      <span className="type-caption text-gold">
                        {service.priceLabel}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-mocha/75">
                      {service.description}
                    </p>
                  </div>
                  </Reveal>
                ))}
              </div>
              <a
                href={whatsappNumber ? bookingHref : "#contact"}
                {...(whatsappNumber
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="btn-lift mt-8 inline-block rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-[0.12em] text-espresso uppercase transition hover:bg-champagne"
              >
                Book bridal session
              </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Other Services */}
        <section id="services" className="bg-cream py-16 sm:py-24">
          <div className="mx-auto w-full min-w-0 max-w-6xl px-4">
            <Reveal>
              <div className="max-w-2xl">
                <p className="type-eyebrow text-taupe">
                  Event makeup &amp; hairdo
                </p>
                <h2 className="type-section-title mt-3 text-3xl text-espresso sm:text-4xl md:text-5xl">
                  Makeup &amp; hairdo for every occasion
                </h2>
                <p className="type-body mt-4 leading-7 text-mocha/80">
                  From ROM ceremonies to dinner events and bridesmaid styling —
                  complete makeup and hairdo packages for every moment.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {eventPackages.map((service, index) => (
                <Reveal key={service.id} delay={index * 90}>
                <article
                  className="rounded-2xl border border-gold/15 bg-white/60 p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-gold/30 hover:shadow-lg"
                >
                  <div className="gold-line-grow h-px w-8 bg-gold" />
                  <h3 className="mt-4 type-subheading text-xl text-espresso">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-mocha/75">
                    {service.description}
                  </p>
                  <p className="mt-5 type-caption text-gold">
                    {service.priceLabel}
                  </p>
                </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="portfolio" className="border-y border-gold/15 bg-background py-16 sm:py-24">
          <div className="mx-auto w-full min-w-0 max-w-6xl px-4">
            <Reveal>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="type-eyebrow text-taupe">
                  Work gallery
                </p>
                <h2 className="type-section-title mt-3 text-3xl text-espresso sm:text-4xl md:text-5xl">
                  Makeup &amp; hairdo looks
                </h2>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="type-caption text-gold transition hover:text-mocha"
              >
                See all on Instagram →
              </a>
              </div>
            </Reveal>
            <GalleryGrid className="mt-10">
              {feedImages.map((image) => (
                <PortfolioImage
                  key={image.src}
                  src={image.src}
                  alt={image.label}
                  label={image.label}
                  className="aspect-[4/5] rounded-xl"
                />
              ))}
            </GalleryGrid>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="bg-cream py-16 sm:py-24">
          <div className="mx-auto w-full min-w-0 max-w-6xl px-4">
            <Reveal>
              <p className="text-center type-eyebrow text-taupe">
                Testimonials
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {TESTIMONIALS.map((item, index) => (
                <Reveal key={item.name} delay={index * 100}>
                <blockquote
                  className="rounded-2xl border border-gold/15 bg-white/70 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8"
                >
                  <p className="type-body leading-8 text-mocha/85">&ldquo;{item.quote}&rdquo;</p>
                  <footer className="mt-5 border-t border-gold/10 pt-4">
                    <p className="font-serif text-lg italic text-espresso">~ {item.name}</p>
                    <p className="type-caption mt-1 text-taupe">
                      {item.event}
                    </p>
                  </footer>
                </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="border-y border-gold/15 bg-background py-12 sm:py-16">
          <div className="mx-auto w-full min-w-0 max-w-6xl px-4">
            <Reveal>
              <p className="text-center type-eyebrow text-taupe">
                Brands we use
              </p>
            </Reveal>
            <BrandMarquee />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto w-full min-w-0 max-w-3xl px-4">
            <Reveal>
              <p className="text-center type-eyebrow text-taupe">
                FAQs
              </p>
              <h2 className="type-section-title mt-3 text-center text-3xl text-espresso sm:text-4xl">
                Frequently asked questions
              </h2>
            </Reveal>
            <dl className="mt-10 space-y-6">
              {FAQ_ITEMS.map((item, index) => (
                <Reveal key={item.question} delay={index * 80}>
                <div
                  className="rounded-xl border border-gold/15 bg-white/60 p-5 transition duration-300 hover:border-gold/25 hover:shadow-sm sm:p-6"
                >
                  <dt className="type-subheading text-lg text-espresso">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-7 text-mocha/80">{item.answer}</dd>
                </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-espresso py-16 sm:py-24">
          <Reveal className="mx-auto w-full min-w-0 max-w-6xl px-4 text-center">
            <p className="type-eyebrow text-gold">Contact</p>
            <h2 className="type-section-title mt-3 text-3xl text-cream sm:text-4xl md:text-5xl">
              Ready to book makeup &amp; hairdo?
            </h2>
            <p className="type-body mx-auto mt-5 max-w-2xl text-gold-light/80">
              Message Venus on WhatsApp or Instagram to check availability, share
              your event details, or book a bridal trial for makeup and hair.
            </p>
            {whatsappNumber ? (
              <p className="mt-4 text-sm text-gold-light/70">
                WhatsApp: <WhatsAppContactLine phone={whatsappNumber} />
              </p>
            ) : null}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              {whatsappNumber ? (
                <WhatsAppCta phone={whatsappNumber} variant="primary" />
              ) : null}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-lift rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-[0.12em] text-espresso uppercase transition hover:bg-champagne"
              >
                Message on Instagram
              </a>
              <a
                href="#portfolio"
                className="btn-lift rounded-full border border-gold/35 px-7 py-3 text-sm font-medium tracking-[0.12em] text-gold-light uppercase transition hover:border-gold hover:bg-white/5"
              >
                View gallery
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter whatsappNumber={whatsappNumber} />
    </>
  );
}
