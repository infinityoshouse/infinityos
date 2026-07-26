"use client";

import {
  CalendarDays,
  ClipboardCheck,
  House,
  Infinity as InfinityIcon,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { label: "Início", icon: House, active: true },
  { label: "Infinity AI", icon: Sparkles },
  { label: "Atividades", icon: ClipboardCheck },
  { label: "Calendário", icon: CalendarDays },
  { label: "Mensagens", icon: MessageSquare },
  { label: "Configurações", icon: Settings },
];

export function AppSidebar() {
  return (
    <aside className="hidden min-h-screen border-r border-white/[0.07] bg-black/45 px-4 py-6 backdrop-blur-2xl lg:flex lg:flex-col">
      <div className="flex items-center gap-3 border-b border-white/[0.07] pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D49B35]/30 bg-[#D49B35]/[0.06] text-[#E3AA3E] shadow-[0_0_30px_rgba(212,155,53,0.12)]">
          <InfinityIcon size={31} strokeWidth={1.5} />
        </div>

        <div>
          <strong className="block text-sm tracking-[0.18em] text-white">
            INFINITY O.S.
          </strong>

          <span className="mt-1 block text-[8px] uppercase tracking-[0.24em] text-white/35">
            Infinite Possibilities.
          </span>
        </div>
      </div>

      <nav className="mt-7 space-y-2">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.label}
              type="button"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                item.active
                  ? "border-[#C9902E]/45 bg-[#C9902E]/10 text-[#E7B24D] shadow-[0_0_28px_rgba(201,144,46,0.1)]"
                  : "border-transparent text-white/45 hover:border-white/10 hover:bg-white/[0.035] hover:text-white"
              }`}
            >
              <Icon
                size={19}
                strokeWidth={1.6}
                className="transition group-hover:scale-105"
              />

              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/[0.07] pt-5">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/40 transition hover:bg-white/[0.035] hover:text-[#E2A73B]"
        >
          <LogOut size={19} strokeWidth={1.6} />
          Sair
        </button>
      </div>
    </aside>
  );
}