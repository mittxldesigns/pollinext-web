import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SitePage } from "@/components/ui/SitePage";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ProofGallery } from "@/components/sections/ProofGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { servicesPage } from "@/lib/pages";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: servicesPage.hero.subtitle,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow={servicesPage.hero.eyebrow}
        title={
          <>
            {servicesPage.hero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </>
        }
        subtitle={servicesPage.hero.subtitle}
      >
        <a href={brand.bookingUrl} className="btn-gold px-6 py-3.5">
          Book a Call
        </a>
      </PageHero>

      <section className="relative px-4 py-16">
        <div className="mx-auto max-w-6xl space-y-5">
          {servicesPage.services.map((svc, i) => (
            <Reveal key={svc.key} delay={(i % 2) * 0.05}>
              <div className="card-grad p-8 sm:p-10">
                <div className="grid gap-10 lg:grid-cols-2">
                  <div>
                    <p className="eyebrow">{`Service 0${i + 1}`}</p>
                    <h2 className="text-gradient mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {svc.name}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-gold">{svc.tag}</p>
                    <p className="mt-5 leading-relaxed text-muted">{svc.whatWeDo}</p>
                    <div className="mt-7">
                      <p className="text-sm font-semibold text-white">What you get</p>
                      <ul className="mt-3 space-y-2.5">
                        {svc.whatYouGet.map((y) => (
                          <li key={y} className="flex items-start gap-3 text-sm text-white/85">
                            <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                            {y}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">What&apos;s included</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {svc.included.map((inc) => (
                        <div key={inc.title} className="card h-full p-4">
                          <p className="flex items-start gap-2 text-sm font-semibold text-white">
                            <Check size={14} className="mt-0.5 shrink-0 text-gold" />
                            {inc.title}
                          </p>
                          {inc.body && (
                            <p className="mt-1.5 text-sm leading-relaxed text-dim">{inc.body}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ProofGallery />
      <Testimonials />
    </SitePage>
  );
}
