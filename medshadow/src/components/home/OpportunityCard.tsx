import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  return (
    <div className="group">
      <div className="overflow-hidden bg-white rounded-xl border border-neutral-200 shadow-sm group-hover:shadow-md group-hover:border-[#FCA311]/30 transition-all duration-300">
        <div className="relative h-56 bg-[#4F46E5]">
          <Image
            src={opportunity.image}
            alt={opportunity.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-overlay opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4F46E5]/80 to-transparent opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 w-full p-4">
            <h3 className="text-xl font-semibold text-white">{opportunity.title}</h3>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#14213D] font-medium px-3 py-1 rounded-full text-sm">
            {opportunity.category}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3 border border-neutral-200">
              <Image
                src={opportunity.facilityLogo}
                alt={`${opportunity.facility} Logo`}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[#4B5563] font-medium">{opportunity.facility}</span>
          </div>
          <p className="text-[#4B5563] mb-4">{opportunity.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-[#FCA311] font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {opportunity.location}
            </span>
            <Link
              href={`/opportunities/${opportunity.id}`}
              className="bg-[#14213D] hover:bg-[#1A365D] text-white px-4 py-2 rounded-lg transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard; 