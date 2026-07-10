import { Reveal } from "@/components/Reveal";

const stats = [
  { label: "Age", value: "37" },
  { label: "Height", value: "5'7\"" },
  { label: "Measurements", value: "28\" Waist 38\" Hips" },
  { label: "Bust", value: "34B Natural" },
  { label: "Shoe", value: "US 7.5" },
  { label: "Eyes", value: "Blue" },
  { label: "Hair", value: "Blonde / Brown" },
  { label: "Style", value: "70s Retro Glam" },
  { label: "Beverage", value: "Sparkling Water" },
  { label: "Cuisine", value: "Japanese / Mexican" },
  { label: "Color", value: "Red" },
  { label: "Flower", value: "Sunflowers" },
  { label: "Scents", value: "Rose, Ylang Ylang, Palo Santo" },
  { label: "Brands", value: "Honey Birdette, Classic Rock Couture" },
];

export function Profile() {
  return (
    <section id="profile" className="relative overflow-hidden bg-sand-deep py-12 md:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 md:grid-cols-[40%_60%]">

        {/* Stat list — first on mobile, first on desktop */}
        <Reveal className="order-1 md:order-1">
          <div className="md:pr-6">
            <h2 className="font-display text-4xl text-espresso md:text-5xl">Statistics</h2>
            <div className="terra-divider mt-6 w-24" />

            <ul className="mt-10 space-y-0">
              {stats.map((s) => (
                <li
                  key={s.label}
                  className="flex items-baseline justify-between border-b border-espresso/10 py-3"
                >
                  <span className="text-xs uppercase tracking-[0.15em] text-terracotta/80">
                    {s.label}
                  </span>
                  <span className="font-serif text-base text-espresso/80">
                    {s.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Image — second on mobile, second on desktop */}
        <Reveal delay={120} className="order-2 md:order-2">
          <div className="relative mx-auto w-full">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.5rem] border border-terracotta/30" />
            <img
              src="/assets/images/las-vegas/ISEESEXY_VictoriaWest_Jun23_WEB_16_v2.webp"
              alt="Alyssa May"
              loading="lazy"
              width={800}
              height={1000}
              className="relative w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </Reveal>

      </div>
    </section>
  );
}
