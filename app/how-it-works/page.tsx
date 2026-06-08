import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SitePage } from "@/components/ui/SitePage";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Orb } from "@/components/ui/Orb";
import { ProofGallery } from "@/components/sections/ProofGallery";
import { howItWorksPage } from "@/lib/pages";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "How it Works",
  description: howItWorksPage.hero.subtitle,
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow={howItWorksPage.hero.eyebrow}
        title={howItWorksPage.hero.title}
        subtitle={howItWorksPage.hero.subtitle}
      >
        <a href={brand.bookingUrl} className="btn-gold px-6 py-3.5">
          Book a Call
        </a>
      </PageHero>

      <section className="relative px-4 py-16">
        <Orb variant="glow" size={420} className="-left-44 top-32" />
        <div className="relative z-10 mx-auto max-w-5xl space-y-5">
          {howItWorksPage.steps.map((s, i) => (
            <Reveal key={s.n} delay={(i % 2) * 0.05}>
              <div className="card-grad p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-bold text-black"
                    style={{ background: "linear-gradient(140deg,#ecd2a0,#d8a85c)" }}
                  >
                    {s.n}
                  </span>
                  <h2 className="text-xl font-semibold sm:text-2xl">{s.title}</h2>
                  <span className="ml-auto rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-muted">
                    {s.timeline}
                  </span>
                </div>
                <p className="mt-4 leading-relaxed text-muted">{s.intro}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {s.points.map((pt) => (
                    <div key={pt.label} className="rounded-2xl border border-line bg-black/30 p-4">
                      <p className="flex items-start gap-2 text-sm font-semibold text-white">
                        <Check size={15} className="mt-0.5 shrink-0 text-gold" />
                        {pt.label}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-dim">{pt.body}</p>
                    </div>
                  ))}
                </div>
                <div className="gold-soft mt-6 rounded-2xl p-4">
                  <p className="text-sm leading-relaxed text-white/90">
                    <span className="font-semibold text-gold">Outcome — </span>
                    {s.outcome}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ProofGallery />
    </SitePage>
  );
}
