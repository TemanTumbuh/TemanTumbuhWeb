"use client";

import React from "react";

interface SaveFooterProps {
  message?: string;
  rightContent?: React.ReactNode;
}

export default function SaveFooter({
  message = "Changes are not saved until you click the 'Save Changes' button.",
  rightContent,
}: SaveFooterProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-admin-border bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted">{message}</p>
      {rightContent && <div className="text-sm text-muted">{rightContent}</div>}
    </div>
  );
}
