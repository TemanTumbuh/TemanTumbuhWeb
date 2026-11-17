"use client";

import { getAuthConfig } from "@/config/authConfig";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const config = getAuthConfig("login");
  const { login, isLoggedIn, currentUser } = useAuth();
  const router = useRouter();

  // Satu-satunya tempat redirect: setelah login berhasil, dan juga bila user
  // yang sudah login membuka /login.
  useEffect(() => {
    if (isLoggedIn) {
      router.replace(currentUser?.role === "admin" ? "/admin" : "/feed");
    }
  }, [isLoggedIn, currentUser, router]);

  // Error (mis. email/kata sandi salah) dilempar ke AuthForm untuk ditampilkan.
  const handleLogin = async (formData: FormData) => {
    await login(
      String(formData.get("email") ?? "").trim(),
      String(formData.get("password") ?? ""),
    );
  };

  return (
    <AuthShell
      title={config.title}
      alternatePrompt={config?.alternatePrompt || ""}
      alternateHref={config?.alternateHref || "/register"}
      alternateLabel={config?.alternateLabel || ""}
    >
      <AuthForm type="login" onSubmit={handleLogin} />
    </AuthShell>
  );
}
