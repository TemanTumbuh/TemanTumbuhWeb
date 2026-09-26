import type { Metadata } from "next";
import PagePlaceholder from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Kebijakan Privasi · Teman Tumbuh",
  description:
    "Bagaimana Teman Tumbuh mengumpulkan, memakai, dan melindungi data anggotanya.",
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <PagePlaceholder
      title="Kebijakan Privasi"
      description="Penjelasan lengkap tentang data apa yang kami kumpulkan dan bagaimana kami menjaganya sedang disiapkan."
    />
  );
}
