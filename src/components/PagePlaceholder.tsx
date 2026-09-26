import Link from "next/link";

interface PagePlaceholderProps {
  title: string;
  description?: string;
  /** Label & tujuan tautan kembali. Default: beranda. */
  backHref?: string;
  backLabel?: string;
}

/**
 * Halaman yang rutenya sudah ada tapi kontennya belum ditulis.
 * Dipakai supaya tautan di Navbar/Footer tidak berujung 404.
 */
export default function PagePlaceholder({
  title,
  description = "Halaman ini sedang kami siapkan. Terima kasih sudah bersabar.",
  backHref = "/",
  backLabel = "Kembali ke beranda",
}: PagePlaceholderProps) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="mb-4 text-3xl" aria-hidden="true">
        🌱
      </span>

      <h1 className="text-2xl font-semibold tracking-tight text-[#2d4632] sm:text-3xl">
        {title}
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#657668]">
        {description}
      </p>

      <Link
        href={backHref}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3a5a40] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d4632]"
      >
        {backLabel}
      </Link>
    </section>
  );
}
