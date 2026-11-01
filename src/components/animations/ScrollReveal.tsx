'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { fadeInUp, fadeInDown, scaleUp, fadeInLeft, fadeInRight } from './motionVariants';

export interface ScrollRevealProps {
  children?: React.ReactNode;
  direction?: 'up' | 'down' | 'scale' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  amount?: number;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.85,
  once = false, // Set to true if you don't want it to re-animate on scroll up
  className = '',
  amount = 0.1,
}: ScrollRevealProps) {
  let variants: Variants = fadeInUp;
  if (direction === 'down') variants = fadeInDown;
  if (direction === 'scale') variants = scaleUp;
  if (direction === 'left') variants = fadeInLeft;
  if (direction === 'right') variants = fadeInRight;

  // Support both seconds (e.g. 0.2) and milliseconds (e.g. 200)
  const normalizedDelay = delay > 10 ? delay / 1000 : delay;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      custom={{ delay: normalizedDelay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
