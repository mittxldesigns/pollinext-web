import type { Metadata } from "next";
import { SitePage } from "@/components/ui/SitePage";
import { PageHero } from "@/components/ui/PageHero";
import { Contact } from "@/components/sections/Contact";
import { contactPage } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.subtitle,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        subtitle={contactPage.subtitle}
      />
      <Contact showHeading={false} />
    </SitePage>
  );
}
