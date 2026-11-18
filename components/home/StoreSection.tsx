'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import { STORE_LOCATIONS } from '@/lib/catalog';
import { useStore } from '@/components/StoreProvider';
import BrandImage from '@/components/BrandImage';
import {
  EditorialMaskReveal,
  SectionRevealHeader,
} from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';

export default function StoreSection() {
  const { setStoreModalOpen } = useStore();

  return (
    <section id="visit-store" className="bg-[#F3ECE1] py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
        {/* Left: Showroom Details */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <SectionRevealHeader
              eyebrow="Showroom Experience"
              eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.18em] text-[#B89246]"
              title={
                <>
                  Step inside the{' '}
                  <span className="italic text-[#5C0F1C]">NOOLAM Atelier.</span>
                </>
              }
              titleClassName="mt-3 font-editorial text-4xl font-normal leading-[1.1] text-[#1E1714] sm:text-5xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.65, delay: 0.14, ease: EASE_EDITORIAL }}
              className="mt-4 text-base leading-relaxed text-[#4F4037]"
            >
              Silk is best chosen in natural daylight and felt between your fingers. Visit our Mylapore flagship or Kanchipuram weaving house for unhurried personal styling and bridal trousseau curations.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.18 } },
              }}
              className="mt-8 space-y-6 border-t border-[#D8CBB8] pt-6"
            >
              {STORE_LOCATIONS.map((loc) => (
                <motion.div
                  key={loc.city}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.55, ease: EASE_EDITORIAL },
                    },
                  }}
                  className="space-y-1.5"
                >
                  <h3 className="font-editorial text-xl text-[#5C0F1C]">{loc.city}</h3>
                  <p className="flex items-start gap-2 text-sm text-[#1E1714]">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B89246]" strokeWidth={1.6} />
                    {loc.address}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-[#6E5A4F]">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-[#B89246]" strokeWidth={1.6} />
                    {loc.hours}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-[#6E5A4F]">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-[#B89246]" strokeWidth={1.6} />
                    {loc.phone}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.55, delay: 0.25, ease: EASE_EDITORIAL }}
            className="mt-8"
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.14, ease: EASE_MICRO }}
              onClick={() => setStoreModalOpen(true)}
              className="group inline-flex min-h-[44px] items-center gap-2.5 bg-[#5C0F1C] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors duration-200 hover:bg-[#480B15]"
            >
              Visit the Store
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={1.6}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Boutique Interior Photograph */}
        <EditorialMaskReveal
          delay={0.1}
          className="group relative aspect-[16/10] w-full border border-[#D8CBB8] bg-[#FAF6F0] lg:col-span-7 lg:aspect-auto lg:min-h-[460px]"
        >
          <BrandImage
            src="/images/hero-showroom.jpg"
            alt="NOOLAM flagship boutique interior in Mylapore, Chennai"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center transition-transform duration-700 ease-out md:group-hover:scale-[1.025]"
          />
        </EditorialMaskReveal>
      </div>
    </section>
  );
}
