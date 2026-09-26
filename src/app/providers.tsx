"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { AuthProvider } from "@/context/AuthContext";

/**
 * Provider global aplikasi. Dirender oleh `app/layout.tsx` menggantikan
 * `<AuthProvider>` telanjang.
 */
export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/*
        reducedMotion="user": semua animasi framer-motion di aplikasi otomatis
        dilucuti (hanya opacity, tanpa transform/scale/posisi) saat OS/browser
        pengguna mengaktifkan "Reduce motion". Satu baris ini menutup semua
        animasi initial/whileHover di seluruh app (audit A5) tanpa menyentuh
        tiap komponen satu per satu.
      */}
      <MotionConfig reducedMotion="user">
        <AuthProvider>{children}</AuthProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
}
