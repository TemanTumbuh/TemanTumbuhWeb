import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoTeman}>Teman</span>
            <span className={styles.logoTumbuh}>Tumbuh</span>
          </div>
          <p className={styles.description}>
            Temukan komunitas yang mendukung pertumbuhan karaktermu. Kami
            percaya adalah benih, dan komunitas adalah tanah yang subur.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4>Platform</h4>
            <Link href="/komunitas">Komunitas</Link>
            <Link href="/jadwal-aktivitas">Jadwal Aktivitas</Link>
            <Link href="/tentang-kami">Tentang Kami</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4>Bantuan</h4>
            <Link href="/faq">FAQ</Link>
            <Link href="/kontak">Hubungi Kami</Link>
            <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4>Media Sosial</h4>
            <Link href="https://instagram.com">Instagram</Link>
            <Link href="https://twitter.com">Twitter</Link>
            <Link href="https://linkedin.com">LinkedIn</Link>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} Teman Tumbuh. Hak cipta dilindungi.
        </p>
        <p>Dibuat dengan ❤️ di Indonesia</p>
      </div>
    </footer>
  );
}
