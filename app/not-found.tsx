import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center bg-[#FAF6F0] px-5 py-20 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B89246]">
        404 · Archive Entry Unavailable
      </p>
      <h1 className="mt-3 font-editorial text-4xl font-normal text-[#1E1714] sm:text-5xl">
        This drape is no longer on the loom
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#6E5A4F]">
        The piece you requested may have been acquired or archived. Explore our current Kanchipuram and Banarasi silk collections.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 bg-[#5C0F1C] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors hover:bg-[#480B15]"
        >
          Browse The Rack
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center border border-[#E4D9C8] bg-[#FDFBF7] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#1E1714] transition-colors hover:border-[#5C0F1C]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
