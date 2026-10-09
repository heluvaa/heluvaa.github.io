# Decu — Jasa Website, Aplikasi Web & IoT

Situs jasa penjualan aplikasi siap pakai dan jasa kustomisasi, static export dari
Next.js, di-host di GitHub Pages.

Live: <https://heluvaa.github.io>

**Empat demo yang benar-benar berjalan**, bukan gambar mockup:

| Demo | Alamat |
| --- | --- |
| Menu Digital QR | [/demo/menu-qr/](https://heluvaa.github.io/demo/menu-qr/) |
| Booking & Reservasi | [/demo/booking-jasa/](https://heluvaa.github.io/demo/booking-jasa/) |
| Toko Online + Checkout WhatsApp | [/demo/toko-online/](https://heluvaa.github.io/demo/toko-online/) |
| Administrasi Sekolah | [/demo/admin-sekolah/](https://heluvaa.github.io/demo/admin-sekolah/) |

> **Harga masih usulan.** Angka di `katalog.demo[].hargaMulai` dan `paketHarga`
> disusun dari riset harga pasar (lihat `~/riset-kategori-umkm.md`), bukan
> ketetapanmu. Konfirmasi atau ubah sebelum dipakai menawarkan jasa.
>
> Email, Instagram, dan Threads belum diisi — kartunya dirender non-aktif
> berlabel "belum diisi", bukan tautan palsu.

---

## Stack

- **Next.js 16** (App Router) dengan `output: "export"` → hasil build di `out/`
- **Tailwind CSS 4** — token desain di `app/globals.css`
- **TypeScript** `strict`
- **Font**: Plus Jakarta Sans + JetBrains Mono lewat `next/font/google`
- Tanpa UI kit, tanpa library animasi, tanpa CMS, tanpa backend

---

## Tema gelap & terang

Default **terang**. Tombol ganti tema ada di navigasi (dan di tiap halaman demo),
pilihannya disimpan di `localStorage` dengan kunci `tema`.

Cara kerjanya:

1. `:root` dan `[data-theme="dark"]` di `app/globals.css` mendefinisikan variabel
   `--c-*` untuk kedua tema.
2. `@theme inline` memetakannya ke token Tailwind, jadi `bg-bg`, `text-ink`,
   `border-line` ikut berubah tanpa membangun ulang CSS.
3. Skrip kecil di `app/layout.tsx` memasang atribut `data-theme` **sebelum cat
   pertama**, supaya tidak ada kedipan putih saat halaman gelap dibuka.
4. Varian `dark:` digerakkan atribut itu, bukan `prefers-color-scheme`.

Menambah warna: tambahkan `--c-nama` di kedua blok (`:root` dan
`[data-theme="dark"]`), lalu `--color-nama: var(--c-nama)` di dalam `@theme inline`.

---

## Menjalankan lokal

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export ke ./out
npx serve out
```

`next start` tidak berlaku karena `output: "export"`.

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

## Demo

Tiap demo adalah aplikasi mandiri di `app/demo/<slug>/` yang memakai
`components/demo/DemoShell.tsx` — bukan navigasi situs, supaya terasa seperti
produk sendiri. Yang tersisa hanya jalan kembali ke katalog, tombol tema, dan
tombol order WhatsApp.

**Data disimpan di browser lewat `localStorage`.** Tidak ada server dan tidak ada
database: perubahan pengunjung tetap ada saat halaman dimuat ulang, tapi tidak
berpindah perangkat. Tiap demo punya tombol **Kembalikan data awal**.

| Demo | Isi |
| --- | --- |
| Menu Digital QR | Pilih meja → menu → keranjang → kirim ke dapur; papan pesanan dengan alur status; kelola menu |
| Booking & Reservasi | Pilih layanan, staf, tanggal, slot jam anti-bentrok; jadwal harian 4 staf; laporan per staf & layanan |
| Toko Online | Katalog bervarian, keranjang, minimum pesanan, gratis ongkir, checkout ke WhatsApp, kelola produk, daftar pesanan |
| Administrasi Sekolah | Ringkasan, absensi per kelas, nilai + rapor berperingkat, tagihan SPP dengan tunggakan |

Perkakas bersama: `lib/demo/useStore.ts` (state + `localStorage`),
`lib/demo/seed.ts` (data awal realistis), `lib/demo/format.ts` (rupiah, tanggal),
`components/demo/ui.tsx` (Stat, Segmen, Kosong, StatusLencana).

---

## Mengubah konten

**Semua teks dan data ada di `lib/content.ts`.** Komponen tidak menyimpan string.

| Yang mau diubah | Kunci |
| --- | --- |
| Nama brand, domain, target pasar | `site` |
| Menu navigasi | `nav` |
| Hero beranda | `hero` |
| Keunggulan | `keunggulan` |
| Harga & isi paket | `paketHarga` |
| Kartu katalog & tautan demo | `katalog.demo` |
| Portofolio | `portofolio.karya` |
| Artikel blog | `blog.artikel` |
| Pertanyaan umum | `faq` |
| Nomor WhatsApp | `whatsapp` |
| Kontak lain | `kontakList` |
| Pilihan di form custom | `formCustom` |

Data di dalam demo ada di `lib/demo/seed.ts`.

### Thumbnail katalog

Tiap kartu katalog punya `thumbnail`. Selama kosong, kartu memakai pratinjau UI
yang dirender dari `mockup` — bukan gambar placeholder. Begitu screenshot siap:

```bash
cp screenshot-menu-qr.png public/katalog/menu-qr.png
```

lalu isi `thumbnail: "/katalog/menu-qr.png"` pada demo yang bersangkutan.

### Harga

`katalog.demo[].hargaMulai` dan `paketHarga.paket[].harga`. Angka yang ada
sekarang adalah usulan berbasis riset pasar, belum kamu tetapkan.

### Testimoni

Array `testimoni` sengaja **kosong** dan sectionnya tidak dirender. Isi hanya
dengan ulasan asli pelanggan yang benar-benar ada dan sudah memberi izin.
Testimoni karangan melanggar UU Perlindungan Konsumen Pasal 10.

---

## Struktur

```
app/
  layout.tsx              html/body, font, skrip tema, ScrollReveal
  globals.css             token dua tema + komponen CSS + animasi
  (situs)/
    layout.tsx            Nav + Footer + tombol WhatsApp mengapung
    page.tsx              beranda
    katalog/              daftar 4 demo + pencarian & filter
    portofolio/ blog/ faq/ kontak/ request-custom/
  demo/
    page.tsx              daftar semua demo
    menu-qr/ booking-jasa/ toko-online/ admin-sekolah/
  not-found.tsx          404.html
  manifest.ts robots.ts sitemap.ts icon.svg
components/
  Nav.tsx                 nav sticky, menu mobile, tombol tema   (client)
  ThemeToggle.tsx         ganti tema, tanpa state React          (client)
  ScrollReveal.tsx        IntersectionObserver                   (client)
  KatalogExplorer.tsx     cari + filter kategori                 (client)
  FormCustom.tsx          form → pratinjau → WhatsApp            (client)
  demo/
    DemoShell.tsx         header demo: kembali, tema, order
    MenuQr.tsx BookingJasa.tsx TokoOnline.tsx AdminSekolah.tsx   (client)
    ui.tsx                Stat, Segmen, Kosong, StatusLencana
  KartuDemo.tsx KartuPaket.tsx KartuKarya.tsx KartuArtikel.tsx
  MockupAplikasi.tsx      pratinjau UI di bingkai ponsel
  FaqList.tsx SectionHead.tsx PageHeader.tsx CtaKontak.tsx
  Footer.tsx WhatsAppFloat.tsx Ikon.tsx
lib/
  content.ts              ← SUMBER KONTEN SITUS
  demo/seed.ts            ← DATA DEMO
  demo/useStore.ts  demo/format.ts
  utils.ts
assets-src/
  og.svg                  sumber gambar OG
public/
  og.png
  ily.html tools/         halaman lama dari repo, dipertahankan
```

---

## Deploy

Otomatis: setiap `push` ke `main` → GitHub Actions build → publish ke Pages.
Pages repo ini sudah memakai source **GitHub Actions** (`build_type: workflow`).

> Kalau repo di-fork atau Pages direset:
> Settings → Pages → Source: **GitHub Actions**, atau
> `gh api -X PUT repos/heluvaa/heluvaa.github.io/pages -f build_type=workflow`

### Versi sebelumnya

Portfolio pribadi yang dulu menempati domain ini dikunci di tag git
`portfolio-gaizka`:

```bash
git checkout portfolio-gaizka
```

---

## Catatan teknis

- **Tidak ada backend.** Form Request Custom dan checkout demo menyusun pesan lalu
  membuka WhatsApp lewat tautan `wa.me`; isinya tidak dikirim ke server mana pun.
- **Tidak ada cookie, tidak ada analytics, tidak ada database.** Satu-satunya
  penyimpanan adalah `localStorage` di browser pengunjung.
- **FAQ dan accordion lain tanpa JavaScript** — memakai `<details>`/`<summary>`.
- **Aksesibilitas.** Animasi mati saat `prefers-reduced-motion: reduce`, ada
  `<noscript>` yang memaksa konten tetap terlihat, tombol status absensi memakai
  `aria-pressed`, tombol tema punya `aria-label`.
- **Pratinjau produk bukan gambar.** `MockupAplikasi` merender UI asli dari data,
  jadi isinya selalu ikut berubah saat konten diubah.
- **Menguji demo.** Halaman uji interaksi dan fungsional pernah dipakai dari
  `out/__selftest.html` dan `out/__fungsional.html` (tidak ikut ter-commit, karena
  `out/` adalah hasil build). Pola yang dipakai: satu halaman yang memuat demo di
  dalam iframe se-origin, mengklik setiap tombol tiga putaran, dan mencatat
  `window.onerror` serta `console.error`.
