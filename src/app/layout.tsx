import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PageWrapper from "@/components/PageWrapper";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Singapore Employment Agency – Hire or Apply for Work Today",
  description:
    "Helping SMEs in Singapore hire foreign workers from Bangladesh, India, China, and Southeast Asia. Apply for work or contact us to hire.",
  icons: {
    icon: "/le-logo.png",
    apple: "/le-logo.png",
  },
  openGraph: {
    title: "Singapore Employment Agency – Hire or Apply for Work Today",
    description:
      "Helping SMEs in Singapore hire foreign workers from Bangladesh, India, China, and Southeast Asia. Apply for work or contact us to hire.",
    url: "https://www.sgagency.com/",
    siteName: "SG Employment Agency",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Singapore Employment Agency – Hire or Apply for Work Today",
      },
    ],
    locale: "en_SG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
