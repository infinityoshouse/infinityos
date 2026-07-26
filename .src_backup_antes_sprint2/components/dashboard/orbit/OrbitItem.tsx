"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import {
  infinityNavigationSpring,
  infinitySoftSpring,
  motionPreset,
  scaleInVariants,
} from "@/lib/motion";
import { useUIStore } from "@/store/uiStore";

type OrbitItemProps = {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  color: string;
  angle: number;
  radius: number;
  delay?: number;
  onClick?: () => void;
};

export function OrbitItem({
  id,
  label,
  description,
  icon: Icon,
  color,
  angle,
  radius,
  delay = 0,
  onClick,
}: OrbitItemProps) {
  const [isActive, setIsActive] = useState(false);

  const selectedModule = useUIStore(
    (state) => state.selectedModule,
  );

  const isNavigating = useUIStore(
    (state) => state.isNavigating,
  );

  const isSelected = selectedModule === id;

  const isBackgroundItem =
    isNavigating &&
    selectedModule !== null &&
    !isSelected;

  const angleInRadians = (angle * Math.PI) / 180;

  const x = Math.cos(angleInRadians) * radius;
  const y = Math.sin(angleInRadians) * radius;

  const navigationX = isBackgroundItem
    ? x * 1.08
    : x;

  const navigationY = isBackgroundItem
    ? y * 1.08
    : y;

  function handleActivate() {
    if (!isNavigating) {
      setIsActive(true);
    }
  }

  function handleDeactivate() {
    if (!isNavigating) {
      setIsActive(false);
    }
  }

  function handleClick() {
    if (isNavigating) {
      return;
    }

    if (!isActive) {
      setIsActive(true);
      return;
    }

    onClick?.();
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.72,
        x,
        y,
      }}
      animate={{
        x: navigationX,
        y: isNavigating
          ? navigationY
          : [y - 2, y + 2, y - 2],

        rotate: isNavigating
          ? 0
          : [-0.45, 0.45, -0.45],

        scale: isSelected
          ? 1.28
          : isBackgroundItem
            ? 0.82
            : 1,

        opacity: isSelected
          ? 1
          : isBackgroundItem
            ? 0.16
            : 1,

        filter: isSelected
          ? "blur(0px) brightness(1.25)"
          : isBackgroundItem
            ? "blur(2px) brightness(0.55)"
            : "blur(0px) brightness(1)",

        zIndex: isSelected ? 50 : 10,
      }}
      transition={{
        x: isNavigating
          ? infinityNavigationSpring
          : {
              delay,
              ...infinitySoftSpring,
            },

        y: isNavigating
          ? infinityNavigationSpring
          : {
              delay: delay + 0.5,
              duration: 4.8 + delay,
              repeat: Infinity,
              ease: "easeInOut",
            },

        rotate: isNavigating
          ? infinityNavigationSpring
          : {
              delay: delay + 0.5,
              duration: 5.6 + delay,
              repeat: Infinity,
              ease: "easeInOut",
            },

        scale: infinityNavigationSpring,
        opacity: infinityNavigationSpring,
        filter: infinityNavigationSpring,
      }}
      className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      <div className="relative">
        <motion.button
          type="button"
          disabled={
            isNavigating &&
            !isSelected
          }
          aria-label={`Abrir módulo ${label}`}
          aria-expanded={
            isActive ||
            isSelected
          }
          onClick={handleClick}
          onPointerEnter={handleActivate}
          onPointerLeave={handleDeactivate}
          onFocus={handleActivate}
          onBlur={handleDeactivate}
          whileHover={
            isNavigating
              ? undefined
              : motionPreset.hover
          }
          whileTap={
            isNavigating
              ? undefined
              : motionPreset.tap
          }
          transition={infinitySoftSpring}
          className="
            group
            relative
            flex
            h-[62px]
            w-[62px]
            items-center
            justify-center
            overflow-hidden
            rounded-[20px]
            border
            border-white/[0.09]
            bg-black/55
            shadow-[0_15px_35px_rgba(0,0,0,0.45)]
            outline-none
            backdrop-blur-2xl
            disabled:pointer-events-none
            sm:h-[72px]
            sm:w-[72px]
          "
          style={{
            borderColor: isSelected
              ? `${color}70`
              : undefined,

            boxShadow: isSelected
              ? `
                  0 22px 60px rgba(0,0,0,0.55),
                  0 0 48px ${color}80
                `
              : isActive
                ? `
                    0 18px 45px rgba(0,0,0,0.5),
                    0 0 34px ${color}42
                  `
                : `
                    0 15px 35px rgba(0,0,0,0.45),
                    0 0 24px ${color}18
                  `,
          }}
        >
          <motion.span
            aria-hidden="true"
            animate={{
              opacity: isSelected
                ? 1
                : isActive
                  ? 1
                  : 0,

              scale: isSelected
                ? 1.35
                : isActive
                  ? 1.15
                  : 0.82,
            }}
            transition={infinitySoftSpring}
            className="
              absolute
              inset-0
              rounded-[20px]
            "
            style={{
              background: `
                radial-gradient(
                  circle at 50% 25%,
                  ${color}38,
                  transparent 72%
                )
              `,
            }}
          />

          <motion.span
            animate={{
              scale: isSelected
                ? 1.16
                : isActive
                  ? 1.08
                  : 1,

              rotate: isSelected
                ? 4
                : isActive
                  ? 2
                  : 0,
            }}
            transition={infinityNavigationSpring}
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              sm:h-10
              sm:w-10
            "
            style={{
              color,

              borderColor: isSelected
                ? `${color}80`
                : `${color}42`,

              backgroundColor: isSelected
                ? `${color}20`
                : `${color}10`,
            }}
          >
            <Icon
              size={19}
              strokeWidth={1.55}
              className="
                sm:h-[21px]
                sm:w-[21px]
              "
            />
          </motion.span>

          <motion.span
            aria-hidden="true"
            animate={{
              opacity: isSelected
                ? 1
                : isActive
                  ? 0.75
                  : 0,

              scaleX: isSelected
                ? 1.35
                : isActive
                  ? 1
                  : 0.4,
            }}
            transition={infinitySoftSpring}
            className="
              absolute
              bottom-1
              h-1
              w-6
              rounded-full
              blur-sm
            "
            style={{
              backgroundColor: color,
            }}
          />
        </motion.button>

        <AnimatePresence>
          {(isActive || isSelected) && (
            <motion.div
              variants={scaleInVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-full
                z-50
                mt-3
                w-44
                -translate-x-1/2
                rounded-2xl
                border
                border-white/[0.1]
                bg-black/80
                p-3
                text-center
                shadow-[0_20px_55px_rgba(0,0,0,0.55)]
                backdrop-blur-2xl
              "
            >
              <strong
                className="
                  block
                  text-xs
                  font-medium
                  text-white
                "
              >
                {label}
              </strong>

              {description && (
                <span
                  className="
                    mt-1
                    block
                    text-[9px]
                    leading-relaxed
                    text-white/40
                  "
                >
                  {description}
                </span>
              )}

              <span
                aria-hidden="true"
                className="
                  absolute
                  left-1/2
                  top-0
                  h-px
                  w-12
                  -translate-x-1/2
                "
                style={{
                  background: `
                    linear-gradient(
                      to right,
                      transparent,
                      ${color},
                      transparent
                    )
                  `,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}