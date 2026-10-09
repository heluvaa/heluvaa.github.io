import type { CSSProperties } from "react";
import Ikon from "@/components/Ikon";
import { faq, type Faq } from "@/lib/content";

/**
 * Accordion FAQ memakai <details>/<summary> bawaan HTML — bisa dibuka
 * tanpa JavaScript sama sekali. Tidak ada state, tidak ada library.
 */
export default function FaqList({
  batas,
  items,
}: {
  batas?: number;
  items?: Faq[];
}) {
  const daftar = (items ?? faq).slice(0, batas ?? undefined);

  return (
    <div className="space-y-3">
      {daftar.map((item, i) => (
        <details
          key={item.tanya}
          className="faq-item reveal"
          style={{ "--reveal-delay": `${i * 50}ms` } as CSSProperties}
        >
          <summary>
            <span>{item.tanya}</span>
            <Ikon nama="chevron" ukuran={18} tebal={2.2} className="chev" />
          </summary>
          <div className="faq-jawab">{item.jawab}</div>
        </details>
      ))}
    </div>
  );
}
