"use client";

import React from "react";
import { useAdminContext } from "@/context/AdminContext";
import { Bell, Settings, Menu } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  moderator: "Moderator",
};

export default function AdminHeader() {
  const { currentAdmin, sidebarOpen, setSidebarOpen } = useAdminContext();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-admin-border bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-[#556658] transition hover:bg-admin-bg md:hidden"
        >
          <Menu size={20} />
        </motion.button>

        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search analytics, users, or posts..."
            className="w-80 rounded-full bg-admin-bg px-4 py-2 text-sm text-[#556658] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative rounded-lg p-2 text-[#556658] transition hover:bg-admin-bg"
        >
          <Bell size={20} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg p-2 text-[#556658] transition hover:bg-admin-bg"
        >
          <Settings size={20} />
        </motion.button>

        <div className="h-6 w-px bg-admin-border" />

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-heading">
              {currentAdmin?.name || "Admin User"}
            </p>
            <p className="text-xs text-muted">
              {ROLE_LABELS[currentAdmin?.role || "admin"] || "Admin"}
            </p>
          </div>

          {currentAdmin?.avatar ? (
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image
                src={currentAdmin.avatar}
                alt={currentAdmin.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {currentAdmin?.name?.charAt(0).toUpperCase() || "A"}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
