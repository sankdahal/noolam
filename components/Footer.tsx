'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { useStore } from '@/components/StoreProvider';
import { EASE_EDITORIAL, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';

export default function Footer() {
  const { setStoreModalOpen } = useStore();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-[#772030] bg-[#4B0B17] text-[#FAF6F0]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        {/* Top Row: Editorial Brand Statement & Newsletter */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 gap-10 border-b border-[#6C1A29] pb-14 lg:grid-cols-12 lg:items-end"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: EASE_EDITORIAL },
              },
            }}
            className="lg:col-span-6"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4B06A]">
              Kanchipuram · Chennai · Varanasi
            </p>
            <h2 className="mt-3 font-editorial text-3xl leading-tight sm:text-4xl">
              Woven with heritage.{' '}
              <span className="italic text-[#D4B06A]">Draped for today.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#EFE6D5]/80">
              NOOLAM is an independent silk house dedicated to handwoven Kanjivaram, Banarasi, and Koorai heirloom textiles crafted in partnership with master loom clusters.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: EASE_EDITORIAL },
              },
            }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-[#D4B06A]">
              The Loom Letter
            </p>
            <p className="mt-1.5 text-sm text-[#EFE6D5]/85">
              Receive private notes on seasonal loom releases, bridal previews, and trunk shows.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
                className="mt-4 flex items-center gap-2.5 border border-[#8E5B32] bg-[#3B0812] px-4 py-3 text-sm text-[#FAF6F0]"
              >
                <Check className="h-4 w-4 text-[#D4B06A]" strokeWidth={1.8} />
                <span>Thank you. You are subscribed to The Loom Letter.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="mt-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label htmlFor="footer-newsletter" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 border border-[#7A2333] bg-[#3B0812] px-4 py-3 text-sm text-[#FAF6F0] placeholder:text-[#EFE6D5]/45 transition-colors focus:border-[#D4B06A] focus:outline-none"
                  />
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.14, ease: EASE_MICRO }}
                    className="group inline-flex items-center justify-center gap-2 bg-[#FAF6F0] px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#4B0B17] transition-colors duration-200 hover:bg-[#D4B06A] hover:text-[#1E1714]"
                  >
                    Subscribe
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      strokeWidth={1.6}
                    />
                  </motion.button>
                </div>
                {error && <p className="mt-2 text-xs text-[#F2B8B5]">{error}</p>}
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* Middle Columns: Staggered Links & Contact */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-3 lg:grid-cols-12"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE_EDITORIAL },
              },
            }}
            className="col-span-2 sm:col-span-1 lg:col-span-3"
          >
            <span className="font-editorial text-2xl tracking-[0.22em] text-[#FAF6F0]">
              NOOLAM
            </span>
            <p className="mt-4 text-xs leading-relaxed text-[#EFE6D5]/75">
              18 Luz Church Road, Mylapore
              <br />
              Chennai 600004 · Tamil Nadu
              <br />
              Tue – Sun, 10:30 AM – 8:00 PM
            </p>
            <div className="mt-5 flex items-center gap-4 text-xs uppercase tracking-[0.14em] text-[#D4B06A]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-200 hover:text-[#FAF6F0]"
              >
                Instagram
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-200 hover:text-[#FAF6F0]"
              >
                Pinterest
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE_EDITORIAL },
              },
            }}
            className="lg:col-span-3 lg:col-start-5"
          >
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#D4B06A]">
              Shopping
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#EFE6D5]/85">
              <li>
                <Link
                  href="/collections"
                  className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-[#D4B06A]"
                >
                  All Sarees
                </Link>
              </li>
              <li>
                <Link
                  href="/collections?occasion=Bridal"
                  className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-[#D4B06A]"
                >
                  Bridal
                </Link>
              </li>
              <li>
                <Link
                  href="/#pick-a-silk"
                  className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-[#D4B06A]"
                >
                  Silk Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/collections?sort=newest"
                  className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-[#D4B06A]"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE_EDITORIAL },
              },
            }}
            className="lg:col-span-3"
          >
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#D4B06A]">
              Customer Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#EFE6D5]/85">
              <li>
                <button
                  type="button"
                  onClick={() => setStoreModalOpen(true)}
                  className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-[#D4B06A]"
                >
                  Contact &amp; Concierge
                </button>
              </li>
              <li>
                <Link
                  href="/collections#care-shipping"
                  className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-[#D4B06A]"
                >
                  Insured Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/collections#care-shipping"
                  className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-[#D4B06A]"
                >
                  Exchange &amp; Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/#the-weave"
                  className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-[#D4B06A]"
                >
                  Zari &amp; Silk Care FAQs
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE_EDITORIAL },
              },
            }}
            className="lg:col-span-2"
          >
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#D4B06A]">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#EFE6D5]/85">
              <li>
                <Link
                  href="/#editorial-intro"
                  className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-[#D4B06A]"
                >
                  About NOOLAM
                </Link>
              </li>
              <li>
                <Link
                  href="/#the-weave"
                  className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-[#D4B06A]"
                >
                  Our Craft
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setStoreModalOpen(true)}
                  className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-[#D4B06A]"
                >
                  Visit the Store
                </button>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Legal & Payment Bar */}
        <div className="flex flex-col justify-between gap-4 border-t border-[#6C1A29] pt-8 text-xs text-[#EFE6D5]/70 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} NOOLAM Silk House. All rights reserved.</p>
          <p className="tracking-wide">
            Boutique Payments Accepted: UPI · Visa · Mastercard · AmEx · Bank Wire · Silk Mark Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
