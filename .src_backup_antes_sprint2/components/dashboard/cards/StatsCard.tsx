"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type StatsCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: string;
  delay?: number;
};

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-300 hover:border-[#D7A03A]/25 hover:bg-white/[0.04]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(218,161,58,0.1),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.22em] text-white/35">
            {title}
          </p>

          <strong className="mt-3 block text-2xl font-medium tracking-tight text-white sm:text-3xl">
            {value}
          </strong>
        </div>

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#D8A13B]/20 bg-[#D8A13B]/[0.06] text-[#E5AD43]">
          <Icon size={19} strokeWidth={1.55} />
        </span>
      </div>

      <div className="relative mt-5 flex items-end justify-between gap-3">
        <p className="max-w-[180px] text-xs leading-relaxed text-white/35">
          {description}
        </p>

        {trend && (
          <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-2.5 py-1 text-[9px] font-medium text-emerald-300/75">
            {trend}
          </span>
        )}
      </div>
    </motion.article>
  );
}