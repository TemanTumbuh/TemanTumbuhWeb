"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
  label?: string;
}

/**
 * Angka halaman yang ditampilkan, dipusatkan di sekitar halaman aktif dengan
 * elipsis di ujung — bukan selalu 1..5 (yang membuat halaman aktif hilang dari
 * tampilan begitu melewati halaman 5).
 */
function getPageWindow(page: number, totalPages: number): (number | "…")[] {
  const windowSize = 1; // jumlah halaman di kiri/kanan halaman aktif
  const pages = new Set<number>([1, totalPages, page]);

  for (let i = 1; i <= windowSize; i++) {
    if (page - i >= 1) pages.add(page - i);
    if (page + i <= totalPages) pages.add(page + i);
  }

  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const result: (number | "…")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("…");
    result.push(sorted[i]);
  }
  return result;
}

export default function Pagination({
  page,
  totalPages,
  total,
  perPage,
  onPageChange,
  label = "entries",
}: PaginationProps) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);
  const pageWindow = getPageWindow(page, Math.max(totalPages, 1));

  return (
    <nav
      aria-label="Navigasi halaman"
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-muted">
        {total === 0
          ? `Showing 0 ${label}`
          : `Showing ${start}-${end} of ${total.toLocaleString()} ${label}`}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Halaman sebelumnya"
          className="flex items-center gap-1 rounded-lg border border-admin-border px-3 py-1.5 text-sm text-[#556658] transition hover:bg-admin-bg disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {pageWindow.map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              aria-hidden="true"
              className="px-1 text-sm text-muted"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-label={`Ke halaman ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                p === page
                  ? "bg-primary text-white"
                  : "border border-admin-border text-[#556658] hover:bg-admin-bg"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Halaman berikutnya"
          className="flex items-center gap-1 rounded-lg border border-admin-border px-3 py-1.5 text-sm text-[#556658] transition hover:bg-admin-bg disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}
