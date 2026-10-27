import React, { useEffect, useRef, useState } from 'react';
import { AboutUsClassic, AboutUsProps } from './AboutUsClassic';
import { useMobileLayout } from './useMobileLayout';
import { DUMMY_ABOUT } from './landingDummyImages';
import { PALETTE } from './webMotion';

/**
 * Chapter I — About Us.
 * Desktop: a pinned stage scrubbed by scroll.
 *   1. Full-bleed landscape; the title arrives large at the bottom-left.
 *   2. As you scroll, the title rises and settles at the top-left (and stays),
 *      while the landscape contracts into a 5:4 frame on the right.
 *   3. The paragraphs, then the figures, appear beneath the title and stay —
 *      the left column simply fills as the story builds.
 * Everything is reversible: scrolling up plays it backwards.
 * Mobile: the same content, stacked.
 */

// Cyclic image set (5). Captions only where the original copy had one.
const IMAGES = [
  { src: DUMMY_ABOUT[0].src, alt: 'Sacred Indian wedding ceremonial mandap and floral setup', caption: 'Ceremonial Sacredness' },
  { src: DUMMY_ABOUT[1].src, alt: 'Traditional Indian wedding ceremony moment', caption: 'Timeless Vows' },
  { src: DUMMY_ABOUT[2].src, alt: 'Historic Indian royal fortress courtyard setting', caption: 'Historic Citadels' }
];
const CYCLE_MS = 5000;

const PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
];

// Same figures as before, split into a counting number + its unit
const STATS = [
  { to: 6000, unit: '+', label: 'Global Heritage', duration: 2200 },
  { to: 5, unit: '-Point', label: 'Ceremony Audit', duration: 1400 },
  { to: 100, unit: '%', label: 'Kitchen Custody', duration: 1800 }
];
const fmt = (n: number) => n.toLocaleString('en-US');
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep
const seg = (p: number, a: number, b: number) => ease(clamp01((p - a) / (b - a)));

const Eyebrow: React.FC = () => (
  <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/70 font-sans">
    <span className="block w-8 h-px bg-white/60" />
    <span>About Us — IHG Weddings</span>
  </div>
);

/* ───────────────────────────── Desktop: pinned, scroll-scrubbed ───────────────────────────── */
const PinnedAbout: React.FC<AboutUsProps> = ({ onOpenAboutPage }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const colRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const clipRef = useRef<HTMLDivElement | null>(null);
  const zoomRef = useRef<HTMLDivElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);
  const gradRef = useRef<HTMLDivElement | null>(null);
  const capRef = useRef<HTMLSpanElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const countedRef = useRef(false);
  const [counting, setCounting] = useState(false);
  const [active, setActive] = useState(0);

  // geometry, recomputed on resize / font load
  const geo = useRef({ vw: 0, vh: 0, fx: 0, fy: 0, fw: 0, fh: 0, S: 1, ty: 0 });

  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const side = Math.max(56, (vw - 1600) / 2 + 56);  // matches the hero's container edge
      const top = 144 + Math.max(10, vh * 0.03);                      // clears the 144px header
      const bottom = vh * 0.08;
      const gap = Math.max(48, vw * 0.045);

      // Image panel: full height of the section, flush to the right edge, half the width
      const fw = Math.round(vw * 0.5);
      const fh = vh;
      const fx = vw - fw;
      const fy = 0;

      // left column = everything left of the frame
      const col = colRef.current;
      if (col) {
        col.style.left = `${side}px`;
        col.style.top = `${top}px`;
        col.style.width = `${fx - side - gap}px`;
      }

      // Fit the column inside the frame's height: step the body size down on short screens
      const body = bodyRef.current;
      if (col && body) {
        const avail = vh - top - 36;
        let fs = 15;
        body.style.fontSize = `${fs}px`;
        // reset heading transform so we measure the settled layout
        const hd = headRef.current; const prevT = hd ? hd.style.transform : '';
        if (hd) hd.style.transform = 'none';
        for (let k = 0; k < 8 && col.offsetHeight > avail && fs > 12.5; k++) {
          fs -= 0.5;
          body.style.fontSize = `${fs}px`;
        }
        if (hd) hd.style.transform = prevT;
      }

      // FLIP the heading: measure its settled (small) position, derive the large start state
      const head = headRef.current;
      let S = 1, ty = 0;
      if (head && line1Ref.current && line2Ref.current) {
        const prev = head.style.transform;
        head.style.transform = 'none';
        // settled top of the heading, relative to the pinned stage (not the window)
        const settledTop = top + head.offsetTop;
        const h = head.offsetHeight;
        const textW = Math.max(line1Ref.current.offsetWidth, line2Ref.current.offsetWidth);
        head.style.transform = prev;
        S = Math.min(2.3, (vw - side * 2) / (textW || 1));
        const targetBottom = vh - vh * 0.13;
        ty = targetBottom - h * S - settledTop;
      }
      geo.current = { vw, vh, fx, fy, fw, fh, S, ty };
    };

    let raf = 0;
    const tick = () => {
      const el = sectionRef.current;
      const g = geo.current;
      if (el && g.vw) {
        const rect = el.getBoundingClientRect();
        const travel = el.offsetHeight - window.innerHeight;
        const p = clamp01(-rect.top / (travel || 1));

        const m = seg(p, 0.1, 0.42);        // title rise + image contraction

        // heading: large at the bottom → settled at the top-left
        if (headRef.current) {
          const s = g.S + (1 - g.S) * m;
          headRef.current.style.transform = `translate3d(0, ${g.ty * (1 - m)}px, 0) scale(${s})`;
        }
        if (line2Ref.current) {
          const o = seg(p, 0.0, 0.08);
          line2Ref.current.style.opacity = String(o);
          line2Ref.current.style.transform = `translate3d(0, ${(1 - o) * 30}px, 0)`;
        }

        // landscape → 5:4 frame on the right
        if (clipRef.current) {
          const t = g.fy * m;
          const r = (g.vw - g.fx - g.fw) * m;
          const b = (g.vh - g.fy - g.fh) * m;
          const l = g.fx * m;
          clipRef.current.style.clipPath = `inset(${t}px ${r}px ${b}px ${l}px)`;
          if (capRef.current) {
            capRef.current.style.right = `${r + 24}px`;
            capRef.current.style.bottom = `${b + 22}px`;
          }
          if (dotsRef.current) {
            dotsRef.current.style.left = `${l + 24}px`;
            dotsRef.current.style.bottom = `${b + 26}px`;
          }
        }
        if (zoomRef.current) zoomRef.current.style.transform = `scale(${1.14 - p * 0.14})`;
        if (veilRef.current) veilRef.current.style.opacity = String(0.42 * (1 - m) + 0.06);
        if (gradRef.current) gradRef.current.style.opacity = String(1 - m);

        // paragraphs, then figures — appear and stay
        paraRefs.current.forEach((n, i) => {
          if (!n) return;
          const a = 0.44 + i * 0.15;
          const o = seg(p, a, a + 0.12);
          n.style.opacity = String(o);
          n.style.transform = `translate3d(0, ${(1 - o) * 28}px, 0)`;
        });
        statRefs.current.forEach((n, i) => {
          if (!n) return;
          const a = 0.74 + i * 0.05;
          const o = seg(p, a, a + 0.1);
          n.style.opacity = String(o);
          n.style.transform = `translate3d(0, ${(1 - o) * 40}px, 0)`;
        });
        if (ctaRef.current) {
          const o = seg(p, 0.86, 0.96);
          ctaRef.current.style.opacity = String(o);
          ctaRef.current.style.transform = `translate3d(0, ${(1 - o) * 24}px, 0)`;
        }
        // figures count up once they arrive; reset if the reader scrolls back above them
        if (p > 0.76 && !countedRef.current) { countedRef.current = true; setCounting(true); }
        if (p < 0.6 && countedRef.current) { countedRef.current = false; setCounting(false); }
      }
      raf = requestAnimationFrame(tick);
    };

    IMAGES.forEach((im) => { const i = new Image(); i.src = im.src; });
    measure();
    (document as any).fonts?.ready?.then(measure);
    window.addEventListener('resize', measure);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // cycle the images (continuous, independent of scroll)
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % IMAGES.length), CYCLE_MS);
    return () => clearInterval(t);
  }, []);

  // count-up for the figures (inspired by an odometer-style counter)
  useEffect(() => {
    if (!counting) {
      numRefs.current.forEach((n) => { if (n) n.textContent = '0'; });
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      let done = true;
      STATS.forEach((st, i) => {
        const n = numRefs.current[i];
        if (!n) return;
        const delay = i * 180;
        const t = Math.min(Math.max((now - start - delay) / st.duration, 0), 1);
        if (t < 1) done = false;
        n.textContent = fmt(Math.round(st.to * easeOutExpo(t)));
      });
      if (!done) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [counting]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="cine relative text-white"
      style={{ height: '420vh', backgroundColor: PALETTE.maroon }}
      aria-label="About Us — IHG Weddings"
    >
      <div className="grain sticky top-0 h-[100svh] overflow-hidden">

        {/* Image plane — clip-path contracts it from full-bleed to the 5:4 frame */}
        <div ref={clipRef} className="absolute inset-0 overflow-hidden">
          <div ref={zoomRef} className="absolute inset-0">
            {IMAGES.map((im, i) => (
              <div
                key={im.src}
                className="absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <img
                  src={im.src}
                  alt={im.alt}
                  className={`w-full h-full object-cover ${i === active ? 'about-drift' : ''}`}
                />
              </div>
            ))}
          </div>
          <div ref={veilRef} className="absolute inset-0" style={{ opacity: 0.48, background: '#000' }} />
          <div ref={gradRef} className="absolute inset-x-0 bottom-0 h-2/3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
          <span
            ref={capRef}
            className="absolute text-[10px] uppercase tracking-[0.32em] text-white/80 font-sans"
            style={{ right: 20, bottom: 18 }}
          >
            <span key={`cap-${active}`} className="soft-rise inline-block">{IMAGES[active].caption}</span>
          </span>

          {/* cycle indicator — five thin lines, no labels */}
          <div ref={dotsRef} className="absolute flex gap-2" style={{ left: 24, bottom: 22 }}>
            {IMAGES.map((_, i) => (
              <span key={i} className="block h-px w-6 bg-white/30 overflow-hidden">
                {i === active && (
                  <span key={`bar-${active}`} className="hero-progress block h-full bg-white" style={{ animationDuration: `${CYCLE_MS}ms` }} />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Left column — heading settles here; paragraphs and figures build beneath it */}
        <div ref={colRef} className="absolute z-20" style={{ left: 56, top: 176, width: '40vw' }}>
          <div ref={headRef} className="origin-top-left">
            <div className="mb-5"><Eyebrow /></div>
            <h2 className="font-display font-normal leading-[1.02] tracking-[-0.015em] text-[clamp(2rem,3.3vw,3.6rem)]">
              <span className="block"><span ref={line1Ref} className="inline-block whitespace-nowrap">Placeholder Text</span></span>
              <span className="block"><span ref={line2Ref} className="inline-block whitespace-nowrap italic text-white/75">(About Us)</span></span>
            </h2>
          </div>

          <div ref={bodyRef} className="mt-[1.6em] space-y-[1em] max-w-[38rem] text-[15px]">
            {PARAGRAPHS.map((t, i) => (
              <p
                key={i}
                ref={(n) => { paraRefs.current[i] = n; }}
                className="font-sans font-light leading-[1.7] text-white/75"
                style={{ opacity: 0 }}
              >
                {t}
              </p>
            ))}

          <div className="!mt-[2.2em] border-t border-white/15 grid grid-cols-3">
            {STATS.map((st, i) => (
              <div
                key={st.label}
                ref={(n) => { statRefs.current[i] = n; }}
                className={`pt-[1.4em] ${i > 0 ? 'pl-[1.4em]' : ''} ${i < STATS.length - 1 ? 'pr-[1.4em] border-r border-white/15' : ''}`}
                style={{ opacity: 0 }}
              >
                <div className="flex items-baseline gap-1.5 font-display font-normal leading-none tabular-nums">
                  <span ref={(n) => { numRefs.current[i] = n; }} className="text-[clamp(1.8rem,2.8vw,3rem)]">0</span>
                  <span className="text-[0.95em] text-white/60">{st.unit}</span>
                </div>
                <span className="block mt-3 text-[10px] uppercase tracking-[0.28em] text-white/55 font-sans">{st.label}</span>
              </div>
            ))}
          </div>
          {onOpenAboutPage && (
            <div ref={ctaRef} className="!mt-[2em]" style={{ opacity: 0 }}>
              <button
                type="button"
                onClick={onOpenAboutPage}
                className="inline-flex items-center space-x-2 text-[11px] font-sans uppercase tracking-wider bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded-full transition-colors duration-500 font-medium cursor-pointer"
              >
                <span>Discover Our Story</span>
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────────── Mobile / tablet: stacked ───────────────────────────── */
const StackedAbout: React.FC<AboutUsProps> = ({ onOpenAboutPage }) => {
  const [active, setActive] = useState(0);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const t = setInterval(() => setActive((x) => (x + 1) % IMAGES.length), CYCLE_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        let done = true;
        STATS.forEach((st, i) => {
          const n = numRefs.current[i];
          if (!n) return;
          const t = Math.min(Math.max((now - start - i * 180) / st.duration, 0), 1);
          if (t < 1) done = false;
          n.textContent = fmt(Math.round(st.to * easeOutExpo(t)));
        });
        if (!done) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="about" className="cine text-white py-20 px-5 sm:px-8" style={{ backgroundColor: PALETTE.maroon }} aria-label="About Us — IHG Weddings">
      <Eyebrow />
      <h2 className="mt-5 font-display font-normal leading-[1.02] tracking-[-0.015em] text-[clamp(2.4rem,9vw,4rem)]">
        Placeholder Text <br />
        <span className="italic text-white/75">(About Us)</span>
      </h2>
      <div className="relative mt-10 aspect-[4/5] overflow-hidden -mx-5 sm:-mx-8">
        {IMAGES.map((im, i) => (
          <img
            key={im.src}
            src={im.src}
            alt={im.alt}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms]"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
        <span className="absolute right-5 bottom-5 text-[10px] uppercase tracking-[0.32em] text-white/80 font-sans">{IMAGES[active].caption}</span>
      </div>
      <div className="mt-10 space-y-4">
        {PARAGRAPHS.map((t, i) => (
          <p key={i} className="font-sans font-light text-[15px] leading-[1.75] text-white/75">{t}</p>
        ))}
      </div>
      <div ref={statsRef} className="mt-10 border-t border-white/15 grid grid-cols-3">
        {STATS.map((st, i) => (
          <div key={st.label} className={`pt-6 ${i > 0 ? 'pl-4' : ''} ${i < STATS.length - 1 ? 'pr-4 border-r border-white/15' : ''}`}>
            <div className="flex items-baseline gap-1 font-display leading-none tabular-nums">
              <span ref={(n) => { numRefs.current[i] = n; }} className="text-3xl">0</span>
              <span className="text-lg text-white/60">{st.unit}</span>
            </div>
            <span className="block mt-2 text-[9px] uppercase tracking-[0.24em] text-white/55 font-sans">{st.label}</span>
          </div>
        ))}
      </div>
      {onOpenAboutPage && (
        <div className="mt-10">
          <button
                type="button"
                onClick={onOpenAboutPage}
                className="inline-flex items-center space-x-2 text-[11px] font-sans uppercase tracking-wider bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded-full transition-colors duration-500 font-medium cursor-pointer"
              >
                <span>Discover Our Story</span>
              </button>
        </div>
      )}
    </section>
  );
};

const AboutUsCinematic: React.FC<AboutUsProps> = (props) => {
  const query = '(min-width: 1024px)';
  const [desktop, setDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : true
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setDesktop(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return desktop ? <PinnedAbout {...props} /> : <StackedAbout {...props} />;
};

/* Web version = pinned chapter (design transfer from v1-local). Mobile layout keeps the classic section. */
export const AboutUs: React.FC<AboutUsProps> = (props) => {
  const mobile = useMobileLayout();
  return mobile ? <AboutUsClassic {...props} /> : <AboutUsCinematic {...props} />;
};
