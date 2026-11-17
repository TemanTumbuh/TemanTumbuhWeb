"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthConfig } from "@/config/authConfig";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const config = getAuthConfig("register");
  const { register, isLoggedIn } = useAuth();
  const router = useRouter();

  // Backend langsung memberi token saat registrasi, jadi user sudah login.
  useEffect(() => {
    if (isLoggedIn) router.replace("/feed");
  }, [isLoggedIn, router]);

  const handleRegister = async (formData: FormData) => {
    await register({
      username: String(formData.get("username") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    });
  };

  return (
    <AuthShell
      title={config.title}
      alternatePrompt={config.alternatePrompt ?? ""}
      alternateHref={config.alternateHref ?? ""}
      alternateLabel={config.alternateLabel ?? ""}
    >
      <AuthForm type="register" onSubmit={handleRegister} />
    </AuthShell>
  );
}
