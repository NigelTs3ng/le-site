import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Singapore Employment Agency – Hire or Apply for Work Today",
  description:
    "Helping SMEs in Singapore hire foreign workers from Bangladesh, India, China, and Southeast Asia. Apply for work or contact us to hire.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
