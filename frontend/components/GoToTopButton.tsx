import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Floating go-to-top button. Appears after scrolling down one viewport,
 * on every page it's mounted on. Respects the monochrome style.
 */
export const GoToTopButton: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Go to top"
      title="Go to top"
      className={`fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full border border-black/20 bg-white/95 backdrop-blur-xs text-black flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer hover:bg-black hover:text-white hover:border-black ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};
