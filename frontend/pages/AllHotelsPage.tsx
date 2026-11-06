import React, { useState, useMemo, useEffect } from 'react';
import { useMobileLayout } from '../components/useMobileLayout';
import { HOTELS_DATA } from '../constants';
import { HotelProperty } from '../types';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { COUNTRY_DEST_MAP } from '../components/DestinationDropdown';
import { DUMMY_HOTELS, pick } from '../components/landingDummyImages';

interface AllHotelsPageProps {
  initialCity?: string;
  onNavigateBack: () => void;
  onNavigateToInquiry: (hotelName: string) => void;
  onNavigateToHotelDetail?: (hotelId: string) => void;
}

export const AllHotelsPage: React.FC<AllHotelsPageProps> = ({
  initialCity = 'All Cities',
  onNavigateBack,
  onNavigateToInquiry,
  onNavigateToHotelDetail
}) => {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedGenre, setSelectedGenre] = useState<string>('All Occasions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('Country 1');
  const [popupHotel, setPopupHotel] = useState<HotelProperty | null>(null);
  // Mobile only: 2-column grid, first 4 rows (8 hotels) then "Load more" reveals the rest
  const mobileLayout = useMobileLayout();
  const MOBILE_INITIAL = 8;
  const [showAllMobile, setShowAllMobile] = useState(false);

  // Available destinations across IHG's portfolio — display labels map to city data keys
  const destinationLabels: Record<string, string> = {
    'Region 1': 'City 1',
    'Region 2': 'City 2',
    'Region 3': 'City 3',
    'Region 4': 'City 4',
    'Region 5': 'City 5',
    'Region 6': 'City 6',
    'Region 7': 'City 7',
    'Region 8': 'City 8',
    'Region 9': 'City 9'
  };
  // Banner + About block keep the destination wording (Destination 1, 2 …); the filter says City 1, 2 …
  const destinationName = (city: string) => city.replace(/^Region (\d+)$/, 'Destination $1');
  // About-the-destination block: only when the user arrived from a destination card (initialCity set) and that destination is still selected
  const arrivedCity = initialCity !== 'All Cities' ? initialCity : null;
  const [aboutOpen, setAboutOpen] = useState(false);
  const ABOUT_DEST_COPY = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id.',
    'Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing.',
    'Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Fusce convallis, mauris imperdiet gravida bibendum, nisl turpis suscipit mauris, sed placerat ipsum urna sed risus. In convallis tellus a mauris. Curabitur non elit ut libero tristique sodales. Mauris a lacus. Donec mattis semper leo. In hac habitasse platea dictumst. Vivamus facilisis diam at odio. Mauris dictum, nisi eget consequat elementum.'
  ];
  const citiesInIndia = ['All Cities', ...Object.keys(destinationLabels)];

  // Occasion presets — display labels map to actual occasion data keys
  const occasionLabels: Record<string, string> = {
    'Royal Wedding': 'Occasion 1',
    'Beachside': 'Occasion 2',
    'Mountain & Wilderness': 'Occasion 3',
    'Temple Shoreline': 'Occasion 4',
    'Backwater Serenity': 'Occasion 5'
  };
  const genreFilters = ['All Occasions', ...Object.keys(occasionLabels)];

  // 72 cards on this page: the 10 real hotels + placeholder cards (display only; site data untouched).
  // Placeholder cards copy a real hotel's details for the filters and open that hotel's page.
  const PAGE_TOTAL = 72;
  const PAGE_HOTELS = useMemo<HotelProperty[]>(() => Array.from({ length: PAGE_TOTAL }, (_, k) => {
    const src = HOTELS_DATA[k % HOTELS_DATA.length];
    return k < HOTELS_DATA.length ? src : { ...src, id: `${src.id}__p${k + 1}`, name: `Hotel ${k + 1}` };
  }), []);
  const sourceId = (id: string) => id.split('__p')[0];

  // Filtered hotels list based on city, genre, and search query
  const filteredHotels = useMemo(() => {
    return PAGE_HOTELS.filter((h) => {
      // 1. City filter
      if (selectedCity !== 'All Cities' && h.city !== selectedCity) {
        return false;
      }

      // 2. Occasion filter
      if (selectedGenre !== 'All Occasions' && h.genre !== selectedGenre) {
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
  }, [selectedCity, selectedGenre, searchQuery, selectedCountry]);

  const handleOpenFullPage = (hotelId: string) => {
    setPopupHotel(null);
    if (onNavigateToHotelDetail) {
      onNavigateToHotelDetail(hotelId);
    }
  };

  useEffect(() => { setShowAllMobile(false); }, [selectedCity, selectedGenre, searchQuery]);
  const visibleHotels = mobileLayout && !showAllMobile ? filteredHotels.slice(0, MOBILE_INITIAL) : filteredHotels;
  // Tiles rise in as they scroll into view (same as the Discover by Destination grid; reversible when scrolled back above)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.hotels-page .dest-grid .dest-tile'));
    const io = new IntersectionObserver((ents) => ents.forEach((e) => {
      const el = e.target as HTMLElement;
      if (e.isIntersecting) el.setAttribute('data-seen', '');
      else if (e.boundingClientRect.top > 0) el.removeAttribute('data-seen');
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    // tiles already on screen (e.g. right after a filter change) show at once
    requestAnimationFrame(() => els.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.setAttribute('data-seen', ''); }));
    return () => io.disconnect();
  }, [filteredHotels, showAllMobile, mobileLayout]);
  // Dummy colour photo per hotel (same photo as that hotel's card on the homepage)
  const hotelImg = (h: HotelProperty) => pick(DUMMY_HOTELS, Math.max(0, PAGE_HOTELS.findIndex((x) => x.id === h.id)));

  const handleClearAllFilters = () => {
    setSelectedCity('All Cities');
    setSelectedGenre('All Occasions');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCity !== 'All Cities' || selectedGenre !== 'All Occasions' || searchQuery.trim() !== '';

  return (
    <div className="hotels-page min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">
      
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Exploration</button>
            <span>/</span>
            <span className="text-black font-medium">Hotels</span>
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

      {/* Hero Banner — dummy venue photo (Unsplash, free licence) until client imagery; size unchanged. Go back = tag checkpoint-before-all-hotels */}
      <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1784460843252-0957395d2888?auto=format&fit=crop&w=2400&q=80"
          alt="Hotels hero"
          data-real-photo=""
          className="hotels-hero-img w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_HOTELS[0]; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="on-photo absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <span className="bg-white text-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold inline-block mb-2.5">
              {selectedCity === 'All Cities' ? 'National Portfolio' : destinationName(selectedCity)}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2">
              {selectedCity === 'All Cities' ? 'Lorem ipsum dolor sit amet' : `${destinationName(selectedCity)} dummy text`}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-light leading-relaxed">
              {selectedCity === 'All Cities'
                ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Page Title & Context — removed on request (National Portfolio / Hotels / Browse…) */}

        {/* Filter Bar — compact: 2 per row, labels inside the fields, count + reset on the last row; pinned under the header */}
        <div className="filter-bar dest-filter hotels-filter sticky z-20 bg-neutral-50/95 backdrop-blur-sm p-2.5 rounded-2xl border border-neutral-200">
          <div className="grid grid-cols-2 gap-2">
              <label htmlFor="city-filter-dropdown" className="filter-field relative flex items-center h-9 bg-white border border-neutral-300 hover:border-black focus-within:border-black rounded-xl pl-3.5 transition-colors">
                <span className="shrink-0 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">City:</span>
                <select id="city-filter-dropdown" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="flex-1 min-w-0 h-full appearance-none bg-transparent pl-2 pr-9 text-xs font-sans text-black font-medium focus:outline-none cursor-pointer truncate">
                  {citiesInIndia.map((o) => (
                    <option key={o} value={o}>{o === 'All Cities' ? 'All Cities' : destinationLabels[o]}</option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 w-4 h-4 text-neutral-500" />
              </label>
              <label htmlFor="genre-filter-dropdown" className="filter-field relative flex items-center h-9 bg-white border border-neutral-300 hover:border-black focus-within:border-black rounded-xl pl-3.5 transition-colors">
                <span className="shrink-0 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Occasion:</span>
                <select id="genre-filter-dropdown" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="flex-1 min-w-0 h-full appearance-none bg-transparent pl-2 pr-9 text-xs font-sans text-black font-medium focus:outline-none cursor-pointer truncate">
                  {genreFilters.map((o) => (
                    <option key={o} value={o}>{o === 'All Occasions' ? 'All Occasions' : occasionLabels[o]}</option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 w-4 h-4 text-neutral-500" />
              </label>
              <div className="col-span-2 flex items-center gap-2 min-w-0">
                <label htmlFor="hotel-search-input" className="filter-field relative flex items-center h-9 bg-white border border-neutral-300 hover:border-black focus-within:border-black rounded-xl pl-3.5 transition-colors flex-1 min-w-0">
                  <span className="sr-only">Search Hotels:</span>
                  <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current text-neutral-400 shrink-0"></span>
                  <input id="hotel-search-input" type="text" placeholder="Search by hotel name or location..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                         className="flex-1 min-w-0 h-full bg-transparent pl-2 pr-8 text-xs font-sans text-black placeholder:text-neutral-400 font-medium focus:outline-none" />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-black cursor-pointer" aria-label="Clear search">
                      <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                    </button>
                  )}
                </label>
                <div className="filter-count shrink-0 flex items-center gap-2 text-[11px] text-neutral-500 whitespace-nowrap pl-1">
                  <span>Showing <strong className="text-black font-medium">{filteredHotels.length}</strong> {filteredHotels.length === 1 ? 'sanctuary' : 'sanctuaries'}</span>
                  {hasActiveFilters && (
                    <button type="button" onClick={handleClearAllFilters} className="text-[10px] text-neutral-500 hover:text-black font-medium underline uppercase tracking-wider cursor-pointer">Reset All Filters</button>
                  )}
                </div>
              </div>
          </div>
        </div>

        {/* About the destination — dummy copy (~300 words); only when arriving from a destination card and it is still selected.
             Go back = tag checkpoint-before-dest-about */}
        {arrivedCity && selectedCity === arrivedCity && (
          <section className="dest-about" aria-label="About the destination">
            <p className="dest-about-eyebrow text-[11px] uppercase tracking-[0.32em]">
              <i className="dest-about-rule" aria-hidden="true" />About the Destination
            </p>
            <h2 className="dest-about-title font-serif font-normal mt-3">{destinationName(selectedCity)}</h2>
            <div className={`dest-about-body mt-5 ${aboutOpen ? 'is-open' : ''}`}>
              {ABOUT_DEST_COPY.map((t, k) => <p key={k}>{t}</p>)}
            </div>
            <button type="button" onClick={() => setAboutOpen((v) => !v)} className="dest-about-more mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-medium border-b pb-0.5 cursor-pointer">
              {aboutOpen ? 'Read less' : 'Read more'}
            </button>
          </section>
        )}

        {/* Hotels Grid */}
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
          <>
          {/* ═══ HOTEL GRID — photo tiles in the Discover by Destination tile style (3:4, text on photo, dark fade,
               4 per row web / 2 mobile, rise-in + hover zoom; CTA on hover web / always mobile). Go back = tag checkpoint-before-all-hotels ═══ */}
          <div className="dest-grid hotels-grid grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {visibleHotels.map((hotel, i) => (
              <button type="button" key={hotel.id} onClick={() => handleOpenFullPage(sourceId(hotel.id))}
                      style={{ ['--i' as any]: i % 4 }}
                      className="dest-tile group relative block w-full aspect-[3/4] overflow-hidden bg-neutral-200 rounded-sm text-left cursor-pointer">
                <img src={hotelImg(hotel)} alt={hotel.name} data-real-photo="" loading="lazy"
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                     onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_HOTELS[0]; }} />
                <div className="dest-tile-veil absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-700" />
                <div className="on-photo absolute inset-x-0 bottom-0 p-4 lg:p-5 text-white">
                  <span className="hotel-tile-loc block text-[10px] uppercase tracking-[0.28em] text-white/70 mb-1.5 truncate">
                    <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span> · Lorem Ipsum
                  </span>
                  <h3 className="font-serif font-normal leading-[1.05] text-[clamp(1.25rem,1.9vw,1.75rem)]">{hotel.name}</h3>
                  <p className="dest-tile-copy mt-1.5 text-[13px] font-light leading-snug text-white/85">{hotel.capacityMin}–{hotel.capacityMax} Guests · {hotel.roomsCount} Rooms</p>
                  <span className="dest-tile-cta mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-medium border-b border-white/70 pb-0.5">
                    Full Page <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
          {mobileLayout && !showAllMobile && filteredHotels.length > MOBILE_INITIAL && (
            <button
              type="button"
              onClick={() => setShowAllMobile(true)}
              className="hotel-load-more mt-5 w-full border border-black text-black hover:bg-black hover:text-white text-[11px] uppercase tracking-wider font-medium py-3 rounded-full transition-colors cursor-pointer"
            >
              Load more ({filteredHotels.length - MOBILE_INITIAL})
            </button>
          )}
          </>
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
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E' + encodeURIComponent(popupHotel.name);
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
                  <span className="text-[10px] text-neutral-500">Rooms &amp; Villas</span>
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
                  <div className="flex items-center space-x-1.5 text-xs text-neutral-800 mt-2 font-medium">
                    <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                    <span>Transit: {popupHotel.airportDistance}</span>
                  </div>
                )}
              </div>

              {/* Curated Celebration Spaces */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-black font-bold block mb-2.5">
                  Curated Celebration Spaces
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(popupHotel.curatedSpaces || [
                    { name: 'Grand Horizon Lawn', capacity: '500 guests', type: 'Open-Air Mandap' },
                    { name: 'Pillarless Ballroom', capacity: '450 guests', type: 'Indoor Sound-Isolated' },
                    { name: 'Sacred Water Terrace', capacity: '200 guests', type: 'Intimate Pheras' }
                  ]).map((space, idx) => (
                    <div key={idx} className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 text-xs">
                      <span className="text-[10px] uppercase text-neutral-500 font-semibold block mb-0.5">
                        {space.type}
                      </span>
                      <div className="font-semibold text-black">{space.name}</div>
                      <div className="text-[11px] text-neutral-500 mt-1">Ideal for {space.capacity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Culinary and Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-black font-bold block mb-2">
                    Culinary Readiness
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    {(popupHotel.culinaryHighlights || [
                      'Dedicated pure Jain and Sattvic kitchen lines',
                      'Live traditional halwai dessert stations',
                      'Simultaneous global coastal grills & continental bars'
                    ]).map((c, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span aria-hidden="true" className="w-3.5 h-3.5  shrink-0 mt-0.5 inline-block border border-current"></span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-black font-bold block mb-2">
                    Sanctuary Highlights
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    {popupHotel.keyHighlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span aria-hidden="true" className="w-3.5 h-3.5  shrink-0 mt-0.5 inline-block border border-current"></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mandap Spec Banner */}
              <div className="bg-black text-white p-4 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block font-semibold">
                    Signature Mandap Setting
                  </span>
                  <div className="font-serif text-base text-neutral-100 mt-0.5">
                    {popupHotel.mandapType}
                  </div>
                </div>
                <span aria-hidden="true" className="w-5 h-5  shrink-0 inline-block border border-current"></span>
              </div>

              {/* POPUP ACTION BUTTONS: OPEN FULL HOTEL PAGE + ENQUIRE DISCOVERY INTAKE */}
              <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenFullPage(popupHotel.id)}
                  className="border border-neutral-300 hover:border-black text-black px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Open Dedicated Hotel Page</span>
                  <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const hotelName = popupHotel.name;
                    setPopupHotel(null);
                    onNavigateToInquiry(hotelName);
                  }}
                  className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Enquire — Open Intake</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
