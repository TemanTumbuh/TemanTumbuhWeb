"use client";

import React from "react";

type StatusVariant = "active" | "inactive" | "draft" | "published" | "idle";

interface StatusBadgeProps {
  status: StatusVariant | string;
  label?: string;
}

const VARIANTS: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  draft: "bg-blue-50 text-blue-600",
  published: "bg-green-100 text-green-700",
  idle: "bg-blue-50 text-blue-600",
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const normalized = status.toLowerCase();
  const classes = VARIANTS[normalized] || "bg-gray-100 text-gray-600";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${classes}`}
    >
      {(normalized === "active" || normalized === "published") && (
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
      )}
      {normalized === "inactive" && (
        <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      )}
      {label || status}
    </span>
  );
}
