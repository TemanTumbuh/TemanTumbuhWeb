"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageOff, Pin } from "lucide-react";
import type { Post, PostMedia } from "@/types/post.types";
import { formatDate } from "@/lib/feedHelpers";
import { isAllowedImageSrc } from "@/lib/imageHosts";
import PostActions from "./PostActions";
import UserAvatar from "@/components/UserAvatar";

interface PostCardProps {
  post: Post;
  isLoggedIn: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  "self-care": "bg-pink-100 text-pink-700",
  growth: "bg-blue-100 text-blue-700",
  karir: "bg-purple-100 text-purple-700",
  "self-development": "bg-yellow-100 text-yellow-700",
  creative: "bg-orange-100 text-orange-700",
};

/**
 * 1 gambar → lebar penuh 16:9 · 2 gambar → dua kolom persegi ·
 * 3 gambar → satu besar di kiri + dua bertumpuk di kanan.
 */
/**
 * Gambar yang gagal dimuat (host diblokir jaringan, file hilang) diganti
 * placeholder, bukan teks alt yang menumpuk di atas kotak kosong.
 */
function GalleryImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} (tidak dapat dimuat)`}
        className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-gray-100 text-gray-400"
      >
        <ImageOff size={22} aria-hidden="true" />
        <span className="text-xs">Gambar tidak dapat dimuat</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function MediaGallery({ media, author }: { media: PostMedia[]; author: string }) {
  // Hanya gambar dari host yang terdaftar di next.config — host lain membuat
  // next/image melempar error dan menjatuhkan seluruh feed.
  const images = media
    .filter((m) => m.mediaType === "image" && isAllowedImageSrc(m.mediaUrl))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 3);

  if (images.length === 0) return null;

  const alt = (i: number) =>
    images.length === 1
      ? `Gambar dari postingan ${author}`
      : `Gambar ${i + 1} dari ${images.length}, postingan ${author}`;

  if (images.length === 1) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
        <GalleryImage
          src={images[0].mediaUrl}
          alt={alt(0)}
          sizes="(max-width: 1024px) 100vw, 600px"
        />
      </div>
    );
  }

  return (
    <div
      className={`grid gap-1.5 overflow-hidden rounded-lg ${
        images.length === 2 ? "aspect-[2/1] grid-cols-2" : "aspect-video grid-cols-2 grid-rows-2"
      }`}
    >
      {images.map((image, i) => (
        <div
          key={image.id}
          className={`relative bg-gray-100 ${images.length === 3 && i === 0 ? "row-span-2" : ""}`}
        >
          <GalleryImage
            src={image.mediaUrl}
            alt={alt(i)}
            sizes="(max-width: 1024px) 50vw, 300px"
          />
        </div>
      ))}
    </div>
  );
}

export default function PostCard({ post, isLoggedIn }: PostCardProps) {
  const authorName = post.author?.username ?? "Akun dihapus";

  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all">
      {/* Header */}
      <div className="p-5">
        <div className="flex gap-3">
          <UserAvatar
            src={post.author?.avatarUrl ?? undefined}
            name={authorName}
            size={48}
          />

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-gray-900">
                {authorName}
              </h3>
              {post.category && (
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    CATEGORY_COLORS[post.category.slug] ?? "bg-gray-100 text-gray-700"
                  }`}
                >
                  {post.category.name}
                </span>
              )}
              {post.isPinned && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#eaf6ee] px-2.5 py-1 text-xs font-medium text-[#2f8f4e]">
                  <Pin size={12} aria-hidden="true" />
                  Disematkan
                </span>
              )}
            </div>
            <time dateTime={post.createdAt} className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
            </time>
          </div>
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <div className="px-5 pb-3">
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-800">
            {post.content}
          </p>
        </div>
      )}

      {/* Media */}
      {post.media.length > 0 && (
        <div className="px-5 pb-4">
          <MediaGallery media={post.media} author={authorName} />
        </div>
      )}

      {/* Actions — like & komentar disambungkan di PR4 (feed tulis). */}
      <div className="px-5 pb-3">
        <PostActions post={post} isLoggedIn={isLoggedIn} />
      </div>
    </article>
  );
}
