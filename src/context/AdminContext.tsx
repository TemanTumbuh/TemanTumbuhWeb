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

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
      permissions: [
        "view_dashboard",
        "manage_users",
        "manage_categories",
        "manage_faqs",
        "manage_gallery",
        "manage_content",
      ],
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
