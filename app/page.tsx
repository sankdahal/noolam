import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import EditorialIntroSection from '@/components/home/EditorialIntroSection';
import TryTheLookSection from '@/components/home/TryTheLookSection';
import PickASilkSection from '@/components/home/PickASilkSection';
import TheRackSection from '@/components/home/TheRackSection';
import TheMuseSection from '@/components/home/TheMuseSection';
import BridalSection from '@/components/home/BridalSection';
import TheWeaveSection from '@/components/home/TheWeaveSection';
import StoreSection from '@/components/home/StoreSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EditorialIntroSection />
      <TryTheLookSection />
      <PickASilkSection />
      <TheRackSection />
      <TheMuseSection />
      <BridalSection />
      <TheWeaveSection />
      <StoreSection />
    </>
  );
}
