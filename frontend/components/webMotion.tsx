import React, { useEffect } from 'react';
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
