import type { FeedCategory, PaginationMeta } from "@/types/admin.types";

let categories: FeedCategory[] = [
  { id: "1", name: "creative space", slug: "creative-space", description: "Share your creative projects and artistic endeavors", status: "active", color: "#fadc6c" },
  { id: "2", name: "self-care", slug: "self-care", description: "Wellness tips and self-care routines for daily life", status: "active", color: "#3b8e74" },
  { id: "3", name: "career-talk", slug: "career-talk", description: "Career advice and professional development discussions", status: "active", color: "#815c44" },
  { id: "4", name: "tech-talk", slug: "tech-talk", description: "Technology trends and digital skills sharing", status: "draft", color: "#6366f1" },
  { id: "5", name: "growth-tracking", slug: "growth-tracking", description: "Track your personal growth journey and milestones", status: "active", color: "#22c55e" },
  { id: "6", name: "community-events", slug: "community-events", description: "Upcoming events and community gatherings", status: "active", color: "#f97316" },
  { id: "7", name: "user-spotlight", slug: "user-spotlight", description: "Highlighting outstanding community members", status: "active", color: "#ec4899" },
  { id: "8", name: "Academy", slug: "academy", description: "Learning resources and educational content", status: "draft", color: "#8b5cf6" },
];

export async function getCategories(params?: {
  page?: number;
  perPage?: number;
}): Promise<{ data: FeedCategory[]; meta: PaginationMeta }> {
  await new Promise((r) => setTimeout(r, 400));
  const page = params?.page || 1;
  const perPage = params?.perPage || 8;
  const total = categories.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  return {
    data: categories.slice(start, start + perPage),
    meta: { page, perPage, total, totalPages },
  };
}

export async function createCategory(data: Omit<FeedCategory, "id">): Promise<FeedCategory> {
  await new Promise((r) => setTimeout(r, 300));
  const newCat: FeedCategory = { ...data, id: String(Date.now()) };
  categories = [newCat, ...categories];
  return newCat;
}

export async function deleteCategory(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  categories = categories.filter((c) => c.id !== id);
}
