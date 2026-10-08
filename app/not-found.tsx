import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <div aria-hidden="true" className="deco absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-x-0 top-0 h-[420px]" />
        <div className="glow-neon absolute left-1/2 top-[-10%] h-[380px] w-[380px] -translate-x-1/2 opacity-45" />
      </div>

      <div className="text-center">
        <p className="mono-label">Error 404</p>
        <h1 className="mt-4 text-[clamp(52px,16vw,120px)] font-extrabold leading-none tracking-[-0.05em]">
          <span className="grad-text">404</span>
        </h1>
        <p className="mt-5 text-[15px] text-muted">
          Halaman ini tidak ada. Mungkin salah ketik, atau sudah dipindahkan.
        </p>
        <Link href="/" className="btn btn-primary mt-9">
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
