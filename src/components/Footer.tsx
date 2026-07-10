export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-terracotta/15 bg-sand pt-10 pb-7 md:pt-12 md:pb-8">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
        <a href="#hero" className="font-display text-2xl text-terra-gradient md:text-3xl">
          Alyssa May
        </a>
        <div className="terra-divider w-40" />
        <div className="mt-2 flex flex-col items-center gap-2 text-sm text-espresso/50">
          <a href="mailto:alyssamayvip@gmail.com" className="text-terracotta hover:text-terracotta-soft">
            alyssamayvip@gmail.com
          </a>
          <p>© 2026 Alyssa May</p>
        </div>
      </div>
    </footer>
  );
}
