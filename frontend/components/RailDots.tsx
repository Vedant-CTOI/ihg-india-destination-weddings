import React, { useEffect, useState } from 'react';

/**
 * Swipe dots for a horizontal scroll rail (mobile homepage carousels).
 * One dot per "page" (one screen-width of the rail); the active dot follows the swipe; tapping a dot scrolls there.
 */
export const RailDots: React.FC<{ railRef: React.RefObject<HTMLElement | null>; count: number; className?: string; label: string }> = ({ railRef, count, className = '', label }) => {
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth || 1;
      const p = Math.max(1, Math.round(el.scrollWidth / w));
      setPages(p);
      const max = el.scrollWidth - el.clientWidth;
      setActive(max <= 4 ? 0 : Math.min(p - 1, Math.round((el.scrollLeft / max) * (p - 1))));
    };
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    const mo = new MutationObserver(measure);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const t = setTimeout(measure, 400);
    return () => { el.removeEventListener('scroll', measure); window.removeEventListener('resize', measure); mo.disconnect(); clearTimeout(t); };
  }, [railRef, count]);

  const go = (i: number) => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: pages <= 1 ? 0 : (max * i) / (pages - 1), behavior: 'smooth' });
  };

  if (pages <= 1) return null;
  return (
    <div className={`rail-dots ${className}`} role="tablist" aria-label={label}>
      {Array.from({ length: pages }, (_, i) => (
        <button key={i} type="button" aria-label={`${label}: page ${i + 1}`} aria-selected={i === active}
                onClick={() => go(i)} className={`rail-dot ${i === active ? 'is-active' : ''}`} />
      ))}
    </div>
  );
};
