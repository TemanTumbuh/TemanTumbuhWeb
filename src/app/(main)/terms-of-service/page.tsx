import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan · Teman Tumbuh",
  description:
    "Syarat dan ketentuan penggunaan layanan komunitas Teman Tumbuh.",
  robots: { index: false },
};

export default function TermsOfServicePage() {
  return (
    <PagePlaceholder
      title="Syarat & Ketentuan"
      description="Ketentuan penggunaan layanan Teman Tumbuh sedang disusun bersama tim."
    />
  );
}
