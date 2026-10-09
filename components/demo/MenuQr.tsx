"use client";

import { useMemo, useState } from "react";
import { Kosong, JudulBagian, Segmen, Stat, StatusLencana } from "@/components/demo/ui";
import { MENU_AWAL, WARUNG, seedPesanan, type MenuItem, type Pesanan, type StatusPesanan } from "@/lib/demo/seed";
import { kode, rupiah } from "@/lib/demo/format";
import { useStore } from "@/lib/demo/useStore";

type Tab = "pelanggan" | "papan" | "kelola";
type Baris = { id: string; nama: string; harga: number; qty: number };

const KATEGORI = ["Semua", "Makanan", "Minuman", "Camilan"] as const;
const ALUR: StatusPesanan[] = ["Baru", "Diproses", "Siap", "Selesai"];

export default function MenuQr() {
  const menu = useStore<MenuItem[]>("demo-menu", MENU_AWAL);
  const pesanan = useStore<Pesanan[]>("demo-pesanan", seedPesanan());

  const [tab, setTab] = useState<Tab>("pelanggan");
  const [meja, setMeja] = useState(4);
  const [kategori, setKategori] = useState<(typeof KATEGORI)[number]>("Semua");
  const [keranjang, setKeranjang] = useState<Baris[]>([]);
  const [catatan, setCatatan] = useState("");
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);
  const [tampilKeranjang, setTampilKeranjang] = useState(false);
  const [lihatSelesai, setLihatSelesai] = useState(false);
  const [formBaru, setFormBaru] = useState({ nama: "", kategori: "Makanan" as MenuItem["kategori"], harga: "" });

  const daftarMenu = useMemo(
    () => menu.data.filter((m) => kategori === "Semua" || m.kategori === kategori),
    [menu.data, kategori],
  );

  const subtotal = keranjang.reduce((s, b) => s + b.harga * b.qty, 0);
  const jumlahItem = keranjang.reduce((s, b) => s + b.qty, 0);

  const papanAktif = pesanan.data.filter((p) => p.status !== "Selesai");
  const papanTampil = lihatSelesai
    ? pesanan.data
    : pesanan.data.filter((p) => p.status !== "Selesai");

  const tambah = (m: MenuItem) => {
    setPesanSukses(null);
    setKeranjang((k) => {
      const ada = k.find((b) => b.id === m.id);
      if (ada) return k.map((b) => (b.id === m.id ? { ...b, qty: b.qty + 1 } : b));
      return [...k, { id: m.id, nama: m.nama, harga: m.harga, qty: 1 }];
    });
  };

  const ubahQty = (id: string, delta: number) => {
    setKeranjang((k) =>
      k
        .map((b) => (b.id === id ? { ...b, qty: b.qty + delta } : b))
        .filter((b) => b.qty > 0),
    );
  };

  const kirimPesanan = () => {
    if (keranjang.length === 0) return;
    const nomor =
      pesanan.data.reduce((maks, p) => {
        const n = Number(p.id.replace(/\D/g, ""));
        return Number.isFinite(n) && n > maks ? n : maks;
      }, 1000) + 1;
    const baru: Pesanan = {
      id: `PSN-${nomor}`,
      meja,
      item: keranjang.map(({ nama, harga, qty }) => ({ nama, harga, qty })),
      total: subtotal,
      status: "Baru",
      waktu: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      catatan: catatan.trim(),
    };
    pesanan.setData((p) => [baru, ...p]);
    setKeranjang([]);
    setCatatan("");
    setTampilKeranjang(false);
    setPesanSukses(baru.id);
  };

  const majukan = (id: string) => {
    pesanan.setData((semua) =>
      semua.map((p) => {
        if (p.id !== id) return p;
        const i = ALUR.indexOf(p.status);
        return { ...p, status: ALUR[Math.min(i + 1, ALUR.length - 1)] };
      }),
    );
  };

  const batalkan = (id: string) => {
    pesanan.setData((semua) => semua.filter((p) => p.id !== id));
  };

  const tambahMenu = () => {
    const harga = Number(formBaru.harga.replace(/\D/g, ""));
    if (!formBaru.nama.trim() || !harga) return;
    menu.setData((m) => [
      ...m,
      {
        id: kode("mn").toLowerCase(),
        nama: formBaru.nama.trim(),
        kategori: formBaru.kategori,
        harga,
        tersedia: true,
        ket: "",
      },
    ]);
    setFormBaru({ nama: "", kategori: "Makanan", harga: "" });
  };

  const PanelKeranjang = () => (
    <div className="card-flat flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <p className="text-[13.5px] font-extrabold text-ink">Pesanan Meja {meja}</p>
          <p className="text-[11.5px] text-muted">{WARUNG.nama}</p>
        </div>
        {keranjang.length > 0 && (
          <button type="button" onClick={() => setKeranjang([])} className="text-[12px] font-semibold text-danger hover:underline">
            Kosongkan
          </button>
        )}
      </div>

      {keranjang.length === 0 ? (
        <div className="px-4 py-10 text-center">
          <p className="text-[13.5px] font-bold text-ink">Belum ada pilihan</p>
          <p className="mt-1 text-[12.5px] text-muted">
            Tekan tombol tambah pada menu di sebelah kiri.
          </p>
        </div>
      ) : (
        <>
          <ul className="max-h-[280px] flex-1 divide-y divide-line overflow-y-auto">
            {keranjang.map((b) => (
              <li key={b.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-ink">{b.nama}</p>
                  <p className="font-mono text-[11.5px] text-muted">{rupiah(b.harga)}</p>
                </div>
                <div className="flex flex-none items-center gap-1">
                  <button
                    type="button"
                    onClick={() => ubahQty(b.id, -1)}
                    aria-label={`Kurangi ${b.nama}`}
                    className="grid h-7 w-7 place-items-center rounded-lg border border-line-2 text-ink-soft hover:border-primary hover:text-primary"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-mono text-[13px] font-bold">{b.qty}</span>
                  <button
                    type="button"
                    onClick={() => ubahQty(b.id, 1)}
                    aria-label={`Tambah ${b.nama}`}
                    className="grid h-7 w-7 place-items-center rounded-lg border border-line-2 text-ink-soft hover:border-primary hover:text-primary"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-line px-4 py-3">
            <label htmlFor="catatan-meja" className="field-label">
              Catatan untuk dapur
            </label>
            <input
              id="catatan-meja"
              className="field"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="mis. sambal dipisah"
            />
          </div>

          <div className="border-t border-line px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted">Total</span>
              <span className="text-[18px] font-extrabold text-ink">{rupiah(subtotal)}</span>
            </div>
            <button type="button" onClick={kirimPesanan} className="btn btn-primary mt-3 w-full">
              Kirim pesanan ke dapur
            </button>
          </div>
        </>
      )}
    </div>
  );

  if (!menu.siap || !pesanan.siap) {
    return <div className="card-flat h-64 animate-pulse" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmen
          nilai={tab}
          onChange={setTab}
          opsi={[
            { id: "pelanggan", label: "Menu pelanggan" },
            { id: "papan", label: `Papan pesanan${papanAktif.length ? ` (${papanAktif.length})` : ""}` },
            { id: "kelola", label: "Kelola menu" },
          ]}
        />
        <button
          type="button"
          onClick={() => {
            menu.reset();
            pesanan.reset();
          }}
          className="btn btn-ghost btn-sm"
        >
          Kembalikan data awal
        </button>
      </div>

      {/* ---------- MENU PELANGGAN ---------- */}
      {tab === "pelanggan" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            {pesanSukses && (
              <div className="anim-in card-flat flex items-start gap-3 border-good/40 bg-[color-mix(in_srgb,var(--c-good)_8%,transparent)] p-4">
                <span className="badge badge-good mt-0.5">terkirim</span>
                <div>
                  <p className="text-[13.5px] font-bold text-ink">
                    Pesanan {pesanSukses} masuk ke dapur
                  </p>
                  <p className="mt-0.5 text-[12.5px] text-muted">
                    Buka tab Papan Pesanan untuk memprosesnya.
                  </p>
                </div>
              </div>
            )}

            <div className="card-flat p-4">
              <JudulBagian judul="Nomor meja" ket="Pelanggan memilih meja tempat ia duduk." />
              <div className="mt-3 flex flex-wrap gap-2">
                {Array.from({ length: WARUNG.totalMeja }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setMeja(n)}
                    aria-pressed={meja === n}
                    className={`grid h-10 w-10 place-items-center rounded-xl border text-[13px] font-bold transition-colors ${
                      meja === n
                        ? "border-primary bg-primary text-white"
                        : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {KATEGORI.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKategori(k)}
                  aria-pressed={kategori === k}
                  className={`rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                    kategori === k
                      ? "border-primary bg-primary text-white"
                      : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {daftarMenu.map((m) => (
                <div
                  key={m.id}
                  className={`card-flat flex flex-col p-4 ${m.tersedia ? "" : "opacity-60"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[14.5px] font-bold text-ink">{m.nama}</p>
                      {m.ket && <p className="mt-0.5 text-[12px] text-muted">{m.ket}</p>}
                    </div>
                    <StatusLencana status={m.tersedia ? "Tersedia" : "Habis"} />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="font-mono text-[14px] font-bold text-ink">{rupiah(m.harga)}</span>
                    <button
                      type="button"
                      disabled={!m.tersedia}
                      onClick={() => tambah(m)}
                      className="btn btn-primary btn-xs"
                    >
                      + Tambah
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <PanelKeranjang />
            </div>
          </aside>

          {/* Keranjang versi mobile */}
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
                {tampilKeranjang ? "Tutup keranjang" : `Lihat keranjang · ${jumlahItem} item · ${rupiah(subtotal)}`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---------- PAPAN PESANAN ---------- */}
      {tab === "papan" && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-4">
            {ALUR.map((s) => (
              <Stat
                key={s}
                label={s}
                nilai={String(pesanan.data.filter((p) => p.status === s).length)}
                nada={s === "Siap" ? "baik" : s === "Baru" ? "aksen" : "netral"}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <JudulBagian
              judul="Daftar pesanan masuk"
              ket="Geser status pesanan mengikuti alur: Baru → Diproses → Siap → Selesai."
            />
            <label className="flex cursor-pointer items-center gap-2 text-[12.5px] font-semibold text-ink-soft">
              <input
                type="checkbox"
                checked={lihatSelesai}
                onChange={(e) => setLihatSelesai(e.target.checked)}
                className="h-4 w-4 accent-[var(--c-primary)]"
              />
              Tampilkan yang selesai
            </label>
          </div>

          {papanTampil.length === 0 ? (
            <Kosong
              judul="Belum ada pesanan"
              ket="Kirim satu pesanan dari tab Menu pelanggan, lalu kembali ke sini."
              aksi={
                <button type="button" onClick={() => setTab("pelanggan")} className="btn btn-primary btn-sm">
                  Buka menu pelanggan
                </button>
              }
            />
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {papanTampil.map((p) => (
                <div key={p.id} className="card-flat flex flex-col p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-[12px] font-bold text-ink">{p.id}</p>
                      <p className="text-[11.5px] text-muted">
                        Meja {p.meja} · {p.waktu}
                      </p>
                    </div>
                    <StatusLencana status={p.status} />
                  </div>

                  <ul className="mt-3 flex-1 space-y-1.5 border-y border-line py-3">
                    {p.item.map((it) => (
                      <li key={it.nama} className="flex items-baseline justify-between gap-3">
                        <span className="text-[12.5px] text-ink-soft">
                          <span className="font-mono font-bold text-ink">{it.qty}×</span> {it.nama}
                        </span>
                        <span className="font-mono text-[12px] text-muted">{rupiah(it.harga * it.qty)}</span>
                      </li>
                    ))}
                  </ul>

                  {p.catatan && (
                    <p className="mt-3 rounded-lg bg-bg-soft px-3 py-2 text-[12px] text-ink-soft">
                      Catatan: {p.catatan}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="font-mono text-[14px] font-extrabold text-ink">{rupiah(p.total)}</span>
                    <div className="flex gap-2">
                      {p.status !== "Selesai" ? (
                        <button type="button" onClick={() => majukan(p.id)} className="btn btn-primary btn-xs">
                          {p.status === "Baru" ? "Proses" : p.status === "Diproses" ? "Tandai siap" : "Selesai"}
                        </button>
                      ) : (
                        <span className="badge badge-good">tuntas</span>
                      )}
                      <button type="button" onClick={() => batalkan(p.id)} className="btn btn-ghost btn-xs">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---------- KELOLA MENU ---------- */}
      {tab === "kelola" && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Jumlah menu" nilai={String(menu.data.length)} />
            <Stat label="Tersedia" nilai={String(menu.data.filter((m) => m.tersedia).length)} nada="baik" />
            <Stat label="Sedang habis" nilai={String(menu.data.filter((m) => !m.tersedia).length)} nada="bahaya" />
          </div>

          <div className="card-flat p-4">
            <JudulBagian judul="Tambah menu" ket="Menu baru langsung muncul di tab Menu pelanggan." />
            <div className="mt-3 grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
              <input
                className="field"
                placeholder="Nama menu"
                value={formBaru.nama}
                onChange={(e) => setFormBaru((f) => ({ ...f, nama: e.target.value }))}
                aria-label="Nama menu baru"
              />
              <select
                className="field"
                value={formBaru.kategori}
                onChange={(e) => setFormBaru((f) => ({ ...f, kategori: e.target.value as MenuItem["kategori"] }))}
                aria-label="Kategori menu baru"
              >
                {["Makanan", "Minuman", "Camilan"].map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
              <input
                className="field"
                placeholder="Harga"
                inputMode="numeric"
                value={formBaru.harga}
                onChange={(e) => setFormBaru((f) => ({ ...f, harga: e.target.value }))}
                aria-label="Harga menu baru"
              />
              <button type="button" onClick={tambahMenu} className="btn btn-primary">
                Tambah
              </button>
            </div>
          </div>

          <div className="card-flat overflow-hidden">
            <div className="scroll-x">
              <table className="tabel">
                <thead>
                  <tr>
                    <th>Menu</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Status</th>
                    <th className="text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.data.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <p className="font-semibold text-ink">{m.nama}</p>
                        {m.ket && <p className="text-[11.5px] text-muted">{m.ket}</p>}
                      </td>
                      <td>{m.kategori}</td>
                      <td>
                        <input
                          className="field w-32 py-1.5 font-mono text-[13px]"
                          inputMode="numeric"
                          value={m.harga}
                          aria-label={`Harga ${m.nama}`}
                          onChange={(e) => {
                            const v = Number(e.target.value.replace(/\D/g, "")) || 0;
                            menu.setData((semua) => semua.map((x) => (x.id === m.id ? { ...x, harga: v } : x)));
                          }}
                        />
                      </td>
                      <td>
                        <StatusLencana status={m.tersedia ? "Tersedia" : "Habis"} />
                      </td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              menu.setData((semua) =>
                                semua.map((x) => (x.id === m.id ? { ...x, tersedia: !x.tersedia } : x)),
                              )
                            }
                            className="btn btn-ghost btn-xs"
                          >
                            {m.tersedia ? "Tandai habis" : "Tandai tersedia"}
                          </button>
                          <button
                            type="button"
                            onClick={() => menu.setData((semua) => semua.filter((x) => x.id !== m.id))}
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
