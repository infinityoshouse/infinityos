"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock3 } from "lucide-react";

export type TimelineStatus = "completed" | "current" | "pending";

export interface TimelineItem {
  id: string;
  title: string;
  date?: string;
  responsible?: string;
  notes?: string;
  status: TimelineStatus;
}

interface TimelineEntregaProps {
  items: TimelineItem[];
}

const icon = {
  completed: CheckCircle2,
  current: Clock3,
  pending: Circle,
};

export default function TimelineEntrega({
  items,
}: TimelineEntregaProps) {
  return (
    <section className="rounded-2xl border bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Timeline da Entrega
      </h2>

      <div className="space-y-6">
        {items.map((item, index) => {
          const Icon = icon[item.status];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`rounded-full p-2 ${
                    item.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : item.status === "current"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-zinc-100 text-zinc-400"
                  }`}
                >
                  <Icon size={18} />
                </div>

                {index < items.length - 1 && (
                  <div className="mt-2 h-12 w-px bg-zinc-300" />
                )}
              </div>

              <div className="flex-1 rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.date && (
                    <span className="text-xs text-zinc-500">
                      {item.date}
                    </span>
                  )}
                </div>

                {item.responsible && (
                  <p className="mt-2 text-sm">
                    <strong>Responsável:</strong> {item.responsible}
                  </p>
                )}

                {item.notes && (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {item.notes}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
