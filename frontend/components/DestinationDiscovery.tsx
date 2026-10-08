import React, { useState, useEffect, useRef } from 'react';
import { WEDDING_GENRES_DATA } from '../constants';
import { WeddingGenreInfo } from '../types';
import { Check, ArrowRight, Pause, Play, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface DestinationDiscoveryProps {
  onOpenDetail?: (genre: WeddingGenreInfo) => void;
}

export const DestinationDiscovery: React.FC<DestinationDiscoveryProps> = ({ onOpenDetail }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  const totalGenres = WEDDING_GENRES_DATA.length;
  const activeGenre = WEDDING_GENRES_DATA[currentIndex] || WEDDING_GENRES_DATA[0];

  // Faster auto cycling progression (2600ms); smoothly pauses on hover
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalGenres);
      }, 2600);
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
        
        {/* Section Header */}
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

          {/* Carousel Status / Manual Controls */}
          <div className="flex items-center space-x-3 text-xs font-sans text-neutral-500">
            <div className="flex items-center space-x-1">
              {isHovered ? (
                <span className="inline-flex items-center space-x-1 text-[11px] text-black font-medium">
                  <Pause className="w-3 h-3" />
                  <span>Paused on hover</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1 text-[11px] text-neutral-400">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>Cycling</span>
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handlePrev}
                className="w-7 h-7 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-black transition-colors cursor-pointer bg-white"
                aria-label="Previous wedding genre"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="w-7 h-7 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-black transition-colors cursor-pointer bg-white"
                aria-label="Next wedding genre"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Reduced-Size Image Column */}
            <div 
              onClick={handleOpenDetail}
              className="lg:col-span-4 relative h-48 sm:h-56 lg:h-auto min-h-[190px] max-h-[300px] bg-black cursor-pointer overflow-hidden"
            >
              <img
                key={activeGenre.id}
                src={activeGenre.image}
                alt={`${activeGenre.genre} Wedding Type`}
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-103 transition-transform duration-700 animate-fade-in"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/800x1000/000000/FFFFFF?text=' + encodeURIComponent(activeGenre.genre);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-white text-black text-[9px] font-sans uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                  {activeGenre.genre}
                </span>
              </div>

              {/* Hover Badge */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white/95 text-black text-[9px] font-sans uppercase tracking-widest px-2.5 py-0.5 rounded-full font-medium shadow-xs flex items-center space-x-1">
                  <span>Explore</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>

              {/* Bottom Quote Snippet */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[9px] uppercase tracking-widest text-neutral-300 font-sans block mb-0.5">
                  {activeGenre.vibe}
                </span>
                <p className="font-serif text-xs italic text-neutral-100 leading-snug line-clamp-2">
                  "{activeGenre.heroSnippet}"
                </p>
              </div>
            </div>

            {/* Editorial & Wedding Type Information */}
            <div className="lg:col-span-8 p-5 sm:p-7 flex flex-col justify-between">
              <div>
                
                {/* Genre Tagline */}
                <div className="flex items-center space-x-2 text-[10px] font-sans text-neutral-400 uppercase tracking-wider mb-1">
                  <span className="font-semibold text-black">{activeGenre.genre}</span>
                  <span>•</span>
                  <span>{activeGenre.tagline}</span>
                </div>

                {/* Genre Title */}
                <h3 className="font-serif text-xl sm:text-2xl text-black font-normal mb-2 flex items-center space-x-2">
                  <span>{activeGenre.genre} Atmosphere</span>
                  <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                </h3>

                {/* Editorial text focused on celebration format */}
                <p className="text-xs text-neutral-600 font-light leading-relaxed mb-4">
                  {activeGenre.editorial}
                </p>

                {/* Signature Ritual Formats & Recommended Scale */}
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 py-2.5 border-y border-neutral-200 text-[11px] font-sans text-neutral-700 mb-4">
                  <div>
                    <span className="text-neutral-400 font-medium">Ideal Scale:</span> {activeGenre.idealScale}
                  </div>
                  <div>
                    <span className="text-neutral-400 font-medium">Key Rituals:</span> {activeGenre.signatureRituals.slice(0, 3).join(' • ')}
                  </div>
                </div>

                {/* Ceremonial Readiness Specification */}
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-sans font-semibold block mb-2">
                    Ceremonial Readiness for {activeGenre.genre}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                    <div className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-black text-[11px]">{activeGenre.readiness.havanFireSpace.title}</span>
                        <p className="text-[10px] text-neutral-500 font-light">{activeGenre.readiness.havanFireSpace.detail}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-black text-[11px]">{activeGenre.readiness.baraatRoute.title}</span>
                        <p className="text-[10px] text-neutral-500 font-light">{activeGenre.readiness.baraatRoute.detail}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-black text-[11px]">{activeGenre.readiness.dietarySegregation.title}</span>
                        <p className="text-[10px] text-neutral-500 font-light">{activeGenre.readiness.dietarySegregation.detail}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-black text-[11px]">{activeGenre.readiness.lateNightAcoustics.title}</span>
                        <p className="text-[10px] text-neutral-500 font-light">{activeGenre.readiness.lateNightAcoustics.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Bar: Prominent CTA to explore this specific genre */}
              <div className="mt-5 pt-3.5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={handleOpenDetail}
                  className="inline-flex items-center space-x-2 text-[11px] font-sans uppercase tracking-wider bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-lg transition-colors font-medium cursor-pointer shadow-2xs"
                >
                  <span>Explore {activeGenre.genre} Dossier & Properties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-1.5 text-[10px] text-neutral-400 font-light">
                  <span>{currentIndex + 1} of {totalGenres}</span>
                  <span>•</span>
                  <span>Hover to pause auto rotation</span>
                </div>
              </div>

            </div>

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
