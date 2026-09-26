"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMounted } from "@/hooks/useMounted";
import { useDismiss } from "@/hooks/useDismiss";
import UserAvatar from "@/components/UserAvatar";

// Hijau hidup untuk state aktif/hover/CTA — sengaja lebih jenuh daripada
// --color-primary (#3a5a40) yang dipakai di sisi lain aplikasi. Perubahan ini
// scoped ke Navbar sesuai permintaan ("warna hijaunya kurang hidup"), bukan
// perubahan token warna global.
const NAV_VIVID = "#2f8f4e";
const NAV_VIVID_DARK = "#1f6b39";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  // Lihat audit C3 — sebelumnya `typeof window !== "undefined"` dievaluasi di
  // body komponen sehingga bernilai berbeda antara render server (false) dan
  // render client (true) pada pass yang sama, memicu hydration mismatch.
  const mounted = useMounted();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    setUserMenuOpen(false);
    router.push("/");
  };

  // Tutup popup saat klik di luar area atau tekan Escape.
  useDismiss(userMenuRef, userMenuOpen, () => setUserMenuOpen(false));

  const navLinks = [
    { name: "Komunitas", href: "/" },
    { name: "Tentang kami", href: "/#tentang-kami" },
    { name: "Visi & Misi", href: "/#visi-misi" },
    { name: "Feed", href: "/feed" },
    { name: "Agenda Mendatang", href: "/jadwal-aktivitas" },
  ];

  const isAdmin = currentUser?.role === "admin";

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50 bg-[#f4fbf4]/80 backdrop-blur-md border-b border-[#e1ebdc]/50">
      <div className="max-w-360 mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-12 w-30 shrink-0">
          <Image
            src="/images/maskot-temantumbuh.jpg"
            alt="Teman Tumbuh Logo"
            fill
            sizes="120px"
            className="object-contain mix-blend-multiply drop-shadow-sm"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href === "/" && pathname === "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                style={isActive ? { color: NAV_VIVID } : undefined}
                className={`text-[14px] lg:text-[15px] font-medium transition-all relative py-2 ${
                  isActive ? "font-bold" : "text-[#849988] hover:text-[#2f8f4e]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span
                    style={{ backgroundColor: NAV_VIVID }}
                    className="absolute bottom-0 left-0 w-full h-0.75 rounded-t-md"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Section (Auth) */}
        <div className="hidden md:flex items-center gap-3">
          {mounted && isLoggedIn && currentUser ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                className="flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 transition hover:bg-[#eaf6ee]"
              >
                <UserAvatar src={currentUser.avatar} name={currentUser.name} size={32} />
                <span className="text-sm font-semibold text-[#2f4a35]">
                  {currentUser.name}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-[#6c8571] transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  aria-label={`Menu akun ${currentUser.name}`}
                  className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-[#e1ebdc] bg-white p-2 shadow-[0_16px_40px_-12px_rgba(20,32,24,0.25)]"
                >
                  <Link
                    href="/profile"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#2f4a35] transition hover:bg-[#eaf6ee]"
                  >
                    <UserRound size={18} className="text-[#2f8f4e]" />
                    Profil Saya
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#2f4a35] transition hover:bg-[#eaf6ee]"
                    >
                      <LayoutDashboard size={18} className="text-[#2f8f4e]" />
                      Dashboard Admin
                    </Link>
                  )}

                  <div className="my-1 h-px bg-[#eef2ec]" aria-hidden="true" />

                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#6c8571] transition hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut size={18} />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[14px] lg:text-[15px] font-bold text-[#4c5e50] hover:text-[#2f8f4e] transition"
              >
                Masuk
              </Link>
              <Link href="/register">
                <button
                  style={{ backgroundColor: NAV_VIVID }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = NAV_VIVID_DARK;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = NAV_VIVID;
                  }}
                  className="text-white px-6 py-2.5 rounded-full font-bold text-[14px] lg:text-[15px] shadow-[0_10px_25px_-8px_rgba(47,143,78,0.55)] transition-transform transform hover:-translate-y-0.5"
                >
                  Gabung Komunitas
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden text-[#2f8f4e] p-2"
          onClick={toggleMenu}
          aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl flex flex-col px-6 py-6 border-t border-gray-100"
        >
          <div className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={pathname === link.href ? { color: NAV_VIVID } : undefined}
                className={`text-[16px] font-medium py-2 border-b border-gray-50 ${
                  pathname === link.href ? "font-bold" : "text-[#6c8571]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {mounted && isLoggedIn && currentUser ? (
              <>
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <UserAvatar src={currentUser.avatar} name={currentUser.name} size={40} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{currentUser.bio}</p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full border-2 border-[#2f8f4e] text-[#2f8f4e] py-3 rounded-full font-bold text-[16px] flex items-center justify-center gap-2"
                >
                  <UserRound size={18} />
                  Profil Saya
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full border-2 border-[#2f8f4e] text-[#2f8f4e] py-3 rounded-full font-bold text-[16px] flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-50 text-red-700 py-3 rounded-full font-bold text-[16px] hover:bg-red-100 transition flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full border-2 border-[#2f8f4e] text-[#2f8f4e] py-3 rounded-full font-bold text-[16px]">
                    Masuk
                  </button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <button
                    style={{ backgroundColor: NAV_VIVID }}
                    className="w-full text-white py-3 rounded-full font-bold text-[16px]"
                  >
                    Gabung Komunitas
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
