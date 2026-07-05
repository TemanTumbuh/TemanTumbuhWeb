"use client";

import { useState } from "react";
import Link from "next/link";
import { getAuthConfig } from "@/config/authConfig";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";

export default function ForgotPasswordPage() {
  const config = getAuthConfig("forgot-password");
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (formData: FormData) => {
    const emailValue = formData.get("email") as string;
    setEmail(emailValue);

    try {
      // UNCOMMENT & IMPLEMENT THIS PART when backend is ready:
      // const response = await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: emailValue }),
      // });
      //
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message || "Email tidak terdaftar");
      // }
      //
      // const data = await response.json();

      // Temporary: Simulate success
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      throw new Error(message);
    }
  };

  return (
    <AuthShell
      title={config.title}
      subtitle={config.subtitle}
      alternatePrompt=""
      alternateHref="/"
      alternateLabel=""
    >
      {isSuccess ? (
        <div className="mt-6 space-y-4 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-7 w-7 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-[#212a24]">
            Link Reset Dikirim
          </h2>
          <p className="text-sm text-[#667168]">
            Kami telah mengirim link reset ke{" "}
            <span className="font-medium">{email}</span>. Silakan cek email Anda
            (termasuk folder spam).
          </p>

          <button
            onClick={() => setIsSuccess(false)}
            className="mt-4 text-sm font-medium text-[#2f4f24] transition hover:text-[#1a2f18]"
          >
            Kirim ke email lain
          </button>

          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-xs text-[#7a857d]">Kembali ke</span>
            <Link
              href="/login"
              className="text-xs font-semibold text-[#2f4f24] transition hover:text-[#1a2f18]"
            >
              Login
            </Link>
          </div>
        </div>
      ) : (
        <AuthForm type="forgot-password" onSubmit={handleForgotPassword} />
      )}
    </AuthShell>
  );
}
