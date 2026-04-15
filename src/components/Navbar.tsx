"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoTeman}>Teman</span>
        <span className={styles.logoTumbuh}>Tumbuh</span>
      </Link>

      <button className={styles.menuToggle} onClick={toggleMenu}>
        ☰
      </button>

      <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <Link 
          href="/komunitas" 
          className={`${styles.navLink} ${pathname === '/komunitas' ? styles.navLinkActive : ''}`}
        >
          Komunitas
        </Link>
        <Link 
          href="/tentang-kami" 
          className={`${styles.navLink} ${pathname === '/tentang-kami' ? styles.navLinkActive : ''}`}
        >
          Tentang kami
        </Link>
        <Link 
          href="/jadwal-aktivitas" 
          className={`${styles.navLink} ${pathname === '/jadwal-aktivitas' ? styles.navLinkActive : ''}`}
        >
          Jadwal aktivitas
        </Link>
      </div>

      <div className={`${styles.authButtons} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <Link href="/login" className={styles.loginLink}>
          Masuk
        </Link>
        <Link href="/register">
          <button className="btn-primary">Gabung Komunitas</button>
        </Link>
      </div>
    </nav>
  );
}
