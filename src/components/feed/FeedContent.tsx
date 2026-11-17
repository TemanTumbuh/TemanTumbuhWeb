"use client";

import React from "react";
import { RefreshCw } from "lucide-react";
import PostInput from "./posts/PostInput";
import PostCard from "./posts/PostCard";
import PostCardSkeleton from "./posts/PostCardSkeleton";
import type { User } from "@/types/feed.types";
import type { Post } from "@/types/post.types";

interface FeedContentProps {
  posts: Post[];
  isLoggedIn: boolean;
  currentUser: User | null;
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
  hasNextPage: boolean;
  onLoadMore: () => void;
  isLoadingMore: boolean;
  loadMoreError: boolean;
  /** Nama kategori yang sedang difilter, null = semua. */
  activeCategoryName: string | null;
}

export default function FeedContent({
  posts,
  isLoggedIn,
  currentUser,
  isLoading,
  error,
  onRetry,
  hasNextPage,
  onLoadMore,
  isLoadingMore,
  loadMoreError,
  activeCategoryName,
}: FeedContentProps) {
  // Gagal total hanya bila belum ada post sama sekali; kalau halaman
  // berikutnya yang gagal, post yang sudah tampil tetap dibiarkan.
  const showError = !isLoading && error && posts.length === 0;
  const showEmpty = !isLoading && !error && posts.length === 0;

  return (
    <main className="space-y-6">
      <PostInput currentUser={currentUser} isLoggedIn={isLoggedIn} />

      {isLoading && (
        <div className="space-y-6" aria-busy="true" aria-label="Memuat postingan">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      )}

      {showError && (
        <div role="alert" className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <p className="mb-1 font-medium text-gray-800">Postingan gagal dimuat</p>
          <p className="mb-5 text-sm text-gray-500">{error.message}</p>
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#3a5a40] px-6 py-2 text-sm font-medium text-[#3a5a40] transition-all hover:bg-[#3a5a40] hover:text-white"
          >
            <RefreshCw size={16} aria-hidden="true" />
            Coba lagi
          </button>
        </div>
      )}

      {showEmpty && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <p className="mb-2 text-gray-500">
            {activeCategoryName
              ? `Belum ada postingan di kategori ${activeCategoryName}`
              : "Belum ada postingan"}
          </p>
          <p className="text-sm text-gray-400">
            Jadilah yang pertama berbagi cerita Anda!
          </p>
        </div>
      )}

      {!isLoading && posts.length > 0 && (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      )}

      {!isLoading && posts.length > 0 && (
        <div className="flex flex-col items-center gap-2 pt-6">
          {hasNextPage ? (
            <>
              <button
                type="button"
                onClick={onLoadMore}
                disabled={isLoadingMore}
                className="rounded-full border-2 border-[#3a5a40] px-8 py-2.5 text-sm font-medium text-[#3a5a40] transition-all hover:bg-[#3a5a40] hover:text-white disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-[#3a5a40]"
              >
                {isLoadingMore ? "Memuat…" : "Muat Lebih Banyak"}
              </button>
              {loadMoreError && !isLoadingMore && (
                <p role="alert" className="text-sm text-red-600">
                  Gagal memuat postingan berikutnya. Coba klik lagi.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400">Sudah sampai postingan terakhir</p>
          )}
        </div>
      )}
    </main>
  );
}
