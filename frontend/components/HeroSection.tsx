import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSectionClassic } from './HeroSectionClassic';
import { useMobileLayout } from './useMobileLayout';

interface HeroSlide {
  id: string;
  tagline: string;
  titlePrefix: string;
  titleItalic: string;
  subtitle: string;
  locationLabel: string;
  image: string;
  focus?: string; // object-position for the crop
  trueColour?: boolean; // show the photo in its true colours (no B/W filter)
}

const SLIDE_MS = 7000;

/* Web version — cinematic hero (design transfer from v1-local). Mobile layout keeps HeroSectionClassic. */
const HeroSectionCinematic: React.FC = () => {
  const slides: HeroSlide[] = [
    {
      id: 'banner-1',
      tagline: 'Hero Banner Text 1',
      titlePrefix: 'Hero Banner Text 1',
      titleItalic: 'continues here.',
      subtitle: 'Hero banner subtext line for the first carousel slide, kept brief for the overlay layout.',
      locationLabel: 'Hotel 1 • Destination 1',
      image: '/hero/hero-1.png',
      trueColour: true
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

  const totalSlides = slides.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [cycle, setCycle] = useState<number>(0); // re-keys animations on every change

  const sectionRef = useRef<HTMLElement | null>(null);
  const imageLayerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[(currentIndex + 1) % totalSlides];

  const goTo = (idx: number) => {
    if (idx === currentIndex) return;
    setPrevIndex(currentIndex);
    setCurrentIndex(idx);
    setCycle((c) => c + 1);
  };
  const handleNext = () => goTo((currentIndex + 1) % totalSlides);
  const handlePrev = () => goTo((currentIndex - 1 + totalSlides) % totalSlides);

  // Touch swipe (existing behaviour): left -> next, right -> previous
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) { if (dx < 0) handleNext(); else handlePrev(); }
    touchStartX.current = null;
  };

  // Preload all slide images so the wipe never reveals a blank frame
  useEffect(() => {
    slides.forEach((s) => { const i = new Image(); i.src = s.image; });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll parallax (image drifts slower than the page, copy lifts & fades) + pointer drift
  useEffect(() => {
    let raf = 0;
    let pointerX = 0, pointerY = 0, curX = 0, curY = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = () => {
      const sec = sectionRef.current;
      if (sec) {
        const h = sec.offsetHeight || 1;
        const y = Math.min(Math.max(window.scrollY, 0), h);
        curX += (pointerX - curX) * 0.06;
        curY += (pointerY - curY) * 0.06;
        if (imageLayerRef.current) {
          imageLayerRef.current.style.transform =
            `translate3d(${curX * -14}px, ${y * 0.32 + curY * -10}px, 0) scale(1.06)`;
        }
        if (contentRef.current) {
          const p = y / h;
          contentRef.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
          contentRef.current.style.opacity = String(Math.max(1 - p * 1.6, 0));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX / window.innerWidth - 0.5;
      pointerY = e.clientY / window.innerHeight - 0.5;
    };
    if (!reduce) {
      raf = requestAnimationFrame(tick);
      window.addEventListener('pointermove', onMove, { passive: true });
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="cine grain relative overflow-hidden h-[100svh] min-h-[640px] text-white select-none"
      style={{ backgroundColor: '#000' }}
      aria-label="IHG Weddings Splash Screen Carousel"
    >
      {/* ── Image stack: previous slide stays underneath, active slide wipes up over it ── */}
      <div ref={imageLayerRef} className="absolute inset-0 z-0 pointer-events-none will-change-transform">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const isPrev = idx === prevIndex;
          if (!isActive && !isPrev) return null;
          return (
            <div
              key={isActive ? `${slide.id}-${cycle}` : `${slide.id}-prev`}
              className={`absolute inset-0 overflow-hidden ${isActive ? 'z-10' : 'z-0'} ${
                isActive && prevIndex !== null ? 'hero-wipe-in' : ''
              }`}
            >
              <img
                src={slide.image}
                alt={`${slide.tagline} - ${slide.locationLabel}`}
                style={{ objectPosition: slide.focus || 'center' }}
                className={`w-full h-full object-cover ${slide.trueColour ? '' : 'grayscale contrast-[1.1] brightness-[0.92]'} ${
                  isActive ? 'hero-zoom' : ''
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Readability layers — work for ANY photograph (bright, colour or monochrome):
          1. a uniform 35% black veil over the whole image sets a guaranteed contrast floor for white type
          2. a bottom gradient deepens the zone where the headline, copy and CTA sit
          3. a top gradient keeps the white header legible */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: 'rgba(0,0,0,0.35)' }} />
      <div className="absolute inset-x-0 bottom-0 h-[70%] z-20 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4) 50%, transparent)' }} />
      <div className="absolute inset-x-0 top-0 h-64 z-20 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3) 50%, transparent)' }} />

      {/* ── Foreground ── */}
      <div ref={contentRef} className="relative z-30 h-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col will-change-transform">

        {/* Top meta row (sits below the transparent header) */}
        <div className="pt-[124px] lg:pt-[176px] flex items-start justify-between">
          <div key={`eyebrow-${cycle}`} className="soft-rise flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/75 font-sans">
            <span className="block w-8 h-px bg-white/60" />
            <span>{currentSlide.tagline}</span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="text-white/50 hidden sm:inline tracking-[0.2em]">{currentSlide.locationLabel}</span>
          </div>
        </div>

        {/* Headline block — bottom-anchored */}
        <div className="mt-auto pb-36 sm:pb-40 lg:pb-44 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <h1 key={`h1-${cycle}`} className="lg:col-span-8 font-display font-normal text-white leading-[0.95] tracking-[-0.02em] text-[clamp(2.75rem,6.3vw,7.5rem)]">
            <span className="mask-line"><span>{currentSlide.titlePrefix}</span></span>
            <span className="mask-line"><span className="italic text-white/80" style={{ animationDelay: '120ms' }}>{currentSlide.titleItalic}</span></span>
          </h1>

          <div key={`sub-${cycle}`} className="lg:col-span-4 lg:pb-4 max-w-sm soft-rise" style={{ animationDelay: '320ms' }}>
            <p className="font-sans text-sm sm:text-[15px] text-white/75 font-light leading-relaxed">
              {currentSlide.subtitle}
            </p>

          </div>
        </div>
      </div>

      {/* ── Bottom control strip: timed chapters · arrows · next-slide preview ── */}
      <div className="absolute bottom-0 inset-x-0 z-30">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 pb-6 sm:pb-8 flex items-end gap-6 lg:gap-10">

          {/* Chapters — progress bar timing drives the auto-advance */}
          <div className="flex-1 grid grid-cols-5 gap-3 sm:gap-5">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              const isDone = idx < currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goTo(idx)}
                  className="text-left cursor-pointer group/bar focus:outline-none"
                  aria-label={`Jump to slide ${idx + 1}: ${slide.tagline}`}
                >
                  <span className="block py-3">
                  <span className="block h-px bg-white/25 group-hover/bar:bg-white/50 transition-colors overflow-hidden">
                    {isActive ? (
                      <span
                        key={`bar-${cycle}`}
                        className="hero-progress block h-full bg-white"
                        style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: isPaused ? 'paused' : 'running' }}
                        onAnimationEnd={handleNext}
                      />
                    ) : (
                      <span className={`block h-full bg-white transition-transform duration-700 origin-left ${isDone ? 'scale-x-100 opacity-40' : 'scale-x-0'}`} />
                    )}
                  </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-white/30 hover:border-white hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Previous splash slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-white/30 hover:border-white hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Next splash slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Next preview — a window onto the following chapter */}
          <button
            onClick={handleNext}
            className="hidden lg:block relative w-44 h-28 shrink-0 overflow-hidden cursor-pointer group/next"
            aria-label={`Next: ${nextSlide.tagline}`}
          >
            <img
              key={`next-${cycle}`}
              src={nextSlide.image}
              alt=""
              style={{ objectPosition: nextSlide.focus || 'center' }}
              className={`soft-rise absolute inset-0 w-full h-full object-cover ${nextSlide.trueColour ? '' : 'grayscale contrast-125 brightness-75'} transition-transform duration-[1200ms] group-hover/next:scale-110`}
            />
            <span className="absolute inset-0 bg-black/30 group-hover/next:bg-black/10 transition-colors duration-500" />
          </button>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hidden lg:flex absolute z-30 left-1/2 -translate-x-1/2 bottom-28 flex-col items-center gap-2 pointer-events-none">
        <span className="block w-px h-10 bg-white/20 overflow-hidden"><span className="scroll-cue block w-full h-full bg-white" /></span>
      </div>
    </section>
  );
};

export const HeroSection: React.FC = () => {
  const mobile = useMobileLayout();
  return mobile ? <HeroSectionClassic /> : <HeroSectionCinematic />;
};
