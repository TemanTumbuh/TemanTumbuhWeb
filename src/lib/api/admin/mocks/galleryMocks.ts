import type { GalleryAsset, GalleryStats, PaginationMeta } from "@/types/admin.types";

const ALL_ASSETS: GalleryAsset[] = [
  { id: "1", name: "garden-workshop-main.jpg", thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop", category: "Activities", uploadDate: "Oct 20, 2024", size: "2.4 MB", status: "published" },
  { id: "2", name: "community-tree-planting.jpg", thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=100&h=100&fit=crop", category: "Activities", uploadDate: "Oct 18, 2024", size: "3.1 MB", status: "published" },
  { id: "3", name: "workshop-session.jpg", thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=100&h=100&fit=crop", category: "Internal", uploadDate: "Oct 15, 2024", size: "1.8 MB", status: "draft" },
  { id: "4", name: "team-meeting.jpg", thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop", category: "Internal", uploadDate: "Oct 12, 2024", size: "2.0 MB", status: "published" },
  { id: "5", name: "green-living-event.jpg", thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop", category: "Activities", uploadDate: "Oct 10, 2024", size: "2.7 MB", status: "published" },
  { id: "6", name: "yoga-session.jpg", thumbnail: "https://images.unsplash.com/reserve/YEc7WB6ASDydBTw6GDlF_antalya-beach-lulu.jpg?w=100&h=100&fit=crop", category: "Activities", uploadDate: "Oct 08, 2024", size: "1.5 MB", status: "published" },
  { id: "7", name: "office-plants.jpg", thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop", category: "Internal", uploadDate: "Oct 05, 2024", size: "1.2 MB", status: "draft" },
  { id: "8", name: "community-gathering.jpg", thumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop", category: "Activities", uploadDate: "Oct 01, 2024", size: "3.5 MB", status: "published" },
];

export async function getGalleryStats(): Promise<GalleryStats> {
  await new Promise((r) => setTimeout(r, 300));
  return {
    totalImages: 128,
    storageUsed: "420 MB",
    published: 96,
    lastSync: "2h ago",
  };
}

export async function getGalleryAssets(params?: {
  page?: number;
  perPage?: number;
  category?: string;
}): Promise<{ data: GalleryAsset[]; meta: PaginationMeta }> {
  await new Promise((r) => setTimeout(r, 400));
  let filtered = [...ALL_ASSETS];
  if (params?.category && params.category !== "all") {
    filtered = filtered.filter((a) => a.category.toLowerCase() === params.category?.toLowerCase());
  }
  const page = params?.page || 1;
  const perPage = params?.perPage || 10;
  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  return {
    data: filtered.slice(start, start + perPage),
    meta: { page, perPage, total, totalPages },
  };
}

export async function deleteGalleryAsset(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  const idx = ALL_ASSETS.findIndex((a) => a.id === id);
  if (idx >= 0) ALL_ASSETS.splice(idx, 1);
}
