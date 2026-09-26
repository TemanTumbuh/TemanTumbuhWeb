"use client";

import React, { useEffect, useRef, useState } from "react";
import type { User } from "@/types/feed.types";
import UserAvatar from "@/components/UserAvatar";

interface EditProfileDialogProps {
  user: User;
  onSave: (patch: Partial<User>) => void;
  onClose: () => void;
}

const FIELD_SHELL =
  "flex items-center rounded-2xl bg-white px-4 py-2.5 shadow-[inset_0_0_0_1px_rgba(111,125,108,0.18)] transition focus-within:shadow-[inset_0_0_0_1.5px_rgba(58,90,64,0.7),0_0_0_4px_rgba(58,90,64,0.16)]";
const FIELD_INPUT =
  "auth-input w-full border-0 bg-transparent text-sm text-[#2a332d] outline-none placeholder:text-[#9ea49b]";
const FIELD_LABEL =
  "mb-1.5 block text-[0.62rem] font-semibold tracking-[0.18em] text-[#586557] uppercase";

/**
 * Form edit profil. Sama seperti ConfirmDialog, dibangun di atas <dialog>
 * native supaya dapat role/aria-modal, focus trap, Esc, dan pengembalian
 * fokus tanpa implementasi manual.
 *
 * Komponen ini HANYA dirender saat dialog terbuka (lihat pemanggilnya). Jadi
 * isi form otomatis segar dari `user` lewat initializer useState setiap kali
 * dibuka — tidak perlu menyinkronkan state di dalam useEffect, yang justru
 * memicu cascading render (react-hooks/set-state-in-effect).
 */
export default function EditProfileDialog({
  user,
  onSave,
  onClose,
}: EditProfileDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username ?? "");
  const [bio, setBio] = useState(user.bio ?? "");
  const [avatar, setAvatar] = useState(user.avatar);

  // Buka sebagai modal saat komponen mount (efek ke DOM, bukan setState).
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault(); // state `open` yang jadi sumber kebenaran
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      name: name.trim() || user.name,
      username: username.trim() || undefined,
      bio: bio.trim() || undefined,
      avatar: avatar.trim(),
    });
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-labelledby="edit-profile-title"
      className="m-auto w-full max-w-md rounded-3xl border border-[#e8efe9] bg-[#fdfdfb] p-6 shadow-[0_24px_60px_-20px_rgba(20,32,24,0.35)] backdrop:bg-black/50"
    >
      <h2
        id="edit-profile-title"
        className="text-lg font-bold text-[#2d4632]"
      >
        Edit Profil
      </h2>
      <p className="mt-1 text-sm text-[#657668]">
        Perubahan tersimpan di perangkat ini dulu selama profil belum
        tersambung ke server.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="flex items-center gap-4">
          <UserAvatar src={avatar} name={name} size={56} />
          <div className="min-w-0 flex-1">
            <label className="block">
              <span className={FIELD_LABEL}>URL Avatar</span>
              <span className={FIELD_SHELL}>
                <input
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://..."
                  className={FIELD_INPUT}
                />
              </span>
            </label>
          </div>
        </div>

        <label className="block">
          <span className={FIELD_LABEL}>Nama</span>
          <span className={FIELD_SHELL}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
              className={FIELD_INPUT}
            />
          </span>
        </label>

        <label className="block">
          <span className={FIELD_LABEL}>Nama Pengguna</span>
          <span className={FIELD_SHELL}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="temantumbuh_123"
              maxLength={50}
              className={FIELD_INPUT}
            />
          </span>
        </label>

        <label className="block">
          <span className={FIELD_LABEL}>Bio</span>
          <span className={`${FIELD_SHELL} items-start`}>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={200}
              placeholder="Ceritakan sedikit tentang dirimu"
              className={`${FIELD_INPUT} resize-none`}
            />
          </span>
          <span className="mt-1 block text-right text-[0.7rem] text-[#8aa08f]">
            {bio.length}/200
          </span>
        </label>

        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#cfe0d3] px-5 py-2.5 text-sm font-semibold text-[#556658] transition hover:bg-[#eef2ec]"
          >
            Batal
          </button>
          <button
            type="submit"
            className="rounded-full bg-[#2f8f4e] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f6b39]"
          >
            Simpan
          </button>
        </div>
      </form>
    </dialog>
  );
}
