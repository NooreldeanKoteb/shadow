import { useState, useRef, useEffect } from 'react';

interface DropdownFilterProps {
  label: string;
  options: string[];
  selected: string[];
  setSelected: (v: string[]) => void;
}

export default function DropdownFilter({ label, options, selected, setSelected }: DropdownFilterProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Determine if this is a large dropdown (Specialty or Location)
  const isLarge = label === 'Specialty' || label === 'Location';
  const dropdownWidth = isLarge ? 'w-72' : 'w-48';
  const optionFont = isLarge ? 'text-base' : 'text-sm';

  // Filter options by search
  const filteredOptions = search.trim() === ''
    ? options
    : options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center gap-2 min-w-[120px]"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="font-medium text-sm text-[#14213D]">{label}</span>
        {selected.length > 0 && (
          <span className="ml-1 text-xs text-[#FCA311] truncate max-w-[60px]">
            {selected.length === 1 ? selected[0] : `${selected.length} selected`}
          </span>
        )}
        <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className={`absolute left-0 mt-2 ${dropdownWidth} bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] p-2`}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-sm text-[#14213D]">{label}</span>
            <button
              className="text-xs text-gray-500 underline hover:text-[#FCA311] ml-2"
              onClick={() => setSelected([])}
              type="button"
            >
              Clear
            </button>
          </div>
          {isLarge && (
            <div className="mb-2">
              <input
                type="text"
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FCA311]/30 text-sm"
                placeholder={`Search ${label.toLowerCase()}...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          )}
          <div className="max-h-48 overflow-y-auto flex flex-col gap-1">
            {filteredOptions.length === 0 ? (
              <div className="text-gray-400 text-center py-4 text-sm">No options found.</div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = selected.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`flex items-center gap-2 px-2 py-1 w-full text-left rounded cursor-pointer transition-colors ${isSelected ? 'bg-[#FCA311]/10 text-[#FCA311] font-semibold' : 'hover:bg-gray-50'} ${optionFont}`}
                    onClick={() =>
                      setSelected(
                        isSelected
                          ? selected.filter((o) => o !== opt)
                          : [...selected, opt]
                      )
                    }
                  >
                    <span className="flex items-center justify-center w-5 h-5">
                      {isSelected && (
                        <svg className="w-4 h-4 text-[#FCA311]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      )}
                    </span>
                    <span className="truncate flex-1">{opt}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
} 