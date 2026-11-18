'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BRIDAL_SHOWCASE } from '@/lib/catalog';
import BrandImage from '@/components/BrandImage';
import { SectionRevealHeader } from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, EASE_IMAGE, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';

export default function BridalSection() {
  return (
    <section
      id="bridal"
      className="border-b border-[#6C1A29] bg-[#3D0811] py-16 text-[#FAF6F0] sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Centered Editorial Header */}
        <SectionRevealHeader
          align="center"
          className="mx-auto max-w-2xl"
          eyebrow="Muhurtham · Sangeet · Reception"
          eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4B06A]"
          title="The Bridal Collection"
          titleClassName="mt-3 font-editorial text-4xl font-normal leading-tight text-[#FAF6F0] sm:text-5xl lg:text-6xl"
          description="Celebratory wedding silks woven with pure 2G silver-gold zari, auspicious temple motifs, and heirloom weight destined to cross generations."
          descriptionClassName="mt-4 text-sm leading-relaxed text-[#EFE6D5]/85 sm:text-base"
        />

        {/* Arched Mandap Gallery Showcase */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
          }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BRIDAL_SHOWCASE.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.72, ease: EASE_EDITORIAL },
                },
              }}
            >
              <Link
                href={`/products/${item.slug}`}
                className="group block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B06A]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-full border border-[#D4B06A]/40 bg-[#2A050B] p-1.5 transition-colors duration-300 group-hover:border-[#D4B06A]">
                  <motion.div
                    initial={{ scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{ duration: 0.9, ease: EASE_IMAGE }}
                    className="relative h-full w-full overflow-hidden rounded-t-full"
                  >
                    <BrandImage
                      src={item.image}
                      alt={`${item.title} — ${item.subtitle}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-600 ease-out md:group-hover:scale-[1.045]"
                    />
                  </motion.div>
                </div>
                <h3 className="mt-4 font-editorial text-2xl text-[#FAF6F0] transition-colors duration-200 group-hover:text-[#D4B06A]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#EFE6D5]/70">
                  {item.subtitle}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bridal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE_EDITORIAL }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.14, ease: EASE_MICRO }}
          >
            <Link
              href="/collections?occasion=Bridal"
              className="group inline-flex min-h-[44px] items-center gap-2.5 bg-[#FAF6F0] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-[#5C0F1C] transition-colors duration-200 hover:bg-[#D4B06A] hover:text-[#1E1714]"
            >
              Explore Bridal Sarees
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={1.6}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
