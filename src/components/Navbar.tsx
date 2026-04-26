"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Komunitas', href: '/' },
    { name: 'Tentang kami', href: '/#tentang-kami' },
    { name: 'Visi & Misi', href: '/#visi-misi' },
    { name: 'Agenda Mendatang', href: '/jadwal-aktivitas' },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50 bg-[#f4fbf4]/80 backdrop-blur-md border-b border-[#e1ebdc]/50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="relative h-12 w-[120px] shrink-0">
          <Image
            src="/images/maskot-temantumbuh.jpg"
            alt="Teman Tumbuh Logo"
            fill
            className="object-contain mix-blend-multiply drop-shadow-sm"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/' && pathname === '/');
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[14px] lg:text-[15px] font-medium transition-all relative py-2 ${
                  isActive ? 'text-[#3a5a40] font-bold' : 'text-[#849988] hover:text-[#3a5a40]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#3a5a40] rounded-t-md" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Section (Auth) */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/login" className="text-[14px] lg:text-[15px] font-bold text-[#4c5e50] hover:text-[#3a5a40] transition">
            Masuk
          </Link>
          <Link href="/register">
            <button className="bg-[#486a4e] hover:bg-[#324a35] text-white px-6 py-2.5 rounded-full font-bold text-[14px] lg:text-[15px] shadow-sm transition transform hover:-translate-y-0.5">
              Gabung Komunitas
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-[#3a5a40] p-2" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl flex flex-col px-6 py-6 border-t border-gray-100">
          <div className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[16px] font-medium py-2 border-b border-gray-50 ${
                  pathname === link.href ? 'text-[#3a5a40] font-bold' : 'text-[#6c8571]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full border-2 border-[#3a5a40] text-[#3a5a40] py-3 rounded-full font-bold text-[16px]">
                Masuk
              </button>
            </Link>
            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full bg-[#3a5a40] text-white py-3 rounded-full font-bold text-[16px]">
                Gabung Komunitas
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
