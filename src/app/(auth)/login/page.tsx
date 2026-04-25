import { getAuthConfig } from "@/config/authConfig";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  const config = getAuthConfig("login");

  return (
    <AuthShell
      title={config.title}
      alternatePrompt={config?.alternatePrompt || ""}
      alternateHref={config?.alternateHref || "/register"}
      alternateLabel={config?.alternateLabel || ""}
    >
      <AuthForm type="login" />
    </AuthShell>
  );
}
