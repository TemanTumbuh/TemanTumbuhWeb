"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon, Smile } from "lucide-react";
import { User } from "@/types/feed.types";

interface PostInputProps {
  currentUser: User | null;
  isLoggedIn: boolean;
}

export default function PostInput({ currentUser, isLoggedIn }: PostInputProps) {
  const [content, setContent] = useState("");
  const MAX_LENGTH = 280;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      // TODO: Send to backend when ready
      console.log("Submitting post:", content);
      setContent("");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="text-center">
          <p className="text-gray-700 mb-4 text-sm">
            🌱 Masuk untuk berbagi cerita dan pengalaman Anda
          </p>
          <Link href="/login">
            <button className="bg-[#3a5a40] hover:bg-[#2d4632] text-white px-8 py-2.5 rounded-full font-medium text-sm transition-all transform hover:-translate-y-0.5">
              Tumbuh Sekarang
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-200 p-5 mb-6"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        {currentUser?.avatar && (
          <div className="shrink-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={currentUser.avatar}
                alt={currentUser.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="flex-1">
          {/* Input Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH))}
            placeholder="Apa yang sedang Anda alami hari ini?"
            className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 resize-none text-sm font-medium"
            rows={3}
          />

          {/* Character Counter */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
            <div className="flex gap-2">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all"
                title="Add image"
              >
                <ImageIcon size={18} />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all"
                title="Add emoji"
              >
                <Smile size={18} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                {content.length}/{MAX_LENGTH}
              </span>
              <button
                type="submit"
                disabled={!content.trim()}
                className="bg-[#3a5a40] hover:bg-[#2d4632] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full font-medium text-sm transition-all transform hover:-translate-y-0.5"
              >
                Berbagi
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
