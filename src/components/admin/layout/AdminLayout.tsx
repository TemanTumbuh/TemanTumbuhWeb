"use client";

import React, { useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { currentUser, isLoggedIn, isReady } = useAuth();
  const router = useRouter();
  const isAdmin = isLoggedIn && currentUser?.role === "admin";

  useEffect(() => {
    // Selama hydration sesi belum terbaca (currentUser masih null) — jangan
    // redirect dulu, atau admin yang sudah login ikut terlempar ke /login.
    if (isReady && !isAdmin) {
      router.push("/login");
    }
  }, [isReady, isAdmin, router]);

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-admin-bg">
        <div
          role="status"
          aria-label="Memuat"
          className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-admin-bg">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
