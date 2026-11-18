'use client';

import React from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/components/StoreProvider';

export default function ToastStack() {
  const { toasts, dismissToast } = useStore();

  return (
    <div
      className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col gap-2"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-3 border border-[#792332] bg-[#5C0F1C] px-4 py-3 text-xs tracking-wide text-[#FAF6F0] shadow-lg"
          >
            <Check className="h-3.5 w-3.5 shrink-0 text-[#D4B06A]" strokeWidth={2} />
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="ml-2 text-[#FAF6F0]/70 hover:text-[#FAF6F0]"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.6} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
