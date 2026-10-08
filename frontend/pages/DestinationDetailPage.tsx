import React, { useState } from 'react';
import { Destination, HotelProperty } from '../types';
import { DESTINATIONS_DATA, HOTELS_DATA } from '../constants';
import { ArrowLeft, MapPin, Sun, ShieldCheck, Flame, Compass, Utensils, Volume2, Home, ArrowRight, BedDouble, Users, Sparkles } from 'lucide-react';

interface DestinationDetailPageProps {
  destinationId: string;
  onNavigateBack: () => void;
  onNavigateToHotel: (hotelId: string) => void;
  onNavigateToInquiry: (destinationName: string) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({
  destinationId,
  onNavigateBack,
  onNavigateToHotel,
  onNavigateToInquiry
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(destinationId);

  const destination: Destination =
    DESTINATIONS_DATA.find((d) => d.id === selectedDestId) || DESTINATIONS_DATA[0];

  // List of IHG Properties under this specific genre
  const genreHotels: HotelProperty[] = HOTELS_DATA.filter((h) => {
    return h.genre === destination.genre;
  });

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">
      
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Exploration</button>
            <span>/</span>
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Genres</button>
            <span>/</span>
            <span className="text-black font-medium">{destination.genre} ({destination.name})</span>
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
          src={destination.image}
          alt={`${destination.genre} - ${destination.name}`}
          className="w-full h-full object-cover filter grayscale contrast-115"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/1800x800/000000/FFFFFF?text=' + encodeURIComponent(destination.name);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="flex items-center space-x-2 mb-2.5">
              <span className="bg-white text-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold">
                Genre: {destination.genre}
              </span>
              <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium border border-white/20">
                {destination.name}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2">
              {destination.genre}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-light leading-relaxed flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
              <span>{destination.tagline}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Genre Selector Pills */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mr-1.5 shrink-0">
            Genres:
          </span>
          {DESTINATIONS_DATA.map((d) => {
            const isSelected = d.id === destination.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDestId(d.id)}
                className={`px-3 py-1 rounded-full text-xs font-sans whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white font-medium shadow-xs'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:border-black'
                }`}
              >
                {d.genre}
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
                Genre Overview & Architectural Vibe
              </span>
              <p className="font-serif text-xl sm:text-2xl text-black italic leading-snug">
                "{destination.heroSnippet}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
              {destination.editorial}
            </p>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold block mb-0.5">
                  The {destination.genre} Setting
                </span>
                <span className="font-serif text-sm text-black">
                  Curated signature backdrops, open-air ceremonial decks & acoustic ballroom zoning
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-black shrink-0 ml-3" />
            </div>
          </div>

          <div className="lg:col-span-4 bg-neutral-50 p-5 rounded-xl border border-neutral-200 space-y-4 text-xs">
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold block">
              {destination.genre} Fast Facts
            </span>

            <div>
              <span className="text-neutral-500 block mb-0.5">Optimal Climate Season</span>
              <div className="font-serif text-base text-black font-semibold flex items-center space-x-1.5">
                <Sun className="w-3.5 h-3.5 text-black" />
                <span>{destination.climateWindow}</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-neutral-200">
              <span className="text-neutral-500 block mb-0.5">Signature Venues</span>
              <ul className="space-y-0.5 text-black font-medium text-[11px]">
                {destination.signatureVenues.map((v, i) => (
                  <li key={i}>• {v}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2.5 border-t border-neutral-200">
              <span className="text-neutral-500 block mb-0.5">Ceremonial Audit Status</span>
              <div className="flex items-center space-x-1.5 text-black font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-black" />
                <span>100% Certified (5-Point Audit)</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateToInquiry(destination.genre)}
              className="w-full bg-black hover:bg-neutral-800 text-white py-2.5 rounded-lg uppercase tracking-wider text-xs font-medium transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Enquire for {destination.genre}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SECTION: LIST OF IHG PROPERTIES UNDER THIS GENRE */}
        <div className="pt-6 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
                Portfolio under {destination.genre}
              </span>
              <h2 className="font-serif text-2xl text-black font-normal">
                IHG Properties ({genreHotels.length} Sanctuaries)
              </h2>
              <p className="text-xs text-neutral-500 font-light mt-0.5">
                Explore properties offering authentic {destination.genre.toLowerCase()} settings and specialized event infrastructure.
              </p>
            </div>
            <span className="text-xs text-neutral-400 font-light">
              Click any property to inspect full sanctuary showcase & layouts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genreHotels.map((hotel) => (
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
                    />
                    <span className="absolute top-3 left-3 bg-white/95 text-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-medium">
                      {hotel.brand}
                    </span>
                    <span className="absolute top-3 right-3 bg-black text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium border border-white/20">
                      {hotel.priceBand}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                      {hotel.location}
                    </div>

                    <h3 className="font-serif text-lg font-normal text-black mb-1 group-hover:underline">
                      {hotel.name}
                    </h3>

                    <p className="text-xs text-neutral-600 font-light mb-3 line-clamp-2">
                      {hotel.overview}
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-neutral-700 py-2 border-y border-neutral-200 mb-2">
                      <span className="flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-black" />
                        <span>{hotel.capacityMin}–{hotel.capacityMax} Guests</span>
                      </span>
                      <span className="flex items-center space-x-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-black" />
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
                    className="w-full text-center border border-neutral-300 group-hover:bg-black group-hover:text-white text-black text-[11px] uppercase tracking-wider font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>View Sanctuary Showcase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Point Ceremonial Readiness for this genre */}
        <div className="pt-6 border-t border-neutral-200">
          <div className="max-w-2xl mb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
              Sanctuary Standards
            </span>
            <h2 className="font-serif text-2xl text-black font-normal">
              5-Point Ceremonial Audit for {destination.genre}
            </h2>
            <p className="text-xs text-neutral-500 font-light mt-0.5">
              Guaranteed operational infrastructure certified across our {destination.genre.toLowerCase()} portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-black mb-3">
                  <Flame className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-serif text-sm font-normal text-black mb-1">
                  {destination.readiness.havanFireSpace.title}
                </h3>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  {destination.readiness.havanFireSpace.detail}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center space-x-1 text-[10px] text-black font-semibold">
                <span className="inline-block w-2 h-2 bg-black shrink-0" />
                <span>Vedic Fire Certified</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-black mb-3">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-serif text-sm font-normal text-black mb-1">
                  {destination.readiness.baraatRoute.title}
                </h3>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  {destination.readiness.baraatRoute.detail}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center space-x-1 text-[10px] text-black font-semibold">
                <span className="inline-block w-2 h-2 bg-black shrink-0" />
                <span>Processional Verified</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-black mb-3">
                  <Utensils className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-serif text-sm font-normal text-black mb-1">
                  {destination.readiness.dietarySegregation.title}
                </h3>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  {destination.readiness.dietarySegregation.detail}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center space-x-1 text-[10px] text-black font-semibold">
                <span className="inline-block w-2 h-2 bg-black shrink-0" />
                <span>Strict Sattvic Custody</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-black mb-3">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-serif text-sm font-normal text-black mb-1">
                  {destination.readiness.lateNightAcoustics.title}
                </h3>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  {destination.readiness.lateNightAcoustics.detail}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center space-x-1 text-[10px] text-black font-semibold">
                <span className="inline-block w-2 h-2 bg-black shrink-0" />
                <span>Soundproofed 98dB</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-black mb-3">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-serif text-sm font-normal text-black mb-1">
                  {destination.readiness.vipSuites.title}
                </h3>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  {destination.readiness.vipSuites.detail}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center space-x-1 text-[10px] text-black font-semibold">
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