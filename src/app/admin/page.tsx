"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatsCard from "@/components/admin/shared/StatsCard";
import ActivityCard from "@/components/admin/shared/ActivityCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import PageHeader from "@/components/admin/shared/PageHeader";
import {
  Users,
  MessageSquare,
  AlertCircle,
  Calendar,
  Eye,
  MessageCircle,
  UserPlus,
  Zap,
  Download,
  ChevronDown,
} from "lucide-react";
import {
  getDashboardStats,
  getRecentActivities,
  getUpcomingAgenda,
  getHighlyActiveUsers,
} from "@/lib/api/admin/mocks/dashboardMocks";
import type { DashboardStats, RecentActivity, AgendaItem, ActiveUser } from "@/types/admin.types";

const CHART_DATA = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 90 },
  { day: "Thu", value: 81 },
  { day: "Fri", value: 95 },
  { day: "Sat", value: 72 },
  { day: "Sun", value: 88 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, activitiesData, agendaData, usersData] =
          await Promise.all([
            getDashboardStats(),
            getRecentActivities(),
            getUpcomingAgenda(),
            getHighlyActiveUsers(),
          ]);

        setStats(statsData);
        setActivities(activitiesData);
        setAgenda(agendaData);
        setActiveUsers(usersData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-admin-border" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-3xl bg-white" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariant}>
        <PageHeader
          title="Growth Overview"
          subtitle="Welcome back. Here's what's happening with Teman Tumbuh today."
          actions={
            <>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-admin-border bg-white px-4 py-2.5 text-sm font-semibold text-[#556658] hover:bg-admin-bg"
              >
                <Download size={16} />
                Export Report
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-admin-border bg-white px-4 py-2.5 text-sm font-semibold text-[#556658] hover:bg-admin-bg"
              >
                Last 30 Days
                <ChevronDown size={16} />
              </button>
            </>
          }
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariant}>
          <StatsCard
            label="Total Active Users"
            value={stats?.totalUsers.toLocaleString() || "0"}
            change={stats?.growthRate || ""}
            changeColor="positive"
            progress={84}
            icon={<Users size={24} />}
          />
        </motion.div>

        <motion.div variants={itemVariant}>
          <StatsCard
            label="Daily Feed Interactions"
            value={`${((stats?.dailyInteractions || 0) / 1000).toFixed(1)}k`}
            change="+8%"
            changeColor="positive"
            progress={72}
            icon={<MessageSquare size={24} />}
          />
        </motion.div>

        <motion.div variants={itemVariant}>
          <StatsCard
            label="Upcoming Events"
            value={stats?.upcomingEvents || 0}
            change="Stable"
            changeColor="neutral"
            progress={60}
            icon={<Calendar size={24} />}
          />
        </motion.div>

        <motion.div variants={itemVariant}>
          <StatsCard
            label="Unresolved Tickets"
            value={stats?.unsolvedTickets || 0}
            change="-2%"
            changeColor="negative"
            progress={35}
            icon={<AlertCircle size={24} />}
          />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariant} className="rounded-3xl border border-admin-border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-heading">User Growth Activity</h2>
          <select className="rounded-lg border border-admin-border px-3 py-1.5 text-sm text-[#556658]">
            <option>Weekly View</option>
            <option>Monthly View</option>
          </select>
        </div>

        <div className="flex h-48 items-end justify-between gap-4 px-4">
          {CHART_DATA.map((bar) => (
            <div key={bar.day} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full max-w-12 rounded-t-lg bg-primary/80 transition hover:bg-primary"
                style={{ height: `${bar.value}%` }}
              />
              <span className="text-xs text-muted">{bar.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <motion.div
          variants={itemVariant}
          className="rounded-3xl border border-admin-border bg-white p-6 shadow-sm lg:col-span-2"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-heading">Recent Feed Activity</h2>
            <button type="button" className="text-sm font-semibold text-primary hover:underline">
              View All Activity
            </button>
          </div>

          <div className="space-y-2">
            {activities.map((activity) => {
              const getActivityIcon = () => {
                switch (activity.type) {
                  case "comment":
                    return <MessageCircle size={16} />;
                  case "post":
                    return <Zap size={16} />;
                  case "join":
                    return <UserPlus size={16} />;
                  default:
                    return <Eye size={16} />;
                }
              };

              return (
                <ActivityCard
                  key={activity.id}
                  user={activity.user}
                  action={activity.action}
                  timestamp={`${Math.floor(
                    (Date.now() - activity.timestamp.getTime()) / (60 * 1000),
                  )} minutes ago`}
                  icon={getActivityIcon()}
                  type={activity.type}
                />
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariant} className="space-y-6">
          <div className="rounded-3xl border border-admin-border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-heading">Upcoming Agenda</h3>
              <a href="/admin/agenda" className="text-xs font-semibold text-primary hover:underline">
                Full Calendar
              </a>
            </div>

            <div className="space-y-4">
              {agenda.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-[#c2e4c9] bg-[#f0f8f2] p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 text-center">
                      <p className="text-2xl font-bold text-primary">
                        {item.date.split(" ")[0]}
                      </p>
                      <p className="text-xs font-semibold text-muted">{item.day}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-heading">{item.title}</p>
                      <p className="mt-1 text-xs text-muted">{item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-admin-border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-heading">Highly Active Users</h3>
              <a href="/admin/users" className="text-xs font-semibold text-primary hover:underline">
                Manage All
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-admin-border text-xs uppercase text-muted">
                    <th className="pb-2 font-semibold">User</th>
                    <th className="pb-2 font-semibold">Status</th>
                    <th className="pb-2 font-semibold">Joined</th>
                    <th className="pb-2 text-right font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {activeUsers.map((user) => (
                    <tr key={user.id} className="border-b border-admin-border last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                            {user.avatar}
                          </div>
                          <span className="font-semibold text-heading">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <StatusBadge status={user.status.toLowerCase()} label={user.status} />
                      </td>
                      <td className="py-3 text-muted">{user.joined}</td>
                      <td className="py-3 text-right font-bold text-primary">{user.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
