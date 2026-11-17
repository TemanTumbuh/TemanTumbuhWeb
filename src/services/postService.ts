import { http, unwrapData } from "@/lib/http";
import type { PostPage } from "@/types/post.types";

/** Batas atas dari backend (`Math.min(limit, 50)` di postService BE). */
export const MAX_POSTS_PER_PAGE = 50;

export interface ListPostsParams {
  limit?: number;
  /** Id post terakhir dari halaman sebelumnya. */
  cursor?: string;
  /** UUID kategori; kosong = semua kategori. */
  categoryId?: string | null;
  signal?: AbortSignal;
}

/** `GET /api/v1/posts` — publik, terbaru lebih dulu. */
export async function listPosts({
  limit,
  cursor,
  categoryId,
  signal,
}: ListPostsParams = {}): Promise<PostPage> {
  const body = await http.get("/api/v1/posts", {
    query: { limit, cursor, categoryId },
    signal,
  });
  const page = unwrapData<PostPage>(body);

  // Jaga-jaga bila bentuk response berubah: jangan biarkan UI crash karena
  // `posts` undefined.
  return {
    posts: page?.posts ?? [],
    nextCursor: page?.nextCursor ?? null,
  };
}
