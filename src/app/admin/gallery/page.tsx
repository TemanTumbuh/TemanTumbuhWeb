"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CloudUpload, Database, Eye, Globe, ImageIcon, Pencil, RefreshCw, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatsCard from "@/components/admin/shared/StatsCard";
import DataTable from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import Pagination from "@/components/admin/shared/Pagination";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import { getGalleryStats, getGalleryAssets, deleteGalleryAsset } from "@/lib/api/admin/mocks/galleryMocks";
import type { GalleryAsset, GalleryStats, PaginationMeta } from "@/types/admin.types";

export default function GalleryManagementPage() {
  const [stats, setStats] = useState<GalleryStats | null>(null);
  const [assets, setAssets] = useState<GalleryAsset[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, perPage: 10, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const fetchAssets = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const [statsData, assetsData] = await Promise.all([
        getGalleryStats(),
        getGalleryAssets({ page, perPage: 10, category: categoryFilter }),
      ]);
      setStats(statsData);
      setAssets(assetsData.data);
      setMeta(assetsData.meta);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    fetchAssets(1);
  }, [fetchAssets]);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteGalleryAsset(deleteId);
    setDeleteId(null);
    fetchAssets(meta.page);
  };

  const columns = [
    {
      key: "name",
      header: "Asset Name",
      render: (row: GalleryAsset) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg">
            <Image src={row.thumbnail} alt={row.name} fill className="object-cover" />
          </div>
          <span className="font-medium text-heading">{row.name}</span>
        </div>
      ),
    },
    { key: "category", header: "Category" },
    { key: "uploadDate", header: "Upload Date" },
    { key: "size", header: "Size" },
    {
      key: "status",
      header: "Status",
      render: (row: GalleryAsset) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "Action",
      render: (row: GalleryAsset) => (
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
        title="Gallery Management"
        subtitle="Manage activities and community milestones for the landing page."
        actions={
          <>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="flex items-center gap-2 rounded-xl border border-admin-border bg-white px-4 py-2.5 text-sm text-[#556658]"
            >
              <option value="all">All Categories</option>
              <option value="activities">Activities</option>
              <option value="internal">Internal</option>
            </select>
            <button
              type="button"
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              <CloudUpload size={16} />
              Upload Images
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Images" value={stats?.totalImages || 0} icon={<ImageIcon size={24} />} />
        <StatsCard label="Storage Used" value={stats?.storageUsed || "0 MB"} icon={<Database size={24} />} />
        <StatsCard label="Published" value={stats?.published || 0} icon={<Globe size={24} />} />
        <StatsCard label="Last Sync" value={stats?.lastSync || "-"} icon={<RefreshCw size={24} />} />
      </div>

      <DataTable title="Gallery Asset History" columns={columns} data={assets} loading={loading} />

      <Pagination
        page={meta.page}
        totalPages={meta.totalPages}
        total={meta.total}
        perPage={meta.perPage}
        onPageChange={(p) => fetchAssets(p)}
        label="assets"
      />

      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-admin-border bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold text-heading">Upload Images</h3>
            <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-admin-border bg-admin-bg py-12">
              <CloudUpload size={40} className="text-muted" />
              <p className="mt-3 text-sm text-muted">Drag & drop or click to upload</p>
              <p className="text-xs text-muted">Max 2MB per file. JPG, PNG supported.</p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="rounded-xl border border-admin-border px-4 py-2 text-sm hover:bg-admin-bg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
              >
                Upload (Mock)
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Asset"
        message="Are you sure you want to delete this gallery asset?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
