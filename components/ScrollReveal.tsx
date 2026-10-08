"use client";

import { useEffect } from "react";

/**
 * Satu-satunya perilaku client-side untuk animasi scroll.
 * Menambah `.is-visible` pada setiap elemen `.reveal` begitu masuk viewport,
 * lalu berhenti mengamatinya (sekali jalan, tidak bolak-balik).
 */
export default function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    // Fallback: browser tanpa IntersectionObserver → tampilkan semua.
    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
