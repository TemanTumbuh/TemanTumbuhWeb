"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { Mail, User, Lock } from "lucide-react";

type IconType = "mail" | "user" | "lock";

const iconMap = {
  mail: Mail,
  user: User,
  lock: Lock,
};

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
  iconType?: IconType;
  labelAction?: ReactNode;
};

export default function AuthInput({
  label,
  icon,
  iconType,
  labelAction,
  className,
  ...props
}: AuthInputProps) {
  const IconComponent = iconType ? iconMap[iconType] : null;

  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-[0.62rem] font-semibold tracking-[0.18em] text-[#586557] uppercase sm:text-[0.66rem]">
          {label}
        </span>
        {labelAction}
      </span>

      <span className="flex h-[2.95rem] items-center gap-3 rounded-full bg-[#f1f1ea] px-4 text-[#7d857d] shadow-[inset_0_0_0_1px_rgba(111,125,108,0.04)] transition focus-within:bg-white focus-within:shadow-[inset_0_0_0_1px_rgba(191,209,182,0.72),0_0_0_4px_rgba(219,235,204,0.34)] sm:h-[3.1rem] sm:px-5">
        {IconComponent && !icon && (
          <span className="shrink-0 text-[#8b9388]" aria-hidden="true">
            <IconComponent size={18} strokeWidth={1.7} />
          </span>
        )}

        {icon && (
          <span className="shrink-0 text-[#8b9388]" aria-hidden="true">
            {icon}
          </span>
        )}

        <input
          className={`w-full border-0 bg-transparent text-[0.8rem] text-[#2a332d] outline-none placeholder:text-[#9ea49b] sm:text-[0.88rem] ${className ?? ""}`}
          {...props}
        />
      </span>
    </label>
  );
}
