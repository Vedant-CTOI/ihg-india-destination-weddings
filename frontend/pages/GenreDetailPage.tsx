import React, { useState, useMemo } from 'react';
import { WeddingGenreInfo, HotelProperty } from '../types';
import { WEDDING_GENRES_DATA, HOTELS_DATA } from '../constants';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

interface GenreDetailPageProps {
  genreId: string;
  onNavigateBack: () => void;
  onNavigateToHotel: (hotelId: string) => void;
  onNavigateToInquiry: (genreTitle: string) => void;
}

export const GenreDetailPage: React.FC<GenreDetailPageProps> = ({
  genreId,
  onNavigateBack,
  onNavigateToHotel,
  onNavigateToInquiry
}) => {
  const [selectedGenreId, setSelectedGenreId] = useState<string>(genreId);
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState<string>('All Destinations');

  const genreInfo: WeddingGenreInfo =
    WEDDING_GENRES_DATA.find((g) => g.id === selectedGenreId) || WEDDING_GENRES_DATA[0];

  const allGenreHotels: HotelProperty[] = useMemo(() => {
    return HOTELS_DATA.filter((h) => h.genre === genreInfo.genre);
  }, [genreInfo.genre]);

  const availableDestinations = useMemo(() => {
    const destSet = new Set<string>();
    allGenreHotels.forEach((h) => {
      destSet.add(h.region);
    });
    return ['All Destinations', ...Array.from(destSet)];
  }, [allGenreHotels]);

  const filteredHotels: HotelProperty[] = useMemo(() => {
    if (selectedDestinationFilter === 'All Destinations') {
      return allGenreHotels;
    }
    return allGenreHotels.filter(
      (h) => h.region === selectedDestinationFilter || h.location.toLowerCase().includes(selectedDestinationFilter.toLowerCase())
    );
  }, [allGenreHotels, selectedDestinationFilter]);

  const handleGenreSwitch = (newGenreId: string) => {
    setSelectedGenreId(newGenreId);
    setSelectedDestinationFilter('All Destinations');
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">
      
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Exploration</button>
            <span>/</span>
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Wedding Genres</button>
            <span>/</span>
            <span className="text-black font-medium">{genreInfo.genre}</span>
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

      {/* Hero Banner (Grayscale Luxury) without Celebrations in title */}
      <div className="relative h-[420px] lg:h-[480px] w-full overflow-hidden bg-black">
        <img
          src={genreInfo.image}
          alt={`${genreInfo.genre} Wedding Type`}
          className="w-full h-full object-cover filter grayscale contrast-115"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/1800x800/000000/FFFFFF?text=' + encodeURIComponent(genreInfo.genre);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="flex items-center space-x-2 mb-2.5">
              <span className="bg-white text-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold">
                Wedding Genre
              </span>
              <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium border border-white/20">
                {genreInfo.vibe}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2">
              {genreInfo.genre}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-light leading-relaxed">
              {genreInfo.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Genre Selector Pills */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mr-1.5 shrink-0">
            Switch Genre:
          </span>
          {WEDDING_GENRES_DATA.map((g) => {
            const isSelected = g.id === genreInfo.id;
            return (
              <button
                key={g.id}
                onClick={() => handleGenreSwitch(g.id)}
                className={`px-3 py-1 rounded-full text-xs font-sans whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white font-medium shadow-xs'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:border-black'
                }`}
              >
                {g.genre}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Genre Vibe Overview & Vital Signs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-5">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1.5">
                Ceremonial Philosophy & Setting
              </span>
              <p className="font-serif text-xl sm:text-2xl text-black italic leading-snug">
                "{genreInfo.heroSnippet}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
              {genreInfo.editorial}
            </p>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold block mb-0.5">
                  The {genreInfo.genre} Atmosphere
                </span>
                <span className="font-serif text-sm text-black">
                  {genreInfo.weddingAtmosphere}
                </span>
              </div>
              <span className="inline-block w-3 h-3 border border-black shrink-0 ml-3" />
            </div>
          </div>

          <div className="lg:col-span-4 bg-neutral-50 p-5 rounded-xl border border-neutral-200 space-y-4 text-xs">
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold block">
              {genreInfo.genre} Specifications
            </span>

            <div>
              <span className="text-neutral-500 block mb-0.5">Recommended Season</span>
              <div className="font-serif text-base text-black font-semibold flex items-center space-x-2">
                <span className="inline-block w-2.5 h-2.5 border border-black shrink-0" />
                <span>{genreInfo.recommendedSeason}</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-neutral-200">
              <span className="text-neutral-500 block mb-0.5">Ideal Guest Scale</span>
              <span className="text-black font-medium">{genreInfo.idealScale}</span>
            </div>

            <div className="pt-2.5 border-t border-neutral-200">
              <span className="text-neutral-500 block mb-0.5">Key Ceremonial Milestones</span>
              <ul className="space-y-1 text-black font-medium text-[11px]">
                {genreInfo.signatureRituals.map((r, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-black shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onNavigateToInquiry(genreInfo.genre)}
              className="w-full bg-black hover:bg-neutral-800 text-white py-2.5 rounded-lg uppercase tracking-wider text-xs font-medium transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
            >
              <span>Enquire for {genreInfo.genre}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SECTION: LIST OF IHG PROPERTIES UNDER THIS GENRE WITH DESTINATION DROPDOWN FILTER */}
        <div className="pt-6 border-t border-neutral-200">
          
          {/* Header with Destination Dropdown Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
                Sanctuaries Under {genreInfo.genre}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black">
                Choose Properties by Destination
              </h2>
              <p className="text-xs text-neutral-500 font-light mt-0.5">
                Showing {filteredHotels.length} {filteredHotels.length === 1 ? 'property' : 'properties'} curated to host {genreInfo.genre.toLowerCase()} formats.
              </p>
            </div>

            {/* Destination Dropdown Selector */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative inline-block w-full sm:w-64 font-sans">
                <label htmlFor="destination-filter-select" className="block text-[9px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                  Filter Destination:
                </label>
                <div className="relative">
                  <select
                    id="destination-filter-select"
                    value={selectedDestinationFilter}
                    onChange={(e) => setSelectedDestinationFilter(e.target.value)}
                    className="w-full appearance-none bg-white border border-neutral-300 hover:border-black rounded-lg px-3.5 py-2 pr-9 text-xs font-sans text-black font-medium shadow-2xs focus:outline-none focus:border-black transition-colors cursor-pointer"
                  >
                    {availableDestinations.map((dest) => (
                      <option key={dest} value={dest}>
                        {dest === 'All Destinations' ? 'All Destinations' : `Destination: ${dest}`}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {selectedDestinationFilter !== 'All Destinations' && (
                <button
                  onClick={() => setSelectedDestinationFilter('All Destinations')}
                  className="text-[11px] text-neutral-500 hover:text-black font-medium underline uppercase tracking-wider cursor-pointer whitespace-nowrap self-end sm:self-center"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Properties Grid */}
          {filteredHotels.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300">
              <span className="inline-block w-8 h-8 border border-neutral-400 mx-auto mb-2" />
              <p className="font-serif text-lg text-black mb-1">No sanctuaries found for this specific destination under {genreInfo.genre}.</p>
              <p className="text-xs text-neutral-500 font-light mb-4">Try selecting 'All Destinations' to view all available properties.</p>
              <button
                onClick={() => setSelectedDestinationFilter('All Destinations')}
                className="bg-black text-white text-xs px-4 py-2 rounded-full cursor-pointer uppercase tracking-wider font-medium"
              >
                Show All Destinations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  onClick={() => onNavigateToHotel(hotel.id)}
                  className="group bg-white rounded-2xl border border-neutral-200 hover:border-black overflow-hidden transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 overflow-hidden bg-neutral-900">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-103 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/000000/FFFFFF?text=' + encodeURIComponent(hotel.name);
                        }}
                      />
                      <span className="absolute top-3 left-3 bg-white/95 text-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium">
                        {hotel.brand}
                      </span>
                      <span className="absolute top-3 right-3 bg-black text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium border border-white/20">
                        {hotel.region}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                        <span className="inline-block w-1.5 h-1.5 bg-black shrink-0" />
                        <span>{hotel.location}</span>
                      </div>

                      <h3 className="font-serif text-lg font-normal text-black mb-1 group-hover:underline">
                        {hotel.name}
                      </h3>

                      <p className="text-xs text-neutral-600 font-light mb-3 line-clamp-2">
                        {hotel.overview}
                      </p>

                      <div className="flex items-center space-x-4 text-xs text-neutral-700 py-2 border-y border-neutral-200 mb-2">
                        <span className="flex items-center space-x-1.5">
                          <span className="inline-block w-2 h-2 border border-black shrink-0" />
                          <span>{hotel.capacityMin}–{hotel.capacityMax} Guests</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <span className="inline-block w-2 h-2 bg-neutral-400 shrink-0" />
                          <span>{hotel.roomsCount} Rooms</span>
                        </span>
                      </div>

                      <p className="text-[11px] text-neutral-500 italic">
                        Mandap: {hotel.mandapType}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      className="w-full text-center border border-neutral-300 group-hover:bg-black group-hover:text-white text-black text-[11px] uppercase tracking-wider font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Inspect Hotel Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5-Point Ceremonial Readiness for this genre */}
        <div className="pt-6 border-t border-neutral-200">
          <div className="max-w-2xl mb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
              Sanctuary Standards
            </span>
            <h2 className="font-serif text-2xl text-black font-normal">
              5-Point Ceremonial Audit for {genreInfo.genre}
            </h2>
            <p className="text-xs text-neutral-500 font-light mt-0.5">
              Guaranteed operational infrastructure certified across our {genreInfo.genre.toLowerCase()} portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-black mb-3">
                  <span className="inline-block w-3 h-3 border border-black" />
                </div>
                <h3 className="font-serif text-sm font-normal text-black mb-1">
                  {genreInfo.readiness.havanFireSpace.title}
                </h3>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  {genreInfo.readiness.havanFireSpace.detail}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center space-x-1.5 text-[10px] text-black font-semibold">
                <span className="inline-block w-2 h-2 bg-black shrink-0" />
                <span>Vedic Fire Certified</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-black mb-3">
                  <span className="inline-block w-3 h-3 border border-black" />
                </div>
                <h3 className="font-serif text-sm font-normal text-black mb-1">
                  {genreInfo.readiness.baraatRoute.title}
                </h3>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  {genreInfo.readiness.baraatRoute.detail}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center space-x-1.5 text-[10px] text-black font-semibold">
                <span className="inline-block w-2 h-2 bg-black shrink-0" />
                <span>Processional Verified</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-black mb-3">
                  <span className="inline-block w-3 h-3 border border-black" />
                </div>
                <h3 className="font-serif text-sm font-normal text-black mb-1">
                  {genreInfo.readiness.dietarySegregation.title}
                </h3>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  {genreInfo.readiness.dietarySegregation.detail}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center space-x-1.5 text-[10px] text-black font-semibold">
                <span className="inline-block w-2 h-2 bg-black shrink-0" />
                <span>Strict Sattvic Custody</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-black mb-3">
                  <span className="inline-block w-3 h-3 border border-black" />
                </div>
                <h3 className="font-serif text-sm font-normal text-black mb-1">
                  {genreInfo.readiness.lateNightAcoustics.title}
                </h3>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  {genreInfo.readiness.lateNightAcoustics.detail}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center space-x-1.5 text-[10px] text-black font-semibold">
                <span className="inline-block w-2 h-2 bg-black shrink-0" />
                <span>Soundproofed 98dB</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-black mb-3">
                  <span className="inline-block w-3 h-3 border border-black" />
                </div>
                <h3 className="font-serif text-sm font-normal text-black mb-1">
                  {genreInfo.readiness.vipSuites.title}
                </h3>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  {genreInfo.readiness.vipSuites.detail}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center space-x-1.5 text-[10px] text-black font-semibold">
                <span className="inline-block w-2 h-2 bg-black shrink-0" />
                <span>Multi-Generational Villas Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};