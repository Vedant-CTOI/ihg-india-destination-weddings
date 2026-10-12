import React from 'react';
import { Destination } from '../types';
import { ArrowRight } from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onSelectForInquiry: (destination: Destination) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onSelectForInquiry
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-opacity animate-fade-in font-sans">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-neutral-300 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`${destination.name} Comprehensive Dossier`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/95 hover:bg-black hover:text-white text-black p-2 rounded-full shadow-md transition-colors"
          aria-label="Close"
        >
          <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
        </button>

        {/* Hero Architectural Vistas */}
        <div className="relative h-64 sm:h-84 w-full overflow-hidden bg-black">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover filter grayscale contrast-115"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E' + encodeURIComponent(destination.name);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="bg-white text-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-semibold mb-2 inline-block">
              {destination.vibe}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              {destination.name}
            </h2>
            <p className="text-xs text-neutral-300 flex items-center space-x-1.5 mt-1 font-light">
              <span aria-hidden="true" className="w-3.5 h-3.5  shrink-0 inline-block border border-current"></span>
              <span>{destination.tagline}</span>
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Executive Editorial Summary */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block mb-1">
              Destination Character & Legacy
            </span>
            <p className="font-serif text-lg text-black italic mb-2">
              "{destination.heroSnippet}"
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              {destination.editorial}
            </p>
          </div>

          {/* Quick Metrics & Climate Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-neutral-100 p-4 rounded-xl border border-neutral-200 text-xs">
            <div>
              <span className="text-[10px] uppercase text-neutral-500 block mb-0.5 font-semibold">Climate Window</span>
              <div className="font-medium text-black flex items-center space-x-1.5">
                <span aria-hidden="true" className="w-3.5 h-3.5  shrink-0 inline-block border border-current"></span>
                <span>{destination.climateWindow}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 block mb-0.5 font-semibold">Signature Venues</span>
              <div className="font-medium text-black truncate">
                {destination.signatureVenues.join(' • ')}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 block mb-0.5 font-semibold">Certification</span>
              <div className="font-medium text-black flex items-center space-x-1">
                <span aria-hidden="true" className="w-3.5 h-3.5  shrink-0 inline-block border border-current"></span>
                <span>IHG 5-Point Ceremonial Audit</span>
              </div>
            </div>
          </div>

          {/* 5-Point Ceremonial Readiness Audit */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-black font-bold block mb-3">
              Certified Ceremonial Logistics (5-Point Audit)
            </span>
            <div className="space-y-2.5 text-xs font-sans">
              
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start space-x-3">
                <div className="p-2 bg-white rounded-lg border border-neutral-200 text-black shrink-0">
                  <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-black">{destination.readiness.havanFireSpace.title}</span>
                    <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                  </div>
                  <p className="text-[11px] text-neutral-600 font-light mt-0.5">
                    {destination.readiness.havanFireSpace.detail}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start space-x-3">
                <div className="p-2 bg-white rounded-lg border border-neutral-200 text-black shrink-0">
                  <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-black">{destination.readiness.baraatRoute.title}</span>
                    <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                  </div>
                  <p className="text-[11px] text-neutral-600 font-light mt-0.5">
                    {destination.readiness.baraatRoute.detail}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start space-x-3">
                <div className="p-2 bg-white rounded-lg border border-neutral-200 text-black shrink-0">
                  <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-black">{destination.readiness.dietarySegregation.title}</span>
                    <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                  </div>
                  <p className="text-[11px] text-neutral-600 font-light mt-0.5">
                    {destination.readiness.dietarySegregation.detail}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start space-x-3">
                  <div className="p-2 bg-white rounded-lg border border-neutral-200 text-black shrink-0">
                    <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
                  </div>
                  <div>
                    <span className="font-semibold text-black block">{destination.readiness.lateNightAcoustics.title}</span>
                    <p className="text-[11px] text-neutral-600 font-light mt-0.5">
                      {destination.readiness.lateNightAcoustics.detail}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start space-x-3">
                  <div className="p-2 bg-white rounded-lg border border-neutral-200 text-black shrink-0">
                    <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
                  </div>
                  <div>
                    <span className="font-semibold text-black block">{destination.readiness.vipSuites.title}</span>
                    <p className="text-[11px] text-neutral-600 font-light mt-0.5">
                      {destination.readiness.vipSuites.detail}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Sample 3-Day Ceremonial Run of Show Blueprint */}
          <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200">
            <span className="text-[10px] uppercase tracking-wider text-black font-bold block mb-3">
              Sample 3-Day Ceremonial Blueprint ({destination.name})
            </span>
            <div className="space-y-3 text-xs font-sans">
              <div className="flex justify-between items-start pb-2.5 border-b border-neutral-200">
                <div className="w-24 font-semibold text-black shrink-0">Day 1 • Sunset</div>
                <div className="flex-1 px-3 text-neutral-700 font-light">Welcome High-Tea, Henna Pavilions & Starlit Folk Acoustic Soirée</div>
                <div className="text-[11px] text-neutral-500 shrink-0 font-medium">{destination.signatureVenues[0] || 'Terrace'}</div>
              </div>
              <div className="flex justify-between items-start pb-2.5 border-b border-neutral-200">
                <div className="w-24 font-semibold text-black shrink-0">Day 2 • Morning</div>
                <div className="flex-1 px-3 text-neutral-700 font-light">Auspicious Vedic Sunrise Muhurtham & Consecrated 4-Hour Havan</div>
                <div className="text-[11px] text-neutral-500 shrink-0 font-medium">Sacred Mandap Deck</div>
              </div>
              <div className="flex justify-between items-start pb-2.5 border-b border-neutral-200">
                <div className="w-24 font-semibold text-black shrink-0">Day 2 • Night</div>
                <div className="flex-1 px-3 text-neutral-700 font-light">High-Energy Gala Sangeet with Sound-Isolated Afterparty (Late Curfew)</div>
                <div className="text-[11px] text-neutral-500 shrink-0 font-medium">{destination.signatureVenues[1] || 'Grand Ballroom'}</div>
              </div>
              <div className="flex justify-between items-start">
                <div className="w-24 font-semibold text-black shrink-0">Day 3 • Noon</div>
                <div className="flex-1 px-3 text-neutral-700 font-light">Royal Farewell Feast with Segregated Sattvic & Global Live Galleys</div>
                <div className="text-[11px] text-neutral-500 shrink-0 font-medium">Banquet Arena</div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Action Bar */}
          <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-neutral-500 font-light">
              On-ground Luxury Wedding Director assigned upon date selection.
            </span>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none border border-neutral-300 hover:border-black text-black text-xs uppercase tracking-wider font-medium px-5 py-2.5 rounded-full transition-colors"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  onSelectForInquiry(destination);
                  onClose();
                }}
                className="flex-1 sm:flex-none bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium px-6 py-2.5 rounded-full transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Select & Request Dates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
