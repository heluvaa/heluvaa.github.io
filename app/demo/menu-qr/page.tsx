import type { Metadata } from "next";
import DemoShell from "@/components/demo/DemoShell";
import MenuQr from "@/components/demo/MenuQr";

export const metadata: Metadata = {
  title: "Demo Menu Digital QR",
  description:
    "Demo aplikasi menu digital QR: pelanggan pesan dari meja, pesanan langsung masuk ke papan dapur.",
};

export default function HalamanDemoMenuQr() {
  return (
    <DemoShell
      judul="Menu Digital QR"
      subjudul="Kedai Sari Rasa — pesan dari meja, pesanan masuk ke papan dapur"
      pesanOrder="Halo, saya tertarik dengan aplikasi Menu Digital QR untuk usaha saya."
    >
      <MenuQr />
    </DemoShell>
  );
}
