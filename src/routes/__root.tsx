import { Outlet, Link, createRootRoute, useRouter } from "@tanstack/react-router";
import { PasswordGate } from "@/components/PasswordGate";
import "../styles.css";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-deep px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, oklch(0.18 0.045 255 / 0.7) 100%)",
        }}
      />
      <div className="relative z-10 max-w-lg text-center">
        <div className="gold-divider mx-auto mb-10 w-24" />
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-gold/80">Error 404</p>
        <h1 className="font-display text-8xl font-bold leading-none text-gold-gradient sm:text-9xl">404</h1>
        <h2 className="mt-4 font-display text-2xl font-medium text-cream sm:text-3xl">Page not found</h2>
        <div className="gold-divider mx-auto my-6 w-40" />
        <p className="text-sm leading-relaxed text-cream/60">
          The page you're looking for has moved, been removed, or simply never existed.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="rounded-full bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep transition-transform hover:scale-105"
          >
            Return Home
          </Link>
          <Link
            to="/"
            hash="contact"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-gold"
          >
            Book an Encounter
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="gold-divider mx-auto mt-10 w-24" />
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-6">
      <div className="max-w-md text-center">
        <div className="gold-divider mx-auto mb-8 w-24" />
        <h1 className="font-display text-2xl font-semibold text-cream">Something went wrong</h1>
        <p className="mt-3 text-sm leading-relaxed text-cream/60">
          An unexpected error occurred. You can try refreshing or return home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep transition-transform hover:scale-105"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-gold/30 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream/70 transition-colors hover:border-gold/60 hover:text-cream"
          >
            Go home
          </a>
        </div>
        <div className="gold-divider mx-auto mt-8 w-24" />
      </div>
    </div>
  );
}

function Root() {
  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <PasswordGate>
        <Outlet />
      </PasswordGate>
    </div>
  );
}

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
