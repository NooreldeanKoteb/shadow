import React from 'react';
import Link from 'next/link';
import OpportunityCard from './OpportunityCard';

interface Opportunity {
  id: number;
  title: string;
  facility: string;
  facilityLogo: string;
  description: string;
  image: string;
  category: string;
  location: string;
}

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: 'Cardiology Shadowing',
    facility: 'Cleveland Clinic',
    facilityLogo: '/images/cleveland-logo.jpg',
    description: 'Exclusive opportunity to shadow cardiologists at one of the nation\'s top heart centers',
    image: '/images/cardiology.jpg',
    category: 'Cardiology',
    location: 'Cleveland, OH'
  },
  {
    id: 2,
    title: 'Pediatrics Rotation',
    facility: 'Boston Children\'s Hospital',
    facilityLogo: '/images/boston-logo.jpg',
    description: 'Learn alongside pediatric specialists at a world-renowned children\'s hospital',
    image: '/images/pediatrics.jpg',
    category: 'Pediatrics',
    location: 'Boston, MA'
  },
  {
    id: 3,
    title: 'Emergency Medicine',
    facility: 'Mayo Clinic',
    facilityLogo: '/images/mayo-logo.jpg',
    description: 'Experience fast-paced emergency care at one of the leading medical centers',
    image: '/images/emergency.jpg',
    category: 'Emergency',
    location: 'Rochester, MN'
  },
  {
    id: 4,
    title: 'Neurosurgery Observation',
    facility: 'Johns Hopkins Hospital',
    facilityLogo: '/images/hopkins-logo.jpg',
    description: 'Observe advanced neurosurgical procedures in a cutting-edge environment',
    image: '/images/neurosurgery.jpg',
    category: 'Neurosurgery',
    location: 'Baltimore, MD'
  }
];

const OpportunitiesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <span className="inline-block px-4 py-1 bg-[#E5E7EB] text-[#4B5563] rounded-full text-sm font-medium mb-4">
              Distinguished opportunities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#14213D]">Featured Opportunities</h2>
            <p className="text-lg text-[#4B5563]">Exclusive shadowing positions at top medical institutions</p>
          </div>
          <Link 
            href="/opportunities" 
            className="mt-6 md:mt-0 flex items-center bg-[#14213D] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A365D] transition-colors shadow-sm"
          >
            View All Opportunities
            <svg className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {opportunities.map((opportunity) => (
            <OpportunityCard 
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection; 