import { Check } from "lucide-react";
import { Orb } from "@/components/ui/Orb";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whoWeHelp } from "@/lib/content";

/** "Who We Help & What We Do" — three core services (carried from pollinext.com). */
export function WhoWeHelp() {
  return (
    <section id="who-we-help" className="relative px-4 py-24">
      <Orb variant="glow" size={420} className="-left-40 top-24 hidden lg:block" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            center
            eyebrow={whoWeHelp.eyebrow}
            title={whoWeHelp.title}
            subtitle={whoWeHelp.subtitle}
          />
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {whoWeHelp.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <Spotlight className="card-grad flex h-full flex-col p-7 transition-transform duration-300 hover:-translate-y-1.5">
                <h3 className="text-xl font-semibold tracking-tight text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
                <div className="my-6 h-px bg-line" />
                <ul className="mt-auto space-y-3">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-white/85">
                      <Check size={18} className="mt-0.5 shrink-0 text-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
