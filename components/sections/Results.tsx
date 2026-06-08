import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Orb } from "@/components/ui/Orb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { results } from "@/lib/content";

const tints: Record<string, string> = {
  gold: "linear-gradient(135deg,#2e2208,#d8a85c)",
  amber: "linear-gradient(135deg,#2a1a06,#d98a2b)",
  bronze: "linear-gradient(135deg,#241a0e,#9a6b2a)",
  olive: "linear-gradient(135deg,#22220c,#b59a2e)",
};

export function Results() {
  return (
    <section id="results" className="relative px-4 py-24">
      <Orb variant="glow" size={420} className="-right-40 top-24" />
      <Orb variant="glow" size={360} className="-left-36 bottom-24" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow={results.eyebrow} title={results.title} />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {results.cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <article className="card-grad flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5">
                {/* proof screenshot banner */}
                <div
                  className="relative flex h-56 items-center justify-center overflow-hidden border-b border-line p-4"
                  style={{ background: tints[c.tint] ?? tints.gold }}
                >
                  <div className="absolute inset-0 bg-black/72" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    decoding="async"
                    className="relative max-h-full w-auto max-w-full rounded-lg shadow-lg"
                  />
                  <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <span className="text-xs font-medium uppercase tracking-wider text-dim">
                    {c.category}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
                  <div className="mt-auto flex gap-10 pt-7">
                    {c.stats.map((s) => (
                      <div key={s.label}>
                        <p className="text-3xl font-semibold tracking-tight text-white">{s.value}</p>
                        <p className="mt-1 text-xs text-dim">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <a href={results.cta.href} className="btn-dark px-6 py-3.5">
            {results.cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
