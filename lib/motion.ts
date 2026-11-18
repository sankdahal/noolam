import type { Transition, Variants } from 'motion/react';

export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;
export const EASE_IMAGE = [0.16, 1, 0.3, 1] as const;
export const EASE_MICRO = [0.2, 0, 0, 1] as const;

export const MOTION_DURATIONS = {
  micro: 0.18,
  ui: 0.26,
  imageHover: 0.55,
  reveal: 0.72,
  heroImage: 1.05,
} as const;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.14,
} as const;

export const TRANSITION_EDITORIAL: Transition = {
  duration: MOTION_DURATIONS.reveal,
  ease: EASE_EDITORIAL,
};

export const TRANSITION_IMAGE: Transition = {
  duration: 0.85,
  ease: EASE_IMAGE,
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_EDITORIAL,
    },
  },
};

export const maskedLineItem: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.75,
      ease: EASE_EDITORIAL,
    },
  },
};
