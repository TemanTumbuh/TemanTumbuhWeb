"use client";

import { useEffect, useState } from "react";

/**
 * Mengembalikan `value` setelah tidak berubah selama `delay` ms. Dipakai untuk
 * input pencarian supaya request baru dikirim saat pengguna berhenti mengetik,
 * bukan di setiap ketukan.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
