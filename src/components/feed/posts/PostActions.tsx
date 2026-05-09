"use client";

import React from "react";
import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { Post } from "@/types/feed.types";

interface PostActionsProps {
  post: Post;
  isLoggedIn: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export default function PostActions({
  post,
  isLoggedIn,
  onLike,
  onComment,
  onShare,
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
        {/* Like Button */}
        <button
          onClick={onLike}
          disabled={!isLoggedIn}
          className={actionButtonClass(!isLoggedIn)}
          title={!isLoggedIn ? "Login untuk like" : "Like post"}
        >
          <Heart size={18} />
          <span className="text-sm font-medium">{post.likes}</span>
        </button>

        {/* Comment Button */}
        <button
          onClick={onComment}
          disabled={!isLoggedIn}
          className={actionButtonClass(!isLoggedIn)}
          title={!isLoggedIn ? "Login untuk comment" : "Comment post"}
        >
          <MessageCircle size={18} />
          <span className="text-sm font-medium">{post.comments}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={onShare}
          disabled={!isLoggedIn}
          className={actionButtonClass(!isLoggedIn)}
          title={!isLoggedIn ? "Login untuk share" : "Share post"}
        >
          <Share2 size={18} />
          <span className="text-sm font-medium">{post.shares}</span>
        </button>
      </div>

      {/* Menu Button (3 dots) */}
      {isLoggedIn && (
        <button
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all"
          title="More options"
        >
          <MoreVertical size={18} />
        </button>
      )}
    </div>
  );
}
