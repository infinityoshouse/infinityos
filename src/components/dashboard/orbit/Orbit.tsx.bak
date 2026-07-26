"use client";

import { motion } from "framer-motion";

import type { SystemModule } from "@/data/modules";
import { infinityNavigationSpring } from "@/lib/motion";
import { useUIStore } from "@/store/uiStore";

import { InfinityCore } from "./InfinityCore";
import { OrbitItem } from "./OrbitItem";
import { OrbitRing } from "./OrbitRing";

export type OrbitModule = SystemModule;

type OrbitProps = {
  modules: OrbitModule[];
  onModuleClick?: (
    module: OrbitModule,
  ) => void;
  onCoreClick?: () => void;
};

export function Orbit({
  modules,
  onModuleClick,
  onCoreClick,
}: OrbitProps) {
  const isNavigating = useUIStore(
    (state) => state.isNavigating,
  );

  const orbitSpeed = useUIStore(
    (state) => state.orbitSpeed,
  );

  const totalModules = modules.length;

  const safeOrbitSpeed = Math.max(
    orbitSpeed,
    0.05,
  );

  return (
    <section
      className="
        relative
        flex
        min-h-[570px]
        w-full
        items-center
        justify-center
        overflow-hidden
        sm:min-h-[680px]
        lg:min-h-[760px]
      "
    >
      <motion.div
        animate={{
          scale: isNavigating
            ? 0.94
            : 1,

          opacity: isNavigating
            ? 0.82
            : 1,
        }}
        transition={infinityNavigationSpring}
        className="
          relative
          h-[540px]
          w-[540px]
          scale-[0.64]
          sm:scale-[0.82]
          lg:scale-100
        "
      >
        <OrbitRing
          size={390}
          duration={
            42 / safeOrbitSpeed
          }
          opacity={
            isNavigating
              ? 0.1
              : 0.22
          }
        />

        <OrbitRing
          size={500}
          duration={
            58 / safeOrbitSpeed
          }
          reverse
          opacity={
            isNavigating
              ? 0.06
              : 0.14
          }
        />

        <motion.div
          animate={{
            scale: isNavigating
              ? 1.06
              : 1,
          }}
          transition={infinityNavigationSpring}
          className="
            absolute
            left-1/2
            top-1/2
            z-20
            w-[230px]
            -translate-x-1/2
            -translate-y-1/2
            sm:w-[250px]
          "
        >
          <InfinityCore
            onClick={onCoreClick}
          />
        </motion.div>

        {modules.map(
          (module, index) => {
            const angle =
              -90 +
              (360 / totalModules) *
                index;

            return (
              <OrbitItem
                key={module.id}
                id={module.id}
                label={module.label}
                description={
                  module.description
                }
                icon={module.icon}
                color={module.color}
                angle={angle}
                radius={245}
                delay={0.05 * index}
                onClick={() =>
                  onModuleClick?.(
                    module,
                  )
                }
              />
            );
          },
        )}
      </motion.div>
    </section>
  );
}