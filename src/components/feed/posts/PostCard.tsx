"use client";

import React from "react";
import Image from "next/image";
import { Post } from "@/types/feed.types";
import { formatDate } from "@/lib/feedHelpers";
import PostActions from "./PostActions";

interface PostCardProps {
  post: Post;
  isLoggedIn: boolean;
}

export default function PostCard({ post, isLoggedIn }: PostCardProps) {
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      "self-care": "bg-pink-100 text-pink-700",
      growth: "bg-blue-100 text-blue-700",
      karir: "bg-purple-100 text-purple-700",
      "self-development": "bg-yellow-100 text-yellow-700",
      creative: "bg-orange-100 text-orange-700",
      semua: "bg-green-100 text-green-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const formatCategoryName = (category: string): string => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex gap-3 flex-1">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={post.user.avatar}
                  alt={post.user.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {post.user.name}
                </h3>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${getCategoryColor(post.category)}`}
                >
                  {formatCategoryName(post.category)}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {formatDate(post.timestamp)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-3">
        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="px-5 pb-4">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-5 pb-3">
        <PostActions
          post={post}
          isLoggedIn={isLoggedIn}
          onLike={() => console.log("Like:", post.id)}
          onComment={() => console.log("Comment:", post.id)}
          onShare={() => console.log("Share:", post.id)}
        />
      </div>
    </div>
  );
}
