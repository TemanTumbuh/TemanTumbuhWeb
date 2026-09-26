"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Grid3x3 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMounted } from "@/hooks/useMounted";
import { getPostsByUser, getProfileStats } from "@/lib/feedHelpers";
import type { User } from "@/types/feed.types";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePostGrid from "@/components/profile/ProfilePostGrid";
import EditProfileDialog from "@/components/profile/EditProfileDialog";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center gap-7 sm:flex-row sm:items-start sm:gap-16">
        <div className="h-36 w-36 rounded-full bg-[#e8efe9]" />
        <div className="w-full flex-1 space-y-4">
          <div className="h-7 w-48 rounded bg-[#e8efe9]" />
          <div className="h-5 w-64 rounded bg-[#eef2ec]" />
          <div className="h-4 w-full max-w-sm rounded bg-[#eef2ec]" />
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="aspect-square rounded-2xl bg-[#eef2ec]" />
        ))}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const mounted = useMounted();
  const { currentUser, isLoggedIn, updateUser } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Sesi baru terbaca di client (localStorage), jadi redirect menunggu mount
  // supaya tidak menendang user keluar saat render server.
  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.replace("/login");
    }
  }, [mounted, isLoggedIn, router]);

  const posts = useMemo(
    () => (currentUser ? getPostsByUser(currentUser.id) : []),
    [currentUser],
  );
  const stats = useMemo(
    () =>
      currentUser
        ? getProfileStats(currentUser.id)
        : { posts: 0, followers: 0, following: 0 },
    [currentUser],
  );

  const handleSave = (patch: Partial<User>) => {
    updateUser(patch);
    setIsEditOpen(false);
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-5 pt-28 pb-20 sm:px-8 lg:pt-36">
      {!mounted || !currentUser ? (
        <ProfileSkeleton />
      ) : (
        <>
          <ProfileHeader
            user={currentUser}
            stats={stats}
            onEdit={() => setIsEditOpen(true)}
          />

          {/* Pemisah + label section, meniru tab bar Instagram.
              Sengaja satu item saja: tidak ada sumber data untuk tab lain,
              jadi tidak dibuat tab palsu yang tidak berfungsi. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-12 border-t border-[#e8efe9]"
          >
            <div className="flex justify-center">
              <span className="relative inline-flex items-center gap-2 px-5 py-4 text-[0.68rem] font-semibold tracking-[0.18em] text-[#2d4632] uppercase">
                {/* Garis aktif "digambar" dari tengah ke samping */}
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.62, ease: EASE_OUT }}
                  className="absolute inset-x-0 -top-px h-0.5 origin-center bg-[#2f8f4e]"
                />
                <Grid3x3 size={14} />
                Postingan
              </span>
            </div>
          </motion.div>

          <div className="mt-6">
            <ProfilePostGrid posts={posts} />
          </div>

          {/* Dirender hanya saat terbuka: mount/unmount yang mengurus reset
              isi form, jadi tidak perlu sinkronisasi state di effect. */}
          {isEditOpen && (
            <EditProfileDialog
              user={currentUser}
              onSave={handleSave}
              onClose={() => setIsEditOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
