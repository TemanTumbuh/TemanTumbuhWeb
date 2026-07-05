"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { getAuthConfig } from "@/config/authConfig";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const config = getAuthConfig("reset-password");
  const _token = params.token as string;
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async (formData: FormData) => {
    const _password = formData.get("password") as string;

    try {
      // UNCOMMENT & IMPLEMENT THIS PART when backend is ready:
      // const response = await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token, password }),
      // });
      //
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message || "Gagal mengatur ulang kata sandi");
      // }
      //
      // const data = await response.json();

      // Temporary: Simulate success
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
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
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-7 w-7 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-[#212a24]">
            Kata Sandi Berhasil Diatur Ulang
          </h2>
          <p className="text-sm text-[#667168]">
            Silakan login dengan kata sandi baru Anda
          </p>
        </div>
      ) : (
        <AuthForm type="reset-password" onSubmit={handleResetPassword} />
      )}
    </AuthShell>
  );
}
