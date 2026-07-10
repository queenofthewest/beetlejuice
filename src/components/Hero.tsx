import { TrustBadges } from "@/components/TrustBadges";

const textShadowSmall = "0 1px 4px rgba(0,0,0,0.7)";
const textShadowLarge = "0 2px 6px rgba(0,0,0,0.55)";

export function Hero() {
  return (
    <section id="hero" className="relative h-[92vh] w-full overflow-hidden md:min-h-screen">
      <img
        src="/assets/images/las-vegas/ISEESEXY_VictoriaWest_Jun23_3.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-top md:object-[50%_65%]"
      />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-sand to-transparent" />

      {/* Eyebrow + h1 — lower on mobile (near badges), left-anchored on desktop */}
      <div className="absolute z-10 bottom-44 left-0 right-0 px-6 text-center md:bottom-auto md:top-[20%] md:left-[6%] md:right-auto md:px-0 md:text-left lg:left-[14%]">
        <p
          className="mb-5 text-xs uppercase tracking-[0.35em] text-sand-soft"
          style={{ textShadow: textShadowSmall }}
        >
          Luxury Traveling Companion
        </p>
        <h1
          className="font-display text-5xl leading-[1.02] tracking-tight text-sand-soft"
          style={{ textShadow: textShadowLarge }}
        >
          Alyssa May
        </h1>
      </div>

      {/* Badges — bottom center */}
      <div className="absolute z-10 bottom-20 left-0 right-0 flex justify-center md:bottom-12">
        <TrustBadges />
      </div>
    </section>
  );
}
