import { Reveal } from "@/components/Reveal";

const about = "/assets/images/las-vegas/ISEESEXY_VictoriaWest_Jun23_WEB_9_v3.webp";

export function About() {
  return (
    <section id="about" className="relative top-10 mb-8 overflow-visible bg-sand-deep py-12 md:top-16 md:mb-16 md:py-16">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 md:grid-cols-[60%_40%]">
        <Reveal>
          <div className="relative mx-auto w-full">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.5rem] border border-terracotta/30" />
            <img
              src={about}
              alt="Portrait of Alyssa May"
              loading="lazy"
              width={800}
              height={1000}
              className="relative w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-4 md:mx-0 md:pl-6">
            <h2 className="font-display text-3xl text-espresso md:text-4xl lg:text-5xl">
              Hey there, <span className="text-terra-gradient italic">Handsome.</span>
            </h2>
            <div className="terra-divider mt-6 w-24" />
            <div className="mt-6 space-y-4 font-serif text-base leading-relaxed text-espresso/65 md:mt-8 md:space-y-4 md:text-base lg:text-lg lg:leading-relaxed">
              <p>
                It's lovely to meet you. My name is Alyssa and I am a Southern California transplant in the beautiful desert of Arizona I now call my home. Let me tell you a little bit about myself.
              </p>
              <p>
                I'm a private person — I keep my circle small, my volume low, and my life filled with doing things I enjoy. I'm an entrepreneur, always building something new and chasing the next idea that catches my interest. I'm rarely still for long. The world is my playground and traveling is how I fill my cup. My favorite dates are the ones where we try something new together — light-hearted, a little unexpected, the kind that turns into a good story later.
              </p>
              <p>
                I'm warm, easygoing, and I show up as myself. If what I've described sounds like your kind of energy, I'd love to hear from you.
              </p>
            </div>
            <p className="mt-6 font-display text-2xl italic text-terracotta md:mt-8 md:text-3xl">~ Alyssa</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
