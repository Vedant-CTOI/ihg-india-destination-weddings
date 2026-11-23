import React from 'react';
import { LegalTab } from '../types';
import { useRevealOnce } from './webMotion';

interface FooterProps {
  onNavigateToLegal?: (tab: LegalTab) => void;
  onNavigateToSitemap?: () => void;
}

// Footer "Minimal Closing Transition" — plays once per visit (C). The whole page shares one flag so it doesn't replay
// on later pages either. Go back = tag checkpoint-before-vows-footer-motion
let footerPlayed = false;

export const Footer: React.FC<FooterProps> = ({ onNavigateToLegal, onNavigateToSitemap }) => {
  const [fxRef, fxIn] = useRevealOnce<HTMLDivElement>();
  const [done] = React.useState(() => footerPlayed);
  React.useEffect(() => { if (fxIn) footerPlayed = true; }, [fxIn]);
  const fxState = done ? 'done' : fxIn ? 'in' : 'pre';
  return (
    <div ref={fxRef} className="ft-fx" data-ft={fxState}>
      {/* Existing Primary Footer without Celebrations in heading */}
      <footer className="bg-black text-white border-t border-neutral-800 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="ft-cols relative grid grid-cols-2 md:grid-cols-3 gap-8 pb-8 border-b border-neutral-800">
            <span className="ft-rule" aria-hidden="true" />
            <div className="ft-col" style={{ ['--i' as any]: 0 }}>
              <div className="ft-head font-serif text-2xl tracking-widest text-white font-normal leading-none">
                IHG
              </div>
              <div className="ft-head text-[10px] uppercase font-sans tracking-[0.32em] text-white font-medium mt-1 mb-3">
                Hotels &amp; Resorts India
              </div>
              <p className="ft-copy text-[11px] text-white font-light leading-relaxed">
                Timeless Indian destination weddings across palaces, beaches, and backwaters.
              </p>
            </div>

            <div className="ft-col" style={{ ['--i' as any]: 1 }}>
              <span className="ft-head text-[11px] uppercase tracking-wider text-white font-medium block mb-2">
                Contact Us
              </span>
              <ul className="ft-copy space-y-1 text-[11px] text-white font-light">
                <li>Phone: +91 98765 43210</li>
                <li>Email: placeholder@example.com</li>
              </ul>
            </div>

            <div className="ft-col" style={{ ['--i' as any]: 2 }}>
              <span className="ft-head text-[11px] uppercase tracking-wider text-white font-medium block mb-2">
                Governance &amp; Trust
              </span>
              <ul className="ft-copy space-y-1.5 text-[11px] text-white font-light">
                {onNavigateToLegal && (
                  <>
                    <li>
                      <button
                        type="button"
                        onClick={() => onNavigateToLegal('terms')}
                        className="hover:text-white transition-colors cursor-pointer text-left"
                      >
                        Terms &amp; Conditions
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => onNavigateToLegal('privacy')}
                        className="hover:text-white transition-colors cursor-pointer text-left"
                      >
                        Privacy Policy
                      </button>
                    </li>
                  </>
                )}
                {onNavigateToSitemap && (
                  <li>
                    <button
                      type="button"
                      onClick={onNavigateToSitemap}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Site Map
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </footer>

      {/* Compact Secondary Brand Footer */}
      <footer className="bg-black text-white border-t border-neutral-800/80 font-sans text-xs select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Family of Brands — single brand image */}
          <div className="ft-logos">
            <img
              src="/ihg-footer-brand.png"
              alt="IHG Hotels & Resorts"
              className="w-full h-auto object-cover object-center block"
            />
          </div>

        </div>
      </footer>
    </div>
  );
};
