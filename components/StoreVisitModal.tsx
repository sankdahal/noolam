'use client';

import React, { useState } from 'react';
import { X, MapPin, Clock, Phone, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/components/StoreProvider';
import { STORE_LOCATIONS } from '@/lib/catalog';

export default function StoreVisitModal() {
  const { isStoreModalOpen, setStoreModalOpen, notify } = useStore();
  const [selectedAtelier, setSelectedAtelier] = useState(STORE_LOCATIONS[0].city);
  const [occasion, setOccasion] = useState('Bridal Trousseau Consultation');
  const [preferredDate, setPreferredDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setStoreModalOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestContact.trim()) return;
    setSubmitted(true);
    notify('Private viewing request received');
  };

  return (
    <AnimatePresence>
      {isStoreModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Visit NOOLAM Showroom"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#1E1714]/70"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 grid w-full max-w-3xl overflow-hidden border border-[#E4D9C8] bg-[#FAF6F0] text-[#1E1714] shadow-2xl md:grid-cols-12"
          >
            {/* Left Info Panel */}
            <div className="flex flex-col justify-between bg-[#5C0F1C] p-6 text-[#FAF6F0] md:col-span-5 md:p-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#D4B06A]">
                  Private Showroom
                </p>
                <h2 className="mt-2 font-editorial text-3xl leading-tight">
                  Visit the NOOLAM Atelier
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#EFE6D5]/85">
                  Experience pure zari weight, korvai drape, and bespoke colour pairing in person with our silk specialists.
                </p>
              </div>

              <div className="mt-8 space-y-5 border-t border-[#792332] pt-6 text-xs">
                {STORE_LOCATIONS.map((loc) => (
                  <div key={loc.city} className="space-y-1">
                    <p className="font-medium uppercase tracking-[0.12em] text-[#D4B06A]">
                      {loc.city}
                    </p>
                    <p className="flex items-start gap-2 text-[#FAF6F0]/90">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                      {loc.address}
                    </p>
                    <p className="flex items-center gap-2 text-[#FAF6F0]/80">
                      <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                      {loc.hours}
                    </p>
                    <p className="flex items-center gap-2 text-[#FAF6F0]/80">
                      <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                      {loc.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="relative p-6 md:col-span-7 md:p-8">
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close appointment dialog"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-[#6E5A4F] hover:text-[#1E1714]"
              >
                <X className="h-5 w-5" strokeWidth={1.6} />
              </button>

              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="mb-3 h-10 w-10 text-[#5C0F1C]" strokeWidth={1.4} />
                  <p className="text-xs uppercase tracking-[0.16em] text-[#B89246]">
                    Appointment Requested
                  </p>
                  <h3 className="mt-2 font-editorial text-2xl text-[#1E1714]">
                    We look forward to welcoming you
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-[#6E5A4F]">
                    Your viewing request for <span className="font-medium text-[#1E1714]">{selectedAtelier}</span> has been noted. Our stylist will reach out on {guestContact} to confirm your private suite.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 bg-[#5C0F1C] px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0]"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#1E1714]">
                      Book a Private Viewing
                    </h3>
                    <p className="mt-1 text-xs text-[#6E5A4F]">
                      Walk-ins are always welcome; appointments reserve a dedicated bridal suite.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="visit-atelier" className="block text-xs uppercase tracking-[0.14em] text-[#6E5A4F]">
                      Showroom
                    </label>
                    <select
                      id="visit-atelier"
                      value={selectedAtelier}
                      onChange={(e) => setSelectedAtelier(e.target.value)}
                      className="mt-1.5 w-full border border-[#E4D9C8] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#1E1714] focus:border-[#5C0F1C] focus:outline-none"
                    >
                      {STORE_LOCATIONS.map((loc) => (
                        <option key={loc.city} value={loc.city}>
                          {loc.city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="visit-occasion" className="block text-xs uppercase tracking-[0.14em] text-[#6E5A4F]">
                        Occasion
                      </label>
                      <select
                        id="visit-occasion"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="mt-1.5 w-full border border-[#E4D9C8] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#1E1714] focus:border-[#5C0F1C] focus:outline-none"
                      >
                        <option>Bridal Trousseau Consultation</option>
                        <option>Wedding Family Styling</option>
                        <option>Custom Loom Commission</option>
                        <option>General Showroom Visit</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="visit-date" className="block text-xs uppercase tracking-[0.14em] text-[#6E5A4F]">
                        Preferred Date
                      </label>
                      <input
                        id="visit-date"
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="mt-1.5 w-full border border-[#E4D9C8] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#1E1714] focus:border-[#5C0F1C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="visit-name" className="block text-xs uppercase tracking-[0.14em] text-[#6E5A4F]">
                      Your Name
                    </label>
                    <input
                      id="visit-name"
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Meenakshi Sundaram"
                      className="mt-1.5 w-full border border-[#E4D9C8] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#1E1714] focus:border-[#5C0F1C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="visit-contact" className="block text-xs uppercase tracking-[0.14em] text-[#6E5A4F]">
                      Phone or Email
                    </label>
                    <input
                      id="visit-contact"
                      type="text"
                      required
                      value={guestContact}
                      onChange={(e) => setGuestContact(e.target.value)}
                      placeholder="+91 98400 00000"
                      className="mt-1.5 w-full border border-[#E4D9C8] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#1E1714] focus:border-[#5C0F1C] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full bg-[#5C0F1C] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#FAF6F0] transition-colors hover:bg-[#480B15]"
                  >
                    Request Private Appointment
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
