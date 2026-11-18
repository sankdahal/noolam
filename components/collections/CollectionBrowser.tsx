'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, X, RotateCcw, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, SilkType, OccasionType } from '@/lib/catalog';
import ProductCard from '@/components/ProductCard';
import BrandImage from '@/components/BrandImage';
import { cn } from '@/lib/utils';

const SILK_OPTIONS: SilkType[] = [
  'Kanjivaram',
  'Banarasi',
  'Koorai Check',
  'Palace Tissue',
  'Tussar Silk',
  'Silk Blouse',
];

const OCCASION_OPTIONS: OccasionType[] = [
  'Bridal',
  'Wedding',
  'Reception',
  'Festive',
  'Temple',
  'Tailored',
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-35k', label: 'Under ₹35,000', min: 0, max: 35000 },
  { id: '35k-50k', label: '₹35,000 – ₹50,000', min: 35000, max: 50000 },
  { id: 'above-50k', label: 'Above ₹50,000', min: 50000, max: Infinity },
];

const COLLECTION_OPTIONS = [
  'Temple Heritage',
  'Six Moods',
  'The Muse',
  'Bridal Archive',
  'Daylight Looms',
  'Tailored Pairings',
];

interface FilterSidebarContentProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedSilk: string;
  onSilkChange: (val: string) => void;
  selectedOccasion: string;
  onOccasionChange: (val: string) => void;
  priceRangeId: string;
  onPriceRangeChange: (val: string) => void;
  selectedColor: string;
  onColorChange: (val: string) => void;
  uniqueColors: string[];
  selectedCollection: string;
  onCollectionChange: (val: string) => void;
  hasActiveFilters: boolean;
  onResetAll: () => void;
}

function FilterSidebarContent({
  searchQuery,
  onSearchChange,
  selectedSilk,
  onSilkChange,
  selectedOccasion,
  onOccasionChange,
  priceRangeId,
  onPriceRangeChange,
  selectedColor,
  onColorChange,
  uniqueColors,
  selectedCollection,
  onCollectionChange,
  hasActiveFilters,
  onResetAll,
}: FilterSidebarContentProps) {
  return (
    <div className="space-y-7">
      <div>
        <label
          htmlFor="collection-search"
          className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#6E5A4F]"
        >
          Keyword Search
        </label>
        <div className="relative mt-2">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6E5A4F]"
            strokeWidth={1.6}
          />
          <input
            id="collection-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Zari, crimson, korvai..."
            className="w-full border border-[#E4D9C8] bg-[#FDFBF7] py-2 pl-9 pr-3 text-sm text-[#1E1714] placeholder:text-[#8D7A6E] focus:border-[#5C0F1C] focus:outline-none"
          />
        </div>
      </div>

      <div className="border-t border-[#E4D9C8] pt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#6E5A4F]">
          Silk Variety
        </p>
        <div className="mt-3 space-y-1.5">
          <button
            type="button"
            onClick={() => onSilkChange('all')}
            className={cn(
              'block w-full py-1 text-left text-sm transition-colors',
              selectedSilk === 'all'
                ? 'font-semibold text-[#5C0F1C]'
                : 'text-[#4F4037] hover:text-[#1E1714]'
            )}
          >
            All Silks
          </button>
          {SILK_OPTIONS.map((silk) => (
            <button
              key={silk}
              type="button"
              onClick={() => onSilkChange(silk)}
              className={cn(
                'block w-full py-1 text-left text-sm transition-colors',
                selectedSilk === silk
                  ? 'font-semibold text-[#5C0F1C]'
                  : 'text-[#4F4037] hover:text-[#1E1714]'
              )}
            >
              {silk}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E4D9C8] pt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#6E5A4F]">
          Occasion
        </p>
        <div className="mt-3 space-y-1.5">
          <button
            type="button"
            onClick={() => onOccasionChange('all')}
            className={cn(
              'block w-full py-1 text-left text-sm transition-colors',
              selectedOccasion === 'all'
                ? 'font-semibold text-[#5C0F1C]'
                : 'text-[#4F4037] hover:text-[#1E1714]'
            )}
          >
            All Occasions
          </button>
          {OCCASION_OPTIONS.map((occ) => (
            <button
              key={occ}
              type="button"
              onClick={() => onOccasionChange(occ)}
              className={cn(
                'block w-full py-1 text-left text-sm transition-colors',
                selectedOccasion === occ
                  ? 'font-semibold text-[#5C0F1C]'
                  : 'text-[#4F4037] hover:text-[#1E1714]'
              )}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E4D9C8] pt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#6E5A4F]">
          Price Range
        </p>
        <div className="mt-3 space-y-1.5">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              type="button"
              onClick={() => onPriceRangeChange(range.id)}
              className={cn(
                'block w-full py-1 text-left text-sm tabular-nums transition-colors',
                priceRangeId === range.id
                  ? 'font-semibold text-[#5C0F1C]'
                  : 'text-[#4F4037] hover:text-[#1E1714]'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E4D9C8] pt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#6E5A4F]">
          Colour Palette
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => onColorChange('all')}
            className={cn(
              'border px-2.5 py-1 text-xs transition-colors',
              selectedColor === 'all'
                ? 'border-[#5C0F1C] bg-[#5C0F1C] text-[#FAF6F0]'
                : 'border-[#E4D9C8] bg-[#FDFBF7] text-[#4F4037] hover:border-[#5C0F1C]'
            )}
          >
            All
          </button>
          {uniqueColors.map((col) => (
            <button
              key={col}
              type="button"
              onClick={() => onColorChange(col)}
              className={cn(
                'border px-2.5 py-1 text-xs transition-colors',
                selectedColor === col
                  ? 'border-[#5C0F1C] bg-[#5C0F1C] text-[#FAF6F0]'
                  : 'border-[#E4D9C8] bg-[#FDFBF7] text-[#4F4037] hover:border-[#5C0F1C]'
              )}
            >
              {col}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E4D9C8] pt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#6E5A4F]">
          Curated Edit
        </p>
        <div className="mt-3 space-y-1.5">
          <button
            type="button"
            onClick={() => onCollectionChange('all')}
            className={cn(
              'block w-full py-1 text-left text-sm transition-colors',
              selectedCollection === 'all'
                ? 'font-semibold text-[#5C0F1C]'
                : 'text-[#4F4037] hover:text-[#1E1714]'
            )}
          >
            All Collections
          </button>
          {COLLECTION_OPTIONS.map((col) => (
            <button
              key={col}
              type="button"
              onClick={() => onCollectionChange(col)}
              className={cn(
                'block w-full py-1 text-left text-sm transition-colors',
                selectedCollection === col
                  ? 'font-semibold text-[#5C0F1C]'
                  : 'text-[#4F4037] hover:text-[#1E1714]'
              )}
            >
              {col}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onResetAll}
          className="inline-flex w-full items-center justify-center gap-2 border border-[#5C0F1C] py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#5C0F1C] transition-colors hover:bg-[#5C0F1C] hover:text-[#FAF6F0]"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.6} />
          Clear All Filters
        </button>
      )}
    </div>
  );
}

export default function CollectionBrowser() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedSilk = searchParams.get('silk') || 'all';
  const selectedOccasion = searchParams.get('occasion') || 'all';
  const selectedCollection = searchParams.get('collection') || 'all';
  const sortBy = searchParams.get('sort') || 'featured';
  const urlQuery = searchParams.get('q') || '';

  const [localQuery, setLocalQuery] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [priceRangeId, setPriceRangeId] = useState<string>('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const searchQuery = localQuery !== null ? localQuery : urlQuery;

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all' || value === '' || (key === 'sort' && value === 'featured')) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const qs = params.toString();
    router.replace(qs ? `/collections?${qs}` : '/collections', { scroll: false });
  };

  const uniqueColors = useMemo(
    () => Array.from(new Set(PRODUCTS.map((p) => p.color))),
    []
  );

  const filteredProducts = useMemo(() => {
    const activePriceRange =
      PRICE_RANGES.find((r) => r.id === priceRangeId) || PRICE_RANGES[0];
    const q = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((p) => {
      if (selectedSilk !== 'all' && p.silkType !== selectedSilk) return false;
      if (selectedOccasion !== 'all' && p.occasion !== selectedOccasion) return false;
      if (selectedCollection !== 'all' && p.collection !== selectedCollection)
        return false;
      if (selectedColor !== 'all' && p.color !== selectedColor) return false;
      if (p.price < activePriceRange.min || p.price > activePriceRange.max)
        return false;
      if (
        q &&
        !(
          p.name.toLowerCase().includes(q) ||
          p.silkType.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.occasion.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q)
        )
      ) {
        return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === 'newest') {
      sorted.sort((a, b) => Number(Boolean(b.isNewArrival)) - Number(Boolean(a.isNewArrival)));
    }
    return sorted;
  }, [
    selectedSilk,
    selectedOccasion,
    selectedCollection,
    selectedColor,
    priceRangeId,
    sortBy,
    searchQuery,
  ]);

  const resetAllFilters = () => {
    setLocalQuery(null);
    setSelectedColor('all');
    setPriceRangeId('all');
    router.replace('/collections', { scroll: false });
  };

  const hasActiveFilters =
    selectedSilk !== 'all' ||
    selectedOccasion !== 'all' ||
    selectedCollection !== 'all' ||
    selectedColor !== 'all' ||
    priceRangeId !== 'all' ||
    searchQuery.trim() !== '';

  const bannerTitle =
    selectedOccasion === 'Bridal'
      ? 'The Bridal Collection'
      : selectedSilk !== 'all'
      ? `${selectedSilk} Silks`
      : selectedCollection !== 'all'
      ? selectedCollection
      : 'The Silk Archive';

  const bannerSubtitle =
    selectedOccasion === 'Bridal'
      ? 'Heirloom Muhurtham pattu, Koorai checks, and pure 2G zari reception drapes loomed for celebratory permanence.'
      : 'Every saree in the NOOLAM archive is handwoven in small runs across Kanchipuram, Varanasi, and Tamil Nadu weaving guilds.';

  const filterProps: FilterSidebarContentProps = {
    searchQuery,
    onSearchChange: (val) => setLocalQuery(val),
    selectedSilk,
    onSilkChange: (val) => updateParam('silk', val),
    selectedOccasion,
    onOccasionChange: (val) => updateParam('occasion', val),
    priceRangeId,
    onPriceRangeChange: setPriceRangeId,
    selectedColor,
    onColorChange: setSelectedColor,
    uniqueColors,
    selectedCollection,
    onCollectionChange: (val) => updateParam('collection', val),
    hasActiveFilters,
    onResetAll: resetAllFilters,
  };

  return (
    <div className="bg-[#FAF6F0]">
      <section className="relative overflow-hidden border-b border-[#E4D9C8] bg-[#3D0811] text-[#FAF6F0]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center lg:grid-cols-12">
          <div className="px-5 py-12 sm:px-8 lg:col-span-7 lg:px-12 lg:py-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D4B06A]">
              NOOLAM Handloom Archive
            </p>
            <h1 className="mt-2 font-editorial text-4xl font-normal leading-tight sm:text-5xl">
              {bannerTitle}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#EFE6D5]/85 sm:text-base">
              {bannerSubtitle}
            </p>
          </div>

          <div className="relative h-56 w-full overflow-hidden lg:col-span-5 lg:h-72">
            <BrandImage
              src={
                selectedOccasion === 'Bridal'
                  ? '/images/bridal-sindoor.jpg'
                  : '/images/editorial-six-moods.jpg'
              }
              alt={bannerTitle}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#3D0811] via-[#3D0811]/30 to-transparent"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4D9C8] pb-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex min-h-[40px] items-center gap-2 border border-[#E4D9C8] bg-[#FDFBF7] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#1E1714] lg:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.6} />
              Filters
            </button>
            <p className="text-sm text-[#6E5A4F] tabular-nums">
              Showing <span className="font-medium text-[#1E1714]">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'saree' : 'sarees'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort-select"
              className="text-xs uppercase tracking-[0.14em] text-[#6E5A4F]"
            >
              Sort
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="min-h-[40px] border border-[#E4D9C8] bg-[#FDFBF7] px-3 py-2 text-sm text-[#1E1714] focus:border-[#5C0F1C] focus:outline-none"
            >
              <option value="featured">Curated Order</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <FilterSidebarContent {...filterProps} />
          </aside>

          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="border border-[#E4D9C8] bg-[#FDFBF7] px-6 py-16 text-center">
                <h2 className="font-editorial text-2xl text-[#1E1714]">
                  No sarees match these filters
                </h2>
                <p className="mt-2 text-sm text-[#6E5A4F]">
                  Try clearing one or more filter attributes to view the full handloom rack.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="mt-6 bg-[#5C0F1C] px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors hover:bg-[#480B15]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <motion.div
                key={`${selectedSilk}-${selectedOccasion}-${selectedCollection}-${selectedColor}-${priceRangeId}-${sortBy}-${searchQuery}`}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.045 } },
                }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </div>
        </div>

        <section
          id="care-shipping"
          className="mt-16 grid grid-cols-1 gap-6 border-t border-[#E4D9C8] pt-12 md:grid-cols-3"
        >
          <div className="border border-[#E4D9C8] bg-[#FDFBF7] p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#B89246]">
              Complimentary Insured Dispatch
            </p>
            <h3 className="mt-2 font-editorial text-xl text-[#1E1714]">
              Protected Transit Across India &amp; Worldwide
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6E5A4F]">
              Every saree is wrapped in unbleached organic muslin and dispatched in moisture-sealed archival boxes within 48 hours.
            </p>
          </div>
          <div className="border border-[#E4D9C8] bg-[#FDFBF7] p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#B89246]">
              Silk Mark &amp; Zari Guarantee
            </p>
            <h3 className="mt-2 font-editorial text-xl text-[#1E1714]">
              Certified Pure Mulberry Silk
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6E5A4F]">
              Each pure zari Kanjivaram carries Silk Mark India authentication and loom provenance documentation from the weaving guild.
            </p>
          </div>
          <div className="border border-[#E4D9C8] bg-[#FDFBF7] p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#B89246]">
              14-Day Boutique Exchange
            </p>
            <h3 className="mt-2 font-editorial text-xl text-[#1E1714]">
              Unhurried Consideration
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6E5A4F]">
              Unworn sarees with intact loom tags may be exchanged within 14 days at our Chennai atelier or via insured return pickup.
            </p>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <div
            className="fixed inset-0 z-50 flex lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Collection filters"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-[#1E1714]/60"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex h-full w-full max-w-xs flex-col overflow-y-auto bg-[#FAF6F0] p-6"
            >
              <div className="mb-6 flex items-center justify-between border-b border-[#E4D9C8] pb-3">
                <h2 className="font-editorial text-2xl text-[#1E1714]">Refine Archive</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="flex h-10 w-10 items-center justify-center text-[#6E5A4F]"
                >
                  <X className="h-5 w-5" strokeWidth={1.6} />
                </button>
              </div>
              <FilterSidebarContent {...filterProps} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
