import type { User } from "@/types/feed.types";
import { isAdminEmail } from "@/lib/auth/adminAllowlist";
import { isAllowedImageSrc } from "@/lib/imageHosts";

/**
 * Bentuk user dari backend (`/auth/me`, login, register, `/api/users/:id`).
 * Berbeda dengan post & kategori, data user dari backend masih snake_case.
 */
export interface UserDto {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  avatar_url: string | null;
  is_active: boolean;
  role_id: number | null;
  place_id: string | null;
  created_at: string;
  last_login: string | null;
}

/** Ubah user backend ke bentuk `User` yang dipakai komponen FE. */
export function normalizeUser(dto: UserDto): User {
  return {
    id: dto.id,
    // Backend belum punya nama lengkap; username dipakai sebagai nama tampilan.
    name: dto.username,
    username: dto.username,
    email: dto.email,
    // UserAvatar jatuh ke inisial bila kosong atau host-nya tidak diizinkan.
    avatar: isAllowedImageSrc(dto.avatar_url) ? dto.avatar_url : "",
    bio: dto.bio ?? undefined,
    // Sementara (gap N2): backend belum mengirim role. Lihat adminAllowlist.
    role: isAdminEmail(dto.email) ? "admin" : "user",
    roleId: dto.role_id,
    createdAt: dto.created_at,
  };
}
