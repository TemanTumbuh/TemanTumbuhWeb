import type { NextConfig } from "next";
import { ALLOWED_IMAGE_HOSTS } from "./src/lib/imageHosts";

// Origin API sebenarnya yang dituju proxy `/bff`. Override via env bila perlu
// (mis. menunjuk ke API lokal saat pengembangan backend).
const API_ORIGIN =
  process.env.API_PROXY_TARGET ?? "https://dev.api.temantumbuh.czn.my.id";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Diturunkan dari satu sumber di src/lib/imageHosts.ts, yang juga dipakai
    // UserAvatar untuk memeriksa URL sebelum dirender — supaya daftar izin di
    // sini tidak pernah berbeda dengan daftar yang dicek di runtime.
    remotePatterns: ALLOWED_IMAGE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },
  async rewrites() {
    // Proxy same-origin: browser memanggil `/bff/*`, Next server meneruskan ke
    // API dev. Menghindari blokir CORS (backend belum mengirim header CORS).
    // Hapus / sesuaikan saat backend sudah mengaktifkan CORS untuk origin FE.
    return [{ source: "/bff/:path*", destination: `${API_ORIGIN}/:path*` }];
  },
};

export default nextConfig;
