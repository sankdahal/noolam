'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { EASE_IMAGE } from '@/lib/motion';

/**
 * Brief crimson-and-gold zari silk curtain parting reveal on initial landing,
 * inspired by the opening frame of the NOOLAM reference.
 * Non-blocking (pointer-events-none) so underlying hero content is immediately accessible.
 */
export default function SilkCurtainIntro() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReduced) {
      const t = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(t);
    }
    const timer = setTimeout(() => setVisible(false), 1150);
    return () => clearTimeout(timer);
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 flex overflow-hidden"
        >
          {/* Left Zari Silk Drape */}
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '-102%' }}
            transition={{ duration: 0.95, delay: 0.18, ease: EASE_IMAGE }}
            className="relative h-full w-1/2 border-r-4 border-[#D4B06A] bg-gradient-to-br from-[#8C111E] via-[#680B16] to-[#3B060D] shadow-2xl"
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(212,176,106,0.35) 18px, rgba(212,176,106,0.35) 19px)',
              }}
            />
          </motion.div>

          {/* Right Zari Silk Drape */}
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '102%' }}
            transition={{ duration: 0.95, delay: 0.18, ease: EASE_IMAGE }}
            className="relative h-full w-1/2 border-l-4 border-[#D4B06A] bg-gradient-to-bl from-[#8C111E] via-[#680B16] to-[#3B060D] shadow-2xl"
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(212,176,106,0.35) 18px, rgba(212,176,106,0.35) 19px)',
              }}
            />
          </motion.div>

          {/* Center Emblem Fade */}
          <motion.div
            initial={{ opacity: 1, scale: 0.96 }}
            animate={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.45, delay: 0.1, ease: EASE_IMAGE }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="border border-[#D4B06A]/60 bg-[#3B060D]/90 px-8 py-4 text-center">
              <span className="font-editorial text-3xl tracking-[0.28em] text-[#FAF6F0]">
                NOOLAM
              </span>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#D4B06A]">
                Kanchipuram Silk House
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
