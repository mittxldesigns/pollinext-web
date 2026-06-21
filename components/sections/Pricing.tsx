import { Check, Rocket, TrendingUp, Building2, type LucideIcon } from "lucide-react";
import { Orb } from "@/components/ui/Orb";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricing } from "@/lib/content";

// Relevant per-tier icons (replace the old gold-sphere "balls" per client doc).
const TIER_ICON: Record<string, LucideIcon> = {
  single: Rocket,
  double: TrendingUp,
  molecule: Building2,
};

export function Pricing() {
  return (
    <section id="pricing" className="relative px-4 py-24">
      <Orb variant="glow" size={520} speed={70} className="-right-52 top-10 hidden lg:block" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricing.tiers.map((tier, i) => {
            const Icon = TIER_ICON[tier.icon] ?? Rocket;
            return (
              <Reveal key={tier.name} delay={i * 0.08}>
                <Spotlight
                  className={`relative flex h-full flex-col rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5 ${
                    tier.popular ? "border border-gold/40 bg-surface" : "card-grad"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute right-6 top-6 rounded-full border border-line bg-surface-3 px-3 py-1 text-xs font-medium text-white">
                      Most Popular
                    </span>
                  )}

                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-surface text-gold">
                    <Icon size={26} />
                  </span>

                  <h3 className="mt-6 text-lg font-semibold uppercase tracking-wide">{tier.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{tier.desc}</p>

                  <div className="my-6 h-px bg-line" />

                  <a
                    href={tier.cta.href}
                    className={`block py-3.5 text-center ${
                      tier.cta.style === "white" ? "btn-white" : "btn-dark"
                    }`}
                  >
                    {tier.cta.label}
                  </a>

                  <div className="my-6 h-px bg-line" />

                  <ul className="space-y-3.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check size={18} className="mt-0.5 shrink-0 text-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-dim">{pricing.note}</p>
      </div>
    </section>
  );
}
