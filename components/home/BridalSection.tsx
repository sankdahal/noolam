'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BRIDAL_SHOWCASE } from '@/lib/catalog';
import BrandImage from '@/components/BrandImage';
import { SectionRevealHeader } from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';
import { cn } from '@/lib/utils';

export default function BridalSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  const activeItem = BRIDAL_SHOWCASE[activeIndex];

  // Position cards in an arched fan symmetric around the selected card
  const getFanOrder = (idx: number) => {
    const total = BRIDAL_SHOWCASE.length;
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff; // -1, 0, 1, 2
  };

  return (
    <section
      id="bridal"
      className="overflow-hidden border-b border-[#E4D9C8] bg-[#FAF6F0] py-16 text-[#1E1714] sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Centered Warm-Ivory Editorial Header matching video 00:26 & 00:33 */}
        <SectionRevealHeader
          align="center"
          className="mx-auto max-w-2xl"
          eyebrow="Muhurtham · Sangeet · Reception"
          eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.22em] text-[#B89246]"
          title={
            <>
              The <span className="italic text-[#5C0F1C]">Bridal</span> Collection
            </>
          }
          titleClassName="mt-3 font-editorial text-4xl font-normal leading-tight text-[#1E1714] sm:text-5xl lg:text-6xl"
          description="Celebratory wedding silks woven with pure 2G silver-gold zari, auspicious temple motifs, and heirloom weight destined to cross generations."
          descriptionClassName="mt-4 text-sm leading-relaxed text-[#4F4037] sm:text-base"
        />

        {/* Overlapping Fanned Mandap Arches (Video 00:26 & 00:33) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
          className="relative mx-auto mt-12 flex h-[390px] max-w-5xl items-end justify-center sm:h-[470px]"
        >
          {BRIDAL_SHOWCASE.map((item, idx) => {
            const offset = getFanOrder(idx);
            const isCenter = offset === 0;
            const rotateDeg = offset * 8;
            const translateX = offset * 125;
            const translateY = Math.abs(offset) * 26;
            const scale = isCenter ? 1 : Math.abs(offset) === 1 ? 0.88 : 0.76;
            const zIndex = isCenter ? 30 : Math.abs(offset) === 1 ? 20 : 10;

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                animate={
                  prefersReduced
                    ? { x: translateX * 0.75, scale, zIndex }
                    : {
                        x: translateX,
                        y: translateY,
                        rotate: rotateDeg,
                        scale,
                        zIndex,
                      }
                }
                whileHover={isCenter || prefersReduced ? undefined : { y: translateY - 10 }}
                transition={{ duration: 0.55, ease: EASE_EDITORIAL }}
                style={{ zIndex }}
                aria-pressed={isCenter}
                aria-label={`Focus ${item.title}`}
                className={cn(
                  'group absolute bottom-0 w-[210px] origin-bottom cursor-pointer overflow-hidden rounded-t-full border-2 bg-[#FAF6F0] p-1.5 shadow-[0_20px_50px_rgba(30,23,20,0.16)] transition-colors duration-300 sm:w-[270px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C0F1C]',
                  isCenter
                    ? 'border-[#5C0F1C] shadow-[0_28px_64px_rgba(92,15,28,0.22)]'
                    : 'border-[#D8CBB8] hover:border-[#B89246]'
                )}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-full bg-[#3D0811]">
                  <BrandImage
                    src={item.image}
                    alt={`${item.title} — ${item.subtitle}`}
                    fill
                    sizes="(max-width: 640px) 210px, 270px"
                    className="object-cover object-top transition-transform duration-600 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-0 transition-opacity duration-300',
                      isCenter
                        ? 'bg-gradient-to-t from-[#19060A]/65 via-transparent to-transparent'
                        : 'bg-[#19060A]/25 group-hover:bg-[#19060A]/10'
                    )}
                  />
                  {isCenter && (
                    <span className="absolute inset-x-4 bottom-4 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#D4B06A]">
                      0{idx + 1} · Bridal Focus
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active Bridal Arch Caption + Pill CTAs */}
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#B89246]">
            {activeItem.subtitle}
          </p>
          <h3 className="mt-1 font-editorial text-3xl text-[#1E1714] sm:text-4xl">
            {activeItem.title}
          </h3>

          {/* Selector Dots */}
          <div className="mt-5 flex items-center gap-2">
            {BRIDAL_SHOWCASE.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Select ${item.title}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  idx === activeIndex
                    ? 'w-8 bg-[#5C0F1C]'
                    : 'w-2 bg-[#D8CBB8] hover:bg-[#B89246]'
                )}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.14, ease: EASE_MICRO }}>
              <Link
                href="/collections?occasion=Bridal"
                className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-[#5C0F1C] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-[#FAF6F0] transition-colors duration-200 hover:bg-[#480B15]"
              >
                Explore Bridal Sarees
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.6}
                />
              </Link>
            </motion.div>

            <Link
              href={`/products/${activeItem.slug}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#D8CBB8] bg-[#FDFBF7] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#1E1714] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
            >
              Inspect {activeItem.title.split(' ')[0]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
