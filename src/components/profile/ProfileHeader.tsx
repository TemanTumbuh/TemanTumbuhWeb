"use client";

import { motion, type Variants } from "framer-motion";
import { Pencil, ShieldCheck } from "lucide-react";
import type { User } from "@/types/feed.types";
import type { ProfileStats } from "@/lib/feedHelpers";
import UserAvatar from "@/components/UserAvatar";
import AnimatedNumber from "./AnimatedNumber";

// Kurva ease-out yang tegas di awal lalu melandai — terasa "mendarat"
// ketimbang berhenti mendadak.
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

const avatarItem: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

interface StatProps {
  value: number;
  label: string;
  delay: number;
}

// Didefinisikan di level modul (bukan di dalam render) — lihat aturan
// react-hooks/static-components.
function Stat({ value, label, delay }: StatProps) {
  return (
    <div className="text-center sm:text-left">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block text-lg font-bold text-[#2d4632] tabular-nums sm:text-xl">
          <AnimatedNumber value={value} delay={delay} />
        </span>
        <span className="text-xs text-[#657668] sm:text-sm">{label}</span>
      </dd>
    </div>
  );
}

interface ProfileHeaderProps {
  user: User;
  stats: ProfileStats;
  onEdit: () => void;
}

export default function ProfileHeader({
  user,
  stats,
  onEdit,
}: ProfileHeaderProps) {
  const username =
    user.username || user.name.toLowerCase().replace(/\s+/g, "_");

  return (
    <motion.header
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-7 sm:flex-row sm:items-start sm:gap-10 md:gap-16"
    >
      <motion.div variants={avatarItem}>
        <UserAvatar
          src={user.avatar}
          name={user.name}
          size={144}
          className="ring-4 ring-[#e8efe9]"
        />
      </motion.div>

      <div className="min-w-0 flex-1">
        {/* Baris 1 — username + aksi */}
        <motion.div
          variants={item}
          className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <h1 className="min-w-0 truncate text-xl font-semibold text-[#2d4632] sm:text-2xl">
            @{username}
          </h1>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-2 rounded-full border border-[#cfe0d3] bg-white px-5 py-2 text-sm font-semibold text-[#2d4632] transition hover:border-[#2f8f4e] hover:bg-[#eaf6ee]"
          >
            <Pencil size={15} />
            Edit Profil
          </button>

          {user.role === "admin" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf6ee] px-3 py-1 text-xs font-semibold text-[#2f8f4e]">
              <ShieldCheck size={14} />
              Admin
            </span>
          )}
        </motion.div>

        {/* Baris 2 — nama lengkap, tepat di bawah username */}
        <motion.p
          variants={item}
          className="mt-2 text-center font-semibold text-[#2d4632] sm:text-left"
        >
          {user.name}
        </motion.p>

        {/* Baris 3 — statistik */}
        <motion.dl
          variants={item}
          className="mt-6 flex justify-center gap-10 sm:justify-start sm:gap-12"
        >
          <Stat value={stats.posts} label="postingan" delay={0.35} />
          <Stat value={stats.followers} label="pengikut" delay={0.45} />
          <Stat value={stats.following} label="mengikuti" delay={0.55} />
        </motion.dl>

        {/* Baris 4 — bio */}
        <motion.p
          variants={item}
          className="mt-5 max-w-prose text-center text-sm leading-relaxed text-[#657668] sm:text-left"
        >
          {user.bio || "Belum ada bio. Ceritakan sedikit tentang dirimu."}
        </motion.p>
      </div>
    </motion.header>
  );
}
