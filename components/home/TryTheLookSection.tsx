'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowUpRight,
  X,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LOOKBOOK_ITEMS, getProductById, formatINR } from '@/lib/catalog';
import { useStore } from '@/components/StoreProvider';
import BrandImage from '@/components/BrandImage';
import { SectionRevealHeader, useDragRail } from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';
import { cn } from '@/lib/utils';

export default function TryTheLookSection() {
  // Null means "All Looks" lineup overview; clicking any portrait brings it into spotlight + opens right drawer
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { addToCart } = useStore();
  const {
    railRef,
    isDragging,
    onMouseDown,
    onMouseMove,
    stopDragging,
    preventDragClick,
    scrollByAmount,
  } = useDragRail();

  const activeLook = selectedId
    ? LOOKBOOK_ITEMS.find((item) => item.id === selectedId) ?? null
    : null;
  const linkedSaree = activeLook ? getProductById(activeLook.sareeId) : undefined;

  return (
    <section
      id="try-the-look"
      className="overflow-hidden border-b border-[#E4D9C8] bg-[#FAF6F0] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionRevealHeader
            eyebrow="Styled Head to Toe"
            eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B89246]"
            title="Try the Look."
            titleClassName="mt-2 font-editorial text-4xl font-normal text-[#1E1714] sm:text-5xl lg:text-6xl"
            description="Six curated looks styled across temple mornings, evening receptions, and bridal ceremonies. Tap any portrait to bring her drape into focus and inspect the pieces."
            descriptionClassName="mt-3 max-w-xl text-sm leading-relaxed text-[#4F4037] sm:text-base"
          />

          <div className="flex items-center gap-2.5 shrink-0">
            {activeLook && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedId(null)}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#5C0F1C] bg-[#5C0F1C] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF6F0] transition-colors hover:bg-[#480B15]"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                All Looks
              </motion.button>
            )}

            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
              onClick={() => scrollByAmount(-320)}
              aria-label="Scroll looks left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E4D9C8] bg-[#FDFBF7] text-[#1E1714] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
              onClick={() => scrollByAmount(320)}
              aria-label="Scroll looks right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E4D9C8] bg-[#FDFBF7] text-[#1E1714] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
            </motion.button>
          </div>
        </div>

        {/* Full-Width Spotlight Lineup + Slide-In Breakdown Drawer (matching video 00:04–00:09) */}
        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-stretch">
          <div className={cn('min-w-0 transition-all duration-500', activeLook ? 'lg:flex-[1.65]' : 'lg:flex-1')}>
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
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className={cn(
                'noolam-scroll flex gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory select-none',
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              )}
            >
              {LOOKBOOK_ITEMS.map((look, index) => {
                const isSelected = look.id === selectedId;
                const isDimmed = selectedId !== null && !isSelected;

                return (
                  <motion.button
                    key={look.id}
                    type="button"
                    layout
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.65, ease: EASE_EDITORIAL },
                      },
                    }}
                    onClick={(e) => {
                      preventDragClick(e);
                      if (isDragging) return;
                      setSelectedId((prev) => (prev === look.id ? null : look.id));
                    }}
                    aria-pressed={isSelected}
                    className={cn(
                      'group relative shrink-0 snap-start text-left transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C0F1C]',
                      isSelected
                        ? 'w-[260px] sm:w-[290px] scale-[1.02] z-10'
                        : activeLook
                          ? 'w-[195px] sm:w-[215px]'
                          : 'w-[220px] sm:w-[235px] lg:flex-1 lg:min-w-[205px]',
                      isDimmed && 'opacity-45 blur-[1.5px] hover:opacity-80 hover:blur-0'
                    )}
                  >
                    <div
                      className={cn(
                        'relative aspect-[3/4] w-full overflow-hidden rounded-2xl border bg-[#F3ECE1] transition-all duration-400',
                        isSelected
                          ? 'border-[#5C0F1C] shadow-[0_20px_48px_rgba(92,15,28,0.18)]'
                          : 'border-[#E4D9C8] group-hover:border-[#B89246]'
                      )}
                    >
                      <BrandImage
                        src={look.image}
                        alt={`${look.title} — ${look.mood}`}
                        fill
                        sizes="(max-width: 640px) 260px, 290px"
                        className="pointer-events-none object-cover object-top transition-transform duration-600 ease-out md:group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1E1714]/82 via-[#1E1714]/35 to-transparent transition-opacity duration-300',
                          isSelected ? 'opacity-100' : 'opacity-85 group-hover:opacity-100'
                        )}
                      />

                      <span className="absolute left-3 top-3 rounded-full bg-[#FAF6F0]/90 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#5C0F1C] backdrop-blur-xs">
                        0{index + 1}
                      </span>

                      {isSelected && (
                        <motion.span
                          layoutId="look-spotlight-badge"
                          transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
                          className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#5C0F1C] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#FAF6F0]"
                        >
                          <Sparkles className="h-2.5 w-2.5 text-[#D4B06A]" strokeWidth={1.8} />
                          In Focus
                        </motion.span>
                      )}

                      <div className="absolute inset-x-3.5 bottom-3.5 text-[#FAF6F0]">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#D4B06A]">
                          {look.mood}
                        </p>
                        <h3 className="mt-0.5 font-editorial text-xl leading-tight">
                          {look.title}
                        </h3>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Quick Spotlight Hint Bar when viewing all looks */}
            {!activeLook && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#E4D9C8] pt-4 text-xs text-[#6E5A4F]">
                <p>
                  Select any portrait above to isolate the look and inspect its saree, blouse pairing, and heirloom jewellery notes.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedId(LOOKBOOK_ITEMS[0].id)}
                  className="font-medium uppercase tracking-[0.14em] text-[#5C0F1C] underline underline-offset-4 transition-colors hover:text-[#B89246]"
                >
                  Open Look 01 Breakdown
                </button>
              </div>
            )}
          </div>

          {/* Slide-In Right "In This Look" Styled Breakdown Drawer */}
          <AnimatePresence mode="wait">
            {activeLook && (
              <motion.aside
                key={activeLook.id}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                className="flex flex-col justify-between rounded-2xl border border-[#E4D9C8] bg-[#FDFBF7] p-6 shadow-[0_18px_45px_rgba(30,23,20,0.08)] lg:w-[390px] lg:shrink-0"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#B89246]">
                        In This Look · {activeLook.mood}
                      </p>
                      <h3 className="mt-1.5 font-editorial text-2xl leading-snug text-[#1E1714]">
                        {activeLook.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      aria-label="Close look breakdown"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E4D9C8] text-[#4F4037] transition-colors hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
                    >
                      <X className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </button>
                  </div>

                  {linkedSaree && (
                    <div className="mt-5 flex gap-4 border-y border-[#EFE7DA] py-4">
                      <Link
                        href={`/products/${linkedSaree.slug}`}
                        className="group/thumb relative h-24 w-[72px] shrink-0 overflow-hidden rounded-xl bg-[#F3ECE1]"
                      >
                        <BrandImage
                          src={linkedSaree.images[0]}
                          alt={linkedSaree.name}
                          fill
                          sizes="72px"
                          className="object-cover object-top transition-transform duration-500 group-hover/thumb:scale-[1.04]"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-[#6E5A4F]">
                          Featured Saree · {linkedSaree.silkType}
                        </p>
                        <Link
                          href={`/products/${linkedSaree.slug}`}
                          className="mt-0.5 block font-editorial text-lg leading-snug text-[#1E1714] transition-colors hover:text-[#5C0F1C]"
                        >
                          {linkedSaree.name}
                        </Link>
                        <p className="mt-1 text-sm font-medium tabular-nums text-[#5C0F1C]">
                          {formatINR(linkedSaree.price)}
                        </p>
                      </div>
                    </div>
                  )}

                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="rounded-xl bg-[#FAF6F0] px-3.5 py-2.5">
                      <dt className="text-[10.5px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                        Blouse Pairing
                      </dt>
                      <dd className="mt-0.5 text-[#1E1714]">{activeLook.blouseNote}</dd>
                    </div>
                    <div className="rounded-xl bg-[#FAF6F0] px-3.5 py-2.5">
                      <dt className="text-[10.5px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                        Jewellery Styling
                      </dt>
                      <dd className="mt-0.5 text-[#1E1714]">{activeLook.jewelleryNote}</dd>
                    </div>
                    <div className="rounded-xl bg-[#FAF6F0] px-3.5 py-2.5">
                      <dt className="text-[10.5px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                        Drape Note
                      </dt>
                      <dd className="mt-0.5 text-[#1E1714]">{activeLook.drapeStyle}</dd>
                    </div>
                  </dl>
                </div>

                {linkedSaree && (
                  <div className="mt-6 flex flex-col gap-2.5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.14, ease: EASE_MICRO }}
                      onClick={() => addToCart(linkedSaree, 1)}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#5C0F1C] px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors duration-200 hover:bg-[#480B15]"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.6} />
                      Add Featured Saree to Bag
                    </motion.button>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/products/${linkedSaree.slug}`}
                        className="group/btn inline-flex min-h-[42px] items-center justify-center gap-1 rounded-full border border-[#E4D9C8] bg-[#FAF6F0] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#1E1714] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
                      >
                        Inspect
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          strokeWidth={1.6}
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setSelectedId(null)}
                        className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-[#E4D9C8] bg-[#FAF6F0] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#4F4037] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
                      >
                        All Looks
                      </button>
                    </div>
                  </div>
                )}
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
