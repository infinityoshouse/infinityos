"use client";

import { motion } from "framer-motion";
import { Infinity, Sparkles } from "lucide-react";

type InfinityCoreProps = {
  onOpenAI?: () => void;
};

export function InfinityCore({ onOpenAI }: InfinityCoreProps) {
  return (
    <motion.button
      type="button"
      onClick={onOpenAI}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      aria-label="Abrir Infinity AI"
      className="group relative flex aspect-square w-full max-w-[330px] items-center justify-center rounded-full border border-[#D5A33A]/50 bg-black/70 text-center shadow-[0_0_80px_rgba(201,143,38,0.18)] outline-none backdrop-blur-2xl"
    >
      <span className="absolute inset-3 rounded-full border border-white/[0.06]" />

      <span className="absolute inset-[-18px] -z-10 rounded-full border border-[#C68C26]/20" />

      <span className="absolute inset-[-42px] -z-20 rounded-full border border-[#C68C26]/10" />

      <span className="absolute inset-[18%] rounded-full bg-[#C88E25]/10 blur-3xl transition duration-500 group-hover:bg-[#C88E25]/20" />

      <motion.span
        animate={{ rotate: 360 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-7 rounded-full border border-dashed border-[#D7A33D]/20"
      />

      <span className="relative z-10 flex flex-col items-center px-6">
        <span className="relative flex items-center justify-center text-[#E5AC35]">
          <Infinity
            size={112}
            strokeWidth={1.25}
            className="drop-shadow-[0_0_18px_rgba(229,172,53,0.35)]"
          />

          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 rounded-md border border-[#E0A637]/40 bg-black/50 px-2 py-1 text-sm font-semibold tracking-wider">
            AI
          </span>
        </span>

        <strong className="mt-2 bg-gradient-to-r from-[#F1C66A] via-[#D99522] to-[#F0C262] bg-clip-text text-xl font-semibold tracking-[0.22em] text-transparent sm:text-2xl">
          INFINITY AI
        </strong>

        <span className="mt-3 text-[9px] uppercase tracking-[0.28em] text-white/50 sm:text-[10px]">
          Inteligência operacional
        </span>

        <span className="mt-6 flex items-center gap-2 rounded-full border border-[#D69A31]/25 bg-[#D69A31]/[0.06] px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-[#E7B14B]/75 transition group-hover:border-[#E0A83D]/45 group-hover:text-[#F2C46A]">
          <Sparkles size={13} />
          Toque para acessar
        </span>
      </span>
    </motion.button>
  );
}