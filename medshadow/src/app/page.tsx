import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import client components
const MainLayout = dynamic(() => import('@/components/layout/MainLayout'), { ssr: true });
const HeroSection = dynamic(() => import('@/components/home/HeroSection'), { ssr: true });
const FeatureSection = dynamic(() => import('@/components/home/FeatureSection'), { ssr: true });
const TestimonialSection = dynamic(() => import('@/components/home/TestimonialSection'), { ssr: true });
const OpportunitiesSection = dynamic(() => import('@/components/home/OpportunitiesSection'), { ssr: true });
const StatsSection = dynamic(() => import('@/components/home/StatsSection'), { ssr: true });
const CtaSection = dynamic(() => import('@/components/home/CtaSection'), { ssr: true });

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
