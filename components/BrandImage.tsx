'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fallbackTitle?: string;
}

export default function BrandImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  className,
  fallbackTitle,
}: BrandImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={cn(
          'flex h-full w-full flex-col items-center justify-center bg-[#F3ECE1] p-6 text-center text-[#5C0F1C]',
          className
        )}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="mb-2 h-5 w-5 opacity-60" strokeWidth={1.4} />
        <span className="font-editorial text-sm tracking-wide">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={cn('object-cover', className)}
    />
  );
}
