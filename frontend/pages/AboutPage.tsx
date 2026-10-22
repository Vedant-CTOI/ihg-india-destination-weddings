import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onNavigateBack: () => void;
  onNavigateToInquiry: () => void;
}

const HERO_IMG = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateBack,
  onNavigateToInquiry
}) => {
  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">

      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Home</button>
            <span>/</span>
            <span className="text-black font-medium">About Us</span>
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

      {/* Hero Banner (Grayscale Luxury) with lorem placeholder text */}
      <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden bg-black">
        <img
          src={HERO_IMG}
          alt="About Us hero placeholder"
          className="w-full h-full object-cover filter grayscale contrast-115"
          onError={(e) => { (e.target as HTMLImageElement).src = HERO_IMG; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <span className="bg-white text-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold inline-block mb-2.5">
              About Us — IHG Weddings
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2">
              Lorem ipsum dolor sit amet
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Body — text-based page */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

        {/* Opening Narrative */}
        <section className="space-y-5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1.5">
            Our Story
          </span>
          <p className="font-serif text-xl sm:text-2xl text-black italic leading-snug">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt."
          </p>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-neutral-200" />

        {/* Closing invitation + CTA */}
        <section className="space-y-5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1.5">
            Begin the Conversation
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>

          <button
            type="button"
            onClick={onNavigateToInquiry}
            className="inline-flex items-center space-x-2 text-[11px] font-sans uppercase tracking-wider bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-full transition-colors font-medium cursor-pointer shadow-2xs mt-2"
          >
            <span>Plan Celebration</span>
          </button>
        </section>

      </div>

    </div>
  );
};
