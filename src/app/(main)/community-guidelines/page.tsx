import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Panduan Komunitas · Teman Tumbuh",
  description:
    "Aturan main dan nilai yang kami pegang bersama di komunitas Teman Tumbuh.",
  robots: { index: false },
};

export default function CommunityGuidelinesPage() {
  return (
    <PagePlaceholder
      title="Panduan Komunitas"
      description="Aturan main dan nilai yang kami pegang bersama sedang disusun. Sementara itu, prinsipnya sederhana: tumbuh bareng, saling menjaga."
    />
  );
}
