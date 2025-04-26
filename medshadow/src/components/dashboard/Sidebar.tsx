import StatsQuickActions from './StatsQuickActions';
import SortDropdown from './SortDropdown';
import OpportunityList from './OpportunityList';

export default function Sidebar({
  applicationsCount,
  savedCount,
  sortOption,
  setSortOption,
  sortedOpportunities,
  selectedOpportunity,
  setSelectedOpportunity,
  sortDropdownOpen,
  setSortDropdownOpen
}) {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 bg-transparent border-r-2 border-blue-100 md:sticky md:top-16 z-20 transition-all duration-200 shadow-none">
      <StatsQuickActions applicationsCount={applicationsCount} savedCount={savedCount} />
      <SortDropdown sortOption={sortOption} setSortOption={setSortOption} sortDropdownOpen={sortDropdownOpen} setSortDropdownOpen={setSortDropdownOpen} />
      <OpportunityList
        opportunities={sortedOpportunities}
        selectedOpportunity={selectedOpportunity}
        setSelectedOpportunity={setSelectedOpportunity}
      />
    </aside>
  );
} 