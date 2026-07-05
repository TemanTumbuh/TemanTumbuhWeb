"use client";

import React from "react";
import PageHeader from "@/components/admin/shared/PageHeader";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        subtitle="Configure admin dashboard preferences and system settings."
      />

      <div className="rounded-3xl border border-admin-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-heading">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-heading">
              Platform Name
            </label>
            <input
              type="text"
              defaultValue="Teman Tumbuh"
              className="w-full max-w-md rounded-xl border border-admin-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-heading">
              Admin Email Notifications
            </label>
            <input
              type="email"
              defaultValue="admin@gmail.com"
              className="w-full max-w-md rounded-xl border border-admin-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="maintenance" defaultChecked={false} className="rounded" />
            <label htmlFor="maintenance" className="text-sm text-[#556658]">
              Enable maintenance mode
            </label>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
