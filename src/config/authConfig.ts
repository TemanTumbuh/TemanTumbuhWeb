export interface AuthPageConfig {
  title: string;
  subtitle?: string;
  submitLabel: string;
  socialLabel?: string;
  alternatePrompt?: string;
  alternateHref?: string;
  alternateLabel?: string;
}

export const AUTH_CONFIGS: Record<
  "login" | "register" | "reset-password" | "forgot-password",
  AuthPageConfig
> = {
  login: {
    title: "Ayo, tumbuh bareng!",
    submitLabel: "Masuk Sekarang",
    socialLabel: "Masuk dengan Google",
    alternatePrompt: "Belum punya akun?",
    alternateHref: "/register",
    alternateLabel: "Mulai Tumbuh Disini",
  },
  register: {
    title: "Isinya pelan-pelan, ya ...",
    submitLabel: "Tumbuh Sekarang",
    socialLabel: "Tumbuh dengan Google",
    alternatePrompt: "Sudah tumbuh?",
    alternateHref: "/login",
    alternateLabel: "Kembali Tumbuh Disini",
  },
  "reset-password": {
    title: "Atur Ulang Kata Sandi",
    subtitle: "Masukkan kata sandi baru untuk melanjutkan",
    submitLabel: "Simpan Kata Sandi",
  },
  "forgot-password": {
    title: "Lupa Kata Sandi?",
    subtitle: "Masukkan email untuk menerima link reset",
    submitLabel: "Kirim Link Reset",
  },
};

export function getAuthConfig(
  type: "login" | "register" | "reset-password" | "forgot-password",
) {
  return AUTH_CONFIGS[type];
}
