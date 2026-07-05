// ============================================
// Admin Menu Items & Permissions
// ============================================

import type { SidebarMenuItemType } from "@/types/admin.types";

export const ADMIN_MENU_ITEMS: SidebarMenuItemType[] = [
  {
    id: "dashboard",
    label: "Home",
    icon: "BarChart3",
    href: "/admin",
  },
  {
    id: "users",
    label: "User Management",
    icon: "Users",
    href: "/admin/users",
  },
  {
    id: "categories",
    label: "Feed Category",
    icon: "Layers",
    href: "/admin/categories",
  },
  {
    id: "faqs",
    label: "FAQ",
    icon: "HelpCircle",
    href: "/admin/faqs",
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: "Images",
    href: "/admin/gallery",
  },
  {
    id: "about-us",
    label: "About Us",
    icon: "Info",
    href: "/admin/about-us",
  },
  {
    id: "agenda",
    label: "Upcoming Agenda",
    icon: "Calendar",
    href: "/admin/agenda",
  },
];
export const ADMIN_PERMISSIONS = {
  VIEW_DASHBOARD: "view_dashboard",
  MANAGE_USERS: "manage_users",
  MANAGE_CATEGORIES: "manage_categories",
  MANAGE_FAQS: "manage_faqs",
  MANAGE_GALLERY: "manage_gallery",
  MANAGE_CONTENT: "manage_content",
  VIEW_ANALYTICS: "view_analytics",
};

