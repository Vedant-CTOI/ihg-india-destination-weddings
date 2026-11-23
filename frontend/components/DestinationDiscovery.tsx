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
  // Mobile: swipe left/right on the photo to change destination (arrows hidden on mobile)
  const touchX = useRef<number | null>(null);
  const swiped = useRef(false);
  const web = useWeb(); // WEB VERSION ONLY styling/motion below

  const totalGenres = WEDDING_GENRES_DATA.length;
  const activeGenre = WEDDING_GENRES_DATA[currentIndex] || WEDDING_GENRES_DATA[0];
  // Same names + photos as the Discover by Destination page (Region 1/2/3 = Goa/Thailand/Jaipur, then Destination 4, 5…)
  const destName = HOME_DEST_NAMES[currentIndex] || `Destination ${currentIndex + 1}`;

  // ── WEB: Expanding colour-block reveal + directional destination transitions. Go back = tag checkpoint-before-dest-colourblock ──
  const N_WEB_MS = 6000; // auto-advance on web (option A); mobile keeps 4.5s
  const TRANS_MS = 1200;
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [phase, setPhase] = useState<'pre' | 'run' | 'done'>(() => (reduceMotion ? 'done' : 'pre'));
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [dir, setDir] = useState<number>(1);
  const [tick, setTick] = useState<number>(0);
  const idxRef = useRef<number>(0);
  const busy = useRef(false);
  const pending = useRef<{ t: number; d: number } | null>(null);
  const transTimer = useRef<number>(0);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const parRef = useRef<HTMLDivElement | null>(null);
  idxRef.current = currentIndex;

  const go = (target: number, d: number) => {
    if (target === idxRef.current) return;
    if (busy.current) { pending.current = { t: target, d }; return; }
    busy.current = true;
    setPrevIdx(idxRef.current); setDir(d); setTick((t) => t + 1);
    idxRef.current = target; setCurrentIndex(target);
    transTimer.current = window.setTimeout(() => {
      busy.current = false; setPrevIdx(null);
      const p = pending.current; pending.current = null;
      if (p && p.t !== idxRef.current) go(p.t, p.d);
    }, reduceMotion ? 0 : TRANS_MS + 40);
  };
  useEffect(() => () => window.clearTimeout(transTimer.current), []);

  // reveal plays once per visit, when the band is ~30% in view (option C)
  useEffect(() => {
    if (!web || phase !== 'pre') return;
    const el = mediaRef.current; if (!el) return;
    HOME_DEST_IMG.forEach((s) => { const i = new Image(); i.src = s; });
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect(); setPhase('run'); t = window.setTimeout(() => setPhase('done'), 3600);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web]);

  // very subtle parallax on the photo (≈ ±40px, lags the scroll)
  useEffect(() => {
    if (!web || reduceMotion) return;
    let raf = 0;
    const tickPar = () => {
      raf = 0;
      const el = mediaRef.current, par = parRef.current; if (!el || !par) return;
      const r = el.getBoundingClientRect(); const vh = window.innerHeight || 1;
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
      par.style.transform = `translate3d(0, ${(-p * 40).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tickPar); };
    tickPar();
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web]);

  // web auto-advance: 6s, starts after the reveal, pauses on hover; any change restarts it
  useEffect(() => {
    if (!web || phase !== 'done' || isHovered) return;
    const t = window.setTimeout(() => go((idxRef.current + 1) % totalGenres, 1), N_WEB_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web, phase, isHovered, currentIndex, totalGenres]);

  // Auto cycling progression (4500ms, MOBILE); pauses on hover; any slide change (arrow, dot, auto) restarts the 4.5s timer
  useEffect(() => {
    if (web) return;
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalGenres);
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, totalGenres, currentIndex, web]);

  const handleNext = () => {
    if (web) { go((idxRef.current + 1) % totalGenres, 1); return; }
    setCurrentIndex((prev) => (prev + 1) % totalGenres);
  };

  const handlePrev = () => {
    if (web) { go((idxRef.current - 1 + totalGenres) % totalGenres, -1); return; }
    setCurrentIndex((prev) => (prev - 1 + totalGenres) % totalGenres);
  };
  const handleDot = (idx: number) => {
    if (web) { go(idx, idx > idxRef.current ? 1 : -1); return; }
    setCurrentIndex(idx);
  };
  const nameOf = (i: number) => HOME_DEST_NAMES[i] || `Destination ${i + 1}`;
  const imgOf = (i: number) => HOME_DEST_IMG[i % HOME_DEST_IMG.length];
  const WebInner = (i: number, mode: 'static' | 'in' | 'out') => (
    <div key={`${mode}-${mode === 'static' ? 0 : tick}`} aria-hidden={mode === 'out' ? true : undefined}
         className={`home-dest-inner dd-txt dd-txt-${mode} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14`}>
      <h3 className="home-dest-name font-serif font-normal leading-[0.95] tracking-[-0.015em] text-[clamp(2.2rem,3.6vw,3.6rem)] text-white">
        <span className="dd-ml dd-num"><span className="dd-mi">{String(i + 1).padStart(2, '0')}</span></span>
        <span className="dd-ml dd-nm"><span className="dd-mi">{nameOf(i)}</span></span>
      </h3>
      <p className="home-dest-copy dd-copy mt-4 max-w-md text-sm font-light leading-relaxed text-white/85">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, incididunt ut labore.</p>
      <button type="button" tabIndex={mode === 'out' ? -1 : undefined} onClick={(e) => { e.stopPropagation(); handleOpenDetail(); }}
              className="home-dest-cta dd-cta group/cta mt-5 inline-flex items-center gap-3 bg-white text-black text-[11px] uppercase tracking-wider font-medium pl-6 pr-5 py-3 rounded-full cursor-pointer">
        <span>Discover {nameOf(i)} Properties</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-700 group-hover/cta:translate-x-1" />
      </button>
    </div>
  );

  const handleOpenDetail = () => {
    if (onOpenDetail) {
      onOpenDetail();
    }
  };

  return (
    <section id="destinations" className={`dest-band py-14 sm:py-16 bg-neutral-50 border-b border-neutral-200 ${web ? 'cine' : ''}`} data-tone={web ? 'light' : undefined} style={web ? { backgroundColor: PALETTE.marigold, borderColor: 'transparent' } : undefined}>
      {/* 16:9 end-to-end band (web: header over the photo; mobile: header above, 16:9 photo full width). Go back = tag checkpoint-before-dest-169 */}
      <div className="dest-band-head max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header — CTA top right, like other sections */}
        <div className="sec-head flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div className="max-w-xl">
            <span data-wm={web ? '' : undefined} className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans font-medium block mb-1">
              Curated Wedding Types
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-black font-normal mb-1.5">
              {web ? <SplitText text="Discover by Destination" /> : 'Discover by Destination'}
            </h2>
            <p data-wm={web ? '' : undefined} style={{ ['--d' as any]: '300ms' }} className="font-sans text-neutral-500 text-xs font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et veniam, quis nostrud exercitation ullamco.
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
      </div>

        {/* Automatic Horizontal Carousel — full-width 16:9 band */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setIsHovered(true); }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - (touchX.current ?? e.changedTouches[0].clientX);
            touchX.current = null; setIsHovered(false);
            if (Math.abs(dx) > 40) { swiped.current = true; dx < 0 ? handleNext() : handlePrev(); setTimeout(() => { swiped.current = false; }, 350); }
          }}
          ref={mediaRef}
          data-wm={web ? undefined : undefined}
          className={`dest-band-media relative bg-white overflow-hidden group ${web ? `dd-stage dd-${phase} ${prevIdx !== null ? (dir > 0 ? 'dd-trans dd-fwd' : 'dd-trans dd-back') : ''}` : ''}`}
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
            onClick={() => { if (!swiped.current) handleOpenDetail(); }}
            className="home-dest-card relative h-full overflow-hidden bg-neutral-800 cursor-pointer group"
          >
            {web ? (
              <>
                {/* photo stack inside a parallax layer; outgoing photo stays beneath the incoming one */}
                <div ref={parRef} className="dd-par absolute inset-x-0 -top-[50px] -bottom-[50px] will-change-transform">
                  {prevIdx !== null && (
                    <div key={`p-${tick}`} className="dd-photo dd-photo-out absolute inset-0"><img src={imgOf(prevIdx)} alt="" data-real-photo="" className="absolute inset-0 w-full h-full object-cover" /></div>
                  )}
                  <div key={`c-${tick}`} className={`dd-photo ${prevIdx !== null ? 'dd-photo-in' : 'dd-photo-cur'} absolute inset-0`}>
                    <img src={imgOf(currentIndex)} alt={destName} data-real-photo="" className="dd-img absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
                <div className="home-dest-veil absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />
                {/* the design's own colour panels (panel sands) — they cover, expand and slide away */}
                <div className="dd-blk dd-blk-1" aria-hidden="true" />
                <div className="dd-blk dd-blk-2" aria-hidden="true" />
                <div className="dd-blk dd-blk-3" aria-hidden="true" />
                <div className="on-photo dd-panel absolute inset-x-0 bottom-0 text-white">
                  {prevIdx !== null && WebInner(prevIdx, 'out')}
                  {WebInner(currentIndex, prevIdx !== null ? 'in' : 'static')}
                </div>
              </>
            ) : (<>
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

            <div className="on-photo absolute inset-x-0 bottom-0 text-white">
             <div className="home-dest-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
                            <h3 className="home-dest-name font-serif font-normal leading-[0.95] tracking-[-0.015em] text-[clamp(2.2rem,3.6vw,3.6rem)] whitespace-nowrap text-white">
                <span className="text-white/55 mr-3 text-[0.55em] align-middle">{String(currentIndex + 1).padStart(2, '0')}</span>{destName}
              </h3>
              <p className="home-dest-copy mt-4 max-w-md text-sm font-light leading-relaxed text-white/85">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, incididunt ut labore.</p>
              <button type="button" onClick={(e) => { e.stopPropagation(); handleOpenDetail(); }}
                      className="home-dest-cta group/cta mt-5 inline-flex items-center gap-3 bg-white text-black text-[11px] uppercase tracking-wider font-medium pl-6 pr-5 py-3 rounded-full cursor-pointer">
                <span>Discover {destName} Properties</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-700 group-hover/cta:translate-x-1" />
              </button>
             </div>
            </div>
            </>)}
          </div>

        {/* Carousel indicator dots — inside the band, bottom centre */}
        <div className="dest-band-dots absolute left-0 right-0 bottom-5 z-40 flex justify-center items-center space-x-1.5">
          {WEDDING_GENRES_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); handleDot(idx); }}
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
