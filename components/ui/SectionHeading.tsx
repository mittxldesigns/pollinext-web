import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, center = false, className = "" }: Props) {
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className="text-gradient mt-4 font-semibold tracking-tight"
          style={{ fontSize: "clamp(2.25rem,5vw,4rem)" }}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p
            className={`mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${
              center ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
