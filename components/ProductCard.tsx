'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, formatINR } from '@/lib/catalog';
import { useStore } from '@/components/StoreProvider';
import BrandImage from '@/components/BrandImage';
import WishlistButton from '@/components/WishlistButton';
import { EASE_EDITORIAL, EASE_MICRO } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const secondaryImage = product.images[1];

  const handleQuickAdd = () => {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.62, ease: EASE_EDITORIAL },
        },
      }}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-[#E4D9C8] bg-[#FDFBF7] transition-colors duration-300 hover:border-[#B89246]',
        className
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3ECE1]">
        <Link
          href={`/products/${product.slug}`}
          className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C0F1C]"
          aria-label={`View ${product.name}`}
        >
          {/* Primary Image */}
          <BrandImage
            src={product.images[0]}
            alt={`${product.name} — ${product.silkType} in ${product.color}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              'object-cover object-top transition-all duration-500 ease-out md:group-hover:scale-[1.035]',
              secondaryImage && 'md:group-hover:opacity-0'
            )}
            fallbackTitle={product.name}
          />

          {/* Secondary Image Crossfade on Desktop Hover */}
          {secondaryImage && (
            <BrandImage
              src={secondaryImage}
              alt={`${product.name} alternate weave detail`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="hidden object-cover object-top opacity-0 transition-all duration-500 ease-out md:block md:group-hover:scale-[1.035] md:group-hover:opacity-100"
              fallbackTitle={product.name}
            />
          )}
        </Link>

        {/* Wishlist control */}
        <div className="absolute right-3 top-3 z-10">
          <WishlistButton productId={product.id} productName={product.name} />
        </div>

        {/* Subtle availability text tag */}
        {product.availability !== 'In Stock' && (
          <span className="pointer-events-none absolute left-3 top-3 bg-[#1E1714]/80 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[#FAF6F0]">
            {product.availability}
          </span>
        )}

        {/* Secondary hover overlay with quick-add & weave detail (desktop hover / focus) */}
        <div className="pointer-events-none hidden md:flex absolute inset-x-0 bottom-0 translate-y-2 flex-col gap-2 bg-gradient-to-t from-[#1E1714]/88 via-[#1E1714]/55 to-transparent px-4 pb-3.5 pt-10 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100">
          <p className="line-clamp-1 text-[11px] tracking-wide text-[#EFE6D5]">
            {product.origin} · {product.weaveHours} hrs loom craft
          </p>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.14, ease: EASE_MICRO }}
            onClick={handleQuickAdd}
            className="inline-flex w-full items-center justify-center gap-2 bg-[#FAF6F0] px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#1E1714] transition-colors duration-200 hover:bg-[#5C0F1C] hover:text-[#FAF6F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A]"
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#5C0F1C] group-hover:text-current" strokeWidth={2} />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.6} />
                Add to Bag
              </>
            )}
          </motion.button>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#6E5A4F]">
            {product.silkType} <span aria-hidden="true">·</span> {product.color}
          </p>
          <h3 className="mt-1.5 font-editorial text-lg leading-snug text-[#1E1714]">
            <Link
              href={`/products/${product.slug}`}
              className="transition-colors duration-200 hover:text-[#5C0F1C]"
            >
              {product.name}
            </Link>
          </h3>
        </div>

        <div className="mt-3 flex items-baseline justify-between border-t border-[#EFE7DA] pt-3">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-[15px] font-medium text-[#1E1714]">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8D7A6E] line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="text-xs font-medium uppercase tracking-[0.12em] text-[#5C0F1C] md:hidden"
            >
              {justAdded ? 'Added' : 'Add'}
            </button>
            <Link
              href={`/products/${product.slug}`}
              className="group/inspect inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.12em] text-[#5C0F1C] transition-colors duration-200 hover:text-[#B89246]"
            >
              <span>Inspect</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
