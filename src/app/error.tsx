"use client";

import { useEffect } from "react";

/**
 * Error boundary tingkat root. Menangkap error yang tidak tertangani (termasuk
 * `ApiError` yang dilempar dari lapisan service). `error.message` sudah berupa
 * kalimat siap-tampil untuk `ApiError`.
 */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-lg font-semibold text-[#1e2a22]">
        Ada yang tidak beres
      </h2>
      <p className="max-w-md text-sm text-[#5b675a]">
        {error?.message || "Terjadi kesalahan yang tidak terduga."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-[#2f4f24] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#28441f]"
      >
        Coba lagi
      </button>
    </div>
  );
}
