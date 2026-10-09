import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import WhatsAppFloat from "@/components/WhatsAppFloat";

/**
 * Layout situs pemasaran: navigasi, footer, dan tombol WhatsApp mengapung.
 * Halaman demo di /demo/* tidak memakai ini — mereka punya shell sendiri
 * supaya terasa seperti aplikasi, bukan bagian dari halaman jualan.
 */
export default function SitusLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
