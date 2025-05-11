'use client';

import { useRef, useEffect } from 'react';

interface SortDropdownProps {
  sortOption: 'distance' | 'date' | '';
  setSortOption: (option: 'distance' | 'date' | '') => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function SortDropdown({
  sortOption,
  setSortOption,
  isOpen,
  setIsOpen
}: SortDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="flex items-center justify-between px-4 py-2" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded hover:bg-blue-100 transition-colors" aria-label="Sort"
      >
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M9 18h6" /></svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] p-2">
          <button
            onClick={() => {
              setSortOption('date');
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
              sortOption === 'date' ? 'text-[#FCA311]' : 'text-gray-700'
            }`}
          >
            Date Posted
          </button>
          <button
            onClick={() => {
              setSortOption('distance');
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
              sortOption === 'distance' ? 'text-[#FCA311]' : 'text-gray-700'
            }`}
          >
            Distance
          </button>
          <button
            onClick={() => {
              setSortOption('');
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
              sortOption === '' ? 'text-[#FCA311]' : 'text-gray-700'
            }`}
          >
            Clear Sort
          </button>
        </div>
      )}
    </div>
  );
} 