'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '@/lib/catalog';
import ProductCard from '@/components/ProductCard';
import { SectionRevealHeader } from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, VIEWPORT_ONCE } from '@/lib/motion';
import { cn } from '@/lib/utils';

const RACK_TABS = [
  { id: 'all', label: 'All Pieces' },
  { id: 'Kanjivaram', label: 'Kanjivaram' },
  { id: 'Koorai Check', label: 'Koorai Check' },
  { id: 'Banarasi', label: 'Banarasi' },
  { id: 'Bridal', label: 'Bridal' },
  { id: 'Silk Blouse', label: 'Blouses' },
];

export default function TheRackSection() {
  const [activeTab, setActiveTab] = useState('all');

  const visibleProducts = useMemo(() => {
    if (activeTab === 'all') return PRODUCTS.slice(0, 8);
    if (activeTab === 'Bridal') {
      return PRODUCTS.filter((p) => p.occasion === 'Bridal').slice(0, 8);
    }
    return PRODUCTS.filter((p) => p.silkType === activeTab).slice(0, 8);
  }, [activeTab]);

  return (
    <section
      id="the-rack"
      className="border-b border-[#E4D9C8] bg-[#FAF6F0] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header Row */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionRevealHeader
            eyebrow="Curated Loom Selection"
            eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6E5A4F]"
            title="The Rack"
            titleClassName="mt-2 font-editorial text-4xl font-normal text-[#1E1714] sm:text-5xl"
            description="Hand-selected pieces off our Kanchipuram and Varanasi looms, ready for immediate dispatch or private boutique viewing."
            descriptionClassName="mt-3 max-w-xl text-sm leading-relaxed text-[#4F4037] sm:text-base"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE_EDITORIAL }}
          >
            <Link
              href="/collections"
              className="group inline-flex w-fit items-center gap-2 border border-[#5C0F1C] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#5C0F1C] transition-colors duration-200 hover:bg-[#5C0F1C] hover:text-[#FAF6F0]"
            >
              Browse Full Collection
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={1.6}
              />
            </Link>
          </motion.div>
        </div>

        {/* Interactive Filter Tabs with Shared Sliding Indicator */}
        <div
          role="tablist"
          aria-label="Filter sarees by silk or category"
          className="mt-8 flex flex-wrap items-center gap-2 border-b border-[#E4D9C8] pb-4"
        >
          {RACK_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative min-h-[40px] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] whitespace-nowrap transition-colors duration-200',
                  active
                    ? 'text-[#FAF6F0]'
                    : 'bg-[#F3ECE1] text-[#4F4037] hover:bg-[#E7DDD0] hover:text-[#1E1714]'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="rack-active-tab"
                    transition={{ duration: 0.26, ease: EASE_EDITORIAL }}
                    className="absolute inset-0 bg-[#5C0F1C]"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Staggered Product Grid */}
        <motion.div
          key={activeTab}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
