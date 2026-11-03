import React, { useState, useMemo, useEffect } from 'react';
import { HOTELS_DATA } from '../constants';
import { HotelProperty } from '../types';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { COUNTRY_DEST_MAP, DestinationDropdown } from '../components/DestinationDropdown';
import { useMobileLayout } from '../components/useMobileLayout';

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
  const [selectedCountry, setSelectedCountry] = useState<string>('Country 1');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
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
    // 0. Destination filter (multi) across ALL countries — Country filter removed
    const allowedHotelNames = selectedDestinations.length === 0
      ? HOTELS_DATA.map((h) => h.name)
      : selectedDestinations.flatMap((d) => {
          for (const c of Object.values(COUNTRY_DEST_MAP)) { if (c[d]) return c[d]; }
          return [];
        });

    return HOTELS_DATA.filter((h) => {
      if (!allowedHotelNames.includes(h.name)) {
        return false;
      }
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
  }, [selectedCity, selectedOccasion, searchQuery, selectedCountry, selectedDestinations]);

  const handleOpenDestinationProperties = (hotel: HotelProperty) => {
    onNavigateToDestinationProperties?.(hotel.city);
  };

  const handleOpenFullPage = (hotelId: string) => {
    setPopupHotel(null);
    onNavigateToHotelDetail(hotelId);
  };

  // Mobile only: 2-column grid, first 4 rows (8 cards) then "Load more" reveals the rest (same as All Hotels)
  const mobileLayout = useMobileLayout();
  const MOBILE_INITIAL = 8;
  const [showAllMobile, setShowAllMobile] = useState(false);
  useEffect(() => { setShowAllMobile(false); }, [selectedDestinations, selectedCity, selectedOccasion, selectedGenre, searchQuery]);
  useEffect(() => { if ((selectedDestinations.length || selectedCity !== 'All Cities' || selectedOccasion !== 'All Occasions' || selectedGenre !== 'All Genres' || searchQuery.trim())) setShowAll(true); }, [selectedDestinations, selectedCity, selectedOccasion, selectedGenre, searchQuery, mobileLayout]);
  const visibleHotels = mobileLayout && !showAllMobile ? filteredHotels.slice(0, MOBILE_INITIAL) : filteredHotels;
  // Each destination sits faded until it scrolls into view, then comes up to full (reversible when scrolled back above)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.dest-chapters .dest-chapter'));
    const io = new IntersectionObserver((ents) => ents.forEach((e) => {
      const el = e.target as HTMLElement;
      if (e.isIntersecting) el.setAttribute('data-seen', '');
      else if (e.boundingClientRect.top > 0) el.removeAttribute('data-seen');
    }), { rootMargin: '0px 0px -28% 0px', threshold: 0.2 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visibleHotels.length, showAllMobile, mobileLayout]);

  const handleClearAllFilters = () => {
    setSelectedCity('All Cities');
    setSelectedOccasion('All Occasions');
    setSelectedGenre('All Genres');
    setSearchQuery('');
  };

  // Featured destinations (display names on this page only; data untouched). Region 1/2/3 -> Goa/Thailand/Jaipur
  const DEST_NAMES: Record<string, string> = { 'Region 1': 'Goa', 'Region 2': 'Thailand', 'Region 3': 'Jaipur' };
  // Destination photos (Unsplash, free licence — dummy until client imagery). Goa/Thailand beaches, Jaipur fort.
  const DEST_IMG: Record<string, string> = {
    'Region 1': '/destinations/goa.jpg', 'Region 2': '/destinations/thailand.jpg', 'Region 3': '/destinations/jaipur.jpg',
    'Region 4': '/destinations/d4.jpg', 'Region 5': '/destinations/d5.jpg', 'Region 6': '/destinations/d6.jpg',
    'Region 7': '/destinations/d7.jpg', 'Region 8': '/destinations/d8.jpg', 'Region 9': '/destinations/d4.jpg'
  };
  const destImg = (h: HotelProperty) => DEST_IMG[h.city] || h.image;
  const destLabel = (city: string) => DEST_NAMES[city] || city.replace(/^Region (\d+)$/, 'Destination $1');
  const featured = ['Region 1', 'Region 2', 'Region 3']
    .map((c) => HOTELS_DATA.find((h) => h.city === c))
    .filter(Boolean) as HotelProperty[];
  const [hoverF, setHoverF] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const openAll = () => { setShowAll(true); setTimeout(() => listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60); };

  const hasActiveFilters = selectedDestinations.length > 0 || selectedCity !== 'All Cities' || selectedOccasion !== 'All Occasions' || selectedGenre !== 'All Genres' || searchQuery.trim() !== '';

  return (
    <div className="dest-page min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">

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

        <div className="on-photo absolute bottom-8 left-0 right-0">
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

        {/* Filter Bar — compact: 2 per row, labels inside the fields, count + reset on the last row; pinned under the header */}
        <div className="filter-bar dest-filter sticky z-20 bg-neutral-50/95 backdrop-blur-sm p-2.5 rounded-2xl border border-neutral-200">
          <div className="grid grid-cols-2 gap-2">
              <div className="min-w-0">
                <DestinationDropdown
                  selectedCountry={selectedCountry}
                  selectedDestinations={selectedDestinations}
                  onChange={setSelectedDestinations}
                  prefix="Destination:"
                  inputCls="filter-field relative flex items-center h-9 bg-white border border-neutral-300 hover:border-black focus-within:border-black rounded-xl pl-3.5 transition-colors pr-3 w-full text-xs font-sans"
                />
              </div>
              <label htmlFor="dest-occasion-filter-dropdown" className="filter-field relative flex items-center h-9 bg-white border border-neutral-300 hover:border-black focus-within:border-black rounded-xl pl-3.5 transition-colors">
                <span className="shrink-0 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Occasion:</span>
                <select id="dest-occasion-filter-dropdown" value={selectedOccasion} onChange={(e) => setSelectedOccasion(e.target.value)} className="flex-1 min-w-0 h-full appearance-none bg-transparent pl-2 pr-9 text-xs font-sans text-black font-medium focus:outline-none cursor-pointer truncate">
                  {occasionFilters.map((o) => (
                    <option key={o} value={o}>{o === 'All Occasions' ? 'All Occasions' : occasionLabels[o]}</option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 w-4 h-4 text-neutral-500" />
              </label>
              <label htmlFor="dest-genre-filter-dropdown" className="filter-field relative flex items-center h-9 bg-white border border-neutral-300 hover:border-black focus-within:border-black rounded-xl pl-3.5 transition-colors">
                <span className="shrink-0 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Genre:</span>
                <select id="dest-genre-filter-dropdown" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="flex-1 min-w-0 h-full appearance-none bg-transparent pl-2 pr-9 text-xs font-sans text-black font-medium focus:outline-none cursor-pointer truncate">
                  {genreFilters.map((o) => (
                    <option key={o} value={o}>{o === 'All Genres' ? 'All Genres' : genreLabels[o]}</option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 w-4 h-4 text-neutral-500" />
              </label>
              <div className="flex items-center gap-2 min-w-0">
                <label htmlFor="dest-hotel-search-input" className="filter-field relative flex items-center h-9 bg-white border border-neutral-300 hover:border-black focus-within:border-black rounded-xl pl-3.5 transition-colors flex-1 min-w-0">
                  <span className="sr-only">Search Destinations:</span>
                  <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current text-neutral-400 shrink-0"></span>
                  <input id="dest-hotel-search-input" type="text" placeholder="Search by destination..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
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
          <>
          {/* ═══ FEATURED — Goa · Thailand · Jaipur (Web only). Hover widens a panel and reveals its copy + CTA. ═══ */}
          {featured.length > 0 && (
            <section className="dest-featured" aria-label="Featured destinations">
              <div className="flex items-end justify-between mb-6">
                <div data-wm="" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-neutral-600">
                  <span className="block w-8 h-px bg-black/40" /><span>Featured Destinations</span>
                </div>
                <span data-wm="" className="text-[11px] uppercase tracking-[0.28em] text-neutral-400 tabular-nums">03 / {String(HOTELS_DATA.length).padStart(2, '0')}</span>
              </div>
              <div className="dest-featured-row flex gap-3 h-[min(72vh,620px)]" onMouseLeave={() => setHoverF(null)}>
                {featured.map((hotel, k) => {
                  const name = destLabel(hotel.city);
                  const active = mobileLayout || hoverF === k;
                  return (
                    <div key={hotel.city} data-wm="curtain" style={{ ['--d' as any]: `${k * 160}ms`, flexGrow: mobileLayout || hoverF === null ? 1 : hoverF === k ? 2.2 : 0.8 }}
                         className="dest-feat relative basis-0 min-w-0 cursor-pointer transition-[flex-grow] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                         onMouseEnter={() => !mobileLayout && setHoverF(k)} onFocus={() => !mobileLayout && setHoverF(k)}
                         onClick={() => handleOpenDestinationProperties(hotel)}>
                      <div className="dest-feat-inner absolute inset-0 overflow-hidden bg-neutral-200 rounded-sm" style={{ transitionDelay: `${k * 160}ms` }}>
                        <img src={destImg(hotel)} alt={name} data-real-photo=""
                             className={`w-full h-full object-cover transition-transform duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${active ? 'scale-[1.06]' : 'scale-100'}`}
                             onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }} />
                        <div className={`absolute inset-0 transition-opacity duration-1000 bg-gradient-to-t from-black/90 via-black/45 to-black/5 ${active ? 'opacity-100' : 'opacity-85'}`} />
                        <div className="on-photo absolute inset-x-0 bottom-0 p-7 text-white">
                          <span className="block text-[11px] uppercase tracking-[0.28em] text-white/75 mb-3 whitespace-nowrap">Lorem ipsum dolor sit amet</span>
                          <h3 className="font-serif font-normal leading-[0.95] tracking-[-0.015em] text-[clamp(2.2rem,3.6vw,3.6rem)] whitespace-nowrap">
                            <span className="text-white/55 mr-3 text-[0.55em] align-middle">{String(k + 1).padStart(2, '0')}</span>{name}
                          </h3>
                          <div className="grid transition-[grid-template-rows,opacity] duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                               style={{ gridTemplateRows: active ? '1fr' : '0fr', opacity: active ? 1 : 0 }}>
                            <div className="overflow-hidden">
                              <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-white/85">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                              <button type="button" onClick={(e) => { e.stopPropagation(); handleOpenDestinationProperties(hotel); }}
                                      className="group/cta mt-5 inline-flex items-center gap-3 bg-white text-black text-[11px] uppercase tracking-wider font-medium pl-6 pr-5 py-3 rounded-full cursor-pointer">
                                <span>Discover {name} Properties</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-700 group-hover/cta:translate-x-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <div className="dest-viewall flex justify-center mb-14">
                <button type="button" onClick={openAll}
                        className="group/va inline-flex items-center gap-4 border border-black text-black hover:bg-black hover:text-white text-[11px] uppercase tracking-[0.28em] font-medium pl-8 pr-6 py-4 rounded-full transition-colors duration-700 cursor-pointer">
                  <span>View All Destinations</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-700 rotate-90 group-hover/va:translate-y-1" />
                </button>
          </div>

          {/* ═══ DESTINATION CHAPTERS (all destinations) — experiential rows, B/W + motion. "go back" = git checkout tag checkpoint-before-dest-chapters ═══ */}
          {visibleHotels.length > 0 && (
            <div ref={listRef} className="dest-chapters space-y-20 lg:space-y-28 scroll-mt-[220px]">
              {visibleHotels.map((hotel, i) => {
                const num = String(filteredHotels.indexOf(hotel) + 1).padStart(2, '0');
                const destName = destLabel(hotel.city);
                const flip = i % 2 === 1;
                return (
                  <article key={hotel.id} className={`dest-chapter grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center`}>
                    {/* Image — curtain reveal; one line of text sits on the image */}
                    <div
                      data-wm="curtain"
                      onClick={() => handleOpenDestinationProperties(hotel)}
                      className={`dest-chapter-media lg:col-span-7 ${flip ? 'lg:order-2' : ''} cursor-pointer`}
                    >
                      <div className="relative aspect-video overflow-hidden bg-neutral-200 rounded-sm group">
                        <img
                          src={destImg(hotel)}
                          alt={destName}
                          data-real-photo=""
                          className="w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                        />
                        <span className="absolute top-4 right-4 bg-black/85 text-white text-[10px] uppercase tracking-wider font-sans px-2.5 py-0.5 rounded-full font-medium border border-white/20">
                          {destLabel(hotel.city)}
                        </span>
                        <div className="dest-chapter-overlay absolute inset-x-0 bottom-0 px-6 pt-16 pb-5 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                          <span className="block text-[11px] uppercase tracking-[0.28em] text-white font-sans font-medium">
                            Lorem ipsum dolor sit amet
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Text */}
                    <div className={`dest-chapter-text lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                      <h3
                        data-wm=""
                        onClick={() => handleOpenDestinationProperties(hotel)}
                        className="font-serif font-normal text-black leading-[1.05] tracking-[-0.01em] text-[clamp(2rem,3.4vw,3rem)] cursor-pointer hover:opacity-70 transition-opacity duration-700"
                      >
                        <span className="text-neutral-400 mr-3">{num}</span>{destName}
                      </h3>
                      <div data-wm="" style={{ ['--d' as any]: '140ms' }} className="mt-6 h-px w-16 bg-black/30" />
                      <p data-wm="" style={{ ['--d' as any]: '220ms' }} className="mt-6 text-sm font-sans text-neutral-600 font-light leading-relaxed max-w-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                      </p>
                      <p data-wm="" style={{ ['--d' as any]: '300ms' }} className="mt-3 text-[12px] text-neutral-500 font-sans italic">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                      <div data-wm="" style={{ ['--d' as any]: '380ms' }} className="mt-8">
                        <button
                          type="button"
                          onClick={() => handleOpenDestinationProperties(hotel)}
                          className="group/cta inline-flex items-center gap-3 bg-black hover:bg-neutral-800 text-white text-[11px] uppercase tracking-wider font-medium pl-6 pr-5 py-3 rounded-full transition-colors duration-700 cursor-pointer"
                        >
                          <span>Discover {destName} Properties</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-700 group-hover/cta:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

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
