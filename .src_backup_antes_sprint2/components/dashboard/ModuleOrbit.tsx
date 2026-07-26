"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { dashboardModules } from "@/data/dashboard";
import { InfinityCore } from "./InfinityCore";

export function ModuleOrbit() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <section className="relative mx-auto flex min-h-[660px] w-full max-w-[980px] items-center justify-center overflow-hidden px-4 py-6 sm:min-h-[720px]">
      {/* Órbitas */}
      <div className="pointer-events-none absolute left-1/2 top-[37%] h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C99532]/10 sm:top-1/2 sm:h-[690px] sm:w-[690px]" />

      <div className="pointer-events-none absolute left-1/2 top-[37%] h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C99532]/15 sm:top-1/2 sm:h-[560px] sm:w-[560px]" />

      <div className="pointer-events-none absolute left-1/2 top-[37%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E0AA42]/20 shadow-[0_0_60px_rgba(199,145,42,0.12)] sm:top-1/2 sm:h-[430px] sm:w-[430px]" />

      {/* Núcleo */}
      <div className="absolute left-1/2 top-[37%] z-20 w-[210px] -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:w-[270px]">
        <InfinityCore />
      </div>

      {/* Desktop */}
      <div className="relative hidden h-[720px] w-[720px] lg:block">
        {dashboardModules.map((module, index) => {
          const angle = (360 / dashboardModules.length) * index - 90;
          const radius = 285;

          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          const Icon = module.icon;
          const isActive = activeModule === module.id;

          return (
            <motion.button
              key={module.id}
              type="button"
              onMouseEnter={() => setActiveModule(module.id)}
              onMouseLeave={() => setActiveModule(null)}
              onFocus={() => setActiveModule(module.id)}
              onBlur={() => setActiveModule(null)}
              onClick={() =>
                setActiveModule((c) => (c === module.id ? null : module.id))
              }
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: isActive ? 1.08 : 1,
                x,
                y,
              }}
              transition={{
                delay: index * 0.04,
                duration: 0.45,
              }}
              style={{
                background: `linear-gradient(145deg, ${module.palette.light}, ${module.palette.base} 52%, ${module.palette.dark})`,
                borderColor: module.palette.border,
              }}
              className="absolute left-1/2 top-1/2 flex h-[126px] w-[126px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[42px] border shadow-2xl"
            >
              <Icon
                size={38}
                strokeWidth={1.5}
                style={{ color: module.palette.text }}
              />

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute top-[135px] rounded-xl bg-black/90 px-4 py-2 text-center backdrop-blur-xl"
                  >
                    <strong className="block text-sm text-white">
                      {module.name}
                    </strong>

                    <small className="text-[10px] text-white/50">
                      {module.description}
                    </small>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="grid w-full grid-cols-3 gap-4 pt-[320px] sm:grid-cols-4 sm:pt-[390px] lg:hidden">
        {dashboardModules.map((module) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;

          return (
            <motion.button
              key={module.id}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setActiveModule((c) => (c === module.id ? null : module.id))
              }
              style={{
                background: `linear-gradient(145deg, ${module.palette.light}, ${module.palette.base} 52%, ${module.palette.dark})`,
                borderColor: module.palette.border,
              }}
              className="relative flex aspect-square items-center justify-center rounded-[28px] border shadow-xl"
            >
              <Icon
                size={30}
                strokeWidth={1.5}
                style={{ color: module.palette.text }}
              />

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-2 rounded-full bg-black/80 px-3 py-1 text-[10px] text-white backdrop-blur-xl"
                  >
                    {module.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}