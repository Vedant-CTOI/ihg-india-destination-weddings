import React, { useState, useRef } from 'react';
import { REAL_WEDDINGS_DATA } from '../constants';
import { RealWeddingCase } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface RealWeddingsProps {
  onSelectStory: (wedding: RealWeddingCase) => void;
  onViewAllStories?: () => void;
}

export const RealWeddings: React.FC<RealWeddingsProps> = ({ onSelectStory, onViewAllStories }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [showAllStories, setShowAllStories] = useState<boolean>(false);

  const filters = ['All', 'Royal Heritage', 'Beachside', 'Temple & Waterway', 'Foothills'];

  const filteredWeddings = REAL_WEDDINGS_DATA.filter((wedding) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Royal Heritage') return wedding.location.includes('Region 1') || wedding.location.includes('Region 2');
    if (selectedFilter === 'Beachside') return wedding.location.includes('Region 3');
    if (selectedFilter === 'Temple & Waterway') return wedding.location.includes('Region 5') || wedding.location.includes('Region 6');
    if (selectedFilter === 'Foothills') return wedding.location.includes('Region 4');
    return true;
  });

  const visibleWeddings = showAllStories ? filteredWeddings : filteredWeddings.slice(0, 3);

  // Mobile-mode carousel arrows (hidden in web mode via CSS)
  const railRef = useRef<HTMLDivElement>(null);
  const railPrev = () => railRef.current?.scrollBy({ left: -(railRef.current.clientWidth - 20), behavior: 'smooth' });
  const railNext = () => railRef.current?.scrollBy({ left: railRef.current.clientWidth - 20, behavior: 'smooth' });

  return (
    <section id="real-weddings" className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header with Section CTAs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-sans font-medium block mb-2">
              Case Studies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-black font-normal mb-2">
              Placeholder Text (Real Wedding Stories)
            </h2>
            <p className="font-sans text-neutral-600 text-sm font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {onViewAllStories ? (
              <button
                onClick={onViewAllStories}
                className="inline-flex items-center space-x-2 text-xs font-sans uppercase tracking-widest bg-black text-white px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors shadow-2xs font-medium shrink-0 cursor-pointer"
              >
                <span>View All Stories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => onSelectStory(REAL_WEDDINGS_DATA[0])}
                className="inline-flex items-center space-x-2 text-xs font-sans uppercase tracking-widest bg-black text-white px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors shadow-2xs font-medium shrink-0 cursor-pointer"
              >
                <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                <span>Featured Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Minimal Cards Grid — mobile: horizontal rail with arrows */}
        <div className="relative">
          <button type="button" onClick={railPrev} aria-label="Previous wedding stories"
            className="stories-rail-arrow stories-rail-prev absolute left-1 top-[120px] -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-neutral-300 bg-white/90 hover:bg-white shadow-2xs text-black items-center justify-center cursor-pointer hidden">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button type="button" onClick={railNext} aria-label="Next wedding stories"
            className="stories-rail-arrow stories-rail-next absolute right-1 top-[120px] -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-neutral-300 bg-white/90 hover:bg-white shadow-2xs text-black items-center justify-center cursor-pointer hidden">
            <ChevronRight className="w-4 h-4" />
          </button>
          <div ref={railRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleWeddings.map((wedding) => (
            <article
              key={wedding.id}
              onClick={() => onSelectStory(wedding)}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:border-black transition-colors cursor-pointer group shadow-2xs hover:shadow-md"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-neutral-900">
                  <img
                    src={wedding.coverImage}
                    alt={wedding.couple}
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E' + encodeURIComponent(wedding.couple);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-sans text-neutral-300 block">
                      {wedding.location}
                    </span>
                    <h3 className="font-serif text-xl font-normal text-white">
                      {wedding.couple}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[11px] font-sans font-semibold text-black uppercase tracking-wider block mb-1">
                    The Confluence:
                  </span>
                  <p className="text-xs text-neutral-800 font-sans mb-3 font-medium">
                    {wedding.culturalConfluence}
                  </p>

                  <p className="text-xs text-neutral-600 font-sans leading-relaxed line-clamp-3 mb-4 font-light">
                    {wedding.resolutionStory}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStory(wedding);
                  }}
                  className="w-full border border-neutral-300 group-hover:bg-black group-hover:text-white text-black text-[11px] uppercase tracking-wider font-sans font-medium py-2 rounded-xl transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                  <span>Read Full Story &amp; Run-of-Show</span>
                </button>
              </div>

            </article>
          ))}
          </div>
        </div>

        {/* View More Stories Toggle / CTA */}
        <div className="text-center mt-10">
          {onViewAllStories ? (
            <button
              type="button"
              onClick={onViewAllStories}
              className="inline-flex items-center space-x-2 border border-neutral-300 hover:border-black text-black px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium bg-white transition-colors cursor-pointer"
            >
              <span>Explore All {REAL_WEDDINGS_DATA.length} Real Wedding Stories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            filteredWeddings.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllStories(!showAllStories)}
                className="inline-flex items-center space-x-2 border border-neutral-300 hover:border-black text-black px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium bg-white transition-colors cursor-pointer"
              >
                <span>{showAllStories ? 'Show Fewer Stories' : `View All ${filteredWeddings.length} Stories`}</span>
              </button>
            )
          )}
        </div>

      </div>
    </section>
  );
};
