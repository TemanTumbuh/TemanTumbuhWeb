import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan · Teman Tumbuh",
  robots: { index: false },
};

/**
 * Boundary 404 global.
 *
 * Sengaja TIDAK mengimpor Navbar/Footer: Next menyerialisasi boundary ini ke
 * payload RSC setiap halaman, jadi apa pun yang diimpor di sini ikut terkirim
 * di seluruh aplikasi. Chrome-nya dibuat ringan dan mandiri (tanpa client
 * component / useAuth) supaya biayanya mendekati nol.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <Link href="/" className="mb-10 inline-flex" aria-label="Teman Tumbuh, ke beranda">
        <Image
          src="/images/maskot-temantumbuh.jpg"
          alt="Teman Tumbuh"
          width={120}
          height={40}
          sizes="120px"
          className="object-contain mix-blend-multiply"
          priority
        />
      </Link>

      <p className="text-sm font-semibold tracking-[0.2em] text-[#8e9e92] uppercase">
        404
      </p>

      <h1 className="mt-3 max-w-md text-2xl font-semibold tracking-tight text-[#2d4632] sm:text-3xl">
        Sepertinya kamu tersesat
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#657668]">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan. Yuk kembali dan
        lanjutkan tumbuh dari sini.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-[#3a5a40] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d4632]"
        >
          Kembali ke beranda
        </Link>
        <Link
          href="/feed"
          className="rounded-full border-2 border-[#3a5a40] px-6 py-2.5 text-sm font-semibold text-[#3a5a40] transition hover:bg-[#3a5a40] hover:text-white"
        >
          Lihat Feed
        </Link>
      </div>
    </div>
  );
}
