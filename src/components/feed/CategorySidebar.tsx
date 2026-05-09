"use client";

import React from "react";

import {
  Leaf,
  TrendingUp,
  Briefcase,
  Heart,
  Lightbulb,
  Palette,
} from "lucide-react";

import { motion } from "framer-motion";

import { Category } from "@/types/feed.types";

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf size={18} />,
  TrendingUp: <TrendingUp size={18} />,
  Briefcase: <Briefcase size={18} />,
  Heart: <Heart size={18} />,
  Lightbulb: <Lightbulb size={18} />,
  Palette: <Palette size={18} />,
};

export default function CategorySidebar({
  categories,
  activeCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <>
      {/* MOBILE CATEGORY FILTER */}
      <div className="mb-4 overflow-x-auto lg:hidden">
        <div className="flex gap-2 pb-2">
          {categories.map((category) => {
            const isActive = activeCategory === category.slug;

            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.slug)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#3a5a40] text-white"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                <span>{iconMap[category.icon] || <Leaf size={16} />}</span>

                <span>{category.name}</span>
              </button>
            );
          })}
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

          <div className="space-y-2">
            {categories.map((category) => {
              const isActive = activeCategory === category.slug;

              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category.slug)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#3a5a40] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-gray-600"}>
                    {iconMap[category.icon] || <Leaf size={18} />}
                  </span>

                  <span className="flex-1 text-left">{category.name}</span>
                </button>
              );
            })}
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
