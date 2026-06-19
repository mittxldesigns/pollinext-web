import { Orb } from "@/components/ui/Orb";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problems } from "@/lib/content";

/** Problem-agitation cards — one per audience sector. */
export function Problems() {
  return (
    <section id="problems" className="relative px-4 py-24">
      <Orb variant="glow" size={420} className="-left-40 top-24 hidden lg:block" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionHeading eyebrow={problems.eyebrow} title={problems.title} />
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {problems.cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.07}>
              <Spotlight className="card-grad flex h-full flex-col p-7 transition-transform duration-300 hover:-translate-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                  {c.label}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.desc}</p>

                <ul className="mt-5 space-y-2.5">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-white/80">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {p}
                    </li>
                  ))}
                </ul>

                <p className="mt-auto border-t border-line pt-4 text-[13px] italic leading-relaxed text-dim">
                  {c.footer}
                </p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
