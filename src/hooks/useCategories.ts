"use client";

import { useState, useEffect } from "react";
import { Category } from "@/types/feed.types";
import { getCategories } from "@/lib/feedHelpers";

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        // Mock API call - replace with real fetch when backend ready
        // const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORIES}`)
        // const data = await response.json()

        const data = getCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories",
        );
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
};
