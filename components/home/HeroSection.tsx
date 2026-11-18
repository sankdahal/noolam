'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import BrandImage from '@/components/BrandImage';
import { EASE_EDITORIAL, EASE_IMAGE, EASE_MICRO } from '@/lib/motion';

const TICKER_ITEMS = [
  'KANCHIPURAM',
  'PURE ZARI',
  'HANDWOVEN SILK',
  'TEMPLE BORDERS',
  'THREE-SHUTTLE KORVAI',
  'BRIDAL TROUSSEAU',
  'SILK MARK CERTIFIED',
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="NOOLAM Showroom Hero"
      className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col justify-between overflow-hidden bg-[#26090F] text-[#FAF6F0]"
    >
      {/* Full-bleed Boutique Interior Photograph */}
      <motion.div
        style={prefersReduced ? undefined : { y: bgY }}
        initial={
          prefersReduced
            ? false
            : { clipPath: 'inset(3% 0% 0% 0%)', opacity: 0.65, scale: 1.06 }
        }
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.25, ease: EASE_IMAGE }}
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

      {/* Measured contrast scrim for crisp WCAG AA legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#19060A]/90 via-[#19060A]/38 to-[#19060A]/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#19060A]/75 via-[#19060A]/25 to-transparent"
      />

      {/* Editorial Foreground Content — Anchored bottom-left as in reference video */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pb-12 pt-28 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE_EDITORIAL }}
            className="flex items-center gap-3"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#D4B06A]">
              KANCHIPURAM · PURE ZARI · HANDWOVEN SILK
            </p>
            <motion.span
              aria-hidden="true"
              initial={prefersReduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE_EDITORIAL }}
              className="hidden h-[1px] w-10 origin-left bg-[#D4B06A]/70 sm:inline-block"
            />
          </motion.div>

          <h1
            className="mt-3 font-editorial text-5xl font-normal leading-[1.02] tracking-tight text-[#FAF6F0] sm:text-6xl lg:text-[4.75rem]"
            style={{ textWrap: 'balance' }}
          >
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                initial={prefersReduced ? false : { y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.78, delay: 0.52, ease: EASE_EDITORIAL }}
                className="inline-block"
              >
                Woven for&nbsp;
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                initial={prefersReduced ? false : { y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.78, delay: 0.6, ease: EASE_EDITORIAL }}
                className="inline-block"
              >
                the Divine.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.72, ease: EASE_EDITORIAL }}
            className="mt-4 max-w-xl text-base leading-relaxed text-[#EFE6D5]/92 sm:text-lg"
          >
            NOOLAM brings the temple looms of Kanchipuram home. Kanjivaram silk in heritage colours, bordered in real zari and finished by hand.
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.82, ease: EASE_EDITORIAL }}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <motion.div
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
            >
              <Link
                href="/#try-the-look"
                className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-[#FAF6F0] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#5C0F1C] transition-colors duration-200 hover:bg-[#D4B06A] hover:text-[#1E1714] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A]"
              >
                Try the Look
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.7}
                />
              </Link>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
            >
              <Link
                href="/collections"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#FAF6F0]/55 bg-[#19060A]/45 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors duration-200 hover:border-[#D4B06A] hover:bg-[#5C0F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A]"
              >
                Browse the Rack
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Edge Heritage Ribbon Ticker matching video 00:01 */}
      <div className="group/marquee relative z-10 w-full overflow-hidden border-t border-[#D4B06A]/35 bg-[#5C0F1C] py-2.5 text-[#FAF6F0]">
        <div className="animate-noolam-marquee flex w-max items-center whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="inline-flex items-center gap-6 px-4 text-[10.5px] font-medium uppercase tracking-[0.26em] text-[#EFE6D5]"
            >
              <span>{item}</span>
              <span aria-hidden="true" className="text-[#D4B06A]">
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
