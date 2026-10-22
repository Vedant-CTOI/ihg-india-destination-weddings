import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LoremIpsumPageProps {
  onNavigateBack: () => void;
}

export const LoremIpsumPage: React.FC<LoremIpsumPageProps> = ({ onNavigateBack }) => {
  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">

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
        <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1.5">
          Lorem Ipsum
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-black mb-3">
          Lorem ipsum dolor sit amet
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-2xl mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Tier sections */}
        <div className="space-y-10">
          <section className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
              Tier One
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black">Lorem ipsum dolor sit amet</h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </section>

          <div className="border-t border-neutral-200" />

          <section className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
              Tier Two
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black">Lorem ipsum dolor sit amet</h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </section>

          <div className="border-t border-neutral-200" />

          <section className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
              Tier Three
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black">Lorem ipsum dolor sit amet</h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </section>

          <div className="border-t border-neutral-200" />

          <section className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
              Tier Four
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black">Lorem ipsum dolor sit amet</h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </section>
        </div>
      </div>

    </div>
  );
};
