import Image from 'next/image';
import OpportunityActionButtons from './OpportunityActionButtons';
import type { Opportunity } from './StudentDashboardClient';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

interface OpportunityDetailsProps {
  opportunity: Opportunity;
}

function OpportunityDetails({ opportunity }: OpportunityDetailsProps) {
  const facilityName = typeof opportunity.facility === 'string'
    ? opportunity.facility
    : opportunity.facility?.name || 'Unknown Facility';
  const locationStr = typeof opportunity.location === 'string'
    ? opportunity.location
    : `${opportunity.location.city}, ${opportunity.location.state}`;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 w-full h-full flex flex-col relative">
      {/* Title and badges */}
      <div className="flex flex-col md:flex-row md:items-start mb-6 gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#FCA311] shadow-md flex items-center justify-center bg-white text-[#FCA311] font-bold text-2xl">
          {opportunity.facilityLogo ? (
            <Image src={opportunity.facilityLogo} alt={facilityName} fill className="object-cover rounded-full" />
          ) : (
            <span>{getInitials(facilityName)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-[#14213D] mb-1 truncate">{opportunity.title}</h2>
          <div className="text-gray-600 mb-1 truncate">{facilityName} • {locationStr}</div>
          <div className="flex flex-wrap gap-2 text-xs mb-2">
            <span className="bg-[#FCA311]/10 text-[#FCA311] px-2 py-1 rounded">{opportunity.type}</span>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">{opportunity.specialty}</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">{opportunity.duration}</span>
            {opportunity.isNew && <span className="ml-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">New</span>}
            {opportunity.isFeatured && <span className="ml-1 px-2 py-0.5 rounded-full bg-[#FCA311]/20 text-[#FCA311] text-xs font-semibold">Featured</span>}
          </div>
          <OpportunityActionButtons />
          <div className="border-b border-gray-200 mb-6"></div>
        </div>
      </div>
      {/* Sectioned details */}
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h3 className="font-semibold text-[#14213D] mb-1">Description</h3>
        <p className="text-gray-700 whitespace-pre-line">{opportunity.description || 'No description provided.'}</p>
      </div>
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h3 className="font-semibold text-[#14213D] mb-1">Requirements</h3>
        {opportunity.requirements && opportunity.requirements.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {opportunity.requirements.map((req: string, idx: number) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No requirements listed.</p>
        )}
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-[#14213D] mb-1">Benefits</h3>
        {opportunity.benefits && opportunity.benefits.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {opportunity.benefits.map((ben: string, idx: number) => (
              <li key={idx}>{ben}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No benefits listed.</p>
        )}
      </div>
    </div>
  );
}

export default OpportunityDetails; 