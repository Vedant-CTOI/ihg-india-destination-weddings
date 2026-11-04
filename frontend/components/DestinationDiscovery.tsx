import React, { useState, useEffect, useRef } from 'react';
import { WEDDING_GENRES_DATA } from '../constants';
import { WeddingGenreInfo } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWeb, SplitText, PALETTE } from './webMotion';
import { DUMMY_DESTINATIONS, pick } from './landingDummyImages';

const HOME_DEST_NAMES = ['Goa', 'Thailand', 'Jaipur'];
const HOME_DEST_IMG = ['/destinations/goa.jpg', '/destinations/thailand.jpg', '/destinations/jaipur.jpg', '/destinations/d4.jpg', '/destinations/d5.jpg'];

interface DestinationDiscoveryProps {
  onOpenDetail?: () => void;
}

export const DestinationDiscovery: React.FC<DestinationDiscoveryProps> = ({ onOpenDetail }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timerRef = useRef<any>(null);
  const web = useWeb(); // WEB VERSION ONLY styling/motion below

  const totalGenres = WEDDING_GENRES_DATA.length;
  const activeGenre = WEDDING_GENRES_DATA[currentIndex] || WEDDING_GENRES_DATA[0];
  // Same names + photos as the Discover by Destination page (Region 1/2/3 = Goa/Thailand/Jaipur, then Destination 4, 5…)
  const destName = HOME_DEST_NAMES[currentIndex] || `Destination ${currentIndex + 1}`;

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
      onOpenDetail();
    }
  };

  return (
    <section id="destinations" className={`py-14 sm:py-16 bg-neutral-50 border-b border-neutral-200 ${web ? 'cine' : ''}`} data-tone={web ? 'light' : undefined} style={web ? { backgroundColor: PALETTE.marigold, borderColor: 'transparent' } : undefined}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header — CTA top right, like other sections */}
        <div className="sec-head flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div className="max-w-xl">
            <span data-wm={web ? '' : undefined} className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans font-medium block mb-1">
              Curated Wedding Types
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-black font-normal mb-1.5">
              {web ? <SplitText text="Placeholder Text (Discover by Destination)" /> : 'Placeholder Text (Discover by Destination)'}
            </h2>
            <p data-wm={web ? '' : undefined} style={{ ['--d' as any]: '300ms' }} className="font-sans text-neutral-500 text-xs font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>

          {/* Explore CTA top right */}
          <div data-wm={web ? '' : undefined} style={{ ['--d' as any]: '450ms' }} className="flex items-center gap-3 text-xs font-sans text-neutral-500">
            <button
              type="button"
              onClick={handleOpenDetail}
              className="inline-flex items-center space-x-2 text-[11px] font-sans uppercase tracking-wider bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-lg transition-colors font-medium cursor-pointer shadow-2xs"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Automatic Horizontal Carousel Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-wm={web ? 'curtain' : undefined}
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

          {/* Full-bleed image with text overlaid — same card style as the Discover by Destination page
              (dark fade, white type, number + name, eyebrow, one line, white pill CTA). Go back = tag checkpoint-before-dest-cards-palette */}
          <div
            onClick={handleOpenDetail}
            className="home-dest-card relative h-[30rem] lg:h-[34rem] overflow-hidden bg-neutral-800 cursor-pointer group"
          >
            <img
              key={activeGenre.id}
              src={HOME_DEST_IMG[currentIndex % HOME_DEST_IMG.length]}
              alt={destName}
              data-real-photo=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)] dest-fade"
              onError={(e) => {
                (e.target as HTMLImageElement).src = pick(DUMMY_DESTINATIONS, currentIndex);
              }}
            />
            <div className="home-dest-veil absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />

            <div className="on-photo absolute inset-x-0 bottom-0 p-7 text-white">
              <span className="home-dest-eyebrow block text-[11px] uppercase tracking-[0.28em] text-white/75 mb-3 whitespace-nowrap">Lorem ipsum dolor sit amet</span>
              <h3 className="home-dest-name font-serif font-normal leading-[0.95] tracking-[-0.015em] text-[clamp(2.2rem,3.6vw,3.6rem)] whitespace-nowrap text-white">
                <span className="text-white/55 mr-3 text-[0.55em] align-middle">{String(currentIndex + 1).padStart(2, '0')}</span>{destName}
              </h3>
              <p className="home-dest-copy mt-4 max-w-md text-sm font-light leading-relaxed text-white/85">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
              <button type="button" onClick={(e) => { e.stopPropagation(); handleOpenDetail(); }}
                      className="home-dest-cta group/cta mt-5 inline-flex items-center gap-3 bg-white text-black text-[11px] uppercase tracking-wider font-medium pl-6 pr-5 py-3 rounded-full cursor-pointer">
                <span>Discover {destName} Properties</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-700 group-hover/cta:translate-x-1" />
              </button>
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
