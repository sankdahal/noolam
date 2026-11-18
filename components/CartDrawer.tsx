'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/components/StoreProvider';
import { formatINR } from '@/lib/catalog';
import BrandImage from '@/components/BrandImage';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
  } = useStore();

  const [reservationStep, setReservationStep] = useState<'bag' | 'form' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [referenceCode, setReferenceCode] = useState('');

  const handleClose = () => {
    setCartOpen(false);
    setTimeout(() => {
      if (reservationStep === 'confirmed') {
        setReservationStep('bag');
      }
    }, 300);
  };

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.includes('@') || customerPhone.trim().length < 8) {
      setFormError('Please provide your name, a valid email address, and contact number.');
      return;
    }
    setFormError('');
    const code = `NLM-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(code);
    clearCart();
    setReservationStep('confirmed');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#1E1714]/60"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[#E4D9C8] bg-[#FAF6F0] text-[#1E1714]"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-[#E4D9C8] px-6">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-4 w-4 text-[#5C0F1C]" strokeWidth={1.6} />
                <h2 className="font-editorial text-xl tracking-wide">
                  Your Bag <span className="text-sm text-[#6E5A4F] tabular-nums">({cartCount})</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close shopping bag"
                className="flex h-10 w-10 items-center justify-center text-[#6E5A4F] transition-colors hover:text-[#1E1714]"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {reservationStep === 'confirmed' ? (
                <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                  <CheckCircle2 className="mb-4 h-10 w-10 text-[#5C0F1C]" strokeWidth={1.4} />
                  <p className="text-xs uppercase tracking-[0.18em] text-[#B89246]">
                    Boutique Reservation Logged
                  </p>
                  <h3 className="mt-2 font-editorial text-2xl text-[#1E1714]">
                    Thank you, {customerName}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6E5A4F]">
                    Reference <span className="font-semibold text-[#1E1714] tabular-nums">{referenceCode}</span> has been created as a preview order request. Our Chennai silk concierge will coordinate final payment and insured dispatch.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setReservationStep('bag');
                      handleClose();
                    }}
                    className="mt-8 bg-[#5C0F1C] px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors hover:bg-[#480B15]"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="mb-3 h-8 w-8 text-[#C4B097]" strokeWidth={1.4} />
                  <h3 className="font-editorial text-2xl text-[#1E1714]">Your bag is empty</h3>
                  <p className="mt-2 max-w-xs text-sm text-[#6E5A4F]">
                    Explore handwoven Kanjivarams, Banarasi brocades, and bridal Koorai silks from our looms.
                  </p>
                  <Link
                    href="/collections"
                    onClick={handleClose}
                    className="mt-6 inline-flex items-center gap-2 bg-[#5C0F1C] px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors hover:bg-[#480B15]"
                  >
                    Explore The Rack
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                  </Link>
                </div>
              ) : reservationStep === 'form' ? (
                <form id="reservation-form" onSubmit={handleSubmitReservation} className="space-y-4">
                  <div className="border border-[#E4D9C8] bg-[#F3ECE1] p-4 text-xs leading-relaxed text-[#6E5A4F]">
                    Online payment gateway is not connected in this preview. Submit a boutique reservation request to hold your selected handloom pieces for 48 hours.
                  </div>

                  {formError && (
                    <p className="border border-[#9E1B24]/30 bg-[#9E1B24]/10 px-3 py-2 text-xs text-[#9E1B24]">
                      {formError}
                    </p>
                  )}

                  <div>
                    <label htmlFor="res-name" className="block text-xs uppercase tracking-[0.14em] text-[#6E5A4F]">
                      Full Name
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ananya Krishnan"
                      className="mt-1.5 w-full border border-[#E4D9C8] bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E1714] focus:border-[#5C0F1C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="res-email" className="block text-xs uppercase tracking-[0.14em] text-[#6E5A4F]">
                      Email Address
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="ananya@example.com"
                      className="mt-1.5 w-full border border-[#E4D9C8] bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E1714] focus:border-[#5C0F1C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="res-phone" className="block text-xs uppercase tracking-[0.14em] text-[#6E5A4F]">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 98400 00000"
                      className="mt-1.5 w-full border border-[#E4D9C8] bg-[#FDFBF7] px-3.5 py-2.5 text-sm text-[#1E1714] focus:border-[#5C0F1C] focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setReservationStep('bag')}
                    className="text-xs uppercase tracking-[0.14em] text-[#5C0F1C] underline underline-offset-4"
                  >
                    Return to Bag Summary
                  </button>
                </form>
              ) : (
                <ul className="divide-y divide-[#E4D9C8]">
                  {cart.map((item) => (
                    <li key={`${item.id}-${item.customNote || ''}`} className="flex gap-4 py-4">
                      <div className="relative h-28 w-21 shrink-0 overflow-hidden bg-[#F3ECE1]">
                        <BrandImage
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="84px"
                          className="object-cover object-top"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={item.slug.startsWith('bespoke') ? '/#the-weave' : `/products/${item.slug}`}
                              onClick={handleClose}
                              className="font-editorial text-base leading-snug text-[#1E1714] hover:text-[#5C0F1C]"
                            >
                              {item.name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="text-[#8D7A6E] transition-colors hover:text-[#9E1B24]"
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-[#6E5A4F]">
                            {item.silkType} · {item.color}
                          </p>
                          {item.customNote && (
                            <p className="mt-1 text-xs text-[#5C0F1C]">{item.customNote}</p>
                          )}
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#E4D9C8] bg-[#FDFBF7]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="flex h-8 w-8 items-center justify-center text-[#6E5A4F] hover:text-[#1E1714]"
                            >
                              <Minus className="h-3 w-3" strokeWidth={1.8} />
                            </button>
                            <span className="w-7 text-center text-xs font-medium tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="flex h-8 w-8 items-center justify-center text-[#6E5A4F] hover:text-[#1E1714]"
                            >
                              <Plus className="h-3 w-3" strokeWidth={1.8} />
                            </button>
                          </div>

                          <span className="text-sm font-medium tabular-nums text-[#1E1714]">
                            {formatINR(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && reservationStep !== 'confirmed' && (
              <div className="border-t border-[#E4D9C8] bg-[#F3ECE1] px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-[0.14em] text-[#6E5A4F]">
                    Estimated Subtotal
                  </span>
                  <span className="font-editorial text-2xl tabular-nums text-[#1E1714]">
                    {formatINR(cartSubtotal)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#6E5A4F]">
                  Complimentary insured shipping across India · Silk Mark certified
                </p>

                {reservationStep === 'bag' ? (
                  <button
                    type="button"
                    onClick={() => setReservationStep('form')}
                    className="mt-4 flex w-full items-center justify-center gap-2 bg-[#5C0F1C] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors hover:bg-[#480B15]"
                  >
                    Reserve Sarees at Boutique
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="reservation-form"
                    className="mt-4 flex w-full items-center justify-center gap-2 bg-[#5C0F1C] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors hover:bg-[#480B15]"
                  >
                    Confirm Reservation Request
                  </button>
                )}
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
