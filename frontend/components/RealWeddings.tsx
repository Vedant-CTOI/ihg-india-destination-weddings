import React, { useState, useRef } from 'react';
import { REAL_WEDDINGS_DATA } from '../constants';
import { RealWeddingCase } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWeb, SplitText, PALETTE } from './webMotion';
import { DUMMY_STORIES, pick } from './landingDummyImages';

// Story cards use the homepage hero banner photos (client photos, same crop focus as the hero)
const STORY_HERO_PHOTOS = [
  { src: '/hero/hero-1-photo.jpg', focus: '62% 28%' },
  { src: '/hero/hero-2-photo.jpg', focus: '35% 25%' },
  { src: '/hero/hero-3-photo.jpg', focus: '50% 40%' },
  { src: '/hero/hero-4-photo.jpg', focus: '55% 30%' },
  { src: '/hero/hero-5-photo.jpg', focus: '42% 38%' }
];

interface RealWeddingsProps {
  onSelectStory: (wedding: RealWeddingCase) => void;
  onViewAllStories?: () => void;
}

export const RealWeddings: React.FC<RealWeddingsProps> = ({ onSelectStory, onViewAllStories }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [showAllStories, setShowAllStories] = useState<boolean>(false);
  const web = useWeb(); // WEB VERSION ONLY styling/motion below

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
    <section id="real-weddings" className={`py-20 bg-neutral-50 border-b border-neutral-200 ${web ? 'cine' : ''}`} data-tone={web ? 'dark' : undefined} style={web ? { backgroundColor: PALETTE.maroon, borderColor: 'transparent' } : undefined}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header with Section CTAs */}
        <div className="sec-head flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <span data-wm={web ? '' : undefined} className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-sans font-medium block mb-2">
              Case Studies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-black font-normal mb-2">
              {web ? <SplitText text="Placeholder Text (Real Wedding Stories)" /> : 'Placeholder Text (Real Wedding Stories)'}
            </h2>
            <p data-wm={web ? '' : undefined} style={{ ['--d' as any]: '300ms' }} className="font-sans text-neutral-600 text-sm font-light">
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
          {visibleWeddings.map((wedding, wi) => (
            <article
              key={wedding.id}
              data-wm={web ? '' : undefined}
              style={{ ['--d' as any]: `${wi * 160}ms` }}
              onClick={() => onSelectStory(wedding)}
              className="story-tile group/st relative block w-full aspect-[3/4] overflow-hidden rounded-sm cursor-pointer"
            >
              {/* Same tile as the Hotels page; photos = homepage hero banner photos. Go back = tag checkpoint-before-home-story-tiles */}
              <img src={STORY_HERO_PHOTOS[wi % STORY_HERO_PHOTOS.length].src} alt={wedding.couple} data-real-photo="" loading="lazy"
                   style={{ objectPosition: STORY_HERO_PHOTOS[wi % STORY_HERO_PHOTOS.length].focus }}
                   className="story-tile-img absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/st:scale-[1.07]" />
              <span className="story-tile-veil absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <span className="on-photo story-tile-copy absolute inset-x-0 bottom-0 p-4 lg:p-5 text-white">
                <span className="story-tile-loc block text-[10px] uppercase tracking-[0.28em] text-white/70 mb-1.5 truncate">
                  <span className="tabular-nums">{String(wi + 1).padStart(2, '0')}</span> · Lorem Ipsum
                </span>
                <span className="story-tile-name block font-serif font-normal leading-[1.05] text-[clamp(1.25rem,1.9vw,1.75rem)]">{wedding.couple}</span>
                <span className="story-tile-meta block mt-1.5 text-[13px] font-light leading-snug text-white/85 truncate">{wedding.culturalConfluence}</span>
                <span className="story-tile-cta mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-medium border-b border-white/70 pb-0.5">
                  Read Full Story &amp; Run-of-Show <ArrowRight className="w-3 h-3 shrink-0" />
                </span>
              </span>
            </article>
          ))}
          </div>
        </div>

        {/* View More Stories Toggle / CTA */}
        <div data-wm={web ? '' : undefined} className="text-center mt-10">
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
