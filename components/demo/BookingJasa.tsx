"use client";

import { useMemo, useState } from "react";
import { Kosong, JudulBagian, Segmen, Stat, StatusLencana } from "@/components/demo/ui";
import {
  BISNIS_JASA,
  LAYANAN,
  STAF,
  seedBooking,
  type Booking,
  type StatusBooking,
} from "@/lib/demo/seed";
import { isoDari, jamKeMenit, kode, menitKeJam, rupiah, tanggalIndo, tanggalSingkat, waLink } from "@/lib/demo/format";
import { useStore } from "@/lib/demo/useStore";

type Tab = "booking" | "jadwal" | "laporan";

const ALUR: StatusBooking[] = ["Menunggu", "Terkonfirmasi", "Selesai"];

export default function BookingJasa() {
  const hariIni = isoDari(new Date());
  const awal = useMemo(() => seedBooking(hariIni), [hariIni]);
  const booking = useStore<Booking[]>("demo-booking", awal);

  const [tab, setTab] = useState<Tab>("booking");
  const [layananId, setLayananId] = useState(LAYANAN[0].id);
  const [stafId, setStafId] = useState(STAF[0].id);
  const [tanggal, setTanggal] = useState(hariIni);
  const [jam, setJam] = useState<string | null>(null);
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [catatan, setCatatan] = useState("");
  const [galat, setGalat] = useState<string | null>(null);
  const [sukses, setSukses] = useState<Booking | null>(null);

  const tanggalOpsi = useMemo(() => {
    const dasar = new Date(hariIni + "T00:00:00");
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(dasar);
      d.setDate(d.getDate() + i);
      return isoDari(d);
    });
  }, [hariIni]);

  const layananTerpilih = LAYANAN.find((l) => l.id === layananId) ?? LAYANAN[0];

  /* Slot yang masih kosong untuk staf + tanggal terpilih */
  const slotTersedia = useMemo(() => {
    const terpakai = booking.data
      .filter((b) => b.stafId === stafId && b.tanggal === tanggal && b.status !== "Batal")
      .map((b) => {
        const l = LAYANAN.find((x) => x.id === b.layananId);
        const mulai = jamKeMenit(b.jam);
        return { mulai, akhir: mulai + (l?.durasi ?? 30) };
      });

    const slot: { jam: string; bebas: boolean }[] = [];
    const mulaiBuka = BISNIS_JASA.buka * 60;
    const tutup = BISNIS_JASA.tutup * 60;

    for (let m = mulaiBuka; m + layananTerpilih.durasi <= tutup; m += BISNIS_JASA.jedaSlot) {
      const akhir = m + layananTerpilih.durasi;
      const bentrok = terpakai.some((t) => m < t.akhir && akhir > t.mulai);
      slot.push({ jam: menitKeJam(m), bebas: !bentrok });
    }
    return slot;
  }, [booking.data, stafId, tanggal, layananTerpilih.durasi]);

  const bookingTanggalIni = booking.data.filter((b) => b.tanggal === tanggal);
  const totalHariIni = bookingTanggalIni
    .filter((b) => b.status === "Selesai")
    .reduce((s, b) => s + (LAYANAN.find((l) => l.id === b.layananId)?.harga ?? 0), 0);

  const kirimBooking = () => {
    setSukses(null);
    if (!jam) return setGalat("Pilih jam terlebih dahulu.");
    if (nama.trim().length < 3) return setGalat("Nama minimal 3 karakter.");
    if (wa.replace(/\D/g, "").length < 9) return setGalat("Nomor WhatsApp belum lengkap.");
    setGalat(null);

    const baru: Booking = {
      id: kode("BK"),
      tanggal,
      jam,
      layananId,
      stafId,
      nama: nama.trim(),
      wa: wa.trim(),
      status: "Menunggu",
      catatan: catatan.trim(),
    };
    booking.setData((b) => [...b, baru]);
    setSukses(baru);
    setNama("");
    setWa("");
    setCatatan("");
    setJam(null);
  };

  const ubahStatus = (id: string, status: StatusBooking) => {
    booking.setData((semua) => semua.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const lanjutkan = (b: Booking) => {
    const i = ALUR.indexOf(b.status);
    if (i === -1 || i === ALUR.length - 1) return;
    ubahStatus(b.id, ALUR[i + 1]);
  };

  const stafTerpilih = STAF.find((s) => s.id === stafId) ?? STAF[0];

  const laporan = useMemo(() => {
    const selesai = booking.data.filter((b) => b.status === "Selesai");
    const nilai = (b: Booking) => LAYANAN.find((l) => l.id === b.layananId)?.harga ?? 0;

    const perStaf = STAF.map((s) => {
      const daftar = selesai.filter((b) => b.stafId === s.id);
      return { nama: s.nama, jumlah: daftar.length, pendapatan: daftar.reduce((x, b) => x + nilai(b), 0) };
    }).sort((a, b) => b.pendapatan - a.pendapatan);

    const perLayanan = LAYANAN.map((l) => {
      const daftar = selesai.filter((b) => b.layananId === l.id);
      return { nama: l.nama, jumlah: daftar.length, pendapatan: daftar.reduce((x) => x + l.harga, 0) };
    })
      .filter((x) => x.jumlah > 0)
      .sort((a, b) => b.jumlah - a.jumlah);

    return {
      total: selesai.reduce((s, b) => s + nilai(b), 0),
      jumlah: selesai.length,
      batal: booking.data.filter((b) => b.status === "Batal").length,
      perStaf,
      perLayanan,
    };
  }, [booking.data]);

  if (!booking.siap) return <div className="card-flat h-64 animate-pulse" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmen
          nilai={tab}
          onChange={setTab}
          opsi={[
            { id: "booking", label: "Pesan jadwal" },
            { id: "jadwal", label: `Jadwal harian (${bookingTanggalIni.length})` },
            { id: "laporan", label: "Laporan" },
          ]}
        />
        <button type="button" onClick={booking.reset} className="btn btn-ghost btn-sm">
          Kembalikan data awal
        </button>
      </div>

      {/* ---------- FORM BOOKING ---------- */}
      {tab === "booking" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <div className="card-flat p-4">
              <JudulBagian judul="1. Pilih layanan" ket="Durasi menentukan panjang slot yang dikunci." />
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {LAYANAN.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => {
                      setLayananId(l.id);
                      setJam(null);
                    }}
                    aria-pressed={layananId === l.id}
                    className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors ${
                      layananId === l.id
                        ? "border-primary bg-primary-soft"
                        : "border-line-2 bg-surface hover:border-primary"
                    }`}
                  >
                    <span>
                      <span className="block text-[13.5px] font-bold text-ink">{l.nama}</span>
                      <span className="block text-[11.5px] text-muted">{l.durasi} menit</span>
                    </span>
                    <span className="font-mono text-[13px] font-bold text-ink-soft">{rupiah(l.harga)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card-flat p-4">
              <JudulBagian judul="2. Pilih staf" />
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {STAF.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setStafId(s.id);
                      setJam(null);
                    }}
                    aria-pressed={stafId === s.id}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      stafId === s.id
                        ? "border-primary bg-primary-soft"
                        : "border-line-2 bg-surface hover:border-primary"
                    }`}
                  >
                    <span className="block text-[13.5px] font-bold text-ink">{s.nama}</span>
                    <span className="block text-[11.5px] text-muted">{s.peran}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card-flat p-4">
              <JudulBagian judul="3. Pilih tanggal & jam" ket={`Jam operasional ${BISNIS_JASA.buka}.00 – ${BISNIS_JASA.tutup}.00. Slot abu-abu sudah terisi.`} />
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {tanggalOpsi.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTanggal(t);
                      setJam(null);
                    }}
                    aria-pressed={tanggal === t}
                    className={`flex-none rounded-xl border px-3.5 py-2.5 text-[12.5px] font-bold transition-colors ${
                      tanggal === t
                        ? "border-primary bg-primary text-white"
                        : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary"
                    }`}
                  >
                    {tanggalSingkat(t)}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-6">
                {slotTersedia.map((s) => (
                  <button
                    key={s.jam}
                    type="button"
                    disabled={!s.bebas}
                    onClick={() => setJam(s.jam)}
                    aria-pressed={jam === s.jam}
                    className={`rounded-lg border py-2 font-mono text-[12.5px] font-bold transition-colors ${
                      !s.bebas
                        ? "cursor-not-allowed border-line bg-bg-soft text-muted line-through"
                        : jam === s.jam
                          ? "border-primary bg-primary text-white"
                          : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary"
                    }`}
                  >
                    {s.jam}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ringkasan */}
          <aside>
            <div className="sticky top-24 space-y-4">
              <div className="card-flat overflow-hidden lg:w-auto">
                <div className="border-b border-line px-4 py-3">
                  <p className="text-[13.5px] font-extrabold text-ink">Ringkasan booking</p>
                  <p className="text-[11.5px] text-muted">{BISNIS_JASA.nama}</p>
                </div>

                <dl className="divide-y divide-line">
                  {[
                    ["Layanan", layananTerpilih.nama],
                    ["Durasi", `${layananTerpilih.durasi} menit`],
                    ["Staf", stafTerpilih.nama],
                    ["Tanggal", tanggalIndo(tanggal)],
                    ["Jam", jam ?? "belum dipilih"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-3 px-4 py-2.5">
                      <dt className="text-[12.5px] text-muted">{k}</dt>
                      <dd className="text-right text-[12.5px] font-semibold text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="border-t border-line px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-muted">Total bayar</span>
                    <span className="text-[18px] font-extrabold text-ink">{rupiah(layananTerpilih.harga)}</span>
                  </div>
                </div>
              </div>

              <div className="card-flat space-y-3 p-4">
                <div>
                  <label htmlFor="bk-nama" className="field-label">Nama pemesan</label>
                  <input id="bk-nama" className="field" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama lengkap" />
                </div>
                <div>
                  <label htmlFor="bk-wa" className="field-label">Nomor WhatsApp</label>
                  <input id="bk-wa" className="field" inputMode="tel" value={wa} onChange={(e) => setWa(e.target.value)} placeholder="08xx-xxxx-xxxx" />
                </div>
                <div>
                  <label htmlFor="bk-catatan" className="field-label">Catatan (opsional)</label>
                  <input id="bk-catatan" className="field" value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="mis. potongan model undercut" />
                </div>

                {galat && (
                  <p className="rounded-lg bg-danger-soft px-3 py-2 text-[12.5px] font-semibold text-danger">{galat}</p>
                )}

                <button type="button" onClick={kirimBooking} className="btn btn-primary w-full">
                  Konfirmasi booking
                </button>
              </div>

              {sukses && (
                <div className="anim-in card-flat border-good/40 p-4">
                  <span className="badge badge-good">tersimpan</span>
                  <p className="mt-2 text-[14px] font-extrabold text-ink">Booking {sukses.id}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                    {sukses.nama} · {tanggalIndo(sukses.tanggal)} pukul {sukses.jam} dengan{" "}
                    {STAF.find((s) => s.id === sukses.stafId)?.nama}.
                  </p>
                  <a
                    className="btn btn-wa btn-sm mt-3 w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={waLink(
                      "6281913711189",
                      `Halo ${BISNIS_JASA.nama}, konfirmasi booking ${sukses.id} atas nama ${sukses.nama} pada ${tanggalIndo(sukses.tanggal)} pukul ${sukses.jam}.`,
                    )}
                  >
                    Kirim konfirmasi ke toko
                  </a>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* ---------- JADWAL HARIAN ---------- */}
      {tab === "jadwal" && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-4">
            <Stat label="Total jadwal" nilai={String(bookingTanggalIni.length)} />
            <Stat label="Terkonfirmasi" nilai={String(bookingTanggalIni.filter((b) => b.status === "Terkonfirmasi").length)} nada="aksen" />
            <Stat label="Selesai" nilai={String(bookingTanggalIni.filter((b) => b.status === "Selesai").length)} nada="baik" />
            <Stat label="Pendapatan selesai" nilai={rupiah(totalHariIni)} nada="baik" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {tanggalOpsi.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTanggal(t)}
                aria-pressed={tanggal === t}
                className={`rounded-xl border px-3.5 py-2 text-[12.5px] font-bold transition-colors ${
                  tanggal === t
                    ? "border-primary bg-primary text-white"
                    : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary"
                }`}
              >
                {tanggalSingkat(t)}
              </button>
            ))}
          </div>

          {bookingTanggalIni.length === 0 ? (
            <Kosong
              judul="Belum ada jadwal di tanggal ini"
              ket="Buat booking baru dari tab Pesan jadwal."
              aksi={
                <button type="button" onClick={() => setTab("booking")} className="btn btn-primary btn-sm">
                  Buat booking
                </button>
              }
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {STAF.map((s) => {
                const daftar = bookingTanggalIni
                  .filter((b) => b.stafId === s.id)
                  .sort((a, b) => a.jam.localeCompare(b.jam));
                return (
                  <div key={s.id} className="card-flat p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[13.5px] font-extrabold text-ink">{s.nama}</p>
                        <p className="text-[11.5px] text-muted">{s.peran}</p>
                      </div>
                      <span className="badge">{daftar.length} jadwal</span>
                    </div>

                    <ul className="mt-3 space-y-2">
                      {daftar.length === 0 && (
                        <li className="rounded-lg bg-bg-soft px-3 py-4 text-center text-[12px] text-muted">
                          Kosong sepanjang hari
                        </li>
                      )}
                      {daftar.map((b) => {
                        const l = LAYANAN.find((x) => x.id === b.layananId);
                        return (
                          <li key={b.id} className="rounded-xl border border-line p-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[13px] font-extrabold text-ink">{b.jam}</span>
                              <StatusLencana status={b.status} />
                            </div>
                            <p className="mt-1 text-[12.5px] font-semibold text-ink-soft">{b.nama}</p>
                            <p className="text-[11.5px] text-muted">
                              {l?.nama} · {l?.durasi} menit · {rupiah(l?.harga ?? 0)}
                            </p>
                            {b.catatan && (
                              <p className="mt-1.5 rounded-lg bg-bg-soft px-2.5 py-1.5 text-[11.5px] text-ink-soft">
                                {b.catatan}
                              </p>
                            )}
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {b.status !== "Selesai" && b.status !== "Batal" && (
                                <>
                                  <button type="button" onClick={() => lanjutkan(b)} className="btn btn-primary btn-xs">
                                    {b.status === "Menunggu" ? "Konfirmasi" : "Tandai selesai"}
                                  </button>
                                  <button type="button" onClick={() => ubahStatus(b.id, "Batal")} className="btn btn-ghost btn-xs text-danger">
                                    Batalkan
                                  </button>
                                </>
                              )}
                              {(b.status === "Selesai" || b.status === "Batal") && (
                                <button type="button" onClick={() => booking.setData((x) => x.filter((y) => y.id !== b.id))} className="btn btn-ghost btn-xs">
                                  Hapus
                                </button>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ---------- LAPORAN ---------- */}
      {tab === "laporan" && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-4">
            <Stat label="Booking selesai" nilai={String(laporan.jumlah)} nada="baik" />
            <Stat label="Total pendapatan" nilai={rupiah(laporan.total)} nada="baik" />
            <Stat
              label="Rata-rata per booking"
              nilai={laporan.jumlah ? rupiah(laporan.total / laporan.jumlah) : rupiah(0)}
            />
            <Stat label="Dibatalkan" nilai={String(laporan.batal)} nada="bahaya" />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="card-flat overflow-hidden">
              <div className="border-b border-line px-4 py-3">
                <p className="text-[13.5px] font-extrabold text-ink">Kinerja per staf</p>
              </div>
              <table className="tabel">
                <thead>
                  <tr>
                    <th>Staf</th>
                    <th className="text-right">Booking</th>
                    <th className="text-right">Pendapatan</th>
                  </tr>
                </thead>
                <tbody>
                  {laporan.perStaf.map((s) => (
                    <tr key={s.nama}>
                      <td className="font-semibold text-ink">{s.nama}</td>
                      <td className="text-right font-mono">{s.jumlah}</td>
                      <td className="text-right font-mono font-bold text-ink">{rupiah(s.pendapatan)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-flat overflow-hidden">
              <div className="border-b border-line px-4 py-3">
                <p className="text-[13.5px] font-extrabold text-ink">Layanan paling laris</p>
              </div>
              {laporan.perLayanan.length === 0 ? (
                <p className="px-4 py-8 text-center text-[12.5px] text-muted">
                  Belum ada booking yang selesai.
                </p>
              ) : (
                <table className="tabel">
                  <thead>
                    <tr>
                      <th>Layanan</th>
                      <th className="text-right">Jumlah</th>
                      <th className="text-right">Pendapatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {laporan.perLayanan.map((l) => (
                      <tr key={l.nama}>
                        <td className="font-semibold text-ink">{l.nama}</td>
                        <td className="text-right font-mono">{l.jumlah}</td>
                        <td className="text-right font-mono font-bold text-ink">{rupiah(l.pendapatan)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
