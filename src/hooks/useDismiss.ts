"use client";

import { useEffect, type RefObject } from "react";

/**
 * Menutup popup (dropdown/menu) saat pengguna mengklik di luar `ref` atau
 * menekan Escape. Listener hanya terpasang selama `open` bernilai true.
 *
 * Dipakai menu akun di Navbar situs dan di header admin supaya perilakunya
 * identik.
 */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  onDismiss: () => void,
) {
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onDismiss();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, open, onDismiss]);
}
