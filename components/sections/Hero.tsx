import { Orb } from "@/components/ui/Orb";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative px-4 pb-28 pt-36 sm:pt-44">
      {/* soft, blurred ambient glow only — the solid gold sphere was removed per spec */}
      <Orb variant="glow" size={460} speed={130} className="-left-40 top-52" />
      <Orb variant="glow" size={360} className="-right-32 top-24 hidden lg:block" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* left: copy (pill / micro-quote / author chip removed per the Delete section) */}
        <div>
          <Reveal>
            <h1
              className="font-semibold leading-[0.98] tracking-tight text-white"
              style={{ fontSize: "clamp(2.75rem,6vw,5rem)" }}
            >
              {hero.title[0]}
              <br />
              <span className="text-shimmer">{hero.title[1]}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={hero.primaryCta.href} className="btn-gold px-6 py-3.5">
                {hero.primaryCta.label}
              </a>
              <a href={hero.secondaryCta.href} className="btn-dark px-6 py-3.5">
                {hero.secondaryCta.label}
              </a>
            </div>
          </Reveal>
        </div>

        {/* right: gold-glow video */}
        <Reveal delay={0.12} className="w-full">
          <HeroVideo />
        </Reveal>
      </div>
    </section>
  );
}
