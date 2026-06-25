import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Venus Makeup Artist | Kuala Lumpur",
  description:
    "Personal, bridal, dinner and creative makeup styling by Venus. Based in Kuala Lumpur, Malaysia.",
  metadataBase: new URL("https://venusmakeupartist.site"),
  openGraph: {
    title: "Venus Makeup Artist",
    description:
      "Personal, bridal, dinner and creative makeup styling in Kuala Lumpur.",
    url: "https://venusmakeupartist.site",
    siteName: "Venus Makeup Artist",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
