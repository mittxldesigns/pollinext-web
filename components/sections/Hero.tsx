import { Orb } from "@/components/ui/Orb";
import { HeroOrb } from "@/components/ui/HeroOrb";
import { Reveal } from "@/components/ui/Reveal";
import { LottieMark } from "@/components/ui/LottieMark";
import { hero } from "@/lib/content";

const initials = hero.microAuthor.name
  .split(" ")
  .map((s) => s[0])
  .join("")
  .slice(0, 2);

export function Hero() {
  return (
    <section className="relative px-4 pb-28 pt-40 sm:pt-52">
      <HeroOrb size={560} className="-right-48 -top-40 hidden md:block" />
      <Orb variant="glow" size={460} speed={130} className="-left-40 top-52" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 py-1 pl-1 pr-3.5 text-xs font-medium text-muted backdrop-blur">
            <LottieMark size={22} />
            Booking qualified calls live
          </span>
        </Reveal>

        <Reveal>
          <p className="text-lg font-medium italic text-white/90">
            &ldquo;{hero.microQuote}&rdquo;
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-3 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-1.5 pr-4">
            <span
              className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold text-black"
              style={{ background: "linear-gradient(140deg,#ecd2a0,#d8a85c)" }}
            >
              {initials}
            </span>
            <span className="text-sm text-muted">
              <span className="text-white">{hero.microAuthor.name}</span> · {hero.microAuthor.role}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="mt-10 max-w-4xl font-semibold leading-[0.98] tracking-tight text-white"
            style={{ fontSize: "clamp(3rem,8vw,6rem)" }}
          >
            {hero.title[0]}
            <br />
            <span className="text-shimmer">{hero.title[1]}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-11 flex flex-wrap items-center gap-3">
            <a href={hero.primaryCta.href} className="btn-gold px-6 py-3.5">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn-dark px-6 py-3.5">
              {hero.secondaryCta.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
