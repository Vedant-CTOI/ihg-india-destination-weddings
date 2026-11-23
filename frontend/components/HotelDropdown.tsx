import React, { useState, useRef, useEffect } from 'react';
import { HotelProperty } from '../types';

interface HotelDropdownProps {
  /** Hotels to list (already filtered by the chosen destinations) */
  hotels: HotelProperty[];
  selectedHotelIds: string[];
  onToggle: (id: string) => void;
  inputCls: string;
  /** Optional display name override (e.g. the current hotel keeps its client name) */
  labelFor?: (h: HotelProperty) => string;
  /** Optional id marked "(this property)" in the list */
  currentHotelId?: string;
}

/** Select Hotels — a strict dropdown whose options are checkboxes (same style as Occasion / Destination).
 *  Replaces the hotel image popup. Go back = tag checkpoint-before-hotel-dropdown */
export const HotelDropdown: React.FC<HotelDropdownProps> = ({
  hotels,
  selectedHotelIds,
  onToggle,
  inputCls,
  labelFor = (h) => h.name,
  currentHotelId,
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

  const n = selectedHotelIds.length;

  return (
    <div className="hotel-dd relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={inputCls + ' text-left flex items-center justify-between cursor-pointer'}
      >
        <span className={`flex-1 min-w-0 truncate ${n ? 'font-medium text-black' : 'text-neutral-400 font-light'}`}>
          {n > 0 ? `${n} hotel${n > 1 ? 's' : ''} selected` : 'Choose properties'}
        </span>
        <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current shrink-0"></span>
      </button>
      {open && (
        <div role="listbox" aria-multiselectable="true"
             className="hotel-dd-list absolute z-30 mt-1 w-full bg-white border border-neutral-300 rounded-xl shadow-lg p-1.5 space-y-0.5 max-h-72 overflow-y-auto animate-fade-in">
          {hotels.map((h) => {
            const checked = selectedHotelIds.includes(h.id);
            return (
              <label key={h.id} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-neutral-50 cursor-pointer text-xs text-black">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(h.id)}
                  className="w-3.5 h-3.5 accent-black cursor-pointer shrink-0"
                />
                <span className={checked ? 'font-medium' : 'font-light'}>
                  {labelFor(h)}
                  {currentHotelId && h.id === currentHotelId && <span className="ml-1.5 text-neutral-400 font-light">(this property)</span>}
                </span>
              </label>
            );
          })}
          {hotels.length === 0 && (
            <p className="px-2.5 py-2 text-xs text-neutral-400 font-light">No hotels in the selected destination(s) yet.</p>
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
