import Link from "next/link";
import styles from "@/styles/auth.module.css";

export default function Register() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Gabung Komunitas</h1>
        <p className={styles.subtitle}>Mulai perjalanan pertumbuhanmu bersama kami</p>

        <form>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Nama Lengkap</label>
            <input 
              type="text" 
              id="name" 
              className={styles.input} 
              placeholder="Masukkan nama lengkap kamu" 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className={styles.input} 
              placeholder="Masukkan email kamu" 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Kata Sandi</label>
            <input 
              type="password" 
              id="password" 
              className={styles.input} 
              placeholder="Buat kata sandi minimal 8 karakter" 
              required 
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Daftar Sekarang
          </button>
        </form>

        <div className={styles.switchAuth}>
          Sudah punya akun? <Link href="/login">Masuk di sini</Link>
        </div>
      </div>
    </div>
  );
}
