import { Reveal } from "@/components/ui/Reveal";
import { Orb } from "@/components/ui/Orb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { results } from "@/lib/content";

/**
 * "Our Recent Work" — image-only horizontal ticker (per the June 10 call): no text cards,
 * just the proof tiles with the golden glow baked into each card so the image is the focus.
 */
export function Results() {
  // duplicate so the ticker loops seamlessly (marquee-x translates -50%)
  const row = [...results.images, ...results.images];
  return (
    <section id="results" className="relative px-4 py-24">
      <Orb variant="glow" size={420} className="-right-40 top-24" />
      <Orb variant="glow" size={360} className="-left-36 bottom-24" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow={results.eyebrow} title={results.title} />
      </div>

      {/* Image-only ticker — edges fade via the mask so nothing is hard-cut. */}
      <Reveal className="group relative z-10 mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="flex w-max items-stretch gap-6 animate-marquee-slow group-hover:[animation-play-state:paused]">
          {row.map((src, i) => (
            <figure
              key={`${src}-${i}`}
              className="relative aspect-[9/16] w-[230px] shrink-0 overflow-hidden rounded-3xl border border-gold/45 bg-[#0d0d0d] sm:w-[264px]"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(216,168,92,0.25), 0 24px 70px -24px rgba(216,168,92,0.55)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Client result"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* embedded golden glow / sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 0%, rgba(216,168,92,0.18), transparent 55%), linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.35))",
                }}
              />
            </figure>
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
