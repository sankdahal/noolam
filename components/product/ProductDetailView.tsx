'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  Check,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, formatINR } from '@/lib/catalog';
import { useStore } from '@/components/StoreProvider';
import BrandImage from '@/components/BrandImage';
import WishlistButton from '@/components/WishlistButton';
import ProductCard from '@/components/ProductCard';
import { EASE_EDITORIAL, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const { addToCart, setCartOpen, setStoreModalOpen } = useStore();

  const handleAdd = () => {
    addToCart(product, 1);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <div className="bg-[#FAF6F0]">
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[#6E5A4F]">
          <Link href="/" className="hover:text-[#5C0F1C]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.6} />
          <Link href="/collections" className="hover:text-[#5C0F1C]">
            The Rack
          </Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.6} />
          <Link
            href={`/collections?silk=${encodeURIComponent(product.silkType)}`}
            className="hover:text-[#5C0F1C]"
          >
            {product.silkType}
          </Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.6} />
          <span className="text-[#1E1714]">{product.name}</span>
        </nav>

        {/* Two-Column Luxury Product Module */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* Left: Product Image Gallery */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              {/* Thumbnail Strip */}
              <div className="order-2 flex gap-3 sm:order-1 sm:col-span-2 sm:flex-col">
                {product.images.map((img, index) => {
                  const active = index === activeImageIndex;
                  return (
                    <motion.button
                      key={`${img}-${index}`}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.14, ease: EASE_MICRO }}
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`View photograph ${index + 1} of ${product.name}`}
                      className={cn(
                        'relative aspect-[3/4] w-20 shrink-0 overflow-hidden border bg-[#F3ECE1] transition-opacity duration-200 sm:w-full',
                        active
                          ? 'border-[#5C0F1C] opacity-100'
                          : 'border-[#E4D9C8] opacity-70 hover:opacity-100'
                      )}
                    >
                      <BrandImage
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        sizes="100px"
                        className="object-cover object-top"
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Primary Gallery Frame with Smooth Crossfade */}
              <div className="order-1 relative aspect-[3/4] w-full overflow-hidden border border-[#E4D9C8] bg-[#F3ECE1] sm:order-2 sm:col-span-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.images[activeImageIndex] || product.images[0]}
                    initial={{ opacity: 0.35, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.35 }}
                    transition={{ duration: 0.32, ease: EASE_EDITORIAL }}
                    className="relative h-full w-full"
                  >
                    <BrandImage
                      src={product.images[activeImageIndex] || product.images[0]}
                      alt={`${product.name} — ${product.silkType} in ${product.color}`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover object-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: Sticky Contiguous Purchase Module */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="border border-[#E4D9C8] bg-[#FDFBF7] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#B89246]">
                  {product.silkType} <span aria-hidden="true">·</span> {product.collection}
                </p>
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#5C0F1C]">
                  {product.availability}
                </span>
              </div>

              <h1
                className="mt-2.5 font-editorial text-3xl font-normal leading-tight text-[#1E1714] sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3 border-b border-[#EFE7DA] pb-5 tabular-nums">
                <span className="font-editorial text-3xl text-[#1E1714]">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#8D7A6E] line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-[#6E5A4F]">Inclusive of all taxes</span>
              </div>

              {/* Editorial Description */}
              <p className="mt-5 text-sm leading-relaxed text-[#4F4037] sm:text-base">
                {product.description}
              </p>

              {/* Key Swatch / Shade */}
              <div className="mt-5 flex items-center gap-3 text-sm">
                <span
                  className="h-5 w-5 rounded-full border border-black/20"
                  style={{ backgroundColor: product.colorHex }}
                />
                <span className="text-[#6E5A4F]">Colourway:</span>
                <span className="font-medium text-[#1E1714]">{product.color}</span>
              </div>

              {/* Purchase Controls */}
              <div className="mt-7 flex items-stretch gap-3">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.14, ease: EASE_MICRO }}
                  onClick={handleAdd}
                  className="flex min-h-[48px] flex-1 items-center justify-center gap-2.5 bg-[#5C0F1C] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors duration-200 hover:bg-[#480B15]"
                >
                  {addedFeedback ? (
                    <>
                      <Check className="h-4 w-4 text-[#D4B06A]" strokeWidth={2} />
                      Added to Your Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
                      Add to Bag
                    </>
                  )}
                </motion.button>

                <WishlistButton
                  productId={product.id}
                  productName={product.name}
                  size="md"
                  className="h-12 w-12 border border-[#E4D9C8]"
                />
              </div>

              {addedFeedback && (
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="mt-3 w-full border border-[#5C0F1C] py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#5C0F1C] transition-colors hover:bg-[#5C0F1C] hover:text-[#FAF6F0]"
                >
                  Open Shopping Bag
                </button>
              )}

              <button
                type="button"
                onClick={() => setStoreModalOpen(true)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#5C0F1C] underline underline-offset-4 hover:text-[#B89246]"
              >
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} />
                Request a Private Video or Showroom Viewing
              </button>

              {/* Craftsmanship & Fabric Specifications */}
              <dl className="mt-7 divide-y divide-[#EFE7DA] border-t border-[#E4D9C8] text-sm">
                <div className="py-3">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                    Fabric Purity
                  </dt>
                  <dd className="mt-1 text-[#1E1714]">{product.fabricDetails}</dd>
                </div>
                <div className="py-3">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                    Zari &amp; Motif Craftsmanship
                  </dt>
                  <dd className="mt-1 text-[#1E1714]">{product.zariDetails}</dd>
                </div>
                <div className="py-3">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                    Dimensions &amp; Blouse
                  </dt>
                  <dd className="mt-1 text-[#1E1714]">{product.lengthDetails}</dd>
                </div>
                <div className="py-3">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                    Weaving Provenance
                  </dt>
                  <dd className="mt-1 tabular-nums text-[#1E1714]">
                    {product.origin} · Approx. {product.weaveHours} loom hours
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-[#6E5A4F]">
                    Care &amp; Storage
                  </dt>
                  <dd className="mt-1 text-[#1E1714]">{product.careNote}</dd>
                </div>
              </dl>

              {/* Assurance Strip */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#EFE7DA] pt-5 text-center text-[11px] text-[#6E5A4F]">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-[#5C0F1C]" strokeWidth={1.5} />
                  <span>Silk Mark Certified</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="h-4 w-4 text-[#5C0F1C]" strokeWidth={1.5} />
                  <span>Insured Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="h-4 w-4 text-[#5C0F1C]" strokeWidth={1.5} />
                  <span>Muslin Gift Wrap</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-[#E4D9C8] pt-14">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#6E5A4F]">
                  From Similar Looms
                </p>
                <h2 className="mt-1.5 font-editorial text-3xl text-[#1E1714] sm:text-4xl">
                  Complementary Drapes
                </h2>
              </div>
              <Link
                href="/collections"
                className="text-xs font-medium uppercase tracking-[0.14em] text-[#5C0F1C] hover:text-[#B89246]"
              >
                View All
              </Link>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
              className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
