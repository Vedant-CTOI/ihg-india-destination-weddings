import React, { useState, useEffect, useRef } from 'react';
import { HotelProperty, InquiryFormData, UserPersona, HotelVenueSpace } from '../types';
import { HOTELS_DATA } from '../constants';
import { ArrowLeft, Users, BedDouble, MapPin, Check, ArrowRight, Sparkles, Plane, Utensils, Calendar, Clock, Building2, ChevronLeft, ChevronRight, Compass, X, Maximize2, ZoomIn } from 'lucide-react';

interface HotelDetailPageProps {
  hotelId: string;
  onNavigateBack: () => void;
  onNavigateToInquiry: (hotelName: string) => void;
  onSubmitSuccess?: (data: InquiryFormData) => void;
}

// Dedicated Automatic Carousel Component for each venue including photos, draft drawing layout, and popup preview
interface VenueCarouselProps {
  venue: HotelVenueSpace;
  onPreviewImage: (slideIndex: number, allSlides: { url: string; caption: string; isDraftDrawing: boolean; notes?: string }[]) => void;
}

const VenueCarousel: React.FC<VenueCarouselProps> = ({ venue, onPreviewImage }) => {
  // Combine live ceremony/sanctuary photos with the draft drawing layout
  const slides = [
    ...(venue.gallery || []).map((url, idx) => ({
      url,
      caption: `Ceremony Vista 0${idx + 1}`,
      isDraftDrawing: false
    })),
    {
      url: venue.draftLayoutImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      caption: venue.draftLayoutTitle || 'Draft Drawing Layout & Seating Architecture',
      isDraftDrawing: true,
      notes: venue.layoutNotes || 'Technical draft drawing showing staging, mandap orientation, and guest flow.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex];

  // Automatic cycling every 3.2 seconds; smoothly pauses on user hover
  useEffect(() => {
    if (!isPaused && totalSlides > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 3200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalSlides]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="space-y-3 group/carousel"
    >
      <div className="flex items-center justify-between text-xs text-neutral-500 font-sans">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-black flex items-center space-x-1.5">
            <span className="inline-block w-2 h-2 bg-black" />
            <span>Automatic Venue Gallery &amp; Draft Layout</span>
          </span>
          <span className="text-[10px] text-neutral-400">({currentIndex + 1} of {totalSlides})</span>
        </div>

        {/* Small Pause/Play & Nav Indicators */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-neutral-400 hidden sm:inline">
            {isPaused ? 'Hover paused' : 'Auto rotating'}
          </span>
          <button
            type="button"
            onClick={handlePrev}
            className="p-1 rounded border border-neutral-300 hover:border-black text-black bg-white transition-colors cursor-pointer"
            aria-label="Previous venue image"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="p-1 rounded border border-neutral-300 hover:border-black text-black bg-white transition-colors cursor-pointer"
            aria-label="Next venue image"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Carousel Display Frame with Click-to-Preview Lightbox Trigger */}
      <div 
        onClick={() => onPreviewImage(currentIndex, slides)}
        className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-2xs cursor-pointer group/frame"
        title="Click to preview full size in popup overlay"
      >
        <img
          key={currentSlide.url}
          src={currentSlide.url}
          alt={`${venue.name} - ${currentSlide.caption}`}
          className={`w-full h-full object-cover transition-all duration-700 filter grayscale contrast-115 group-hover/frame:scale-103 ${
            currentSlide.isDraftDrawing ? 'contrast-125 brightness-95' : 'contrast-110'
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/1000x600/000000/FFFFFF?text=Venue+Visual';
          }}
        />

        {/* Subtle Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Slide Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          {currentSlide.isDraftDrawing ? (
            <span className="bg-black text-white text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full font-bold border border-white/30 flex items-center space-x-1 shadow-sm">
              <Compass className="w-3 h-3 text-neutral-300" />
              <span>Draft Drawing Layout</span>
            </span>
          ) : (
            <span className="bg-white/95 text-black text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full font-semibold shadow-xs">
              Venue Photo Vista
            </span>
          )}
        </div>

        {/* Hover Click to Expand Overlay Pill */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-white/90 hover:bg-white text-black text-[10px] font-sans uppercase tracking-wider px-2.5 py-1 rounded-full font-medium shadow-sm flex items-center space-x-1 transition-colors">
            <ZoomIn className="w-3 h-3" />
            <span>Preview Overlay</span>
          </span>
        </div>

        {/* Bottom Slide Caption & Notes */}
        <div className="absolute bottom-3 left-3 right-3 text-white z-10 flex items-end justify-between gap-3 pointer-events-none">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-300 font-sans block mb-0.5">
              {currentSlide.caption}
            </span>
            {currentSlide.isDraftDrawing && (
              <p className="text-[11px] text-neutral-200 font-sans font-light leading-relaxed max-w-lg line-clamp-2">
                {currentSlide.notes}
              </p>
            )}
          </div>

          <span className="text-[10px] font-mono text-neutral-400 shrink-0 bg-black/60 px-2 py-0.5 rounded">
            0{currentIndex + 1} / 0{totalSlides}
          </span>
        </div>
      </div>

      {/* Thumbnails Row: Click any to view directly or launch overlay preview */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        {slides.map((s, sIdx) => {
          const isActive = sIdx === currentIndex;
          return (
            <div
              key={sIdx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(sIdx);
              }}
              className={`relative h-16 rounded-xl overflow-hidden border cursor-pointer group/thumb transition-all ${
                isActive ? 'border-black ring-1 ring-black shadow-xs' : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={s.url}
                alt={s.caption}
                className="w-full h-full object-cover filter grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-transparent transition-colors" />
              {s.isDraftDrawing && (
                <span className="absolute bottom-1 left-1 bg-black/80 text-white text-[8px] font-sans uppercase tracking-wider px-1 rounded">
                  Draft
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const HotelDetailPage: React.FC<HotelDetailPageProps> = ({
  hotelId,
  onNavigateBack,
  onNavigateToInquiry,
  onSubmitSuccess
}) => {
  const hotel: HotelProperty =
    HOTELS_DATA.find((h) => h.id === hotelId) || HOTELS_DATA[0];

  // Gallery Preview Lightbox Overlay Modal State
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [activePreviewIndex, setActivePreviewIndex] = useState<number>(0);
  const [activePreviewSlides, setActivePreviewSlides] = useState<{ url: string; caption: string; isDraftDrawing: boolean; notes?: string }[]>([]);

  const handleOpenPreview = (
    slideIndex: number, 
    allSlides: { url: string; caption: string; isDraftDrawing: boolean; notes?: string }[]
  ) => {
    setActivePreviewIndex(slideIndex);
    setActivePreviewSlides(allSlides);
    setPreviewModalOpen(true);
  };

  const handleNextPreviewSlide = () => {
    setActivePreviewIndex((prev) => (prev + 1) % activePreviewSlides.length);
  };

  const handlePrevPreviewSlide = () => {
    setActivePreviewIndex((prev) => (prev - 1 + activePreviewSlides.length) % activePreviewSlides.length);
  };

  // Right-hand side "Begin the Conversation" Form States pre-filled with this hotel
  const defaultStartDate = '2025-11-20';
  const defaultEndDate = '2025-11-23';

  const formatWindowString = (start: string, end: string) => {
    if (!start && !end) return 'Dates to be finalized';
    if (start && !end) {
      const d = new Date(start);
      return `Commencing ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const startStr = d1.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const endStr = d2.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${startStr} – ${endStr} (${diffDays} Days Celebration)`;
  };

  const [startDate, setStartDate] = useState<string>(defaultStartDate);
  const [endDate, setEndDate] = useState<string>(defaultEndDate);

  const [formData, setFormData] = useState<InquiryFormData>({
    primaryContactName: '',
    email: '',
    phone: '',
    decisionRole: 'Bride',
    destinations: [`${hotel.genre}: ${hotel.location}`],
    selectedHotelIds: [hotel.id],
    selectedHotelNames: [hotel.name],
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    targetWindow: formatWindowString(defaultStartDate, defaultEndDate),
    guestRange: 'Mid-Sized Celebration (150 – 350 guests)',
    estimatedGuests: 250,
    ceremonyTraditions: ['North Indian Mandap'],
    priorityDietary: ['Dedicated Jain Kitchen'],
    notes: `Inquiry initiated for ${hotel.name} (${hotel.city}).`,
    partnerName: '',
    planningAgency: '',
    coupleReference: '',
    elderAccessibilityNeeds: '',
    vendorProductionNotes: '',
    bridalStylingNeeds: '',
    baraatSpec: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const guestRanges = [
    { label: 'Intimate Gathering (50 – 150 guests)', defaultCount: 120 },
    { label: 'Mid-Sized Celebration (150 – 350 guests)', defaultCount: 250 },
    { label: 'Grand Destination (350 – 650 guests)', defaultCount: 450 },
    { label: 'Monumental Royal (650 – 1,500+ guests)', defaultCount: 850 }
  ];

  const handleRangeChange = (rangeLabel: string) => {
    const matched = guestRanges.find((r) => r.label === rangeLabel);
    setFormData((prev) => ({
      ...prev,
      guestRange: rangeLabel,
      estimatedGuests: matched ? matched.defaultCount : prev.estimatedGuests
    }));
  };

  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    let newEnd = endDate;
    if (endDate && new Date(val) > new Date(endDate)) {
      newEnd = val;
      setEndDate(val);
    }
    const windowStr = formatWindowString(val, newEnd);
    setFormData((prev) => ({
      ...prev,
      startDate: val,
      endDate: newEnd,
      targetWindow: windowStr
    }));
  };

  const handleEndDateChange = (val: string) => {
    setEndDate(val);
    const windowStr = formatWindowString(startDate, val);
    setFormData((prev) => ({
      ...prev,
      startDate,
      endDate: val,
      targetWindow: windowStr
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      } else {
        onNavigateToInquiry(hotel.name);
      }
    }, 500);
  };

  const activeLightboxSlide = activePreviewSlides[activePreviewIndex] || activePreviewSlides[0];

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">
      
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3 sticky top-0 z-30 backdrop-blur-md bg-neutral-50/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Exploration</button>
            <span>/</span>
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Sanctuaries</button>
            <span>/</span>
            <span className="text-black font-medium">{hotel.name}</span>
          </div>

          <button
            onClick={onNavigateBack}
            className="inline-flex items-center space-x-1.5 text-black hover:text-neutral-600 font-medium uppercase tracking-wider text-[11px] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Hotels</span>
          </button>
        </div>
      </div>

      {/* Hero Banner (Grayscale Luxury) with Quick Preview trigger */}
      <div className="relative h-[440px] lg:h-[520px] w-full overflow-hidden bg-black group/banner">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover filter grayscale contrast-115"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/1800x800/000000/FFFFFF?text=' + encodeURIComponent(hotel.name);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {/* Banner Click to Preview Button */}
        <button
          type="button"
          onClick={() => handleOpenPreview(0, [{ url: hotel.image, caption: `${hotel.name} Exterior Sanctuary`, isDraftDrawing: false }])}
          className="absolute top-6 right-6 z-20 bg-black/60 hover:bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-sans font-medium flex items-center space-x-1.5 backdrop-blur-xs border border-white/20 transition-all cursor-pointer shadow-sm"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Expand Hero Visual</span>
        </button>

        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold mb-2.5">
              <span className="bg-white text-black px-3 py-1 rounded-full">
                {hotel.brand}
              </span>
              <span className="bg-white/20 backdrop-blur-xs text-white px-3 py-1 rounded-full">
                {hotel.city}
              </span>
              <span className="bg-white/20 backdrop-blur-xs text-white px-3 py-1 rounded-full">
                {hotel.priceBand}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2">
              {hotel.name}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 flex items-center space-x-2 font-light">
              <MapPin className="w-4 h-4 text-white shrink-0" />
              <span>{hotel.location}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Left (Property Details, About Us & Venues) + Right (Begin the Conversation Form) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Hotel Showcase, About Us & Venues with Automatic Carousels & Draft Layouts */}
          <div className="lg:col-span-7 space-y-14">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-center">
              <div>
                <span className="text-[9px] uppercase text-neutral-400 font-semibold block mb-0.5">Capacity</span>
                <div className="font-serif text-base font-bold text-black flex items-center justify-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-black" />
                  <span>{hotel.capacityMin}–{hotel.capacityMax}</span>
                </div>
                <span className="text-[10px] text-neutral-500">Day/Night Guests</span>
              </div>

              <div>
                <span className="text-[9px] uppercase text-neutral-400 font-semibold block mb-0.5">Accommodations</span>
                <div className="font-serif text-base font-bold text-black flex items-center justify-center space-x-1">
                  <BedDouble className="w-3.5 h-3.5 text-black" />
                  <span>{hotel.roomsCount} Keys</span>
                </div>
                <span className="text-[10px] text-neutral-500">Suites &amp; Villas</span>
              </div>

              <div>
                <span className="text-[9px] uppercase text-neutral-400 font-semibold block mb-0.5">Setting</span>
                <div className="font-serif text-xs font-semibold text-black mt-1">
                  {hotel.genre}
                </div>
                <span className="text-[10px] text-neutral-500">{hotel.city}</span>
              </div>

              <div>
                <span className="text-[9px] uppercase text-neutral-400 font-semibold block mb-0.5">Transit</span>
                <div className="font-serif text-[11px] font-semibold text-black mt-1 truncate">
                  {hotel.airportDistance ? hotel.airportDistance.split('from')[0] : 'International Hub'}
                </div>
                <span className="text-[10px] text-neutral-500">Arrival Gate</span>
              </div>
            </div>

            {/* 1. ABOUT US SECTION FOR THIS SPECIFIC HOTEL */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                <span className="inline-block w-2 h-2 border border-neutral-400 shrink-0" />
                <span>About Us — {hotel.name}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black leading-tight">
                An Architectural Sanctuary of Sacred Romance
              </h2>

              <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                {hotel.aboutUs || hotel.overview}
              </p>

              <div className="bg-black text-white p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block mb-0.5">
                    Signature Mandap Spec
                  </span>
                  <div className="font-serif text-base text-white">
                    {hotel.mandapType}
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-neutral-400 shrink-0" />
              </div>
            </div>

            {/* 2. VENUE 1, VENUE 2, VENUE 3 DETAILED BREAKDOWN WITH AUTOMATIC CAROUSELS & POPUP PREVIEWS */}
            <div className="space-y-8 pt-4 border-t border-neutral-200">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
                  Celebration Grounds
                </span>
                <h3 className="font-serif text-2xl font-normal text-black">
                  Curated Venues &amp; Architectural Spaces
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-0.5">
                  Each venue space features an automatic rotating photo carousel paired with technical draft drawing layouts and verified capacity metrics. Click any image to view in full-screen popup overlay.
                </p>
              </div>

              {/* Loop over Venue 1, Venue 2, Venue 3 */}
              <div className="space-y-12">
                {(hotel.curatedSpaces || []).map((venue, vIndex) => (
                  <div 
                    key={vIndex} 
                    className="p-6 sm:p-7 bg-neutral-50 rounded-3xl border border-neutral-200 space-y-6"
                  >
                    {/* Venue Header & Capacity Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-200">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold block mb-0.5">
                          {venue.type}
                        </span>
                        <h4 className="font-serif text-xl sm:text-2xl font-normal text-black">
                          {venue.name}
                        </h4>
                      </div>

                      <div className="bg-white border border-neutral-300 rounded-full px-3.5 py-1 text-xs font-sans text-black flex items-center space-x-1.5 shrink-0 self-start sm:self-auto shadow-2xs">
                        <Users className="w-3.5 h-3.5 text-black" />
                        <span className="font-medium">{venue.capacity}</span>
                      </div>
                    </div>

                    {/* Venue Description */}
                    <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                      {venue.description}
                    </p>

                    {/* AUTOMATIC CAROUSEL: Photos + Draft Drawing Layout Picture + Preview Overlay Trigger */}
                    <VenueCarousel 
                      venue={venue} 
                      onPreviewImage={handleOpenPreview}
                    />

                    {/* Key Amenities */}
                    <div className="pt-2">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block mb-2">
                        Key Amenities &amp; Architectural Specifications:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                        {venue.amenities.map((amenity, aIdx) => (
                          <div key={aIdx} className="flex items-start space-x-2 text-neutral-700 bg-white p-2.5 rounded-xl border border-neutral-200/80">
                            <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                            <span className="text-[11px] font-light">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Culinary & Sanctuary Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
              <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block">
                  Segregated Master Galleys
                </span>
                <ul className="space-y-2 text-xs text-neutral-700 font-light">
                  {(hotel.culinaryHighlights || []).map((c, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Utensils className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block">
                  Sanctuary Highlights
                </span>
                <ul className="space-y-2 text-xs text-neutral-700 font-light">
                  {hotel.keyHighlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Direct "Begin the Conversation" Discovery Form (5 cols on desktop, sticky on scroll) */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
            
            <div className="bg-white rounded-3xl border border-neutral-300 p-6 sm:p-8 shadow-sm font-sans text-xs">
              
              {/* Form Title */}
              <div className="mb-6 pb-4 border-b border-neutral-200 space-y-1">
                <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-black" />
                  <span>Direct Property Reservation</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-black">
                  Begin the Conversation
                </h3>
                <p className="text-[11px] text-neutral-500 font-light">
                  Submit this preliminary blueprint directly to the assigned wedding director for <strong className="text-black font-medium">{hotel.name}</strong>.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* 1. Persona Selector */}
                <div>
                  <label className="font-serif text-sm text-black font-normal block mb-1.5">
                    Describe your persona
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(['Bride', 'Groom', 'Parent', 'Wedding Planner'] as UserPersona[]).map((persona) => {
                      const isSelected = formData.decisionRole === persona;
                      return (
                        <button
                          type="button"
                          key={persona}
                          onClick={() => setFormData({ ...formData, decisionRole: persona })}
                          className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-black bg-black text-white font-medium shadow-2xs'
                              : 'border-neutral-200 text-neutral-700 hover:border-black bg-neutral-50'
                          }`}
                        >
                          <span className="block text-[11px]">{persona}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Contact Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder={formData.decisionRole === 'Bride' ? "Bride's Name" : formData.decisionRole === 'Groom' ? "Groom's Name" : "Contact Name"}
                      value={formData.primaryContactName}
                      onChange={(e) => setFormData({ ...formData, primaryContactName: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-2.5 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-neutral-600 mb-1 font-medium">Phone / Contact Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-2.5 text-xs text-black focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 mb-1 font-medium">Official Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-2.5 text-xs text-black focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Pre-locked Sanctuary Property */}
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                    Sanctuary Selected
                  </span>
                  <div className="font-medium text-black text-xs flex items-center justify-between">
                    <span>{hotel.name}</span>
                    <span className="text-[10px] text-neutral-500 font-light">({hotel.city})</span>
                  </div>
                </div>

                {/* 4. Guest Count & Range */}
                <div className="space-y-1.5">
                  <label className="font-serif text-sm text-black font-normal block">
                    No of Guests
                  </label>
                  <select
                    value={formData.guestRange}
                    onChange={(e) => handleRangeChange(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-2 text-xs text-black cursor-pointer font-medium mb-1.5"
                  >
                    {guestRanges.map((range) => (
                      <option key={range.label} value={range.label}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="25"
                    max="2000"
                    placeholder="Approximate count"
                    value={formData.estimatedGuests}
                    onChange={(e) => setFormData({ ...formData, estimatedGuests: Number(e.target.value) })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-2 text-xs text-black"
                  />
                </div>

                {/* 5. Date Pickers (From / To Calendar) */}
                <div className="space-y-1.5">
                  <label className="font-serif text-sm text-black font-normal flex items-center justify-between">
                    <span>Celebration Dates</span>
                    <Clock className="w-3 h-3 text-neutral-400" />
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[9px] text-neutral-400 block mb-0.5">From Date</span>
                      <input
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-2 text-xs text-black cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-400 block mb-0.5">To Date</span>
                      <input
                        type="date"
                        required
                        min={startDate}
                        value={endDate}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-2 text-xs text-black cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="text-[10px] text-neutral-500 pt-0.5">
                    {formData.targetWindow}
                  </div>
                </div>

                {/* 6. Notes */}
                <div>
                  <label className="block text-neutral-600 mb-1 font-medium">Specific Ceremonial Requests</label>
                  <textarea
                    rows={2}
                    placeholder="Specific venue preferences (e.g. Venue 1 for Pheras, pure Jain kitchen)..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-2.5 text-xs text-black resize-none focus:outline-none focus:border-black"
                  />
                </div>

                {/* Form Action Button (WhatsApp removed) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black hover:bg-neutral-800 text-white py-3.5 rounded-xl font-medium tracking-wider uppercase text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <span>{submitting ? "Submitting..." : `Enquire for ${hotel.name.split(' ')[0]}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </form>

            </div>

            {/* Privacy note */}
            <div className="text-center text-[10px] text-neutral-400 px-4">
              Protected by IHG Institutional Wedding Charter &amp; Privacy Protocol.
            </div>

          </div>

        </div>
      </div>

      {/* POPUP OVERLAY FOR PREVIEWING VENUE GALLERY AND DRAFT DRAWING LAYOUT */}
      {previewModalOpen && activeLightboxSlide && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-opacity animate-fade-in font-sans"
          onClick={() => setPreviewModalOpen(false)}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden border border-neutral-300 shadow-2xl flex flex-col justify-between my-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Venue Image Preview Overlay"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Overlay Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold bg-white border border-neutral-200 px-2.5 py-0.5 rounded-full">
                  {activeLightboxSlide.isDraftDrawing ? 'Technical Blueprint' : 'Venue Vista'}
                </span>
                <span className="font-serif text-sm font-normal text-black truncate max-w-[240px] sm:max-w-none">
                  {activeLightboxSlide.caption}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-neutral-500 font-mono pr-2">
                  0{activePreviewIndex + 1} / 0{activePreviewSlides.length}
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                  aria-label="Close image preview overlay"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Full High-Resolution Visual Container */}
            <div className="relative bg-black flex-1 min-h-[340px] sm:min-h-[460px] flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxSlide.url}
                alt={activeLightboxSlide.caption}
                className="max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full object-contain filter grayscale contrast-115"
              />

              {/* Prev and Next Arrows inside Lightbox */}
              {activePreviewSlides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevPreviewSlide();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextPreviewSlide();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Details & Thumbnail Selector */}
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 space-y-3 shrink-0">
              {activeLightboxSlide.notes && (
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  <strong className="text-black font-medium">Layout Note:</strong> {activeLightboxSlide.notes}
                </p>
              )}

              {/* Thumbnails to jump inside the preview */}
              <div className="flex space-x-2 overflow-x-auto no-scrollbar pt-1">
                {activePreviewSlides.map((slide, sIdx) => {
                  const isCurrent = sIdx === activePreviewIndex;
                  return (
                    <div
                      key={sIdx}
                      onClick={() => setActivePreviewIndex(sIdx)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden border cursor-pointer shrink-0 transition-all ${
                        isCurrent ? 'border-black ring-2 ring-black' : 'border-neutral-300 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={slide.url}
                        alt={slide.caption}
                        className="w-full h-full object-cover filter grayscale contrast-110"
                      />
                      {slide.isDraftDrawing && (
                        <span className="absolute bottom-0.5 right-0.5 bg-black text-white text-[7px] uppercase tracking-wider px-1 rounded">
                          Draft
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
