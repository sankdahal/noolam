'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';
import BrandImage from '@/components/BrandImage';
import { EditorialMaskReveal, SectionRevealHeader } from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, VIEWPORT_ONCE } from '@/lib/motion';

const LOOM_METRICS = [
  { value: '3-Ply', label: 'Twisted mulberry yarn' },
  { value: '2G Zari', label: 'Tested silver-gold thread' },
  { value: '60–160h', label: 'Single pit-loom weave' },
];

export default function EditorialIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageParallax = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  return (
    <section
      ref={sectionRef}
      id="editorial-intro"
      className="overflow-hidden border-b border-[#E4D9C8] bg-[#FAF6F0] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Top Editorial Spread Header */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionRevealHeader
              eyebrow="Heritage Meets Contemporary Drape"
              eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B89246]"
              title={
                <>
                  Six Moods.{' '}
                  <span className="italic text-[#5C0F1C]">Timeless Drapes.</span>
                </>
              }
              titleClassName="mt-3 font-editorial text-4xl font-normal leading-[1.04] text-[#1E1714] sm:text-5xl lg:text-6xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE_EDITORIAL }}
            className="lg:col-span-5"
          >
            <p className="text-base leading-relaxed text-[#4F4037]">
              From morning temple rituals in unbleached kora silk to twilight receptions in iridescent shot-silk korvais, every NOOLAM saree preserves centuries-old South Indian handloom discipline while moving naturally with the modern wardrobe.
            </p>
          </motion.div>
        </div>

        {/* Wide Architectural Courtyard Photograph with Clean Editorial Overlay & Provenance Bar */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          <EditorialMaskReveal
            delay={0.08}
            className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#E4D9C8] bg-[#F3ECE1] lg:col-span-9 lg:aspect-[16/9]"
          >
            <motion.div
              style={prefersReduced ? undefined : { y: imageParallax }}
              className="relative h-[108%] w-full -top-[4%]"
            >
              <BrandImage
                src="/images/editorial-six-moods.jpg"
                alt="Two women dressed in crimson and emerald pure zari Kanjivaram silk sarees in a heritage courtyard"
                fill
                sizes="(max-width: 1024px) 100vw, 75vw"
                className="object-cover object-center transition-transform duration-700 ease-out md:group-hover:scale-[1.025]"
              />
            </motion.div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#1E1714]/70 via-transparent to-transparent"
            />
            <div className="absolute inset-x-6 bottom-6 flex flex-wrap items-end justify-between gap-4 text-[#FAF6F0]">
              <div>
                <p className="text-[10.5px] uppercase tracking-[0.2em] text-[#D4B06A]">
                  Mylapore Courtyard Study
                </p>
                <p className="mt-1 font-editorial text-2xl sm:text-3xl">
                  Handwoven Kanchipuram Mulberry &amp; Pure Zari
                </p>
              </div>
              <Link
                href="/collections"
                className="group/link inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#FAF6F0] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#5C0F1C] transition-colors duration-200 hover:bg-[#D4B06A] hover:text-[#1E1714]"
              >
                Explore the Archive
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                  strokeWidth={1.7}
                />
              </Link>
            </div>
          </EditorialMaskReveal>

          {/* Right Provenance Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.14 } },
            }}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-[#E4D9C8] bg-[#F3ECE1] p-6 sm:p-8 lg:col-span-3"
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6E5A4F]">
                Loom Provenance
              </p>
              <p className="mt-2 font-editorial text-2xl leading-snug text-[#1E1714]">
                Silk Mark certified weaves crafted across 46 master looms.
              </p>
            </div>

            <div className="space-y-5 border-t border-[#D8CBB8] pt-5">
              {LOOM_METRICS.map((metric) => (
                <motion.div
                  key={metric.value}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.55, ease: EASE_EDITORIAL },
                    },
                  }}
                >
                  <p className="font-editorial text-3xl tabular-nums text-[#5C0F1C]">
                    {metric.value}
                  </p>
                  <p className="mt-0.5 text-xs text-[#6E5A4F]">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
