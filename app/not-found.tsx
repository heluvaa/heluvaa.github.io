import Link from "next/link";
import Ikon from "@/components/Ikon";

export default function NotFound() {
  return (
    <main className="relative grid min-h-[70vh] place-items-center overflow-hidden px-6">
      <div aria-hidden="true" className="deco absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-x-0 top-0 h-[360px] opacity-50" />
        <div className="glow-blue absolute left-1/2 top-[-8%] h-72 w-72 -translate-x-1/2" />
      </div>

      <div className="text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-[clamp(52px,15vw,110px)] font-extrabold leading-none tracking-[-0.05em] text-primary">
          404
        </h1>
        <p className="mt-5 text-[15px] text-muted">
          Halaman ini tidak ada. Mungkin salah ketik, atau sudah dipindahkan.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Kembali ke beranda
          </Link>
          <Link href="/katalog" className="btn btn-ghost">
            Lihat katalog
            <Ikon nama="panah" ukuran={16} tebal={2.2} />
          </Link>
        </div>
      </div>
    </main>
  );
}
