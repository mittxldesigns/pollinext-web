import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const proofs = [
  "/proof/p1.png",
  "/proof/p2.png",
  "/proof/p3.png",
  "/proof/p4.png",
  "/proof/p5.png",
];

/** "Real Results" booking / payment proof screenshots — an auto-scrolling ticker. */
export function ProofGallery() {
  // duplicate so the ticker loops seamlessly (marquee-x translates -50%)
  const row = [...proofs, ...proofs];
  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Real results" title="Calls being booked daily" />
        <p className="mt-4 max-w-xl text-muted">
          Actual booking and payment confirmations from live client campaigns.
        </p>
      </div>

      {/* Auto-scrolling ticker of screenshots, each with a thin gold border; edges fade via mask. */}
      <Reveal className="group mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="flex w-max items-stretch gap-5 animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="flex w-[240px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gold/30 bg-[#0d0d0d] p-4 transition-colors duration-300 hover:border-gold/55 sm:w-[300px]"
              style={{ minHeight: 200 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Client booking / payment confirmation ${(i % proofs.length) + 1}`}
                loading="lazy"
                decoding="async"
                className="max-h-[260px] w-auto max-w-full rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
