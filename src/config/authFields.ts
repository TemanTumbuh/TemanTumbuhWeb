import type { InputHTMLAttributes } from "react";

export interface AuthFieldConfig extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: "text" | "email" | "password";
  icon?: "mail" | "user" | "lock";
  placeholder: string;
  required?: boolean;
}

export const LOGIN_FIELDS: AuthFieldConfig[] = [
  {
    label: "Alamat Email",
    name: "email",
    type: "email",
    icon: "mail",
    placeholder: "nama@email.com",
    autoComplete: "email",
    required: true,
  },
  {
    label: "Kata Sandi",
    name: "password",
    type: "password",
    icon: "lock",
    placeholder: "Masukkan kata sandi",
    autoComplete: "current-password",
    required: true,
  },
];

export const REGISTER_FIELDS: AuthFieldConfig[] = [
  {
    label: "Nama Pengguna",
    name: "username",
    type: "text",
    icon: "user",
    placeholder: "temantumbuh_123",
    autoComplete: "username",
    required: true,
  },
  {
    label: "Alamat Email",
    name: "email",
    type: "email",
    icon: "mail",
    placeholder: "nama@email.com",
    autoComplete: "email",
    required: true,
  },
  {
    label: "Kata Sandi",
    name: "password",
    type: "password",
    icon: "lock",
    placeholder: "Minimal 8 karakter",
    autoComplete: "new-password",
    minLength: 8,
    required: true,
  },
  {
    label: "Ulangi Kata Sandi",
    name: "confirmPassword",
    type: "password",
    icon: "lock",
    placeholder: "Ulangi kata sandi",
    autoComplete: "new-password",
    minLength: 8,
    required: true,
  },
];

export const RESET_PASSWORD_FIELDS: AuthFieldConfig[] = [
  {
    label: "Kata Sandi Baru",
    name: "password",
    type: "password",
    icon: "lock",
    placeholder: "Minimal 8 karakter",
    autoComplete: "new-password",
    minLength: 8,
    required: true,
  },
  {
    label: "Ulangi Kata Sandi",
    name: "confirmPassword",
    type: "password",
    icon: "lock",
    placeholder: "Ulangi kata sandi",
    autoComplete: "new-password",
    minLength: 8,
    required: true,
  },
];

export const FORGOT_PASSWORD_FIELDS: AuthFieldConfig[] = [
  {
    label: "Alamat Email",
    name: "email",
    type: "email",
    icon: "mail",
    placeholder: "nama@email.com",
    autoComplete: "email",
    required: true,
  },
];

export function getAuthFields(
  type: "login" | "register" | "reset-password" | "forgot-password",
) {
  if (type === "login") return LOGIN_FIELDS;
  if (type === "register") return REGISTER_FIELDS;
  if (type === "reset-password") return RESET_PASSWORD_FIELDS;
  return FORGOT_PASSWORD_FIELDS;
}
