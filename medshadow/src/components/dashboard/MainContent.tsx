import OpportunityDetails from './OpportunityDetails';
import Image from 'next/image';

export default function MainContent({ selectedOpportunity }) {
  return (
    <section className="flex-1 bg-transparent min-h-[60vh] p-0 md:p-4 flex flex-col">
      {!selectedOpportunity ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
          <Image src="/images/search-icon.svg" alt="Select an opportunity" width={64} height={64} className="mb-4" />
          <h2 className="text-xl font-semibold mb-2">Select an opportunity to view details</h2>
          <p className="text-gray-500">Browse the list on the left and click an opportunity to see more information.</p>
        </div>
      ) : (
        <OpportunityDetails opportunity={selectedOpportunity} />
      )}
    </section>
  );
} 