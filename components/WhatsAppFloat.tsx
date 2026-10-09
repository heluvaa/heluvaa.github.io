import { whatsapp } from "@/lib/content";
import { waLink } from "@/lib/utils";

/**
 * Tombol WhatsApp mengapung di kanan bawah — muncul di semua halaman.
 * Memakai tautan wa.me langsung (bukan widget pihak ketiga) supaya
 * tidak ada skrip eksternal yang ikut dimuat.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={waLink(whatsapp.nomor, whatsapp.pesanDefault)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-wa pl-3.5 pr-3.5 py-3.5 text-[#05301a] shadow-[0_14px_34px_-12px_rgba(37,211,102,.85)] transition-transform duration-300 hover:scale-105 sm:pr-5"
    >
      <span className="wa-pulse grid h-6 w-6 place-items-center rounded-full">
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.86 9.86 0 004.68 1.19h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2zm5.76 14.03c-.24.68-1.42 1.31-1.95 1.36-.53.05-1.02.24-3.44-.72-2.92-1.15-4.75-4.2-4.9-4.4-.14-.19-1.15-1.55-1.15-2.96 0-1.4.73-2.09 1-2.38.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.63.49.24.58.8 2 .87 2.14.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.14-.3.3-.13.59.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.44.29.15.46.12.63-.07.17-.19.72-.85.92-1.14.19-.29.39-.24.65-.15.27.1 1.68.8 1.97.94.29.15.48.22.55.34.07.13.07.73-.17 1.42z" />
        </svg>
      </span>
      <span className="hidden text-[14px] font-bold sm:block">Tanya via WhatsApp</span>
    </a>
  );
}
