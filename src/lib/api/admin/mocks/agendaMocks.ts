import type { AgendaEvent } from "@/types/admin.types";

let events: AgendaEvent[] = [
  { id: "1", title: "Green Living Workshop", date: "Oct 24, 2024", time: "10:00 AM - 12:00 PM", location: "Zoom Meeting", status: "published" },
  { id: "2", title: "Community Tree Planting", date: "Oct 26, 2024", time: "09:00 AM - 1:00 PM", location: "City Park", status: "published" },
  { id: "3", title: "Staff Monthly Sync", date: "Oct 29, 2024", time: "03:00 PM - 04:30 PM", location: "HQ Office", status: "draft" },
  { id: "4", title: "Mindfulness Meditation", date: "Nov 02, 2024", time: "07:00 AM - 08:00 AM", location: "Online", status: "published" },
];

export async function getAgendaEvents(): Promise<AgendaEvent[]> {
  await new Promise((r) => setTimeout(r, 400));
  return [...events];
}

export async function saveAgendaEvents(data: AgendaEvent[]): Promise<AgendaEvent[]> {
  await new Promise((r) => setTimeout(r, 500));
  events = [...data];
  return events;
}

export async function deleteAgendaEvent(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  events = events.filter((e) => e.id !== id);
}
