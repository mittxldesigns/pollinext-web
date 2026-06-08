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
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proofs.map((src, i) => (
            <Reveal key={src} delay={i * 0.06}>
              <div
                className="card-grad flex items-center justify-center overflow-hidden p-4"
                style={{ minHeight: 200 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Client result proof"
                  loading="lazy"
                  decoding="async"
                  className="max-h-[260px] w-auto max-w-full rounded-lg shadow-lg"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
