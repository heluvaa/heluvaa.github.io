import type { Metadata } from "next";
import AdminSekolah from "@/components/demo/AdminSekolah";
import DemoShell from "@/components/demo/DemoShell";

export const metadata: Metadata = {
  title: "Demo Administrasi Sekolah",
  description:
    "Demo aplikasi administrasi sekolah: absensi, nilai dan rapor, tagihan SPP, serta laporan untuk kepala sekolah.",
};

export default function HalamanDemoSekolah() {
  return (
    <DemoShell
      judul="Administrasi Sekolah"
      subjudul="MTs Nurul Hikmah — absensi, nilai, dan tagihan SPP"
      pesanOrder="Halo, saya tertarik dengan aplikasi Administrasi Sekolah untuk madrasah/sekolah kami."
    >
      <AdminSekolah />
    </DemoShell>
  );
}
