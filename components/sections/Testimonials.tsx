import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialReel } from "@/components/ui/TestimonialReel";
import { testimonials } from "@/lib/content";

function initials(name: string) {
  return name.split(" ").map((s) => s[0]).join("").slice(0, 2);
}

type Item = (typeof testimonials.items)[number];

/** Quote tile for the wall — fixed height so the row is uniform; photo if provided. */
function Card({ t }: { t: Item }) {
  const isGold = t.tint === "gold" || t.tint === "amber";
  const photo = (t as { photo?: string }).photo;
  const base =
    "flex h-[230px] w-[300px] shrink-0 flex-col justify-between rounded-3xl p-6 sm:w-[360px]";
  const avatar = (light: boolean) =>
    photo ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={t.name}
        loading="lazy"
        className="h-10 w-10 rounded-full object-cover"
      />
    ) : (
      <span
        className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-black ${
          light ? "bg-black/15" : ""
        }`}
        style={light ? undefined : { background: "linear-gradient(140deg,#ecd2a0,#a67c3b)" }}
      >
        {initials(t.name)}
      </span>
    );

  if (isGold) {
    return (
      <div
        className={base}
        style={{ background: "linear-gradient(150deg,#ecd2a0,#d8a85c 55%,#b8893a)" }}
      >
        <Quote className="text-black/40" size={26} />
        <p className="mt-4 line-clamp-3 text-lg font-medium leading-snug text-black">{t.quote}</p>
        <div className="mt-5 flex items-center gap-3">
          {avatar(true)}
          <div>
            <p className="text-sm font-semibold text-black">{t.name}</p>
            <p className="text-xs text-black/60">{t.role}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`${base} card-grad`}>
      <Quote className="text-gold" size={26} />
      <p className="mt-4 line-clamp-3 text-lg font-medium leading-snug text-white/90">{t.quote}</p>
      <div className="mt-5 flex items-center gap-3">
        {avatar(false)}
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-dim">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * `show` lets the homepage split this into two doc sections — the video testimonials
 * (SECTION 4) and the quote wall (SECTION 10) — while sub-pages render both ("all").
 */
export function Testimonials({ show = "all" }: { show?: "all" | "video" | "marquee" } = {}) {
  const quoteRow = [...testimonials.items, ...testimonials.items];
  const showVideos = show === "all" || show === "video";
  const showMarquee = show === "all" || show === "marquee";
  return (
    <section
      id={show === "marquee" ? undefined : "testimonials"}
      className="relative px-4 py-24"
    >
      {showVideos && (
        <>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow={testimonials.eyebrow}
              title={testimonials.title}
              subtitle={testimonials.subtitle}
              center
            />
          </div>
          {/* sliding row of vertical testimonial reels — plays in a fullscreen lightbox */}
          <Reveal className="mt-12">
            <TestimonialReel videos={testimonials.videos} />
          </Reveal>
          {/* CTA pair below the reel (per client doc, SECTION 4) */}
          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {testimonials.ctas.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className={`${c.variant === "gold" ? "btn-gold" : "btn-dark"} px-7 py-3.5`}
              >
                {c.label}
              </a>
            ))}
          </Reveal>
        </>
      )}

      {/* Heading for the standalone global marquee (homepage SECTION 10) — only when
          the marquee is shown on its own, not when stacked under the video reel. */}
      {showMarquee && !showVideos && (
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <SectionHeading
            eyebrow={testimonials.marqueeEyebrow}
            title={testimonials.marqueeTitle}
            subtitle={testimonials.marqueeSubtitle}
            center
          />
        </div>
      )}

      {showMarquee && (
        <Reveal
          className={`group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] ${
            showVideos ? "mt-10" : ""
          }`}
        >
          <div className="flex w-max items-stretch gap-5 animate-marquee group-hover:[animation-play-state:paused]">
            {quoteRow.map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
}
