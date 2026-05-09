"use client";

import React from "react";
import PostInput from "./posts/PostInput";
import PostCard from "./posts/PostCard";
import { Post, User } from "@/types/feed.types";

interface FeedContentProps {
  posts: Post[];
  isLoggedIn: boolean;
  currentUser: User | null;
  loading: boolean;
}

export default function FeedContent({
  posts,
  isLoggedIn,
  currentUser,
  loading,
}: FeedContentProps) {
  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
      <div className="flex gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-100 rounded w-32"></div>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
      <div className="h-10 bg-gray-100 rounded"></div>
    </div>
  );

  return (
    <main className="space-y-6">
      {/* Post Input */}
      <PostInput currentUser={currentUser} isLoggedIn={isLoggedIn} />

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 mb-2">🌱 Belum ada postingan</p>
          <p className="text-sm text-gray-400">
            Jadilah yang pertama berbagi cerita Anda!
          </p>
        </div>
      )}

      {/* Posts List */}
      {!loading && (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && posts.length > 0 && (
        <div className="flex justify-center pt-6">
          <button className="px-8 py-2.5 border-2 border-[#3a5a40] text-[#3a5a40] hover:bg-[#3a5a40] hover:text-white rounded-full font-medium text-sm transition-all">
            Muat Lebih Banyak
          </button>
        </div>
      )}
    </main>
  );
}
