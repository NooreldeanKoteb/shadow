import Image from 'next/image';
import type { Opportunity } from '@/components/dashboard/StudentDashboardClient';

function getInitials(name: string) {
  if (!name) return '';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

function formatLocation(location: Opportunity['location']): string {
  if (typeof location === 'string') return location;
  return `${location.city}, ${location.state}`;
}

function getFacilityName(facility: Opportunity['facility']): string {
  if (typeof facility === 'string') return facility;
  return facility?.name || 'Unknown Facility';
}

// If you have a type/interface for Opportunity, use it instead of 'any'
interface OpportunityListItemProps {
  opportunity: Opportunity;
  selected: boolean;
  onClick: () => void;
}

export default function OpportunityListItem({ opportunity, selected, onClick }: OpportunityListItemProps) {
  const facilityName = getFacilityName(opportunity.facility);

  return (
    <li>
      <button
        className={`group w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md hover:border-[#FCA311]/30 transition-all duration-300 relative overflow-hidden ${selected ? 'bg-[#FCA311]/25 border-[#FCA311] ring-2 ring-[#FCA311]/50' : ''}`}
        onClick={onClick}
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#FCA311] flex items-center justify-center bg-white text-[#FCA311] font-bold text-lg mr-2">
          {opportunity.facilityLogo ? (
            <Image src={opportunity.facilityLogo} alt={facilityName} fill className="object-cover rounded-full" />
          ) : (
            <span>{getInitials(facilityName)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-[#14213D] truncate">{opportunity.title}</span>
            {opportunity.isNew && <span className="ml-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">New</span>}
            {opportunity.isPopular && <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Popular</span>}
            {opportunity.deadlineSoon && <span className="ml-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">Deadline Soon</span>}
          </div>
          <div className="flex flex-wrap gap-1 mt-1 mb-1">
            <span className="bg-[#FCA311]/10 text-[#FCA311] px-2 py-0.5 rounded text-xs font-medium">{opportunity.type}</span>
            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-medium">{opportunity.specialty}</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">{opportunity.duration}</span>
          </div>
          <div className="text-xs text-gray-500 truncate">
            {formatLocation(opportunity.location)} • {facilityName} • Posted {opportunity.postedAt}
          </div>
        </div>
      </button>
    </li>
  );
} 