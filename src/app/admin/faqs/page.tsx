"use client";

import React, { useEffect, useState } from "react";
import { HelpCircle, Eye, Clock, Plus, Save, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatsCard from "@/components/admin/shared/StatsCard";
import SaveFooter from "@/components/admin/shared/SaveFooter";
import { getFaqStats, getFaqs, saveFaqs } from "@/lib/api/admin/mocks/faqsMocks";
import type { FaqItem, FaqStats } from "@/types/admin.types";

export default function FaqManagementPage() {
  const [stats, setStats] = useState<FaqStats | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [savedFaqs, setSavedFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const isDirty = JSON.stringify(faqs) !== JSON.stringify(savedFaqs);

  useEffect(() => {
    const load = async () => {
      const [statsData, faqsData] = await Promise.all([getFaqStats(), getFaqs()]);
      setStats(statsData);
      setFaqs(faqsData);
      setSavedFaqs(faqsData);
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const result = await saveFaqs(faqs);
    setSavedFaqs(result);
    setStats({ totalQuestions: result.length, liveContent: "Published", lastUpdated: "Just now" });
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAdd = () => {
    setFaqs([
      ...faqs,
      { id: String(Date.now()), question: "", answer: "" },
    ]);
  };

  const handleDelete = (id: string) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const updateFaq = (id: string, field: "question" | "answer", value: string) => {
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  if (loading) {
    return <div className="h-64 animate-pulse rounded-3xl bg-white" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="FAQ Management"
        subtitle="Configure questions and answers for the platform's help center."
        actions={
          <>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || saving}
              className="flex items-center gap-2 rounded-xl border border-admin-border bg-white px-4 py-2.5 text-sm font-semibold text-[#556658] hover:bg-admin-bg disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              <Plus size={16} />
              Add New FAQ
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatsCard label="Total Questions" value={stats?.totalQuestions || 0} icon={<HelpCircle size={24} />} />
        <StatsCard label="Live Content" value={stats?.liveContent || "Published"} icon={<Eye size={24} />} />
        <StatsCard label="Last Updated" value={stats?.lastUpdated || "-"} icon={<Clock size={24} />} />
      </div>

      <div className="overflow-hidden rounded-3xl border border-admin-border bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-admin-border bg-admin-bg">
              <th className="w-12 px-4 py-3 text-xs font-semibold uppercase text-muted">#</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-muted">Question</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase text-muted">Answer</th>
              <th className="w-16 px-4 py-3 text-xs font-semibold uppercase text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq, index) => (
              <tr key={faq.id} className="border-b border-admin-border last:border-0">
                <td className="px-4 py-4 text-muted">{index + 1}</td>
                <td className="px-4 py-4">
                  <textarea
                    value={faq.question}
                    onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-admin-border bg-admin-bg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter question..."
                  />
                </td>
                <td className="px-4 py-4">
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-admin-border bg-admin-bg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter answer..."
                  />
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => handleDelete(faq.id)}
                    className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SaveFooter rightContent="Showing all entries" />
    </div>
  );
}
