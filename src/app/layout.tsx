import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Build Your First AI Project in 60 Minutes | College Build-Off",
  description: "Free hands-on workshop for final-year engineering students. Get your ATS resume score, build a real AI project, and compete for your college. Limited to 500 seats.",
  keywords: ["AI workshop", "engineering students", "resume ATS", "AI project", "college competition", "free workshop"],
  authors: [{ name: "College Build-Off" }],
  openGraph: {
    title: "Build Your First AI Project in 60 Minutes",
    description: "Free workshop for final-year students. Check your ATS score, build AI, compete for your college.",
    type: "website",
    locale: "en_IN",
    siteName: "College Build-Off",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "College Build-Off - Build Your First AI Project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your First AI Project in 60 Minutes",
    description: "Free workshop for final-year students. Check your ATS score, build AI, compete for your college.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f97316",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-[#030303] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
