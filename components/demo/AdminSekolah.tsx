"use client";

import { useMemo, useState } from "react";
import { JudulBagian, Segmen, Stat, StatusLencana } from "@/components/demo/ui";
import {
  KELAS,
  MADRASAH,
  MAPEL,
  SISWA,
  labelBulan,
  bulanTerakhir,
  seedAbsensi,
  seedNilai,
  seedTagihan,
  type Absensi,
  type NamaKelas,
  type NilaiSiswa,
  type StatusAbsen,
  type Tagihan,
} from "@/lib/demo/seed";
import { isoDari, rupiah } from "@/lib/demo/format";
import { useStore } from "@/lib/demo/useStore";

type Tab = "ringkasan" | "absensi" | "nilai" | "spp";

const STATUS_ABSEN: StatusAbsen[] = ["Hadir", "Sakit", "Izin", "Alpa"];

function predikat(n: number): { huruf: string; warna: string } {
  if (n >= 90) return { huruf: "A", warna: "text-good" };
  if (n >= 80) return { huruf: "B", warna: "text-primary" };
  if (n >= 70) return { huruf: "C", warna: "text-ink-soft" };
  return { huruf: "D", warna: "text-danger" };
}

export default function AdminSekolah() {
  const hariIni = isoDari(new Date());
  const awalAbsen = useMemo(() => seedAbsensi(hariIni), [hariIni]);
  const awalNilai = useMemo(() => seedNilai(), []);
  const awalTagihan = useMemo(() => seedTagihan(bulanTerakhir(3)), []);

  const absensi = useStore<Absensi[]>("demo-absensi", awalAbsen);
  const nilai = useStore<NilaiSiswa[]>("demo-nilai", awalNilai);
  const tagihan = useStore<Tagihan[]>("demo-tagihan", awalTagihan);

  const [tab, setTab] = useState<Tab>("ringkasan");
  const [kelasPilih, setKelasPilih] = useState<NamaKelas>("VII-A");
  const [mapelPilih, setMapelPilih] = useState<string>(MAPEL[0]);
  const [raporSiswa, setRaporSiswa] = useState<string | null>(null);

  const tanggalOpsi = useMemo(() => {
    const dasar = new Date(hariIni + "T00:00:00");
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(dasar);
      d.setDate(d.getDate() - (6 - i));
      return isoDari(d);
    });
  }, [hariIni]);
  const [tanggalPilih, setTanggalPilih] = useState(hariIni);

  const bulan = useMemo(() => bulanTerakhir(3), []);
  const [bulanPilih, setBulanPilih] = useState(bulan[bulan.length - 1]);
  const [filterSpp, setFilterSpp] = useState<"semua" | "Belum bayar">("Belum bayar");

  const siswaKelas = SISWA.filter((s) => s.kelas === kelasPilih);
  const presensiTanggal = absensi.data.filter((a) => a.tanggal === tanggalPilih && a.siswaId.startsWith("sw"));
  const statusSiswa = (id: string): StatusAbsen =>
    absensi.data.find((a) => a.siswaId === id && a.tanggal === tanggalPilih)?.status ?? "Hadir";

  const setStatus = (siswaId: string, status: StatusAbsen) => {
    absensi.setData((semua) => {
      const ada = semua.find((a) => a.siswaId === siswaId && a.tanggal === tanggalPilih);
      if (ada) {
        return semua.map((a) =>
          a.siswaId === siswaId && a.tanggal === tanggalPilih ? { ...a, status } : a,
        );
      }
      return [...semua, { siswaId, tanggal: tanggalPilih, status }];
    });
  };

  const nilaiSiswa = (siswaId: string, mapel: string) =>
    nilai.data.find((n) => n.siswaId === siswaId && n.mapel === mapel)?.nilai ?? 0;

  const setNilai = (siswaId: string, mapel: string, v: number) => {
    nilai.setData((semua) => {
      const ada = semua.find((n) => n.siswaId === siswaId && n.mapel === mapel);
      if (ada) {
        return semua.map((n) => (n.siswaId === siswaId && n.mapel === mapel ? { ...n, nilai: v } : n));
      }
      return [...semua, { siswaId, mapel, nilai: v }];
    });
  };

  /* ---------- Ringkasan ---------- */
  const ringkas = useMemo(() => {
    const presensiHariIni = absensi.data.filter((a) => a.tanggal === hariIni);
    const hadir = presensiHariIni.filter((a) => a.status === "Hadir").length;
    const alpa = presensiHariIni.filter((a) => a.status === "Alpa").length;
    const belumBayar = tagihan.data.filter((t) => t.status === "Belum bayar");
    const semuaNilai = nilai.data.map((n) => n.nilai);
    const rataNilai = semuaNilai.length
      ? semuaNilai.reduce((s, n) => s + n, 0) / semuaNilai.length
      : 0;

    const tunggakanPerSiswa = SISWA.map((s) => {
      const daftar = belumBayar.filter((t) => t.siswaId === s.id);
      return { siswa: s, jumlah: daftar.length, total: daftar.reduce((x, t) => x + t.jumlah, 0) };
    })
      .filter((x) => x.jumlah > 0)
      .sort((a, b) => b.total - a.total);

    const perKelas = KELAS.map((k) => {
      const anggota = SISWA.filter((s) => s.kelas === k);
      const presensi = absensi.data.filter(
        (a) => a.tanggal === hariIni && anggota.some((s) => s.id === a.siswaId),
      );
      const h = presensi.filter((a) => a.status === "Hadir").length;
      const nilaiKelas = nilai.data.filter((n) => anggota.some((s) => s.id === n.siswaId));
      return {
        kelas: k,
        jumlah: anggota.length,
        persenHadir: presensi.length ? Math.round((h / presensi.length) * 100) : 0,
        rataNilai: nilaiKelas.length
          ? nilaiKelas.reduce((s, n) => s + n.nilai, 0) / nilaiKelas.length
          : 0,
      };
    });

    return {
      totalSiswa: SISWA.length,
      persenHadir: presensiHariIni.length ? Math.round((hadir / presensiHariIni.length) * 100) : 0,
      alpa,
      belumBayar,
      totalTunggakan: belumBayar.reduce((s, t) => s + t.jumlah, 0),
      rataNilai,
      tunggakanPerSiswa,
      perKelas,
    };
  }, [absensi.data, tagihan.data, nilai.data, hariIni]);

  /* ---------- Rekap absensi ---------- */
  const rekapAbsen = useMemo(() => {
    const dalam = presensiTanggal.filter((a) => siswaKelas.some((s) => s.id === a.siswaId));
    return STATUS_ABSEN.map((st) => ({
      status: st,
      jumlah: dalam.filter((a) => a.status === st).length,
    }));
  }, [presensiTanggal, siswaKelas]);

  const persenHadirKelas = siswaKelas.length
    ? Math.round((rekapAbsen[0].jumlah / siswaKelas.length) * 100)
    : 0;

  /* ---------- Nilai kelas ---------- */
  const nilaiKelasTerpilih = siswaKelas.map((s) => nilaiSiswa(s.id, mapelPilih));
  const rataKelas = nilaiKelasTerpilih.length
    ? nilaiKelasTerpilih.reduce((s, n) => s + n, 0) / nilaiKelasTerpilih.length
    : 0;
  const tertinggi = nilaiKelasTerpilih.length ? Math.max(...nilaiKelasTerpilih) : 0;
  const terendah = nilaiKelasTerpilih.length ? Math.min(...nilaiKelasTerpilih) : 0;

  /* ---------- Rapor satu siswa ---------- */
  const rapor = useMemo(() => {
    if (!raporSiswa) return null;
    const s = SISWA.find((x) => x.id === raporSiswa);
    if (!s) return null;
    const baris = MAPEL.map((m) => ({ mapel: m, nilai: nilaiSiswa(s.id, m) }));
    const rata = baris.reduce((x, b) => x + b.nilai, 0) / baris.length;
    const teman = SISWA.filter((x) => x.kelas === s.kelas)
      .map((x) => ({
        id: x.id,
        rata: MAPEL.reduce((sum, m) => sum + nilaiSiswa(x.id, m), 0) / MAPEL.length,
      }))
      .sort((a, b) => b.rata - a.rata);
    return { siswa: s, baris, rata, peringkat: teman.findIndex((t) => t.id === s.id) + 1, dari: teman.length };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raporSiswa, nilai.data]);

  /* ---------- SPP ---------- */
  const tagihanBulan = tagihan.data.filter((t) => t.bulan === bulanPilih);
  const tagihanTampil =
    filterSpp === "semua" ? tagihanBulan : tagihanBulan.filter((t) => t.status === "Belum bayar");
  const terkumpul = tagihanBulan.filter((t) => t.status === "Lunas").reduce((s, t) => s + t.jumlah, 0);
  const sisa = tagihanBulan.filter((t) => t.status !== "Lunas").reduce((s, t) => s + t.jumlah, 0);

  if (!absensi.siap || !nilai.siap || !tagihan.siap) {
    return <div className="card-flat h-64 animate-pulse" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmen
          nilai={tab}
          onChange={setTab}
          opsi={[
            { id: "ringkasan", label: "Ringkasan" },
            { id: "absensi", label: "Absensi" },
            { id: "nilai", label: "Nilai & rapor" },
            { id: "spp", label: "SPP" },
          ]}
        />
        <button
          type="button"
          onClick={() => {
            absensi.reset();
            nilai.reset();
            tagihan.reset();
          }}
          className="btn btn-ghost btn-sm"
        >
          Kembalikan data awal
        </button>
      </div>

      {/* ---------- RINGKASAN ---------- */}
      {tab === "ringkasan" && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Total siswa" nilai={String(ringkas.totalSiswa)} catatan={`${KELAS.length} rombel aktif`} />
            <Stat label="Kehadiran hari ini" nilai={`${ringkas.persenHadir}%`} nada="baik" catatan={`${ringkas.alpa} siswa tanpa keterangan`} />
            <Stat label="Rata-rata nilai" nilai={ringkas.rataNilai.toFixed(1)} nada="aksen" catatan="Semua mata pelajaran" />
            <Stat label="Tunggakan SPP" nilai={rupiah(ringkas.totalTunggakan)} nada="bahaya" catatan={`${ringkas.belumBayar.length} tagihan belum dibayar`} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="card-flat overflow-hidden">
              <div className="border-b border-line px-4 py-3">
                <p className="text-[13.5px] font-extrabold text-ink">Rekap per kelas</p>
              </div>
              <table className="tabel">
                <thead>
                  <tr>
                    <th>Kelas</th>
                    <th className="text-right">Siswa</th>
                    <th className="text-right">Hadir</th>
                    <th className="text-right">Rata nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {ringkas.perKelas.map((k) => (
                    <tr key={k.kelas}>
                      <td className="font-semibold text-ink">{k.kelas}</td>
                      <td className="text-right font-mono">{k.jumlah}</td>
                      <td className="text-right font-mono">{k.persenHadir}%</td>
                      <td className="text-right font-mono font-bold text-ink">{k.rataNilai.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-flat overflow-hidden">
              <div className="border-b border-line px-4 py-3">
                <p className="text-[13.5px] font-extrabold text-ink">Tunggakan terbesar</p>
              </div>
              <table className="tabel">
                <thead>
                  <tr>
                    <th>Siswa</th>
                    <th>Kelas</th>
                    <th className="text-right">Bulan tertunggak</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ringkas.tunggakanPerSiswa.slice(0, 6).map((t) => (
                    <tr key={t.siswa.id}>
                      <td className="font-semibold text-ink">{t.siswa.nama}</td>
                      <td>{t.siswa.kelas}</td>
                      <td className="text-right font-mono">{t.jumlah}</td>
                      <td className="text-right font-mono font-bold text-danger">{rupiah(t.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------- ABSENSI ---------- */}
      {tab === "absensi" && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {rekapAbsen.map((r) => (
              <Stat
                key={r.status}
                label={r.status}
                nilai={String(r.jumlah)}
                nada={r.status === "Hadir" ? "baik" : r.status === "Alpa" ? "bahaya" : "netral"}
              />
            ))}
          </div>

          <div className="card-flat p-4">
            <JudulBagian
              judul="Pilih kelas & tanggal"
              ket={`Kehadiran ${kelasPilih} pada tanggal terpilih: ${persenHadirKelas}%`}
              aksi={
                <button
                  type="button"
                  onClick={() => {
                    absensi.setData((semua) => {
                      const lain = semua.filter(
                        (a) => !(a.tanggal === tanggalPilih && siswaKelas.some((s) => s.id === a.siswaId)),
                      );
                      return [
                        ...lain,
                        ...siswaKelas.map((s) => ({ siswaId: s.id, tanggal: tanggalPilih, status: "Hadir" as StatusAbsen })),
                      ];
                    });
                  }}
                  className="btn btn-ghost btn-sm"
                >
                  Tandai semua hadir
                </button>
              }
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {KELAS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKelasPilih(k)}
                  aria-pressed={kelasPilih === k}
                  className={`rounded-xl border px-3.5 py-2 text-[12.5px] font-bold transition-colors ${
                    kelasPilih === k
                      ? "border-primary bg-primary text-white"
                      : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary"
                  }`}
                >
                  {k}
                </button>
              ))}
              <span className="mx-1 hidden w-px bg-line sm:block" />
              {tanggalOpsi.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTanggalPilih(t)}
                  aria-pressed={tanggalPilih === t}
                  className={`rounded-xl border px-3 py-2 font-mono text-[12px] font-bold transition-colors ${
                    tanggalPilih === t
                      ? "border-primary bg-primary text-white"
                      : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary"
                  }`}
                >
                  {t.slice(8)}/{t.slice(5, 7)}
                </button>
              ))}
            </div>
          </div>

          <div className="card-flat overflow-hidden">
            <div className="scroll-x">
              <table className="tabel">
                <thead>
                  <tr>
                    <th>NIS</th>
                    <th>Nama siswa</th>
                    <th>Status kehadiran</th>
                    <th className="text-right">Tersimpan</th>
                  </tr>
                </thead>
                <tbody>
                  {siswaKelas.map((s) => {
                    const st = statusSiswa(s.id);
                    return (
                      <tr key={s.id}>
                        <td className="font-mono text-[12.5px]">{s.nis}</td>
                        <td className="font-semibold text-ink">{s.nama}</td>
                        <td>
                          <div className="flex flex-wrap gap-1.5">
                            {STATUS_ABSEN.map((opsi) => (
                              <button
                                key={opsi}
                                type="button"
                                onClick={() => setStatus(s.id, opsi)}
                                aria-pressed={st === opsi}
                                className={`rounded-lg border px-2.5 py-1 text-[11.5px] font-bold transition-colors ${
                                  st === opsi
                                    ? opsi === "Hadir"
                                      ? "border-good bg-good text-white"
                                      : opsi === "Alpa"
                                        ? "border-danger bg-danger text-white"
                                        : "border-accent bg-accent text-[#3b2a00]"
                                    : "border-line-2 bg-surface text-ink-soft hover:border-primary"
                                }`}
                              >
                                {opsi}
                              </button>
                            ))}
                          </div>
                        </td>
                        <td className="text-right">
                          <StatusLencana status={st} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------- NILAI & RAPOR ---------- */}
      {tab === "nilai" && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-4">
            <Stat label="Rata-rata kelas" nilai={rataKelas.toFixed(1)} nada="aksen" />
            <Stat label="Nilai tertinggi" nilai={String(tertinggi)} nada="baik" />
            <Stat label="Nilai terendah" nilai={String(terendah)} nada="bahaya" />
            <Stat label="Jumlah siswa" nilai={String(siswaKelas.length)} />
          </div>

          <div className="card-flat p-4">
            <JudulBagian judul="Pilih kelas & mata pelajaran" ket="Perubahan nilai langsung tersimpan dan ikut menghitung rata-rata." />
            <div className="mt-4 flex flex-wrap gap-2">
              {KELAS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKelasPilih(k)}
                  aria-pressed={kelasPilih === k}
                  className={`rounded-xl border px-3.5 py-2 text-[12.5px] font-bold transition-colors ${
                    kelasPilih === k
                      ? "border-primary bg-primary text-white"
                      : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            <select
              className="field mt-3 sm:max-w-xs"
              value={mapelPilih}
              onChange={(e) => setMapelPilih(e.target.value)}
              aria-label="Pilih mata pelajaran"
            >
              {MAPEL.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="card-flat overflow-hidden">
            <div className="scroll-x">
              <table className="tabel">
                <thead>
                  <tr>
                    <th>Nama siswa</th>
                    <th>Nilai {mapelPilih}</th>
                    <th>Predikat</th>
                    <th className="text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {siswaKelas.map((s) => {
                    const n = nilaiSiswa(s.id, mapelPilih);
                    const p = predikat(n);
                    return (
                      <tr key={s.id}>
                        <td className="font-semibold text-ink">{s.nama}</td>
                        <td>
                          <input
                            className="field w-24 py-1.5 font-mono text-[13px]"
                            inputMode="numeric"
                            value={n}
                            aria-label={`Nilai ${s.nama} untuk ${mapelPilih}`}
                            onChange={(e) => {
                              const v = Math.max(0, Math.min(100, Number(e.target.value.replace(/\D/g, "")) || 0));
                              setNilai(s.id, mapelPilih, v);
                            }}
                          />
                        </td>
                        <td>
                          <span className={`font-mono text-[15px] font-extrabold ${p.warna}`}>{p.huruf}</span>
                        </td>
                        <td className="text-right">
                          <button type="button" onClick={() => setRaporSiswa(s.id)} className="btn btn-ghost btn-xs">
                            Lihat rapor
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {rapor && (
            <div className="card-flat anim-in overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
                <div>
                  <p className="text-[14px] font-extrabold text-ink">Rapor {rapor.siswa.nama}</p>
                  <p className="text-[11.5px] text-muted">
                    NIS {rapor.siswa.nis} · Kelas {rapor.siswa.kelas} · {MADRASAH.tahunAjaran}
                  </p>
                </div>
                <button type="button" onClick={() => setRaporSiswa(null)} className="btn btn-ghost btn-xs">
                  Tutup
                </button>
              </div>

              <table className="tabel">
                <thead>
                  <tr>
                    <th>Mata pelajaran</th>
                    <th className="text-right">Nilai</th>
                    <th className="text-right">Predikat</th>
                  </tr>
                </thead>
                <tbody>
                  {rapor.baris.map((b) => (
                    <tr key={b.mapel}>
                      <td>{b.mapel}</td>
                      <td className="text-right font-mono font-bold text-ink">{b.nilai}</td>
                      <td className={`text-right font-mono font-extrabold ${predikat(b.nilai).warna}`}>
                        {predikat(b.nilai).huruf}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="grid gap-3 border-t border-line px-4 py-4 sm:grid-cols-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">Rata-rata</p>
                  <p className="mt-1 text-[19px] font-extrabold text-ink">{rapor.rata.toFixed(1)}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">Predikat akhir</p>
                  <p className={`mt-1 text-[19px] font-extrabold ${predikat(rapor.rata).warna}`}>
                    {predikat(rapor.rata).huruf}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">Peringkat kelas</p>
                  <p className="mt-1 text-[19px] font-extrabold text-ink">
                    {rapor.peringkat} <span className="text-[13px] font-bold text-muted">dari {rapor.dari}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------- SPP ---------- */}
      {tab === "spp" && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Sudah terkumpul" nilai={rupiah(terkumpul)} nada="baik" />
            <Stat label="Belum masuk" nilai={rupiah(sisa)} nada="bahaya" />
            <Stat
              label="Kepatuhan bayar"
              nilai={tagihanBulan.length ? `${Math.round((tagihanBulan.filter((t) => t.status === "Lunas").length / tagihanBulan.length) * 100)}%` : "0%"}
              nada="aksen"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {bulan.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBulanPilih(b)}
                  aria-pressed={bulanPilih === b}
                  className={`rounded-xl border px-3.5 py-2 text-[12.5px] font-bold transition-colors ${
                    bulanPilih === b
                      ? "border-primary bg-primary text-white"
                      : "border-line-2 bg-surface text-ink-soft hover:border-primary hover:text-primary"
                  }`}
                >
                  {labelBulan(b)}
                </button>
              ))}
            </div>
            <Segmen
              nilai={filterSpp}
              onChange={setFilterSpp}
              opsi={[
                { id: "Belum bayar", label: "Belum bayar" },
                { id: "semua", label: "Semua siswa" },
              ]}
            />
          </div>

          <div className="card-flat overflow-hidden">
            <div className="scroll-x">
              <table className="tabel">
                <thead>
                  <tr>
                    <th>Siswa</th>
                    <th>Kelas</th>
                    <th>WhatsApp wali</th>
                    <th className="text-right">Tagihan</th>
                    <th>Status</th>
                    <th className="text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {tagihanTampil.map((t) => {
                    const s = SISWA.find((x) => x.id === t.siswaId);
                    if (!s) return null;
                    return (
                      <tr key={`${t.siswaId}-${t.bulan}`}>
                        <td className="font-semibold text-ink">{s.nama}</td>
                        <td>{s.kelas}</td>
                        <td className="font-mono text-[12.5px]">{s.waWali}</td>
                        <td className="text-right font-mono font-bold text-ink">{rupiah(t.jumlah)}</td>
                        <td>
                          <StatusLencana status={t.status} />
                        </td>
                        <td className="text-right">
                          {t.status === "Belum bayar" ? (
                            <button
                              type="button"
                              onClick={() =>
                                tagihan.setData((semua) =>
                                  semua.map((x) =>
                                    x.siswaId === t.siswaId && x.bulan === t.bulan
                                      ? { ...x, status: "Lunas" }
                                      : x,
                                  ),
                                )
                              }
                              className="btn btn-primary btn-xs"
                            >
                              Tandai lunas
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                tagihan.setData((semua) =>
                                  semua.map((x) =>
                                    x.siswaId === t.siswaId && x.bulan === t.bulan
                                      ? { ...x, status: "Belum bayar" }
                                      : x,
                                  ),
                                )
                              }
                              className="btn btn-ghost btn-xs"
                            >
                              Batalkan
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {tagihanTampil.length === 0 && (
              <p className="px-4 py-8 text-center text-[12.5px] text-muted">
                Semua tagihan {labelBulan(bulanPilih)} sudah lunas.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
