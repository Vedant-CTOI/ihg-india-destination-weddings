import React, { useState, useRef, useEffect } from 'react';

const OCCASIONS = ['Occasion 1', 'Occasion 2', 'Occasion 3', 'Occasion 4', 'Occasion 5'];

interface OccasionDropdownProps {
  selectedOccasions: string[];
  onChange: (occasions: string[]) => void;
  inputCls: string;
}

/** Multi-select occasions — checkbox dropdown styled like the other form controls */
export const OccasionDropdown: React.FC<OccasionDropdownProps> = ({
  selectedOccasions,
  onChange,
  inputCls,
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

  const toggle = (o: string) => {
    onChange(selectedOccasions.includes(o)
      ? selectedOccasions.filter((x) => x !== o)
      : [...selectedOccasions, o]);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={inputCls + " text-left flex items-center justify-between cursor-pointer"}
      >
        <span className={selectedOccasions.length ? 'font-medium text-black' : 'text-neutral-400 font-light'}>
          {selectedOccasions.length > 0
            ? `${selectedOccasions.length} occasion${selectedOccasions.length > 1 ? 's' : ''} selected`
            : 'Select occasion(s)'}
        </span>
        <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current shrink-0"></span>
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-full bg-white border border-neutral-300 rounded-xl shadow-lg p-1.5 space-y-0.5 animate-fade-in">
          {OCCASIONS.map((o) => {
            const checked = selectedOccasions.includes(o);
            return (
              <label key={o} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-neutral-50 cursor-pointer text-xs text-black">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(o)}
                  className="accent-black cursor-pointer"
                />
                <span>{o}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};
