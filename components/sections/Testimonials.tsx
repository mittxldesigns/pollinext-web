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

function VideoCard({ v }: { v: Video }) {
  const id = ytId(v.href);
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={v.src}
        alt={`${v.name} — ${v.role}`}
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-xl transition-transform duration-300 group-hover:scale-110">
        <Play size={24} className="ml-1" fill="currentColor" />
      </span>
    </>
  );
  return (
    <VideoPlayer
      youtubeId={id}
      title={`${v.name} — ${v.role}`}
      triggerClassName="group relative block w-full overflow-hidden rounded-2xl border border-line bg-black"
    >
      {inner}
    </VideoPlayer>
  );
}

function Card({ t }: { t: Item }) {
  const isGold = t.tint === "gold" || t.tint === "amber";
  const base =
    "flex h-full w-[320px] shrink-0 flex-col justify-between rounded-3xl p-6 sm:w-[380px]";
  if (isGold) {
    return (
      <div
        className={base}
        style={{ background: "linear-gradient(150deg,#ecd2a0,#d8a85c 55%,#b8893a)" }}
      >
        <Quote className="text-black/40" size={26} />
        <p className="mt-5 text-lg font-medium leading-snug text-black">{t.quote}</p>
        <div className="mt-6 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-black/15 text-sm font-bold text-black">
            {initials(t.name)}
          </span>
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
      <p className="mt-5 text-lg font-medium leading-snug text-white/90">{t.quote}</p>
      <div className="mt-6 flex items-center gap-3">
        <span
          className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-black"
          style={{ background: "linear-gradient(140deg,#ecd2a0,#a67c3b)" }}
        >
          {initials(t.name)}
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-dim">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const row = [...testimonials.items, ...testimonials.items];
  return (
    <section id="testimonials" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {testimonials.videos.map((v, i) => (
            <Reveal key={v.src} delay={i * 0.08}>
              <VideoCard v={v} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="group mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max items-stretch gap-5 animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
