import { Reveal } from "@/components/Reveal";

const badges = [
  {
    type: "image" as const,
    src: "https://www.theeroticreview.com/images/reviewed_seal.gif",
    name: "The Erotic Review",
    href: "https://www.theeroticreview.com",
  },
  {
    type: "image" as const,
    src: "https://preferred411.com/a/preferredSeal-p.png",
    name: "Preferred411.com",
    href: "https://preferred411.com/admirer/register?ref=394699",
  },
  {
    type: "text" as const,
    name: "PrivateDelights",
    href: "https://privatedelights.ch/profile/victoriawest",
  },
];

export function TrustBadges({
  exclude = [],
  className = "mt-10",
}: {
  exclude?: string[];
  className?: string;
}) {
  const visible = badges.filter((b) => !exclude.includes(b.name));
  return (
    <Reveal className={className} delay={200}>
      <div className="flex flex-nowrap items-center justify-center gap-4 sm:gap-6">
        {visible.map((b) => {
          const content =
            b.type === "text" ? (
              <div className="flex flex-col items-start text-left">
                <span
                  className="mb-1 text-[0.6rem] uppercase tracking-[0.3em] text-sand-soft"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                >
                  Reviews at
                </span>
                <span
                  className="font-['Helvetica',_sans-serif] text-lg italic text-sand-soft md:text-2xl"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                >
                  {b.name}
                </span>
              </div>
            ) : (
              <img
                src={b.src}
                alt={b.name}
                loading="lazy"
                width={112}
                height={112}
                className="h-16 w-16 object-contain md:h-24 md:w-24"
              />
            );
          return (
            <div key={b.name} className="transition-transform duration-300 hover:scale-110">
              {b.href ? (
                <a href={b.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
