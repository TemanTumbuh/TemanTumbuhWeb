/**
 * NON-SECURITY — penanda admin sementara di sisi FE.
 *
 * Backend sudah menegakkan izin (RBAC) di setiap endpoint, tapi `/auth/me`
 * belum mengirim nama role maupun permission (gap N2 di laporan Gap Backend).
 * Sampai itu tersedia, FE menandai admin dari daftar email di env
 * `NEXT_PUBLIC_ADMIN_EMAILS` (dipisah koma) — HANYA untuk menampilkan menu
 * & membuka halaman /admin. Mengakali daftar ini tidak memberi akses apa pun ke
 * data admin karena backend tetap menolak tanpa permission yang sesuai.
 *
 * Hapus file ini begitu `/auth/me` mengirim `role`/`permissions`.
 */
const ADMIN_EMAILS = new Set(
  (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
);

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.has(email.trim().toLowerCase());
}
