// ============================================
// Tipe data feed — mengikuti bentuk response backend apa adanya
// (`GET /api/v1/posts`, `GET /api/v1/categories`). Post & kategori sudah
// camelCase dari backend, jadi tidak perlu dinormalisasi.
// ============================================

export interface PostCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PostAuthor {
  id: string;
  username: string;
  avatarUrl: string | null;
}

export interface PostMedia {
  id: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  sortOrder: number;
}

export interface Post {
  id: string;
  /** Bisa null untuk post yang hanya berisi gambar. */
  content: string | null;
  isPinned: boolean;
  /** ISO 8601, mis. "2026-07-16T13:48:22.043081+00:00". */
  createdAt: string;
  category: PostCategory | null;
  /** Null bila akun pembuatnya sudah tidak ada. */
  author: PostAuthor | null;
  media: PostMedia[];
  likesCount: number;
  commentsCount: number;
  /**
   * Belum dikirim backend (gap G9). Opsional supaya tipe ini tetap benar
   * setelah backend menambahkannya.
   */
  likedByMe?: boolean;
}

/** Satu halaman feed (cursor-based pagination). */
export interface PostPage {
  posts: Post[];
  /** Id post terakhir di halaman ini; null bila sudah halaman terakhir. */
  nextCursor: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}
