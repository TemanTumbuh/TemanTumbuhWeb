import Link from "next/link";
import styles from "@/styles/auth.module.css";

export default function Login() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Selamat Datang Kembali</h1>
        <p className={styles.subtitle}>Masuk ke akun Teman Tumbuh kamu</p>

        <form>
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
              placeholder="Masukkan kata sandi" 
              required 
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Masuk
          </button>
        </form>

        <div className={styles.switchAuth}>
          Belum punya akun? <Link href="/register">Daftar sekarang</Link>
        </div>
      </div>
    </div>
  );
}
