import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LoremIpsumPageProps {
  onNavigateBack: () => void;
}

export const LoremIpsumPage: React.FC<LoremIpsumPageProps> = ({ onNavigateBack }) => {
  return (
    <div className="lp-page min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">

      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Home</button>
            <span>/</span>
            <span className="text-black font-medium">Lorem Ipsum</span>
          </div>

          <button
            onClick={onNavigateBack}
            className="inline-flex items-center space-x-1.5 text-black hover:text-neutral-600 font-medium uppercase tracking-wider text-[11px] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Page</span>
          </button>
        </div>
      </div>

      {/* Page hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <span data-wm="" className="lp-eyebrow text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1.5">
          Lorem Ipsum
        </span>
        <h1 data-wm="" style={{ ['--d' as any]: '120ms' }} className="lp-title font-serif text-3xl sm:text-4xl font-normal text-black mb-3">
          Lorem ipsum dolor sit amet
        </h1>
        <p data-wm="" style={{ ['--d' as any]: '220ms' }} className="lp-lede text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-2xl mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Tier cards — large 16:9 visuals, stacked one below the other */}
        {/* Styled like Discover by Destination (photo + veil + number on photo, ivory/maroon/haldi). Layout unchanged. Go back = tag checkpoint-before-loyalty-page-style */}
        <div className="lp-tiers space-y-8">
          {[
            { n: '01', title: 'Tier One', img: '/hero/hero-2-photo.jpg' },
            { n: '02', title: 'Tier Two', img: '/hero/hero-3-photo.jpg' },
            { n: '03', title: 'Tier Three', img: '/hero/hero-4-photo.jpg' },
            { n: '04', title: 'Tier Four', img: '/hero/hero-5-photo.jpg' },
          ].map((tier) => (
            <div key={tier.n} data-wm="" className="lp-tier group bg-neutral-50 border border-neutral-200 rounded-2xl overflow-hidden flex flex-col sm:flex-row">
              <div data-wm="curtain" className="lp-tier-media relative overflow-hidden sm:w-3/5 aspect-[16/9] bg-[#E5E5E5] border-b sm:border-b-0 sm:border-r border-neutral-200 flex items-center justify-center">
                <div className="lp-tier-media-inner absolute inset-0">
                  <img src={tier.img} alt={tier.title} data-real-photo="" loading="lazy"
                       className="lp-tier-img absolute inset-0 w-full h-full object-cover" />
                  <div className="lp-tier-veil absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                </div>
                <span className="lp-tier-num on-photo font-serif text-5xl text-neutral-400">{tier.n}</span>
              </div>
              <div className="sm:w-2/5 p-6 flex flex-col justify-center gap-2">
                <span className="lp-tier-eyebrow text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                  Loyalty Package
                </span>
                <h2 className="lp-tier-title font-serif text-2xl font-normal text-black leading-tight">
                  {tier.title}
                </h2>
                <p className="lp-tier-copy text-xs text-neutral-500 font-light leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
