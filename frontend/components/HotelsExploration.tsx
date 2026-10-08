import React, { useState } from 'react';
import { HOTELS_DATA } from '../constants';
import { HotelProperty } from '../types';
import { Users, BedDouble, Eye, ArrowRight, X, MapPin, Sparkles, Utensils, Check, Plane, ExternalLink } from 'lucide-react';

interface HotelsExplorationProps {
  onSelectHotel: (hotel: HotelProperty) => void;
  onViewAll?: () => void;
}

export const HotelsExploration: React.FC<HotelsExplorationProps> = ({ onSelectHotel, onViewAll }) => {
  // Landing section showcases top featured sanctuaries
  const featuredHotels = HOTELS_DATA.slice(0, 3);
  const [previewHotel, setPreviewHotel] = useState<HotelProperty | null>(null);

  const handleOpenFullPage = (hotel: HotelProperty) => {
    setPreviewHotel(null);
    onSelectHotel(hotel);
  };

  return (
    <section id="hotels-exploration" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with 'View All' CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-sans font-medium block mb-2">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-black font-normal mb-1">
              Hotels & Palaces
            </h2>
            <p className="text-xs text-neutral-500 font-sans font-light">
              Architectural sanctuaries across India with consecrated havan courtyards and segregated kitchens.
            </p>
          </div>

          {/* Prominent View All CTA */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onViewAll}
              className="inline-flex items-center space-x-2 text-xs font-sans uppercase tracking-widest bg-black text-white px-6 py-2.5 rounded-full hover:bg-neutral-800 transition-colors shadow-2xs font-medium cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Featured Hotel Cards with Dual Actions (Preview vs Full Page) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-white rounded-2xl border border-neutral-200 hover:border-black overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md"
            >
              <div>
                {/* Photo with Overlay (Click opens preview) */}
                <div 
                  onClick={() => setPreviewHotel(hotel)}
                  className="relative h-56 overflow-hidden bg-neutral-900 cursor-pointer"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/000000/FFFFFF?text=' + encodeURIComponent(hotel.name);
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-black text-[10px] uppercase tracking-wider font-sans px-2.5 py-0.5 rounded-full font-medium shadow-xs">
                    {hotel.brand}
                  </span>

                  <span className="absolute top-3 right-3 bg-black/85 text-white text-[10px] uppercase tracking-wider font-sans px-2.5 py-0.5 rounded-full font-medium border border-white/20">
                    {hotel.city}
                  </span>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-3 py-1.5 rounded-full text-xs font-sans font-medium flex items-center space-x-1.5 shadow-sm">
                      <Eye className="w-3.5 h-3.5 text-black" />
                      <span>Quick Preview</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-sans text-neutral-500 font-medium">
                      {hotel.location}
                    </span>
                    <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full font-medium">
                      {hotel.genre}
                    </span>
                  </div>

                  <h3 
                    onClick={() => handleOpenFullPage(hotel)}
                    className="font-serif text-lg font-normal text-black mb-2 hover:underline transition-colors cursor-pointer"
                  >
                    {hotel.name}
                  </h3>

                  <div className="flex items-center space-x-4 text-xs font-sans text-neutral-700 py-2 border-y border-neutral-200 mb-3">
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-black" />
                      <span>{hotel.capacityMin}–{hotel.capacityMax} Guests</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <BedDouble className="w-3.5 h-3.5 text-black" />
                      <span>{hotel.roomsCount} Rooms</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-500 font-sans italic mb-2">
                    Mandap: {hotel.mandapType}
                  </p>
                </div>
              </div>

              {/* Dual Action Buttons: Preview & Full Hotel Page */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2 text-xs font-sans">
                <button
                  type="button"
                  onClick={() => setPreviewHotel(hotel)}
                  className="w-full text-center border border-neutral-300 hover:border-black hover:bg-neutral-50 text-black text-[11px] uppercase tracking-wider font-medium py-2 rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>Preview</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenFullPage(hotel)}
                  className="w-full text-center bg-black hover:bg-neutral-800 text-white text-[11px] uppercase tracking-wider font-medium py-2 rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>Full Page</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* QUICK PREVIEW POPUP OVERLAY */}
      {previewHotel && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-opacity animate-fade-in font-sans">
          <div 
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-neutral-300 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={previewHotel.name}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewHotel(null)}
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-black hover:text-white text-black p-2 rounded-full shadow-md transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Hero Image in Popup */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
              <img
                src={previewHotel.image}
                alt={previewHotel.name}
                className="w-full h-full object-cover filter grayscale contrast-115"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/1000x500/000000/FFFFFF?text=' + encodeURIComponent(previewHotel.name);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-semibold mb-2">
                  <span className="bg-white text-black px-2.5 py-0.5 rounded-full">
                    {previewHotel.brand}
                  </span>
                  <span className="bg-white/20 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full">
                    {previewHotel.city}
                  </span>
                  <span className="bg-white/20 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full">
                    {previewHotel.genre}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {previewHotel.name}
                </h2>

                <p className="text-xs text-neutral-300 flex items-center space-x-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{previewHotel.location}</span>
                </p>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Key Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 bg-neutral-100 p-4 rounded-xl border border-neutral-200 text-center text-xs">
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Capacity</span>
                  <div className="font-serif text-lg font-bold text-black flex items-center justify-center space-x-1">
                    <Users className="w-4 h-4 text-black" />
                    <span>{previewHotel.capacityMin}–{previewHotel.capacityMax}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">Guests</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Accommodations</span>
                  <div className="font-serif text-lg font-bold text-black flex items-center justify-center space-x-1">
                    <BedDouble className="w-4 h-4 text-black" />
                    <span>{previewHotel.roomsCount} Keys</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">Rooms & Villas</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Pricing Tier</span>
                  <div className="font-serif text-sm font-semibold text-black mt-1">
                    {previewHotel.priceBand}
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
                  {previewHotel.overview || 'A premier IHG destination sanctuary engineered with dedicated ceremony lawns, consecrated havan courtyards, and secluded villas for multi-generational weddings.'}
                </p>
                {previewHotel.airportDistance && (
                  <div className="flex items-center space-x-1.5 text-xs text-neutral-800 mt-2 font-medium">
                    <Plane className="w-3.5 h-3.5 text-black" />
                    <span>Transit: {previewHotel.airportDistance}</span>
                  </div>
                )}
              </div>

              {/* Curated Celebration Spaces */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-black font-bold block mb-2.5">
                  Curated Celebration Spaces
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(previewHotel.curatedSpaces || [
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
                    {(previewHotel.culinaryHighlights || [
                      'Dedicated pure Jain and Sattvic kitchen lines',
                      'Live traditional halwai dessert stations',
                      'Simultaneous global coastal grills & continental bars'
                    ]).map((c, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Utensils className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
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
                    {previewHotel.keyHighlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
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
                    {previewHotel.mandapType}
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-neutral-400 shrink-0" />
              </div>

              {/* POPUP ACTION BUTTONS */}
              <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenFullPage(previewHotel)}
                  className="border border-neutral-300 hover:border-black text-black px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Open Dedicated Hotel Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <a
                  href="#contact"
                  onClick={() => setPreviewHotel(null)}
                  className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer text-center"
                >
                  <span>Enquire for This Sanctuary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
