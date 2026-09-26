"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ImageIcon, Smile } from "lucide-react";
import { User } from "@/types/feed.types";
import { FEED_CONFIG } from "@/config/feedConfig";
import UserAvatar from "@/components/UserAvatar";

interface PostInputProps {
  currentUser: User | null;
  isLoggedIn: boolean;
}

export default function PostInput({ currentUser, isLoggedIn }: PostInputProps) {
  const [content, setContent] = useState("");
  // Satu sumber batas panjang — sebelumnya nilai ini didefinisikan ulang di
  // sini (280) terpisah dari FEED_CONFIG.MAX_CONTENT_LENGTH yang jadi tak
  // terpakai (lihat audit C10). Catatan: ini aturan sisi FE saja, backend
  // saat ini tidak membatasi panjang `content`.
  const MAX_LENGTH = FEED_CONFIG.MAX_CONTENT_LENGTH;

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
        {currentUser && (
          <UserAvatar src={currentUser.avatar} name={currentUser.name} size={48} />
        )}

        <div className="flex-1">
          {/* Input Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH))}
            aria-label="Tulis postingan"
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
                aria-label="Tambah gambar"
                title="Tambah gambar"
              >
                <ImageIcon size={18} />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all"
                aria-label="Tambah emoji"
                title="Tambah emoji"
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
