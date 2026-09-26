import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Tentang Kami · Teman Tumbuh",
  description: "Kisah dan misi di balik Teman Tumbuh — segera hadir.",
  robots: { index: false },
};

export default function TentangKamiPage() {
  return (
    <PagePlaceholder
      title="Tentang Kami"
      description="Halaman ini sedang dalam tahap pengembangan. Sementara itu, kamu bisa membaca ringkasannya di beranda."
      backHref="/#tentang-kami"
      backLabel="Lihat di beranda"
    />
  );
}
