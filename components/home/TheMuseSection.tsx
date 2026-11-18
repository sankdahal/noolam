'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';
import BrandImage from '@/components/BrandImage';
import {
  EditorialMaskReveal,
  SectionRevealHeader,
} from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';

export default function TheMuseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const portraitDrift = useTransform(scrollYProgress, [0, 1], [14, -14]);

  return (
    <section
      ref={sectionRef}
      id="the-muse"
      className="border-b border-[#E4D9C8] bg-[#F3ECE1] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Asymmetrical Editorial Left Column: Dominant Portrait */}
          <motion.div
            style={prefersReduced ? undefined : { y: portraitDrift }}
            className="lg:col-span-5"
          >
            <EditorialMaskReveal className="group relative aspect-[3/4] w-full border border-[#D8CBB8] bg-[#FAF6F0]">
              <BrandImage
                src="/images/muse-editorial.jpg"
                alt="Editorial portrait of an Indian woman seated in afternoon light wearing a rosewood wine Kanjivaram silk saree"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-700 ease-out md:group-hover:scale-[1.025]"
              />
            </EditorialMaskReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.55, delay: 0.2, ease: EASE_EDITORIAL }}
              className="mt-3 text-xs tracking-wide text-[#6E5A4F]"
            >
              Nandini Rosewood Kanjivaram <span aria-hidden="true">·</span> Photographed in Mylapore
            </motion.p>
          </motion.div>

          {/* Right Column: Editorial Prose + Supporting Smaller Frames */}
          <div className="lg:col-span-7">
            <div className="max-w-xl">
              <SectionRevealHeader
                eyebrow="The Muse · Editorial Journal"
                eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.18em] text-[#B89246]"
                title={
                  <>
                    Ten silks. Ten muses.{' '}
                    <span className="italic text-[#5C0F1C]">Every thread an offering.</span>
                  </>
                }
                titleClassName="mt-3 font-editorial text-4xl font-normal leading-[1.08] text-[#1E1714] sm:text-5xl"
              />

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.65, delay: 0.16, ease: EASE_EDITORIAL }}
                className="mt-5 text-base leading-relaxed text-[#4F4037]"
              >
                Woven by hand, worn in devotion. Our editorial series celebrates women who drape heritage silk not as costume, but as lived poetry—paired with heirloom temple gold, fresh jasmine, and quiet confidence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.55, delay: 0.24, ease: EASE_EDITORIAL }}
                whileTap={{ scale: 0.98 }}
                className="mt-7 inline-block"
              >
                <Link
                  href="/collections?collection=The+Muse"
                  className="group inline-flex min-h-[44px] items-center gap-2 bg-[#5C0F1C] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors duration-200 hover:bg-[#480B15]"
                >
                  Explore the Editorial
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={1.6}
                  />
                </Link>
              </motion.div>
            </div>

            {/* Two Supporting Asymmetrical Frames */}
            <div className="mt-12 grid grid-cols-2 gap-5 sm:gap-6">
              <Link href="/products/chandrika-ivory-zari-check" className="group block">
                <EditorialMaskReveal
                  delay={0.08}
                  className="relative aspect-[4/5] w-full border border-[#D8CBB8] bg-[#FAF6F0]"
                >
                  <BrandImage
                    src="/images/look-ivory-gold.jpg"
                    alt="Chandrika Ivory Zari Check Kanjivaram editorial portrait"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 ease-out md:group-hover:scale-[1.035]"
                  />
                </EditorialMaskReveal>
                <p className="mt-2.5 font-editorial text-lg text-[#1E1714] transition-colors duration-200 group-hover:text-[#5C0F1C]">
                  Chandrika in Ivory &amp; Gold
                </p>
              </Link>

              <Link
                href="/products/mayura-peacock-teal-kanjivaram"
                className="group mt-6 block sm:mt-10"
              >
                <EditorialMaskReveal
                  delay={0.2}
                  className="relative aspect-[4/5] w-full border border-[#D8CBB8] bg-[#FAF6F0]"
                >
                  <BrandImage
                    src="/images/look-peacock-teal.jpg"
                    alt="Mayura Peacock Teal Kanjivaram editorial portrait"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 ease-out md:group-hover:scale-[1.035]"
                  />
                </EditorialMaskReveal>
                <p className="mt-2.5 font-editorial text-lg text-[#1E1714] transition-colors duration-200 group-hover:text-[#5C0F1C]">
                  Mayura in Monsoon Teal
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
