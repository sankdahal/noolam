'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SILK_VARIETIES } from '@/lib/catalog';
import BrandImage from '@/components/BrandImage';
import { SectionRevealHeader, useDragRail } from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';
import { cn } from '@/lib/utils';

export default function PickASilkSection() {
  const {
    railRef,
    isDragging,
    onMouseDown,
    onMouseMove,
    stopDragging,
    preventDragClick,
    scrollByAmount,
  } = useDragRail();

  return (
    <section
      id="pick-a-silk"
      className="overflow-hidden border-b border-[#E4D9C8] bg-[#F3ECE1] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionRevealHeader
            eyebrow="Regional Loom Heritage"
            eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B89246]"
            title="Pick a Silk"
            titleClassName="mt-2 font-editorial text-4xl font-normal text-[#1E1714] sm:text-5xl lg:text-6xl"
            description="Distinct silk lineages defined by yarn twist, zari lustre, and regional motif vocabulary. Select a poster card to browse its woven archive."
            descriptionClassName="mt-3 max-w-xl text-sm leading-relaxed text-[#4F4037] sm:text-base"
          />

          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
              onClick={() => scrollByAmount(-320)}
              aria-label="Scroll silk varieties left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CBB8] bg-[#FAF6F0] text-[#1E1714] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
              onClick={() => scrollByAmount(320)}
              aria-label="Scroll silk varieties right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CBB8] bg-[#FAF6F0] text-[#1E1714] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
            </motion.button>
          </div>
        </div>

        {/* Vibrant Color-Blocked Poster Cards matching video 00:10–00:11 */}
        <motion.div
          ref={railRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className={cn(
            'noolam-scroll mt-10 flex gap-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory select-none',
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          )}
        >
          {SILK_VARIETIES.map((silk, idx) => (
            <motion.div
              key={silk.id}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: EASE_EDITORIAL },
                },
              }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
              className="w-[265px] shrink-0 snap-start sm:w-[285px]"
            >
              <Link
                href={`/collections?silk=${encodeURIComponent(silk.filterSilk)}`}
                onClick={preventDragClick}
                style={{ backgroundColor: silk.accentBg }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-5 text-[#FAF6F0] shadow-[0_14px_32px_rgba(30,23,20,0.12)] transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(30,23,20,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A]"
              >
                {/* Upper Bold Poster Typography */}
                <div>
                  <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.18em] text-[#FAF6F0]/80">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[#D4B06A]"
                      />
                      {silk.origin}
                    </span>
                    <span className="tabular-nums text-[#D4B06A]">0{idx + 1}</span>
                  </div>

                  <h3 className="mt-3 font-editorial text-3xl font-normal leading-[1.06] text-[#FAF6F0]">
                    {silk.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#EFE6D5]/88">
                    {silk.tagline}
                  </p>
                </div>

                {/* Inset Framed Silk Photograph inside the Color Block */}
                <div className="relative mt-5 aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/15 bg-black/15">
                  <BrandImage
                    src={silk.image}
                    alt={`${silk.name} — ${silk.origin}`}
                    fill
                    sizes="285px"
                    className="pointer-events-none object-cover object-center transition-transform duration-600 ease-out md:group-hover:scale-[1.06]"
                  />
                </div>

                {/* Poster Bottom Action */}
                <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#FAF6F0]">
                  <span>Explore Weave</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FAF6F0]/15 transition-colors duration-200 group-hover:bg-[#D4B06A] group-hover:text-[#1E1714]">
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      strokeWidth={1.7}
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
