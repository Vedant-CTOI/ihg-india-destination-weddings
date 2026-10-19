import React, { useState, useMemo } from 'react';
import { HOTELS_DATA } from '../constants';
import { HotelProperty } from '../types';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

interface GenreListingPageProps {
  onNavigateBack: () => void;
  onNavigateToHotelDetail: (hotelId: string) => void;
  onNavigateToDestinationProperties?: (city: string) => void;
}

const PLACEHOLDER_IMG = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';

export const GenreListingPage: React.FC<GenreListingPageProps> = ({
  onNavigateBack,
  onNavigateToHotelDetail,
  onNavigateToDestinationProperties
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All Occasions');
  const [selectedGenre, setSelectedGenre] = useState<string>('All Genres');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [popupHotel, setPopupHotel] = useState<HotelProperty | null>(null);

  // Available destinations across the portfolio (same list the Hotels page filters on)
  const destinationOptions = [
    'All Cities',
    'Region 1',
    'Region 2',
    'Region 3',
    'Region 4',
    'Region 5',
    'Region 6'
  ];

  // Occasion presets — display labels map to actual occasion data keys
  const occasionLabels: Record<string, string> = {
    'Royal Wedding': 'Occasion 1',
    'Beachside': 'Occasion 2',
    'Mountain & Wilderness': 'Occasion 3',
    'Temple Shoreline': 'Occasion 4',
    'Backwater Serenity': 'Occasion 5'
  };
  const occasionFilters = ['All Occasions', ...Object.keys(occasionLabels)];

  // Genre presets — display labels map to actual genre data keys
  const genreLabels: Record<string, string> = {
    'Royal Wedding': 'Genre 1',
    'Beachside': 'Genre 2',
    'Mountain & Wilderness': 'Genre 3',
    'Temple Shoreline': 'Genre 4',
    'Backwater Serenity': 'Genre 5'
  };
  const genreFilters = ['All Genres', ...Object.keys(genreLabels)];

  // Filtered hotels list based on city, occasion, and search query
  const filteredHotels = useMemo(() => {
    return HOTELS_DATA.filter((h) => {
      // 1. City filter
      if (selectedCity !== 'All Cities' && h.city !== selectedCity) {
        return false;
      }

      // 2. Occasion filter (no occasion data yet — 'All Occasions' only, no-op)
      if (selectedGenre !== 'All Genres' && h.genre !== selectedGenre) {
        return false;
      }
      if (selectedOccasion !== 'All Occasions' && h.genre !== selectedOccasion) {
        return false;
      }

      // 3. Search query filter (matches hotel name, location, brand, or signature mandap setting)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = h.name.toLowerCase().includes(q);
        const matchesLocation = h.location.toLowerCase().includes(q);
        const matchesBrand = h.brand.toLowerCase().includes(q);
        const matchesMandap = h.mandapType.toLowerCase().includes(q);
        if (!matchesName && !matchesLocation && !matchesBrand && !matchesMandap) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCity, selectedOccasion, searchQuery]);

  const handleOpenDestinationProperties = (hotel: HotelProperty) => {
    onNavigateToDestinationProperties?.(hotel.city);
  };

  const handleOpenFullPage = (hotelId: string) => {
    setPopupHotel(null);
    onNavigateToHotelDetail(hotelId);
  };

  const handleClearAllFilters = () => {
    setSelectedCity('All Cities');
    setSelectedOccasion('All Occasions');
    setSelectedGenre('All Genres');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCity !== 'All Cities' || selectedOccasion !== 'All Occasions' || selectedGenre !== 'All Genres' || searchQuery.trim() !== '';

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">

      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Exploration</button>
            <span>/</span>
            <span className="text-black font-medium">Discover by Destination</span>
          </div>

          <button
            onClick={onNavigateBack}
            className="inline-flex items-center space-x-1.5 text-black hover:text-neutral-600 font-medium uppercase tracking-wider text-[11px] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Page</span>
          </button>
        </div>
      </div>

      {/* Hero Banner (Grayscale Luxury) with lorem placeholder text */}
      <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden bg-black">
        <img
          src={PLACEHOLDER_IMG}
          alt="Destination hero placeholder"
          className="w-full h-full object-cover filter grayscale contrast-115"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <span className="bg-white text-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold inline-block mb-2.5">
              Discover by Destination
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2">
              Lorem ipsum dolor sit amet
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Filter Bar: City Filter + Occasion Dropdown + Hotel Search Bar */}
        <div className="bg-neutral-50 p-4 sm:p-5 rounded-2xl border border-neutral-200 space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">

            {/* Filter 1: City Dropdown (3 cols) */}
            <div className="md:col-span-3 space-y-1">
              <label htmlFor="dest-city-filter-dropdown" className="block text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                Filter by Destination:
              </label>
              <div className="relative">
                <select
                  id="dest-city-filter-dropdown"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full appearance-none bg-white border border-neutral-300 hover:border-black rounded-xl px-3.5 py-2.5 pr-9 text-xs font-sans text-black font-medium shadow-2xs focus:outline-none focus:border-black transition-colors cursor-pointer"
                >
                  {destinationOptions.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest === 'All Cities' ? 'All Destinations' : dest.replace(/^Region (\d+)$/, 'Destination $1')}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Filter 2: Occasion Dropdown (3 cols) */}
            <div className="md:col-span-3 space-y-1">
              <label htmlFor="dest-occasion-filter-dropdown" className="block text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                Filter by Occasion:
              </label>
              <div className="relative">
                <select
                  id="dest-occasion-filter-dropdown"
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full appearance-none bg-white border border-neutral-300 hover:border-black rounded-xl px-3.5 py-2.5 pr-9 text-xs font-sans text-black font-medium shadow-2xs focus:outline-none focus:border-black transition-colors cursor-pointer"
                >
                  {occasionFilters.map((occasion) => (
                    <option key={occasion} value={occasion}>
                      {occasion === 'All Occasions' ? 'All Occasions' : occasionLabels[occasion]}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Filter 3: Genre Dropdown (3 cols) */}
            <div className="md:col-span-3 space-y-1">
              <label htmlFor="dest-genre-filter-dropdown" className="block text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                Discover by Genre:
              </label>
              <div className="relative">
                <select
                  id="dest-genre-filter-dropdown"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full appearance-none bg-white border border-neutral-300 hover:border-black rounded-xl px-3.5 py-2.5 pr-9 text-xs font-sans text-black font-medium shadow-2xs focus:outline-none focus:border-black transition-colors cursor-pointer"
                >
                  {genreFilters.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre === 'All Genres' ? 'All Genres' : genreLabels[genre]}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Filter 4: Search Bar for Hotels (3 cols) */}
            <div className="md:col-span-3 space-y-1">
              <label htmlFor="dest-hotel-search-input" className="block text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                Search Hotels:
              </label>
              <div className="relative">
                <input
                  id="dest-hotel-search-input"
                  type="text"
                  placeholder="Search by hotel name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-neutral-300 hover:border-black rounded-xl pl-9 pr-8 py-2.5 text-xs font-sans text-black placeholder:text-neutral-400 font-medium shadow-2xs focus:outline-none focus:border-black transition-colors"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                  <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-black cursor-pointer"
                    aria-label="Clear search"
                  >
                    <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Filter Status Strip */}
          <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-neutral-200/80 gap-2">
            <div className="flex items-center space-x-2 text-neutral-500 text-[11px]">
              <span>
                Showing <strong className="text-black font-medium">{filteredHotels.length}</strong> {filteredHotels.length === 1 ? 'sanctuary' : 'sanctuaries'}
              </span>
              {hasActiveFilters && (
                <>
                  <span>•</span>
                  <span>Filtered</span>
                </>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-[11px] text-neutral-500 hover:text-black font-medium underline uppercase tracking-wider cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

        </div>

        {/* Hotels Results Grid */}
        {filteredHotels.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300 space-y-3">
            <span className="inline-block w-8 h-8 border border-neutral-400 mx-auto" />
            <h3 className="font-serif text-xl text-black font-normal">
              No sanctuaries matched your current filters.
            </h3>
            <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
              Try a different occasion or clearing the search query to view available properties.
            </p>
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="mt-2 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="group bg-white rounded-2xl border border-neutral-200 hover:border-black overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md"
              >
                <div>
                  {/* Photo with Overlay (Grayscale) */}
                  <div
                    onClick={() => handleOpenDestinationProperties(hotel)}
                    className="relative h-60 overflow-hidden bg-neutral-900 cursor-pointer"
                  >
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-103 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
                      }}
                    />
                    <span className="absolute top-3 right-3 bg-black/85 text-white text-[10px] uppercase tracking-wider font-sans px-2.5 py-0.5 rounded-full font-medium border border-white/20">
                      {hotel.city.replace(/^Region (\d+)$/, 'Destination $1')}
                    </span>

                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-wider font-sans text-neutral-500 font-medium">
                        Lorem ipsum dolor sit amet
                      </span>
                    </div>

                    <h3
                      onClick={() => handleOpenDestinationProperties(hotel)}
                      className="font-serif text-lg font-normal text-black mb-2 hover:underline transition-colors cursor-pointer"
                    >
                      Destination {hotel.city.replace(/^Region (\d+)$/, '$1')}
                    </h3>

                    <p className="text-xs font-sans text-neutral-600 font-light leading-relaxed py-2 border-y border-neutral-200 mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                    </p>

                    <p className="text-[11px] text-neutral-500 font-sans italic mb-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>

                {/* Single Action Button: Full Hotel Page (Preview is hover-only via the image) */}
                <div className="p-5 pt-0 text-xs font-sans">
                  <button
                    type="button"
                    onClick={() => handleOpenDestinationProperties(hotel)}
                    className="w-full text-center bg-black hover:bg-neutral-800 text-white text-[11px] uppercase tracking-wider font-medium py-2 rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Discover Destination {hotel.city.replace(/^Region (\d+)$/, '$1')} Properties</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* POPUP OVERLAY PREVIEW FOR HOTEL PROPERTY */}
      {popupHotel && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-opacity animate-fade-in font-sans">
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-neutral-300 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={popupHotel.name}
          >
            {/* Close Button */}
            <button
              onClick={() => setPopupHotel(null)}
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-black hover:text-white text-black p-2 rounded-full shadow-md transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Close popup"
            >
              <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
            </button>

            {/* Hero Image in Popup */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
              <img
                src={popupHotel.image}
                alt={popupHotel.name}
                className="w-full h-full object-cover filter grayscale contrast-115"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-semibold mb-2">
                  <span className="bg-white text-black px-2.5 py-0.5 rounded-full">
                    {popupHotel.brand}
                  </span>
                  <span className="bg-white/20 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full">
                    {popupHotel.city}
                  </span>
                  <span className="bg-white/20 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full">
                    {popupHotel.genre}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {popupHotel.name}
                </h2>

                <p className="text-xs text-neutral-300 flex items-center space-x-1.5 mt-1">
                  <span aria-hidden="true" className="w-3.5 h-3.5  shrink-0 inline-block border border-current"></span>
                  <span>{popupHotel.location}</span>
                </p>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 space-y-6">

              {/* Key Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 bg-neutral-100 p-4 rounded-xl border border-neutral-200 text-center text-xs">
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Capacity</span>
                  <div className="font-serif text-lg font-bold text-black flex items-center justify-center space-x-1.5">
                    <span className="inline-block w-2 h-2 border border-black shrink-0" />
                    <span>{popupHotel.capacityMin}–{popupHotel.capacityMax}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">Guests</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Accommodations</span>
                  <div className="font-serif text-lg font-bold text-black flex items-center justify-center space-x-1.5">
                    <span className="inline-block w-2 h-2 bg-black shrink-0" />
                    <span>{popupHotel.roomsCount} Keys</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">Rooms & Villas</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Pricing Tier</span>
                  <div className="font-serif text-sm font-semibold text-black mt-1">
                    {popupHotel.priceBand}
                  </div>
                  <span className="text-[10px] text-neutral-500">Full Sanctuary</span>
                </div>
              </div>

              {/* Overview */}
              <div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block mb-1">
                  Sanctuary Overview
                </span>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  {popupHotel.overview || 'A premier IHG destination sanctuary engineered with dedicated ceremony lawns, consecrated havan courtyards, and secluded villas for multi-generational weddings.'}
                </p>
                {popupHotel.airportDistance && (
                  <p className="text-[11px] text-neutral-500 font-light mt-2">
                    Nearest Airport: {popupHotel.airportDistance}
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
