import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  tagline: string;
  titlePrefix: string;
  titleItalic: string;
  subtitle: string;
  locationLabel: string;
  image: string;
}

export const HeroSectionClassic: React.FC = () => {
  const slides: HeroSlide[] = [
    {
      id: 'banner-1',
      tagline: 'Hero Banner Text 1',
      titlePrefix: 'Hero Banner Text 1',
      titleItalic: 'continues here.',
      subtitle: 'Hero banner subtext line for the first carousel slide, kept brief for the overlay layout.',
      locationLabel: 'Hotel 1 • Destination 1',
      image: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
    },
    {
      id: 'banner-2',
      tagline: 'Hero Banner Text 2',
      titlePrefix: 'Hero Banner Text 2',
      titleItalic: 'continues here.',
      subtitle: 'Hero banner subtext line for the second carousel slide, kept brief for the overlay layout.',
      locationLabel: 'Hotel 3 • Destination 2',
      image: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
    },
    {
      id: 'banner-3',
      tagline: 'Hero Banner Text 3',
      titlePrefix: 'Hero Banner Text 3',
      titleItalic: 'continues here.',
      subtitle: 'Hero banner subtext line for the third carousel slide, kept brief for the overlay layout.',
      locationLabel: 'Hotel 6 • Destination 5',
      image: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
    },
    {
      id: 'banner-4',
      tagline: 'Hero Banner Text 4',
      titlePrefix: 'Hero Banner Text 4',
      titleItalic: 'continues here.',
      subtitle: 'Hero banner subtext line for the fourth carousel slide, kept brief for the overlay layout.',
      locationLabel: 'Hotel 7 • Destination 4',
      image: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
    },
    {
      id: 'banner-5',
      tagline: 'Hero Banner Text 5',
      titlePrefix: 'Hero Banner Text 5',
      titleItalic: 'continues here.',
      subtitle: 'Hero banner subtext line for the fifth carousel slide, kept brief for the overlay layout.',
      locationLabel: 'Hotel 5 • Destination 3',
      image: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex];

  // Auto-advance splash screen carousel every 5.2 seconds, pause on hover
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 5200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalSlides]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleSelectSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Touch swipe: swipe left -> next slide, swipe right -> previous (mobile-native browsing)
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) handleNext(); else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section 
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden min-h-[85vh] lg:min-h-[90vh] flex items-center bg-black text-white border-b border-neutral-800 select-none group"
      aria-label="IHG Weddings Splash Screen Carousel"
    >
      {/* Background Slides: Stacked Layers with Cross-Fade Transitions */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={`${slide.tagline} - ${slide.locationLabel}`}
                className={`w-full h-full object-cover object-center filter grayscale contrast-125 brightness-90 ${
                  isActive ? 'animate-ken-burns scale-105' : 'scale-100'
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                }}
              />
            </div>
          );
        })}

        {/* Light Monochrome Washes — keep image bright so black text reads */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 sm:via-white/40 to-white/10 z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/30 z-20" />
      </div>

      {/* Main Foreground Editorial Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-xl lg:max-w-2xl animate-fade-in" key={currentSlide.id}>
          
          {/* Eyebrow & Sanctuary Indicator */}
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.28em] text-neutral-600 mb-6 font-sans">
            <span className="inline-block w-2 h-2 border border-neutral-500 shrink-0" />
            <span>{currentSlide.tagline}</span>
            <span className="text-neutral-400 hidden sm:inline">•</span>
            <span className="text-neutral-500 hidden sm:inline text-[10px] tracking-wider">
              {currentSlide.locationLabel}
            </span>
          </div>

          {/* Dynamic Headline with Italic Accent */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-black mb-6 tracking-tight">
            {currentSlide.titlePrefix} <br />
            <span className="italic text-neutral-700 font-light">
              {currentSlide.titleItalic}
            </span>
          </h1>

          {/* Concise Subtext */}
          <p className="font-sans text-sm sm:text-base text-neutral-700 font-light leading-relaxed mb-9 max-w-md">
            {currentSlide.subtitle}
          </p>

          {/* Slide Meta (CTA removed) */}
          <div className="flex items-center space-x-4 text-xs font-sans">
            <div className="hidden sm:flex items-center space-x-2 text-[11px] text-neutral-600 font-light tracking-wide">
              <span>{currentIndex + 1} of {totalSlides}</span>
              <span>•</span>
              <span className="truncate max-w-[200px]">{currentSlide.locationLabel.split('•')[0]}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Splash Screen Carousel Navigation & Progress Bars (Bottom Strip) */}
      <div className="absolute bottom-6 left-0 right-0 z-30 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Segmented Progress Indicators */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  className="flex-1 sm:flex-none py-2 cursor-pointer group/bar focus:outline-none"
                  aria-label={`Jump to slide ${idx + 1}: ${slide.tagline}`}
                >
                  <div className="w-12 sm:w-16 h-1 bg-black/15 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-black transition-all ${
                        isActive
                          ? 'w-full duration-500'
                          : 'w-0 group-hover/bar:w-1/3'
                      }`}
                    />
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider font-mono hidden md:block mt-1 text-left ${
                    isActive ? 'text-black' : 'text-neutral-500'
                  }`}>
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center space-x-2 text-xs font-sans">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-black/20 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs bg-white/60 hover:bg-white"
              aria-label="Previous splash slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-black/20 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs bg-white/60 hover:bg-white"
              aria-label="Next splash slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
