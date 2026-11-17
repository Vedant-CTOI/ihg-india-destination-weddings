import React, { useEffect } from 'react';
import { REAL_WEDDINGS_DATA } from '../constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FEATURED_STORIES, photosFor } from '../components/storyPhotos';

interface StoryDetailPageProps {
  storyId: string;
  onNavigateBack: () => void;
  onNavigateToInquiry: (weddingTitle: string) => void;
  onSelectStory?: (storyId: string) => void;
}

const STORY_TEXT = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
];

/* Redesign: banner, fact strip, story + photo pair, 3-photo gallery, Run-of-Show timeline, quote, next story + CTA.
   Placeholder section labels ("The Story", "Gallery", "Run-of-Show", "Next Story") until copy arrives. Go back = tag checkpoint-before-rw-pages */
export const StoryDetailPage: React.FC<StoryDetailPageProps> = ({
  storyId,
  onNavigateBack,
  onNavigateToInquiry,
  onSelectStory
}) => {
  useEffect(() => { window.scrollTo({ top: 0 }); }, [storyId]);

  const wedding = REAL_WEDDINGS_DATA.find((w) => w.id === storyId) || REAL_WEDDINGS_DATA[0];
  const ph = photosFor(wedding.id);
  const idx = Math.max(0, FEATURED_STORIES.findIndex((w) => w.id === wedding.id));
  const next = FEATURED_STORIES[(idx + 1) % FEATURED_STORIES.length];
  const nextPh = photosFor(next.id).cover;
  const timeline = (wedding.timelineHighlights as unknown as Array<string | { time: string; ritual: string; space: string }>)
    .map((t) => (typeof t === 'string' ? t : t.ritual));
  const facts: [string, string][] = [
    ['Hotel', wedding.property],
    ['Destination', wedding.location],
    ['Guests', String(wedding.guestCount)],
    ['Wedding Type', wedding.genre || '—']
  ];

  return (
    <div className="sd-page min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">

      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Exploration</button>
            <span>/</span>
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Real Weddings</button>
            <span>/</span>
            <span className="text-black font-medium">{wedding.couple}</span>
          </div>
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center space-x-1 text-black hover:text-neutral-600 font-medium uppercase tracking-wider text-[11px] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Real Weddings</span>
          </button>
        </div>
      </div>

      {/* 1. Banner */}
      <div className="sd-hero relative w-full overflow-hidden bg-black">
        <img src={ph.cover.src} alt={wedding.couple} data-real-photo="" style={{ objectPosition: ph.cover.focus }}
             className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="on-photo absolute bottom-10 left-0 right-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <span className="sd-badge text-[10px] uppercase inline-block mb-3">{wedding.location}</span>
            <h1 className="font-serif font-normal text-white sd-hero-title">{wedding.couple}</h1>
            <p className="sd-hero-sub text-sm font-light">{wedding.culturalConfluence}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2. Fact strip */}
        <dl className="sd-facts">
          {facts.map(([k, v]) => (
            <div key={k} className="sd-fact">
              <dt>{k}</dt>
              <dd className="font-serif">{v}</dd>
            </div>
          ))}
        </dl>

        {/* 3. The story + photo pair */}
        <section className="sd-story">
          <div className="sd-story-text">
            <span className="sd-eyebrow">The Story</span>
            <h2 className="sd-h2 font-serif font-normal">{wedding.couple}</h2>
            {STORY_TEXT.map((p, i) => (
              <p key={i} className="sd-p font-light">{p}</p>
            ))}
          </div>
          <div className="sd-collage">
            <div className="sd-media sd-tall"><img src={ph.pair[0].src} alt="" data-real-photo="" loading="lazy" style={{ objectPosition: ph.pair[0].focus }} /></div>
            <div className="sd-media sd-small"><img src={ph.pair[1].src} alt="" data-real-photo="" loading="lazy" style={{ objectPosition: ph.pair[1].focus }} /></div>
          </div>
        </section>

        {/* 4. Gallery — 1 large + 2 stacked */}
        <section className="sd-gallery-wrap">
          <span className="sd-eyebrow">Gallery</span>
          <div className="sd-gallery">
            {ph.gallery.map((g, i) => (
              <div key={i} className={`sd-media sd-g${i}`}><img src={g.src} alt={`Wedding moment ${i + 1}`} data-real-photo="" loading="lazy" style={{ objectPosition: g.focus }} /></div>
            ))}
          </div>
        </section>

        {/* 5. Run-of-Show */}
        <section className="sd-ros">
          <div className="sd-ros-head">
            <span className="sd-eyebrow">Run-of-Show</span>
            <h2 className="sd-h2 font-serif font-normal">{wedding.title}</h2>
          </div>
          <ol className="sd-timeline">
            {timeline.map((t, i) => (
              <li key={i}>
                <span className="sd-tl-num font-serif">{String(i + 1).padStart(2, '0')}</span>
                <span className="sd-tl-text">{t}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* 6. Couple quote */}
      <section className="sd-quote-band">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="sd-quote font-serif italic">{wedding.coupleTestimonial}</p>
          <span className="sd-quote-by">{wedding.couple}</span>
        </div>
      </section>

      {/* 7. Next story + CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="sd-next">
          <button type="button" className="sd-next-card group" onClick={() => onSelectStory && onSelectStory(next.id)}>
            <div className="sd-next-media relative overflow-hidden">
              <img src={nextPh.src} alt={next.couple} data-real-photo="" loading="lazy" style={{ objectPosition: nextPh.focus }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
            <div className="sd-next-text">
              <span className="sd-eyebrow">Next Story</span>
              <span className="sd-next-name font-serif">{next.couple}</span>
              <span className="sd-next-loc">{next.location}</span>
              <span className="sd-next-link">Read Full Story &amp; Run-of-Show <ArrowRight className="w-3.5 h-3.5" /></span>
            </div>
          </button>
          <div className="sd-cta-box">
            <span className="sd-eyebrow">Begin the Conversation</span>
            <h2 className="sd-h2 font-serif font-normal">Lorem ipsum dolor sit amet</h2>
            <p className="sd-p font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div>
              <button type="button" onClick={() => onNavigateToInquiry(wedding.property)} className="sd-cta inline-flex items-center gap-2 text-[11px] uppercase tracking-wider font-medium px-6 py-3 rounded-full cursor-pointer">
                <span>Plan Celebration</span>
              </button>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
};
