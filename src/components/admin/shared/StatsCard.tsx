"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "stable";
  bgColor?: string;
  textColor?: string;
  changeColor?: "positive" | "negative" | "neutral";
  progress?: number;
}

export default function StatsCard({
  label,
  value,
  change,
  icon,
  changeColor = "neutral",
  progress,
}: StatsCardProps) {
  const getTrendColor = () => {
    if (changeColor === "positive") return "text-green-600";
    if (changeColor === "negative") return "text-red-600";
    return "text-primary";
  };

  const progressColor =
    changeColor === "negative"
      ? "bg-red-500"
      : changeColor === "positive"
        ? "bg-primary"
        : "bg-blue-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-admin-border bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-muted">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-heading">{value}</h3>
            {change && (
              <span className={`rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold ${getTrendColor()}`}>
                {change}
              </span>
            )}
          </div>
        </div>

        {icon && (
          <div className="rounded-lg bg-[#f0f8f2] p-3 text-primary">{icon}</div>
        )}
      </div>

      {progress !== undefined && (
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-admin-bg">
          <div
            className={`h-full rounded-full transition-all ${progressColor}`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}
