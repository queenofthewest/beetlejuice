import { useState, type FormEvent, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { TrustBadges } from "@/components/TrustBadges";

const SITE_PASSWORD = "partylikeits1999";
const STORAGE_KEY = "vw_site_unlocked";
const textShadowSmall = "0 1px 4px rgba(0,0,0,0.7)";
const textShadowLarge = "0 2px 6px rgba(0,0,0,0.55)";

// TODO: swap for the real profile photo when it's ready — just drop a src here.
function PlaceholderAvatar() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Profile photo placeholder">
      <circle cx="100" cy="100" r="100" fill="oklch(0.87 0.035 72)" />
      <circle cx="100" cy="86" r="42" fill="oklch(0.80 0.07 60)" />
      <path
        d="M58 92 C56 48 78 26 100 26 C122 26 144 48 142 92 C142 74 128 78 122 62 C110 78 90 78 78 62 C72 78 58 74 58 92 Z"
        fill="oklch(0.78 0.11 85)"
      />
      <path
        d="M20 200 C20 148 54 138 100 138 C146 138 180 148 180 200 Z"
        fill="oklch(0.60 0.14 38)"
      />
    </svg>
  );
}

function isUnlocked() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-16">
      <div className="relative z-10 w-full max-w-sm text-center">
        <Reveal>
          <div className="badge-ring mx-auto h-28 w-28 overflow-hidden rounded-full ring-4 ring-terracotta/25 md:h-36 md:w-36">
            <PlaceholderAvatar />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p
            className="mt-8 text-xs uppercase tracking-[0.35em] text-sand-soft"
            style={{ textShadow: textShadowSmall }}
          >
            Luxury Traveling Companion
          </p>
          <h1
            className="mt-5 font-display text-4xl leading-[1.02] tracking-tight text-sand-soft"
            style={{ textShadow: textShadowLarge }}
          >
            Alyssa May
          </h1>
          <div className="terra-divider mx-auto mt-6 w-16" />
          <p className="mt-6 text-sm leading-relaxed text-sand-soft/80">
            Thank you so much for stopping by. Please email{" "}
            <a
              href="mailto:alyssamayvip@gmail.com"
              className="text-terracotta-soft underline decoration-terracotta-soft/40 underline-offset-4 hover:decoration-terracotta-soft"
            >
              alyssamayvip@gmail.com
            </a>{" "}
            to get the password for this website.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <form onSubmit={onSubmit} className="mt-8">
            <label htmlFor="site-password" className="sr-only">
              Password
            </label>
            <input
              id="site-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter password"
              autoComplete="off"
              className="w-full rounded-lg border border-terracotta/25 bg-sand-soft/90 px-4 py-3 text-center text-sm text-espresso placeholder:text-espresso/35 outline-none transition-colors focus:border-terracotta"
            />
            {error && (
              <p className="mt-3 text-xs text-destructive">
                That password isn't quite right — please double-check your email.
              </p>
            )}
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-terracotta px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-sand-soft transition-transform hover:scale-105"
            >
              Enter
            </button>
          </form>
        </Reveal>

        <TrustBadges exclude={["PrivateDelights"]} className="mt-12" />
      </div>
    </div>
  );
}
