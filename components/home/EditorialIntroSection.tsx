'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import BrandImage from '@/components/BrandImage';
import {
  EditorialMaskReveal,
  SectionRevealHeader,
} from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, VIEWPORT_ONCE } from '@/lib/motion';

const LOOM_METRICS = [
  { value: '3-Ply', label: 'Twisted mulberry yarn' },
  { value: '2G Zari', label: 'Tested silver-gold thread' },
  { value: '60–160h', label: 'Single pit-loom weave' },
];

export default function EditorialIntroSection() {
  return (
    <section
      id="editorial-intro"
      className="border-b border-[#E4D9C8] bg-[#FAF6F0] py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
        {/* Left Editorial Narrative */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <SectionRevealHeader
              eyebrow="Heritage Meets Contemporary Drape"
              eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6E5A4F]"
              title={
                <>
                  Six Moods.{' '}
                  <span className="italic text-[#5C0F1C]">Timeless Drapes.</span>
                </>
              }
              titleClassName="mt-3 font-editorial text-4xl font-normal leading-[1.1] text-[#1E1714] sm:text-5xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.65, delay: 0.16, ease: EASE_EDITORIAL }}
              className="mt-6 max-w-lg text-base leading-relaxed text-[#4F4037]"
            >
              From morning temple rituals in unbleached kora silk to twilight receptions in iridescent shot-silk korvais, every NOOLAM saree preserves centuries-old South Indian handloom discipline while moving naturally with the modern wardrobe.
            </motion.p>
          </div>

          <div className="mt-10 border-t border-[#E4D9C8] pt-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
              className="grid grid-cols-3 gap-4 text-left"
            >
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
                  <p className="font-editorial text-2xl tabular-nums text-[#5C0F1C]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-[#6E5A4F]">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.55, delay: 0.25, ease: EASE_EDITORIAL }}
              className="mt-8"
            >
              <Link
                href="/collections"
                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#5C0F1C] transition-colors duration-200 hover:text-[#B89246]"
              >
                Explore the Full Archive
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.6}
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Supporting Courtyard Editorial Photograph with Masked Reveal */}
        <EditorialMaskReveal
          delay={0.12}
          className="group relative aspect-[16/10] w-full border border-[#E4D9C8] bg-[#F3ECE1] lg:col-span-7 lg:aspect-auto lg:min-h-[460px]"
        >
          <BrandImage
            src="/images/editorial-six-moods.jpg"
            alt="Two women dressed in crimson and emerald pure zari Kanjivaram silk sarees in a heritage courtyard"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center transition-transform duration-700 ease-out md:group-hover:scale-[1.025]"
          />
        </EditorialMaskReveal>
      </div>
    </section>
  );
}
