import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "Meet Alyssa" },
  { id: "portfolio", label: "Gallery" },
  { id: "profile", label: "Statistics" },
  { id: "booking", label: "Consideration" },
  { id: "contact", label: "Booking" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-sand/90 backdrop-blur-md py-3 shadow-lg shadow-espresso/10 border-b border-terracotta/15"
          : "py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a
          href="#hero"
          className={`font-display text-xl tracking-wide transition-colors duration-500 ${
            scrolled ? "text-terracotta" : "text-sand-soft"
          }`}
          style={scrolled ? undefined : { textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
        >
          A<span className={scrolled ? "text-espresso/60" : "text-sand-soft/70"}>M</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`group relative text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${
                  scrolled ? "text-espresso/60 hover:text-terracotta" : "text-sand-soft hover:text-terracotta"
                }`}
                style={scrolled ? undefined : { textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 transition ${scrolled ? "bg-terracotta" : "bg-sand-soft"} ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-6 transition ${scrolled ? "bg-terracotta" : "bg-sand-soft"} ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 transition ${scrolled ? "bg-terracotta" : "bg-sand-soft"} ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>
      {open && (
        <ul className="mt-4 flex flex-col gap-4 border-t border-terracotta/15 bg-sand/98 px-6 py-6 md:hidden">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-espresso/60 hover:text-terracotta"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
