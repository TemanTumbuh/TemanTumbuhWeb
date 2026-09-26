"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import UserAvatar from "@/components/UserAvatar";
import { Download, Eye, Pencil, Trash2, UserPlus } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatsCard from "@/components/admin/shared/StatsCard";
import DataTable from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import Pagination from "@/components/admin/shared/Pagination";
import FilterBar from "@/components/admin/shared/FilterBar";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import { getUserStats, getUsers, deleteUser } from "@/lib/api/admin/mocks/usersMocks";
import type { AdminUserRow, UserManagementStats, PaginationMeta, TableColumn } from "@/types/admin.types";

export default function UserManagementPage() {
  const [stats, setStats] = useState<UserManagementStats | null>(null);
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, perPage: 10, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("recent");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Request baru dikirim setelah admin berhenti mengetik 300ms.
  const debouncedSearch = useDebouncedValue(search, 300);
  // Penanda request terakhir — respons dari request lama yang datang
  // belakangan (mis. saat mengetik cepat) diabaikan supaya tabel tidak
  // menampilkan hasil untuk kata kunci yang sudah usang.
  const latestRequest = useRef(0);

  // Statistik tidak bergantung pada filter/pencarian — cukup dimuat sekali.
  useEffect(() => {
    getUserStats().then(setStats);
  }, []);

  const fetchUsers = useCallback(async (page = 1) => {
    const requestId = ++latestRequest.current;
    setLoading(true);
    try {
      const usersData = await getUsers({
        q: debouncedSearch,
        role: roleFilter,
        sort: sortFilter,
        page,
        perPage: 10,
      });
      if (requestId !== latestRequest.current) return;
      setUsers(usersData.data);
      setMeta(usersData.meta);
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
    }
  }, [debouncedSearch, roleFilter, sortFilter]);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteUser(deleteId);
    setDeleteId(null);
    fetchUsers(meta.page);
  };

  const columns: TableColumn<AdminUserRow>[] = [
    {
      key: "member",
      header: "Member",
      render: (row: AdminUserRow) => (
        <div className="flex items-center gap-3">
          <UserAvatar src={row.avatar} name={row.name} size={36} />
          <div>
            <p className="font-semibold text-heading">{row.name}</p>
            <p className="text-xs text-muted">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (row: AdminUserRow) => (
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold uppercase text-gray-600">
          {row.role}
        </span>
      ),
    },
    { key: "joinedDate", header: "Joined Date" },
    {
      key: "status",
      header: "Status",
      render: (row: AdminUserRow) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "Aksi",
      render: (row: AdminUserRow) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Lihat detail ${row.name}`}
            className="rounded-lg p-1.5 text-muted hover:bg-admin-bg hover:text-primary"
          >
            <Eye size={16} />
          </button>
          <button
            type="button"
            aria-label={`Ubah ${row.name}`}
            className="rounded-lg p-1.5 text-muted hover:bg-admin-bg hover:text-primary"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => setDeleteId(row.id)}
            aria-label={`Hapus ${row.name}`}
            className="rounded-lg p-1.5 text-muted hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="User Management"
        subtitle="View and manage all registered users in the Teman Tumbuh ecosystem."
        actions={
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-admin-border bg-white px-4 py-2.5 text-sm font-semibold text-[#556658] hover:bg-admin-bg"
          >
            <Download size={16} />
            Export CSV
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Users" value={stats?.totalUsers.toLocaleString() || "0"} change="+12%" changeColor="positive" />
        <StatsCard label="Active Now" value={stats?.activeNow.toLocaleString() || "0"} />
        <StatsCard label="Growth Rate" value={`${stats?.growthRate || 0}%`} changeColor="positive" />
        <StatsCard label="New Registrations" value={stats?.newRegistrations || 0} />
      </div>

      <div className="space-y-4">
        <FilterBar
          search={{
            value: search,
            onChange: setSearch,
            label: "Cari anggota berdasarkan nama atau email",
            placeholder: "Cari nama atau email…",
          }}
          filters={[
            {
              id: "role",
              label: "Role",
              value: roleFilter,
              onChange: setRoleFilter,
              options: [
                { value: "all", label: "All roles" },
                { value: "user", label: "User" },
                { value: "admin", label: "Admin" },
              ],
            },
            {
              id: "sort",
              label: "Sort",
              value: sortFilter,
              onChange: setSortFilter,
              options: [
                { value: "recent", label: "Recently Added" },
                { value: "oldest", label: "Oldest First" },
              ],
            },
          ]}
          actions={
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              <UserPlus size={16} />
              Tambah Member
            </button>
          }
        />

        <DataTable
          columns={columns}
          data={users}
          loading={loading}
          emptyMessage={
            debouncedSearch.trim()
              ? `Tidak ada anggota yang cocok dengan "${debouncedSearch.trim()}".`
              : "Belum ada anggota."
          }
        />

        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          perPage={meta.perPage}
          onPageChange={(p) => fetchUsers(p)}
          label="users"
        />
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      <p className="text-center text-xs text-muted">
        © 2024 Teman Tumbuh Ecosystem. All rights reserved.
      </p>
    </div>
  );
}
