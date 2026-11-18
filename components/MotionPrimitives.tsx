'use client';

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_EDITORIAL, EASE_IMAGE, VIEWPORT_ONCE } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface EditorialMaskRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left';
}

/**
 * Architectural silk-veil clip-path reveal + subtle scale settle for editorial imagery.
 * Respects prefers-reduced-motion automatically.
 */
export function EditorialMaskReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: EditorialMaskRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const initialClip =
    direction === 'left'
      ? 'inset(0% 10% 0% 0%)'
      : 'inset(8% 0% 0% 0%)';

  return (
    <motion.div
      initial={{ clipPath: initialClip, opacity: 0.45 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.85, delay, ease: EASE_IMAGE }}
      className={cn('overflow-hidden', className)}
    >
      <motion.div
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 1.0, delay, ease: EASE_IMAGE }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface SectionRevealHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

export function SectionRevealHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  className,
}: SectionRevealHeaderProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={cn(align === 'center' && 'text-center', className)}>
        <p className={eyebrowClassName}>{eyebrow}</p>
        <h2 className={titleClassName}>{title}</h2>
        {description && <p className={descriptionClassName}>{description}</p>}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08 },
        },
      }}
      className={cn(align === 'center' && 'text-center', className)}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: EASE_EDITORIAL },
          },
        }}
        className={cn(
          'inline-flex items-center gap-3',
          align === 'center' && 'justify-center'
        )}
      >
        <span className={eyebrowClassName}>{eyebrow}</span>
        <motion.span
          aria-hidden="true"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: {
              scaleX: 1,
              opacity: 0.65,
              transition: { duration: 0.65, delay: 0.1, ease: EASE_EDITORIAL },
            },
          }}
          className="hidden h-[1px] w-8 origin-left bg-[#B89246] sm:inline-block"
        />
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.72, ease: EASE_EDITORIAL },
            },
          }}
          className={titleClassName}
          style={{ textWrap: 'balance' }}
        >
          {title}
        </motion.h2>
      </div>

      {description && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.65, ease: EASE_EDITORIAL },
            },
          }}
          className={descriptionClassName}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

/**
 * Reusable horizontal mouse-drag scroll hook for desktop lookbook & silk rails.
 * Preserves native touch swipe and click targets accurately.
 */
export function useDragRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!railRef.current) return;
    dragState.current = {
      active: true,
      startX: e.pageX - railRef.current.offsetLeft,
      scrollLeft: railRef.current.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState.current.active || !railRef.current) return;
    const x = e.pageX - railRef.current.offsetLeft;
    const delta = x - dragState.current.startX;
    if (Math.abs(delta) > 5) {
      dragState.current.moved = true;
    }
    if (dragState.current.moved) {
      e.preventDefault();
      railRef.current.scrollLeft = dragState.current.scrollLeft - delta * 1.15;
    }
  };

  const stopDragging = () => {
    dragState.current.active = false;
    setIsDragging(false);
    // Reset moved flag after click phase settles
    setTimeout(() => {
      dragState.current.moved = false;
    }, 60);
  };

  const preventDragClick = (e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const scrollByAmount = (offset: number) => {
    railRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return {
    railRef,
    isDragging,
    onMouseDown,
    onMouseMove,
    stopDragging,
    preventDragClick,
    scrollByAmount,
  };
}
