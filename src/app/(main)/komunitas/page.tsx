import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Komunitas · Teman Tumbuh",
  description: "Ruang komunitas Teman Tumbuh — segera hadir.",
  robots: { index: false },
};

export default function KomunitasPage() {
  return (
    <PagePlaceholder
      title="Komunitas"
      description="Halaman ini sedang dalam tahap pengembangan. Untuk saat ini, jelajahi cerita komunitas lewat Feed."
      backHref="/feed"
      backLabel="Lihat Feed"
    />
  );
}
