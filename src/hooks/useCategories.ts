"use client";

import { useQuery } from "@tanstack/react-query";
import { listCategories } from "@/services/categoryService";

export const categoriesKey = ["categories"] as const;

/** Daftar kategori aktif (`GET /api/v1/categories`). Jarang berubah. */
export function useCategories() {
  const query = useQuery({
    queryKey: categoriesKey,
    queryFn: ({ signal }) => listCategories(signal),
    staleTime: 5 * 60_000,
  });

  return {
    categories: query.data ?? [],
    isLoading: query.isPending,
    error: query.error,
  };
}
