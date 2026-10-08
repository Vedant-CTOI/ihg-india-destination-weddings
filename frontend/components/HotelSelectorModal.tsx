import React, { useState, useMemo } from 'react';
import { HOTELS_DATA } from '../constants';
import { HotelProperty } from '../types';
import { X, Search, Check, Building2, MapPin, Users, BedDouble } from 'lucide-react';

interface HotelSelectorModalProps {
  isOpen: boolean;
  selectedHotelIds: string[];
  onClose: () => void;
  onConfirmSelection: (selectedIds: string[], selectedNames: string[]) => void;
}

export const HotelSelectorModal: React.FC<HotelSelectorModalProps> = ({
  isOpen,
  selectedHotelIds: initialSelectedIds,
  onClose,
  onConfirmSelection
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds || []);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>('All');

  // Sync state when opened
  React.useEffect(() => {
    setSelectedIds(initialSelectedIds || []);
  }, [initialSelectedIds, isOpen]);

  const cities = ['All', 'Ranthambore', 'Goa', 'Mahabalipuram', 'Kochi', 'Delhi NCR', 'Jim Corbett'];

  const filteredHotels = useMemo(() => {
    return HOTELS_DATA.filter((hotel) => {
      if (cityFilter !== 'All' && hotel.city !== cityFilter) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = hotel.name.toLowerCase().includes(q);
        const matchesLocation = hotel.location.toLowerCase().includes(q);
        const matchesBrand = hotel.brand.toLowerCase().includes(q);
        if (!matchesName && !matchesLocation && !matchesBrand) return false;
      }
      return true;
    });
  }, [cityFilter, searchQuery]);

  if (!isOpen) return null;

  const toggleHotel = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(HOTELS_DATA.map((h) => h.id));
  };

  const handleClearAll = () => {
    setSelectedIds([]);
  };

  const handleSave = () => {
    const selectedNames = HOTELS_DATA.filter((h) => selectedIds.includes(h.id)).map((h) => h.name);
    onConfirmSelection(selectedIds, selectedNames);
    onClose();
  };

  return (
    <div 
      className="absolute inset-0 z-40 bg-white rounded-3xl border-2 border-black/80 shadow-2xl flex flex-col justify-between overflow-hidden animate-fade-in font-sans"
      role="dialog"
      aria-modal="true"
      aria-label="Choose Hotels and Palaces"
    >
      {/* Overlay Header: Aligned with Form Padding */}
      <div className="p-5 sm:p-7 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-neutral-500 font-semibold mb-1">
            <Building2 className="w-3.5 h-3.5 text-black" />
            <span>Sanctuary Portfolio Selector</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-black">
            Choose Hotels &amp; Palaces
          </h2>
          <p className="text-xs text-neutral-500 font-light mt-0.5">
            Select one or multiple sanctuaries to associate with this discovery inquiry.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors cursor-pointer"
          aria-label="Close selector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Bar: Symmetrically Aligned */}
      <div className="px-5 py-3.5 sm:px-7 sm:py-4 border-b border-neutral-200 bg-white space-y-3 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search hotel name, location or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 hover:border-black rounded-xl pl-9 pr-8 py-2 text-xs font-sans text-black focus:outline-none focus:border-black transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Quick Select Actions */}
          <div className="flex items-center space-x-2.5 text-xs shrink-0">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-[11px] uppercase tracking-wider text-neutral-600 hover:text-black font-medium underline cursor-pointer"
            >
              Select All
            </button>
            <span className="text-neutral-300">•</span>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[11px] uppercase tracking-wider text-neutral-600 hover:text-black font-medium underline cursor-pointer"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pt-0.5">
          {cities.map((c) => {
            const active = cityFilter === c;
            return (
              <button
                type="button"
                key={c}
                onClick={() => setCityFilter(c)}
                className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all whitespace-nowrap cursor-pointer border ${
                  active
                    ? 'border-black bg-black text-white font-medium shadow-2xs'
                    : 'border-neutral-200 text-neutral-600 hover:border-black bg-white'
                }`}
              >
                {c === 'All' ? 'All Cities' : c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hotel Cards Grid (Scrollable, aligned with form interior) */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 min-h-[300px]">
        {filteredHotels.length === 0 ? (
          <div className="text-center py-16 text-neutral-500 space-y-2">
            <Building2 className="w-8 h-8 mx-auto text-neutral-400" />
            <p className="font-serif text-base text-black">No hotels found matching criteria.</p>
            <p className="text-xs font-light">Try resetting search filters or city presets.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredHotels.map((hotel) => {
              const isChecked = selectedIds.includes(hotel.id);
              return (
                <div
                  key={hotel.id}
                  onClick={() => toggleHotel(hotel.id)}
                  className={`rounded-2xl border p-3 flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden group select-none ${
                    isChecked
                      ? 'border-black bg-neutral-50 ring-1 ring-black shadow-xs'
                      : 'border-neutral-200 hover:border-black bg-white'
                  }`}
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative h-28 rounded-xl overflow-hidden bg-neutral-900 mb-2">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-103 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-white/95 text-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-medium">
                        {hotel.city}
                      </span>

                      {/* Checkbox indicator */}
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center absolute top-2 right-2 transition-colors ${
                          isChecked
                            ? 'border-black bg-black text-white'
                            : 'border-white/80 bg-black/40 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold block">
                        {hotel.genre}
                      </span>
                      <h4 className="font-serif text-sm font-normal text-black leading-snug truncate">
                        {hotel.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 truncate flex items-center space-x-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{hotel.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Metrics Strip */}
                  <div className="mt-2.5 pt-2 border-t border-neutral-200/80 flex items-center justify-between text-[10px] text-neutral-600">
                    <span className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-neutral-400" />
                      <span>{hotel.capacityMin}–{hotel.capacityMax}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <BedDouble className="w-3 h-3 text-neutral-400" />
                      <span>{hotel.roomsCount} keys</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Footer Aligned with Form Style */}
      <div className="p-4 sm:p-6 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between shrink-0">
        <div className="text-xs text-neutral-600">
          <strong className="text-black font-semibold">{selectedIds.length}</strong>{' '}
          {selectedIds.length === 1 ? 'sanctuary' : 'sanctuaries'} selected
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={onClose}
            className="border border-neutral-300 hover:border-black text-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer bg-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-black hover:bg-neutral-800 text-white px-5 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all shadow-xs cursor-pointer flex items-center space-x-1.5"
          >
            <span>Attach to Form</span>
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
