import React, { useState, useEffect, useRef } from 'react';
import { WEDDING_GENRES_DATA } from '../constants';
import { WeddingGenreInfo } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWeb, SplitText, PALETTE } from './webMotion';
import { DUMMY_DESTINATIONS, pick } from './landingDummyImages';

interface DestinationDiscoveryProps {
  onOpenDetail?: () => void;
}

export const DestinationDiscovery: React.FC<DestinationDiscoveryProps> = ({ onOpenDetail }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timerRef = useRef<any>(null);
  const web = useWeb(); // WEB VERSION ONLY styling/motion below

  const totalGenres = WEDDING_GENRES_DATA.length;
  const activeGenre = WEDDING_GENRES_DATA[currentIndex] || WEDDING_GENRES_DATA[0];

  // Auto-advance every 5s; pauses on hover
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalGenres);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, totalGenres]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalGenres);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalGenres) % totalGenres);
  };

  const handleOpenDetail = () => {
    if (onOpenDetail) {
      onOpenDetail();
    }
  };

  return (
    <section id="destinations" className="home-types" aria-label="Curated Wedding Types">
      <div className="ht-wrap">
        {/* Header — eyebrow, title, copy; View All on the right */}
        <div className="ht-head">
          <div className="ht-head-copy">
            <div data-wm="" className="ht-eyebrow"><span className="ht-rule" /><span>Curated Wedding Types</span></div>
            <h2 data-wm="" style={{ ['--d' as any]: '120ms' }} className="ht-title">Placeholder Text (Discover by Destination)</h2>
            <p data-wm="" style={{ ['--d' as any]: '240ms' }} className="ht-lede">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>
          <div data-wm="" style={{ ['--d' as any]: '360ms' }}>
            <button type="button" onClick={handleOpenDetail} className="ht-viewall group/va">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-700 group-hover/va:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Slide — 16:9 frame, text over the image (bottom-left) */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-wm="curtain"
          className="ht-stage"
        >
          <div onClick={handleOpenDetail} className="ht-frame group/slide" role="button" aria-label={`Destination ${currentIndex + 1}`}>
            <div key={activeGenre.id} className="ht-ph dest-fade"><span>Image here</span></div>
            <div className="ht-shade" />
            <div key={`copy-${activeGenre.id}`} className="ht-copy on-photo">
              <div className="ht-tags">
                <span className="ht-pill">Destination {currentIndex + 1}</span>
                <span className="ht-tagline">{activeGenre.tagline}</span>
              </div>
              <h3 className="ht-name">Destination {currentIndex + 1}</h3>
              <p className="ht-snippet">"{activeGenre.heroSnippet}"</p>
              <div className="ht-facts">
                <div><span>Ideal Scale</span>{activeGenre.idealScale}</div>
                <div><span>Season</span>{activeGenre.recommendedSeason}</div>
                <div><span>Key Ritual</span>{activeGenre.signatureRituals[0]}</div>
              </div>
            </div>
            <span className="ht-count">{String(currentIndex + 1).padStart(2, '0')} <i>/ {String(totalGenres).padStart(2, '0')}</i></span>
          </div>
        </div>

        {/* Controls — short progress lines (left) + round arrows (right) */}
        <div className="ht-controls">
          <div className="ht-bars">
            {WEDDING_GENRES_DATA.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)} aria-label={`Go to slide ${idx + 1}`} className={`ht-bar ${idx === currentIndex ? 'is-on' : ''}`}><span /></button>
            ))}
          </div>
          <div className="ht-arrows">
            <button onClick={handlePrev} aria-label="Previous wedding genre" className="ht-arrow"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={handleNext} aria-label="Next wedding genre" className="ht-arrow"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
};
