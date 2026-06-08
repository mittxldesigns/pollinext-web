import { Reveal } from "@/components/ui/Reveal";
import { homeStats } from "@/lib/content";

/** Homepage stats band — sits just under the hero (replaces the old press band). */
export function Stats() {
  return (
    <section id="stats" className="relative px-4 py-10">
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
        {homeStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="card-grad p-7 text-center">
              <p className="text-gold-gradient text-4xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
