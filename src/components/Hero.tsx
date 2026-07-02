import { TrustBadges } from "@/components/TrustBadges";

export function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden pb-20 bg-sand">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 50%, oklch(0.90 0.04 72) 20%, transparent 80%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-sand/60 via-transparent to-sand" />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-28 pb-20 text-center md:max-w-4xl md:pt-32">
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-terracotta/80">
          Scottsdale · Phoenix · Nationwide
        </p>
        <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-terra-gradient sm:text-6xl lg:text-7xl">
          Victoria West
        </h1>
        <div className="terra-divider mx-auto my-6 w-40" />

        <div className="relative mx-auto mt-10 w-full max-w-lg md:max-w-2xl">
          <div className="absolute inset-0 -translate-x-3 translate-y-3 rounded-[2rem] border border-terracotta/30" />
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/assets/images/las-vegas/ISEESEXY_VictoriaWest_Jun23_3.webp"
            />
            <img
              src="/assets/images/las-vegas/ISEESEXY_VictoriaWest_Jun23_5.webp"
              alt="Victoria West"
              width={1024}
              height={1280}
              className="relative aspect-[3/4] max-h-[75vh] w-full rounded-[2rem] object-cover shadow-2xl shadow-espresso/20 md:aspect-auto md:max-h-[85vh]"
            />
          </picture>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-terracotta px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-sand-soft transition-transform hover:scale-105"
          >
            Book an Encounter
          </a>
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-espresso/60 transition-colors hover:text-terracotta"
          >
            See Gallery
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <TrustBadges />
      </div>
    </section>
  );
}
