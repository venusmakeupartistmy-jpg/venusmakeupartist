import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-rose-100/80 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-serif text-2xl text-rose-950">
          Venus Makeup Artist
        </Link>
        <nav className="flex items-center gap-6 text-sm text-rose-900">
          <a href="#services" className="hover:text-rose-700">
            Services
          </a>
          <a href="#contact" className="hover:text-rose-700">
            Contact
          </a>
          <Link
            href="/admin"
            className="rounded-full border border-rose-200 px-4 py-2 hover:bg-rose-50"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
