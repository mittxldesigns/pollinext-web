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

type Case = (typeof results.cases)[number];

function CaseCard({ c }: { c: Case }) {
  return (
    <article className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-3xl border border-gold/30 bg-[#0d0d0d] transition-colors duration-300 hover:border-gold/55 sm:w-[370px]">
      {/* proof screenshot banner */}
      <div
        className="relative flex h-52 items-center justify-center overflow-hidden border-b border-gold/25 p-4"
        style={{ background: tints[c.tint] ?? tints.gold }}
      >
        <div className="absolute inset-0 bg-black/72" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.image}
          alt={`${c.category} client result`}
          loading="lazy"
          decoding="async"
          className="relative max-h-full w-auto max-w-full rounded-lg shadow-lg"
        />
        <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <span className="text-xs font-medium uppercase tracking-wider text-dim">{c.category}</span>
        <h3 className="mt-3 text-lg font-semibold leading-snug">{c.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
        <div className="mt-auto flex gap-8 pt-7">
          {c.stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-semibold tracking-tight text-white">{s.value}</p>
              <p className="mt-1 text-xs text-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function Results() {
  // duplicate the cases so the ticker loops seamlessly (marquee-x translates -50%)
  const row = [...results.cases, ...results.cases];
  return (
    <section id="results" className="relative px-4 py-24">
      <Orb variant="glow" size={420} className="-right-40 top-24" />
      <Orb variant="glow" size={360} className="-left-36 bottom-24" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow={results.eyebrow} title={results.title} />
      </div>

      {/* Auto-scrolling ticker — edges fade out via the mask so nothing is hard-cut. */}
      <Reveal className="group relative z-10 mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="flex w-max items-stretch gap-5 animate-marquee-slow group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <CaseCard key={`${c.title}-${i}`} c={c} />
          ))}
        </div>
      </Reveal>

      <div className="relative z-10 mx-auto mt-12 flex max-w-6xl justify-center">
        <a href={results.cta.href} className="btn-dark px-6 py-3.5">
          {results.cta.label}
        </a>
      </div>
    </section>
  );
}
