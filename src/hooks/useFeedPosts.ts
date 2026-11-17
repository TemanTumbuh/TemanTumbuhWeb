"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { listPosts } from "@/services/postService";
import type { Post } from "@/types/post.types";

const PAGE_SIZE = 10;

/** Dipakai juga untuk invalidasi setelah membuat/menghapus post (PR4). */
export const feedPostsKey = (categoryId: string | null) =>
  ["posts", "feed", { categoryId }] as const;

/**
 * Feed dengan cursor-based pagination (`GET /api/v1/posts`).
 *
 * Tiap kategori punya cache sendiri, jadi berpindah kembali ke kategori yang
 * sudah pernah dibuka langsung menampilkan data tanpa menunggu.
 */
export function useFeedPosts(categoryId: string | null) {
  const query = useInfiniteQuery({
    queryKey: feedPostsKey(categoryId),
    queryFn: ({ pageParam, signal }) =>
      listPosts({ limit: PAGE_SIZE, cursor: pageParam, categoryId, signal }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  // Gabungkan semua halaman. Dedupe per id: bila ada post baru masuk di antara
  // dua halaman, post yang sama tidak dirender dua kali (key duplikat).
  const posts = useMemo<Post[]>(() => {
    const seen = new Set<string>();
    const merged: Post[] = [];
    for (const page of query.data?.pages ?? []) {
      for (const post of page.posts) {
        if (seen.has(post.id)) continue;
        seen.add(post.id);
        merged.push(post);
      }
    }
    return merged;
  }, [query.data]);

  return {
    posts,
    /** Pemuatan pertama untuk kategori ini (belum ada data sama sekali). */
    isLoading: query.isPending,
    error: query.error,
    retry: query.refetch,
    hasNextPage: query.hasNextPage,
    loadMore: query.fetchNextPage,
    isLoadingMore: query.isFetchingNextPage,
    /** Gagal memuat halaman berikutnya (halaman sebelumnya tetap tampil). */
    loadMoreError: query.isFetchNextPageError,
  };
}
