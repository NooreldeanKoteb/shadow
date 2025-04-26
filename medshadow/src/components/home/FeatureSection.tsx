import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FeatureCard from './FeatureCard';

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const features: FeatureItem[] = [
  {
    title: 'Create Profile',
    description: 'Set up your detailed student or facility profile with credentials and preferences',
    icon: '/images/profile-icon.svg',
    link: '/profile/create'
  },
  {
    title: 'Find Opportunities',
    description: 'Discover and filter shadowing positions based on specialty, location, and duration',
    icon: '/images/search-icon.svg',
    link: '/opportunities/search'
  },
  {
    title: 'Connect & Apply',
    description: 'Apply to opportunities and connect directly with leading medical institutions',
    icon: '/images/connect-icon.svg',
    link: '/opportunities/apply'
  }
];

const FeatureSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[#E5E7EB] text-[#4B5563] rounded-full text-sm font-medium mb-4">
            A seamless experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#14213D]">How MedShadow Works</h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
            Our premium platform connects medical students with shadowing experiences at prestigious institutions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              link={feature.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection; 