import { IgIcon, InIcon, XIcon, YtIcon } from "@/components/ui/Social";
import { Reveal } from "@/components/ui/Reveal";
import { ctaBanner, footer, brand } from "@/lib/content";

export function Closing() {
  const strip = ctaBanner.marquee.repeat(6);
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg,#a67c3b 0%,#5a431a 36%,#000000 100%)" }}
    >
      {/* full-width scrolling marquee behind the CTA */}
      <div className="pointer-events-none absolute inset-x-0 top-20 overflow-hidden">
        <div className="flex w-max whitespace-nowrap font-bold leading-none text-white/10 animate-marquee">
          <span style={{ fontSize: "clamp(3rem,9vw,8rem)" }}>{strip}</span>
          <span style={{ fontSize: "clamp(3rem,9vw,8rem)" }}>{strip}</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* CTA */}
        <div className="pb-16 pt-24 text-center sm:pt-32">
          <Reveal>
            <h2
              className="mx-auto max-w-2xl font-semibold tracking-tight text-white"
              style={{ fontSize: "clamp(2rem,4.5vw,3.25rem)" }}
            >
              {ctaBanner.title[0]}
              <br />
              {ctaBanner.title[1]}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/70">{ctaBanner.subtitle}</p>
            <a href={ctaBanner.cta.href} className="btn-white mt-8 inline-block px-7 py-3.5">
              {ctaBanner.cta.label}
            </a>
          </Reveal>
        </div>

        {/* footer */}
        <div className="pb-12">
          <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt={brand.name} className="h-9 w-auto" />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">{footer.tagline}</p>
            </div>

            {footer.columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-white/65 transition-colors hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/50">{footer.copyright}</p>
            <div className="flex gap-2.5">
              {[
                { Icon: YtIcon, href: brand.youtube },
                { Icon: IgIcon, href: brand.instagram },
                { Icon: InIcon, href: brand.linkedin },
                { Icon: XIcon, href: brand.twitter },
              ]
                // only render icons with a real destination — skip unset "#"/empty links
                .filter(({ href }) => href && href !== "#")
                .map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/70 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
