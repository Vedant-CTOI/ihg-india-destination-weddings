import React, { useEffect, useRef } from 'react';
import { useMobileLayout } from './useMobileLayout';

/** WEB VERSION ONLY helpers for the landing-page motion system (Mobile view never uses these). */

export const useWeb = (): boolean => !useMobileLayout();

/** Background palette (supplied by the client) */
export const PALETTE = {
  maroon: '#600B2A',
  red: '#AF2E33',
  marigold: '#F2A638',
  saffron: '#ED8C0C'
};

/**
 * Pear-inspired heading: every letter settles in from a soft blur, one after another.
 * Words stay unbroken so the heading wraps exactly like the plain text did. Copy is unchanged —
 * the full string is kept for screen readers via aria-label.
 */
export const SplitText: React.FC<{ text: string }> = ({ text }) => {
  let ci = 0;
  const words = text.split(' ');
  return (
    <span data-wm="split" aria-label={text}>
      {words.map((w, wi) => (
        <React.Fragment key={wi}>
          <span className="split-w" aria-hidden="true">
            {Array.from(w).map((ch, k) => (
              <span key={k} className="split-c" style={{ ['--ci' as any]: ci++ }}>{ch}</span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
};

/**
 * One director for the whole page: anything marked data-wm rises in when it enters the viewport
 * and resets when the reader scrolls back above it, so the film replays (reversible, like Pear).
 * Uses a data attribute (not className) so React re-renders never wipe the state.
 */
export const WebMotionDirector: React.FC = () => {
  const web = useWeb();
  useEffect(() => {
    if (!web) return;
    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.setAttribute('data-wm-in', '');
          else if (e.boundingClientRect.top > 0) el.removeAttribute('data-wm-in'); // only reset when it is below us
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );
    const scan = () => {
      document.querySelectorAll('[data-wm]').forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [web]);
  return null;
};

/** Count-up figure (easeOutExpo, tabular numerals). Counts when it enters view; resets when scrolled back above. */
export const CountUp: React.FC<{ to: number; duration?: number; delay?: number }> = ({ to, duration = 1800, delay = 0 }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let running = false;
    const ease = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && running) return;
      cancelAnimationFrame(raf);
      if (e.isIntersecting) {
        running = true;
        const start = performance.now() + delay;
        const step = (now: number) => {
          const t = Math.min(Math.max((now - start) / duration, 0), 1);
          el.textContent = Math.round(to * ease(t)).toLocaleString('en-US');
          if (t < 1) raf = requestAnimationFrame(step); else running = false;
        };
        raf = requestAnimationFrame(step);
      } else {
        running = false;
        if (e.boundingClientRect.top > 0) el.textContent = '0';
        else el.textContent = to.toLocaleString('en-US'); // scrolled past: show the final figure
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration, delay]);
  return <span ref={ref} className="tabular-nums">{to.toLocaleString('en-US')}</span>;
};
