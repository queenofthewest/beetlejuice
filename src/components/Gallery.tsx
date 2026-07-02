import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";

const LV = "/assets/images/las-vegas";
const PHX = "/assets/images/Phoenix";
const TH = "/assets/images/Thailand";

const galleries = {
  "Vegas": [
    { src: `${LV}/ISEESEXY_VictoriaWest_Jun23_3.webp`, title: "Vegas I" },
    { src: `${LV}/ISEESEXY_VictoriaWest_Jun23_5.webp`, title: "Vegas II" },
    { src: `${LV}/ISEESEXY_VictoriaWest_Jun23_1.webp`, title: "Vegas III" },
    { src: `${LV}/ISEESEXY_VictoriaWest_Jun23_14.webp`, title: "Vegas IV" },
    { src: `${LV}/ISEESEXY_VictoriaWest_Jun23_24.webp`, title: "Vegas V" },
    { src: `${LV}/ISEESEXY_VictoriaWest_Jun23_WEB_9_v3.webp`, title: "Vegas VI" },
    { src: `${LV}/ISEESEXY_VictoriaWest_Jun23_WEB_16_v2.webp`, title: "Vegas VII" },
    { src: `${LV}/ISEESEXY_VictoriaWest_Jun23_WEB_17.webp`, title: "Vegas VIII" },
    { src: `${LV}/ISEESEXY_VictoriaWest_Jun23_WEB_25.webp`, title: "Vegas IX" },
    { src: `${LV}/ISEESEXY_VictoriaWest_Jun23_WEB_26.webp`, title: "Vegas X" },
    { src: `${LV}/ISEESEXY_VictoriaWest_Jan23_WEB_27_v2.webp`, title: "Vegas XI" },
    { src: `${LV}/IseeSexy_OliviaC_WEB_2.webp`, title: "Vegas XII" },
    { src: `${LV}/IseeSexy_OliviaC_WEB_4_v2.webp`, title: "Vegas XIII" },
    { src: `${LV}/IseeSexy_OliviaC_WEB_8.webp`, title: "Vegas XIV" },
    { src: `${LV}/IseeSexy_OliviaC_WEB_20.webp`, title: "Vegas XV" },
    { src: `${LV}/IseeSexy_OliviaC_WEB_23.webp`, title: "Vegas XVI" },
    { src: `${LV}/VicWest6_2.webp`, title: "Vegas XVII" },
    { src: `${LV}/VWest21.webp`, title: "Vegas XVIII" },
    { src: `${LV}/ISEESEXY_VictoriaWest_Jan23_WEB_7.webp`, title: "Vegas XIX" },
  ],
  "Phoenix": [
    { src: `${PHX}/DSC04466.webp`, title: "Phoenix I" },
    { src: `${PHX}/DSC04503.webp`, title: "Phoenix II" },
    { src: `${PHX}/DSC04549.webp`, title: "Phoenix III" },
    { src: `${PHX}/DSC04566.webp`, title: "Phoenix IV" },
    { src: `${PHX}/FLF00960-Edit.webp`, title: "Phoenix V" },
    { src: `${PHX}/_DSC3112-2.webp`, title: "Phoenix VI" },
    { src: `${PHX}/_DSC3115.webp`, title: "Phoenix VII" },
    { src: `${PHX}/downtown-1.webp`, title: "Phoenix VIII" },
    { src: `${PHX}/downtown-2.webp`, title: "Phoenix IX" },
    { src: `${PHX}/downtown-3.webp`, title: "Phoenix X" },
    { src: `${PHX}/20201119_185323.webp`, title: "Phoenix XI" },
    { src: `${PHX}/20201119_185347.webp`, title: "Phoenix XII" },
  ],
  "Thailand": [
    { src: `${TH}/NOK_1193.webp`, title: "Thailand I" },
    { src: `${TH}/NOK_1212_v2.webp`, title: "Thailand II" },
    { src: `${TH}/NOK_1213_v2.webp`, title: "Thailand III" },
    { src: `${TH}/NOK_1518-2_v2.webp`, title: "Thailand IV" },
    { src: `${TH}/NOK_1612-2-2.webp`, title: "Thailand V" },
    { src: `${TH}/NOK_1627-2-2_v2.webp`, title: "Thailand VI" },
    { src: `${TH}/NOK_1643-2-2_v2.webp`, title: "Thailand VII" },
    { src: `${TH}/NOK_1655.webp`, title: "Thailand VIII" },
  ],
};

type Location = keyof typeof galleries;
const locations = Object.keys(galleries) as Location[];

export function Gallery() {
  const [activeLocation, setActiveLocation] = useState<Location>("Vegas");
  const [active, setActive] = useState<number | null>(null);
  const images = galleries[activeLocation];

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <section id="portfolio" className="relative -mb-20 bg-sand py-24 md:py-32">
      {/* Section header */}
      <Reveal className="mb-10 text-center">
        <h2 className="font-display text-4xl text-espresso md:text-5xl">Gallery</h2>
        <div className="terra-divider mx-auto mt-6 w-32" />
      </Reveal>

      {/* Location tabs */}
      <div className="mb-8 flex justify-center gap-1 px-6">
        {locations.map((loc) => (
          <button
            key={loc}
            onClick={() => { setActiveLocation(loc); setActive(null); }}
            className={`px-6 py-2 text-[0.7rem] uppercase tracking-[0.2em] transition-all duration-200 border ${
              activeLocation === loc
                ? "border-terracotta bg-terracotta text-sand-soft"
                : "border-terracotta/25 text-espresso/55 hover:border-terracotta/60 hover:text-terracotta"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* Staggered 2-col grid on mobile (uniform 2:3 crop), masonry columns from md up */}
      <div className="px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:block md:columns-3 lg:columns-4">
          {images.map((img, i) => (
            <div
              key={img.title}
              className={`break-inside-avoid md:mb-3 ${i % 2 === 1 ? "mt-8 md:mt-0" : ""}`}
            >
              <button
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-lg border border-terracotta/15 transition-all duration-300 hover:border-terracotta/50"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="aspect-[2/3] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:aspect-auto"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-sand/96 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            aria-label="Close"
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-terracotta/40 bg-sand text-2xl text-terracotta transition-colors hover:bg-terracotta hover:text-sand-soft"
            onClick={close}
          >
            ✕
          </button>
          <button
            aria-label="Previous"
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-terracotta/40 bg-white text-2xl text-terracotta transition-colors hover:bg-terracotta hover:text-white md:left-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            ‹
          </button>
          <figure className="max-h-[85vh] text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[active].src}
              alt={images[active].title}
              className="mx-auto max-h-[78vh] rounded-lg border border-terracotta/20 object-contain"
            />
          </figure>
          <button
            aria-label="Next"
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-terracotta/40 bg-white text-2xl text-terracotta transition-colors hover:bg-terracotta hover:text-white md:right-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
