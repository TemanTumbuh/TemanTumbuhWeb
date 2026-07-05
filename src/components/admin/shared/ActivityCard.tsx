"use client";

import React from "react";
import { motion } from "framer-motion";

interface ActivityCardProps {
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  timestamp: string;
  icon?: React.ReactNode;
  type?: "comment" | "post" | "join" | "system";
}

export default function ActivityCard({
  user,
  action,
  timestamp,
  icon,
  type = "post",
}: ActivityCardProps) {
  const getTypeColor = () => {
    switch (type) {
      case "comment":
        return "bg-blue-50 text-blue-600";
      case "post":
        return "bg-green-50 text-green-600";
      case "join":
        return "bg-purple-50 text-purple-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-4 py-4 border-b border-[#e8efe9] last:border-0"
    >
      {/* Icon/Avatar */}
      <div className={`p-2.5 rounded-lg ${getTypeColor()} shrink-0`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#142018]">
          {user.name}
          <span className="font-normal text-[#556658]"> {action}</span>
        </p>
        <p className="text-xs text-[#a1afa4] mt-1">{timestamp}</p>
      </div>
    </motion.div>
  );
}
