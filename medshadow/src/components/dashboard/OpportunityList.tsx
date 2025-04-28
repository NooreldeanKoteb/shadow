import OpportunityListItem from './OpportunityListItem';
import type { Opportunity } from '@/app/dashboard/student/page';

// If you have a type/interface for Opportunity, use it instead of 'any'
interface OpportunityListProps {
  opportunities: Opportunity[];
  selectedOpportunity: Opportunity | null;
  setSelectedOpportunity: (opportunity: Opportunity) => void;
}

export default function OpportunityList({ opportunities, selectedOpportunity, setSelectedOpportunity }: OpportunityListProps) {
  return (
    <div className="overflow-y-auto h-[60vh] px-2 pb-4">
      {opportunities.length === 0 ? (
        <div className="p-4 text-gray-400 text-center">No opportunities found.</div>
      ) : (
        <ul className="space-y-3">
          {opportunities.map((opp) => (
            <OpportunityListItem
              key={opp._id}
              opportunity={opp}
              selected={selectedOpportunity?._id === opp._id}
              onClick={() => setSelectedOpportunity(opp)}
            />
          ))}
        </ul>
      )}
    </div>
  );
} 