import StatsQuickActions from './StatsQuickActions';
import SortDropdown from './SortDropdown';
import OpportunityList from './OpportunityList';
import type { Opportunity } from '@/components/dashboard/StudentDashboardClient';
import React from 'react';

interface SidebarProps {
  applicationsCount: number;
  savedCount: number;
  sortOption: '' | 'date' | 'distance';
  setSortOption: (option: '' | 'date' | 'distance') => void;
  sortedOpportunities: Opportunity[];
  selectedOpportunity: Opportunity | null;
  setSelectedOpportunity: (opportunity: Opportunity) => void;
  sortDropdownOpen: boolean;
  setSortDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // Add other props here if needed
}

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
}: SidebarProps) {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 bg-transparent border-r-2 border-blue-100 md:sticky md:top-16 z-20 transition-all duration-200 shadow-none">
      <StatsQuickActions applicationsCount={applicationsCount} savedCount={savedCount} />
      <div className="flex items-center justify-between px-4">
        <div className="text-xs text-gray-500 font-medium">Sort</div>
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} isOpen={sortDropdownOpen} setIsOpen={setSortDropdownOpen} />
      </div>
      <OpportunityList
        opportunities={sortedOpportunities}
        selectedOpportunity={selectedOpportunity}
        setSelectedOpportunity={setSelectedOpportunity}
      />
    </aside>
  );
} 