'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'motion/react';
import {
  ArrowRight,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import BrandImage from '@/components/BrandImage';
import { SectionRevealHeader } from '@/components/MotionPrimitives';
import { EASE_EDITORIAL, EASE_IMAGE, EASE_MICRO, VIEWPORT_ONCE } from '@/lib/motion';
import { cn } from '@/lib/utils';

const DRAPE_FRAMES = [
  {
    src: '/images/muse-editorial.jpg',
    caption: 'Nandini Rosewood Kanjivaram · Mylapore Courtyard',
    slug: 'nandini-rosewood-heirloom',
  },
  {
    src: '/images/editorial-six-moods.jpg',
    caption: 'Kaveri Emerald & Sindoor Korvai · Heritage Veranda',
    slug: 'kaveri-emerald-temple-border',
  },
  {
    src: '/images/look-crimson-temple.jpg',
    caption: 'Sindoor Temple Korvai · Morning Temple Offering',
    slug: 'sindoor-temple-korvai-kanjivaram',
  },
  {
    src: '/images/look-peacock-teal.jpg',
    caption: 'Mayura Monsoon Teal · Dhoop-Chaon Shot Silk',
    slug: 'mayura-peacock-teal-kanjivaram',
  },
];

const MOTION_STORIES = [
  {
    id: 'story-1',
    title: 'Nandini Rosewood Study',
    subtitle: 'Quiet heirloom poise',
    image: '/images/muse-editorial.jpg',
    slug: 'nandini-rosewood-heirloom',
  },
  {
    id: 'story-2',
    title: 'Chandrika Ivory Check',
    subtitle: 'Dawn temple kora silk',
    image: '/images/look-ivory-gold.jpg',
    slug: 'chandrika-ivory-zari-check',
  },
  {
    id: 'story-3',
    title: 'Sindoor Temple Korvai',
    subtitle: 'Three-shuttle ceremonial red',
    image: '/images/look-crimson-temple.jpg',
    slug: 'sindoor-temple-korvai-kanjivaram',
  },
  {
    id: 'story-4',
    title: 'Mayura Peacock Teal',
    subtitle: 'Iridescent twilight weave',
    image: '/images/look-peacock-teal.jpg',
    slug: 'mayura-peacock-teal-kanjivaram',
  },
  {
    id: 'story-5',
    title: 'Rajasi Royal Plum',
    subtitle: 'Copper-gold medallion drape',
    image: '/images/look-royal-plum.jpg',
    slug: 'rajasi-royal-plum-brocade',
  },
];

export default function TheMuseSection() {
  const prefersReduced = useReducedMotion();
  const [drapeIndex, setDrapeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [coverflowIndex, setCoverflowIndex] = useState(2);

  // Automatic gentle crossfade for "Feel the drape" central motion frame
  useEffect(() => {
    if (!isPlaying || prefersReduced) return;
    const id = setInterval(() => {
      setDrapeIndex((prev) => (prev + 1) % DRAPE_FRAMES.length);
    }, 3400);
    return () => clearInterval(id);
  }, [isPlaying, prefersReduced]);

  const activeDrape = DRAPE_FRAMES[drapeIndex];

  return (
    <section
      id="the-muse"
      className="overflow-hidden border-b border-[#E4D9C8] bg-[#F3ECE1] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Part 1: "The Muse" Editorial Strip (matching video 00:20–00:21) */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-[#D8CBB8] pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionRevealHeader
              eyebrow="The Muse · Editorial Journal"
              eyebrowClassName="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B89246]"
              title={
                <>
                  Ten silks. Ten muses.{' '}
                  <span className="italic text-[#5C0F1C]">Every thread an offering.</span>
                </>
              }
              titleClassName="mt-3 font-editorial text-4xl font-normal leading-[1.06] text-[#1E1714] sm:text-5xl lg:text-6xl"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE_EDITORIAL }}
            className="flex flex-col items-start gap-4 lg:col-span-5"
          >
            <p className="text-sm leading-relaxed text-[#4F4037] sm:text-base">
              Woven by hand, worn in devotion. Our editorial series celebrates women who drape heritage silk not as costume, but as lived poetry—paired with heirloom temple gold and fresh jasmine.
            </p>
            <Link
              href="/collections?collection=The+Muse"
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#5C0F1C] transition-colors hover:text-[#B89246]"
            >
              Read the Muse Journal
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={1.7}
              />
            </Link>
          </motion.div>
        </div>

        {/* Part 2: "Feel the drape" Symmetrical 5-Frame Central Motion Showcase (matching video 00:22–00:25) */}
        <div className="mt-16 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#B89246]">
            Editorial Motion Study
          </p>
          <h3 className="mt-2 font-editorial text-3xl font-normal text-[#1E1714] sm:text-5xl">
            Feel the <span className="italic text-[#5C0F1C]">drape.</span>
          </h3>

          <div className="mt-10 grid grid-cols-2 items-center gap-3 sm:gap-4 lg:grid-cols-12">
            {/* Left Flanking Portrait 1 */}
            <Link
              href="/products/chandrika-ivory-zari-check"
              className="group hidden lg:block lg:col-span-2"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#D8CBB8] bg-[#FAF6F0]">
                <BrandImage
                  src="/images/look-ivory-gold.jpg"
                  alt="Chandrika Ivory Zari Check Kanjivaram"
                  fill
                  sizes="180px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </Link>

            {/* Left Flanking Portrait 2 */}
            <Link
              href="/products/rajasi-royal-plum-brocade"
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#D8CBB8] bg-[#FAF6F0] lg:col-span-2"
            >
              <BrandImage
                src="/images/look-royal-plum.jpg"
                alt="Rajasi Royal Plum Kanjivaram"
                fill
                sizes="(max-width: 1024px) 50vw, 180px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </Link>

            {/* Center Wide Living Drape Reel */}
            <div className="col-span-2 lg:col-span-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-[#5C0F1C]/80 bg-[#26090F] shadow-[0_22px_52px_rgba(30,23,20,0.18)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDrape.src}
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.75, ease: EASE_IMAGE }}
                    className="absolute inset-0"
                  >
                    <BrandImage
                      src={activeDrape.src}
                      alt={activeDrape.caption}
                      fill
                      sizes="(max-width: 1024px) 100vw, 440px"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#19060A]/85 via-[#19060A]/35 to-transparent"
                />

                {/* Play/Pause & Progress Controls */}
                <div className="absolute inset-x-4 bottom-3.5 flex items-center justify-between gap-3 text-left text-[#FAF6F0]">
                  <Link
                    href={`/products/${activeDrape.slug}`}
                    className="min-w-0 flex-1 truncate text-xs font-medium tracking-wide text-[#EFE6D5] hover:text-[#D4B06A]"
                  >
                    {activeDrape.caption}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    aria-label={isPlaying ? 'Pause drape reel' : 'Play drape reel'}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-[#19060A]/65 text-[#FAF6F0] backdrop-blur-xs transition-colors hover:border-[#D4B06A] hover:text-[#D4B06A]"
                  >
                    {isPlaying ? (
                      <Pause className="h-3.5 w-3.5" strokeWidth={1.7} />
                    ) : (
                      <Play className="h-3.5 w-3.5 translate-x-[0.5px]" strokeWidth={1.7} />
                    )}
                  </button>
                </div>
              </div>

              {/* Frame Dots */}
              <div className="mt-3 flex items-center justify-center gap-2">
                {DRAPE_FRAMES.map((frame, i) => (
                  <button
                    key={frame.src}
                    type="button"
                    onClick={() => setDrapeIndex(i)}
                    aria-label={`View drape study ${i + 1}`}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      i === drapeIndex ? 'w-7 bg-[#5C0F1C]' : 'w-2 bg-[#C8B9A4] hover:bg-[#8E7C6B]'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Right Flanking Portrait 1 */}
            <Link
              href="/products/mayura-peacock-teal-kanjivaram"
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#D8CBB8] bg-[#FAF6F0] lg:col-span-2"
            >
              <BrandImage
                src="/images/look-peacock-teal.jpg"
                alt="Mayura Peacock Teal Kanjivaram"
                fill
                sizes="(max-width: 1024px) 50vw, 180px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </Link>

            {/* Right Flanking Portrait 2 */}
            <Link
              href="/products/kashi-wine-jangla-banarasi"
              className="group hidden lg:block lg:col-span-2"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#D8CBB8] bg-[#FAF6F0]">
                <BrandImage
                  src="/images/silk-banarasi-brocade.jpg"
                  alt="Kashi Wine Jangla Banarasi Silk"
                  fill
                  sizes="180px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </Link>
          </div>

          <div className="mt-8 flex justify-center">
            <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.14, ease: EASE_MICRO }}>
              <Link
                href="/collections?collection=The+Muse"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#5C0F1C] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors duration-200 hover:bg-[#480B15]"
              >
                Purchase the Collection
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={1.6}
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Part 3: "Silk, in motion." Interactive 3D Coverflow Reel (matching video 00:27–00:32) */}
        <div className="mt-20 border-t border-[#D8CBB8] pt-14">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B89246]">
                3D Editorial Reel
              </p>
              <h3 className="mt-1 font-editorial text-3xl text-[#1E1714] sm:text-4xl">
                Silk, <span className="italic text-[#5C0F1C]">in motion.</span>
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() =>
                  setCoverflowIndex((i) => (i - 1 + MOTION_STORIES.length) % MOTION_STORIES.length)
                }
                aria-label="Previous story card"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CBB8] bg-[#FAF6F0] text-[#1E1714] transition-colors hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setCoverflowIndex((i) => (i + 1) % MOTION_STORIES.length)}
                aria-label="Next story card"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CBB8] bg-[#FAF6F0] text-[#1E1714] transition-colors hover:border-[#5C0F1C] hover:text-[#5C0F1C]"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
              </motion.button>
            </div>
          </div>

          <div
            className="mt-10 flex items-center justify-center gap-3 sm:gap-5"
            style={{ perspective: '1200px' }}
          >
            {MOTION_STORIES.map((story, idx) => {
              const offset = idx - coverflowIndex;
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;

              return (
                <motion.div
                  key={story.id}
                  animate={
                    prefersReduced
                      ? { scale: isCenter ? 1.04 : 0.94, opacity: isCenter ? 1 : 0.72 }
                      : {
                          scale: isCenter ? 1.04 : absOffset === 1 ? 0.88 : 0.76,
                          rotateY: offset * -14,
                          opacity: isCenter ? 1 : absOffset === 1 ? 0.8 : 0.48,
                        }
                  }
                  transition={{ duration: 0.48, ease: EASE_EDITORIAL }}
                  onClick={() => setCoverflowIndex(idx)}
                  className={cn(
                    'relative shrink-0 cursor-pointer overflow-hidden rounded-2xl border bg-[#26090F] transition-shadow duration-300',
                    isCenter
                      ? 'z-20 w-[230px] border-[#5C0F1C] shadow-[0_24px_54px_rgba(30,23,20,0.24)] sm:w-[270px]'
                      : absOffset === 1
                        ? 'z-10 w-[160px] border-[#D8CBB8] sm:w-[205px]'
                        : 'hidden md:block z-0 w-[165px] border-[#D8CBB8]',
                    'aspect-[3/4]'
                  )}
                >
                  <BrandImage
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="270px"
                    className="object-cover object-top"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#19060A]/90 via-[#19060A]/40 to-transparent"
                  />
                  <div className="absolute inset-x-4 bottom-4 text-left text-[#FAF6F0]">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#D4B06A]">
                      {story.subtitle}
                    </p>
                    <h4 className="mt-0.5 font-editorial text-xl leading-tight">
                      {story.title}
                    </h4>
                    {isCenter && (
                      <Link
                        href={`/products/${story.slug}`}
                        className="mt-2 inline-flex items-center gap-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#FAF6F0] underline underline-offset-4 hover:text-[#D4B06A]"
                      >
                        Inspect Weave
                        <ArrowRight className="h-3 w-3" strokeWidth={1.7} />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
