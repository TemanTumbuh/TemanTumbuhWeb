// ============================================
// Admin Types & Interfaces
// ============================================

import type { ReactNode } from "react";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "moderator";
  avatar?: string;
  permissions: string[];
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  growthRate: string;
  newRegistrations: number;
  dailyInteractions: number;
  upcomingEvents: number;
  unsolvedTickets: number;
}

export interface RecentActivity {
  id: string;
  type: "comment" | "post" | "join" | "system";
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  action: string;
  timestamp: Date;
}

export interface SidebarMenuItemType {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
  children?: SidebarMenuItemType[];
}

export interface AdminContextType {
  currentAdmin: AdminUser | null;
  isLoggedIn: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  logout: () => void;
}

export interface AgendaItem {
  id: string;
  date: string;
  day: string;
  title: string;
  time: string;
  location?: string;
}

export interface ActiveUser {
  id: string;
  avatar: string;
  name: string;
  status: string;
  joined: string;
  points: number;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin" | "moderator";
  joinedDate: string;
  status: "active" | "inactive";
}

export interface UserManagementStats {
  totalUsers: number;
  activeNow: number;
  growthRate: number;
  newRegistrations: number;
}

export interface FeedCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "active" | "draft";
  color: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqStats {
  totalQuestions: number;
  liveContent: string;
  lastUpdated: string;
}

export interface GalleryAsset {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  uploadDate: string;
  size: string;
  status: "published" | "draft";
}

export interface GalleryStats {
  totalImages: number;
  storageUsed: string;
  published: number;
  lastSync: string;
}

export interface ProfileContentTab {
  id: "about" | "agenda" | "vision";
  label: string;
}

export interface ProfileContent {
  about: {
    headline: string;
    description: string;
    featuredImage: string;
    stats: { members: string; workshops: string; partners: string };
  };
  agenda: {
    headline: string;
    description: string;
  };
  vision: {
    headline: string;
    description: string;
  };
  lastEdited: string;
  editedBy: string;
  status: "published" | "draft";
}

export interface AgendaEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: "published" | "draft";
}
