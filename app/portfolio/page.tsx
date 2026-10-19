import type { Metadata } from "next";
import { JobPortfolioPage } from "@/components/job-portfolio-page";
import { getWhatsAppNumber } from "@/lib/settings-server";
import { resume } from "@/lib/job-portfolio";

export const metadata: Metadata = {
  title: `${resume.fullName} | Resume — ${resume.headline}`,
  description: resume.summary.slice(0, 160),
  openGraph: {
    title: `${resume.fullName} — Resume`,
    description: resume.summary.slice(0, 160),
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
