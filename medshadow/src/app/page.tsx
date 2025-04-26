import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import OpportunitiesSection from '@/components/home/OpportunitiesSection';
import StatsSection from '@/components/home/StatsSection';
import CtaSection from '@/components/home/CtaSection';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <OpportunitiesSection />
      <StatsSection />
      <CtaSection />
    </MainLayout>
  );
}
