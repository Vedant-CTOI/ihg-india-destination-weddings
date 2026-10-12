import React, { useState, useEffect, useRef } from 'react';
import { WEDDING_GENRES_DATA } from '../constants';
import { WeddingGenreInfo } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface DestinationDiscoveryProps {
  onOpenDetail?: (genre: WeddingGenreInfo) => void;
}

export const DestinationDiscovery: React.FC<DestinationDiscoveryProps> = ({ onOpenDetail }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  const totalGenres = WEDDING_GENRES_DATA.length;
  const activeGenre = WEDDING_GENRES_DATA[currentIndex] || WEDDING_GENRES_DATA[0];

  // Fast auto cycling progression (1100ms); smoothly pauses on hover
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalGenres);
      }, 1100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, totalGenres]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalGenres);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalGenres) % totalGenres);
  };

  const handleOpenDetail = () => {
    if (onOpenDetail) {
      onOpenDetail(activeGenre);
    }
  };

  return (
    <section id="destinations" className="py-14 sm:py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header — CTA top right, like other sections */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans font-medium block mb-1">
              Curated Wedding Types
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-black font-normal mb-1.5">
              Discover by Genre
            </h2>
            <p className="font-sans text-neutral-500 text-xs font-light leading-relaxed">
              Explore your celebration by its ceremonial format, ritual atmosphere, and aesthetic setting.
            </p>
          </div>

          {/* Explore CTA top right */}
          <div className="flex items-center gap-3 text-xs font-sans text-neutral-500">
            <button
              type="button"
              onClick={handleOpenDetail}
              className="inline-flex items-center space-x-2 text-[11px] font-sans uppercase tracking-wider bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-lg transition-colors font-medium cursor-pointer shadow-2xs"
            >
              <span>Explore Genre {currentIndex + 1} Dossier & Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Automatic Horizontal Carousel Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-white rounded-xl border border-neutral-300 overflow-hidden shadow-2xs group"
        >
          {/* Subtle Carousel Progress Line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-100 z-30">
            <div
              className={`h-full bg-black transition-all ${
                isHovered ? 'opacity-40' : 'duration-300'
              }`}
              style={{ width: `${((currentIndex + 1) / totalGenres) * 100}%` }}
            />
          </div>

          {/* Carousel Arrows — floating on the image sides */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-white/30 bg-black/50 hover:bg-black backdrop-blur-xs text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous wedding genre"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-white/30 bg-black/50 hover:bg-black backdrop-blur-xs text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next wedding genre"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Full-bleed image with text overlaid — fills the entire carousel container */}
          <div
            onClick={handleOpenDetail}
            className="relative h-[30rem] lg:h-[34rem] overflow-hidden bg-black cursor-pointer group"
          >
            <img
              key={activeGenre.id}
              src={activeGenre.image}
              alt={`${activeGenre.genre} Wedding Type`}
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-103 transition-transform duration-700 animate-fade-in"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E' + encodeURIComponent(activeGenre.genre);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-white/10" />

            {/* Text over image — black on a bright wash */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-black">
              <div className="flex items-center space-x-2 text-[10px] font-sans text-neutral-600 uppercase tracking-widest mb-2">
                <span className="bg-black text-white px-2.5 py-0.5 rounded-full font-bold">Genre {currentIndex + 1}</span>
                <span className="hidden sm:inline">{activeGenre.tagline}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-normal mb-2.5">
                Genre {currentIndex + 1} Atmosphere
              </h3>

              <p className="font-serif text-sm sm:text-base italic text-neutral-700 leading-snug max-w-2xl line-clamp-2 mb-4">
                "{activeGenre.heroSnippet}"
              </p>

              {/* Minimal facts row over image */}
              <div className="flex flex-wrap gap-x-8 gap-y-1.5 pt-3 border-t border-black/15 text-[11px] font-sans text-neutral-800">
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider text-[9px] block">Ideal Scale</span>
                  {activeGenre.idealScale}
                </div>
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider text-[9px] block">Season</span>
                  {activeGenre.recommendedSeason}
                </div>
                <div>
                  <span className="text-neutral-500 uppercase tracking-wider text-[9px] block">Key Ritual</span>
                  {activeGenre.signatureRituals[0]}
                </div>
              </div>
            </div>

            {/* (CTA lives top-right of the section header) */}
          </div>

        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center items-center space-x-1.5 mt-4">
          {WEDDING_GENRES_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? 'w-6 bg-black' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
