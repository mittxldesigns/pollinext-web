import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const proofs = [
  "/proof/p1.png",
  "/proof/p2.png",
  "/proof/p3.png",
  "/proof/p4.png",
  "/proof/p5.png",
];

/** "Real Results" booking / payment proof screenshots — reusable across pages. */
export function ProofGallery() {
  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Real results" title="Calls being booked daily" />
        <p className="mt-4 max-w-xl text-muted">
          Actual booking and payment confirmations from live client campaigns.
        </p>
        {/* Horizontal sliding rail of screenshots, each with a thin gold border. */}
        <div
          role="region"
          aria-label="Client booking proofs — scroll horizontally to view more"
          className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4"
        >
          {proofs.map((src, i) => (
            <Reveal
              key={src}
              delay={i * 0.06}
              className="w-[72vw] shrink-0 snap-start sm:w-[320px]"
            >
              <div
                className="flex items-center justify-center overflow-hidden rounded-2xl border border-gold/30 bg-[#0d0d0d] p-4 transition-colors duration-300 hover:border-gold/55"
                style={{ minHeight: 200 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Client booking / payment confirmation ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[260px] w-auto max-w-full rounded-lg shadow-lg"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-3 text-xs text-dim sm:hidden">Swipe to see more →</p>
      </div>
    </section>
  );
}
