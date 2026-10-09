import type { Metadata } from "next";
import BookingJasa from "@/components/demo/BookingJasa";
import DemoShell from "@/components/demo/DemoShell";

export const metadata: Metadata = {
  title: "Demo Booking & Reservasi Jasa",
  description:
    "Demo aplikasi booking: pelanggan memilih jadwal sendiri, pemilik mengelola antrian dan melihat laporan.",
};

export default function HalamanDemoBooking() {
  return (
    <DemoShell
      judul="Booking & Reservasi"
      subjudul="Cukur & Co — jadwal salon dan barbershop"
      pesanOrder="Halo, saya tertarik dengan aplikasi Booking & Reservasi untuk usaha jasa saya."
    >
      <BookingJasa />
    </DemoShell>
  );
}
