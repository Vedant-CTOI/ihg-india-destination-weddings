import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

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
      q: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      q: 'Duis aute irure dolor in reprehenderit in voluptate velit?',
      a: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
    },
    {
      q: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur?',
      a: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
    },
    {
      q: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam?',
      a: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos.'
    }
  ];

  return (
    <section id="faqs" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-sans font-medium block">
              Ceremonial Guidance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-black font-normal">
              Placeholder Text (FAQs)
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans font-light leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
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
              Placeholder text 1
            </span>
            <span className="text-neutral-500 font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
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
