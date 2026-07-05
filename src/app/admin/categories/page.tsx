"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import Pagination from "@/components/admin/shared/Pagination";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import { getCategories, deleteCategory, createCategory } from "@/lib/api/admin/mocks/categoriesMocks";
import type { FeedCategory, PaginationMeta } from "@/types/admin.types";

export default function FeedCategoriesPage() {
  const [categories, setCategories] = useState<FeedCategory[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, perPage: 8, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchCategories = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const result = await getCategories({ page, perPage: 8 });
      setCategories(result.data);
      setMeta(result.meta);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories(1);
  }, [fetchCategories]);

  const handleCreate = async () => {
    await createCategory({
      name: "New Category",
      slug: "new-category",
      description: "Description for new category",
      status: "draft",
      color: "#3a5a40",
    });
    fetchCategories(1);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteCategory(deleteId);
    setDeleteId(null);
    fetchCategories(meta.page);
  };

  const columns = [
    {
      key: "name",
      header: "Category Name",
      render: (row: FeedCategory) => (
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded" style={{ backgroundColor: row.color }} />
          <span className="font-medium text-heading">{row.name}</span>
        </div>
      ),
    },
    { key: "slug", header: "Slug" },
    {
      key: "description",
      header: "Description",
      render: (row: FeedCategory) => (
        <span className="line-clamp-1 max-w-xs text-muted">{row.description}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: FeedCategory) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: FeedCategory) => (
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-lg p-1.5 text-muted hover:bg-admin-bg hover:text-primary">
            <Eye size={16} />
          </button>
          <button type="button" className="rounded-lg p-1.5 text-muted hover:bg-admin-bg hover:text-primary">
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => setDeleteId(row.id)}
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
        title="Feed Categories"
        subtitle="Manage the dynamic categories for the Teman Tumbuh activity feed."
        actions={
          <button
            type="button"
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            <Plus size={16} />
            Create Category
          </button>
        }
      />

      <DataTable title="All Categories" columns={columns} data={categories} loading={loading} />

      <Pagination
        page={meta.page}
        totalPages={meta.totalPages}
        total={meta.total}
        perPage={meta.perPage}
        onPageChange={(p) => fetchCategories(p)}
        label="categories"
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
