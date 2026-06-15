import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookedCarousel } from "@/components/ui/BookedCarousel";
import { callsBooked } from "@/lib/content";

/** "Calls Being Booked Daily" — controllable proof-image carousel (from pollinext.com). */
export function CallsBooked() {
  return (
    <section id="calls-booked" className="relative py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <SectionHeading
          center
          eyebrow={callsBooked.eyebrow}
          title={callsBooked.title}
          subtitle={callsBooked.subtitle}
        />
      </div>
      <Reveal className="mt-12 px-4">
        <div className="mx-auto max-w-6xl">
          <BookedCarousel images={callsBooked.images} />
        </div>
      </Reveal>
    </section>
  );
}
