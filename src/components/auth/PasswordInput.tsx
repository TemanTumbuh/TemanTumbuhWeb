"use client";

import { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  /**
   * Konten opsional yang dirender DI BAWAH kolom (bukan di baris label di
   * atasnya). Sengaja ditempatkan setelah elemen <input> secara DOM — bukan
   * cuma soal tampilan, tapi juga urutan Tab: kalau ada elemen fokusable
   * (mis. link "Lupa Sandi?") diletakkan sebelum <input> di DOM, Tab dari
   * kolom sebelumnya akan singgah dulu ke situ sebelum sampai ke kolom ini.
   */
  belowContent?: ReactNode;
};

export default function PasswordInput({
  label,
  belowContent,
  className,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.62rem] font-semibold tracking-[0.18em] text-[#586557] uppercase sm:text-[0.66rem]">
        {label}
      </span>

      {/*
        Outline aktif ditaruh di pembungkus ini (lewat focus-within), bukan di
        <input> itu sendiri — <input> punya focus-visible:outline-none supaya
        tidak muncul kotak fokus ganda milik browser di dalam pil ini.
        Latar default & aktif sama-sama terang; yang membedakan cuma cincin
        di sekeliling pembungkus saat salah satu anak elemennya fokus.
      */}
      <span className="flex h-[2.95rem] items-center gap-3 rounded-full bg-white px-4 text-[#7d857d] shadow-[inset_0_0_0_1px_rgba(111,125,108,0.18)] transition focus-within:shadow-[inset_0_0_0_1.5px_rgba(58,90,64,0.7),0_0_0_4px_rgba(58,90,64,0.16)] sm:h-[3.1rem] sm:px-5">
        <span className="shrink-0 text-[#8b9388]" aria-hidden="true">
          <Lock size={16} strokeWidth={1.7} />
        </span>

        <input
          type={isVisible ? "text" : "password"}
          className={`auth-input w-full border-0 bg-transparent text-[0.8rem] text-[#2a332d] outline-none placeholder:text-[#9ea49b] sm:text-[0.88rem] ${className ?? ""}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setIsVisible((v) => !v)}
          aria-label={
            isVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
          }
          aria-pressed={isVisible}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#808880] hover:bg-[#f1f1ea] hover:text-[#334232]"
        >
          {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </span>

      {belowContent && (
        <span className="mt-1.5 flex justify-end">{belowContent}</span>
      )}
    </label>
  );
}
