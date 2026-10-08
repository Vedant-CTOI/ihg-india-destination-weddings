import React from 'react';

export const AboutUs: React.FC = () => {
  // 3 high-resolution grayscale Indian wedding & sanctuary images for the collage
  const collageImages = [
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      alt: 'Sacred Indian wedding ceremonial mandap and floral setup'
    },
    {
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
      alt: 'Traditional Indian wedding ceremony moment'
    },
    {
      src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80',
      alt: 'Historic Indian royal fortress courtyard setting'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
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
                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x1000/000000/FFFFFF?text=IHG+Weddings';
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
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/000000/FFFFFF?text=Ceremony';
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
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/000000/FFFFFF?text=Sanctuary';
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
