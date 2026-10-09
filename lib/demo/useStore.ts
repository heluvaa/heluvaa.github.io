"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * State yang disimpan di localStorage browser.
 *
 * Dipakai semua demo supaya perubahan yang dilakukan pengunjung
 * (pesanan, booking, absensi) tetap ada saat halaman dimuat ulang —
 * tanpa server, tanpa database.
 *
 * `siap` menandai bahwa pembacaan localStorage sudah selesai, supaya
 * halaman tidak menimpa data tersimpan dengan data awal.
 */
export function useStore<T>(kunci: string, awal: T) {
  const [data, setData] = useState<T>(awal);
  const [siap, setSiap] = useState(false);
  const awalRef = useRef(awal);

  useEffect(() => {
    try {
      const mentah = window.localStorage.getItem(kunci);
      if (mentah) {
        const parsed = JSON.parse(mentah) as T;
        if (parsed !== null && typeof parsed === "object") setData(parsed);
      }
    } catch {
      /* data rusak atau localStorage diblokir — pakai data awal */
    }
    setSiap(true);
  }, [kunci]);

  useEffect(() => {
    if (!siap) return;
    try {
      window.localStorage.setItem(kunci, JSON.stringify(data));
    } catch {
      /* kuota penuh atau diblokir — abaikan, demo tetap jalan di memori */
    }
  }, [kunci, data, siap]);

  const reset = useCallback(() => {
    setData(awalRef.current);
  }, []);

  return { data, setData, reset, siap };
}
