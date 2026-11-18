'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LOOKBOOK_ITEMS, getProductById, formatINR } from '@/lib/catalog';
import { useStore } from '@/components/StoreProvider';
import BrandImage from '@/components/BrandImage';
import { SectionRevealHeader, useDragRail } from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';
import { cn } from '@/lib/utils';

export default function TryTheLookSection() {
  const [selectedId, setSelectedId] = useState<string>(LOOKBOOK_ITEMS[0].id);
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

  const activeLook =
    LOOKBOOK_ITEMS.find((item) => item.id === selectedId) || LOOKBOOK_ITEMS[0];
  const linkedSaree = getProductById(activeLook.sareeId);

  return (
    <section
      id="try-the-look"
      className="border-b border-[#E4D9C8] bg-[#FAF6F0] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionRevealHeader
            eyebrow="Styled Head to Toe"
            eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6E5A4F]"
            title="Try the Look"
            titleClassName="mt-2 font-editorial text-4xl font-normal text-[#1E1714] sm:text-5xl"
            description="Six curated looks styled across temple mornings, evening receptions, and bridal ceremonies. Select a portrait to view the draped pieces."
            descriptionClassName="mt-3 max-w-xl text-sm leading-relaxed text-[#4F4037] sm:text-base"
          />

          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
              onClick={() => scrollByAmount(-340)}
              aria-label="Scroll looks left"
              className="flex h-11 w-11 items-center justify-center border border-[#E4D9C8] bg-[#FDFBF7] text-[#1E1714] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
              onClick={() => scrollByAmount(340)}
              aria-label="Scroll looks right"
              className="flex h-11 w-11 items-center justify-center border border-[#E4D9C8] bg-[#FDFBF7] text-[#1E1714] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
            </motion.button>
          </div>
        </div>

        {/* Lookbook Carousel + Interactive Styled Breakdown */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Horizontal Model Showcase with Mouse Drag & Touch Support */}
          <div className="lg:col-span-8">
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
                'noolam-scroll flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory select-none',
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              )}
            >
              {LOOKBOOK_ITEMS.map((look) => {
                const isSelected = look.id === activeLook.id;
                return (
                  <motion.button
                    key={look.id}
                    type="button"
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.65, ease: EASE_EDITORIAL },
                      },
                    }}
                    onClick={(e) => {
                      preventDragClick(e);
                      if (!isDragging) setSelectedId(look.id);
                    }}
                    aria-pressed={isSelected}
                    className={cn(
                      'group relative w-[240px] shrink-0 snap-start text-left transition-opacity duration-300 sm:w-[260px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C0F1C]',
                      isSelected ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                    )}
                  >
                    <div
                      className={cn(
                        'relative aspect-[3/4] w-full overflow-hidden border bg-[#F3ECE1] transition-colors duration-300',
                        isSelected ? 'border-[#5C0F1C]' : 'border-[#E4D9C8]'
                      )}
                    >
                      <BrandImage
                        src={look.image}
                        alt={`${look.title} — ${look.mood}`}
                        fill
                        sizes="260px"
                        className="pointer-events-none object-cover object-top transition-transform duration-500 ease-out md:group-hover:scale-[1.035]"
                      />
                      {isSelected && (
                        <motion.span
                          layoutId="look-selected-badge"
                          transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
                          className="absolute left-3 top-3 bg-[#5C0F1C] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#FAF6F0]"
                        >
                          Selected Look
                        </motion.span>
                      )}
                    </div>

                    <div className="mt-3">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                        {look.mood}
                      </p>
                      <h3
                        className={cn(
                          'mt-1 font-editorial text-xl transition-colors duration-200',
                          isSelected
                            ? 'text-[#5C0F1C]'
                            : 'text-[#1E1714] group-hover:text-[#5C0F1C]'
                        )}
                      >
                        {look.title}
                      </h3>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Interactive Styled Breakdown Panel with Animated Crossfade */}
          <aside className="border border-[#E4D9C8] bg-[#FDFBF7] p-6 lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLook.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.26, ease: EASE_EDITORIAL }}
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#B89246]">
                  In This Look · {activeLook.mood}
                </p>
                <h3 className="mt-2 font-editorial text-2xl text-[#1E1714]">
                  {activeLook.title}
                </h3>

                {linkedSaree && (
                  <div className="mt-5 flex gap-4 border-y border-[#EFE7DA] py-4">
                    <Link
                      href={`/products/${linkedSaree.slug}`}
                      className="group/thumb relative h-24 w-18 shrink-0 overflow-hidden bg-[#F3ECE1]"
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
                        Featured Saree
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
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                      Blouse Pairing
                    </dt>
                    <dd className="mt-0.5 text-[#1E1714]">{activeLook.blouseNote}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                      Jewellery Styling
                    </dt>
                    <dd className="mt-0.5 text-[#1E1714]">{activeLook.jewelleryNote}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                      Drape Note
                    </dt>
                    <dd className="mt-0.5 text-[#1E1714]">{activeLook.drapeStyle}</dd>
                  </div>
                </dl>

                {linkedSaree && (
                  <div className="mt-6 flex flex-col gap-2.5 sm:flex-row lg:flex-col">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.14, ease: EASE_MICRO }}
                      onClick={() => addToCart(linkedSaree, 1)}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#5C0F1C] px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors duration-200 hover:bg-[#480B15]"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.6} />
                      Add Featured Saree to Bag
                    </motion.button>
                    <Link
                      href={`/products/${linkedSaree.slug}`}
                      className="group/btn inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 border border-[#E4D9C8] bg-[#FAF6F0] px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#1E1714] transition-colors duration-200 hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
                    >
                      Inspect Full Saree Details
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        strokeWidth={1.6}
                      />
                    </Link>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </section>
  );
}
