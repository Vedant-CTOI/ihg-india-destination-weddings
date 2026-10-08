import React, { useState } from 'react';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  onOpenAllFaqs: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenAllFaqs }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleAccordion = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const sampleFaqs = [
    {
      q: 'How far in advance should we block an IHG destination sanctuary for an Indian wedding?',
      a: 'For high-demand auspicious Muhurtham dates (October through March), we recommend securing your dates 8 to 14 months in advance. This ensures complete room block availability, prime lawn reservations, and timely municipal acoustic permits.'
    },
    {
      q: 'How does IHG guarantee 100% kitchen segregation for strict Jain and Sattvic dining?',
      a: 'Our sanctuaries operate physically isolated satellite kitchens with zero cross-contact. We maintain consecrated cookware, segregated dishwashing units, and a strict zero onion, garlic, and root vegetable pantry certified by visiting family priests.'
    },
    {
      q: 'What is the noise curfew policy for Sangeet afterparties and live DJ performances?',
      a: 'Per statutory environmental guidelines, outdoor amplified music on lawns and beaches concludes at 10:00 PM. High-energy musical performances then transition into our acoustically insulated pillarless ballrooms (certified up to 98dB) until late.'
    },
    {
      q: 'What is the Two-Hour Weather Contingency Guarantee for outdoor mandaps?',
      a: 'Every outdoor lawn or beachside mandap reservation automatically includes a pre-reserved indoor ballroom or temperature-controlled glasshouse with mirrored staging readiness, capable of activating seamlessly within 120 minutes.'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans font-medium block">
              Ceremonial Guidance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-black font-normal">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans font-light leading-relaxed">
              Essential answers regarding ceremonial logistics, kitchen segregation, noise curfews, and reservation protocols.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenAllFaqs}
            className="inline-flex items-center space-x-2 text-xs font-sans uppercase tracking-widest bg-black text-white px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors shadow-2xs font-medium shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>View All FAQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interactive Accordion List */}
        <div className="space-y-3 font-sans">
          {sampleFaqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="border border-neutral-200 hover:border-neutral-400 rounded-2xl overflow-hidden transition-all bg-neutral-50/50"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-normal text-black pr-2">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-full border border-neutral-300 shrink-0 text-black">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed border-t border-neutral-200/60 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-10 p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="font-semibold text-black block">
              Looking for detailed legal charters, vendor NDAs, or pandit guidelines?
            </span>
            <span className="text-neutral-500 font-light">
              Visit our comprehensive FAQ repository covering all institutional policies across India.
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenAllFaqs}
            className="border border-black text-black hover:bg-black hover:text-white px-5 py-2.5 rounded-full font-medium transition-colors uppercase tracking-wider text-[11px] shrink-0 cursor-pointer flex items-center space-x-1.5"
          >
            <span>Read All Questions &amp; Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
