"use client";

import Image from "next/image";
import { isAllowedImageSrc } from "@/lib/imageHosts";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

interface UserAvatarProps {
  src?: string | null;
  /** Dipakai untuk inisial saat gambar tidak bisa dirender. */
  name: string;
  /** Lebar/tinggi render dalam px — dipakai juga untuk prop `sizes`. */
  size: number;
  className?: string;
}

/**
 * Avatar yang tidak bisa menumbangkan halaman.
 *
 * `next/image` melempar error untuk host di luar `images.remotePatterns`, dan
 * URL avatar bisa datang dari input bebas (Edit Profil) atau sesi lama di
 * localStorage. Jadi URL diperiksa dulu; yang tidak lolos dirender sebagai
 * lingkaran inisial, bukan error.
 *
 * Selalu dekoratif (`alt=""` + `aria-hidden`): di semua pemakaiannya, nama
 * pengguna sudah tertulis sebagai teks di sebelahnya.
 */
export default function UserAvatar({
  src,
  name,
  size,
  className = "",
}: UserAvatarProps) {
  const style = { width: size, height: size };

  if (!isAllowedImageSrc(src)) {
    return (
      <div
        style={style}
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center rounded-full bg-[#dbe9dd] font-semibold text-[#2d4632] ${className}`}
      >
        <span style={{ fontSize: Math.max(11, size * 0.36) }}>
          {getInitials(name) || "?"}
        </span>
      </div>
    );
  }

  return (
    <div
      style={style}
      className={`relative shrink-0 overflow-hidden rounded-full bg-[#dbe9dd] ${className}`}
    >
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    </div>
  );
}
