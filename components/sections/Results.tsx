import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Orb } from "@/components/ui/Orb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { results } from "@/lib/content";

/**
 * "Our Recent Work" — fixed-size vertical (9:16) glow cards on a slow ticker.
 * Each card shows the WHOLE image uncropped (object-contain), centered, with a
 * blurred copy behind it so off-ratio images don't leave stark black bars.
 * Hovering a card pauses the row and surfaces a "Book a Call" prompt.
 * Final tiles will be supplied at 1080×1920 (9:16) and fill the card edge-to-edge.
 */
export function Results() {
  // duplicate so the ticker loops seamlessly (marquee-x translates -50%)
  const row = [...results.images, ...results.images];
  return (
    <section id="results" className="relative px-4 py-24">
      <Orb variant="glow" size={420} className="-right-40 top-24" />
      <Orb variant="glow" size={360} className="-left-36 bottom-24" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <SectionHeading
          eyebrow={results.eyebrow}
          title={results.title}
          subtitle={results.subtitle}
          center
        />
      </div>

      {/* Image ticker — edges fade via the mask so nothing is hard-cut. */}
      <Reveal className="group relative z-10 mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] motion-reduce:overflow-x-auto">
        <div className="flex w-max items-stretch gap-6 animate-marquee-slow group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {row.map((src, i) => (
            <a
              key={`${src}-${i}`}
              href={results.cta.href}
              aria-label="Book a call"
              aria-hidden={i >= results.images.length || undefined}
              tabIndex={i >= results.images.length ? -1 : undefined}
              className="group/card relative block aspect-[9/16] w-[230px] shrink-0 overflow-hidden rounded-3xl border border-gold/45 bg-[#0d0d0d] sm:w-[264px]"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(216,168,92,0.25), 0 24px 70px -24px rgba(216,168,92,0.55)",
              }}
            >
              {/* blurred fill so off-ratio images don't leave black bars */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
              />
              {/* the full image, uncropped + centered (decorative — link is labelled) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="absolute inset-0 z-10 h-full w-full object-contain p-2"
              />
              {/* embedded golden glow / sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 0%, rgba(216,168,92,0.18), transparent 55%), linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.45))",
                }}
              />
              {/* hover CTA — surfaces a book-a-call prompt */}
              <div className="absolute inset-x-0 bottom-0 z-30 flex translate-y-3 items-center justify-center p-4 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black shadow-lg">
                  Book a Call <ArrowRight size={15} />
                </span>
              </div>
            </a>
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
