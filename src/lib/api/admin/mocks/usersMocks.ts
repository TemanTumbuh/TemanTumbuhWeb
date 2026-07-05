import type {
  AdminUserRow,
  UserManagementStats,
  PaginationMeta,
} from "@/types/admin.types";

export const mockUserStats: UserManagementStats = {
  totalUsers: 12482,
  activeNow: 1204,
  growthRate: 84,
  newRegistrations: 342,
};

const ALL_USERS: AdminUserRow[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: i % 3 === 0 ? "Indah Permata" : `Member ${i + 1}`,
  email: i % 3 === 0 ? "indah.p@mail.net" : `member${i + 1}@mail.net`,
  avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "women" : "men"}/${(i % 50) + 1}.jpg`,
  role: i === 0 ? "admin" : "user",
  joinedDate: "Jan 15, 2024",
  status: i % 4 === 0 ? "inactive" : "active",
}));

export async function getUserStats(): Promise<UserManagementStats> {
  await new Promise((r) => setTimeout(r, 400));
  return mockUserStats;
}

export async function getUsers(params?: {
  role?: string;
  sort?: string;
  page?: number;
  perPage?: number;
}): Promise<{ data: AdminUserRow[]; meta: PaginationMeta }> {
  await new Promise((r) => setTimeout(r, 500));

  let filtered = [...ALL_USERS];

  if (params?.role && params.role !== "all") {
    filtered = filtered.filter((u) => u.role === params.role);
  }

  if (params?.sort === "recent") {
    filtered = filtered.reverse();
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

export async function deleteUser(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  const idx = ALL_USERS.findIndex((u) => u.id === id);
  if (idx >= 0) ALL_USERS.splice(idx, 1);
}
