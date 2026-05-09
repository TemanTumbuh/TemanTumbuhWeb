"use client";

import { useState, useEffect } from "react";
import { Post } from "@/types/feed.types";
import { generateMockPosts, filterPostsByCategory } from "@/lib/feedHelpers";

interface UseFeedPostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  activeCategory: string;
  filterByCategory: (slug: string) => void;
}

export const useFeedPosts = (): UseFeedPostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("semua");

  // Initial load
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Mock API call - replace with real fetch when backend ready
        // const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}`)
        // const data = await response.json()

        const data = generateMockPosts();
        setPosts(data);
        setFilteredPosts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle category filter
  useEffect(() => {
    const filtered = filterPostsByCategory(posts, activeCategory);
    setFilteredPosts(filtered);
  }, [activeCategory, posts]);

  const filterByCategory = (slug: string) => {
    setActiveCategory(slug);
  };

  return {
    posts: filteredPosts,
    loading,
    error,
    activeCategory,
    filterByCategory,
  };
};
