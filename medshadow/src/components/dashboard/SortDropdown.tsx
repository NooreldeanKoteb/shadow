import { useRef } from 'react';

export default function SortDropdown({ sortOption, setSortOption, sortDropdownOpen, setSortDropdownOpen }) {
  const dropdownRef = useRef(null);
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="text-xs text-gray-500 font-medium">Sort</div>
      <div className="relative">
        <button onClick={() => setSortDropdownOpen((o) => !o)} className="p-2 rounded hover:bg-blue-100 transition-colors" aria-label="Sort">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M9 18h6" /></svg>
        </button>
        {sortDropdownOpen && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] p-2">
            <button className={`block w-full text-left px-3 py-2 rounded hover:bg-blue-50 ${sortOption === 'distance' ? 'bg-blue-100 font-semibold' : ''}`} onClick={() => { setSortOption('distance'); setSortDropdownOpen(false); }}>Sort by Distance</button>
            <button className={`block w-full text-left px-3 py-2 rounded hover:bg-blue-50 ${sortOption === 'date' ? 'bg-blue-100 font-semibold' : ''}`} onClick={() => { setSortOption('date'); setSortDropdownOpen(false); }}>Sort by Date Posted</button>
          </div>
        )}
      </div>
    </div>
  );
} 