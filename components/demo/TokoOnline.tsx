"use client";

import { useMemo, useState } from "react";
import { Kosong, JudulBagian, Segmen, Stat, StatusLencana } from "@/components/demo/ui";
import {
  PRODUK_AWAL,
  TOKO,
  seedPesananToko,
  type PesananToko,
  type Produk,
  type StatusToko,
} from "@/lib/demo/seed";
import { kode, rupiah, waLink } from "@/lib/demo/format";
import { useStore } from "@/lib/demo/useStore";
import { whatsapp } from "@/lib/content";

type Tab = "katalog" | "pesanan" | "kelola";
type BarisKeranjang = { key: string; nama: string; harga: number; qty: number };

const ALUR: StatusToko[] = ["Baru", "Diproses", "Dikirim", "Selesai"];
const KATEGORI = ["Semua", "Frozen Food", "Kue & Roti", "Lauk Matang"] as const;

export default function TokoOnline() {
  const produk = useStore<Produk[]>("demo-produk", PRODUK_AWAL);
  const pesanan = useStore<PesananToko[]>("demo-pesanan-toko", seedPesananToko());

  const [tab, setTab] = useState<Tab>("katalog");
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState<(typeof KATEGORI)[number]>("Semua");
  const [pilihanVarian, setPilihanVarian] = useState<Record<string, number>>({});
  const [keranjang, setKeranjang] = useState<BarisKeranjang[]>([]);
  const [tampilKeranjang, setTampilKeranjang] = useState(false);
  const [form, setForm] = useState({ nama: "", wa: "", alamat: "", catatan: "" });
  const [galat, setGalat] = useState<string | null>(null);
  const [sukses, setSukses] = useState<PesananToko | null>(null);
  const [filterPesanan, setFilterPesanan] = useState<"semua" | StatusToko>("semua");
  const [formProduk, setFormProduk] = useState({
    nama: "",
    kategori: "Frozen Food" as Produk["kategori"],
    harga: "",
    stok: "",
    deskripsi: "",
  });

  const daftar = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return produk.data.filter((p) => {
      if (kategori !== "Semua" && p.kategori !== kategori) return false;
      if (!q) return true;
      return (p.nama + " " + p.deskripsi + " " + p.kategori).toLowerCase().includes(q);
    });
  }, [produk.data, kategori, cari]);

  const subtotal = keranjang.reduce((s, b) => s + b.harga * b.qty, 0);
  const ongkir = subtotal === 0 || subtotal >= TOKO.gratisOngkirMulai ? 0 : TOKO.ongkirDalamKota;
  const total = subtotal + ongkir;
  const jumlahItem = keranjang.reduce((s, b) => s + b.qty, 0);
  const kurangMinimum = subtotal > 0 && subtotal < TOKO.minimumOrder;

  const hargaVarian = (p: Produk) => {
    const idx = pilihanVarian[p.id] ?? 0;
    return p.varian[idx]?.harga ?? p.harga;
  };
  const namaVarian = (p: Produk) => {
    const idx = pilihanVarian[p.id] ?? 0;
    return p.varian[idx]?.nama ?? "";
  };

  const tambah = (p: Produk) => {
    if (p.stok <= 0) return;
    setSukses(null);
    const varian = namaVarian(p);
    const key = `${p.id}::${varian}`;
    const harga = hargaVarian(p);
    setKeranjang((k) => {
      const ada = k.find((b) => b.key === key);
      if (ada) return k.map((b) => (b.key === key ? { ...b, qty: b.qty + 1 } : b));
      return [...k, { key, nama: varian ? `${p.nama} (${varian})` : p.nama, harga, qty: 1 }];
    });
  };

  const ubahQty = (key: string, delta: number) => {
    setKeranjang((k) =>
      k.map((b) => (b.key === key ? { ...b, qty: b.qty + delta } : b)).filter((b) => b.qty > 0),
    );
  };

  const pesanText = (p: PesananToko) =>
    [
      `Halo ${TOKO.nama}, saya mau pesan:`,
      "",
      ...p.item.map((i) => `• ${i.nama} × ${i.qty} = ${rupiah(i.harga * i.qty)}`),
      "",
      `Subtotal: ${rupiah(p.subtotal)}`,
      `Ongkir: ${p.ongkir === 0 ? "Gratis" : rupiah(p.ongkir)}`,
      `Total: ${rupiah(p.total)}`,
      "",
      `Nama: ${p.nama}`,
      `WhatsApp: ${p.wa}`,
      `Alamat: ${p.alamat}`,
      p.catatan ? `Catatan: ${p.catatan}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const checkout = () => {
    if (keranjang.length === 0) return;
    if (kurangMinimum) return setGalat(`Minimum pesanan ${rupiah(TOKO.minimumOrder)}.`);
    if (form.nama.trim().length < 3) return setGalat("Nama penerima belum diisi.");
    if (form.wa.replace(/\D/g, "").length < 9) return setGalat("Nomor WhatsApp belum lengkap.");
    if (form.alamat.trim().length < 8) return setGalat("Alamat pengiriman belum lengkap.");
    setGalat(null);

    const nomor =
      pesanan.data.reduce((maks, p) => {
        const n = Number(p.id.replace(/\D/g, ""));
        return Number.isFinite(n) && n > maks ? n : maks;
      }, 3100) + 1;

    const baru: PesananToko = {
      id: `PSN-${nomor}`,
      nama: form.nama.trim(),
      wa: form.wa.trim(),
      alamat: form.alamat.trim(),
      item: keranjang.map((b) => ({ nama: b.nama, harga: b.harga, qty: b.qty })),
      subtotal,
      ongkir,
      total,
      status: "Baru",
      waktu: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      catatan: form.catatan.trim(),
    };

    pesanan.setData((p) => [baru, ...p]);
    setKeranjang([]);
    setForm({ nama: "", wa: "", alamat: "", catatan: "" });
    setTampilKeranjang(false);
    setSukses(baru);
  };

  const tambahProduk = () => {
    const harga = Number(formProduk.harga.replace(/\D/g, ""));
    const stok = Number(formProduk.stok.replace(/\D/g, "")) || 0;
    if (!formProduk.nama.trim() || !harga) return;
    produk.setData((p) => [
      ...p,
      {
        id: kode("pr").toLowerCase(),
        nama: formProduk.nama.trim(),
        kategori: formProduk.kategori,
        harga,
        varian: [],
        stok,
        aktif: true,
        deskripsi: formProduk.deskripsi.trim(),
      },
    ]);
    setFormProduk({ nama: "", kategori: "Frozen Food", harga: "", stok: "", deskripsi: "" });
  };

  const pesananTampil =
    filterPesanan === "semua" ? pesanan.data : pesanan.data.filter((p) => p.status === filterPesanan);

  const PanelKeranjang = () => (
    <div className="card-flat flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <p className="text-[13.5px] font-extrabold text-ink">Keranjang</p>
          <p className="text-[11.5px] text-muted">{TOKO.nama}</p>
        </div>
        {keranjang.length > 0 && (
          <button type="button" onClick={() => setKeranjang([])} className="text-[12px] font-semibold text-danger hover:underline">
            Kosongkan
          </button>
        )}
      </div>

      {keranjang.length === 0 ? (
        <div className="px-4 py-10 text-center">
          <p className="text-[13.5px] font-bold text-ink">Keranjang masih kosong</p>
          <p className="mt-1 text-[12.5px] text-muted">
            Pilih produk di tab Katalog terlebih dahulu.
          </p>
        </div>
      ) : (
        <>
          <ul className="max-h-[240px] divide-y divide-line overflow-y-auto">
            {keranjang.map((b) => (
              <li key={b.key} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-ink">{b.nama}</p>
                  <p className="font-mono text-[11.5px] text-muted">{rupiah(b.harga)}</p>
                </div>
                <div className="flex flex-none items-center gap-1">
                  <button
                    type="button"
                    onClick={() => ubahQty(b.key, -1)}
                    aria-label={`Kurangi ${b.nama}`}
                    className="grid h-7 w-7 place-items-center rounded-lg border border-line-2 text-ink-soft hover:border-primary hover:text-primary"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-mono text-[13px] font-bold">{b.qty}</span>
                  <button
                    type="button"
                    onClick={() => ubahQty(b.key, 1)}
                    aria-label={`Tambah ${b.nama}`}
                    className="grid h-7 w-7 place-items-center rounded-lg border border-line-2 text-ink-soft hover:border-primary hover:text-primary"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-line px-4 py-3 text-[12.5px]">
            <div className="flex justify-between py-0.5">
              <span className="text-muted">Subtotal</span>
              <span className="font-mono font-bold text-ink">{rupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted">Ongkir</span>
              <span className="font-mono font-bold text-ink">
                {ongkir === 0 ? "Gratis" : rupiah(ongkir)}
              </span>
            </div>
            {ongkir > 0 && (
              <p className="mt-1 text-[11.5px] text-muted">
                Gratis ongkir mulai {rupiah(TOKO.gratisOngkirMulai)}.
              </p>
            )}
            <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
              <span className="font-bold text-ink">Total</span>
              <span className="text-[17px] font-extrabold text-ink">{rupiah(total)}</span>
            </div>
          </div>

          <div className="space-y-2.5 border-t border-line px-4 py-3">
            <input
              className="field"
              placeholder="Nama penerima"
              value={form.nama}
              onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
              aria-label="Nama penerima"
            />
            <input
              className="field"
              inputMode="tel"
              placeholder="Nomor WhatsApp"
              value={form.wa}
              onChange={(e) => setForm((f) => ({ ...f, wa: e.target.value }))}
              aria-label="Nomor WhatsApp pembeli"
            />
            <textarea
              className="field resize-y"
              rows={2}
              placeholder="Alamat lengkap pengiriman"
              value={form.alamat}
              onChange={(e) => setForm((f) => ({ ...f, alamat: e.target.value }))}
              aria-label="Alamat pengiriman"
            />
            <input
              className="field"
              placeholder="Catatan (opsional)"
              value={form.catatan}
              onChange={(e) => setForm((f) => ({ ...f, catatan: e.target.value }))}
              aria-label="Catatan pesanan"
            />

            {galat && (
              <p className="rounded-lg bg-danger-soft px-3 py-2 text-[12.5px] font-semibold text-danger">
                {galat}
              </p>
            )}

            <button type="button" onClick={checkout} className="btn btn-primary w-full">
              Buat pesanan
            </button>
          </div>
        </>
      )}
    </div>
  );

  if (!produk.siap || !pesanan.siap) return <div className="card-flat h-64 animate-pulse" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmen
          nilai={tab}
          onChange={setTab}
          opsi={[
            { id: "katalog", label: "Katalog" },
            { id: "pesanan", label: `Pesanan (${pesanan.data.filter((p) => p.status !== "Selesai").length})` },
            { id: "kelola", label: "Kelola produk" },
          ]}
        />
        <button
          type="button"
          onClick={() => {
            produk.reset();
            pesanan.reset();
          }}
          className="btn btn-ghost btn-sm"
        >
          Kembalikan data awal
        </button>
      </div>

      {/* ---------- KATALOG ---------- */}
      {tab === "katalog" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            {sukses && (
              <div className="anim-in card-flat border-good/40 p-4">
                <span className="badge badge-good">pesanan tersimpan</span>
                <p className="mt-2 text-[14px] font-extrabold text-ink">
                  {sukses.id} · {rupiah(sukses.total)}
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                  Kirim rinciannya ke WhatsApp {TOKO.nama} supaya pesananmu diproses.
                </p>
                <a
                  className="btn btn-wa btn-sm mt-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={waLink(whatsapp.nomor, pesanText(sukses))}
                >
                  Kirim pesanan ke WhatsApp
                </a>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                className="field sm:max-w-xs"
                type="search"
                placeholder="Cari produk…"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                aria-label="Cari produk"
              />
              <div className="flex flex-wrap gap-2">
                {KATEGORI.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKategori(k)}
                    aria-pressed={kategori === k}
                    className={`rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
                      kategori === k
                        ? "border-primary bg-primary text-white"
                        : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <p className="font-mono text-[11.5px] text-muted">
              {daftar.length} produk · minimum pesanan {rupiah(TOKO.minimumOrder)}
            </p>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {daftar.map((p) => {
                const habis = p.stok <= 0 || !p.aktif;
                return (
                  <div key={p.id} className={`card-flat flex flex-col p-4 ${habis ? "opacity-60" : ""}`}>
                    <div className="flex items-start justify-between gap-3">
                      <span className="chip chip-primary text-[11px]">{p.kategori}</span>
                      <StatusLencana status={habis ? "Habis" : "Aktif"} />
                    </div>
                    <h3 className="mt-3 text-[14.5px] font-extrabold text-ink">{p.nama}</h3>
                    <p className="mt-1 flex-1 text-[12.5px] leading-relaxed text-muted">{p.deskripsi}</p>

                    <p className="mt-2 text-[11.5px] text-muted">Stok: {p.stok}</p>

                    {p.varian.length > 1 && (
                      <select
                        className="field mt-2 py-1.5 text-[13px]"
                        value={String(pilihanVarian[p.id] ?? 0)}
                        onChange={(e) =>
                          setPilihanVarian((v) => ({ ...v, [p.id]: Number(e.target.value) }))
                        }
                        aria-label={`Varian ${p.nama}`}
                      >
                        {p.varian.map((v, i) => (
                          <option key={v.nama} value={i}>
                            {v.nama} — {rupiah(v.harga)}
                          </option>
                        ))}
                      </select>
                    )}

                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
                      <span className="font-mono text-[14px] font-extrabold text-ink">
                        {rupiah(hargaVarian(p))}
                      </span>
                      <button
                        type="button"
                        disabled={habis}
                        onClick={() => tambah(p)}
                        className="btn btn-primary btn-xs"
                      >
                        + Keranjang
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {daftar.length === 0 && (
              <Kosong
                judul="Produk tidak ditemukan"
                ket="Coba kata kunci lain atau pilih kategori Semua."
                aksi={
                  <button
                    type="button"
                    onClick={() => {
                      setCari("");
                      setKategori("Semua");
                    }}
                    className="btn btn-ghost btn-sm"
                  >
                    Reset pencarian
                  </button>
                }
              />
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <PanelKeranjang />
            </div>
          </aside>

          {jumlahItem > 0 && (
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg p-3 lg:hidden">
              {tampilKeranjang && (
                <div className="mb-3 max-h-[60vh] overflow-y-auto">
                  <PanelKeranjang />
                </div>
              )}
              <button
                type="button"
                onClick={() => setTampilKeranjang((v) => !v)}
                className="btn btn-primary w-full"
              >
                {tampilKeranjang ? "Tutup keranjang" : `Keranjang · ${jumlahItem} item · ${rupiah(total)}`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---------- PESANAN ---------- */}
      {tab === "pesanan" && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-4">
            {ALUR.map((s) => (
              <Stat
                key={s}
                label={s}
                nilai={String(pesanan.data.filter((p) => p.status === s).length)}
                nada={s === "Baru" ? "aksen" : s === "Selesai" ? "baik" : "netral"}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <JudulBagian
              judul="Pesanan masuk"
              ket="Total nilai semua pesanan yang belum selesai dihitung otomatis."
            />
            <div className="flex flex-wrap gap-2">
              {(["semua", ...ALUR] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilterPesanan(f)}
                  aria-pressed={filterPesanan === f}
                  className={`rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
                    filterPesanan === f
                      ? "border-primary bg-primary text-white"
                      : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary"
                  }`}
                >
                  {f === "semua" ? "Semua" : f}
                </button>
              ))}
            </div>
          </div>

          {pesananTampil.length === 0 ? (
            <Kosong
              judul="Belum ada pesanan di filter ini"
              ket="Buat pesanan dari tab Katalog, atau ubah filternya."
              aksi={
                <button type="button" onClick={() => setTab("katalog")} className="btn btn-primary btn-sm">
                  Buka katalog
                </button>
              }
            />
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {pesananTampil.map((p) => (
                <div key={p.id} className="card-flat flex flex-col p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-[12px] font-bold text-ink">{p.id}</p>
                      <p className="text-[11.5px] text-muted">{p.waktu} · {p.nama}</p>
                    </div>
                    <StatusLencana status={p.status} />
                  </div>

                  <ul className="mt-3 flex-1 space-y-1.5 border-y border-line py-3">
                    {p.item.map((i) => (
                      <li key={i.nama} className="flex items-baseline justify-between gap-3">
                        <span className="text-[12.5px] text-ink-soft">
                          <span className="font-mono font-bold text-ink">{i.qty}×</span> {i.nama}
                        </span>
                        <span className="font-mono text-[12px] text-muted">{rupiah(i.harga * i.qty)}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3 text-[11.5px] leading-relaxed text-muted">{p.alamat}</p>
                  {p.catatan && (
                    <p className="mt-1.5 rounded-lg bg-bg-soft px-3 py-2 text-[11.5px] text-ink-soft">
                      Catatan: {p.catatan}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-[14px] font-extrabold text-ink">{rupiah(p.total)}</p>
                      <p className="text-[10.5px] text-muted">
                        ongkir {p.ongkir === 0 ? "gratis" : rupiah(p.ongkir)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {p.status !== "Selesai" ? (
                        <button
                          type="button"
                          onClick={() =>
                            pesanan.setData((semua) =>
                              semua.map((x) =>
                                x.id === p.id
                                  ? { ...x, status: ALUR[Math.min(ALUR.indexOf(x.status) + 1, ALUR.length - 1)] }
                                  : x,
                              ),
                            )
                          }
                          className="btn btn-primary btn-xs"
                        >
                          {p.status === "Baru" ? "Proses" : p.status === "Diproses" ? "Kirim" : "Selesai"}
                        </button>
                      ) : (
                        <a
                          className="btn btn-wa btn-xs"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={waLink(whatsapp.nomor, pesanText(p))}
                        >
                          Chat pembeli
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---------- KELOLA PRODUK ---------- */}
      {tab === "kelola" && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-4">
            <Stat label="Jumlah produk" nilai={String(produk.data.length)} />
            <Stat label="Aktif dijual" nilai={String(produk.data.filter((p) => p.aktif).length)} nada="baik" />
            <Stat label="Stok kosong" nilai={String(produk.data.filter((p) => p.stok <= 0).length)} nada="bahaya" />
            <Stat
              label="Nilai stok"
              nilai={rupiah(produk.data.reduce((s, p) => s + p.harga * p.stok, 0))}
              nada="aksen"
            />
          </div>

          <div className="card-flat p-4">
            <JudulBagian judul="Tambah produk" ket="Produk baru langsung tampil di tab Katalog." />
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <input className="field" placeholder="Nama produk" value={formProduk.nama} onChange={(e) => setFormProduk((f) => ({ ...f, nama: e.target.value }))} aria-label="Nama produk baru" />
              <select className="field" value={formProduk.kategori} onChange={(e) => setFormProduk((f) => ({ ...f, kategori: e.target.value as Produk["kategori"] }))} aria-label="Kategori produk baru">
                {KATEGORI.filter((k) => k !== "Semua").map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
              <input className="field" placeholder="Harga" inputMode="numeric" value={formProduk.harga} onChange={(e) => setFormProduk((f) => ({ ...f, harga: e.target.value }))} aria-label="Harga produk baru" />
              <input className="field" placeholder="Stok" inputMode="numeric" value={formProduk.stok} onChange={(e) => setFormProduk((f) => ({ ...f, stok: e.target.value }))} aria-label="Stok produk baru" />
              <button type="button" onClick={tambahProduk} className="btn btn-primary">Tambah produk</button>
            </div>
            <input className="field mt-3" placeholder="Deskripsi singkat" value={formProduk.deskripsi} onChange={(e) => setFormProduk((f) => ({ ...f, deskripsi: e.target.value }))} aria-label="Deskripsi produk baru" />
          </div>

          <div className="card-flat overflow-hidden">
            <div className="scroll-x">
              <table className="tabel">
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Stok</th>
                    <th>Status</th>
                    <th className="text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {produk.data.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <p className="font-semibold text-ink">{p.nama}</p>
                        <p className="text-[11.5px] text-muted">{p.varian.length} varian</p>
                      </td>
                      <td>{p.kategori}</td>
                      <td>
                        <input
                          className="field w-32 py-1.5 font-mono text-[13px]"
                          inputMode="numeric"
                          value={p.harga}
                          aria-label={`Harga ${p.nama}`}
                          onChange={(e) => {
                            const v = Number(e.target.value.replace(/\D/g, "")) || 0;
                            produk.setData((semua) => semua.map((x) => (x.id === p.id ? { ...x, harga: v } : x)));
                          }}
                        />
                      </td>
                      <td>
                        <input
                          className="field w-20 py-1.5 font-mono text-[13px]"
                          inputMode="numeric"
                          value={p.stok}
                          aria-label={`Stok ${p.nama}`}
                          onChange={(e) => {
                            const v = Number(e.target.value.replace(/\D/g, "")) || 0;
                            produk.setData((semua) => semua.map((x) => (x.id === p.id ? { ...x, stok: v } : x)));
                          }}
                        />
                      </td>
                      <td>
                        <StatusLencana status={p.aktif ? "Aktif" : "Nonaktif"} />
                      </td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => produk.setData((semua) => semua.map((x) => (x.id === p.id ? { ...x, aktif: !x.aktif } : x)))}
                            className="btn btn-ghost btn-xs"
                          >
                            {p.aktif ? "Nonaktifkan" : "Aktifkan"}
                          </button>
                          <button
                            type="button"
                            onClick={() => produk.setData((semua) => semua.filter((x) => x.id !== p.id))}
                            className="btn btn-ghost btn-xs text-danger"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
