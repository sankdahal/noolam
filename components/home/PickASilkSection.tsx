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
      className="border-b border-[#E4D9C8] bg-[#F3ECE1] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionRevealHeader
            eyebrow="Regional Loom Heritage"
            eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6E5A4F]"
            title="Pick a Silk"
            titleClassName="mt-2 font-editorial text-4xl font-normal text-[#1E1714] sm:text-5xl"
            description="Distinct silk lineages defined by yarn twist, zari lustre, and regional motif vocabulary. Select a weave to browse its collection."
            descriptionClassName="mt-3 max-w-xl text-sm leading-relaxed text-[#4F4037] sm:text-base"
          />

          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
              onClick={() => scrollByAmount(-320)}
              aria-label="Scroll silk varieties left"
              className="flex h-11 w-11 items-center justify-center border border-[#D8CBB8] bg-[#FAF6F0] text-[#1E1714] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
              onClick={() => scrollByAmount(320)}
              aria-label="Scroll silk varieties right"
              className="flex h-11 w-11 items-center justify-center border border-[#D8CBB8] bg-[#FAF6F0] text-[#1E1714] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
            </motion.button>
          </div>
        </div>

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
            'noolam-scroll mt-10 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory select-none',
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          )}
        >
          {SILK_VARIETIES.map((silk) => (
            <motion.div
              key={silk.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: EASE_EDITORIAL },
                },
              }}
              className="w-[260px] shrink-0 snap-start sm:w-[285px]"
            >
              <Link
                href={`/collections?silk=${encodeURIComponent(silk.filterSilk)}`}
                onClick={preventDragClick}
                className="group relative flex h-full flex-col overflow-hidden border border-[#D8CBB8] bg-[#FAF6F0] transition-colors duration-300 hover:border-[#5C0F1C]"
              >
                {/* Vibrant Silk Image Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <BrandImage
                    src={silk.image}
                    alt={`${silk.name} — ${silk.origin}`}
                    fill
                    sizes="285px"
                    className="pointer-events-none object-cover object-center transition-transform duration-500 ease-out md:group-hover:scale-[1.045]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1E1714]/82 via-[#1E1714]/38 to-transparent transition-opacity duration-300"
                  />
                  <div className="absolute inset-x-4 bottom-4 text-[#FAF6F0] transition-transform duration-300 ease-out md:group-hover:-translate-y-0.5">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#D4B06A]">
                      {silk.origin}
                    </p>
                    <h3 className="mt-1 font-editorial text-2xl leading-tight">
                      {silk.name}
                    </h3>
                  </div>
                </div>

                {/* Clean Footer Strip */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <p className="text-xs leading-relaxed text-[#4F4037]">
                    {silk.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#5C0F1C] transition-colors duration-200 group-hover:text-[#B89246]">
                    Explore Collection
                    <ArrowRight
                      className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"
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
