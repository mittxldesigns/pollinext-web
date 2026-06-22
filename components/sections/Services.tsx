import type { ComponentType, ReactNode } from "react";
import { CalendarCheck, Mail, Bot, MessageSquare, Database, Sparkles } from "lucide-react";
import { IgIcon, InIcon } from "@/components/ui/Social";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/content";

function Row({
  icon: Icon,
  app,
  note,
  status,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  app: string;
  note: string;
  status?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-line bg-surface-2 px-3 py-2.5">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-black/60 text-white/70">
        <Icon size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-white/90">{app}</p>
        <p className="truncate text-[11px] text-dim">{note}</p>
      </div>
      {status && <span className="text-[10px] font-medium text-gold">{status}</span>}
    </div>
  );
}

function AppointmentsVisual() {
  return (
    <div className="space-y-2.5">
      <span
        className="grid h-11 w-11 place-items-center rounded-xl text-black"
        style={{ background: "linear-gradient(140deg,#ecd2a0,#d8a85c)" }}
      >
        <CalendarCheck size={20} />
      </span>
      <Row icon={IgIcon} app="Instagram" note="Booking a call" status="Now" />
      <Row icon={InIcon} app="LinkedIn" note="Follow-up sent" />
      <Row icon={Mail} app="Email" note="Sequence running" />
    </div>
  );
}

function InsightsVisual() {
  const bars = [34, 44, 40, 58, 72, 86];
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-dim">Show rate</span>
        <span className="text-2xl font-semibold text-white">82%</span>
      </div>
      <div className="flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md"
            style={{
              height: `${h}%`,
              background: i >= 4 ? "linear-gradient(180deg,#e6bd77,#a67c3b)" : "#242424",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DmVisual() {
  return (
    <div className="space-y-3">
      <span className="text-[11px] uppercase tracking-wider text-dim">Inbound DM</span>
      <div className="flex items-start gap-2">
        <span className="h-7 w-7 shrink-0 rounded-full bg-surface-3" />
        <p className="rounded-2xl rounded-tl-sm border border-line bg-surface-2 px-3.5 py-2 text-[13px] text-white/85">
          Is this actually a fit for me?
        </p>
      </div>
      <div className="flex justify-end">
        <p
          className="max-w-[80%] rounded-2xl rounded-tr-sm px-3.5 py-2 text-[13px] font-medium text-black"
          style={{ background: "linear-gradient(140deg,#ecd2a0,#d8a85c)" }}
        >
          100%. Let&apos;s get you booked in.
        </p>
      </div>
    </div>
  );
}

function AutomationVisual() {
  const leads = [
    { name: "Emma, coaching", msg: "Can you help me fill my calendar?", time: "09:45" },
    { name: "Liam, agency", msg: "How fast do calls start coming in?", time: "11:12" },
    { name: "Olivia, consulting", msg: "Looking to scale my high-ticket offer.", time: "12:45" },
  ];
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 space-y-2.5">
        {leads.map((l) => (
          <div key={l.name} className="rounded-xl border border-line bg-surface-2 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[12px] font-medium text-white/90">
                <span className="h-5 w-5 rounded-full" style={{ background: "linear-gradient(140deg,#ecd2a0,#a67c3b)" }} />
                {l.name}
              </span>
              <span className="text-[10px] text-dim">{l.time}</span>
            </div>
            <p className="mt-1 text-[11px] text-dim">{l.msg}</p>
          </div>
        ))}
      </div>
      <div className="hidden sm:block">
        <span className="grid h-14 w-14 place-items-center rounded-2xl text-black" style={{ background: "linear-gradient(140deg,#ecd2a0,#d8a85c)" }}>
          <Bot size={24} />
        </span>
      </div>
    </div>
  );
}

function IntegrationsVisual() {
  const icons = [IgIcon, InIcon, Mail, MessageSquare, Database, CalendarCheck];
  return (
    <div className="relative h-44">
      <span
        className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl text-black"
        style={{ background: "linear-gradient(140deg,#ecd2a0,#d8a85c)" }}
      >
        <Sparkles size={26} />
      </span>
      {icons.map((Icon, i) => {
        const angle = (i / icons.length) * Math.PI * 2;
        const r = 78;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface-2 text-white/70"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            <Icon size={18} />
          </span>
        );
      })}
    </div>
  );
}

const visuals: Record<string, () => ReactNode> = {
  appointments: AppointmentsVisual,
  insights: InsightsVisual,
  dm: DmVisual,
  automation: AutomationVisual,
  integrations: IntegrationsVisual,
};

function ServiceCard({ visual, title, body }: { visual: string; title: string; body: string }) {
  const Visual = visuals[visual];
  return (
    <Spotlight className="card-grad flex h-full flex-col overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1.5">
      <div className="flex-1">{Visual ? <Visual /> : null}</div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </Spotlight>
  );
}

export function Services() {
  const top = services.items.slice(0, 3);
  const bottom = services.items.slice(3);
  return (
    <section id="services" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={services.eyebrow} title={services.title} />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {top.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08}>
              <ServiceCard visual={s.visual} title={s.title} body={s.body} />
            </Reveal>
          ))}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {bottom.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08}>
              <ServiceCard visual={s.visual} title={s.title} body={s.body} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
