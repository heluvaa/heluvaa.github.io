import type { Metadata } from "next";
import DemoShell from "@/components/demo/DemoShell";
import TokoOnline from "@/components/demo/TokoOnline";

export const metadata: Metadata = {
  title: "Demo Toko Online",
  description:
    "Demo toko online UMKM: katalog produk, keranjang, checkout lewat WhatsApp, dan panel kelola produk.",
};

export default function HalamanDemoToko() {
  return (
    <DemoShell
      judul="Toko Online"
      subjudul="Dapur Bu Nia — katering rumahan & frozen food"
      pesanOrder="Halo, saya tertarik dengan aplikasi Toko Online untuk usaha saya."
    >
      <TokoOnline />
    </DemoShell>
  );
}
