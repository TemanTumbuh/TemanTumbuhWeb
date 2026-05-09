"use client";

import Link from "next/link";
import { useState } from "react";
import { getAuthFields } from "@/config/authFields";
import { getAuthConfig } from "@/config/authConfig";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";

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
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(message);
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
        <div className="rounded-lg bg-red-50 px-3 py-2.5 text-[0.75rem] text-red-700 sm:px-4">
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
            labelAction={
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
