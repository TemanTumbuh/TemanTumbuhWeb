"use client";

import { getAuthConfig } from "@/config/authConfig";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const config = getAuthConfig("login");
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;

    const password = formData.get("password") as string;

    const user = await login(email, password);

    if (!user) {
      setError("Email atau password salah.");

      return;
    }

    setError(null);

    if (user.role === "admin") {
      router.push("/dashboard");

      return;
    }

    router.replace("/");
  };

  return (
    <AuthShell
      title={config.title}
      alternatePrompt={config?.alternatePrompt || ""}
      alternateHref={config?.alternateHref || "/register"}
      alternateLabel={config?.alternateLabel || ""}
    >
      <div>
        {error && (
          <div className="rounded-lg bg-yellow-50 px-3 py-2.5 text-sm text-yellow-700 mb-4">
            ℹ️ {error}
          </div>
        )}
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </AuthShell>
  );
}
