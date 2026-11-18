'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_EDITORIAL } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0.7, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
    >
      {children}
    </motion.div>
  );
}
