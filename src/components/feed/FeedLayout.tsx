"use client";

import React from "react";
import { motion } from "framer-motion";

import CategorySidebar from "./CategorySidebar";
import FeedContent from "./FeedContent";
import SuggestionsSidebar from "./SuggestionsSidebar";

import { useAuth } from "@/hooks/useAuth";
import { useFeedPosts } from "@/hooks/useFeedPosts";
import { useCategories } from "@/hooks/useCategories";

import { getSuggestedUsers } from "@/lib/feedHelpers";

export default function FeedLayout() {
  const { currentUser, isLoggedIn } = useAuth();

  const { posts, loading, activeCategory, filterByCategory } = useFeedPosts();

  const { categories } = useCategories();

  const suggestedUsers = getSuggestedUsers(currentUser?.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="pb-12 pt-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_320px]">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 }}
          >
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={filterByCategory}
            />
          </motion.div>

          {/* CENTER */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <FeedContent
              posts={posts}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              loading={loading}
            />
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.16 }}
            className="hidden lg:block"
          >
            <SuggestionsSidebar suggestedUsers={suggestedUsers} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
