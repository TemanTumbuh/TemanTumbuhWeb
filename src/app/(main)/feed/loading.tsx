import PostCardSkeleton from "@/components/feed/posts/PostCardSkeleton";

export default function FeedLoading() {
  return (
    <div className="pb-12 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_320px]">
          {/* Sidebar kiri */}
          <div className="hidden lg:block">
            <div className="h-72 animate-pulse rounded-2xl border border-gray-200 bg-white" />
          </div>

          {/* Kolom tengah */}
          <div className="space-y-6">
            <div className="h-36 animate-pulse rounded-xl border border-gray-200 bg-white" />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>

          {/* Sidebar kanan */}
          <div className="hidden lg:block">
            <div className="h-80 animate-pulse rounded-xl border border-gray-200 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
