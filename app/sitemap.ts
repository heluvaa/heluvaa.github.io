import type { MetadataRoute } from "next";
import { blog, katalog, site } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const sekarang = new Date();

  const statis = ["", "/katalog", "/portofolio", "/blog", "/faq", "/kontak", "/request-custom"];

  return [
    ...statis.map((p, i) => ({
      url: `${site.url}${p}/`,
      lastModified: sekarang,
      changeFrequency: (i === 0 ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: i === 0 ? 1 : 0.8,
    })),
    ...katalog.demo.map((d) => ({
      url: `${site.url}${d.demoUrl}/`,
      lastModified: sekarang,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...blog.artikel.map((a) => ({
      url: `${site.url}/blog/${a.slug}/`,
      lastModified: new Date(a.tanggal),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
