"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Heart, MessageCircle, Sprout } from "lucide-react";
import type { Post } from "@/types/feed.types";
import { formatDate } from "@/lib/feedHelpers";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

interface ProfilePostGridProps {
  posts: Post[];
}

export default function ProfilePostGrid({ posts }: ProfilePostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-[#d7e3d9] bg-[#f9fbf8] px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf6ee] text-[#2f8f4e]">
          <Sprout size={26} />
        </span>
        <p className="font-semibold text-[#2d4632]">Belum ada postingan</p>
        <p className="max-w-xs text-sm text-[#657668]">
          Cerita pertamamu akan tampil di sini. Mulai dari hal kecil yang kamu
          pelajari hari ini.
        </p>
      </div>
    );
  }

  return (
    // whileInView (bukan animate) supaya kartu di bawah lipatan layar baru
    // beranimasi saat benar-benar terlihat; yang sudah terlihat saat load
    // langsung jalan.
    <motion.ul
      variants={gridContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4"
    >
      {posts.map((post) => (
        <motion.li key={post.id} variants={tile}>
          <article className="group relative aspect-square overflow-hidden rounded-2xl border border-[#e8efe9] bg-[#f6f9f5]">
            {post.image ? (
              <Image
                src={post.image}
                alt={`Postingan: ${post.content.slice(0, 60)}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full flex-col justify-between p-4">
                <p className="line-clamp-6 text-[0.8rem] leading-relaxed text-[#3d4f42]">
                  {post.content}
                </p>
                <span className="text-[0.65rem] font-semibold tracking-wide text-[#8aa08f] uppercase">
                  {formatDate(post.timestamp)}
                </span>
              </div>
            )}

            {/* Overlay statistik — muncul saat hover / fokus keyboard */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-6 bg-[#142018]/55 opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <Heart size={17} className="fill-white" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <MessageCircle size={17} className="fill-white" />
                {post.comments}
              </span>
            </div>
          </article>
        </motion.li>
      ))}
    </motion.ul>
  );
}
