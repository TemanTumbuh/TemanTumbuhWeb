"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { AdminContextType, AdminUser } from "@/types/admin.types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ADMIN_PERMISSIONS } from "@/lib/constants/admin-menu";

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  // Hanya mengatur drawer di mobile — di desktop (md+) sidebar selalu tampil
  // lewat CSS. Default tertutup supaya konten tidak langsung tertutupi.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { currentUser, isLoggedIn, logout: authLogout } = useAuth();

  const currentAdmin = useMemo<AdminUser | null>(() => {
    if (!isLoggedIn || !currentUser || currentUser.role !== "admin") {
      return null;
    }

    return {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      role: "admin",
      avatar: currentUser.avatar,
      // Sumber tunggal: sebelumnya daftar ini ditulis ulang manual di sini dan
      // sudah menyimpang dari ADMIN_PERMISSIONS (kurang "view_analytics") — lihat
      // audit C8. Belum ada enforcement per-permission di UI; ini masih
      // representasi "admin = semua akses" sampai backend punya roles (gap G1).
      permissions: Object.values(ADMIN_PERMISSIONS),
    };
  }, [isLoggedIn, currentUser]);

  const logout = useCallback(() => {
    authLogout();
    router.push("/login");
  }, [authLogout, router]);

  const value: AdminContextType = {
    currentAdmin,
    isLoggedIn: !!currentAdmin,
    sidebarOpen,
    setSidebarOpen,
    logout,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within AdminProvider");
  }
  return context;
};
