'use client';

import React from 'react';
import Link from 'next/link';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/components/StoreProvider';
import { PRODUCTS, formatINR } from '@/lib/catalog';
import BrandImage from '@/components/BrandImage';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    addToCart,
    setCartOpen,
  } = useStore();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Saved Wishlist"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 bg-[#1E1714]/60"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[#E4D9C8] bg-[#FAF6F0] text-[#1E1714]"
          >
            <div className="flex h-16 items-center justify-between border-b border-[#E4D9C8] px-6">
              <div className="flex items-center gap-2.5">
                <Heart className="h-4 w-4 text-[#5C0F1C]" strokeWidth={1.6} />
                <h2 className="font-editorial text-xl tracking-wide">
                  Wishlist{' '}
                  <span className="text-sm text-[#6E5A4F] tabular-nums">
                    ({savedProducts.length})
                  </span>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setWishlistOpen(false)}
                aria-label="Close wishlist"
                className="flex h-10 w-10 items-center justify-center text-[#6E5A4F] transition-colors hover:text-[#1E1714]"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {savedProducts.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <Heart className="mb-3 h-8 w-8 text-[#C4B097]" strokeWidth={1.4} />
                  <h3 className="font-editorial text-2xl text-[#1E1714]">No saved drapes yet</h3>
                  <p className="mt-2 max-w-xs text-sm text-[#6E5A4F]">
                    Tap the heart icon on any saree to curate your personal heirloom shortlist.
                  </p>
                  <Link
                    href="/collections"
                    onClick={() => setWishlistOpen(false)}
                    className="mt-6 bg-[#5C0F1C] px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors hover:bg-[#480B15]"
                  >
                    Browse Sarees
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-[#E4D9C8]">
                  {savedProducts.map((product) => (
                    <li key={product.id} className="flex gap-4 py-4">
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={() => setWishlistOpen(false)}
                        className="relative h-28 w-21 shrink-0 overflow-hidden bg-[#F3ECE1]"
                      >
                        <BrandImage
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="84px"
                          className="object-cover object-top"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/products/${product.slug}`}
                              onClick={() => setWishlistOpen(false)}
                              className="font-editorial text-base leading-snug text-[#1E1714] hover:text-[#5C0F1C]"
                            >
                              {product.name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => toggleWishlist(product.id, product.name)}
                              aria-label={`Remove ${product.name} from wishlist`}
                              className="text-[#8D7A6E] hover:text-[#9E1B24]"
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-[#6E5A4F]">
                            {product.silkType} · {product.color}
                          </p>
                          <p className="mt-1 text-sm font-medium tabular-nums text-[#1E1714]">
                            {formatINR(product.price)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            addToCart(product, 1);
                            setWishlistOpen(false);
                            setCartOpen(true);
                          }}
                          className="mt-3 inline-flex w-fit items-center gap-1.5 border border-[#5C0F1C] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#5C0F1C] transition-colors hover:bg-[#5C0F1C] hover:text-[#FAF6F0]"
                        >
                          <ShoppingBag className="h-3 w-3" strokeWidth={1.6} />
                          Move to Bag
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
