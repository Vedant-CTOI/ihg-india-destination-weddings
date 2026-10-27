import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HotelProperty, HotelVenueSpace } from '../types';
import { SplitText, PALETTE, CountUp } from './webMotion';

/* ════════════════════════════════════════════════════════════════════════════════════════
   HOTEL 1 FEATURE PAGE — WEB VERSION ONLY.
   Same design language as the landing page: no containers, full-bleed colour bands,
   1px hairlines for structure, hairline-led eyebrows, Arpona titles, thin progress lines
   and round outline arrows. Copy is identical to the standard page; data is untouched.
   ════════════════════════════════════════════════════════════════════════════════════════ */

export const FEATURE_HOTEL_ID = 'six-senses-fort-barwara';

const uimg = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
export const FEATURE_HERO = uimg('1545126178-862cdb469409', 2400);
const FEATURE_ABOUT = uimg('1784460843252-0957395d2888', 1800);
const POOL = [
  '1744805624890-9931ebb50428', '1754782915842-aa4fca6c203a', '1744804298093-07e5cb188a5f',
  '1791233176122-eb6067a2cc51', '1582510003544-4d00b7f74220', '1788026187470-1c78e51047d5',
  '1787831536851-7b8e9ef4a18c', '1760080839097-eff1408e48d8', '1787831082627-e7f0dae60c64',
  '1787831536189-aa3bea3049eb', '1787831536285-534e63115355', '1779253806487-401be91cc024',
  '1545126178-862cdb469409', '1784460843252-0957395d2888'
].map((id) => uimg(id, 1600));
// Venue 1 uses the client's photos (order as supplied); focus keeps mandap/tables in the 16:9 crop
const VENUE1: { url: string; pos: string }[] = [
  { url: '/venues/hotel1-venue1-1.jpg', pos: '50% 72%' },
  { url: '/venues/hotel1-venue1-2.jpg', pos: '50% 68%' },
  { url: '/venues/hotel1-venue1-3.jpg', pos: '50% 55%' },
  { url: '/venues/hotel1-venue1-4.jpg', pos: '50% 82%' },
  { url: '/venues/hotel1-venue1-5.jpg', pos: '50% 62%' },
  { url: '/venues/hotel1-venue1-6.jpg', pos: '50% 62%' }
];
const venuePhotos = (vIndex: number): { url: string; pos: string }[] =>
  vIndex === 0 ? VENUE1 : [0, 1, 2].map((k) => ({ url: POOL[(vIndex * 3 + k) % POOL.length], pos: '50% 50%' }));
const venueGallery = (vIndex: number) => venuePhotos(vIndex).map((p) => p.url);

type Slide = { url: string; caption: string; isDraftDrawing: boolean; notes?: string; pos?: string };
type PreviewFn = (i: number, slides: Slide[]) => void;

const INK = '#3a0618'; // deep maroon type on the light bands
const CYCLE_MS = 5000;
const SAFFRON = PALETTE.saffron; // festive accent (garland-on-velvet)
const LINE = 'rgba(58,6,24,.35)'; // venue-row hairlines (slightly stronger)
const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const WIPE = 'cubic-bezier(0.77,0,0.18,1)';

const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean; d?: number; line?: string }> = ({ children, light, d = 0, line }) => (
  <div data-wm="" style={{ ['--d' as any]: `${d}ms`, color: light ? 'rgba(255,255,255,.72)' : INK }}
       className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.32em]">
    <span className="block w-8 h-px" style={{ background: line || SAFFRON }} />
    <span>{children}</span>
  </div>
);

/* ── Hero ─────────────────────────────────────────────────────────────────────────────── */
export const FeatureHero: React.FC<{ hotel: HotelProperty; onExpand: () => void }> = ({ hotel, onExpand }) => {
  const secRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const tick = () => {
      const s = secRef.current;
      if (s) {
        const r = s.getBoundingClientRect();
        const y = Math.min(Math.max(-r.top, 0), r.height);
        if (imgRef.current) imgRef.current.style.transform = `translate3d(0, ${y * 0.32}px, 0) scale(1.06)`;
        if (copyRef.current) {
          copyRef.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
          copyRef.current.style.opacity = String(Math.max(1 - (y / r.height) * 1.6, 0));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={secRef} className="grain relative w-full overflow-hidden text-white"
         style={{ height: 'max(480px, calc(100svh - 145px))', backgroundColor: '#000' }}>
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <img src={FEATURE_HERO} alt={hotel.name} className="w-full h-full object-cover hero-zoom" />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(0,0,0,0.35)' }} />
      <div className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4) 50%, transparent)' }} />
      <div className="absolute inset-x-0 top-0 h-48 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }} />

      {/* existing control, restyled as a round outline button */}
      <button type="button" onClick={onExpand}
              className="absolute top-20 right-6 z-20 h-11 pl-5 pr-2 rounded-full border border-white/30 hover:border-white hover:bg-white hover:text-black text-white text-[10px] uppercase tracking-[0.28em] flex items-center gap-3 transition-all duration-500 cursor-pointer">
        <span>Expand Hero Visual</span>
        <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center"><ArrowRight className="w-3 h-3" /></span>
      </button>

      <div ref={copyRef} className="absolute inset-x-0 bottom-0 z-10 will-change-transform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="soft-rise flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/75 mb-5" style={{ animationDelay: '500ms' }}>
            <span className="block w-8 h-px bg-white/60" />
            <span>{hotel.brand}</span><span className="text-white/35">·</span>
            <span>{hotel.city}</span><span className="text-white/35">·</span>
            <span>{hotel.priceBand}</span>
          </div>
          <h1 className="font-normal leading-[0.95] tracking-[-0.02em] text-[clamp(3rem,7vw,7rem)]">
            <span className="mask-line"><span>{hotel.name}</span></span>
          </h1>
          <div className="soft-rise mt-6 pt-5 border-t border-white/20 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/70" style={{ animationDelay: '700ms' }}>
            <span>{hotel.location}</span>
            <span className="hidden sm:block w-px h-10 bg-white/20 overflow-hidden"><span className="scroll-cue block w-full h-full bg-white" /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Venue carousel: slow cross-fade, thin progress lines, round outline arrows ─────────── */
const LineCarousel: React.FC<{ slides: Slide[]; alt: string; onPreview: PreviewFn; light?: boolean }> = ({ slides, alt, onPreview }) => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const go = (n: number) => { setI(((n % slides.length) + slides.length) % slides.length); setCycle((c) => c + 1); };
  return (
    <div className="relative w-full h-full overflow-hidden group/lc cursor-pointer"
         onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
         onClick={() => onPreview(i, slides)} title="Click to preview full size">
      {slides.map((s, k) => (
        <img key={s.url + k} src={s.url} alt={`${alt} — ${s.caption}`}
             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${k === i ? 'about-drift' : ''}`}
             style={{ opacity: k === i ? 1 : 0, background: s.isDraftDrawing ? '#f4efe8' : undefined, objectFit: s.isDraftDrawing ? 'contain' : 'cover', objectPosition: s.pos || '50% 50%' }} />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.55), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end gap-5 text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex-1 flex gap-3">
          {slides.map((_, k) => (
            <button key={k} type="button" onClick={() => go(k)} className="flex-1 py-3 cursor-pointer" aria-label={`Show picture ${k + 1}`}>
              <span className="block h-px bg-white/30 overflow-hidden">
                {k === i
                  ? <span key={`b-${cycle}`} className="hero-progress block h-full"
                          style={{ background: SAFFRON, animationDuration: `${CYCLE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                          onAnimationEnd={() => go(i + 1)} />
                  : <span className={`block h-full bg-white origin-left ${k < i ? 'opacity-40' : 'scale-x-0'}`} />}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous venue picture"
                  className="w-10 h-10 rounded-full border border-white/40 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-all duration-500 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next venue picture"
                  className="w-10 h-10 rounded-full border border-white/40 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-all duration-500 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const HIGHLIGHTS: [string, string][] = [
  ['Venue Size', 'Lorem ipsum sq.ft'],
  ['Seating Capacity', 'Cluster · Classroom · Theatre'],
  ['Floating Capacity', 'Lorem ipsum guests'],
  ['In-Built Stage', 'Lorem ipsum'],
  ['Location', 'Indoor / Outdoor / Poolside'],
  ['Vendor Policies', 'In-House / Outside'],
  ['Venue Timing Slots', 'Lorem ipsum']
];

/* ── Body ─────────────────────────────────────────────────────────────────────────────── */
export const FeatureBody: React.FC<{
  hotel: HotelProperty;
  onPreview: PreviewFn;
  onNavigateToInquiry: (name: string) => void;
}> = ({ hotel, onPreview, onNavigateToInquiry }) => {
  const venues: HotelVenueSpace[] = hotel.curatedSpaces || [];
  const [current, setCurrent] = useState(0);
  // Hover swap (venue label -> small photo). Pointer devices only; touch keeps the text labels.
  const [hovered, setHovered] = useState<number | null>(null);
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const jumpRef = useRef<HTMLDivElement | null>(null);

  // underline the venue currently in view
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setCurrent(Number((e.target as HTMLElement).dataset.v));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('[data-v]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [venues.length]);

  const jump = (v: number) => {
    const el = document.getElementById(`venue-anchor-${v}`);
    if (!el) return;
    const off = (jumpRef.current?.getBoundingClientRect().bottom || 64) + 12;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
  };

  const transitTime = hotel.airportDistance ? hotel.airportDistance.split('from')[0].trim() : 'International Hub';
  const transitFrom = hotel.airportDistance ? hotel.airportDistance.split('from')[1]?.trim() || 'Nearest Hub' : 'Arrival Gate';

  const facts: { label: string; value: React.ReactNode; sub: string; word?: boolean }[] = [
    { label: 'Capacity', value: <><CountUp to={hotel.capacityMin} duration={1400} />–<CountUp to={hotel.capacityMax} duration={2000} /></>, sub: 'Guests' },
    { label: 'Total Rooms', value: <CountUp to={hotel.roomsCount} duration={1800} delay={180} />, sub: 'Keys, Suites & Villas' },
    { label: 'No of Venues', value: <CountUp to={venues.length} duration={1400} delay={360} />, sub: 'Curated Spaces' },
    { label: 'Setting', value: hotel.genre, sub: hotel.city, word: true },
    { label: 'Transit', value: transitTime, sub: transitFrom, word: true }
  ];

  const W = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

  return (
    <div className="hotel-feature-body">
      {/* B. Facts — full-bleed maroon band, figures between hairline dividers */}
      <section className="text-white" style={{ backgroundColor: PALETTE.maroon, borderTop: '1px solid #fff', borderBottom: '1px solid #fff' }}>
        <div className={`${W} py-16`}>
          <div className="border-t border-white/20 grid grid-cols-2 sm:grid-cols-5">
            {facts.map((f, k) => (
              <div key={f.label} data-wm="" style={{ ['--d' as any]: `${k * 140}ms` }}
                   className={`pt-7 pb-2 ${k > 0 ? 'sm:pl-7' : ''} ${k < facts.length - 1 ? 'sm:pr-7 sm:border-r border-white/20' : ''}`}>
                <span className="block text-[10px] uppercase tracking-[0.28em] text-white/60 mb-4">{f.label}</span>
                <div className="h-[clamp(2.4rem,3.4vw,3.2rem)] flex items-end">
                  <div className={f.word
                    ? 'font-arpona text-[clamp(1.05rem,1.35vw,1.35rem)] leading-[1.15] line-clamp-2'
                    : 'font-arpona text-[clamp(2rem,3.2vw,3.2rem)] leading-none whitespace-nowrap'}
                       style={{ color: '#fff' }}>{f.value}</div>
                </div>
                <span className="block mt-3 text-[11px] text-white/65 truncate">{f.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C. About — marigold band split in half; photo fills the right half edge to edge */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2" style={{ backgroundColor: SAFFRON, color: INK }}>
        <div className="px-4 sm:px-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12 py-10 lg:py-12 space-y-4 self-center">
          <Eyebrow line={INK}>About Us — {hotel.name}</Eyebrow>
          <h2 className="text-[clamp(1.6rem,2.3vw,2.3rem)] leading-[1.05] tracking-[-0.015em]">
            <SplitText text="An Architectural Sanctuary of Sacred Romance" />
          </h2>
          <p data-wm="" style={{ ['--d' as any]: '300ms', opacity: 0.92 }} className="text-[13.5px] leading-[1.65] max-w-xl">
            {hotel.aboutUs || hotel.overview}
          </p>
          <div data-wm="" style={{ ['--d' as any]: '450ms', borderColor: 'rgba(58,6,24,.45)' }} className="pt-3 border-t flex items-baseline justify-between gap-6 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.28em]" style={{ opacity: 0.85 }}>Signature Mandap Spec</span>
            <span className="font-arpona text-lg">{hotel.mandapType}</span>
          </div>
        </div>
        <div data-wm="curtain" className="relative min-h-[260px] lg:min-h-[340px]">
          <div className="absolute inset-0 overflow-hidden">
            <img src={FEATURE_ABOUT} alt={`${hotel.name} courtyard`} className="w-full h-full object-cover about-drift" />
          </div>
        </div>
      </section>

      {/* D + E. Venues — saffron band, open alternating rows separated by hairlines */}
      <section style={{ backgroundColor: '#fff', color: INK, borderTop: '1px solid rgba(58,6,24,.12)' }}>
        <div className={`${W} pt-20 pb-10`}>
          <Eyebrow>Celebration Grounds</Eyebrow>
          <h3 className="mt-6 font-arpona text-[clamp(2.2rem,3.6vw,3.6rem)] leading-[1.02] tracking-[-0.015em]">
            <SplitText text="Curated Venues & Architectural Spaces" />
          </h3>
          <p data-wm="" style={{ ['--d' as any]: '300ms', opacity: 0.85 }} className="mt-5 text-[15px] leading-[1.7] max-w-2xl">
            Each venue space features an automatic rotating photo carousel paired with technical draft drawing layouts and verified capacity metrics. Click any image to view in full-screen popup overlay.
          </p>
        </div>

        {/* jump bar — venue numbers on a hairline; current one underlined */}
        <div ref={jumpRef} className="sticky top-[146px] z-20" style={{ backgroundColor: 'rgba(255,255,255,.97)' }}>
          <div className={`${W} border-y flex items-start gap-7 overflow-x-auto overflow-y-hidden no-scrollbar`} style={{ borderColor: 'rgba(58,6,24,.2)' }}>
            {venues.map((venue, v) => {
              const shown = current === v || hovered === v; // selected venue always shows its photo
              const ph = venuePhotos(v)[0];
              return (
              <button key={v} type="button" onClick={() => jump(v)} aria-label={`Venue ${v + 1} - ${venue.capacity}`}
                      aria-current={current === v ? 'true' : undefined}
                      onMouseEnter={() => canHover && setHovered(v)} onMouseLeave={() => setHovered((h) => (h === v ? null : h))}
                      className="relative shrink-0 h-[96px] text-left text-[11px] uppercase tracking-[0.28em] cursor-pointer"
                      style={{
                        width: shown ? 120 : 76,
                        opacity: shown ? 1 : 0.55,
                        transition: `width 500ms ${EASE}, opacity 500ms ${EASE}`
                      }}>
                {/* text label (centred) — slides up and away when the photo shows */}
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap"
                      style={{ opacity: shown ? 0 : 1, transform: `translateY(${shown ? '-120%' : '-50%'})`, transition: `transform 500ms ${EASE}, opacity 500ms ${EASE}` }}>
                  Venue {v + 1}
                </span>
                {/* venue photo (16:9) rises in with the shutter wipe */}
                <span aria-hidden="true" className="absolute left-0 top-[8px] w-[120px] h-[68px] overflow-hidden pointer-events-none"
                      style={{ clipPath: shown ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)', transition: `clip-path 500ms ${WIPE}` }}>
                  <img src={ph.url} alt="" className="w-full h-full object-cover"
                       style={{ objectPosition: ph.pos, transform: shown ? 'scale(1)' : 'scale(1.12)', transition: `transform 900ms ${EASE}` }} />
                  <span className="absolute inset-0 pointer-events-none"
                        style={{ boxShadow: 'inset 0 0 0 2px #fff', opacity: current === v ? 1 : 0, transition: `opacity 500ms ${EASE}` }} />
                </span>
                {/* small number under the photo */}
                <span aria-hidden="true" className="absolute left-0 bottom-[4px] text-[9px] tracking-[0.28em] whitespace-nowrap"
                      style={{ opacity: shown ? 0.8 : 0, transition: `opacity 500ms ${EASE}` }}>
                  Venue {v + 1}
                </span>
                <span className="absolute left-0 right-0 bottom-[-1px] h-px origin-left transition-transform duration-700"
                      style={{ background: SAFFRON, height: 2, transform: `scaleX(${current === v ? 1 : 0})` }} />
              </button>
              );
            })}
          </div>
        </div>

        <div className={`${W} pb-24`}>
          {venues.map((venue, v) => {
            const slides: Slide[] = [
              ...venuePhotos(v).map((ph, k) => ({ url: ph.url, pos: ph.pos, caption: `Ceremony Vista 0${k + 1}`, isDraftDrawing: false })),
              {
                url: venue.draftLayoutImage || '',
                caption: venue.draftLayoutTitle || 'Draft Drawing Layout & Seating Architecture',
                isDraftDrawing: true,
                notes: venue.layoutNotes || 'Technical draft drawing showing staging, mandap orientation, and guest flow.'
              }
            ];
            const flip = v % 2 === 1;
            return (
              <article key={v} id={`venue-anchor-${v}`} data-v={v}
                       className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-14 border-b items-center"
                       style={{ borderColor: LINE }}>
                <div data-wm="curtain" className={`lg:col-span-7 relative aspect-video self-center ${flip ? 'lg:order-2' : ''}`}>
                  <div className="absolute inset-0">
                    <LineCarousel slides={slides} alt={venue.name} onPreview={onPreview} />
                  </div>
                </div>
                <div className={`lg:col-span-5 flex flex-col justify-center ${flip ? 'lg:order-1' : ''}`}>
                  <div data-wm="" className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em]"
                       style={{ color: SAFFRON, fontWeight: 500 }}>
                    <span className="block w-8 h-px" style={{ background: SAFFRON }} />
                    <span>{venue.capacity}</span>
                  </div>
                  <h4 data-wm="" style={{ ['--d' as any]: '120ms' }} className="mt-5 font-arpona text-[clamp(1.8rem,2.6vw,2.6rem)] leading-[1.04]">
                    Venue {v + 1} - Placeholder Text
                  </h4>
                  <p data-wm="" style={{ ['--d' as any]: '240ms', opacity: 0.85 }} className="mt-4 text-[14px] leading-[1.7]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                  </p>
                  <dl data-wm="" style={{ ['--d' as any]: '360ms', borderColor: LINE }} className="mt-8 border-t grid grid-cols-2">
                    {HIGHLIGHTS.map(([k, val], h) => (
                      <div key={k} className={`py-3.5 border-b ${h % 2 === 0 ? 'pr-5 border-r' : 'pl-5'}`} style={{ borderColor: LINE }}>
                        <dt className="text-[10px] uppercase tracking-[0.22em]" style={{ opacity: 0.65 }}>{k}</dt>
                        <dd className="mt-1 text-[13px]">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* F. Wedding Director — full-bleed maroon closing band (compact) */}
      <section className="text-white" style={{ backgroundColor: PALETTE.maroon, borderTop: '1px solid #fff', borderBottom: '1px solid #fff' }}>
        <div className={`${W} py-14`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <Eyebrow light>Your Dedicated Wedding Director &amp; Stylist</Eyebrow>
              <h4 data-wm="" style={{ ['--d' as any]: '120ms' }} className="mt-3 font-arpona text-[clamp(1.5rem,2.1vw,2.1rem)] leading-[1.05]">
                Wedding Director — {hotel.name}
              </h4>
              <p data-wm="" style={{ ['--d' as any]: '240ms' }} className="mt-2 text-[13px] leading-[1.6] text-white/75 max-w-xl">
                Curating celebrations at {hotel.name} for over a decade. Your single point of contact from first call to farewell brunch.
              </p>
            </div>
            <div data-wm="" style={{ ['--d' as any]: '360ms' }} className="lg:col-span-5 flex flex-col gap-4">
              <div className="border-t border-white/20 text-[12px] grid grid-cols-1 sm:grid-cols-3">
                <a href="tel:+919****3210" className="flex items-center gap-2 pt-3 sm:pr-3 text-white/85 hover:text-white transition-colors whitespace-nowrap">
                  <span className="text-white/55">✆</span><span>+91 98765 43210</span>
                </a>
                <a href="mailto:weddings@ihg.com" className="flex items-center gap-2 pt-3 sm:px-3 sm:border-l border-white/20 text-white/85 hover:text-white transition-colors whitespace-nowrap">
                  <span className="text-white/55">✉</span><span>weddings@ihg.com</span>
                </a>
                <div className="flex items-center gap-2 pt-3 sm:pl-3 sm:border-l border-white/20 text-white/85 whitespace-nowrap">
                  <span aria-hidden="true" className="w-3 h-3 inline-block border border-white/50"></span><span>Mon–Sat · 09:00–19:00 IST</span>
                </div>
              </div>
              <button type="button" onClick={() => onNavigateToInquiry(hotel.name)}
                      className="group/cta self-start bg-white text-black pl-6 pr-1.5 py-1.5 rounded-full tracking-[0.18em] uppercase text-[10px] inline-flex items-center gap-3 transition-colors hover:bg-neutral-200 cursor-pointer">
                <span>Begin the Conversation</span>
                <span className="w-8 h-8 rounded-full text-white flex items-center justify-center transition-transform duration-500 group-hover/cta:translate-x-1" style={{ backgroundColor: SAFFRON }}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
