"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  filters: {
    id: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
  /** Kolom pencarian opsional di sisi kiri, sebelum filter dropdown. */
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label: string;
  };
  actions?: React.ReactNode;
}

export default function FilterBar({ filters, search, actions }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {search && (
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              aria-label={search.label}
              placeholder={search.placeholder}
              className="w-full rounded-lg border border-admin-border bg-white py-2 pl-9 pr-9 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary [&::-webkit-search-cancel-button]:hidden"
            />
            {search.value && (
              <button
                type="button"
                onClick={() => search.onChange("")}
                aria-label="Hapus pencarian"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:bg-admin-bg hover:text-heading"
              >
                <X size={14} />
              </button>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted">Showing:</span>
          {filters.map((filter) => (
            <select
              key={filter.id}
              value={filter.value}
              aria-label={filter.label}
              onChange={(e) => filter.onChange(e.target.value)}
              className="rounded-lg border border-admin-border bg-white px-3 py-2 text-sm text-[#556658] focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
      {actions}
    </div>
  );
}
