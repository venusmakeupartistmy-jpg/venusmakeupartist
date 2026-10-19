import type { Metadata } from "next";
import { JobPortfolioPage } from "@/components/job-portfolio-page";
import { getWhatsAppNumber } from "@/lib/settings-server";
import { portfolioProfile } from "@/lib/job-portfolio";

export const metadata: Metadata = {
  title: `${portfolioProfile.fullName} | Professional Portfolio`,
  description: `${portfolioProfile.title} based in ${portfolioProfile.location}. Selected bridal, soft glam, event, and creative work.`,
  openGraph: {
    title: `${portfolioProfile.fullName} — Portfolio`,
    description: portfolioProfile.summary.slice(0, 160),
    url: "https://venusmakeupartist.site/portfolio",
    type: "profile",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function PortfolioPage() {
  const whatsappNumber = await getWhatsAppNumber();

  return <JobPortfolioPage whatsappNumber={whatsappNumber} />;
}
