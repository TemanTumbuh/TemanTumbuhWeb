import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Jadwal Aktivitas · Teman Tumbuh",
  description: "Agenda dan aktivitas mendatang Teman Tumbuh — segera hadir.",
  robots: { index: false },
};

export default function JadwalAktivitasPage() {
  return (
    <PagePlaceholder
      title="Jadwal Aktivitas"
      description="Halaman jadwal lengkap sedang kami siapkan. Cek agenda terdekat di beranda untuk sementara."
      backHref="/#agenda"
      backLabel="Lihat agenda di beranda"
    />
  );
}
