"use client";

import Link from "next/link";
import { dashboardService } from "../services/dashboard.service";

export function QuickActions() {
  const actions = dashboardService.getQuickActions();

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-5 text-xl font-semibold">
        Ações Rápidas
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="rounded-lg border border-zinc-700 p-4 transition hover:border-yellow-400 hover:bg-zinc-800"
          >
            <h3 className="font-semibold">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
