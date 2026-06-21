import { Play, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Orb } from "@/components/ui/Orb";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { Testimonials } from "@/components/sections/Testimonials";
import { careerPillars, careers, type CareerKey } from "@/lib/pages";

export function CareerView({ which }: { which: CareerKey }) {
  const c = careers[which];
  return (
    <>
      <PageHero
        eyebrow={c.title}
        eyebrowClassName="!text-base !tracking-[0.2em] text-gold sm:!text-lg"
        title={c.role}
        subtitle={c.subtitle}
      >
        <a href={c.apply} className="btn-gold px-6 py-3.5">
          Join the team
        </a>
      </PageHero>

      {/* intro + apply video */}
      <section className="relative px-4 pb-8">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <VideoPlayer
              youtubeId={c.videoId}
              title="Watch before you apply"
              triggerClassName="group relative block w-full overflow-hidden rounded-2xl border border-line bg-black"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${c.videoId}/hqdefault.jpg`}
                alt="Watch before you apply"
                loading="lazy"
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-xl transition-transform duration-300 group-hover:scale-110">
                <Play size={24} className="ml-1" fill="currentColor" />
              </span>
            </VideoPlayer>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Before you apply</p>
            <h2 className="mt-3 text-2xl font-semibold">Watch this quick video</h2>
            <p className="mt-3 leading-relaxed text-muted">{c.intro}</p>
            <p className="mt-2 text-sm text-dim">
              It covers the exact step-by-step process on how to apply.
            </p>
            <a href={c.apply} className="btn-gold mt-6 inline-block px-6 py-3.5">
              Click here to join the team
            </a>
          </Reveal>
        </div>
      </section>

      {/* pillars */}
      <section className="relative px-4 py-24">
        <Orb variant="glow" size={400} className="-left-40 top-20" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHeading eyebrow="How we help you" title="Why build your career with Pollinext" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {careerPillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="card-grad h-full p-7">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl text-black"
                    style={{ background: "linear-gradient(140deg,#ecd2a0,#d8a85c)" }}
                  >
                    <Check size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
