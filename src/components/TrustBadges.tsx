import { Reveal } from "@/components/Reveal";

const terBadge = "/assets/ter-badge.webp";
const trystBadge = "/assets/tryst-badge.webp";

const badges = [
  { src: terBadge, name: "The Erotic Review" },
  {
    src: "https://preferred411.com/a/preferredSeal-p.png",
    name: "Preferred411.com",
    href: "https://preferred411.com/admirer/register?ref=394699",
  },
  { src: trystBadge, name: "Tryst" },
];

export function TrustBadges() {
  return (
    <Reveal className="mt-10" delay={200}>
      <div className="flex flex-nowrap items-center justify-center gap-4 sm:gap-6">
        {badges.map((b) => {
          const img = (
            <img
              src={b.src}
              alt={b.name}
              loading="lazy"
              width={112}
              height={112}
              className="h-16 w-16 object-contain sm:h-20 sm:w-20 md:h-24 md:w-24"
            />
          );
          return (
            <div key={b.name} className="transition-transform duration-300 hover:scale-110">
              {b.href ? (
                <a href={b.href} target="_blank" rel="noopener noreferrer">
                  {img}
                </a>
              ) : (
                img
              )}
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
