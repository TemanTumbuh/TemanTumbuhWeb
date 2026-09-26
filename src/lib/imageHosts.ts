/**
 * Satu-satunya daftar host gambar eksternal yang diizinkan.
 *
 * Dipakai di dua tempat sekaligus supaya tidak pernah berbeda:
 *  1. `next.config.ts` → `images.remotePatterns` (izin resmi next/image)
 *  2. `isAllowedImageSrc()` di bawah, untuk memeriksa URL SEBELUM dirender
 *
 * Kenapa pemeriksaan (2) perlu: `next/image` MELEMPAR error saat diberi host
 * di luar daftar, bukan sekadar gagal memuat gambar. Karena URL avatar bisa
 * berasal dari input bebas pengguna (Edit Profil) atau dari sesi lama yang
 * tersimpan di localStorage, satu URL buruk bisa menumbangkan seluruh
 * halaman. Jadi URL-nya diperiksa dulu, yang tidak lolos jatuh ke inisial.
 */
export const ALLOWED_IMAGE_HOSTS = [
  "randomuser.me",
  "images.unsplash.com",
  // Media post — Cloudflare R2 public bucket (dari GET /api/v1/posts).
  "pub-751cd5d3ba5f47189324ca8d8fe8691c.r2.dev",
  // Avatar Google — untuk Google SSO nanti.
  "lh3.googleusercontent.com",
] as const;

/** `true` bila `src` aman diberikan ke `next/image`. */
export function isAllowedImageSrc(src: string | undefined | null): src is string {
  if (!src) return false;

  // Aset lokal di /public selalu aman.
  if (src.startsWith("/")) return true;

  try {
    return (ALLOWED_IMAGE_HOSTS as readonly string[]).includes(
      new URL(src).hostname,
    );
  } catch {
    return false; // bukan URL absolut yang valid
  }
}
