import type { ReactNode } from "react";
import { Orb } from "@/components/ui/Orb";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  /** Optional override to enlarge the eyebrow (e.g. the careers "We're hiring" label). */
  eyebrowClassName?: string;
};

/** Consistent centered hero for inner pages (accounts for the fixed nav). */
export function PageHero({ eyebrow, title, subtitle, children, eyebrowClassName }: Props) {
  return (
    <section className="relative px-4 pb-12 pt-36 sm:pt-44">
      <Orb variant="glow" size={460} className="-right-44 -top-16" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <p className={`eyebrow ${eyebrowClassName ?? ""}`}>{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1
            className="text-gradient mt-4 font-semibold tracking-tight"
            style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)" }}
          >
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
