import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BRAND } from "@/data/games";

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: BRAND.description,
};

export const viewport: Viewport = {
  themeColor: "#101216",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-[#101216] text-[#F1F1F1] antialiased selection:bg-[#E5A93B] selection:text-[#101216]">
        {children}
      </body>
    </html>
  );
}
