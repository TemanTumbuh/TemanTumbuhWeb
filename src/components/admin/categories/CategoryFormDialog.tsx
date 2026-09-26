"use client";

import React, { useEffect, useRef, useState } from "react";
import type { FeedCategory } from "@/types/admin.types";

type CategoryInput = Omit<FeedCategory, "id">;

interface CategoryFormDialogProps {
  /** Lempar Error untuk menampilkan pesan di form (mis. slug duplikat). */
  onSubmit: (data: CategoryInput) => Promise<void>;
  onClose: () => void;
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DEFAULT_COLOR = "#3a5a40";

const INPUT_CLASS =
  "w-full rounded-xl border border-admin-border bg-white px-4 py-2.5 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary";
const LABEL_CLASS = "mb-1.5 block text-sm font-semibold text-heading";

/** "Self Care & Wellness" → "self-care-wellness" */
function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Form buat kategori. Menggantikan tombol "Create Category" lama yang
 * langsung menyimpan entri dummy "New Category" tanpa bertanya — setiap klik
 * menambah duplikat dengan slug yang sama.
 *
 * Seperti EditProfileDialog: dibangun di atas <dialog> native (focus trap, Esc,
 * aria-modal gratis) dan HANYA dirender saat terbuka, sehingga isi form selalu
 * segar tanpa perlu reset state di useEffect.
 */
export default function CategoryFormDialog({
  onSubmit,
  onClose,
}: CategoryFormDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  // Slug mengikuti nama sampai admin mengeditnya sendiri.
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [status, setStatus] = useState<FeedCategory["status"]>("draft");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      if (!submitting) onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose, submitting]);

  const slugInvalid = slug.length > 0 && !SLUG_PATTERN.test(slug);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !slug || slugInvalid) return;

    setSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        name: name.trim(),
        slug,
        description: description.trim(),
        color,
        status,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan kategori.");
      setSubmitting(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current && !submitting) onClose();
      }}
      aria-labelledby="category-form-title"
      className="m-auto w-full max-w-lg rounded-3xl border border-admin-border bg-white p-6 shadow-lg backdrop:bg-black/50"
    >
      <h2 id="category-form-title" className="text-lg font-bold text-heading">
        Buat Kategori
      </h2>
      <p className="mt-1 text-sm text-muted">
        Kategori dipakai untuk mengelompokkan postingan di feed.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
        <div>
          <label htmlFor="category-name" className={LABEL_CLASS}>
            Nama
          </label>
          <input
            id="category-name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            maxLength={40}
            required
            placeholder="mis. Self Care"
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="category-slug" className={LABEL_CLASS}>
            Slug
          </label>
          <input
            id="category-slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value.toLowerCase());
            }}
            maxLength={40}
            required
            placeholder="self-care"
            aria-invalid={slugInvalid}
            aria-describedby="category-slug-hint"
            className={`${INPUT_CLASS} font-mono ${slugInvalid ? "border-red-400 focus:ring-red-400" : ""}`}
          />
          <p
            id="category-slug-hint"
            className={`mt-1 text-xs ${slugInvalid ? "text-red-600" : "text-muted"}`}
          >
            {slugInvalid
              ? "Hanya huruf kecil, angka, dan tanda hubung (tidak di awal/akhir)."
              : "Dipakai di URL & filter feed. Terisi otomatis dari nama."}
          </p>
        </div>

        <div>
          <label htmlFor="category-description" className={LABEL_CLASS}>
            Deskripsi
          </label>
          <textarea
            id="category-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            maxLength={160}
            placeholder="Jelaskan singkat isi kategori ini"
            className={`${INPUT_CLASS} resize-none`}
          />
          <p className="mt-1 text-right text-xs text-muted">
            {description.length}/160
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category-color" className={LABEL_CLASS}>
              Warna
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-admin-border px-3 py-1.5">
              <input
                id="category-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <span className="font-mono text-sm text-muted uppercase">{color}</span>
            </div>
          </div>

          <div>
            <label htmlFor="category-status" className={LABEL_CLASS}>
              Status
            </label>
            <select
              id="category-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as FeedCategory["status"])}
              className={INPUT_CLASS}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-xl border border-admin-border px-4 py-2 text-sm font-medium text-[#556658] hover:bg-admin-bg disabled:opacity-60"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={submitting || !name.trim() || !slug || slugInvalid}
            className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Menyimpan…" : "Simpan"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
