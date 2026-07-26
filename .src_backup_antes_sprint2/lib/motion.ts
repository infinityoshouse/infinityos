import type {
  TargetAndTransition,
  Transition,
  Variants,
} from "framer-motion";

export const infinitySpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 28,
  mass: 0.8,
};

export const infinitySoftSpring: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 24,
  mass: 0.9,
};

export const infinityNavigationSpring: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 26,
  mass: 1,
};

export const motionPreset = {
  hover: {
    scale: 1.08,
    y: -3,
  } satisfies TargetAndTransition,

  tap: {
    scale: 0.92,
  } satisfies TargetAndTransition,

  subtleHover: {
    scale: 1.025,
    y: -2,
  } satisfies TargetAndTransition,

  subtleTap: {
    scale: 0.975,
  } satisfies TargetAndTransition,

  glowHover: {
    scale: 1.06,
    filter: "brightness(1.12)",
  } satisfies TargetAndTransition,
};

export const floatingVariants: Variants = {
  initial: {
    y: 0,
    rotate: 0,
  },

  animate: {
    y: [-2, 2, -2],
    rotate: [-0.45, 0.45, -0.45],
    transition: {
      y: {
        duration: 4.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotate: {
        duration: 5.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    y: 12,
    transition: {
      duration: 0.24,
      ease: "easeIn",
    },
  },
};

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.88,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: infinitySoftSpring,
  },

  exit: {
    opacity: 0,
    scale: 0.94,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.985,
    y: 10,
    filter: "blur(8px)",
  },

  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    scale: 1.015,
    y: -8,
    filter: "blur(6px)",
    transition: {
      duration: 0.28,
      ease: "easeInOut",
    },
  },
};

export const moduleExpansionVariants: Variants = {
  idle: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
  },

  selected: {
    scale: 1.22,
    opacity: 1,
    filter: "blur(0px)",
    transition: infinityNavigationSpring,
  },

  background: {
    scale: 0.92,
    opacity: 0.22,
    filter: "blur(3px)",
    transition: infinityNavigationSpring,
  },
};