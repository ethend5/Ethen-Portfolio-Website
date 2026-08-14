import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

// ─── Font optimization (next/font — zero layout shift, self-hosted) ───────────

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ─── Site-wide metadata ───────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default:  "Ethen Dhanaraj | Electrical Engineering Student",
    template: "%s | Ethen Dhanaraj",
  },
  description:
    "Portfolio of Ethen Dhanaraj — EE student at UC Santa Cruz specializing in embedded systems, AI/ML, and full-stack development.",
  keywords: [
    "Ethen Dhanaraj",
    "Electrical Engineering",
    "UC Santa Cruz",
    "UCSC",
    "Embedded Systems",
    "Firmware",
    "RTOS",
    "FreeRTOS",
    "STM32",
    "PCB Design",
    "Altium",
    "Signal Processing",
    "Machine Learning",
    "PyTorch",
    "Full-Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Software Engineering",
  ],
  authors: [{ name: "Ethen Dhanaraj" }],
  creator: "Ethen Dhanaraj",
  openGraph: {
    title:       "Ethen Dhanaraj | Electrical Engineering Student",
    description: "Portfolio of Ethen Dhanaraj — EE student at UC Santa Cruz specializing in embedded systems, AI/ML, and full-stack development.",
    type:        "website",
    locale:      "en_US",
    images: [
      {
        url:    "/og-image.png", // Place a 1200×630 image at public/og-image.png
        width:  1200,
        height: 630,
        alt:    "Ethen Dhanaraj — Electrical Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Ethen Dhanaraj | Electrical Engineering Student",
    description: "Portfolio of Ethen Dhanaraj — EE student at UC Santa Cruz specializing in embedded systems, AI/ML, and full-stack development.",
    images:      ["/og-image.png"],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-image-preview": "large",
    },
  },
};

// ─── Root layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white">
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
