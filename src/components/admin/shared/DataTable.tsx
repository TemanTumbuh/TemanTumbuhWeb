"use client";

import React from "react";
import type { TableColumn } from "@/types/admin.types";

interface DataTableProps<T extends { id: string }> {
  title?: string;
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  headerActions?: React.ReactNode;
  emptyMessage?: string;
}

export default function DataTable<T extends { id: string }>({
  title,
  columns,
  data,
  loading,
  headerActions,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-admin-border bg-white p-6 shadow-sm">
        <div className="mb-4 h-6 w-40 animate-pulse rounded bg-admin-border" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-admin-bg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-admin-border bg-white shadow-sm">
      {(title || headerActions) && (
        <div className="flex items-center justify-between border-b border-admin-border px-6 py-4">
          {title && <h2 className="font-bold text-heading">{title}</h2>}
          {headerActions}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-admin-border bg-admin-bg">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-admin-border last:border-0 hover:bg-admin-bg/50"
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-6 py-4 ${col.className || ""}`}>
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
