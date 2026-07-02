import { Reveal } from "@/components/Reveal";

const variants = {
  one: {
    desktop: "/assets/images/las-vegas/IseeSexy_OliviaC_WEB_2.webp",
    mobile: "/assets/images/las-vegas/ISEESEXY_VictoriaWest_Jan23_WEB_27.webp",
  },
  two: {
    desktop: "/assets/images/las-vegas/ISEESEXY_VictoriaWest_Jun23_WEB_26.webp",
    mobile: "/assets/images/las-vegas/ISEESEXY_VictoriaWest_Jun23_WEB_9.webp",
  },
};

export function FeatureImage({
  variant,
  caption,
  label,
  heightClass = "h-[40vh] md:h-[55vh]",
}: {
  variant: "one" | "two";
  caption: string;
  label: string;
  heightClass?: string;
}) {
  const imgs = variants[variant];

  return (
    <section className="relative overflow-hidden bg-sand py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <figure className="relative overflow-hidden rounded-[1.5rem] border border-terracotta/20">
            <picture>
              <source media="(min-width: 768px)" srcSet={imgs.desktop} />
              <img
                src={imgs.mobile}
                alt={caption}
                loading="lazy"
                width={1536}
                height={864}
                className={`w-full object-cover ${heightClass}`}
              />
            </picture>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
