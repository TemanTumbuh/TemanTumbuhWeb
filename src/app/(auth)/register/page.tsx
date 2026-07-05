import { getAuthConfig } from "@/config/authConfig";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  const config = getAuthConfig("register");

  return (
    <AuthShell
      title={config.title}
      alternatePrompt={config.alternatePrompt ?? ""}
      alternateHref={config.alternateHref ?? ""}
      alternateLabel={config.alternateLabel ?? ""}
    >
      <AuthForm type="register" />
    </AuthShell>
  );
}
