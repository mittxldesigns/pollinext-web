import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SitePage } from "@/components/ui/SitePage";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Orb } from "@/components/ui/Orb";
import { Testimonials } from "@/components/sections/Testimonials";
import { aboutPage } from "@/lib/pages";
import { brand, founder } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.hero.subtitle,
  alternates: { canonical: "/aboutus" },
};

export default function AboutPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow={aboutPage.hero.eyebrow}
        title={aboutPage.hero.title}
        subtitle={aboutPage.hero.subtitle}
      >
        <a href={brand.bookingUrl} className="btn-gold px-6 py-3.5">
          Book a Call
        </a>
      </PageHero>

      {/* stats band */}
      <section className="relative px-4 pb-8">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
          {aboutPage.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="card-grad p-7 text-center">
                <p className="text-gold-gradient text-4xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* the problem */}
      <section className="relative px-4 py-24">
        <Orb variant="glow" size={380} className="-right-40 top-10" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHeading eyebrow={aboutPage.problems.eyebrow} title={aboutPage.problems.title} />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {aboutPage.problems.items.map((p, i) => (
              <Reveal key={p.tag} delay={i * 0.1}>
                <div className="card-grad h-full p-8">
                  <span className="eyebrow">{p.tag}</span>
                  <h3 className="mt-3 text-xl font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-sm text-white/85">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-relaxed text-dim">{p.close}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* why Pollinext */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow={aboutPage.why.eyebrow} title={aboutPage.why.title} />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="card h-full p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dim">
                  Without Pollinext
                </p>
                <h3 className="mt-3 text-lg font-semibold">{aboutPage.why.wrong.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{aboutPage.why.wrong.body}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-grad h-full p-8 ring-1 ring-gold/20">
                <p className="eyebrow">With Pollinext</p>
                <h3 className="mt-3 text-lg font-semibold">{aboutPage.why.right.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{aboutPage.why.right.body}</p>
              </div>
            </Reveal>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aboutPage.why.gives.map((g, i) => (
              <Reveal key={g} delay={i * 0.05}>
                <div className="card flex h-full items-start gap-3 p-5">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-black"
                    style={{ background: "linear-gradient(140deg,#ecd2a0,#d8a85c)" }}
                  >
                    <Check size={15} />
                  </span>
                  <p className="text-sm leading-snug text-white/90">{g}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* mission */}
      <section className="relative px-4 py-24">
        <Orb variant="glow" size={420} className="-left-44 top-10" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <SectionHeading eyebrow={aboutPage.mission.eyebrow} title={aboutPage.mission.title} />
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              {aboutPage.mission.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <a href={brand.bookingUrl} className="btn-gold mt-8 inline-block px-6 py-3.5">
              Book a Call
            </a>
          </div>
          <Reveal delay={0.1}>
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[32px] opacity-70 blur-2xl"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 30%, rgba(216,168,92,0.35), transparent)",
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={founder.image}
                alt={founder.name}
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/5] w-full rounded-[24px] border border-line object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonials />
    </SitePage>
  );
}
