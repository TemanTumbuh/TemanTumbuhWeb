"use client";

import React from "react";
import { useAdminContext } from "@/context/AdminContext";
import { ADMIN_MENU_ITEMS } from "@/lib/constants/admin-menu";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LogOut, Settings } from "lucide-react";

export default function AdminSidebar() {
  const { sidebarOpen, setSidebarOpen, logout } = useAdminContext();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin" && pathname === "/admin") return true;
    if (href !== "/admin" && pathname.startsWith(href)) return true;
    return false;
  };

  const getIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  return (
    <>
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <motion.aside
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col overflow-y-auto border-r border-admin-border bg-white pt-6 md:static md:z-10"
      >
        <div className="mb-8 px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg">
              <Image
                src="/images/maskot-temantumbuh.jpg"
                alt="Teman Tumbuh"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-heading">
                Teman Tumbuh
              </p>
              <p className="text-xs text-muted">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {ADMIN_MENU_ITEMS.map((item) => (
            <Link key={item.id} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center justify-between rounded-lg px-4 py-3 transition ${
                  isActive(item.href)
                    ? "bg-[#f0f8f2] font-semibold text-primary"
                    : "text-[#556658] hover:bg-admin-bg"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={
                      isActive(item.href) ? "text-primary" : "text-muted"
                    }
                  >
                    {getIcon(item.icon)}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </motion.div>
            </Link>
          ))}
        </nav>

        <div className="space-y-3 px-4 py-4">
          <Link href="/feed">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Add New Post
            </motion.button>
          </Link>

          <div className="space-y-1 border-t border-admin-border pt-3">
            <Link href="/admin/settings">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#556658] transition hover:bg-admin-bg">
                <Settings size={18} className="text-muted" />
                Settings
              </div>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <p className="text-center text-xs text-muted">
            © 2026 Teman Tumbuh
          </p>
        </div>
      </motion.aside>
    </>
  );
}
