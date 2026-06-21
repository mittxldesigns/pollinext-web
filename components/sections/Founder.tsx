import { Orb } from "@/components/ui/Orb";
import { Reveal } from "@/components/ui/Reveal";
import { founder } from "@/lib/content";

export function Founder() {
  return (
    <section id="founder" className="relative px-4 py-24">
      <Orb variant="glow" size={420} className="-right-40 top-10" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1fr]">
        <Reveal>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[32px] opacity-70 blur-2xl"
              style={{ background: "radial-gradient(60% 60% at 50% 30%, rgba(216,168,92,0.35), transparent)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={founder.image}
              alt={founder.name}
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/3] w-full rounded-[24px] border border-line object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">{founder.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="text-gradient mt-4 font-semibold tracking-tight"
              style={{ fontSize: "clamp(2rem,4vw,3.25rem)" }}
            >
              {founder.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              {founder.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex gap-10">
              {founder.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-semibold tracking-tight text-white">{s.value}</p>
                  <p className="mt-1 text-xs text-dim">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <div className="flex flex-wrap gap-3">
                {founder.ctas.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className={`${c.variant === "gold" ? "btn-gold" : "btn-dark"} px-6 py-3.5`}
                  >
                    {c.label}
                  </a>
                ))}
              </div>
              <div>
                <p className="font-semibold text-white">{founder.name}</p>
                <p className="text-sm text-dim">{founder.role}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
