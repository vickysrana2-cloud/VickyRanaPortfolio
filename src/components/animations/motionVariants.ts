import { Variants } from 'framer-motion';

// Premium deceleration curve (Apple / luxury studio feel)
export const CUBIC_EASE = [0.22, 1, 0.36, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? 1.0,
      delay: custom?.delay ?? 0,
      ease: CUBIC_EASE,
    },
  }),
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? 1.0,
      delay: custom?.delay ?? 0,
      ease: CUBIC_EASE,
    },
  }),
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom?.duration ?? 1.0,
      delay: custom?.delay ?? 0,
      ease: CUBIC_EASE,
    },
  }),
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? 1.0,
      delay: custom?.delay ?? 0,
      ease: CUBIC_EASE,
    },
  }),
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? 1.0,
      delay: custom?.delay ?? 0,
      ease: CUBIC_EASE,
    },
  }),
};

// Container to animate list/grid children one after another
export const staggerContainer = (staggerChildren = 0.15): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
    },
  },
});
