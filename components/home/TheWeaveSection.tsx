'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
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

export default function TheWeaveSection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'sw-muga',
    'sw-koorai',
    'sw-sindoor',
  ]);
  const { addCustomWeaveToCart } = useStore();

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
      className="border-b border-[#E4D9C8] bg-[#FAF6F0] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Part 1: Craftsmanship Storytelling */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          <EditorialMaskReveal
            direction="left"
            className="group relative aspect-[16/10] w-full border border-[#E4D9C8] bg-[#F3ECE1] lg:col-span-7 lg:aspect-auto lg:min-h-[440px]"
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
                eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.18em] text-[#B89246]"
                title={
                  <>
                    Three shuttles.{' '}
                    <span className="italic text-[#5C0F1C]">One unbroken join.</span>
                  </>
                }
                titleClassName="mt-3 font-editorial text-4xl font-normal leading-[1.1] text-[#1E1714] sm:text-5xl"
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

        {/* Part 2: Interactive "Three silks, one weave." Studio */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
          className="mt-16 border border-[#E4D9C8] bg-[#FDFBF7] p-6 sm:p-10"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-[#EFE7DA] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6E5A4F]">
                Interactive Loom Pairing
              </p>
              <h3 className="mt-1.5 font-editorial text-3xl text-[#1E1714] sm:text-4xl">
                Three silks, <span className="italic text-[#5C0F1C]">one weave.</span>
              </h3>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
              onClick={() => setSelectedIds(['sw-muga', 'sw-koorai', 'sw-sindoor'])}
              className="group inline-flex w-fit items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#6E5A4F] transition-colors hover:text-[#5C0F1C]"
            >
              <RotateCcw
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-45"
                strokeWidth={1.6}
              />
              Reset Loom
            </motion.button>
          </div>

          {/* Woven Visual Ribbon Preview */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="overflow-hidden border border-[#E4D9C8] bg-[#FAF6F0] p-5">
                <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#6E5A4F]">
                  Woven Harmony Preview ({selectedSwatches.length} / 3 Silks Selected)
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {selectedSwatches.map((swatch, index) => (
                    <motion.div
                      key={swatch.id}
                      layout
                      initial={{ opacity: 0.65, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                      className="flex flex-col justify-between p-4"
                      style={{
                        backgroundColor: swatch.colorHex,
                        borderBottom: `6px solid ${swatch.zariHex}`,
                        color:
                          swatch.colorHex === '#EFE6D5' || swatch.colorHex === '#CBB17D'
                            ? '#1E1714'
                            : '#FAF6F0',
                        minHeight: '132px',
                      }}
                    >
                      <span className="text-[10px] uppercase tracking-[0.18em] opacity-80">
                        {index === 0 ? 'Body Warp' : index === 1 ? 'Korvai Border' : 'Pallu & Zari'}
                      </span>
                      <div>
                        <p className="font-editorial text-xl leading-tight">{swatch.name}</p>
                        <p className="mt-1 text-[11px] opacity-80">{swatch.silkType}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Circular Swatch Selector */}
              <div className="mt-6">
                <p className="mb-3 text-xs uppercase tracking-[0.14em] text-[#6E5A4F]">
                  Choose up to 3 silks to weave together:
                </p>
                <div className="flex flex-wrap gap-3">
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
                          'group relative flex items-center gap-2.5 border px-3 py-2 text-left transition-colors duration-200',
                          selected
                            ? 'border-[#5C0F1C] bg-[#FAF6F0]'
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
                            <motion.span
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.18 }}
                            >
                              <Check
                                className={cn(
                                  'h-3.5 w-3.5',
                                  swatch.colorHex === '#EFE6D5' || swatch.colorHex === '#CBB17D'
                                    ? 'text-[#1E1714]'
                                    : 'text-[#FAF6F0]'
                                )}
                                strokeWidth={2.4}
                              />
                            </motion.span>
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
            </div>

            {/* Summary & Commission Action */}
            <div className="border border-[#E4D9C8] bg-[#FAF6F0] p-6 lg:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#B89246]">
                Bespoke Loom Commission
              </p>
              <ul className="mt-4 divide-y divide-[#EFE7DA] text-sm">
                {selectedSwatches.map((s, idx) => (
                  <li key={s.id} className="flex items-center justify-between py-2.5">
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.12em] text-[#6E5A4F]">
                        0{idx + 1}.{' '}
                      </span>
                      <span className="font-medium text-[#1E1714]">{s.name}</span>
                      <p className="text-xs text-[#6E5A4F]">{s.note}</p>
                    </div>
                    <span className="text-xs tabular-nums text-[#4F4037]">
                      {formatINR(s.priceAddon)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-baseline justify-between border-t border-[#E4D9C8] pt-4">
                <span className="text-xs uppercase tracking-[0.14em] text-[#6E5A4F]">
                  Estimated Loom Value
                </span>
                <motion.span
                  key={combinedPrice}
                  initial={{ opacity: 0.5, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, ease: EASE_EDITORIAL }}
                  className="font-editorial text-3xl tabular-nums text-[#5C0F1C]"
                >
                  {formatINR(combinedPrice)}
                </motion.span>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.14, ease: EASE_MICRO }}
                onClick={handleAddBespoke}
                className="mt-5 flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#5C0F1C] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors duration-200 hover:bg-[#480B15]"
              >
                <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.6} />
                Commission &amp; Add to Bag
              </motion.button>
              <p className="mt-2.5 text-center text-[11px] text-[#6E5A4F]">
                Custom korvai weaves are loomed to order in 3–4 weeks.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
