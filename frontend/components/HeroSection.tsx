import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface HeroSlide {
  id: string;
  tagline: string;
  titlePrefix: string;
  titleItalic: string;
  subtitle: string;
  locationLabel: string;
  image: string;
}

export const HeroSection: React.FC = () => {
  const slides: HeroSlide[] = [
    {
      id: 'rajasthan-citadel',
      tagline: 'Imperial Citadel Sanctuary',
      titlePrefix: 'Sacred vows in',
      titleItalic: 'quiet majesty.',
      subtitle: 'Understated sunset mandaps, torchlit courtyards, and quiet luxury curated for your private promise.',
      locationLabel: 'Six Senses Fort Barwara • Rajasthan',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2400&q=85'
    },
    {
      id: 'goa-coastline',
      tagline: 'Barefoot Shoreline Sanctuary',
      titlePrefix: 'Tides of devotion at',
      titleItalic: 'golden hour.',
      subtitle: 'Where gentle ocean waves meet fragrant jasmine canopies, wind-shielded havan decks, and starlit banquets.',
      locationLabel: 'Crowne Plaza Resort • South Goa Beach',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2400&q=85'
    },
    {
      id: 'mahabalipuram-temple',
      tagline: 'Dravidian Temple Shoreline',
      titlePrefix: 'Eternal promises by',
      titleItalic: 'sacred waters.',
      subtitle: 'Ancient granite stone pillars, floating lotus reflection ponds, and sunrise Vedic chants by the Bay of Bengal.',
      locationLabel: 'InterContinental Mahabalipuram • Coromandel',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2400&q=85'
    },
    {
      id: 'kerala-backwaters',
      tagline: 'Tropical Waterway Sanctuaries',
      titlePrefix: 'Unhurried grace on',
      titleItalic: 'emerald shores.',
      subtitle: 'Ceremonial Shikara flotilla arrivals, floating island mandaps, and authentic royal feasts enveloped in palm serenity.',
      locationLabel: 'Crowne Plaza Kochi • Vembanad Waters',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2400&q=85'
    },
    {
      id: 'corbett-foothills',
      tagline: 'Alpine Riverbed & Forest Clearing',
      titlePrefix: 'Whispering pines &',
      titleItalic: 'mountain mantras.',
      subtitle: 'Flowing river-stone platforms, lantern-lit pine meadow receptions, and crisp Himalayan foothill quietude.',
      locationLabel: 'Crowne Plaza Corbett • Himalayan Foothills',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=85'
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

  return (
    <section 
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
                    'https://placehold.co/2400x1400/000000/FFFFFF?text=IHG+Weddings';
                }}
              />
            </div>
          );
        })}

        {/* Deep Black Monochrome Luxury Vignettes & Lighting Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 sm:via-black/60 to-black/35 z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-20" />
      </div>

      {/* Main Foreground Editorial Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-xl lg:max-w-2xl animate-fade-in" key={currentSlide.id}>
          
          {/* Eyebrow & Sanctuary Indicator */}
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.28em] text-neutral-400 mb-6 font-sans">
            <span className="inline-block w-2 h-2 border border-neutral-400 shrink-0" />
            <span>{currentSlide.tagline}</span>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <span className="text-neutral-500 hidden sm:inline text-[10px] tracking-wider">
              {currentSlide.locationLabel}
            </span>
          </div>

          {/* Dynamic Headline with Italic Accent */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-white mb-6 tracking-tight">
            {currentSlide.titlePrefix} <br />
            <span className="italic text-neutral-300 font-light">
              {currentSlide.titleItalic}
            </span>
          </h1>

          {/* Concise Subtext */}
          <p className="font-sans text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-9 max-w-md">
            {currentSlide.subtitle}
          </p>

          {/* Clean Monochrome CTA Button */}
          <div className="flex items-center space-x-4 text-xs font-sans">
            <a
              href="#contact"
              className="bg-white hover:bg-neutral-200 text-black px-7 py-3.5 rounded-full font-medium tracking-wider uppercase transition-all flex items-center space-x-2.5 shadow-md active:scale-95"
            >
              <span>Plan Celebration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <div className="hidden sm:flex items-center space-x-2 text-[11px] text-neutral-400 font-light tracking-wide">
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
                  <div className="w-12 sm:w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-white transition-all ${
                        isActive
                          ? 'w-full duration-500'
                          : 'w-0 group-hover/bar:w-1/3'
                      }`}
                    />
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider font-mono hidden md:block mt-1 text-left ${
                    isActive ? 'text-white' : 'text-neutral-500'
                  }`}>
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Carousel Arrow Controls & Pause/Play Indicator */}
          <div className="flex items-center space-x-2 text-xs font-sans">
            <div className="flex items-center space-x-1.5 text-[10px] text-neutral-400 mr-2 uppercase tracking-wider">
              {isPaused ? (
                <span className="inline-flex items-center space-x-1 text-neutral-300">
                  <Pause className="w-2.5 h-2.5" />
                  <span>Paused</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1 text-neutral-500">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>Auto Carousel</span>
                </span>
              )}
            </div>

            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-white/20 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs bg-black/40 hover:bg-black/80"
              aria-label="Previous splash slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-white/20 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs bg-black/40 hover:bg-black/80"
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
