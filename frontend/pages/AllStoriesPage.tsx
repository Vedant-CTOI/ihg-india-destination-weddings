import React, { useState, useMemo } from 'react';
import { REAL_WEDDINGS_DATA } from '../constants';
import { RealWeddingCase } from '../types';
import { ArrowLeft, ArrowRight, BookOpen, MapPin, Users, Search, X } from 'lucide-react';

interface AllStoriesPageProps {
  initialCategory?: string;
  onNavigateBack: () => void;
  onSelectStory: (storyId: string) => void;
}

export const AllStoriesPage: React.FC<AllStoriesPageProps> = ({
  initialCategory = 'All',
  onNavigateBack,
  onSelectStory
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterCategories = [
    'All',
    'Royal Heritage',
    'Beachside',
    'Temple & Waterway',
    'Mountain Foothills'
  ];

  const filteredStories = useMemo(() => {
    return REAL_WEDDINGS_DATA.filter((wedding) => {
      // 1. Category Filter
      if (selectedFilter !== 'All') {
        if (selectedFilter === 'Royal Heritage' && !wedding.location.includes('Rajasthan') && !wedding.location.includes('Delhi')) {
          return false;
        }
        if (selectedFilter === 'Beachside' && !wedding.location.includes('Goa')) {
          return false;
        }
        if (selectedFilter === 'Temple & Waterway' && !wedding.location.includes('Mahabalipuram') && !wedding.location.includes('Kerala')) {
          return false;
        }
        if (selectedFilter === 'Mountain Foothills' && !wedding.location.includes('Corbett') && !wedding.location.includes('Uttarakhand')) {
          return false;
        }
      }

      // 2. Search Filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesCouple = wedding.couple.toLowerCase().includes(q);
        const matchesLocation = wedding.location.toLowerCase().includes(q);
        const matchesProperty = wedding.property.toLowerCase().includes(q);
        const matchesConfluence = wedding.culturalConfluence.toLowerCase().includes(q);
        if (!matchesCouple && !matchesLocation && !matchesProperty && !matchesConfluence) {
          return false;
        }
      }

      return true;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">
      
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Exploration</button>
            <span>/</span>
            <span className="text-black font-medium">Real Wedding Stories</span>
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

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Page Title & Context */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-semibold block">
            Archive &amp; Documentaries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-black leading-tight">
            Real Weddings Archive
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-2xl leading-relaxed">
            Read comprehensive case studies detailing how cross-cultural traditions, ceremonial timelines, and dietary requirements were harmonized across IHG destination sanctuaries.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-neutral-50 p-4 sm:p-5 rounded-2xl border border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
            {filterCategories.map((cat) => {
              const isSelected = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-sans whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white font-medium shadow-xs'
                      : 'bg-white border border-neutral-300 text-neutral-700 hover:border-black'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by couple, city, or confluence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-300 hover:border-black rounded-xl pl-9 pr-8 py-2 text-xs font-sans text-black placeholder:text-neutral-400 font-medium shadow-2xs focus:outline-none focus:border-black transition-colors"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Stories Grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300 space-y-3">
            <span className="inline-block w-8 h-8 border border-neutral-400 mx-auto" />
            <h3 className="font-serif text-xl text-black font-normal">
              No wedding stories matched your search.
            </h3>
            <p className="text-xs text-neutral-500 font-light">
              Try selecting a different category or clearing the search box.
            </p>
            <button
              onClick={() => {
                setSelectedFilter('All');
                setSearchQuery('');
              }}
              className="bg-black text-white text-xs uppercase tracking-wider font-medium px-5 py-2 rounded-full cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((wedding) => (
              <article
                key={wedding.id}
                onClick={() => onSelectStory(wedding.id)}
                className="group bg-white rounded-2xl border border-neutral-200 hover:border-black overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-2xs hover:shadow-md"
              >
                <div>
                  {/* Photo with Overlay */}
                  <div className="relative h-60 overflow-hidden bg-neutral-900">
                    <img
                      src={wedding.coverImage}
                      alt={wedding.couple}
                      className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-103 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x450/000000/FFFFFF?text=' + encodeURIComponent(wedding.couple);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase tracking-wider font-sans text-neutral-300 block">
                        {wedding.location}
                      </span>
                      <h3 className="font-serif text-xl font-normal text-white">
                        {wedding.couple}
                      </h3>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-neutral-500 border-b border-neutral-100 pb-2">
                      <span className="flex items-center space-x-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-black shrink-0" />
                        <span className="truncate">{wedding.property}</span>
                      </span>
                      <span className="flex items-center space-x-1 shrink-0">
                        <Users className="w-3.5 h-3.5 text-black" />
                        <span>{wedding.guestCount}</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-sans font-semibold text-black uppercase tracking-wider block mb-1">
                        The Confluence:
                      </span>
                      <p className="text-xs text-neutral-800 font-sans font-medium line-clamp-1">
                        {wedding.culturalConfluence}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-600 font-sans leading-relaxed line-clamp-2 font-light">
                      {wedding.resolutionStory}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    className="w-full border border-neutral-300 group-hover:bg-black group-hover:text-white text-black text-[11px] uppercase tracking-wider font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Full Story &amp; Run-of-Show</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
