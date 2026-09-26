/**
 * Placeholder saat post dimuat. Didefinisikan di level modul (bukan di dalam
 * render) supaya React tidak me-remount subtree tiap render — lihat aturan
 * `react-hooks/static-components`.
 */
export default function PostCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
          <div className="h-3 w-32 rounded bg-gray-100" />
        </div>
      </div>
      <div className="mb-4 space-y-3">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-40 rounded bg-gray-200" />
      </div>
      <div className="h-10 rounded bg-gray-100" />
    </div>
  );
}
