// ============================================
// Mock Data untuk Dashboard Admin
// Ganti dengan real API call nanti
// ============================================

import type { DashboardStats, RecentActivity, AgendaItem, ActiveUser } from "@/types/admin.types";

export const mockDashboardStats: DashboardStats = {
  totalUsers: 24512,
  activeUsers: 1204,
  growthRate: "+12%",
  newRegistrations: 342,
  dailyInteractions: 142800,
  upcomingEvents: 18,
  unsolvedTickets: 42,
};

export const mockRecentActivities: RecentActivity[] = [
  {
    id: "1",
    type: "comment",
    user: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: undefined,
    },
    action: "commented on Planting 101",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    type: "post",
    user: {
      id: "user2",
      name: "Michael Chen",
      avatar: undefined,
    },
    action: "liked Sustainable Living",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "3",
    type: "join",
    user: {
      id: "user3",
      name: "Emma Wilson",
      avatar: undefined,
    },
    action: "joined the community",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: "4",
    type: "system",
    user: {
      id: "system",
      name: "System",
      avatar: undefined,
    },
    action: "New category Hydroponics added",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
];

export const mockUpcomingAgenda: AgendaItem[] = [
  {
    id: "1",
    date: "Oct 24",
    day: "Wed",
    title: "Green Living Workshop",
    time: "10:00 AM - 12:00 PM",
    location: "Zoom Meeting",
  },
  {
    id: "2",
    date: "Oct 26",
    day: "Fri",
    title: "Community Tree Planting",
    time: "09:00 AM - 1:00 PM",
    location: "City Park",
  },
  {
    id: "3",
    date: "Oct 29",
    day: "Mon",
    title: "Staff Monthly Sync",
    time: "03:00 PM - 04:30 PM",
    location: "HQ Office",
  },
];

export const mockHighlyActiveUsers: ActiveUser[] = [
  {
    id: "1",
    avatar: "AD",
    name: "Alex Doe",
    status: "ACTIVE",
    joined: "12 Oct 2023",
    points: 1240,
  },
  {
    id: "2",
    avatar: "BM",
    name: "Bella Mike",
    status: "ACTIVE",
    joined: "15 Oct 2023",
    points: 982,
  },
  {
    id: "3",
    avatar: "CJ",
    name: "Chris Jin",
    status: "IDLE",
    joined: "18 Oct 2023",
    points: 856,
  },
];

// Simulasi API call dengan delay
export async function getDashboardStats(): Promise<DashboardStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockDashboardStats;
}

export async function getRecentActivities(): Promise<RecentActivity[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRecentActivities;
}

export async function getUpcomingAgenda(): Promise<AgendaItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockUpcomingAgenda;
}

export async function getHighlyActiveUsers(): Promise<ActiveUser[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockHighlyActiveUsers;
}
