import { Quote, Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { testimonials } from "@/lib/content";

function initials(name: string) {
  return name.split(" ").map((s) => s[0]).join("").slice(0, 2);
}

/** Pull the YouTube id out of a watch / youtu.be / embed URL. */
function ytId(url: string) {
  const m =
    url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/) || url.match(/embed\/([^?]+)/);
  return m ? m[1] : "";
}

type Item = (typeof testimonials.items)[number];
type Video = (typeof testimonials.videos)[number];

/** Vertical (9:16) testimonial reel tile — plays in a portrait lightbox. */
function VideoCard({ v }: { v: Video }) {
  const id = ytId(v.href);
  return (
    <VideoPlayer
      youtubeId={id}
      title={`${v.name} — ${v.role}`}
      portrait
      triggerClassName="group relative block aspect-[9/16] w-[220px] shrink-0 overflow-hidden rounded-3xl border border-gold/40 bg-black sm:w-[250px]"
      triggerStyle={{
        boxShadow: "0 0 0 1px rgba(216,168,92,0.25), 0 24px 70px -24px rgba(216,168,92,0.5)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={v.src}
        alt={`${v.name} — ${v.role}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
      <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-xl transition-transform duration-300 group-hover:scale-110">
        <Play size={22} className="ml-1" fill="currentColor" />
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-sm font-semibold text-white">{v.name}</p>
        <p className="text-xs text-white/70">{v.role}</p>
      </figcaption>
    </VideoPlayer>
  );
}

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
  const videoRow = [...testimonials.videos, ...testimonials.videos];
  const showVideos = show === "all" || show === "video";
  const showMarquee = show === "all" || show === "marquee";
  return (
    <section
      id={show === "marquee" ? undefined : "testimonials"}
      className="relative px-4 py-24"
    >
      {showVideos && (
        <>
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />
          </div>
          {/* sliding row of vertical testimonial reels */}
          <Reveal className="group mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex w-max items-stretch gap-5 animate-marquee-slow group-hover:[animation-play-state:paused]">
              {videoRow.map((v, i) => (
                <VideoCard key={`${v.src}-${i}`} v={v} />
              ))}
            </div>
          </Reveal>
        </>
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
