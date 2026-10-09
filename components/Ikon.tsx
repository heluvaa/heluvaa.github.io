type Nama =
  | "kode"
  | "cepat"
  | "revisi"
  | "rawat"
  | "wa"
  | "panah"
  | "panahMiring"
  | "centang"
  | "chevron"
  | "cari"
  | "menu"
  | "kartu";

const PATH: Record<Nama, string> = {
  kode: "M8 7l-4 5 4 5M16 7l4 5-4 5M13.5 4l-3 16",
  cepat: "M13 2L4.5 13H11l-1 9L18.5 11H12l1-9z",
  revisi: "M20 11a8 8 0 10-2.6 5.9M20 5v6h-6",
  rawat:
    "M12 21s-7-4.4-7-9.5A4.5 4.5 0 0112 8a4.5 4.5 0 017 3.5C19 16.6 12 21 12 21z",
  wa: "M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z",
  panah: "M5 12h13M12 5l7 7-7 7",
  panahMiring: "M7 17L17 7M17 7h-7.5M17 7v7.5",
  centang: "M5 13l4 4L19 7",
  chevron: "M6 9l6 6 6-6",
  cari: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  menu: "M4 7h16M4 12h16M4 17h16",
  kartu: "M6 2h9l4 4v16H6zM15 2v5h5",
};

export default function Ikon({
  nama,
  ukuran = 18,
  tebal = 1.8,
  className,
}: {
  nama: Nama;
  ukuran?: number;
  tebal?: number;
  className?: string;
}) {
  return (
    <svg
      width={ukuran}
      height={ukuran}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth={tebal}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={PATH[nama]} />
    </svg>
  );
}
