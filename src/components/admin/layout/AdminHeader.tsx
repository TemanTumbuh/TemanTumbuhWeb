"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminContext } from "@/context/AdminContext";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  LogOut,
  Menu,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import UserAvatar from "@/components/UserAvatar";
import { useDismiss } from "@/hooks/useDismiss";
import { ADMIN_MENU_ITEMS } from "@/lib/constants/admin-menu";
import { ADMIN_SIDEBAR_ID } from "./AdminSidebar";

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  moderator: "Moderator",
};

const MENU_ITEM_CLASS =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-heading transition hover:bg-[#f0f8f2]";

/** Label menu sidebar yang sedang aktif — logika pencocokan sama dengan sidebar. */
function getPageLabel(pathname: string) {
  const match = ADMIN_MENU_ITEMS.find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href),
  );
  return match?.label ?? "Dashboard";
}

export default function AdminHeader() {
  const { currentAdmin, sidebarOpen, setSidebarOpen, logout } =
    useAdminContext();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useDismiss(menuRef, menuOpen, () => setMenuOpen(false));

  const adminName = currentAdmin?.name || "Admin";
  const roleLabel = ROLE_LABELS[currentAdmin?.role || "admin"] || "Admin";

  return (
    // z-30: di bawah overlay (z-40) & drawer sidebar mobile (z-50), supaya
    // drawer tidak tertutup header saat dibuka.
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-admin-border bg-white px-4 shadow-sm sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Tutup menu samping" : "Buka menu samping"}
          aria-expanded={sidebarOpen}
          aria-controls={ADMIN_SIDEBAR_ID}
          className="rounded-lg p-2 text-[#556658] transition hover:bg-admin-bg md:hidden"
        >
          <Menu size={20} />
        </motion.button>

        {/*
          Menggantikan kolom search global yang belum terhubung ke apa pun.
          Terutama berguna di mobile, saat sidebar tersembunyi dan admin perlu
          tahu sedang berada di halaman mana.
        */}
        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex items-center gap-1.5 text-sm">
            <li className="hidden text-muted sm:block">Admin</li>
            <li aria-hidden="true" className="hidden text-muted sm:block">
              <ChevronRight size={14} />
            </li>
            <li
              aria-current="page"
              className="truncate font-semibold text-heading"
            >
              {getPageLabel(pathname)}
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          aria-label="Notifikasi (ada yang belum dibaca)"
          className="relative rounded-lg p-2 text-[#556658] transition hover:bg-admin-bg"
        >
          <Bell size={20} />
          <span
            aria-hidden="true"
            className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"
          />
        </motion.button>

        <div className="h-6 w-px bg-admin-border" />

        {/*
          Dropdown akun — pola yang sama dengan navbar situs utama. Menggantikan
          ikon Settings (tidak berfungsi, dobel dengan sidebar) dan menjadi
          tempat tombol Keluar yang sebelumnya ada di bawah sidebar.
        */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label={`Menu akun ${adminName}`}
            className="flex items-center gap-3 rounded-full py-1 pl-1 pr-2 transition hover:bg-admin-bg sm:pl-3"
          >
            <span className="hidden text-right sm:block">
              <span className="block text-sm font-semibold text-heading">
                {adminName}
              </span>
              <span className="block text-xs text-muted">{roleLabel}</span>
            </span>
            <UserAvatar src={currentAdmin?.avatar} name={adminName} size={36} />
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={`text-muted transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {menuOpen && (
            <div
              role="menu"
              aria-label={`Menu akun ${adminName}`}
              className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-admin-border bg-white p-2 shadow-[0_16px_40px_-12px_rgba(20,32,24,0.25)]"
            >
              <Link
                href="/profile"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className={MENU_ITEM_CLASS}
              >
                <UserRound size={18} className="text-primary" />
                Profil Saya
              </Link>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className={MENU_ITEM_CLASS}
              >
                <ExternalLink size={18} className="text-primary" />
                Lihat Situs
                <span className="sr-only">(membuka tab baru)</span>
              </a>

              <div className="my-1 h-px bg-admin-border" aria-hidden="true" />

              <button
                type="button"
                role="menuitem"
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={18} />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
