# Portfolio — Gaizka Nazaryo Widiansyah

Portfolio pribadi, static export dari Next.js App Router, di-deploy ke GitHub Pages
lewat GitHub Actions.

Live: <https://heluvaa.github.io>

---

## Stack

- **Next.js 16** (App Router) dengan `output: "export"` → hasil build ada di `out/`
- **Tailwind CSS 4** — token desain ada di blok `@theme` di `app/globals.css`
- **TypeScript** `strict`
- **Font**: Inter + JetBrains Mono lewat `next/font/google`
- Tanpa UI kit, tanpa library animasi. Scroll-reveal pakai `IntersectionObserver` native.

---

## Menjalankan lokal

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export ke ./out
npm run lint
```

`next start` **tidak berlaku** di repo ini — karena `output: "export"`,
situsnya murni file statis. Untuk mengecek hasil build:

```bash
npx serve out
```

### Catatan untuk Termux / Android ARM64

`next dev` dan `next build` sudah dipasangi flag `--webpack` di
`package.json`. Turbopack tidak punya native binding untuk `android-arm64`,
jadi flag itu wajib di platform ini. Flag-nya tidak mengganggu di Linux/macOS.

`package.json` juga memuat `overrides.lightningcss: "1.33.0"` — versi itu yang
punya build `android-arm64`.

---

## Mengubah konten

**Semua teks, link, dan data ada di satu file: `lib/content.ts`.**
Komponen hanya membaca dari situ — tidak ada string yang perlu dicari ke dalam
folder `components/`.

| Yang mau diubah | Di mana |
| --- | --- |
| Nama, headline, sub-headline, lokasi | `site`, `hero` |
| Menu navigasi | `nav` |
| Daftar proyek (judul, deskripsi, stack, link) | `projects` |
| Cerita About | `about.paragraphs` |
| Daftar skill | `skills` |
| GitHub / LinkedIn / WhatsApp / Email | `contacts` |
| Path file CV | `site.cv.path` |

Angka yang tampil di halaman (jumlah proyek, jumlah teknologi) dihitung dari
array `projects` dan `skills` — bukan ditulis manual, jadi tidak bisa basi.

### Ganti foto avatar

Saat ini memakai monogram SVG (bukan foto wajah). Untuk memakai foto asli:
lihat komentar di bagian atas `components/Avatar.tsx`.

### Ganti file CV

```bash
cp /path/ke/CV.pdf public/cv-gaizka.pdf
```

Kalau nama filenya berbeda, ubah `site.cv.path` di `lib/content.ts`.

---

## Sebelum publik — daftar wajib

Repo ini masih memuat placeholder yang ditandai `[ISI]` di `lib/content.ts`.

1. **LinkedIn** — isi `contacts` yang sekarang `pending: true`. Selama kosong,
   kartunya dirender non-aktif dengan label "Segera" (bukan link palsu).
2. **Cerita About** — ganti dua paragraf di `about.paragraphs`. Kerangka tulis
   ada di `about.storySlot`.
3. **Tech stack tiap proyek** — `projects[].stack` diisi berdasarkan asumsi
   dari daftar skill; pastikan cocok dengan proyek aslinya.
4. **File CV** — pastikan `public/cv-gaizka.pdf` benar-benar ada, kalau tidak
   tombol Download CV akan 404.
5. **OG image** — `public/og.png` (1200×630) dipakai untuk preview link di
   WhatsApp/Telegram/Twitter. Ganti dengan gambar sendiri.
6. **Footer badge** — set `footer.demo = false` setelah semua `[ISI]` dihapus.
7. **Custom domain (opsional)** — kalau pakai domain sendiri, ubah `site.url`,
   lalu tambahkan file `public/CNAME` berisi domainnya.

---

## Deploy

Deploy otomatis: setiap `push` ke `main` → GitHub Actions build → publish ke Pages.

**Status: sudah dikonfigurasi.** Repo ini memakai source Pages **GitHub Actions**
(`build_type: workflow`), bukan lagi mode *legacy* yang menyajikan file mentah dari
branch `main`. Tidak ada langkah manual untuk push berikutnya.

> Kalau repo ini di-fork, atau Pages-nya pernah direset ke mode lain:
> Settings → Pages → Build and deployment → Source: **GitHub Actions**. Atau:
>
> ```bash
> gh api -X PUT repos/heluvaa/heluvaa.github.io/pages -f build_type=workflow
> ```

---

## Struktur

```
app/
  layout.tsx           metadata, font, <noscript> fallback
  page.tsx             urutan section
  globals.css          token desain + semua animasi
  manifest.ts          /manifest.webmanifest
  robots.ts            /robots.txt
  sitemap.ts           /sitemap.xml
  not-found.tsx        404.html
  icon.svg             favicon
components/
  Nav.tsx              nav sticky + menu mobile        (client)
  ScrollReveal.tsx     IntersectionObserver             (client)
  Hero.tsx  Projects.tsx  About.tsx  Skills.tsx  Contact.tsx  Footer.tsx
  Avatar.tsx           monogram SVG placeholder
lib/
  content.ts           ← SATU-SATUNYA SUMBER KONTEN
  delay.ts             helper stagger animasi
assets-src/
  og.svg               sumber gambar OG (di-render ke public/og.png)
public/
  cv-gaizka.pdf  og.png
  ily.html             halaman lama dari repo, dipertahankan (URL sama)
  tools/curl-extractor.html   tool lama dari repo, dipertahankan
  tools/cookie.txt     file lama dari repo, dipertahankan apa adanya
```

> **File lama dari repo ini.** Sebelumnya root repo menyajikan `index.html`
> (tool "Bulk cURL Extractor") dan `ily.html`. Karena Pages sekarang
> dilayani dari hasil build, halaman lama itu dipindahkan ke `public/`
> supaya tetap bisa diakses:
>
> - ~~/index.html~~ → `/tools/curl-extractor.html` *(URL berubah)*
> - `/ily.html` → tetap sama
> - `/cookie.txt` → tetap sama
>
> Hapus saja folder `public/tools/` dan `public/ily.html` kalau tidak perlu.

### Regenerate gambar OG

```bash
rsvg-convert -w 1200 -h 630 assets-src/og.svg -o public/og.png
```

---

## Aksesibilitas & performa

- Semua animasi dimatikan otomatis saat `prefers-reduced-motion: reduce`.
- `<noscript>` memaksa konten tetap terlihat kalau JavaScript mati.
- Navigasi keyboard penuh dengan `:focus-visible` yang jelas.
- Tanpa library animasi eksternal; satu `IntersectionObserver` untuk semua reveal.
