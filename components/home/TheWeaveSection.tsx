'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, RotateCcw, ShoppingBag } from 'lucide-react';
import { WEAVE_SWATCHES, formatINR } from '@/lib/catalog';
import { useStore } from '@/components/StoreProvider';
import BrandImage from '@/components/BrandImage';
import {
  EditorialMaskReveal,
  SectionRevealHeader,
} from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';
import { cn } from '@/lib/utils';

const RIBBON_PATHS = [
  'M -40 72 C 180 18, 360 128, 560 72 C 740 22, 920 124, 1140 66',
  'M -40 126 C 170 176, 370 68, 560 126 C 750 182, 930 76, 1140 128',
  'M -40 182 C 190 128, 350 232, 560 178 C 760 124, 910 228, 1140 176',
];

export default function TheWeaveSection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'sw-muga',
    'sw-koorai',
    'sw-sindoor',
  ]);
  const { addCustomWeaveToCart } = useStore();
  const prefersReduced = useReducedMotion();

  const toggleSwatch = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((item) => item !== id) : prev;
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const selectedSwatches = selectedIds
    .map((id) => WEAVE_SWATCHES.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const combinedPrice = selectedSwatches.reduce((sum, s) => sum + s.priceAddon, 0);

  const handleAddBespoke = () => {
    const names = selectedSwatches.map((s) => s.name).join(' + ');
    addCustomWeaveToCart({
      id: `bespoke-${selectedSwatches.map((s) => s.id).join('-')}`,
      name: 'Bespoke Three-Shuttle Korvai',
      slug: 'bespoke-three-shuttle-korvai',
      silkType: 'Custom Kanchipuram Commission',
      color: names,
      price: combinedPrice,
      image: '/images/weave-handloom.jpg',
      customNote: `Woven threads: ${names}`,
    });
  };

  return (
    <section
      id="the-weave"
      className="overflow-hidden border-b border-[#E4D9C8] bg-[#FAF6F0] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Part 1: Craftsmanship Storytelling */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          <EditorialMaskReveal
            direction="left"
            className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#E4D9C8] bg-[#F3ECE1] lg:col-span-7 lg:aspect-auto lg:min-h-[440px]"
          >
            <BrandImage
              src="/images/weave-handloom.jpg"
              alt="Master weaver hands interlacing crimson silk warp threads and gold zari bobbins on a traditional Kanchipuram pit loom"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center transition-transform duration-700 ease-out md:group-hover:scale-[1.025]"
            />
          </EditorialMaskReveal>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <SectionRevealHeader
                eyebrow="The Weave · Kanchipuram Craft"
                eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B89246]"
                title={
                  <>
                    Three shuttles.{' '}
                    <span className="italic text-[#5C0F1C]">One unbroken join.</span>
                  </>
                }
                titleClassName="mt-3 font-editorial text-4xl font-normal leading-[1.08] text-[#1E1714] sm:text-5xl"
              />

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.65, delay: 0.14, ease: EASE_EDITORIAL }}
                className="mt-5 text-base leading-relaxed text-[#4F4037]"
              >
                Authentic Kanjivaram weaving relies on the <span className="italic">korvai</span> technique—two artisans operating three shuttles simultaneously to interlock contrasting border threads directly into the body warp. No seam, no glue, only woven permanence.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.65, delay: 0.22, ease: EASE_EDITORIAL }}
                className="mt-4 text-sm leading-relaxed text-[#6E5A4F]"
              >
                Our zari begins as pure silver wire drawn through diamond dies, spun over silk core, and dipped in 24-karat gold—preserving a luminous patina that never tarnishes.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.55, delay: 0.26, ease: EASE_EDITORIAL }}
              className="mt-8 grid grid-cols-2 gap-4 border-t border-[#E4D9C8] pt-6"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                  Silk Mark India
                </p>
                <p className="mt-1 font-editorial text-xl text-[#1E1714]">
                  100% Pure Mulberry
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                  Artisan Guild
                </p>
                <p className="mt-1 font-editorial text-xl text-[#1E1714]">
                  46 Master Looms
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Part 2: Interactive Flowing Silk Ribbon Composer ("Three silks, one weave." — Video 00:34–00:40) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
          className="mt-16 rounded-3xl border border-[#E4D9C8] bg-[#FDFBF7] p-6 shadow-[0_18px_48px_rgba(30,23,20,0.06)] sm:p-10"
        >
          {/* Top Header & Reset */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#EFE7DA] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B89246]">
                Interactive Loom Pairing
              </p>
              <h3 className="mt-1.5 font-editorial text-3xl text-[#1E1714] sm:text-5xl">
                Three silks, <span className="italic text-[#5C0F1C]">one weave.</span>
              </h3>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
              onClick={() => setSelectedIds(['sw-muga', 'sw-koorai', 'sw-sindoor'])}
              className="group inline-flex w-fit items-center gap-1.5 rounded-full border border-[#E4D9C8] bg-[#FAF6F0] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#6E5A4F] transition-colors hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
            >
              <RotateCcw
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-45"
                strokeWidth={1.6}
              />
              Reset Loom
            </motion.button>
          </div>

          {/* Flowing Undulating Silk Ribbon Canvas (Video 00:34–00:40) */}
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#E4D9C8] bg-gradient-to-br from-[#FAF6F0] via-[#F7EFE2] to-[#F1E6D4] px-4 py-6 sm:px-8 sm:py-8">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              {/* Left Numbered Thread Callouts */}
              <div className="relative z-10 space-y-3 lg:col-span-3">
                <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-[#6E5A4F]">
                  Active Shuttles ({selectedSwatches.length}/3)
                </p>
                {selectedSwatches.map((swatch, idx) => (
                  <div
                    key={swatch.id}
                    className="flex items-center gap-3 rounded-xl border border-[#E4D9C8]/90 bg-[#FDFBF7]/90 px-3.5 py-2.5 backdrop-blur-xs"
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/15 text-[11px] font-semibold"
                      style={{
                        backgroundColor: swatch.colorHex,
                        color:
                          swatch.colorHex === '#EFE6D5' || swatch.colorHex === '#CBB17D'
                            ? '#1E1714'
                            : '#FAF6F0',
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-[#1E1714]">
                        {swatch.name}
                      </p>
                      <p className="truncate text-[10.5px] text-[#6E5A4F]">
                        {idx === 0 ? 'Body Warp' : idx === 1 ? 'Korvai Border' : 'Pallu & Zari'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Center Flowing Interlaced Silk Ribbons */}
              <div className="relative h-[220px] w-full sm:h-[260px] lg:col-span-6">
                <svg
                  viewBox="0 0 1100 250"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-label="Flowing silk weave ribbon visualization"
                  className="h-full w-full"
                >
                  {selectedSwatches.map((swatch, idx) => {
                    const path = RIBBON_PATHS[idx] || RIBBON_PATHS[0];
                    return (
                      <g key={swatch.id}>
                        {/* Primary Silk Ribbon */}
                        <motion.path
                          d={path}
                          stroke={swatch.colorHex}
                          strokeWidth="34"
                          strokeLinecap="round"
                          initial={prefersReduced ? false : { pathLength: 0.75, opacity: 0.6 }}
                          animate={{
                            pathLength: 1,
                            opacity: 0.95,
                            y: prefersReduced ? 0 : [0, idx % 2 === 0 ? -5 : 5, 0],
                          }}
                          transition={{
                            pathLength: { duration: 0.7, ease: EASE_EDITORIAL },
                            y: {
                              duration: 5 + idx * 0.8,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            },
                          }}
                        />
                        {/* Pure Zari Edge Filament */}
                        <motion.path
                          d={path}
                          stroke={swatch.zariHex}
                          strokeWidth="4"
                          strokeDasharray="10 6"
                          strokeLinecap="round"
                          animate={{
                            y: prefersReduced ? 0 : [0, idx % 2 === 0 ? -5 : 5, 0],
                          }}
                          transition={{
                            y: {
                              duration: 5 + idx * 0.8,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            },
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 text-center">
                  <span className="inline-block rounded-full border border-[#D8CBB8] bg-[#FAF6F0]/90 px-4 py-1 font-editorial text-base italic text-[#5C0F1C] backdrop-blur-xs">
                    Woven as one
                  </span>
                </div>
              </div>

              {/* Right Live INR Summary & Commission CTA */}
              <div className="relative z-10 flex flex-col justify-between rounded-2xl border border-[#E4D9C8] bg-[#FDFBF7]/95 p-5 backdrop-blur-xs lg:col-span-3">
                <div>
                  <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-[#B89246]">
                    Estimated Loom Value
                  </p>
                  <motion.p
                    key={combinedPrice}
                    initial={{ opacity: 0.5, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, ease: EASE_EDITORIAL }}
                    className="mt-1 font-editorial text-4xl tabular-nums text-[#5C0F1C]"
                  >
                    {formatINR(combinedPrice)}
                  </motion.p>
                  <p className="mt-2 text-xs leading-relaxed text-[#6E5A4F]">
                    Custom three-shuttle korvai weaves are loomed to order in Kanchipuram within 3–4 weeks.
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.14, ease: EASE_MICRO }}
                  onClick={handleAddBespoke}
                  className="mt-5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#5C0F1C] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF6F0] transition-colors duration-200 hover:bg-[#480B15]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.6} />
                  Commission &amp; Add to Bag
                </motion.button>
              </div>
            </div>
          </div>

          {/* Circular Silk Swatch Bar Below the Flowing Ribbon */}
          <div className="mt-7">
            <p className="mb-3 text-center text-xs uppercase tracking-[0.16em] text-[#6E5A4F]">
              Choose up to 3 silks to interlace on the loom
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {WEAVE_SWATCHES.map((swatch) => {
                const selected = selectedIds.includes(swatch.id);
                return (
                  <motion.button
                    key={swatch.id}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.14, ease: EASE_MICRO }}
                    onClick={() => toggleSwatch(swatch.id)}
                    aria-pressed={selected}
                    title={`${swatch.name} — ${swatch.silkType}`}
                    className={cn(
                      'group relative flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-left transition-colors duration-200',
                      selected
                        ? 'border-[#5C0F1C] bg-[#FAF6F0] shadow-xs'
                        : 'border-[#E4D9C8] bg-[#FDFBF7] hover:border-[#B89246]'
                    )}
                  >
                    <span
                      className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/15 transition-transform duration-200 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${swatch.colorHex} 65%, ${swatch.zariHex} 100%)`,
                      }}
                    >
                      {selected && (
                        <Check
                          className={cn(
                            'h-3.5 w-3.5',
                            swatch.colorHex === '#EFE6D5' || swatch.colorHex === '#CBB17D'
                              ? 'text-[#1E1714]'
                              : 'text-[#FAF6F0]'
                          )}
                          strokeWidth={2.4}
                        />
                      )}
                    </span>
                    <span className="text-xs font-medium text-[#1E1714] whitespace-nowrap">
                      {swatch.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
