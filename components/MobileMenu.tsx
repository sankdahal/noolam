'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, MapPin, Heart, ShoppingBag, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/components/StoreProvider';
import { EASE_EDITORIAL, EASE_MICRO } from '@/lib/motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const {
    cartCount,
    wishlist,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    setStoreModalOpen,
  } = useStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: EASE_MICRO }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1E1714]/65"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.34, ease: EASE_EDITORIAL }}
            className="relative z-10 flex h-full w-full max-w-sm flex-col bg-[#5C0F1C] text-[#FAF6F0]"
          >
            <div className="flex h-16 items-center justify-between border-b border-[#792332] px-5">
              <span className="font-editorial text-2xl tracking-[0.18em] text-[#FAF6F0]">
                NOOLAM
              </span>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9, rotate: 90 }}
                transition={{ duration: 0.18 }}
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex h-11 w-11 items-center justify-center text-[#FAF6F0] transition-colors hover:text-[#D4B06A]"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </motion.button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.045, delayChildren: 0.08 },
                  },
                }}
                className="space-y-1"
              >
                {links.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.32, ease: EASE_EDITORIAL },
                      },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex min-h-[44px] items-center border-b border-[#73202E]/60 py-3 font-editorial text-2xl tracking-wide text-[#FAF6F0] transition-colors duration-200 hover:text-[#D4B06A]"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25, ease: EASE_EDITORIAL }}
                className="mt-6 grid grid-cols-3 gap-2 border-b border-[#73202E]/60 pb-6"
              >
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setSearchOpen(true);
                  }}
                  className="flex min-h-[44px] flex-col items-center justify-center gap-1 border border-[#7D2837] px-2 py-2.5 text-xs uppercase tracking-[0.12em] text-[#F3ECE1] transition-colors hover:bg-[#480B15]"
                >
                  <Search className="h-4 w-4" strokeWidth={1.6} />
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setWishlistOpen(true);
                  }}
                  className="flex min-h-[44px] flex-col items-center justify-center gap-1 border border-[#7D2837] px-2 py-2.5 text-xs uppercase tracking-[0.12em] text-[#F3ECE1] transition-colors hover:bg-[#480B15]"
                >
                  <Heart className="h-4 w-4" strokeWidth={1.6} />
                  Saved ({wishlist.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setCartOpen(true);
                  }}
                  className="flex min-h-[44px] flex-col items-center justify-center gap-1 border border-[#7D2837] px-2 py-2.5 text-xs uppercase tracking-[0.12em] text-[#F3ECE1] transition-colors hover:bg-[#480B15]"
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
                  Bag ({cartCount})
                </button>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.28, ease: EASE_EDITORIAL }}
              className="border-t border-[#792332] p-5"
            >
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setStoreModalOpen(true);
                }}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#FAF6F0] px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#5C0F1C] transition-colors hover:bg-[#D4B06A] hover:text-[#1E1714] active:scale-[0.98]"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.6} />
                Visit the Store
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
