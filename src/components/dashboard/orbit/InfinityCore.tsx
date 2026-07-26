"use client";

import { motion } from "framer-motion";
import { Infinity as InfinityIcon, Sparkles } from "lucide-react";

type InfinityCoreProps = {
  onClick?: () => void;
};

export function InfinityCore({ onClick }: InfinityCoreProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: 1,
        scale: [1, 1.018, 1],
      }}
      transition={{
        opacity: {
          duration: 0.5,
        },
        scale: {
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.035 }}
      whileTap={{
        scale: 0.965,
        transition: {
          type: "spring",
          stiffness: 420,
          damping: 24,
        },
      }}
      aria-label="Abrir Infinity AI"
      className="group relative flex aspect-square w-full items-center justify-center rounded-full border border-[#D6A044]/35 bg-black/50 outline-none backdrop-blur-3xl"
    >
      {/* Respiração externa */}
      <motion.span
        aria-hidden="true"
        animate={{
          scale: [0.94, 1.12, 0.94],
          opacity: [0.18, 0.55, 0.18],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-14 -z-40 rounded-full bg-[#D99C30]/20 blur-[58px]"
      />

      {/* Halo intermediário */}
      <motion.span
        aria-hidden="true"
        animate={{
          scale: [0.98, 1.07, 0.98],
          opacity: [0.22, 0.62, 0.22],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.15,
        }}
        className="absolute -inset-8 -z-30 rounded-full border border-[#E6AE45]/25 shadow-[0_0_45px_rgba(230,174,69,0.22)]"
      />

      {/* Pulso luminoso */}
      <motion.span
        aria-hidden="true"
        animate={{
          scale: [0.82, 1.18],
          opacity: [0.4, 0],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute -inset-5 -z-20 rounded-full border border-[#F1C66E]/35"
      />

      <span className="absolute -inset-8 -z-20 rounded-full border border-[#C88B2C]/10" />

      <span className="absolute -inset-4 -z-10 rounded-full border border-[#D49B37]/15" />

      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_28%,rgba(255,226,163,0.13),transparent_32%),radial-gradient(circle_at_50%_75%,rgba(196,132,35,0.12),transparent_38%)]" />

      <span className="absolute inset-[6px] rounded-full border border-white/[0.07]" />

      <span className="absolute inset-[13px] rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.005)_38%,rgba(185,119,28,0.045))]" />

      <motion.span
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-8 rounded-full border border-dashed border-[#D9A33E]/18"
      />

      <motion.span
        aria-hidden="true"
        animate={{ rotate: -360 }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-14 rounded-full border border-dotted border-white/[0.08]"
      />

      <span className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.span
          animate={{
            filter: [
              "drop-shadow(0 0 12px rgba(230,174,69,0.28))",
              "drop-shadow(0 0 30px rgba(230,174,69,0.72))",
              "drop-shadow(0 0 12px rgba(230,174,69,0.28))",
            ],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center text-[#E6AE45]"
        >
          <InfinityIcon
            size={92}
            strokeWidth={1.15}
            className="sm:size-[108px]"
          />

          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 rounded-lg border border-[#E2A940]/35 bg-black/50 px-2 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#EDBA59] backdrop-blur-xl">
            AI
          </span>
        </motion.span>

        <strong className="mt-2 bg-gradient-to-r from-[#F3CE7B] via-[#D99C30] to-[#F0C366] bg-clip-text text-base font-semibold tracking-[0.26em] text-transparent sm:text-xl">
          INFINITY AI
        </strong>

        <span className="mt-3 text-[8px] uppercase tracking-[0.3em] text-white/35 sm:text-[9px]">
          Inteligência operacional
        </span>

        <span className="mt-5 flex items-center gap-2 rounded-full border border-[#D39A35]/20 bg-[#D39A35]/[0.045] px-4 py-2 text-[8px] uppercase tracking-[0.2em] text-[#E4AB43]/65 transition group-hover:border-[#E0A83F]/40 group-hover:text-[#F0C367] sm:text-[9px]">
          <Sparkles size={12} strokeWidth={1.6} />
          Toque para acessar
        </span>
      </span>
    </motion.button>
  );
}