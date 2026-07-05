import type { FaqItem, FaqStats } from "@/types/admin.types";

let faqs: FaqItem[] = [
  {
    id: "1",
    question: "What is Teman Tumbuh and how does it help users?",
    answer:
      "Teman Tumbuh is a community platform designed to support personal growth and wellness. It provides a space for users to share experiences, join workshops, and connect with like-minded individuals on their journey of self-improvement.",
  },
  {
    id: "2",
    question: "How do I manage user accounts in the dashboard?",
    answer:
      "Navigate to User Management from the sidebar. You can view all registered users, filter by role, add new members, and manage their status. Use the action icons to view, edit, or deactivate user accounts.",
  },
];

export async function getFaqStats(): Promise<FaqStats> {
  await new Promise((r) => setTimeout(r, 300));
  return {
    totalQuestions: faqs.length,
    liveContent: "Published",
    lastUpdated: "Today, 10:45 AM",
  };
}

export async function getFaqs(): Promise<FaqItem[]> {
  await new Promise((r) => setTimeout(r, 400));
  return [...faqs];
}

export async function saveFaqs(items: FaqItem[]): Promise<FaqItem[]> {
  await new Promise((r) => setTimeout(r, 500));
  faqs = [...items];
  return faqs;
}
