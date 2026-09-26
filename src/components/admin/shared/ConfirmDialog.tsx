"use client";

import React, { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  /** Default "Delete" — cocok untuk pemakaian saat ini (semua caller adalah konfirmasi hapus). */
  confirmLabel?: string;
  cancelLabel?: string;
  /** "danger" (merah, default) untuk aksi destruktif, "neutral" untuk konfirmasi non-destruktif. */
  variant?: "danger" | "neutral";
  /** Nonaktifkan tombol + tampilkan status memproses saat konfirmasi sedang berjalan (async). */
  loading?: boolean;
}

/**
 * Dibangun di atas elemen <dialog> native supaya dapat gratis:
 * - role="dialog" + aria-modal
 * - fokus terkunci dalam dialog
 * - tombol Esc menutup dialog (memicu onCancel)
 * - klik backdrop (::backdrop) menutup dialog
 * - fokus dikembalikan ke elemen pemicu setelah ditutup
 * (lihat audit A2 — implementasi sebelumnya tidak punya satu pun dari ini)
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Esc dan submit form method="dialog" memicu "cancel"/"close" native.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault(); // kita yang kendalikan lewat prop `open`, bukan DOM langsung
      if (!loading) onCancel();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onCancel, loading]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Klik dianggap "di backdrop" hanya jika targetnya elemen <dialog> itu sendiri
    // (klik di dalam konten akan mengenai anak elemen, bukan <dialog>).
    if (e.target === dialogRef.current && !loading) onCancel();
  };

  const confirmClasses =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-primary hover:bg-primary-hover";

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={() => {
        // Ditutup lewat Esc/backdrop tanpa lewat state React (jarang, tapi
        // jaga-jaga) — samakan lagi dengan prop `open`.
        if (open) onCancel();
      }}
      aria-labelledby="confirm-dialog-title"
      className="m-auto w-full max-w-md rounded-3xl border border-admin-border bg-white p-6 shadow-lg backdrop:bg-black/50"
    >
      <h3 id="confirm-dialog-title" className="text-lg font-bold text-heading">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-admin-border px-4 py-2 text-sm font-medium text-[#556658] hover:bg-admin-bg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${confirmClasses}`}
        >
          {loading ? "Memproses…" : confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
