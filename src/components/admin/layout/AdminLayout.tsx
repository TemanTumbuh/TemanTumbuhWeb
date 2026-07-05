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
  const { currentUser, isLoggedIn } = useAuth();
  const router = useRouter();
  const isAdmin = isLoggedIn && currentUser?.role === "admin";

  useEffect(() => {
    if (!isLoggedIn || currentUser?.role !== "admin") {
      router.push("/login");
    }
  }, [isLoggedIn, currentUser, router]);

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-admin-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-admin-bg">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
