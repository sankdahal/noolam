'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Check, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PRODUCTS, formatINR } from '@/lib/catalog';
import { useStore } from '@/components/StoreProvider';
import BrandImage from '@/components/BrandImage';
import ProductCard from '@/components/ProductCard';
import { SectionRevealHeader } from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';
import { cn } from '@/lib/utils';

const RACK_TABS = [
  { id: 'all', label: 'All pieces' },
  { id: 'Kanjivaram', label: 'Kanjivaram' },
  { id: 'Koorai Check', label: 'Koorai Check' },
  { id: 'Banarasi', label: 'Banarasi' },
  { id: 'Palace Tissue', label: 'Palace Tissue' },
  { id: 'Silk Blouse', label: 'Blouses' },
];

export default function TheRackSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedHangerId, setSelectedHangerId] = useState<string | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const { addToCart } = useStore();
  const prefersReduced = useReducedMotion();

  const visibleProducts = useMemo(() => {
    if (activeTab === 'all') return PRODUCTS.slice(0, 8);
    return PRODUCTS.filter((p) => p.silkType === activeTab).slice(0, 8);
  }, [activeTab]);

  // Rail displays up to 6 hanging sarees cleanly across the horizontal brass bar
  const railPieces = useMemo(() => visibleProducts.slice(0, 6), [visibleProducts]);

  const activeHangerProduct = useMemo(
    () => railPieces.find((p) => p.id === selectedHangerId) ?? null,
    [railPieces, selectedHangerId]
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedHangerId(null);
  };

  const handleAdd = (product: (typeof PRODUCTS)[number]) => {
    addToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1400);
  };

  return (
    <section
      id="the-rack"
      className="overflow-hidden border-b border-[#E4D9C8] bg-[#FAF6F0] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header Row: "Every silk, on the rail." matching video 00:12–00:19 */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionRevealHeader
            eyebrow="Curated Loom Selection"
            eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B89246]"
            title={
              <>
                Every silk, <span className="italic text-[#5C0F1C]">on the rail.</span>
              </>
            }
            titleClassName="mt-2 font-editorial text-4xl font-normal text-[#1E1714] sm:text-5xl lg:text-6xl"
            description="Tap any saree hanging along our brass atelier rail to pull it forward, feel its provenance, and add it directly to your bag."
            descriptionClassName="mt-3 max-w-xl text-sm leading-relaxed text-[#4F4037] sm:text-base"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE_EDITORIAL }}
            className="flex items-center gap-4"
          >
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#6E5A4F] tabular-nums">
              {visibleProducts.length} Pieces
            </span>
            <Link
              href="/collections"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#5C0F1C] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#5C0F1C] transition-colors duration-200 hover:bg-[#5C0F1C] hover:text-[#FAF6F0]"
            >
              Browse Full Archive
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={1.6}
              />
            </Link>
          </motion.div>
        </div>

        {/* Interactive Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter sarees by silk or category"
          className="mt-8 flex flex-wrap items-center gap-2 border-b border-[#E4D9C8] pb-5"
        >
          {RACK_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  'relative min-h-[40px] rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] whitespace-nowrap transition-colors duration-200',
                  active
                    ? 'text-[#FAF6F0]'
                    : 'bg-[#F3ECE1] text-[#4F4037] hover:bg-[#E7DDD0] hover:text-[#1E1714]'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="rack-active-tab"
                    transition={{ duration: 0.26, ease: EASE_EDITORIAL }}
                    className="absolute inset-0 rounded-full bg-[#5C0F1C]"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Hanging Silk Garment Rail (Video 00:12–00:19) */}
        <div className="relative mt-10 rounded-2xl border border-[#E4D9C8] bg-gradient-to-b from-[#F5EFE5] via-[#FAF6F0] to-[#F3ECE1] px-4 pb-8 pt-10 sm:px-8">
          {/* Brushed Brass & Teak Horizontal Rail Bar */}
          <div aria-hidden="true" className="relative mx-auto max-w-6xl">
            <div className="h-2.5 w-full rounded-full bg-gradient-to-b from-[#D7B97A] via-[#A98241] to-[#6E5120] shadow-[0_3px_10px_rgba(30,23,20,0.2)]" />
            <div className="absolute -left-2 -top-1 h-4 w-4 rounded-full border border-[#D4B06A] bg-[#5C0F1C]" />
            <div className="absolute -right-2 -top-1 h-4 w-4 rounded-full border border-[#D4B06A] bg-[#5C0F1C]" />
          </div>

          {/* Hanging Sarees Along the Rail */}
          <div className="noolam-scroll -mt-1 flex items-start justify-start gap-4 overflow-x-auto pb-4 pt-1 lg:justify-center lg:gap-6">
            {railPieces.map((product, idx) => {
              const isSelected = activeHangerProduct?.id === product.id;
              const isDimmed = activeHangerProduct !== null && !isSelected;

              return (
                <motion.button
                  key={product.id}
                  type="button"
                  onClick={() =>
                    setSelectedHangerId((prev) =>
                      prev === product.id ? null : product.id
                    )
                  }
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: isDimmed ? 0.42 : 1,
                    scale: isSelected ? 1.05 : isDimmed ? 0.96 : 1,
                    y: isSelected ? 6 : 0,
                  }}
                  whileHover={
                    prefersReduced
                      ? undefined
                      : { rotate: idx % 2 === 0 ? -1.4 : 1.4, y: 4 }
                  }
                  transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                  aria-pressed={isSelected}
                  className={cn(
                    'group relative flex w-[148px] shrink-0 origin-top flex-col items-center text-center transition-[filter] duration-300 sm:w-[168px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C0F1C]',
                    isDimmed && 'blur-[1.5px] hover:blur-0'
                  )}
                >
                  {/* Brass Hook & Carved Wooden Hanger Shoulder */}
                  <div aria-hidden="true" className="flex flex-col items-center">
                    <span className="h-5 w-[3px] rounded-full bg-gradient-to-b from-[#B89246] to-[#6E5120]" />
                    <span className="h-2.5 w-24 rounded-t-full border border-[#B89246]/50 bg-gradient-to-b from-[#6B3B2B] to-[#3B1D14] shadow-sm" />
                  </div>

                  {/* Draped Saree Card Suspended on Hanger */}
                  <div
                    className={cn(
                      'relative -mt-0.5 aspect-[3/4] w-full overflow-hidden rounded-xl border bg-[#EFE6D5] shadow-[0_14px_28px_rgba(30,23,20,0.12)] transition-all duration-300',
                      isSelected
                        ? 'border-[#5C0F1C] ring-2 ring-[#5C0F1C]/25 shadow-[0_22px_44px_rgba(92,15,28,0.22)]'
                        : 'border-[#D8CBB8] group-hover:border-[#B89246]'
                    )}
                  >
                    <BrandImage
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="170px"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1E1714]/82 via-[#1E1714]/35 to-transparent"
                    />
                    <div className="absolute inset-x-2.5 bottom-2.5 text-left text-[#FAF6F0]">
                      <p className="truncate text-[9.5px] uppercase tracking-[0.14em] text-[#D4B06A]">
                        {product.color}
                      </p>
                      <p className="truncate font-editorial text-sm leading-tight">
                        {product.name}
                      </p>
                    </div>
                  </div>

                  <span className="mt-2.5 text-xs font-medium tabular-nums text-[#5C0F1C]">
                    {formatINR(product.price)}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Pulled-Forward Hanger Inspection Bar */}
          <AnimatePresence mode="wait">
            {activeHangerProduct ? (
              <motion.div
                key={activeHangerProduct.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
                className="mx-auto mt-6 flex max-w-4xl flex-col justify-between gap-5 rounded-2xl border border-[#D8CBB8] bg-[#FDFBF7] p-5 shadow-md sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border border-[#E4D9C8]">
                    <BrandImage
                      src={activeHangerProduct.images[0]}
                      alt={activeHangerProduct.name}
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#B89246]">
                      <Sparkles className="h-3 w-3" strokeWidth={1.7} />
                      Off the Rail · {activeHangerProduct.origin}
                    </p>
                    <h3 className="mt-0.5 truncate font-editorial text-2xl text-[#1E1714]">
                      {activeHangerProduct.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#6E5A4F]">
                      {activeHangerProduct.silkType} · {activeHangerProduct.weaveHours} hrs pit-loom craft ·{' '}
                      <span className="font-semibold text-[#5C0F1C] tabular-nums">
                        {formatINR(activeHangerProduct.price)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAdd(activeHangerProduct)}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#5C0F1C] px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#FAF6F0] transition-colors hover:bg-[#480B15]"
                  >
                    {justAddedId === activeHangerProduct.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#D4B06A]" strokeWidth={2} />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.6} />
                        Add to Bag
                      </>
                    )}
                  </motion.button>
                  <Link
                    href={`/products/${activeHangerProduct.slug}`}
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#E4D9C8] bg-[#FAF6F0] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#1E1714] transition-colors hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
                  >
                    Inspect
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedHangerId(null)}
                    aria-label="Return piece to rail"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4D9C8] text-[#6E5A4F] transition-colors hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
                  >
                    <X className="h-4 w-4" strokeWidth={1.6} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <p className="mt-4 text-center text-xs tracking-wide text-[#6E5A4F]">
                Click any saree on the brass rail above to inspect it in close-up, or browse the complete rack below.
              </p>
            )}
          </AnimatePresence>
        </div>

        {/* Complete 4-Column Product Grid ("The Rack") */}
        <motion.div
          key={activeTab}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
