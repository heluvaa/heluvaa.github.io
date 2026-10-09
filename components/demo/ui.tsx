import type { ReactNode } from "react";

/* ---------- Kartu angka ringkas ---------- */
export function Stat({
  label,
  nilai,
  catatan,
  nada = "netral",
}: {
  label: string;
  nilai: string;
  catatan?: string;
  nada?: "netral" | "baik" | "bahaya" | "aksen";
}) {
  const warna =
    nada === "baik"
      ? "text-good"
      : nada === "bahaya"
        ? "text-danger"
        : nada === "aksen"
          ? "text-primary"
          : "text-ink";

  return (
    <div className="card-flat p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {label}
      </p>
      <p className={`mt-1.5 text-[21px] font-extrabold tracking-tight ${warna}`}>
        {nilai}
      </p>
      {catatan && <p className="mt-0.5 text-[11.5px] text-muted">{catatan}</p>}
    </div>
  );
}

/* ---------- Judul bagian dalam demo ---------- */
export function JudulBagian({
  judul,
  ket,
  aksi,
}: {
  judul: string;
  ket?: string;
  aksi?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-[17px] font-extrabold tracking-tight text-ink">
          {judul}
        </h2>
        {ket && <p className="mt-0.5 text-[12.5px] text-muted">{ket}</p>}
      </div>
      {aksi}
    </div>
  );
}

/* ---------- Keadaan kosong ---------- */
export function Kosong({
  judul,
  ket,
  aksi,
}: {
  judul: string;
  ket: string;
  aksi?: ReactNode;
}) {
  return (
    <div className="card-flat flex flex-col items-center px-6 py-12 text-center">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-bg-soft text-muted">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        >
          <path d="M4 7h16v13H4zM4 7l2-3h12l2 3M9 11h6" />
        </svg>
      </div>
      <p className="mt-4 text-[15px] font-bold text-ink">{judul}</p>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted">
        {ket}
      </p>
      {aksi && <div className="mt-5">{aksi}</div>}
    </div>
  );
}

/* ---------- Pilihan bersegmen ---------- */
export function Segmen<T extends string>({
  opsi,
  nilai,
  onChange,
}: {
  opsi: { id: T; label: string }[];
  nilai: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="segmen" role="tablist">
      {opsi.map((o) => (
        <button
          key={o.id}
          type="button"
          role="tab"
          aria-selected={nilai === o.id}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Lencana status ---------- */
export function StatusLencana({ status }: { status: string }) {
  const map: Record<string, string> = {
    Baru: "badge-accent",
    Diproses: "badge-accent",
    Siap: "badge-good",
    Selesai: "badge-good",
    Dikirim: "badge-accent",
    Batal: "badge-danger",
    Terkonfirmasi: "badge-good",
    Menunggu: "badge-accent",
    Hadir: "badge-good",
    Terlambat: "badge-accent",
    Sakit: "badge-accent",
    Izin: "badge-accent",
    Alpa: "badge-danger",
    Lunas: "badge-good",
    "Belum bayar": "badge-danger",
    "Sebagian": "badge-accent",
    Habis: "badge-danger",
    Tersedia: "badge",
    Aktif: "badge-good",
    Nonaktif: "badge-danger",
  };
  return <span className={`badge ${map[status] ?? "badge"}`}>{status}</span>;
}

/* ---------- Bungkus dengan bilah gulir horizontal ---------- */
export function Gulir({ children }: { children: ReactNode }) {
  return (
    <div className="scroll-x -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="min-w-[640px]">{children}</div>
    </div>
  );
}
