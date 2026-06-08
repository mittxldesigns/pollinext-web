"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Orb } from "@/components/ui/Orb";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricing } from "@/lib/content";

function SphereIcon({ variant }: { variant: string }) {
  if (variant === "double") {
    return (
      <div className="relative h-14 w-16">
        <span className="sphere absolute left-0 top-1 h-11 w-11" />
        <span className="sphere absolute left-7 top-5 h-8 w-8" />
      </div>
    );
  }
  if (variant === "molecule") {
    return (
      <div className="relative h-14 w-16">
        <span className="sphere absolute left-3 top-0 h-7 w-7" />
        <span className="sphere absolute left-0 top-6 h-8 w-8" />
        <span className="sphere absolute left-8 top-6 h-9 w-9" />
      </div>
    );
  }
  return <span className="sphere block h-14 w-14" />;
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative px-4 py-24">
      <Orb variant="glow" size={520} speed={70} className="-right-52 top-10 hidden lg:block" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} />

        <Reveal delay={0.1}>
          <div className="mt-9 flex items-center gap-4">
            <div className="inline-flex rounded-xl border border-line bg-surface p-1">
              {(["monthly", "yearly"] as const).map((m) => {
                const active = (m === "yearly") === yearly;
                return (
                  <button
                    key={m}
                    onClick={() => setYearly(m === "yearly")}
                    className={`rounded-lg px-5 py-2 text-sm font-medium capitalize transition-colors ${
                      active ? "gold-soft text-white" : "text-muted hover:text-white"
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
            {yearly && (
              <span className="text-sm font-medium text-gold">Save up to 20% billed yearly</span>
            )}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricing.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <Spotlight
                className={`relative flex h-full flex-col rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5 ${
                  tier.popular
                    ? "border border-gold/40 bg-surface"
                    : "card-grad"
                }`}
              >
                {tier.popular && (
                  <span className="absolute right-6 top-6 rounded-full border border-line bg-surface-3 px-3 py-1 text-xs font-medium text-white">
                    Most Popular
                  </span>
                )}

                <SphereIcon variant={tier.icon} />

                <h3 className="mt-6 text-lg font-semibold uppercase tracking-wide">{tier.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{tier.desc}</p>

                <div className="my-6 h-px bg-line" />

                <p className="text-5xl font-semibold tracking-tight">{tier.price}</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-dim">{tier.kicker}</p>

                <a
                  href={tier.cta.href}
                  className={`mt-6 block py-3.5 text-center ${
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
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-dim">{pricing.note}</p>
      </div>
    </section>
  );
}
