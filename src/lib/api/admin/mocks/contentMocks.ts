import type { ProfileContent } from "@/types/admin.types";

let profileContent: ProfileContent = {
  about: {
    headline: "Menumbuhkan Kebahagiaan Bersama Teman Tumbuh",
    description:
      "Teman Tumbuh adalah komunitas yang didedikasikan untuk mendukung pertumbuhan pribadi dan kesejahteraan. Kami percaya bahwa setiap individu memiliki potensi untuk berkembang dan mencapai kebahagiaan melalui koneksi yang bermakna, pembelajaran berkelanjutan, dan dukungan komunitas yang positif.",
    featuredImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    stats: { members: "10k+", workshops: "450", partners: "85" },
  },
  agenda: {
    headline: "Agenda Mendatang",
    description: "Temukan workshop, acara komunitas, dan kegiatan menarik yang akan datang di Teman Tumbuh.",
  },
  vision: {
    headline: "Visi & Misi Kami",
    description:
      "Visi: Menjadi platform komunitas terdepan untuk pertumbuhan pribadi di Indonesia.\n\nMisi: Menyediakan ruang aman bagi setiap individu untuk belajar, berbagi, dan tumbuh bersama.",
  },
  lastEdited: "2 hours ago",
  editedBy: "Admin",
  status: "published",
};

export async function getProfileContent(): Promise<ProfileContent> {
  await new Promise((r) => setTimeout(r, 400));
  return { ...profileContent, about: { ...profileContent.about, stats: { ...profileContent.about.stats } } };
}

export async function saveProfileContent(data: ProfileContent): Promise<ProfileContent> {
  await new Promise((r) => setTimeout(r, 500));
  profileContent = { ...data, lastEdited: "Just now", editedBy: "Admin" };
  return profileContent;
}
