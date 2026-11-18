import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import CollectionBrowser from '@/components/collections/CollectionBrowser';

export const metadata: Metadata = {
  title: 'Collections — Handwoven Silk Sarees',
  description:
    'Browse authentic Kanjivaram, Banarasi, Koorai Check, and Palace Tissue silk sarees crafted in pure zari.',
};

export default function CollectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1440px] px-5 py-20 text-center text-sm text-[#6E5A4F]">
          Loading silk archive...
        </div>
      }
    >
      <CollectionBrowser />
    </Suspense>
  );
}
