"use client";

import {
  Boxes,
  CircleHelp,
  Command,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    id: "command",
    label: "Comandos",
    icon: Command,
  },
  {
    id: "modules",
    label: "Módulos",
    icon: Boxes,
  },
  {
    id: "help",
    label: "Ajuda",
    icon: CircleHelp,
  },
  {
    id: "settings",
    label: "Configurações",
    icon: Settings,
  },
];

export function LeftDock() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/[0.08] bg-black/55 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:bottom-auto lg:left-5 lg:top-1/2 lg:-translate-x-0 lg:-translate-y-1/2 lg:flex-col"
    >
      {items.map(({ id, label, icon: Icon, active }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          title={label}
          className={[
            "group relative flex h-11 w-11 items-center justify-center rounded-xl border transition duration-300",
            active
              ? "border-[#D9A13A]/35 bg-[#D9A13A]/10 text-[#EDB64F] shadow-[0_0_24px_rgba(217,161,58,0.12)]"
              : "border-transparent text-white/35 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white/80",
          ].join(" ")}
        >
          <Icon size={18} strokeWidth={1.55} />

          {active && (
            <span className="absolute -top-1 h-1 w-4 rounded-full bg-[#E5AD43] shadow-[0_0_10px_rgba(229,173,67,0.7)] lg:-left-1 lg:top-1/2 lg:h-4 lg:w-1 lg:-translate-y-1/2" />
          )}

          <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/[0.08] bg-black/85 px-2.5 py-1.5 text-[10px] text-white/65 opacity-0 shadow-xl backdrop-blur-xl transition group-hover:opacity-100 lg:bottom-auto lg:left-full lg:ml-3 lg:block lg:translate-x-0">
            {label}
          </span>
        </button>
      ))}
    </motion.aside>
  );
}