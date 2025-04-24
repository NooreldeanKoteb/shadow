import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "MedShadow - Medical Shadowing Opportunities",
  description: "Connect with medical shadowing, rotation, and volunteering opportunities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#F8F9FA] text-[#212529] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
