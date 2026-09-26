"use client";

import React, { useEffect } from "react";
import { useAdminContext } from "@/context/AdminContext";
import { ADMIN_MENU_ITEMS } from "@/lib/constants/admin-menu";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  Layers,
  HelpCircle,
  Images,
  Info,
  Calendar,
  LogOut,
  Settings,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  BarChart3,
  Users,
  Layers,
  HelpCircle,
  Images,
  Info,
  Calendar,
};

export const ADMIN_SIDEBAR_ID = "admin-sidebar";

export default function AdminSidebar() {
  const { sidebarOpen, setSidebarOpen, logout } = useAdminContext();
  const pathname = usePathname();

  // Drawer mobile ditutup dengan Esc. Efek ini hanya memasang listener DOM
  // (bukan setState langsung di body efek).
  useEffect(() => {
    if (!sidebarOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen, setSidebarOpen]);

  const isActive = (href: string) => {
    if (href === "/admin" && pathname === "/admin") return true;
    if (href !== "/admin" && pathname.startsWith(href)) return true;
    return false;
  };

  const getIcon = (iconName: string) => {
    // Map eksplisit (bukan `import * as Icons` + index dinamis) — mempertahankan
    // tree-shaking, karena bundler hanya bisa membuang ikon yang tidak pernah
    // direferensikan langsung (lihat audit P2).
    const IconComponent = ICON_MAP[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  // Di mobile, memilih menu menutup drawer supaya halaman tujuan langsung
  // terlihat. Di desktop tidak berpengaruh (sidebar selalu tampil via CSS).
  const closeDrawer = () => setSidebarOpen(false);

  return (
    <>
      {sidebarOpen && (
        <div
          aria-hidden="true"
          onClick={closeDrawer}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/*
        Mobile: drawer fixed yang digeser keluar layar saat tertutup.
        Desktop (md+): static & selalu tampil, state `sidebarOpen` diabaikan.
        Sebelumnya posisi dianimasikan framer-motion berdasarkan sidebarOpen
        untuk SEMUA ukuran layar, sehingga default-nya harus `true` — yang
        membuat drawer langsung menutupi konten di mobile.
      */}
      <aside
        id={ADMIN_SIDEBAR_ID}
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-admin-border bg-white pt-6 transition-transform duration-300 ease-out md:static md:z-10 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg">
              <Image
                src="/images/maskot-temantumbuh.jpg"
                alt="Teman Tumbuh"
                fill
                sizes="40px"
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
          {ADMIN_MENU_ITEMS.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeDrawer}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between rounded-lg px-4 py-3 transition hover:translate-x-1 ${
                  active
                    ? "bg-[#f0f8f2] font-semibold text-primary"
                    : "text-[#556658] hover:bg-admin-bg"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={active ? "text-primary" : "text-muted"}>
                    {getIcon(item.icon)}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </span>
                {item.badge ? (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 px-4 py-4">
          <Link
            href="/feed"
            onClick={closeDrawer}
            className="block w-full rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary-hover active:scale-[0.98]"
          >
            Add New Post
          </Link>

          <div className="space-y-1 border-t border-admin-border pt-3">
            <Link
              href="/admin/settings"
              onClick={closeDrawer}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#556658] transition hover:bg-admin-bg"
            >
              <Settings size={18} className="text-muted" />
              Settings
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
      </aside>
    </>
  );
}
