import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { HOTELS_DATA, REAL_WEDDINGS_DATA, WEDDING_GENRES_DATA } from '../constants';

interface SitemapPageProps {
  onNavigateBack: () => void;
  onNavigateHome: (anchor?: string) => void;
  onNavigateToGenre: (genreId: string) => void;
  onNavigateToAllHotels: () => void;
  onNavigateToHotel: (hotelId: string) => void;
  onNavigateToAllStories: () => void;
  onNavigateToStory: (storyId: string) => void;
  onNavigateToConversation: () => void;
  onNavigateToCharter: () => void;
  onNavigateToLegal: (tab: 'terms' | 'privacy' | 'faq') => void;
}

interface SitemapEntry {
  label: string;
  description: string;
  action: () => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({
  onNavigateBack,
  onNavigateHome,
  onNavigateToGenre,
  onNavigateToAllHotels,
  onNavigateToHotel,
  onNavigateToAllStories,
  onNavigateToStory,
  onNavigateToConversation,
  onNavigateToCharter,
  onNavigateToLegal
}) => {

  const sections: { heading: string; entries: SitemapEntry[] }[] = [
    {
      heading: 'Main',
      entries: [
        { label: 'Home', description: 'Placeholder Text — landing exploration', action: () => onNavigateHome() },
        { label: 'Placeholder Text (About Us)', description: 'About the wedding portfolio', action: () => onNavigateHome('about') },
        { label: 'Placeholder Text (Lead Form Capture)', description: 'Begin the conversation — enquiry form', action: onNavigateToConversation }
      ]
    },
    {
      heading: 'Discover by Genre',
      entries: [
        ...WEDDING_GENRES_DATA.map((g) => ({
          label: `Genre: ${g.genre}`,
          description: g.tagline,
          action: () => onNavigateToGenre(g.id)
        })),
        { label: 'Placeholder Text (Destination Guides)', description: 'Placeholder Text 1', action: () => onNavigateHome('destinations') }
      ]
    },
    {
      heading: 'Hotels',
      entries: [
        { label: 'All Hotels', description: 'Placeholder Text (List of Hotels) — complete portfolio with filters', action: onNavigateToAllHotels },
        ...HOTELS_DATA.map((h) => ({
          label: h.name,
          description: `${h.brand} · ${h.location} · ${h.genre}`,
          action: () => onNavigateToHotel(h.id)
        }))
      ]
    },
    {
      heading: 'Real Weddings',
      entries: [
        { label: 'All Stories', description: 'Placeholder Text (Real Wedding Stories) — every case study', action: onNavigateToAllStories },
        ...REAL_WEDDINGS_DATA.map((w) => ({
          label: w.title,
          description: `${w.couple} · ${w.location} · ${w.property}`,
          action: () => onNavigateToStory(w.id)
        }))
      ]
    },
    {
      heading: 'Institutional',
      entries: [
        { label: 'IHG Philosophy', description: 'Placeholder Text — planning principles & SLA guidelines', action: onNavigateToCharter },
        { label: 'Terms & Conditions', description: 'Legal charter and booking terms', action: () => onNavigateToLegal('terms') },
        { label: 'Privacy Policy', description: 'Data protection and confidentiality policy', action: () => onNavigateToLegal('privacy') },
        { label: 'FAQs', description: 'Placeholder Text — ceremonial guidance & policies', action: () => onNavigateToLegal('faq') }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">

      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateHome} className="hover:text-black">Home</button>
            <span>/</span>
            <span className="text-black font-medium">Site Map</span>
          </div>

          <button
            onClick={onNavigateBack}
            className="inline-flex items-center space-x-1 text-black hover:text-neutral-600 font-medium uppercase tracking-wider text-[11px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Page</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-neutral-200">
        <div className="max-w-3xl space-y-4">
          <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-semibold block">
            Navigation Directory
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-black leading-tight">
            Site Map
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Every page of the IHG Weddings destination directory, organised by section.
          </p>
        </div>
      </div>

      {/* Sitemap Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-4">
              {section.heading}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.entries.map((entry) => (
                <li key={entry.label}>
                  <button
                    type="button"
                    onClick={entry.action}
                    className="w-full text-left p-4 bg-neutral-50 hover:bg-white rounded-2xl border border-neutral-200 hover:border-black transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-serif text-base text-black font-normal">
                        {entry.label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    <p className="text-[11px] text-neutral-500 font-light mt-1 leading-relaxed">
                      {entry.description}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}

      </div>

    </div>
  );
};
