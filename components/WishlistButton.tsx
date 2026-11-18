'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '@/components/StoreProvider';
import { EASE_MICRO } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  productName?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export default function WishlistButton({
  productId,
  productName,
  className,
  size = 'sm',
}: WishlistButtonProps) {
  const { isWishlisted, toggleWishlist } = useStore();
  const active = isWishlisted(productId);

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.16, ease: EASE_MICRO }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId, productName);
      }}
      aria-label={
        active
          ? `Remove ${productName || 'saree'} from wishlist`
          : `Save ${productName || 'saree'} to wishlist`
      }
      aria-pressed={active}
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C0F1C]',
        size === 'sm' ? 'h-9 w-9' : 'h-11 w-11',
        active
          ? 'bg-[#5C0F1C] text-[#FAF6F0]'
          : 'bg-[#FAF6F0]/90 text-[#1E1714] hover:bg-[#5C0F1C] hover:text-[#FAF6F0]',
        className
      )}
    >
      <motion.span
        key={active ? 'saved' : 'unsaved'}
        initial={active ? { scale: 0.75 } : false}
        animate={{ scale: active ? [1, 1.24, 1] : 1 }}
        transition={{ duration: 0.3, ease: EASE_MICRO }}
        className="inline-flex items-center justify-center"
      >
        <Heart
          className={cn(size === 'sm' ? 'h-4 w-4' : 'h-4.5 w-4.5')}
          strokeWidth={1.6}
          fill={active ? 'currentColor' : 'none'}
        />
      </motion.span>
    </motion.button>
  );
}
