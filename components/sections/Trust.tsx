import { trust } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Trust() {
  return (
    <section id="trust" className="relative px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-dim">
            {trust.heading}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:flex-nowrap sm:justify-between sm:gap-x-6">
            {trust.press.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className={`h-6 w-auto shrink-0 opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-7 ${
                  logo.invert ? "press-logo" : ""
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
