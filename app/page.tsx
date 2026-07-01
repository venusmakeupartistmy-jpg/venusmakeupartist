import { HomePage } from "@/components/home-page";
import { getWebsitePackages, getWhatsAppNumber } from "@/lib/settings-server";

export default async function Page() {
  const [whatsappNumber, websitePackages] = await Promise.all([
    getWhatsAppNumber(),
    getWebsitePackages(),
  ]);

  return (
    <HomePage
      whatsappNumber={whatsappNumber}
      websitePackages={websitePackages}
    />
  );
}
