"use client";

import Link from "next/link";
import { useState } from "react";
import { getAuthFields } from "@/config/authFields";
import { getAuthConfig } from "@/config/authConfig";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { ApiError } from "@/lib/http";

function validateRegister(formData: FormData): string | null {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (username.length < 3 || username.length > 50) {
    return "Nama pengguna harus 3–50 karakter.";
  }
  if (password.length < 8 || password.length > 72) {
    return "Kata sandi harus 8–72 karakter.";
  }
  if (password !== confirmPassword) {
    return "Konfirmasi kata sandi tidak cocok.";
  }
  return null;
}

// Pesan validasi backend (Zod) masih berbahasa Inggris; terjemahkan per field.
const FIELD_ERRORS: Record<string, string> = {
  username: "Nama pengguna harus 3–50 karakter.",
  email: "Format email tidak valid.",
  password: "Kata sandi harus 8–72 karakter.",
  confirmPassword: "Konfirmasi kata sandi tidak cocok.",
};

function toErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    const field = err.details.find((d) => d.field && FIELD_ERRORS[d.field]);
    if (field?.field) return FIELD_ERRORS[field.field];
    return err.message;
  }
  return err instanceof Error ? err.message : "Terjadi kesalahan";
}

interface AuthFormProps {
  type: "login" | "register" | "reset-password" | "forgot-password";
  onSubmit?: (formData: FormData) => Promise<void> | void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const fields = getAuthFields(type);
  const config = getAuthConfig(type);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!onSubmit) return;

    const formData = new FormData(e.currentTarget);

    // Aturan yang sama dengan registerSchema backend — dicek di sini dulu supaya
    // pesannya berbahasa Indonesia dan tidak perlu bolak-balik ke server.
    if (type === "register") {
      const clientError = validateRegister(formData);
      if (clientError) {
        setError(clientError);
        return;
      }
    }

    // Validate password matching for reset-password type
    if (type === "reset-password") {
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        setError("Kata sandi tidak cocok");
        return;
      }

      if (password.length < 8) {
        setError("Kata sandi minimal 8 karakter");
        return;
      }
    }

    setIsLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="mt-6 space-y-3.5 sm:mt-7 sm:space-y-4"
      onSubmit={handleSubmit}
    >
      {error && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2.5 text-[0.75rem] text-red-700 sm:px-4"
        >
          {error}
        </div>
      )}

      {fields.map((field, index) => {
        const isPassword = field.type === "password";
        const isForgotPasswordField =
          type === "login" && field.name === "password";

        return isPassword ? (
          <PasswordInput
            key={`${type}-${field.name}`}
            label={field.label}
            name={field.name}
            id={field.name}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            minLength={field.minLength}
            required={field.required}
            belowContent={
              isForgotPasswordField ? (
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#5b675a] transition hover:text-[#2d4632]"
                >
                  Lupa Sandi?
                </Link>
              ) : undefined
            }
          />
        ) : (
          <AuthInput
            key={`${type}-${field.name}`}
            label={field.label}
            name={field.name}
            type={field.type}
            id={field.name}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            required={field.required}
            iconType={field.icon}
            autoFocus={index === 0}
          />
        );
      })}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="group inline-flex h-[2.95rem] w-full items-center justify-center gap-2 rounded-full bg-[#2f4f24] px-6 text-[0.82rem] font-semibold text-white shadow-[0_8px_18px_rgba(47,79,36,0.18)] transition hover:-translate-y-0.5 hover:bg-[#28441f] disabled:opacity-60 disabled:cursor-not-allowed mt-4"
      >
        <span>{isLoading ? "Memproses..." : config.submitLabel}</span>

        {!isLoading && (
          <span className="transition-transform group-hover:translate-x-1 text-2xl">
            →
          </span>
        )}
      </button>

      {/* Social */}
      <button
        type="button"
        className="inline-flex h-[2.95rem] w-full items-center justify-center gap-2 rounded-full bg-[#efefe8] px-6 text-[0.8rem] font-semibold text-[#2f352e] shadow-[inset_0_0_0_1px_rgba(103,116,98,0.08)] transition hover:bg-[#ebebe2]"
      >
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-xs bg-white text-[0.6rem] font-bold text-[#8f9790] shadow">
          G
        </span>
        <span>
          {type === "login" ? "Masuk dengan Google" : "Tumbuh dengan Google"}
        </span>
      </button>
    </form>
  );
}
