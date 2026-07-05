"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Plus, Save, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import SaveFooter from "@/components/admin/shared/SaveFooter";
import { getAgendaEvents, saveAgendaEvents } from "@/lib/api/admin/mocks/agendaMocks";
import type { AgendaEvent } from "@/types/admin.types";

export default function AgendaPage() {
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [savedEvents, setSavedEvents] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isDirty = JSON.stringify(events) !== JSON.stringify(savedEvents);

  useEffect(() => {
    getAgendaEvents().then((data) => {
      setEvents(data);
      setSavedEvents(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const result = await saveAgendaEvents(events);
    setEvents(result);
    setSavedEvents(result);
    setSaving(false);
  };

  const handleAdd = () => {
    setEvents([
      ...events,
      {
        id: String(Date.now()),
        title: "",
        date: "",
        time: "",
        location: "",
        status: "draft",
      },
    ]);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const updateEvent = (id: string, field: keyof AgendaEvent, value: string) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  if (loading) {
    return <div className="h-64 animate-pulse rounded-3xl bg-white" />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Upcoming Agenda"
        subtitle="Manage scheduled events, workshops, and community activities."
        actions={
          <>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || saving}
              className="flex items-center gap-2 rounded-xl border border-admin-border bg-white px-4 py-2.5 text-sm font-semibold text-[#556658] hover:bg-admin-bg disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              <Plus size={16} />
              Add Event
            </button>
          </>
        }
      />

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-3xl border border-admin-border bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#f0f8f2] p-3 text-primary">
                  <Calendar size={20} />
                </div>
                <StatusBadge status={event.status} />
              </div>
              <button
                type="button"
                onClick={() => handleDelete(event.id)}
                className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted">Title</label>
                <input
                  type="text"
                  value={event.title}
                  onChange={(e) => updateEvent(event.id, "title", e.target.value)}
                  className="w-full rounded-xl border border-admin-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted">Date</label>
                <input
                  type="text"
                  value={event.date}
                  onChange={(e) => updateEvent(event.id, "date", e.target.value)}
                  placeholder="Oct 24, 2024"
                  className="w-full rounded-xl border border-admin-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted">Time</label>
                <input
                  type="text"
                  value={event.time}
                  onChange={(e) => updateEvent(event.id, "time", e.target.value)}
                  placeholder="10:00 AM - 12:00 PM"
                  className="w-full rounded-xl border border-admin-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted">
                  <MapPin size={12} className="mr-1 inline" />
                  Location
                </label>
                <input
                  type="text"
                  value={event.location}
                  onChange={(e) => updateEvent(event.id, "location", e.target.value)}
                  className="w-full rounded-xl border border-admin-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted">Status</label>
                <select
                  value={event.status}
                  onChange={(e) => updateEvent(event.id, "status", e.target.value)}
                  className="w-full rounded-xl border border-admin-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SaveFooter />
    </div>
  );
}
