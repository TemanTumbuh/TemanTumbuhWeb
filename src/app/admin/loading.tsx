export default function AdminLoading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-live="polite">
      <span className="sr-only">Memuat halaman admin…</span>

      {/* Header halaman */}
      <div className="space-y-2">
        <div className="h-7 w-56 animate-pulse rounded bg-admin-border" />
        <div className="h-4 w-80 animate-pulse rounded bg-admin-bg" />
      </div>

      {/* Baris kartu statistik */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-3xl border border-admin-border bg-white"
          />
        ))}
      </div>

      {/* Tabel */}
      <div className="h-96 animate-pulse rounded-3xl border border-admin-border bg-white" />
    </div>
  );
}
