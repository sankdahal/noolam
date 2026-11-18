'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Search,
  Menu,
  ChevronDown,
  MapPin,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';
import { useStore } from '@/components/StoreProvider';
import MobileMenu from '@/components/MobileMenu';
import { EASE_EDITORIAL, EASE_MICRO } from '@/lib/motion';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Try the Look', href: '/#try-the-look' },
  { label: 'Pick a Silk', href: '/#pick-a-silk' },
  { label: 'The Rack', href: '/collections', hasMenu: true },
  { label: 'The Muse', href: '/#the-muse' },
  { label: 'Bridal', href: '/collections?occasion=Bridal' },
  { label: 'The Weave', href: '/#the-weave' },
];

const RACK_CATEGORIES = [
  { label: 'All Sarees', href: '/collections', note: 'Complete handloom archive' },
  { label: 'Kanjivaram Pure Silk', href: '/collections?silk=Kanjivaram', note: 'Three-shuttle korvai weaves' },
  { label: 'Koorai Mudra Checks', href: '/collections?silk=Koorai+Check', note: 'Auspicious bridal checks' },
  { label: 'Banarasi Katan', href: '/collections?silk=Banarasi', note: 'Kadhua floral jangla' },
  { label: 'Palace Tissue Zari', href: '/collections?silk=Palace+Tissue', note: 'Spun gold ceremonial shimmer' },
  { label: 'Tailored Silk Blouses', href: '/collections?silk=Silk+Blouse', note: 'Ready-to-wear zari cuffs' },
];

export default function Navbar() {
  const pathname = usePathname();
  const {
    cartCount,
    wishlist,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    setStoreModalOpen,
  } = useStore();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [rackMenuOpen, setRackMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > 24;
    if (next !== scrolled) setScrolled(next);
  });

  const isLinkActive = (href: string, label: string) => {
    if (pathname === '/collections' && (label === 'The Rack' || label === 'Bridal')) {
      return label === 'The Rack';
    }
    if (pathname === '/' && label === 'Home' && !activeHash) return true;
    if (href.includes('#') && activeHash === `#${href.split('#')[1]}`) return true;
    return false;
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full text-[#FAF6F0] transition-[background-color,border-color,box-shadow] duration-300',
          scrolled
            ? 'border-b border-[#D4B06A]/30 bg-[#4E0B17]/97 shadow-[0_6px_24px_rgba(25,6,10,0.22)] backdrop-blur-sm'
            : 'border-b border-[#772030] bg-[#5C0F1C]'
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          {/* Left: Mobile Trigger + Distinctive Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-10 w-10 items-center justify-center text-[#FAF6F0] transition-colors duration-200 hover:text-[#D4B06A] lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </motion.button>

            <Link
              href="/"
              onClick={() => setActiveHash('')}
              className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A]"
            >
              <span className="font-editorial text-2xl font-medium tracking-[0.22em] text-[#FAF6F0] transition-colors duration-200 group-hover:text-[#D4B06A]">
                NOOLAM
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-7"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((item) => {
              const active = isLinkActive(item.href, item.label);
              if (item.hasMenu) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setRackMenuOpen(true)}
                    onMouseLeave={() => setRackMenuOpen(false)}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setActiveHash('')}
                      className={cn(
                        'group relative inline-flex items-center gap-1 py-5 text-[13px] font-medium tracking-[0.04em] whitespace-nowrap shrink-0 transition-colors duration-200',
                        active
                          ? 'text-[#D4B06A]'
                          : 'text-[#FAF6F0]/90 hover:text-[#D4B06A]'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-200',
                          rackMenuOpen && 'rotate-180'
                        )}
                        strokeWidth={1.6}
                      />
                      {active ? (
                        <motion.span
                          layoutId="nav-active-underline"
                          transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
                          className="absolute inset-x-0 bottom-3 h-[1.5px] bg-[#D4B06A]"
                        />
                      ) : (
                        <span className="absolute inset-x-0 bottom-3 h-[1px] origin-left scale-x-0 bg-[#D4B06A]/70 transition-transform duration-200 group-hover:scale-x-100" />
                      )}
                    </Link>

                    <AnimatePresence>
                      {rackMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2, ease: EASE_EDITORIAL }}
                          className="absolute left-0 top-full z-50 w-72 border border-[#E4D9C8] bg-[#FAF6F0] p-4 text-[#1E1714] shadow-xl"
                        >
                          <p className="mb-2.5 border-b border-[#E4D9C8] pb-2 text-[11px] uppercase tracking-[0.16em] text-[#6E5A4F]">
                            Explore The Rack
                          </p>
                          <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={{
                              hidden: {},
                              visible: { transition: { staggerChildren: 0.03 } },
                            }}
                            className="space-y-1"
                          >
                            {RACK_CATEGORIES.map((cat) => (
                              <motion.li
                                key={cat.label}
                                variants={{
                                  hidden: { opacity: 0, x: -4 },
                                  visible: {
                                    opacity: 1,
                                    x: 0,
                                    transition: { duration: 0.2, ease: EASE_MICRO },
                                  },
                                }}
                              >
                                <Link
                                  href={cat.href}
                                  onClick={() => setRackMenuOpen(false)}
                                  className="group/item block px-2.5 py-2 transition-colors duration-150 hover:bg-[#F3ECE1]"
                                >
                                  <span className="block text-sm font-medium text-[#1E1714] transition-transform duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-[#5C0F1C]">
                                    {cat.label}
                                  </span>
                                  <span className="block text-xs text-[#6E5A4F]">
                                    {cat.note}
                                  </span>
                                </Link>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    if (item.href.includes('#')) {
                      setActiveHash(`#${item.href.split('#')[1]}`);
                    } else {
                      setActiveHash('');
                    }
                  }}
                  className={cn(
                    'group relative py-5 text-[13px] font-medium tracking-[0.04em] whitespace-nowrap shrink-0 transition-colors duration-200',
                    active
                      ? 'text-[#D4B06A]'
                      : 'text-[#FAF6F0]/90 hover:text-[#D4B06A]'
                  )}
                >
                  {item.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
                      className="absolute inset-x-0 bottom-3 h-[1.5px] bg-[#D4B06A]"
                    />
                  ) : (
                    <span className="absolute inset-x-0 bottom-3 h-[1px] origin-left scale-x-0 bg-[#D4B06A]/70 transition-transform duration-200 group-hover:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Utility Icons + Primary Store CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.16, ease: EASE_MICRO }}
              onClick={() => setSearchOpen(true)}
              aria-label="Search sarees"
              className="flex h-10 w-10 items-center justify-center text-[#FAF6F0]/90 transition-colors duration-200 hover:text-[#D4B06A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A]"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.16, ease: EASE_MICRO }}
              onClick={() => setWishlistOpen(true)}
              aria-label={`Open wishlist (${wishlist.length} saved)`}
              className="relative flex h-10 w-10 items-center justify-center text-[#FAF6F0]/90 transition-colors duration-200 hover:text-[#D4B06A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A]"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.6} />
              <AnimatePresence mode="popLayout">
                {wishlist.length > 0 && (
                  <motion.span
                    key={wishlist.length}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE_EDITORIAL }}
                    className="absolute right-1 top-1.5 flex h-4 min-w-[16px] items-center justify-center bg-[#D4B06A] px-1 text-[10px] font-semibold tabular-nums text-[#1E1714]"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.16, ease: EASE_MICRO }}
              onClick={() => setCartOpen(true)}
              aria-label={`Open shopping bag (${cartCount} items)`}
              className="relative flex h-10 w-10 items-center justify-center text-[#FAF6F0]/90 transition-colors duration-200 hover:text-[#D4B06A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A]"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
              <AnimatePresence mode="popLayout">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE_EDITORIAL }}
                    className="absolute right-1 top-1.5 flex h-4 min-w-[16px] items-center justify-center bg-[#FAF6F0] px-1 text-[10px] font-semibold tabular-nums text-[#5C0F1C]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: EASE_MICRO }}
              onClick={() => setStoreModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 border border-[#D4B06A]/60 bg-[#FAF6F0] px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#5C0F1C] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#D4B06A] hover:text-[#1E1714] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A]"
            >
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} />
              Visit the Store
            </motion.button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
