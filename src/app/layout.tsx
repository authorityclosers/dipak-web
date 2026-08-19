import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dipak Vishwakarma — Sales Is The Transfer Of Certainty",
  description:
    "Thoughts on sales, communication, trust, and personal branding for people building meaningful authority.",
  openGraph: {
    title: "Dipak Vishwakarma — Sales Is The Transfer Of Certainty",
    description:
      "Thoughts on sales, communication, trust, and personal branding for people building meaningful authority.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f4f1ea",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
