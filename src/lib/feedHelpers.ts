import { Post, Category, User } from "@/types/feed.types";
import {
  DUMMY_POSTS,
  DUMMY_CATEGORIES,
  DUMMY_USERS,
} from "@/config/feedConfig";

/**
 * Format date to relative time (e.g., "2 jam lalu", "1 hari lalu")
 */
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;

  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Truncate text to specified length with ellipsis
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

/**
 * Generate mock posts - currently returns dummy data
 * Ready to be replaced with: await fetch(`/api/posts`)
 */
export const generateMockPosts = (
  _count?: number,
  _categories?: Category[],
  _users?: User[],
): Post[] => {
  // For now: return all dummy posts
  // When backend ready: fetch from API instead
  return DUMMY_POSTS;
};

/**
 * Get categories
 */
export const getCategories = (): Category[] => {
  // For now: return dummy categories
  // When backend ready: fetch from /api/categories
  return DUMMY_CATEGORIES;
};

/**
 * Filter posts by category
 */
export const filterPostsByCategory = (
  posts: Post[],
  categorySlug: string,
): Post[] => {
  if (categorySlug === "semua") return posts;
  return posts.filter((post) => post.category === categorySlug);
};

/**
 * Get suggested users (excluding current user)
 */
export const getSuggestedUsers = (excludeUserId?: string): User[] => {
  return DUMMY_USERS.filter((user) => user.id !== excludeUserId).slice(0, 4);
};

/**
 * Mock API call - ready for backend integration
 */
export const mockApiCall = async <T>(delayMs: number = 300): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({} as T);
    }, delayMs);
  });
};
