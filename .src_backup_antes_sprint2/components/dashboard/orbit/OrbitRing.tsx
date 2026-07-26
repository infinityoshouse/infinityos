"use client";

import { motion } from "framer-motion";

type OrbitRingProps = {
  size: number;
  duration?: number;
  reverse?: boolean;
  opacity?: number;
};

export function OrbitRing({
  size,
  duration = 40,
  reverse = false,
  opacity = 0.2,
}: OrbitRingProps) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        width: size,
        height: size,
        opacity,
      }}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D39A35]/35"
    >
      <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#E7B24D] shadow-[0_0_18px_rgba(231,178,77,0.8)]" />

      <span className="absolute bottom-[14%] right-[7%] h-1.5 w-1.5 rounded-full bg-white/50 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />

      <span className="absolute left-[9%] top-[22%] h-1 w-1 rounded-full bg-[#D39A35]/70" />
    </motion.div>
  );
}