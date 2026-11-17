import type { MockPost, User } from "@/types/feed.types";
import { DUMMY_POSTS, DUMMY_USERS } from "@/config/feedConfig";

/**
 * Format waktu relatif ("2 jam lalu", "1 hari lalu").
 * Menerima `Date` atau string ISO dari backend (mis. `post.createdAt`).
 */
export const formatDate = (input: Date | string): string => {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;

  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Truncate text to specified length with ellipsis
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

/**
 * Saran member di sidebar feed. Masih dummy: backend belum punya fitur
 * follow/saran (Fase 2, FE-27).
 */
export const getSuggestedUsers = (excludeUserId?: string): User[] => {
  return DUMMY_USERS.filter((user) => user.id !== excludeUserId).slice(0, 4);
};

/**
 * Postingan milik satu user, terbaru lebih dulu.
 *
 * Masih dari data dummy: backend belum menyediakan filter per-user di
 * `GET /api/v1/posts` (gap N7). Diganti saat integrasi profil (PR5).
 */
export const getPostsByUser = (userId: string): MockPost[] => {
  return DUMMY_POSTS.filter((post) => post.userId === userId).sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );
};

export interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
}

/**
 * Statistik untuk header profil.
 *
 * `posts` dihitung dari data yang ada. `followers`/`following` MASIH MOCK —
 * backend belum punya konsep follow sama sekali (tidak ada tabel maupun
 * endpoint-nya), jadi angkanya diturunkan secara deterministik dari id user
 * supaya konsisten antar render dan antara server & client.
 */
export const getProfileStats = (userId: string): ProfileStats => {
  const seed = Array.from(userId).reduce(
    (total, char) => total + char.charCodeAt(0),
    0,
  );

  return {
    posts: getPostsByUser(userId).length,
    followers: 120 + (seed % 880),
    following: 40 + (seed % 260),
  };
};
