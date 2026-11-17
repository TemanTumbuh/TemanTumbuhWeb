"use client";

import React from "react";
import { Heart, MessageCircle, MoreVertical } from "lucide-react";
import type { Post } from "@/types/post.types";

interface PostActionsProps {
  post: Post;
  isLoggedIn: boolean;
  onLike?: () => void;
  onComment?: () => void;
}

// Tombol share dihapus: backend tidak punya fitur share (Fase 2, FE-32).
export default function PostActions({
  post,
  isLoggedIn,
  onLike,
  onComment,
}: PostActionsProps) {
  const actionButtonClass = (disabled: boolean) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
      disabled
        ? "text-gray-400 cursor-not-allowed"
        : "text-gray-600 hover:bg-gray-100 hover:text-[#3a5a40]"
    }`;

  return (
    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onLike}
          disabled={!isLoggedIn}
          aria-pressed={post.likedByMe ?? false}
          className={actionButtonClass(!isLoggedIn)}
          aria-label={`Suka — ${post.likesCount} suka`}
          title={!isLoggedIn ? "Masuk untuk menyukai" : "Suka"}
        >
          <Heart
            size={18}
            className={post.likedByMe ? "fill-red-500 text-red-500" : undefined}
          />
          <span className="text-sm font-medium tabular-nums">
            {post.likesCount}
          </span>
        </button>

        <button
          type="button"
          onClick={onComment}
          disabled={!isLoggedIn}
          className={actionButtonClass(!isLoggedIn)}
          aria-label={`Komentar — ${post.commentsCount} komentar`}
          title={!isLoggedIn ? "Masuk untuk berkomentar" : "Komentar"}
        >
          <MessageCircle size={18} />
          <span className="text-sm font-medium tabular-nums">
            {post.commentsCount}
          </span>
        </button>
      </div>

      {isLoggedIn && (
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all"
          aria-label="Opsi lainnya"
          title="Opsi lainnya"
        >
          <MoreVertical size={18} />
        </button>
      )}
    </div>
  );
}
