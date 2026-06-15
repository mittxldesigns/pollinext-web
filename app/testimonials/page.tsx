import type { Metadata } from "next";
import { SitePage } from "@/components/ui/SitePage";
import { PageHero } from "@/components/ui/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { ProofGallery } from "@/components/sections/ProofGallery";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Real results from coaches, consultants and founders who scaled with Pollinext — booked calls, closed deals and $1M+ in client sales.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Testimonials"
        title="What our clients say"
        subtitle="Founders, coaches and consultants on what changed when Pollinext took over their pipeline."
      >
        <a href={brand.bookingUrl} className="btn-gold px-6 py-3.5">
          Book a Call
        </a>
      </PageHero>

      <CaseStudies />
      <Testimonials />
      <ProofGallery />
    </SitePage>
  );
}
