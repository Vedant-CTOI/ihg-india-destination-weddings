import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FEATURED_STORIES, photosFor } from '../components/storyPhotos';

interface AllStoriesPageProps {
  initialCategory?: string;
  onNavigateBack: () => void;
  onSelectStory: (storyId: string) => void;
}

export const AllStoriesPage: React.FC<AllStoriesPageProps> = ({
  initialCategory: _initialCategory,
  onNavigateBack,
  onSelectStory
}) => {
  return (
    <div className="rw-page min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">
      {/* Redesign: 3 case studies only, alternating editorial rows; About/Loyalty language. Go back = tag checkpoint-before-rw-pages */}
      
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Exploration</button>
            <span>/</span>
            <span className="text-black font-medium">Real Wedding Stories</span>
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

      {/* Hero Banner with lorem placeholder text */}
      <div className="rw-hero relative h-[380px] sm:h-[440px] w-full overflow-hidden bg-black">
        <img
          src="/hero/hero-4-photo.jpg"
          alt="Real Weddings hero placeholder"
          data-real-photo=""
          style={{ objectPosition: '55% 30%' }}
          className="rw-hero-img w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="on-photo absolute bottom-8 left-0 right-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <span className="rw-badge bg-white text-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold inline-block mb-2.5">
              Real Weddings
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2">
              Lorem ipsum dolor sit amet
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      <div className="rw-wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Page Title & Context */}
        <div className="rw-intro space-y-2">
          <span className="rw-eyebrow text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-semibold block">
            Archive & Documentaries
          </span>
          <h2 className="rw-title font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-black leading-tight">
            Real Weddings Archive
          </h2>
          <p className="rw-lede text-xs sm:text-sm text-neutral-600 font-light max-w-2xl leading-relaxed">
            Read comprehensive case studies detailing how cross-cultural traditions, ceremonial timelines, and dietary requirements were harmonized across IHG destination sanctuaries.
          </p>
        </div>

        {/* Three case studies — alternating photo / text rows */}
        <div className="rw-list">
          {FEATURED_STORIES.map((wedding, i) => {
            const ph = photosFor(wedding.id).cover;
            return (
              <article
                key={wedding.id}
                onClick={() => onSelectStory(wedding.id)}
                className={`rw-case group cursor-pointer ${i % 2 === 1 ? 'is-flip' : ''}`}
              >
                <div className="rw-case-media relative overflow-hidden">
                  <img src={ph.src} alt={wedding.couple} data-real-photo="" loading="lazy" style={{ objectPosition: ph.focus }}
                       className="rw-case-img absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                  <span className="rw-case-num on-photo font-serif">{String(i + 1).padStart(2, '0')}</span>
                </div>

                <div className="rw-case-text">
                  <span className="rw-case-loc text-[10px] uppercase tracking-[0.25em] font-semibold block">
                    {wedding.location}
                  </span>
                  <h3 className="rw-case-name font-serif font-normal">
                    {wedding.couple}
                  </h3>
                  <div className="rw-case-facts">
                    <span>{wedding.property}</span>
                    <span>{wedding.guestCount} Guests</span>
                  </div>
                  <div>
                    <span className="rw-case-label text-[10px] font-sans font-semibold uppercase tracking-wider block mb-1">
                      The Confluence:
                    </span>
                    <p className="rw-case-conf text-sm font-medium">
                      {wedding.culturalConfluence}
                    </p>
                  </div>
                  <p className="rw-case-story text-sm font-light leading-relaxed">
                    {wedding.resolutionStory}
                  </p>
                  <p className="rw-case-quote font-serif italic">
                    {wedding.coupleTestimonial}
                  </p>
                  <div>
                    <button type="button" className="rw-case-cta inline-flex items-center gap-2 text-[11px] uppercase tracking-wider font-medium px-6 py-3 rounded-full cursor-pointer">
                      <span>Read Full Story &amp; Run-of-Show</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

    </div>
  );
};
