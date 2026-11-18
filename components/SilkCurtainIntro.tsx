'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { EASE_IMAGE } from '@/lib/motion';

/**
 * Photographed crimson-and-gold brocade silk curtain reveal inspired by 00:00 of the reference.
 * Reuses existing high-resolution woven silk drape photography with physical fold lighting,
 * a discreet top-left NOOLAM crest, and a deliberate parting sweep into the showroom hero.
 */
export default function SilkCurtainIntro() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1450);
    return () => clearTimeout(timer);
  }, []);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        >
          {/* Left Photographic Crimson & Zari Silk Drape */}
          <motion.div
            initial={{ x: '0%', y: '0%', scaleX: 1 }}
            animate={{ x: '-104%', y: '-3%', scaleX: 0.94 }}
            transition={{ duration: 1.05, delay: 0.28, ease: EASE_IMAGE }}
            className="absolute inset-y-0 left-0 w-[51.5%] origin-top-left overflow-hidden bg-[#5B0812] shadow-[16px_0_48px_rgba(20,4,7,0.55)] will-change-transform"
          >
            <Image
              src="/images/silk-banarasi-brocade.jpg"
              alt=""
              fill
              priority
              sizes="55vw"
              className="object-cover object-[52%_58%] scale-[2.15] brightness-110 saturate-125"
            />
            {/* Ceremonial crimson warmth glaze & edge depth */}
            <div className="absolute inset-0 bg-[#9E0E1C]/48 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,transparent_28%,rgba(54,4,10,0.82)_100%)]" />
            {/* Soft vertical cloth-fold shading for physical drape depth */}
            <div
              className="absolute inset-0 opacity-65"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(22,3,6,0.58) 0%, rgba(255,215,150,0.09) 18%, rgba(22,3,6,0.46) 36%, rgba(255,215,150,0.07) 56%, rgba(22,3,6,0.5) 76%, rgba(255,220,165,0.12) 92%, rgba(22,3,6,0.38) 100%)',
              }}
            />
            {/* Subtle zari edge highlight where curtains part */}
            <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-b from-[#E3C27D]/90 via-[#C89B48]/75 to-[#8B6422]/80" />
          </motion.div>

          {/* Right Mirrored Photographic Crimson & Zari Silk Drape */}
          <motion.div
            initial={{ x: '0%', y: '0%', scaleX: 1 }}
            animate={{ x: '104%', y: '-3%', scaleX: 0.94 }}
            transition={{ duration: 1.05, delay: 0.28, ease: EASE_IMAGE }}
            className="absolute inset-y-0 right-0 w-[51.5%] origin-top-right overflow-hidden bg-[#5B0812] shadow-[-16px_0_48px_rgba(20,4,7,0.55)] will-change-transform"
          >
            <div className="relative h-full w-full -scale-x-100">
              <Image
                src="/images/silk-banarasi-brocade.jpg"
                alt=""
                fill
                priority
                sizes="55vw"
                className="object-cover object-[52%_58%] scale-[2.15] brightness-110 saturate-125"
              />
            </div>
            <div className="absolute inset-0 bg-[#9E0E1C]/48 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_45%,transparent_28%,rgba(54,4,10,0.82)_100%)]" />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(270deg, rgba(22,3,6,0.52) 0%, rgba(255,215,150,0.08) 18%, rgba(22,3,6,0.44) 36%, rgba(255,215,150,0.06) 56%, rgba(22,3,6,0.48) 76%, rgba(255,220,165,0.12) 92%, rgba(22,3,6,0.35) 100%)',
              }}
            />
            <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#E3C27D]/90 via-[#C89B48]/75 to-[#8B6422]/80" />
          </motion.div>

          {/* Discreet Top-Left NOOLAM Crest matching 00:00 */}
          <motion.div
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.35, ease: EASE_IMAGE }}
            className="absolute left-5 top-5 flex items-center gap-2.5 sm:left-10 sm:top-7"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D4B06A]/75 bg-[#3B060D]/80 font-editorial text-xs text-[#D4B06A]">
              N
            </span>
            <span className="font-editorial text-base tracking-[0.24em] text-[#FAF8F4]/95">
              NOOLAM
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
