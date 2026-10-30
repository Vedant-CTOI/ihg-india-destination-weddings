import { ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

export const COUNTRY_DEST_MAP: Record<string, Record<string, string[]>> = {
  'Country 1': {
    'Destination 1': ['Crowne Plaza Today', 'Hotel 2'],
    'Destination 2': ['Hotel 5', 'Hotel 8'],
  },
  'Country 2': {
    'Destination 3': ['Hotel 3', 'Hotel 4'],
    'Destination 4': ['Hotel 9'],
  },
  'Country 3': {
    'Destination 5': ['Hotel 6'],
    'Destination 6': ['Hotel 7', 'Hotel 10'],
  },
};

interface DestinationDropdownProps {
  selectedCountry: string;
  selectedDestinations: string[];
  onChange: (destinations: string[]) => void;
  inputCls: string;
  /** Optional label shown inside the field, before the value (e.g. 'Destination:') */
  prefix?: string;
}

/** A strict dropdown (like <select>) whose options are checkboxes — multiple destinations per country */
export const DestinationDropdown: React.FC<DestinationDropdownProps> = ({
  selectedCountry,
  selectedDestinations,
  onChange,
  inputCls,
  prefix,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Country field removed: show ALL destinations across countries
  const options = Array.from(new Set(Object.values(COUNTRY_DEST_MAP).flatMap((d) => Object.keys(d))));

  const toggle = (d: string) => {
    onChange(selectedDestinations.includes(d)
      ? selectedDestinations.filter((x) => x !== d)
      : [...selectedDestinations, d]);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={inputCls + " text-left flex items-center justify-between cursor-pointer"}
      >
        {prefix && <span className="shrink-0 mr-2 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">{prefix}</span>}
        <span className={`flex-1 min-w-0 truncate ${selectedDestinations.length ? 'font-medium text-black' : 'text-neutral-400 font-light'}`}>
          {selectedDestinations.length > 0
            ? `${selectedDestinations.length} destination${selectedDestinations.length > 1 ? 's' : ''} selected`
            : 'Select destination(s)'}
        </span>
        {prefix
          ? <ChevronDown aria-hidden="true" className="w-4 h-4 shrink-0 ml-2 text-neutral-500" />
          : <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current shrink-0"></span>}
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-full bg-white border border-neutral-300 rounded-xl shadow-lg p-1.5 space-y-0.5 animate-fade-in">
          {options.map((d) => {
            const checked = selectedDestinations.includes(d);
            return (
              <label key={d} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-neutral-50 cursor-pointer text-xs text-black">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(d)}
                  className="w-3.5 h-3.5 accent-black cursor-pointer shrink-0"
                />
                <span className={checked ? 'font-medium' : 'font-light'}>{d}</span>
              </label>
            );
          })}
          {options.length === 0 && (
            <p className="px-2.5 py-2 text-xs text-neutral-400 font-light">Select a country first</p>
          )}
          <div className="pt-1.5 mt-0.5 border-t border-neutral-200 px-2.5 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[10px] uppercase tracking-wider text-neutral-500 hover:text-black font-medium py-1.5 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
