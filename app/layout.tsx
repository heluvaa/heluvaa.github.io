import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
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
    "menu digital QR",
    "aplikasi booking",
    "toko online UMKM",
    "administrasi sekolah",
    "UMKM Indonesia",
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
    title: site.lengkap,
    description: site.deskripsi,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Dijalankan sebelum cat pertama supaya tema tersimpan langsung terpasang
 * dan tidak ada kedipan putih saat halaman bertema gelap dibuka.
 */
const SKRIP_TEMA = `try{var t=localStorage.getItem('tema');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-theme="light"
      suppressHydrationWarning
      className={`${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SKRIP_TEMA }} />
      </head>
      <body className="min-h-screen bg-bg antialiased">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
