import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Build Your First AI Project | College Build-Off",
  description: "Free 60-minute workshop. Check your resume ATS score and build an AI project that gets you hired.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
