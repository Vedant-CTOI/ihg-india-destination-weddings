import React from 'react';
import { LegalTab } from '../types';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigateToLegal?: (tab: LegalTab) => void;
  onNavigateToSitemap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToLegal, onNavigateToSitemap }) => {
  return (
    <>
      {/* Existing Primary Footer without Celebrations in heading */}
      <footer className="bg-black text-white border-t border-neutral-800 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-neutral-800">
            <div>
              <img
                src="/ihg-footer-logo.png"
                alt="IHG Hotels & Resorts"
                className="h-8 w-auto object-contain mb-3 max-w-[220px]"
              />
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                Timeless Indian destination weddings across palaces, beaches, and backwaters.
              </p>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block mb-2">
                Destinations
              </span>
              <ul className="space-y-1 text-[11px] text-neutral-300 font-light">
                <li>Destination 1</li>
                <li>Destination 2</li>
                <li>Destination 3</li>
                <li>Destination 4</li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block mb-2">
                Portfolio
              </span>
              <ul className="space-y-1 text-[11px] text-neutral-300 font-light">
                <li>Hotel 1</li>
                <li>Hotel 2</li>
                <li>Hotel 3</li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block mb-2">
                Governance &amp; Trust
              </span>
              <ul className="space-y-1.5 text-[11px] text-neutral-300 font-light">
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
              </ul>
            </div>
          </div>

          {/* Site Map — single link to the full directory page */}
          <div className="py-5 border-b border-neutral-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onNavigateToSitemap}
              className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-wider text-neutral-300 hover:text-white font-medium transition-colors cursor-pointer"
            >
              <span>Site Map</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <span className="text-[10px] text-neutral-600 font-light">
              Every page of the directory, one click away.
            </span>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
            <p>© {new Date().getFullYear()} IHG Hotels &amp; Resorts India. All Rights Reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              {onNavigateToLegal && (
                <>
                  <button
                    type="button"
                    onClick={() => onNavigateToLegal('terms')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Terms &amp; Conditions
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateToLegal('privacy')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </footer>

      {/* Compact Secondary Brand Footer */}
      <footer className="bg-[#050505] text-white border-t border-neutral-800/80 font-sans text-xs select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Family of Brands — single brand image */}
          <div className="py-6">
            <img
              src="/ihg-footer-logo.png"
              alt="IHG Hotels & Resorts"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

        </div>
      </footer>
    </>
  );
};
