"use client";

import { dashboardService } from "../services/dashboard.service";

export function RecentActivity() {
  const activities =
    dashboardService.getRecentActivities();

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-5 text-xl font-semibold">
        Atividades Recentes
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="border-b border-zinc-800 pb-3 last:border-none"
          >
            <h3 className="font-medium">
              {activity.title}
            </h3>

            <p className="text-sm text-zinc-400">
              {activity.description}
            </p>

            <span className="text-xs text-yellow-400">
              {activity.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
