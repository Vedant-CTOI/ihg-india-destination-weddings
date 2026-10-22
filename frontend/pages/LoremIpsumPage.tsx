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

        {/* Tier cards — visual grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { n: '01', title: 'Tier One' },
            { n: '02', title: 'Tier Two' },
            { n: '03', title: 'Tier Three' },
            { n: '04', title: 'Tier Four' },
          ].map((tier) => (
            <div key={tier.n} className="bg-neutral-50 border border-neutral-200 rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-[4/3] bg-[#E5E5E5] border-b border-neutral-200 flex items-center justify-center">
                <span className="font-serif text-3xl text-neutral-400">{tier.n}</span>
              </div>
              <div className="p-4 flex flex-col gap-1.5">
                <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                  Loyalty Package
                </span>
                <h2 className="font-serif text-xl font-normal text-black leading-tight">
                  {tier.title}
                </h2>
                <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
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
