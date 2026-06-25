import { SiteHeader } from "@/components/site-header";

const services = [
  {
    title: "Bridal makeup",
    description:
      "Soft glam, traditional, or modern bridal looks tailored to your outfit, venue, and photography needs.",
    price: "From RM 450",
  },
  {
    title: "Party & event makeup",
    description:
      "Camera-ready makeup for dinners, birthdays, graduations, and special occasions.",
    price: "From RM 180",
  },
  {
    title: "Photoshoot makeup",
    description:
      "Flawless base and defined features that hold up beautifully under studio and outdoor lighting.",
    price: "From RM 220",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(183,110,121,0.18),transparent_55%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-rose-700">
                Professional makeup artist
              </p>
              <h1 className="mt-4 font-serif text-5xl leading-tight text-rose-950 md:text-6xl">
                Beauty that feels like you, only elevated.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-rose-900/80">
                Venus Makeup Artist creates refined bridal, event, and
                photoshoot looks with a soft, luminous finish. Based in
                Malaysia and available for bookings.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-full bg-rose-900 px-6 py-3 font-medium text-white transition hover:bg-rose-800"
                >
                  Book a session
                </a>
                <a
                  href="#services"
                  className="rounded-full border border-rose-200 px-6 py-3 font-medium text-rose-900 transition hover:bg-white"
                >
                  View services
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-rose-100 bg-white/70 p-8 shadow-xl shadow-rose-100/60 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-rose-700">
                Signature style
              </p>
              <h2 className="mt-3 font-serif text-3xl text-rose-950">
                Soft glam. Clean skin. Lasting wear.
              </h2>
              <ul className="mt-6 space-y-4 text-rose-900/80">
                <li>Skin-first prep and seamless base work</li>
                <li>Customized tones for your skin undertone</li>
                <li>Long-wear products for heat and events</li>
                <li>On-location service available</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-4 py-20">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-700">
              Services
            </p>
            <h2 className="mt-3 font-serif text-4xl text-rose-950">
              Makeup for every milestone
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-sm"
              >
                <h3 className="font-serif text-2xl text-rose-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-rose-900/75">{service.description}</p>
                <p className="mt-6 font-medium text-rose-800">{service.price}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-rose-100 bg-white/60 py-20"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-[2rem] border border-rose-100 bg-rose-950 px-8 py-12 text-rose-50 md:px-12">
              <p className="text-sm uppercase tracking-[0.2em] text-rose-200">
                Contact
              </p>
              <h2 className="mt-3 font-serif text-4xl">
                Ready for your next look?
              </h2>
              <p className="mt-4 max-w-2xl text-rose-100/85">
                Message Venus on WhatsApp or Instagram to check availability,
                discuss your event, or book a trial session.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/"
                  className="rounded-full bg-white px-6 py-3 font-medium text-rose-950 transition hover:bg-rose-50"
                >
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/"
                  className="rounded-full border border-rose-200 px-6 py-3 font-medium text-white transition hover:bg-rose-900"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
