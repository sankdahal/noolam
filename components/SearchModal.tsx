'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/components/StoreProvider';
import { PRODUCTS, formatINR } from '@/lib/catalog';
import BrandImage from '@/components/BrandImage';

const SUGGESTED_TERMS = ['Kanjivaram', 'Sindoor', 'Koorai', 'Banarasi', 'Bridal', 'Ivory'];

export default function SearchModal() {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const closeModal = () => {
    setQuery('');
    setSearchOpen(false);
  };

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.silkType.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.occasion.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    closeModal();
    router.push(q ? `/collections?q=${encodeURIComponent(q)}` : '/collections');
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Search sarees"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 bg-[#1E1714]/65"
          />

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl border border-[#E4D9C8] bg-[#FAF6F0] p-6 text-[#1E1714] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#E4D9C8] pb-3">
              <form onSubmit={handleSubmit} className="flex flex-1 items-center gap-3">
                <Search className="h-4.5 w-4.5 text-[#5C0F1C]" strokeWidth={1.6} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by silk, weave, colour, or occasion..."
                  className="w-full bg-transparent text-base text-[#1E1714] placeholder:text-[#8D7A6E] focus:outline-none"
                />
              </form>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close search"
                className="flex h-9 w-9 items-center justify-center text-[#6E5A4F] hover:text-[#1E1714]"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                Popular:
              </span>
              {SUGGESTED_TERMS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="border border-[#E4D9C8] bg-[#FDFBF7] px-2.5 py-1 text-xs text-[#1E1714] transition-colors hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-5 max-h-[52vh] overflow-y-auto">
              {results.length === 0 ? (
                <p className="py-8 text-center text-sm text-[#6E5A4F]">
                  No drapes matched &ldquo;{query}&rdquo;. Try Kanjivaram, Koorai, or Banarasi.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {results.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={closeModal}
                      className="flex items-center gap-3.5 border border-[#E4D9C8] bg-[#FDFBF7] p-2.5 transition-colors hover:border-[#5C0F1C]"
                    >
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#F3ECE1]">
                        <BrandImage
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-[#6E5A4F]">
                          {product.silkType}
                        </p>
                        <p className="truncate font-editorial text-base text-[#1E1714]">
                          {product.name}
                        </p>
                        <p className="mt-0.5 text-xs font-medium tabular-nums text-[#5C0F1C]">
                          {formatINR(product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#E4D9C8] pt-4">
              <span className="text-xs text-[#6E5A4F] tabular-nums">
                Showing {Math.min(results.length, 6)} of {results.length} drapes
              </span>
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[#5C0F1C] hover:text-[#B89246]"
              >
                View All Results
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
