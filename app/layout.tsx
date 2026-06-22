import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Grain } from "@/components/ui/Grain";
import { brand, siteUrl, faqs, services, founder } from "@/lib/content";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const title = "Pollinext, Fill Your Calendar. Close More Deals.";
const description =
  "Done-for-you appointment setting, DM closing, and AI sales systems that fill your calendar with qualified buyers, so coaches, consultants and service providers stay focused on closing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · Pollinext" },
  description,
  applicationName: "Pollinext",
  keywords: [
    "appointment setting",
    "DM closing",
    "AI sales systems",
    "sales outsourcing",
    "appointment setters for coaches",
    "high-ticket sales",
    "done-for-you sales team",
    "Instagram DM closing",
    "LinkedIn outreach",
    "cold outreach agency",
    "lead generation for consultants",
    "Pollinext",
  ],
  authors: [{ name: "Pollinext", url: siteUrl }],
  creator: "Pollinext",
  publisher: "Pollinext",
  category: "business",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Pollinext",
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Pollinext, Fill Your Calendar. Close More Deals.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "Pollinext",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      image: `${siteUrl}/og.png`,
      description,
      email: brand.email,
      slogan: "Fill Your Calendar. Close More Deals.",
      areaServed: "Worldwide",
      serviceType: [
        "Appointment Setting",
        "DM Closing",
        "AI Sales Systems",
        "Sales Outsourcing",
      ],
      sameAs: [brand.instagram, brand.linkedin, brand.twitter, brand.youtube].filter(
        (s) => s && s !== "#"
      ),
      founder: { "@type": "Person", name: founder.name, jobTitle: "Founder" },
      makesOffer: services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.body },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Pollinext",
      description,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// Escape &, <, > so the JSON can sit safely inside a <script> text node
// (prevents a </script> breakout without needing dangerouslySetInnerHTML).
const jsonLdString = JSON.stringify(jsonLd)
  .replace(/&/g, "\\u0026")
  .replace(/</g, "\\u003c")
  .replace(/>/g, "\\u003e");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sora.variable}>
      <body>
        <Grain />
        <script type="application/ld+json" suppressHydrationWarning>
          {jsonLdString}
        </script>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
