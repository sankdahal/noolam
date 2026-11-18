'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import BrandImage from '@/components/BrandImage';
import { EASE_EDITORIAL, EASE_IMAGE, VIEWPORT_ONCE } from '@/lib/motion';

const TICKER_ITEMS = [
  'KANCHIPURAM',
  'PURE ZARI',
  'HANDWOVEN SILK',
  'TEMPLE BORDERS',
  'THREE-SHUTTLE KORVAI',
  'BRIDAL TROUSSEAU',
  'SILK MARK CERTIFIED',
];

export default function EditorialIntroSection() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ['start end', 'end start'],
  });

  const courtyardY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  return (
    <section
      id="editorial-intro"
      className="overflow-hidden bg-[#FAF8F4]"
    >
      {/* 1. Full-Bleed Wide Courtyard Editorial Photograph (00:02–00:03) */}
      <div
        ref={imageWrapRef}
        className="relative aspect-[16/9] min-h-[280px] w-full overflow-hidden bg-[#EDE4D5] sm:aspect-[16/8.2] sm:min-h-[440px] lg:min-h-[560px]"
      >
        <motion.div
          style={prefersReduced ? undefined : { y: courtyardY }}
          initial={prefersReduced ? false : { scale: 1.04, opacity: 0.85 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.95, ease: EASE_IMAGE }}
          className="relative -top-[4%] h-[108%] w-full will-change-transform"
        >
          <BrandImage
            src="/images/editorial-six-moods.jpg"
            alt="Two women dressed in crimson and emerald pure zari Kanjivaram silk sarees in a heritage courtyard"
            fill
            sizes="100vw"
            className="object-cover object-[50%_22%]"
          />
        </motion.div>
      </div>

      {/* 2. Full-Width Deep Burgundy Scrolling Marquee Ribbon (00:03) */}
      <div className="group/marquee relative w-full overflow-hidden border-y border-[#D4B06A]/30 bg-[#5C0F1C] py-2.5 text-[#FAF8F4]">
        <div className="animate-noolam-marquee flex w-max items-center whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map(
            (item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="inline-flex items-center gap-6 px-4 text-[10.5px] font-medium uppercase tracking-[0.26em] text-[#EFE6D5]"
              >
                <span>{item}</span>
                <span aria-hidden="true" className="text-[#D4B06A]">
                  ·
                </span>
              </span>
            )
          )}
        </div>
      </div>

      {/* 3. Open Spacious Typographic Pause: "Six Moods. Timeless Drapes." (00:03) */}
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="overflow-hidden">
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.78, ease: EASE_EDITORIAL }}
            className="font-display-sans text-4xl font-light leading-[1.08] tracking-[-0.025em] text-[#1E1714] sm:text-5xl lg:text-[4rem]"
            style={{ textWrap: 'balance' }}
          >
            Six Moods.{' '}
            <span className="font-editorial-accent">Timeless Drapes.</span>
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
