import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SitePage } from "@/components/ui/SitePage";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Orb } from "@/components/ui/Orb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProofGallery } from "@/components/sections/ProofGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { servicesPage, howItWorksPage } from "@/lib/pages";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: servicesPage.hero.subtitle,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow={servicesPage.hero.eyebrow}
        title={
          <>
            {servicesPage.hero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </>
        }
        subtitle={servicesPage.hero.subtitle}
      >
        <a href={brand.bookingUrl} className="btn-gold px-6 py-3.5">
          Book a Call
        </a>
      </PageHero>

      <section className="relative px-4 py-16">
        <div className="mx-auto max-w-6xl space-y-5">
          {servicesPage.services.map((svc, i) => (
            <Reveal key={svc.key} delay={(i % 2) * 0.05}>
              <div className="card-grad p-8 sm:p-10">
                <div className="grid gap-10 lg:grid-cols-2">
                  <div>
                    <p className="eyebrow">{`Service 0${i + 1}`}</p>
                    <h2 className="text-gradient mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {svc.name}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-gold">{svc.tag}</p>
                    <p className="mt-5 leading-relaxed text-muted">{svc.whatWeDo}</p>
                    <div className="mt-7">
                      <p className="text-sm font-semibold text-white">What you get</p>
                      <ul className="mt-3 space-y-2.5">
                        {svc.whatYouGet.map((y) => (
                          <li key={y} className="flex items-start gap-3 text-sm text-white/85">
                            <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                            {y}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">What&apos;s included</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {svc.included.map((inc) => (
                        <div key={inc.title} className="card h-full p-4">
                          <p className="flex items-start gap-2 text-sm font-semibold text-white">
                            <Check size={14} className="mt-0.5 shrink-0 text-gold" />
                            {inc.title}
                          </p>
                          {inc.body && (
                            <p className="mt-1.5 text-sm leading-relaxed text-dim">{inc.body}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* CTA below the services list (per client doc, book-a-call under section 4) */}
          <Reveal className="flex justify-center pt-4">
            <a href={brand.bookingUrl} className="btn-gold px-8 py-3.5">
              Book a Call
            </a>
          </Reveal>
        </div>
      </section>

      {/* How it works, merged in from the former standalone /how-it-works page */}
      <section className="relative px-4 py-16">
        <Orb variant="glow" size={420} className="-left-44 top-32" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <SectionHeading
            eyebrow={howItWorksPage.hero.eyebrow}
            title={howItWorksPage.hero.title}
          />
          <p className="mt-4 max-w-2xl text-muted">{howItWorksPage.hero.subtitle}</p>

          <div className="mt-12 space-y-5">
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
                    <h3 className="text-xl font-semibold sm:text-2xl">{s.title}</h3>
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
                      <span className="font-semibold text-gold">Outcome, </span>
                      {s.outcome}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProofGallery />
      <Testimonials />
    </SitePage>
  );
}
