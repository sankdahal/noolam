import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import { MotionConfig } from 'motion/react';
import './globals.css';
import { StoreProvider } from '@/components/StoreProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import SearchModal from '@/components/SearchModal';
import StoreVisitModal from '@/components/StoreVisitModal';
import ToastStack from '@/components/ToastStack';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'NOOLAM — Pure Kanchipuram & Heritage Silk Sarees',
    template: '%s | NOOLAM',
  },
  description:
    'NOOLAM brings the temple looms of Kanchipuram home. Handwoven Kanjivaram, Banarasi, and Koorai silk sarees bordered in pure zari.',
  openGraph: {
    title: 'NOOLAM — Pure Kanchipuram & Heritage Silk Sarees',
    description:
      'Handwoven Kanjivaram, Banarasi, and Koorai silk sarees bordered in pure zari and finished by hand.',
    type: 'website',
    images: ['/images/hero-showroom.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOOLAM — Pure Kanchipuram & Heritage Silk Sarees',
    description:
      'Handwoven Kanjivaram, Banarasi, and Koorai silk sarees bordered in pure zari.',
    images: ['/images/hero-showroom.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#1E1714]" suppressHydrationWarning>
        <MotionConfig reducedMotion="user">
          <StoreProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <WishlistDrawer />
            <SearchModal />
            <StoreVisitModal />
            <ToastStack />
          </StoreProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
