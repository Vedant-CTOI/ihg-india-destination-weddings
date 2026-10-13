import React, { useState, useEffect } from 'react';
import { REAL_WEDDINGS_DATA } from '../constants';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryDetailPageProps {
  storyId: string;
  onNavigateBack: () => void;
  onNavigateToInquiry: (weddingTitle: string) => void;
}

const PLACEHOLDER_IMG = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';

const STORY_TEXT = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
];

export const StoryDetailPage: React.FC<StoryDetailPageProps> = ({
  storyId,
  onNavigateBack
}) => {
  const [activeStoryId, setActiveStoryId] = useState<string>(storyId);
  const [slideIndex, setSlideIndex] = useState<number>(0);

  useEffect(() => {
    setActiveStoryId(storyId);
    setSlideIndex(0);
  }, [storyId]);

  const wedding =
    REAL_WEDDINGS_DATA.find((w) => w.id === activeStoryId) || REAL_WEDDINGS_DATA[0];

  const gallery = wedding.gallery.length > 0 ? wedding.gallery : [PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG];
  const totalSlides = gallery.length;

  const handleNextSlide = () => setSlideIndex((i) => (i + 1) % totalSlides);
  const handlePrevSlide = () => setSlideIndex((i) => (i - 1 + totalSlides) % totalSlides);

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">

      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3 sticky top-0 z-20 backdrop-blur-md bg-neutral-50/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">

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

      {/* Main Content Body — picture carousel + two-paragraph story */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">

        {/* Picture Carousel */}
        <div>
          <div className="relative h-[380px] sm:h-[480px] lg:h-[560px] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200">
            <img
              key={slideIndex}
              src={gallery[slideIndex] || PLACEHOLDER_IMG}
              alt={`Wedding moment ${slideIndex + 1}`}
              className="w-full h-full object-cover filter grayscale contrast-110 animate-fade-in"
              onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
            />
            <span aria-hidden="true" className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none text-[10px] font-sans uppercase tracking-widest text-neutral-500 font-medium">
              Image here
            </span>

            {/* Side Arrows */}
            <button
              onClick={handlePrevSlide}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Slide Counter */}
            <div className="absolute bottom-4 right-5 z-20 text-[11px] font-mono text-neutral-600 bg-white/80 rounded-full px-3 py-1">
              {slideIndex + 1} / {totalSlides}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${i === slideIndex ? 'bg-black' : 'bg-neutral-300 hover:bg-neutral-500'}`}
              />
            ))}
          </div>
        </div>

        {/* Dummy Story — two paragraphs max */}
        <div className="space-y-5">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black">
            {wedding.couple}
          </h2>
          {STORY_TEXT.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
              {p}
            </p>
          ))}
        </div>

      </div>

    </div>
  );
};
