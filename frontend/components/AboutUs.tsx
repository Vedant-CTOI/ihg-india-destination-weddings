import React from 'react';

export const AboutUs: React.FC = () => {
  // 3 high-resolution grayscale Indian wedding & sanctuary images for the collage
  const collageImages = [
    {
      src: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      alt: 'Sacred Indian wedding ceremonial mandap and floral setup'
    },
    {
      src: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      alt: 'Traditional Indian wedding ceremony moment'
    },
    {
      src: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      alt: 'Historic Indian royal fortress courtyard setting'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Content (Left Column - 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Minimal Eyebrow */}
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.28em] text-neutral-400 font-sans">
              <span className="inline-block w-2 h-2 border border-neutral-400 shrink-0" />
              <span>About Us — IHG Weddings</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-black leading-tight tracking-tight">
              A Legacy of Reverence <br />
              <span className="italic text-neutral-500 font-light">&amp; Quiet Grandeur</span>
            </h2>

            {/* Narrative copy with generous line-height */}
            <div className="space-y-4 text-xs sm:text-sm text-neutral-600 font-sans font-light leading-relaxed">
              <p>
                IHG Weddings brings together India’s most distinguished palaces, oceanfront estates, and secluded nature retreats into a single cohesive portfolio. We approach each union not as an event, but as a living legacy where sacred rituals, generational respect, and contemporary celebration exist in complete harmony.
              </p>
              <p>
                From consecrated early-morning Vedic Havans to high-energy midnight afterparties, our dedicated on-ground teams maintain uncompromising standards. Certified satellite kitchens uphold absolute dietary sanctity, while sound-isolated ballrooms and expansive processional avenues grant families the freedom to honor both solemn vows and festive joy without friction.
              </p>
            </div>

            {/* Architectural Signature Badges (No CTA) */}
            <div className="pt-4 border-t border-neutral-200 grid grid-cols-3 gap-4 text-neutral-500 font-sans text-xs">
              <div>
                <span className="font-serif text-xl sm:text-2xl text-black font-normal block">6,000+</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mt-0.5">Global Heritage</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl text-black font-normal block">5-Point</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mt-0.5">Ceremony Audit</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl text-black font-normal block">100%</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mt-0.5">Kitchen Custody</span>
              </div>
            </div>

          </div>

          {/* Collage of 2-3 Images (Right Column - 6 cols) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
              
              {/* Primary Large Image */}
              <div className="col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-2xs">
                <img
                  src={collageImages[0].src}
                  alt={collageImages[0].alt}
                  className="w-full h-full object-cover filter grayscale contrast-115 hover:scale-103 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[9px] uppercase tracking-widest text-neutral-300 font-sans bg-black/60 px-2 py-0.5 rounded">
                  Ceremonial Sacredness
                </span>
              </div>

              {/* Stacked Secondary Images */}
              <div className="col-span-5 flex flex-col space-y-3 sm:space-y-4">
                
                {/* Secondary Image 1 */}
                <div className="relative h-36 sm:h-48 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-2xs">
                  <img
                    src={collageImages[1].src}
                    alt={collageImages[1].alt}
                    className="w-full h-full object-cover filter grayscale contrast-110 hover:scale-103 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 text-[8px] uppercase tracking-wider text-neutral-300 font-sans">
                    Timeless Vows
                  </span>
                </div>

                {/* Secondary Image 2 */}
                <div className="relative h-36 sm:h-44 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-2xs">
                  <img
                    src={collageImages[2].src}
                    alt={collageImages[2].alt}
                    className="w-full h-full object-cover filter grayscale contrast-110 hover:scale-103 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 text-[8px] uppercase tracking-wider text-neutral-300 font-sans">
                    Historic Citadels
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
