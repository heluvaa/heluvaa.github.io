# Decu — Jasa Website, Aplikasi Web & IoT

Situs jasa penjualan aplikasi siap pakai dan custom, static export dari Next.js,
di-host di GitHub Pages.

Live: <https://heluvaa.github.io>

> **Semua data di repo ini masih contoh.** Harga, produk katalog, portofolio, dan
> artikel blog adalah placeholder. Ganti dulu di `lib/content.ts` sebelum dipakai
> menawarkan jasa. Selama `site.demo` masih `true`, halaman menampilkan badge
> **CONTOH** di harga dan data yang belum nyata.

---

## Stack

- **Next.js 16** (App Router) dengan `output: "export"` → hasil build di `out/`
- **Tailwind CSS 4** — token desain di blok `@theme` pada `app/globals.css`
- **TypeScript** `strict`
- **Font**: Plus Jakarta Sans + JetBrains Mono lewat `next/font/google`
- Tanpa UI kit, tanpa library animasi, tanpa CMS

---

## Menjalankan lokal

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export ke ./out
npm run lint
npx serve out        # cek hasil build
```

`next start` tidak berlaku di repo ini karena `output: "export"` — situsnya
murni file statis.

### Catatan Termux / Android ARM64

`dev` dan `build` sudah dipasangi `--webpack` (Turbopack tidak punya native
binding untuk `android-arm64`), dan `package.json` memuat
`overrides.lightningcss: "1.33.0"`.

Kalau `npm run build` gagal dengan `sh: 1: next: not found` atau
`/usr/bin/env: bad interpreter`, jalankan dulu:

```bash
export LD_PRELOAD=$PREFIX/lib/libtermux-exec.so
```

Termux tidak punya `/usr/bin/env`, sedangkan shim bin npm memakainya di shebang.

---

## Mengubah konten

**Semua teks dan data ada di `lib/content.ts`.** Komponen tidak menyimpan string
apa pun.

| Yang mau diubah | Kunci di `lib/content.ts` |
| --- | --- |
| Nama brand, domain, target pasar | `site` |
| Menu navigasi | `nav` |
| Hero beranda | `hero` |
| Section keunggulan | `keunggulan` |
| Harga & isi paket | `paketHarga` |
| Produk di katalog | `katalog.aplikasi` |
| Karya portofolio | `portofolio.karya` |
| Artikel blog | `blog.artikel` |
| Pertanyaan umum | `faq` |
| Nomor WhatsApp | `whatsapp` |
| Kontak lain (email, IG, Threads) | `kontakList` |
| Pilihan di form custom | `formCustom` |

Angka yang tampil di halaman (jumlah aplikasi, jumlah pertanyaan) dihitung dari
array — bukan ditulis manual.

### Mengisi bagian yang masih kosong

Cari semua tanda `[ISI]` di `lib/content.ts`:

1. **Nomor WhatsApp** — `whatsapp.nomor` dalam format internasional tanpa `+`.
   Tombol WhatsApp mengapung, footer, halaman detail, dan form memakai nomor ini.
2. **Email, Instagram, Threads** — entri di `kontakList` masih `pending: true`.
   Selama kosong, kartunya dirender non-aktif berlabel "belum diisi", bukan link palsu.
3. **Harga** — semua angka di `paketHarga` dan `katalog.aplikasi[].mulai` masih contoh.
4. **Produk katalog** — hapus atau ganti `demo: true` setelah isinya nyata.
   Setiap aplikasi punya `mockup` yang dirender jadi UI asli di kartu, bukan gambar.
5. **Portofolio** — ganti dengan proyek asli, isi `url` kalau ada demo publik.
6. **Artikel blog** — ganti judul dan `isi`, lalu hapus `draft: true`.
7. **Testimoni** — array `testimoni` sengaja **kosong**. Hanya isi dengan ulasan
   asli dari pelanggan yang benar-benar ada dan sudah memberi izin. Testimoni
   karangan melanggar UU Perlindungan Konsumen Pasal 10 soal iklan menyesatkan.
   Selama arraynya kosong, section testimoni tidak dirender.
8. **`site.demo`** — set `false` setelah semua di atas beres. Badge "Data contoh"
   di footer ikut hilang.

### Regenerate gambar OG

`public/og.png` dipakai sebagai pratinjau saat tautan dibagikan ke WhatsApp.
Setelah mengganti nama brand, buat ulang:

```bash
rsvg-convert -w 1200 -h 630 assets-src/og.svg -o public/og.png
```

---

## Struktur

```
app/
  layout.tsx              metadata, font, Nav + Footer + tombol WA mengapung
  page.tsx                beranda: hero, keunggulan, harga, katalog, portofolio, blog, FAQ, CTA
  globals.css             token desain + semua komponen CSS
  katalog/page.tsx        katalog + pencarian & filter         (client explorer)
  katalog/[slug]/page.tsx detail aplikasi
  portofolio/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx    artikel
  faq/page.tsx
  request-custom/page.tsx form → WhatsApp
  kontak/page.tsx
  not-found.tsx           404.html
  manifest.ts robots.ts sitemap.ts icon.svg
components/
  Nav.tsx                 nav sticky + menu mobile             (client)
  ScrollReveal.tsx        IntersectionObserver                  (client)
  KatalogExplorer.tsx     cari + filter kategori                (client)
  FormCustom.tsx          form → pratinjau pesan → WhatsApp     (client)
  KartuAplikasi.tsx  KartuPaket.tsx  KartuKarya.tsx  KartuArtikel.tsx
  MockupAplikasi.tsx      pratinjau UI di bingkai ponsel
  FaqList.tsx             <details>/<summary>, jalan tanpa JS
  SectionHead.tsx  PageHeader.tsx  CtaKontak.tsx  Footer.tsx
  WhatsAppFloat.tsx  Ikon.tsx
lib/
  content.ts              ← SATU-SATUNYA SUMBER KONTEN
  utils.ts                waLink(), tanggalIndo(), delay()
assets-src/
  og.svg                  sumber gambar OG
public/
  og.png
  ily.html                halaman lama, dipertahankan (URL sama)
  tools/curl-extractor.html   tool lama, dipertahankan
  tools/cookie.txt            file lama, dipertahankan
```

---

## Deploy

Otomatis: setiap `push` ke `main` → GitHub Actions build → publish ke Pages.
Pages repo ini sudah memakai source **GitHub Actions** (`build_type: workflow`),
jadi tidak ada langkah manual.

> Kalau repo di-fork atau Pages direset:
> Settings → Pages → Source: **GitHub Actions**, atau
> `gh api -X PUT repos/heluvaa/heluvaa.github.io/pages -f build_type=workflow`

### Versi sebelumnya

Portfolio pribadi yang dulu menempati domain ini dikunci di tag git
`portfolio-gaizka`. Untuk melihat atau memulihkannya:

```bash
git checkout portfolio-gaizka
```

---

## Catatan teknis

- **Tidak ada backend.** Form Request Custom menyusun pesan lalu membuka
  WhatsApp lewat tautan `wa.me`; isinya tidak pernah dikirim ke server mana pun.
- **Data tidak tersimpan.** Tidak ada database, tidak ada cookie, tidak ada
  analytics. Kalau nanti butuh mencatat pesanan, backend-nya harus ditambah.
- **FAQ tanpa JavaScript.** Memakai `<details>`/`<summary>` bawaan HTML.
- **Aksesibilitas.** Semua animasi mati saat `prefers-reduced-motion: reduce`,
  ada `<noscript>` yang memaksa konten tetap terlihat, navigasi keyboard penuh
  dengan `:focus-visible` yang jelas.
- **Pratinjau produk bukan gambar.** `MockupAplikasi` merender UI asli dari data
  di `content.ts`, jadi tidak ada gambar rusak dan isinya selalu ikut berubah.
