import React from 'react';
import { LegalTab } from '../types';

interface FooterProps {
  onNavigateToLegal?: (tab: LegalTab) => void;
  onNavigateToCharter?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToLegal, onNavigateToCharter }) => {
  return (
    <>
      {/* Existing Primary Footer without Celebrations in heading */}
      <footer className="bg-black text-white border-t border-neutral-800 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-neutral-800">
            <div>
              <span className="font-serif text-base text-white block mb-2 font-normal tracking-wide">
                IHG Weddings
              </span>
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                Timeless Indian destination weddings across palaces, beaches, and backwaters.
              </p>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block mb-2">
                Destinations
              </span>
              <ul className="space-y-1 text-[11px] text-neutral-300 font-light">
                <li>Rajasthan</li>
                <li>Goa Coast</li>
                <li>Mahabalipuram</li>
                <li>Kerala</li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block mb-2">
                Portfolio
              </span>
              <ul className="space-y-1 text-[11px] text-neutral-300 font-light">
                <li>Six Senses Fort Barwara</li>
                <li>InterContinental Chennai</li>
                <li>Crowne Plaza Goa</li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block mb-2">
                Governance &amp; Trust
              </span>
              <ul className="space-y-1.5 text-[11px] text-neutral-300 font-light">
                {onNavigateToCharter && (
                  <li>
                    <button
                      type="button"
                      onClick={onNavigateToCharter}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Ceremonial Charter
                    </button>
                  </li>
                )}
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
                    <li>
                      <button
                        type="button"
                        onClick={() => onNavigateToLegal('faq')}
                        className="hover:text-white transition-colors cursor-pointer text-left"
                      >
                        Frequently Asked Questions (FAQ)
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
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
                  <button
                    type="button"
                    onClick={() => onNavigateToLegal('faq')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    FAQ
                  </button>
                </>
              )}
              {onNavigateToCharter && (
                <button
                  type="button"
                  onClick={onNavigateToCharter}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ceremonial Charter
                </button>
              )}
            </div>
          </div>

        </div>
      </footer>

      {/* Compact Secondary Brand Footer */}
      <footer className="bg-[#050505] text-white border-t border-neutral-800/80 font-sans text-xs select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Streamlined Compact Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-neutral-900 gap-2">
            <div className="flex items-center space-x-3">
              <span className="font-serif text-sm sm:text-base font-normal text-white tracking-wider">
                IHG HOTELS &amp; RESORTS
              </span>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
                Family of Brands
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 font-light">
              6,000+ sanctuaries worldwide
            </div>
          </div>

          {/* Combined Compact Logo Grid with Tight Proximity */}
          <div className="py-4 space-y-3.5">
            
            {/* Tier 1: Luxury & Lifestyle */}
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-medium block mb-2">
                Luxury &amp; Lifestyle
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 items-center">
                
                {/* Six Senses */}
                <div className="flex items-center space-x-2 py-1.5 px-2.5 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <svg className="w-4 h-4 text-neutral-300 shrink-0 group-hover:text-white" viewBox="0 0 40 40" fill="currentColor">
                    <circle cx="20" cy="8" r="3.2" />
                    <circle cx="13" cy="18" r="3.2" />
                    <circle cx="27" cy="18" r="3.2" />
                    <circle cx="7" cy="28" r="3.2" />
                    <circle cx="20" cy="28" r="3.2" />
                    <circle cx="33" cy="28" r="3.2" />
                  </svg>
                  <div className="truncate">
                    <span className="font-serif text-[10px] font-semibold tracking-wider text-neutral-200 block truncate leading-none">
                      SIX SENSES
                    </span>
                  </div>
                </div>

                {/* Regent */}
                <div className="flex items-center space-x-2 py-1.5 px-2.5 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <svg className="w-4 h-4 text-neutral-300 shrink-0 group-hover:text-white" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 28V12L28 28V12" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="5" y="5" width="30" height="30" rx="3" strokeWidth="1"/>
                  </svg>
                  <span className="font-serif text-[10px] font-semibold tracking-widest text-neutral-200 block truncate leading-none">
                    REGENT
                  </span>
                </div>

                {/* InterContinental */}
                <div className="flex items-center space-x-2 py-1.5 px-2.5 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <div className="w-4 h-4 rounded-full border border-neutral-400 flex items-center justify-center font-serif text-[10px] font-bold text-neutral-200 shrink-0">
                    I
                  </div>
                  <span className="font-serif text-[10px] font-semibold tracking-wide text-neutral-200 block truncate leading-none">
                    INTERCONTINENTAL
                  </span>
                </div>

                {/* Vignette Collection */}
                <div className="flex items-center space-x-2 py-1.5 px-2.5 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <svg className="w-4 h-4 text-neutral-300 shrink-0 group-hover:text-white" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="20,6 34,18 29,34 11,34 6,18" />
                    <circle cx="20" cy="20" r="3.5" fill="currentColor" stroke="none" />
                  </svg>
                  <span className="font-sans text-[10px] font-semibold tracking-wider text-neutral-200 block truncate leading-none">
                    VIGNETTE
                  </span>
                </div>

                {/* Kimpton */}
                <div className="flex items-center space-x-2 py-1.5 px-2.5 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <svg className="w-4 h-4 text-neutral-300 shrink-0 group-hover:text-white" viewBox="0 0 40 40" fill="currentColor">
                    <path d="M10 8h5v10l8-10h6l-10 12 11 12h-6l-9-10v10h-5V8z" />
                  </svg>
                  <span className="font-sans text-[10px] font-bold tracking-wider text-neutral-200 block truncate leading-none">
                    KIMPTON
                  </span>
                </div>

                {/* Hotel Indigo */}
                <div className="flex items-center space-x-2 py-1.5 px-2.5 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <svg className="w-4 h-4 text-neutral-300 shrink-0 group-hover:text-white" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M7 32L20 8l13 24H7z" />
                  </svg>
                  <span className="font-sans text-[10px] font-semibold tracking-wider text-neutral-200 block truncate leading-none">
                    HOTEL INDIGO
                  </span>
                </div>

              </div>
            </div>

            {/* Tier 2: Premium, Essentials & Suites */}
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-medium block mb-2">
                Premium, Essentials &amp; Suites
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-2 items-center">
                
                {/* voco */}
                <div className="flex items-center space-x-1.5 py-1.5 px-2 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <svg className="w-3.5 h-3.5 text-neutral-300 shrink-0 group-hover:text-white" viewBox="0 0 40 40" fill="currentColor">
                    <path d="M12 26c3-1 6-4 8-8 3 0 7-3 9-6-1 5-4 9-8 11l5 7h-7l-7-4z"/>
                  </svg>
                  <span className="font-sans text-[11px] font-semibold tracking-tight text-neutral-200 lowercase truncate leading-none">
                    voco
                  </span>
                </div>

                {/* Crowne Plaza */}
                <div className="flex items-center space-x-1.5 py-1.5 px-2 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <svg className="w-3.5 h-3.5 text-neutral-300 shrink-0 group-hover:text-white" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M8 26l3-12 9 6 9-6 3 12H8z" />
                  </svg>
                  <span className="font-sans text-[10px] font-bold tracking-wider text-neutral-200 truncate leading-none">
                    CROWNE PLAZA
                  </span>
                </div>

                {/* Holiday Inn */}
                <div className="flex items-center space-x-1.5 py-1.5 px-2 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <div className="w-3.5 h-3.5 rounded-full border border-neutral-400 flex items-center justify-center font-serif italic text-[9px] font-bold text-neutral-200 shrink-0">
                    H
                  </div>
                  <span className="font-serif text-[10px] text-neutral-200 truncate leading-none">
                    Holiday Inn
                  </span>
                </div>

                {/* Holiday Inn Express */}
                <div className="flex items-center space-x-1.5 py-1.5 px-2 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <span className="font-sans text-[9px] font-semibold text-neutral-300 truncate leading-none">
                    Holiday Inn <span className="text-neutral-400 font-normal">Exp</span>
                  </span>
                </div>

                {/* Garner */}
                <div className="flex items-center space-x-1.5 py-1.5 px-2 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <span className="font-serif text-[10px] font-semibold tracking-wider text-neutral-200 truncate leading-none">
                    garner
                  </span>
                </div>

                {/* avid */}
                <div className="flex items-center space-x-1.5 py-1.5 px-2 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <span className="font-sans text-[10px] font-bold tracking-wider text-neutral-200 truncate leading-none">
                    avid
                  </span>
                </div>

                {/* Staybridge Suites */}
                <div className="flex items-center space-x-1.5 py-1.5 px-2 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <span className="font-sans text-[9px] font-bold tracking-wider text-neutral-200 truncate leading-none">
                    STAYBRIDGE
                  </span>
                </div>

                {/* Candlewood Suites */}
                <div className="flex items-center space-x-1.5 py-1.5 px-2 rounded-lg bg-neutral-950/70 border border-neutral-900 hover:border-neutral-700 transition-colors group">
                  <span className="font-sans text-[9px] font-bold tracking-wider text-neutral-200 truncate leading-none">
                    CANDLEWOOD
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* Compact Loyalty & Corporate Strip */}
          <div className="pt-3 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[10px] text-neutral-500 gap-2">
            <div className="flex items-center space-x-2">
              <span className="border border-neutral-800 rounded px-1.5 py-0.5 text-neutral-300 font-serif font-bold text-[9px]">
                IHG ONE REWARDS
              </span>
              <span>Earn milestone points across all participating brands worldwide.</span>
            </div>
            <div className="uppercase tracking-wider text-neutral-600 text-[9px]">
              InterContinental Hotels Group PLC
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};
