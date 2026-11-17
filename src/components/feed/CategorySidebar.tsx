"use client";

import React from "react";

import {
  Leaf,
  LayoutGrid,
  TrendingUp,
  Briefcase,
  Heart,
  Lightbulb,
  Palette,
  type LucideIcon,
} from "lucide-react";

import { motion } from "framer-motion";

import type { Category } from "@/types/post.types";

/** Slug pilihan "semua kategori" — bukan kategori dari backend. */
export const ALL_CATEGORIES = "semua";

// Backend tidak menyimpan ikon kategori, jadi ikon dipilih dari slug.
// Slug yang tidak dikenal (kategori baru dari admin) memakai ikon daun.
const ICON_BY_SLUG: Record<string, LucideIcon> = {
  growth: TrendingUp,
  karir: Briefcase,
  "self-care": Heart,
  "self-development": Lightbulb,
  creative: Palette,
};

function iconFor(slug: string): LucideIcon {
  if (slug === ALL_CATEGORIES) return LayoutGrid;
  return ICON_BY_SLUG[slug] ?? Leaf;
}

interface CategorySidebarProps {
  categories: Category[];
  isLoading: boolean;
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

export default function CategorySidebar({
  categories,
  isLoading,
  activeCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  const items = [
    { id: ALL_CATEGORIES, name: "Semua", slug: ALL_CATEGORIES },
    ...categories,
  ];

  return (
    <>
      {/* MOBILE CATEGORY FILTER */}
      <div className="mb-4 overflow-x-auto lg:hidden">
        <div className="flex gap-2 pb-2">
          {items.map((category) => {
            const isActive = activeCategory === category.slug;
            const Icon = iconFor(category.slug);

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.slug)}
                aria-pressed={isActive}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#3a5a40] text-white"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{category.name}</span>
              </button>
            );
          })}
          {isLoading && (
            <span
              aria-hidden="true"
              className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-gray-100"
            />
          )}
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="sticky top-24 hidden h-fit lg:block">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-gray-200 bg-white p-5"
        >
          <h2 className="mb-4 text-sm font-bold text-gray-900">Kategori</h2>

          <div className="space-y-2" aria-busy={isLoading}>
            {items.map((category) => {
              const isActive = activeCategory === category.slug;
              const Icon = iconFor(category.slug);

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onSelectCategory(category.slug)}
                  aria-pressed={isActive}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#3a5a40] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-gray-600"}>
                    <Icon size={18} aria-hidden="true" />
                  </span>

                  <span className="flex-1 text-left">{category.name}</span>
                </button>
              );
            })}

            {isLoading &&
              [0, 1, 2].map((i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="h-11 animate-pulse rounded-xl bg-gray-100"
                />
              ))}
          </div>

          {/* Wisdom */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="mb-2 text-xs font-semibold uppercase text-gray-600">
              Wisdom of the Day
            </p>

            <p className="text-xs italic leading-relaxed text-gray-600">
              Jangan menunggu momen yang sempurna untuk memulai perubahan.
            </p>
          </div>
        </motion.div>
      </aside>
    </>
  );
}
