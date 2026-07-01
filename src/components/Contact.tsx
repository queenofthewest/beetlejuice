import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { GeoDeco } from "@/components/GeoDeco";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  date: z.string().trim().max(40).optional().or(z.literal("")),
  duration: z.string().trim().max(60).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  dateType: z.string().trim().max(60).optional().or(z.literal("")),
  verification: z.enum(["employment", "references", "id"]),
  verificationDetail: z.string().trim().min(2, "Please add verification details").max(500),
});

const inputClass =
  "w-full border border-terracotta/20 bg-adobe-deep/60 px-4 py-3 text-sm text-sand placeholder:text-sand/30 outline-none transition-colors focus:border-terracotta font-sans";
const labelClass = "mb-2 block text-[0.62rem] uppercase tracking-[0.25em] text-terracotta/70";

const verifyOptions = [
  {
    id: "employment",
    label: "Employment + Photo ID",
    placeholder: "LinkedIn URL — have a selfie with photo ID ready",
  },
  {
    id: "references",
    label: "References",
    placeholder: "Two established — name, email, website, approximate date",
  },
  {
    id: "id",
    label: "Government ID",
    placeholder: "Two forms of photo ID",
  },
] as const;

export function Contact() {
  const [verification, setVerification] = useState<(typeof verifyOptions)[number]["id"]>("employment");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse({ ...data, verification });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please review the highlighted fields.");
      return;
    }
    setErrors({});
    form.reset();
    setVerification("employment");
    toast.success("Inquiry received — I'll respond within 48 hours.");
  };

  const activeVerify = verifyOptions.find((r) => r.id === verification)!;

  return (
    <section id="contact" className="relative overflow-hidden bg-adobe-deep py-24 md:py-32">
      {/* Subtle background geo */}
      <GeoDeco variant="rays" className="pointer-events-none absolute left-0 top-0 -translate-x-1/2 -translate-y-1/4 opacity-5" />

      <div className="relative z-10 mx-auto max-w-6xl px-8">
        <Reveal className="mb-16">
          <p className="mb-3 text-[0.65rem] uppercase tracking-[0.4em] text-terracotta/80">Start Here</p>
          <h2 className="font-display text-4xl font-light text-sand md:text-5xl">Booking Inquiry</h2>
          <div className="mt-5 h-px w-24 bg-gradient-to-r from-terracotta to-transparent" />
          <p className="mt-6 max-w-lg font-serif text-sm italic leading-relaxed text-sand/50">
            Share a few details and I'll respond personally within 48 hours. Screening is required for all new connections. Any information shared here is private and secure.
          </p>
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} noValidate className="border border-terracotta/20 bg-adobe/30 p-6 md:p-10">
            <div className="grid gap-10 lg:grid-cols-3">
              {/* Personal */}
              <fieldset className="space-y-5">
                <legend className="mb-5 font-display text-lg font-light text-terracotta/90">About You</legend>
                <div>
                  <label className={labelClass} htmlFor="name">Name</label>
                  <input id="name" name="name" className={inputClass} placeholder="Your name" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">Email</label>
                  <input id="email" name="email" className={inputClass} placeholder="you@email.com" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" className={inputClass} placeholder="Optional" />
                </div>
              </fieldset>

              {/* Date Details */}
              <fieldset className="space-y-5">
                <legend className="mb-5 font-display text-lg font-light text-terracotta/90">Our Date</legend>
                <div>
                  <label className={labelClass} htmlFor="date">When</label>
                  <input id="date" name="date" type="date" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="duration">Duration</label>
                  <select id="duration" name="duration" className={inputClass} defaultValue="">
                    <option value="" disabled>Select…</option>
                    <option value="1hour">1 Hour</option>
                    <option value="90min">90 Minutes</option>
                    <option value="2hours">2 Hours</option>
                    <option value="3hours">3 Hours</option>
                    <option value="dinner">Dinner Event (4 hrs)</option>
                    <option value="evening">Evening (6 hrs)</option>
                    <option value="overnight">Full-Day (12 hrs)</option>
                    <option value="fullday">Travel (24 hrs)</option>
                    <option value="weekend">Extended (48 hrs)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="location">Location</label>
                  <select id="location" name="location" className={inputClass} defaultValue="">
                    <option value="" disabled>Select…</option>
                    <option value="scottsdale-incall">Scottsdale — Studio</option>
                    <option value="scottsdale-outcall">Scottsdale — Business</option>
                    <option value="phoenix-outcall">Phoenix — On Location</option>
                    <option value="sedona">Sedona</option>
                    <option value="flytome">Travel</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="dateType">Type</label>
                  <select id="dateType" name="dateType" className={inputClass} defaultValue="">
                    <option value="" disabled>Select…</option>
                    <option value="private">Private Session</option>
                    <option value="social">Private Event</option>
                    <option value="event">Event Hosting</option>
                    <option value="travel">Travel</option>
                    <option value="couple">Consulting</option>
                  </select>
                </div>
              </fieldset>

              {/* Verification */}
              <fieldset className="space-y-5">
                <legend className="mb-5 font-display text-lg font-light text-terracotta/90">Verification</legend>
                <div>
                  <span className={labelClass}>Choose One</span>
                  <div className="space-y-2">
                    {verifyOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors ${
                          verification === opt.id
                            ? "border-terracotta bg-terracotta/10 text-sand"
                            : "border-terracotta/15 text-sand/50 hover:border-terracotta/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="verificationType"
                          checked={verification === opt.id}
                          onChange={() => setVerification(opt.id)}
                          className="accent-terracotta"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="verificationDetail">
                    {activeVerify.label}
                  </label>
                  <textarea
                    id="verificationDetail"
                    name="verificationDetail"
                    rows={4}
                    className={inputClass}
                    placeholder={activeVerify.placeholder}
                  />
                  {errors.verificationDetail && (
                    <p className="mt-1 text-xs text-destructive">{errors.verificationDetail}</p>
                  )}
                </div>
              </fieldset>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4">
              <button
                type="submit"
                className="border border-terracotta bg-terracotta px-12 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-sand transition-all duration-300 hover:bg-transparent hover:text-terracotta"
              >
                Send Inquiry
              </button>
              <p className="text-sm text-sand/40">
                Or email directly:{" "}
                <a href="mailto:hello@victoriawesst.com" className="text-terracotta/70 hover:text-terracotta transition-colors">
                  hello@victoriawest.com
                </a>
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
