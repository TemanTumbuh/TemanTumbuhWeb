import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.textContent}>
        <h1 className={styles.title}>Lingkungan yang tepat bisa mengubah segalanya</h1>
        <p className={styles.description}>
          Temukan komunitas yang mendukung pertumbuhan karaktermu. Kami percaya adalah benih, dan komunitas adalah tanah yang subur.
        </p>
        <Link href="/register">
          <button className={`btn-primary ${styles.btnPrimary}`}>
            Gabung Komunitas &rarr;
          </button>
        </Link>
      </div>

      <div className={styles.imageContent}>
        <div className={styles.heroImageContainer}>
          {/* We use next/image. Ensure we have the public/images/hero.png */}
          <Image 
            src="/images/hero.png" 
            alt="Ilustrasi Teman Tumbuh" 
            fill 
            className={styles.heroImage}
            priority
          />
        </div>
        <div className={styles.memberBadge}>
          <span className={styles.memberCount}>12k+</span>
          <span className={styles.memberLabel}>MEMBER</span>
        </div>
      </div>
    </div>
  );
}
