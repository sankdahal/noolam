'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import BrandImage from '@/components/BrandImage';
import { EASE_EDITORIAL, EASE_IMAGE } from '@/lib/motion';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="NOOLAM Showroom Hero"
      className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col justify-end overflow-hidden bg-[#2A0E12] text-[#FAF8F4]"
    >
      {/* Full-bleed Bright Showroom Photograph — unobstructed focal hero matching 00:01 */}
      <motion.div
        style={prefersReduced ? undefined : { y: bgY }}
        initial={prefersReduced ? false : { opacity: 0.72, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.15, delay: 0.3, ease: EASE_IMAGE }}
        className="absolute inset-0 will-change-transform"
      >
        <BrandImage
          src="/images/hero-showroom.jpg"
          alt="NOOLAM flagship Kanchipuram silk saree showroom with carved teakwood counters and pure zari sarees"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Subtle bottom-only contrast scrim so showroom lighting & silk displays remain bright */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#160508]/72 via-[#160508]/28 to-transparent sm:h-64"
      />

      {/* Editorial Bottom-Left Headline Only */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16">
        <h1
          className="font-display-sans text-4xl font-light leading-[1.04] tracking-[-0.025em] text-[#FAF8F4] drop-shadow-[0_2px_18px_rgba(16,4,6,0.45)] sm:text-6xl lg:text-[4.5rem]"
          style={{ textWrap: 'balance' }}
        >
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              initial={prefersReduced ? false : { y: '108%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE_EDITORIAL }}
              className="inline-block"
            >
              Woven for&nbsp;
            </motion.span>
          </span>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              initial={prefersReduced ? false : { y: '108%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.68, ease: EASE_EDITORIAL }}
              className="inline-block"
            >
              the Divine.
            </motion.span>
          </span>
        </h1>
      </div>
    </section>
  );
}
