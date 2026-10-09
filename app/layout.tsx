import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollReveal from "@/components/ScrollReveal";
import { site } from "@/lib/content";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.lengkap} — Website, Aplikasi Web & IoT`,
    template: `%s | ${site.nama}`,
  },
  description: site.deskripsi,
  applicationName: site.nama,
  keywords: [
    "jasa pembuatan website",
    "jasa aplikasi web",
    "aplikasi siap pakai",
    "katalog menu QR",
    "aplikasi kasir",
    "IoT Indonesia",
    "UMKM",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: site.url,
    siteName: site.nama,
    title: `${site.lengkap} — Website, Aplikasi Web & IoT`,
    description: site.deskripsi,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.nama} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.lengkap}`,
    description: site.deskripsi,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg antialiased">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ScrollReveal />
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
