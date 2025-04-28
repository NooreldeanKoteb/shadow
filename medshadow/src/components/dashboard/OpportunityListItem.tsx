import Image from 'next/image';
import type { Opportunity } from '@/app/dashboard/student/page';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

// If you have a type/interface for Opportunity, use it instead of 'any'
interface OpportunityListItemProps {
  opportunity: Opportunity;
  selected: boolean;
  onClick: () => void;
}

export default function OpportunityListItem({ opportunity, selected, onClick }: OpportunityListItemProps) {
  return (
    <li>
      <button
        className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl shadow border border-blue-100 bg-white hover:bg-[#FCA311]/10 transition-colors relative ${selected ? 'bg-[#FCA311]/20 border-l-4 border-[#FCA311] shadow-md' : ''}`}
        onClick={onClick}
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#FCA311] flex items-center justify-center bg-white text-[#FCA311] font-bold text-lg mr-2">
          {opportunity.facilityLogo ? (
            <Image src={opportunity.facilityLogo} alt={opportunity.facility} fill className="object-cover rounded-full" />
          ) : (
            <span>{getInitials(opportunity.facility)}</span>
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
          <div className="text-xs text-gray-500 truncate">{opportunity.location} • Posted {opportunity.postedAt}</div>
        </div>
      </button>
    </li>
  );
} 