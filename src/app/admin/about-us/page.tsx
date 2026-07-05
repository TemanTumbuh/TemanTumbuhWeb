"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, Save } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { getProfileContent, saveProfileContent } from "@/lib/api/admin/mocks/contentMocks";
import type { ProfileContent } from "@/types/admin.types";

const TABS = [
  { id: "about" as const, label: "Tentang Kami" },
  { id: "agenda" as const, label: "Agenda Mendatang" },
  { id: "vision" as const, label: "Visi Misi" },
];

export default function AboutUsPage() {
  const [content, setContent] = useState<ProfileContent | null>(null);
  const [savedContent, setSavedContent] = useState<ProfileContent | null>(null);
  const [activeTab, setActiveTab] = useState<"about" | "agenda" | "vision">("about");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isDirty = JSON.stringify(content) !== JSON.stringify(savedContent);

  useEffect(() => {
    getProfileContent().then((data) => {
      setContent(data);
      setSavedContent(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    const result = await saveProfileContent(content);
    setContent(result);
    setSavedContent(result);
    setSaving(false);
  };

  const updateField = (section: "about" | "agenda" | "vision", field: string, value: string) => {
    if (!content) return;
    setContent({
      ...content,
      [section]: { ...content[section], [field]: value },
    });
  };

  if (loading || !content) {
    return <div className="h-64 animate-pulse rounded-3xl bg-white" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile Content Management"
        subtitle="Manage public-facing informational sections of Teman Tumbuh."
        actions={
          <>
            <a
              href="/tentang-kami"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-admin-border bg-white px-4 py-2.5 text-sm font-semibold text-[#556658] hover:bg-admin-bg"
            >
              <ExternalLink size={16} />
              Preview Site
            </a>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || saving}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save All Changes"}
            </button>
          </>
        }
      />

      <div className="flex gap-1 border-b border-admin-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted hover:text-[#556658]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-heading">
              {activeTab === "about" ? "Hero Headline" : "Headline"}
            </label>
            <input
              type="text"
              value={content[activeTab].headline}
              onChange={(e) => updateField(activeTab, "headline", e.target.value)}
              className="w-full rounded-xl border border-admin-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-heading">
              {activeTab === "about" ? "Company Description" : "Content"}
            </label>
            <div className="overflow-hidden rounded-xl border border-admin-border">
              <div className="flex gap-2 border-b border-admin-border bg-admin-bg px-3 py-2">
                {["B", "I", "List", "Link", "Undo"].map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    className="rounded px-2 py-1 text-xs font-semibold text-muted hover:bg-white"
                  >
                    {tool}
                  </button>
                ))}
              </div>
              <textarea
                value={content[activeTab].description}
                onChange={(e) => updateField(activeTab, "description", e.target.value)}
                rows={8}
                className="w-full px-4 py-3 text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        {activeTab === "about" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-admin-border bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-heading">Featured Media</p>
              <div className="relative mb-3 h-40 overflow-hidden rounded-xl">
                <Image
                  src={content.about.featuredImage}
                  alt="Featured"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-muted">Recommended size: 1200x800px. Max 2MB.</p>
            </div>

            <div className="rounded-3xl border border-admin-border bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-heading">Quick Stats</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Members</span>
                  <span className="font-semibold">{content.about.stats.members}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Workshops</span>
                  <span className="font-semibold">{content.about.stats.workshops}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Partners</span>
                  <span className="font-semibold">{content.about.stats.partners}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 rounded-2xl border border-admin-border bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Last edited: {content.lastEdited} by {content.editedBy}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">Status:</span>
          <StatusBadge status={content.status} />
        </div>
        <p className="text-xs text-muted">V2.4.0 STABLE BUILD</p>
      </div>
    </div>
  );
}
