import React, { useEffect } from 'react';
import { REAL_WEDDINGS_DATA } from '../constants';
import { ArrowLeft } from 'lucide-react';
import { photosFor } from '../components/storyPhotos';

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

/* Short version: banner + story (paragraphs, small testimonial) beside a photo pair.
   Go back = tag checkpoint-before-story-short (long version with gallery / Run-of-Show / next story) */
export const StoryDetailPage: React.FC<StoryDetailPageProps> = ({
  storyId,
  onNavigateBack
}) => {
  useEffect(() => { window.scrollTo({ top: 0 }); }, [storyId]);

  const wedding = REAL_WEDDINGS_DATA.find((w) => w.id === storyId) || REAL_WEDDINGS_DATA[0];
  const ph = photosFor(wedding.id);

  return (
    <div className="sd-page sd-short min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">

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

      {/* Banner */}
      <div className="sd-hero relative w-full overflow-hidden bg-black">
        <img src={ph.cover.src} alt={wedding.couple} data-real-photo="" style={{ objectPosition: ph.cover.focus }}
             className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="on-photo absolute bottom-10 left-0 right-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="font-serif font-normal text-white sd-hero-title">{wedding.couple}</h1>
            <p className="sd-hero-sub text-sm font-light">{wedding.culturalConfluence}</p>
          </div>
        </div>
      </div>

      {/* Story + photos + small testimonial */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="sd-story">
          <div className="sd-story-text">
            <span className="sd-eyebrow">The Story</span>
            <h2 className="sd-h2 font-serif font-normal">{wedding.couple}</h2>
            {STORY_TEXT.map((p, i) => (
              <p key={i} className="sd-p font-light">{p}</p>
            ))}
            <figure className="sd-testimonial">
              <blockquote className="sd-testimonial-quote font-serif italic">{wedding.coupleTestimonial}</blockquote>
              <figcaption className="sd-testimonial-by">{wedding.couple}</figcaption>
            </figure>
          </div>
          <div className="sd-collage">
            <div className="sd-media sd-tall"><img src={ph.pair[0].src} alt="" data-real-photo="" style={{ objectPosition: ph.pair[0].focus }} /></div>
            <div className="sd-media sd-small"><img src={ph.pair[1].src} alt="" data-real-photo="" style={{ objectPosition: ph.pair[1].focus }} /></div>
          </div>
        </section>
      </div>

    </div>
  );
};
