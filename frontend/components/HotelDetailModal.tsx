import React from 'react';
import { HotelProperty } from '../types';
import { ArrowRight } from 'lucide-react';

interface HotelDetailModalProps {
  hotel: HotelProperty | null;
  onClose: () => void;
  onSelectForInquiry: (hotel: HotelProperty) => void;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({
  hotel,
  onClose,
  onSelectForInquiry
}) => {
  if (!hotel) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-opacity animate-fade-in font-sans">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-neutral-300 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={hotel.name}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-black hover:text-white text-black p-2 rounded-full shadow-md transition-colors"
          aria-label="Close"
        >
          <span aria-hidden="true" className="text-xl font-light leading-none">✕</span>
        </button>

        {/* Hero Banner (Grayscale) */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover filter grayscale contrast-115"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E' + encodeURIComponent(hotel.name);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-semibold mb-2">
              <span className="bg-white text-black px-2.5 py-0.5 rounded-full">
                {hotel.brand}
              </span>
              <span className="bg-white/20 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full">
                {hotel.priceBand}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              {hotel.name}
            </h2>

            <p className="text-xs text-neutral-300 flex items-center space-x-1.5 mt-1">
              <span aria-hidden="true" className="w-3.5 h-3.5  shrink-0 inline-block border border-current"></span>
              <span>{hotel.location}</span>
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
                <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
                <span>{hotel.capacityMin}–{hotel.capacityMax}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 block">Accommodations</span>
              <div className="font-serif text-lg font-bold text-black flex items-center justify-center space-x-1">
                <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
                <span>{hotel.roomsCount} Keys</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 block">Primary Style</span>
              <div className="font-serif text-sm font-semibold text-black mt-1">
                {hotel.traditionFormats.join(', ')}
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block mb-1">
              Sanctuary Overview
            </span>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              {hotel.overview || 'A premier IHG destination sanctuary engineered with dedicated ceremony lawns, consecrated havan courtyards, and secluded villas for multi-generational weddings.'}
            </p>
            {hotel.airportDistance && (
              <div className="flex items-center space-x-1.5 text-xs text-neutral-800 mt-2 font-medium">
                <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                <span>Transit: {hotel.airportDistance}</span>
              </div>
            )}
          </div>

          {/* Curated Celebration Spaces */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-black font-bold block mb-2.5">
              Curated Celebration Spaces
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(hotel.curatedSpaces || [
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
                {(hotel.culinaryHighlights || [
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
                Ceremony Highlights
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                {hotel.keyHighlights.map((h, i) => (
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
                {hotel.mandapType}
              </div>
            </div>
            <span aria-hidden="true" className="w-5 h-5  shrink-0 inline-block border border-current"></span>
          </div>

          {/* CTA Bar */}
          <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-neutral-500">
              IHG Destination Wedding Director assigned upon inquiry.
            </span>
            <button
              onClick={() => {
                onSelectForInquiry(hotel);
                onClose();
              }}
              className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all shadow-sm flex items-center justify-center space-x-2"
            >
              <span>Enquire for {hotel.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
