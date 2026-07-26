"use client";

import {
  Activity,
  CalendarDays,
  Cloud,
  MessageSquareText,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  {
    id: "new",
    label: "Novo registro",
    icon: Plus,
    highlighted: true,
  },
  {
    id: "messages",
    label: "Mensagens",
    icon: MessageSquareText,
  },
  {
    id: "agenda",
    label: "Agenda",
    icon: CalendarDays,
  },
  {
    id: "activity",
    label: "Atividades",
    icon: Activity,
  },
];

export function RightDock() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-white/[0.08] bg-black/55 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:flex"
    >
      <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-300/75">
        <Cloud size={18} strokeWidth={1.55} />

        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
      </div>

      <div className="h-px w-7 bg-white/[0.08]" />

      {actions.map(({ id, label, icon: Icon, highlighted }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          title={label}
          className={[
            "group relative flex h-11 w-11 items-center justify-center rounded-xl border transition duration-300",
            highlighted
              ? "border-[#D9A13A]/35 bg-[#D9A13A]/10 text-[#EDB64F] shadow-[0_0_24px_rgba(217,161,58,0.12)]"
              : "border-transparent text-white/35 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white/80",
          ].join(" ")}
        >
          <Icon size={18} strokeWidth={1.55} />

          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/[0.08] bg-black/85 px-2.5 py-1.5 text-[10px] text-white/65 opacity-0 shadow-xl backdrop-blur-xl transition group-hover:opacity-100">
            {label}
          </span>
        </button>
      ))}
    </motion.aside>
  );
}