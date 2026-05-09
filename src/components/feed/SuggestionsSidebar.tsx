"use client";

import React from "react";
import Image from "next/image";
import { User } from "@/types/feed.types";
import { TRENDING_HASHTAGS } from "@/config/feedConfig";

interface SuggestionsSidebarProps {
  suggestedUsers: User[];
}

export default function SuggestionsSidebar({
  suggestedUsers,
}: SuggestionsSidebarProps) {
  return (
    <aside className="sticky top-24 h-fit space-y-6">
      {/* Suggested Users */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">
          Siapa yang Tumbuh
        </h2>

        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    @
                    {user.username || user.name.toLowerCase().replace(" ", "_")}
                  </p>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#3a5a40] hover:bg-[#2d4632] text-white rounded-full text-xs font-medium transition-all shrink-0">
                Ikuti
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Topik Populer</h2>

        <div className="flex flex-wrap gap-2">
          {TRENDING_HASHTAGS.map((hashtag) => (
            <button
              key={hashtag}
              className="text-xs font-medium text-[#3a5a40] hover:text-[#2d4632] transition-all"
            >
              {hashtag}
            </button>
          ))}
        </div>

        <button className="w-full mt-4 text-xs text-gray-600 hover:text-gray-900 font-medium py-2 transition-all">
          Lihat semua topik →
        </button>
      </div>
    </aside>
  );
}
