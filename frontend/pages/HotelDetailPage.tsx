import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useMobileLayout } from '../components/useMobileLayout';
import { HotelProperty, InquiryFormData, UserPersona, HotelVenueSpace } from '../types';
import { HOTELS_DATA } from '../constants';
import { HotelSelectorModal } from '../components/HotelSelectorModal';
import { COUNTRY_DEST_MAP, DestinationDropdown } from '../components/DestinationDropdown';
import { OccasionDropdown } from '../components/OccasionDropdown';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, PenLine } from 'lucide-react';
import { useWeb, PALETTE } from '../components/webMotion';
import { FEATURE_HOTEL_ID, FEATURE_HERO, FeatureHero, FeatureBody, withHotelCopy } from '../components/HotelFeature';

interface HotelDetailPageProps {
  hotelId: string;
  onNavigateBack: () => void;
  onNavigateToInquiry: (hotelName: string) => void;
  onSubmitSuccess?: (data: InquiryFormData) => void;
}

// Dedicated Automatic Carousel Component for each venue including photos, draft drawing layout, and popup preview
interface VenueCarouselProps {
  compact?: boolean;
  venue: HotelVenueSpace;
  onPreviewImage: (slideIndex: number, allSlides: { url: string; caption: string; isDraftDrawing: boolean; notes?: string }[]) => void;
}

const VenueCarousel: React.FC<VenueCarouselProps> = ({ venue, onPreviewImage, compact = false }) => {
  // Combine live ceremony/sanctuary photos with the draft drawing layout
  const slides = [
    ...(venue.gallery || []).map((url, idx) => ({
      url,
      caption: `Ceremony Vista 0${idx + 1}`,
      isDraftDrawing: false
    })),
    {
      url: venue.draftLayoutImage || 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E',
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
      }, 1200);
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

      </div>

      {compact ? (
        <div className="flex flex-col">
          {/* Main 16:9 frame — cyclic */}
          <div
            className="relative w-full aspect-video overflow-hidden bg-neutral-900 group/frame"
          >
            <img
              key={currentSlide.url}
              src={currentSlide.url}
              alt={`${venue.name} - ${currentSlide.caption}`}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 filter grayscale contrast-115 group-hover/frame:scale-103"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            <span className="absolute bottom-2 left-3 z-10 text-[9px] font-sans uppercase tracking-widest text-black font-semibold bg-white/85 rounded-full px-2.5 py-1">
              {currentSlide.isDraftDrawing ? 'Draft Layout' : currentSlide.caption}
            </span>
            {/* Mobile-only prev/next arrows (compact frame) */}
            <button
              type="button"
              onClick={handlePrev}
              className="venue-arrows-mobile-only hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center"
              aria-label="Previous venue picture"
            >
              <span aria-hidden="true" className="text-black text-lg leading-none">&lsaquo;</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="venue-arrows-mobile-only hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center"
              aria-label="Next venue picture"
            >
              <span aria-hidden="true" className="text-black text-lg leading-none">&rsaquo;</span>
            </button>
          </div>

          {/* Thumbnail strip — cyclic navigation below the main frame */}
          <div className="venue-thumb-strip flex items-center gap-1.5 px-3 py-2 bg-white border-t border-neutral-200">
            {slides.map((slide, sIdx) => (
              <button
                key={sIdx}
                type="button"
                onClick={() => setCurrentIndex(sIdx)}
                className={`shrink-0 w-16 aspect-video rounded-md overflow-hidden border transition-all cursor-pointer ${
                  sIdx === currentIndex ? 'border-black opacity-100' : 'border-neutral-300 opacity-60 hover:opacity-90'
                }`}
                aria-label={`Show slide ${sIdx + 1}: ${slide.caption}`}
              >
                <img
                  src={slide.url}
                  alt=""
                  className="w-full h-full object-cover filter grayscale"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

        {/* Carousel — locked 16:9 aspect ratio */}
        <div className="lg:col-span-8">
          <div
            onClick={() => onPreviewImage(currentIndex, slides)}
            className={`relative w-full aspect-video overflow-hidden bg-neutral-900 border-neutral-200 cursor-pointer group/frame ${compact ? "" : "rounded-2xl border shadow-2xs"}`}
            title="Click to preview full size in popup overlay"
          >
            <img
              key={currentSlide.url}
              src={currentSlide.url}
              alt={`${venue.name} - ${currentSlide.caption}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 filter grayscale contrast-115 group-hover/frame:scale-103 ${
                currentSlide.isDraftDrawing ? 'contrast-125 brightness-95' : 'contrast-110'
              }`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';
              }}
            />

            {/* Subtle Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Slide Category Badge */}
            <div className="absolute top-3 left-3 z-10">
              {currentSlide.isDraftDrawing ? (
                <span className="bg-black text-white text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full font-bold border border-white/30 flex items-center space-x-1 shadow-sm">
                  <span aria-hidden="true" className="w-3 h-3 inline-block border border-current"></span>
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
                <span aria-hidden="true" className="w-3 h-3 inline-block border border-current"></span>
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

            {/* Mobile-only prev/next arrows (page through pictures; CSS shows only in layout-mobile) */}
            <button
              type="button"
              onClick={handlePrev}
              className="venue-arrows-mobile-only hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center"
              aria-label="Previous venue picture"
            >
              <span aria-hidden="true" className="text-black text-lg leading-none">&lsaquo;</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="venue-arrows-mobile-only hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-neutral-300 shadow-md flex items-center justify-center"
              aria-label="Next venue picture"
            >
              <span aria-hidden="true" className="text-black text-lg leading-none">&rsaquo;</span>
            </button>
          </div>

          {/* Thumbnails Row under the carousel */}
          <div className="venue-thumb-strip grid grid-cols-4 gap-2 pt-2">
            {slides.map((s, sIdx) => {
              const isActive = sIdx === currentIndex;
              return (
                <div
                  key={sIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(sIdx);
                  }}
                  className={`relative aspect-video rounded-xl overflow-hidden border cursor-pointer group/thumb transition-all ${
                    isActive ? 'border-black ring-1 ring-black shadow-xs' : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className="relative block w-full h-full object-cover filter grayscale contrast-110"><span className="relative block w-full h-full object-cover filter grayscale contrast-110"><img
                    src={s.url}
                    alt={s.caption}
                    className="w-full h-full object-cover filter grayscale contrast-110"
                  /><span aria-hidden="true" className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none text-[10px] font-sans uppercase tracking-widest text-neutral-500 font-medium">Image here</span></span><span aria-hidden="true" className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none text-[10px] font-sans uppercase tracking-widest text-neutral-500 font-medium">Image here</span></span>
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

        {/* Key Amenities — right of the images */}
        <div className="lg:col-span-4 flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block mb-2">
            Key Amenities:
          </span>
          <div className="flex-1 grid grid-cols-1 gap-2 text-xs font-sans content-start">
            {venue.amenities.slice(0, 2).map((amenity, aIdx) => (
              <div key={aIdx} className="flex items-start space-x-2 text-neutral-700 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/80">
                <span aria-hidden="true" className="w-3.5 h-3.5  shrink-0 mt-0.5 inline-block border border-current"></span>
                <span className="text-[11px] font-light leading-relaxed">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
      )}
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
  // Hotel 1 in Web view gets the feature design (landing-page language). Everything else is unchanged.
  const web = useWeb();
  const feature = web && hotel.id === FEATURE_HOTEL_ID;
  const mobile = useMobileLayout(); // Mobile: the side form becomes a popup + floating button (same form, same fields)
  const shown = feature ? withHotelCopy(hotel) : hotel; // client copy, display only

  // Gallery Preview Lightbox Overlay Modal State
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [activePreviewIndex, setActivePreviewIndex] = useState<number>(0);
  const [activePreviewSlides, setActivePreviewSlides] = useState<{ url: string; caption: string; isDraftDrawing: boolean; notes?: string }[]>([]);
  const pillBarRef = useRef<HTMLDivElement>(null);

  // Enquiry form state — new lean form (this hotel pre-selected)

  const OCCASIONS = ['Occasion 1', 'Occasion 2', 'Occasion 3', 'Occasion 4', 'Occasion 5'];
  const [formDataPersona, setFormDataPersona] = useState<string>('Bride or Groom');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [notes, setNotes] = useState('');
  const [occasion, setOccasion] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('Country 1');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedHotelIds, setSelectedHotelIds] = useState<string[]>([hotel.id]);

  const availableHotels = useMemo(() => {
    if (selectedDestinations.length === 0) return HOTELS_DATA;
    const names = selectedDestinations.flatMap((d) => {
      for (const c of Object.values(COUNTRY_DEST_MAP)) { if (c[d]) return c[d]; }
      return [];
    });
    return HOTELS_DATA.filter((h) => names.includes(h.name));
  }, [selectedDestinations]);

  const toggleHotel = (id: string) => {
    setSelectedHotelIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Mobile: tap any photo on the hotel page -> enlarged photo popup with ✕ (inside the phone frame)
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  useEffect(() => {
    if (!mobile) return;
    const onTap = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('.mobile-enquiry-popup, .mobile-zoom, header, footer, .mobile-hotel-inline, button[aria-label*="slide"], button[aria-label*="picture"], button[aria-label*="image"]')) return;
      const img = (t.tagName === 'IMG' ? t : t.closest('[class*="aspect"], .group\\/frame, .group\\/banner, .group\\/thumb')?.querySelector('img')) as HTMLImageElement | null;
      if (!img || !img.closest('main, #root')) return;
      if (img.getBoundingClientRect().width < 40) return;
      e.preventDefault(); e.stopPropagation();
      setZoomSrc(img.currentSrc || img.src);
    };
    document.addEventListener('click', onTap, true);
    return () => document.removeEventListener('click', onTap, true);
  }, [mobile]);
  useEffect(() => {
    if (!zoomSrc) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoomSrc(null); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [zoomSrc]);

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



  const [hotelModalOpen, setHotelModalOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);

  // Consent checkbox states (replicates landing form)
  const [consentMandatory, setConsentMandatory] = useState<boolean>(false);
  const [consentNewsletter, setConsentNewsletter] = useState<boolean>(false);
  const [consentContact, setConsentContact] = useState<boolean>(false);

  // Collapsible side-nav form: open on arrival, auto-collapse after landing, manually toggleable
  const [sideFormOpen, setSideFormOpen] = useState<boolean>(() => !(typeof document !== 'undefined' && document.documentElement.classList.contains('layout-mobile')));

  useEffect(() => {
    const t = setTimeout(() => setSideFormOpen(false), 2200);
    return () => clearTimeout(t);
  }, []);
  // Mobile: never auto-open the popup on arrival / when switching to Mobile
  useEffect(() => { if (mobile) setSideFormOpen(false); }, [mobile]);
  // Mobile popup: lock page scroll while open, Esc closes
  useEffect(() => {
    if (!(mobile && sideFormOpen)) return;
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSideFormOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [mobile, sideFormOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload: InquiryFormData = {
      primaryContactName: `${firstName} ${lastName}`.trim(),
      email,
      phone: '',
      decisionRole: (formDataPersona === 'Family' ? 'Parent' : formDataPersona === 'Wedding Planner' ? 'Wedding Planner' : 'Bride') as UserPersona,
      destinations: selectedDestinations,
      selectedHotelIds,
      selectedHotelNames: HOTELS_DATA.filter((h) => selectedHotelIds.includes(h.id)).map((h) => h.name),
      targetWindow: (dateFrom && dateTo) ? `${dateFrom} to ${dateTo}` : (dateFrom || dateTo || 'Dates to be finalized'),
      guestRange: guestCount || 'To be confirmed',
      estimatedGuests: Number(guestCount) || 0,
      ceremonyTraditions: [occasion],
      priorityDietary: [],
      notes,
    };
    setTimeout(() => {
      setSubmitting(false);
      if (onSubmitSuccess) onSubmitSuccess(payload);
    }, 600);
  };


  const activeLightboxSlide = activePreviewSlides[activePreviewIndex] || activePreviewSlides[0];

  return (
    <div className={`min-h-screen bg-white text-black font-sans animate-fade-in ${feature ? 'hotel-feature relative' : 'pb-24'}`}>
      
      {/* Top Breadcrumb Bar */}
      <div className={feature ? 'hf-crumb absolute inset-x-0 top-0 z-30 py-4' : 'border-b border-neutral-200 bg-neutral-50 py-3 sticky top-0 z-30 backdrop-blur-md bg-neutral-50/95'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">{feature ? 'Home Page' : 'Home'}</button>
            <span>/</span>
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">All Hotels</button>
            <span>/</span>
            <span className="text-black font-medium">{shown.name}</span>
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

      {feature && (
        <FeatureHero hotel={shown} onExpand={() => handleOpenPreview(0, [{ url: FEATURE_HERO, caption: `${hotel.name} Exterior Sanctuary`, isDraftDrawing: false }])} />
      )}
      {/* Hero Banner (Grayscale Luxury) with Quick Preview trigger */}
      {!feature && (
      <div className="relative h-[440px] lg:h-[520px] w-full overflow-hidden bg-black group/banner">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover filter grayscale contrast-115"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22%23bfbfbf%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%238a8a8a%22%20stroke-width%3D%2222%22%20stroke-linejoin%3D%22round%22%20stroke-linecap%3D%22round%22%3E%3Crect%20x%3D%22470%22%20y%3D%22300%22%20width%3D%22260%22%20height%3D%22200%22%20rx%3D%2214%22%2F%3E%3Ccircle%20cx%3D%22552%22%20cy%3D%22368%22%20r%3D%2217%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3Cpath%20d%3D%22M487%20480%20l75%20-62%2048%2040%2045%20-38%2070%2060%22%20fill%3D%22%238a8a8a%22%20stroke%3D%22none%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E' + encodeURIComponent(hotel.name);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {/* Banner Click to Preview Button */}
        <button
          type="button"
          onClick={() => handleOpenPreview(0, [{ url: hotel.image, caption: `${hotel.name} Exterior Sanctuary`, isDraftDrawing: false }])}
          className="absolute top-6 right-6 z-20 bg-black/60 hover:bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-sans font-medium flex items-center space-x-1.5 backdrop-blur-xs border border-white/20 transition-all cursor-pointer shadow-sm"
        >
          <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
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
              <span aria-hidden="true" className="w-4 h-4  shrink-0 inline-block border border-current"></span>
              <span>{hotel.location}</span>
            </p>
          </div>
        </div>
      </div>
      )}

      {/* Page Content + Collapsible Side-Nav Form */}
      <div className="relative">

        {/* Collapsible Side-Nav Lead Form — absolute right rail on Web; on Mobile the SAME form opens as a centred popup from a floating button */}
        {((node: React.ReactElement) => (mobile ? createPortal(node, document.body) : node))(
        <div
          {...(mobile && sideFormOpen ? { role: 'dialog', 'aria-modal': true, 'aria-label': 'Enquiry form' } : {})}
          onClick={mobile && sideFormOpen ? (e) => { if (e.target === e.currentTarget) setSideFormOpen(false); } : undefined}
          className={mobile
            ? (sideFormOpen
                ? 'mobile-enquiry-popup mobile-frame-fixed fixed top-0 bottom-0 z-[150] flex items-center justify-center p-3 animate-fade-in'
                : 'mobile-enquiry-fab fixed z-[140] bottom-5')
            : `hidden lg:block absolute top-0 right-0 z-40 min-h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            sideFormOpen ? 'w-[400px]' : 'w-12'
          }`}
        >
          <div className={mobile
                 ? `relative bg-white flex flex-col overflow-hidden ${sideFormOpen ? 'w-full rounded-2xl shadow-2xl' : 'rounded-full shadow-xl'}`
                 : `sticky ${feature ? (sideFormOpen ? 'top-[146px]' : 'top-[260px]') : 'top-20'} bg-white border-l border-neutral-200 ${feature ? '' : 'shadow-lg'} flex flex-col overflow-hidden`}
               style={mobile
                 ? (sideFormOpen ? { height: 'min(86vh, 760px)' } : undefined)
                 : { height: sideFormOpen ? (feature ? 'calc(100vh - 146px)' : 'calc(100vh - 5rem)') : '15rem', transition: 'top 700ms cubic-bezier(0.16,1,0.3,1)' }}>

            {/* Collapse state: vertical black tab pinned to the right margin; Open state: slim close bar */}
            {sideFormOpen ? (
              <button
                type="button"
                onClick={() => setSideFormOpen(false)}
                className="shrink-0 h-12 flex items-center justify-center border-b border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer"
                aria-expanded={sideFormOpen}
                aria-label="Collapse lead form"
                title="Collapse"
              >
                <span className="group/x flex items-center space-x-1.5 text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                  {feature || mobile
                    ? <X strokeWidth={1.25} aria-hidden="true" className="w-4 h-4 transition-transform duration-700 group-hover/x:rotate-90" />
                    : <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>}
                  <span>Close Form</span>
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSideFormOpen(true)}
                className={mobile
                  ? 'w-12 h-12 bg-black text-white rounded-full cursor-pointer flex items-center justify-center'
                  : `w-12 shrink-0 flex-1 ${feature ? 'hover:opacity-90' : 'bg-black hover:bg-neutral-800 text-white'} transition-colors cursor-pointer flex items-start justify-center pt-5`}
                style={feature ? { backgroundColor: PALETTE.saffron, color: '#3a0618' } : undefined}
                aria-expanded={sideFormOpen}
                aria-label="Open enquiry form"
                title="Open enquiry form"
              >
                {mobile && <PenLine strokeWidth={1.5} aria-hidden="true" className="w-5 h-5" />}
                <span className={mobile ? 'sr-only' : '[writing-mode:vertical-rl] rotate-180 text-[11px] uppercase tracking-[0.32em] font-medium whitespace-nowrap'}>
                  Open Enquiry Form
                </span>
              </button>
            )}

            {/* Form body — only rendered when open */}
            {sideFormOpen && (
              <div className={`flex-1 overflow-y-auto ${feature ? 'hf-form p-6' : 'p-5'} font-sans text-xs`}>
                {/* Form Title */}
                <div className="mb-5 pb-4 border-b border-neutral-200 space-y-1">
                  <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                    <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                    <span>Direct Property Reservation</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-black">
                    Begin the Conversation
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-light">
                    Preliminary blueprint for <strong className="text-black font-medium">{shown.name}</strong>.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">

                  {/* 1. Persona */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">Persona</label>
                    <select
                      value={formDataPersona}
                      onChange={(e) => setFormDataPersona(e.target.value)}
                      className="persona-select-mobile w-full border border-neutral-300 rounded-xl px-3 py-2.5 text-sm font-sans bg-white cursor-pointer hidden"
                      aria-label="Persona"
                    >
                      {(['Bride or Groom', 'Family', 'Wedding Planner'] as string[]).map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <div className="persona-buttons-web grid grid-cols-3 gap-1.5">
                      {(['Bride or Groom', 'Family', 'Wedding Planner'] as string[]).map((persona) => {
                        const isSelected = formDataPersona === persona;
                        return (
                          <button
                            type="button"
                            key={persona}
                            onClick={() => setFormDataPersona(persona)}
                            className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
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

                  {/* 2. Core fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">First Name *</label>
                      <input type="text" required placeholder="First name" value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Last Name *</label>
                      <input type="text" required placeholder="Last name" value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Email *</label>
                      <input type="email" required placeholder="name@example.com" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Occasion</label>
                      <OccasionDropdown
                        selectedOccasions={occasion}
                        onChange={setOccasion}
                        inputCls={"w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Date From</label>
                      <input type="date" min="2025-01-01" max="2028-12-31" value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black cursor-pointer font-medium" />
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Date To</label>
                      <input type="date" min={dateFrom || "2025-01-01"} max="2028-12-31" value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black cursor-pointer font-medium" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Number of Guests</label>
                      <input type="number" min="20" max="2000" placeholder="e.g. 250" value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black" />
                    </div>
                  </div>

                  {/* 3. Select Destination — Country dropdown + Destination multi-checkbox dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                        Destination {selectedDestinations.length > 0 && `(${selectedDestinations.length} selected)`}
                      </label>
                      <DestinationDropdown
                        selectedCountry={selectedCountry}
                        selectedDestinations={selectedDestinations}
                        onChange={setSelectedDestinations}
                        inputCls="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs"
                      />
                    </div>
                  </div>

                  {/* 4. Hotels — popup with visual images; this hotel pre-selected */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                      Select Hotels {selectedHotelIds.length > 0 && `(${selectedHotelIds.length} selected — enquiry routes to all)`}
                    </label>
                    {mobile ? (
                      /* Mobile: hotels listed right inside the form — tap to add / remove (same selection state as the popup) */
                      <div className="mobile-hotel-inline border border-neutral-300 rounded-xl divide-y divide-neutral-200 max-h-56 overflow-y-auto bg-white">
                        {availableHotels.map((h) => {
                          const on = selectedHotelIds.includes(h.id);
                          return (
                            <button key={h.id} type="button" onClick={() => toggleHotel(h.id)} aria-pressed={on}
                                    className={`w-full flex items-center gap-3 p-2 text-left cursor-pointer ${on ? 'bg-neutral-50' : ''}`}>
                              <span className="flex-1 min-w-0 py-1 pl-1">
                                <span className="block text-[12px] text-black truncate">{`Hotel ${HOTELS_DATA.indexOf(h) + 1}`}{h.id === hotel.id && <span className="ml-1 text-[8px] uppercase tracking-wider text-neutral-400">(this property)</span>}</span>
                              </span>
                              <span aria-hidden="true" className={`w-5 h-5 rounded-full border flex items-center justify-center text-[11px] shrink-0 ${on ? 'bg-black border-black text-white' : 'border-neutral-400 text-transparent'}`}>✓</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                    <button
                      type="button"
                      onClick={() => {
                        document.querySelector('.sticky.top-20')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setHotelModalOpen(true);
                      }}
                      className="w-full bg-white border border-neutral-300 hover:border-black rounded-xl p-2.5 text-left text-xs text-black flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span className={selectedHotelIds.length ? 'font-medium' : 'text-neutral-400 font-light'}>
                        {selectedHotelIds.length
                          ? `${selectedHotelIds.length} propert${selectedHotelIds.length > 1 ? 'ies' : 'y'} selected`
                          : 'Choose properties'}
                      </span>
                      <span className="flex items-center space-x-1.5 shrink-0">
                        {selectedHotelIds.length > 0 && (
                          <span className="text-[10px] text-neutral-400 font-light max-w-[140px] truncate">
                            {HOTELS_DATA.filter((h) => selectedHotelIds.includes(h.id)).slice(0, 2).map((h) => h.name).join(', ')}{selectedHotelIds.length > 2 ? '…' : ''}
                          </span>
                        )}
                        <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                      </span>
                    </button>
                    )}
                    {!mobile && selectedHotelIds.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {HOTELS_DATA.filter((h) => selectedHotelIds.includes(h.id)).map((h) => (
                          <span key={h.id} className="inline-flex items-center gap-1.5 border border-neutral-300 bg-neutral-50 rounded-full pl-3 pr-1.5 py-1 text-[10px] text-neutral-700">
                            {h.name}
                            {h.id === hotel.id && <span className="text-[8px] uppercase tracking-wider text-neutral-400">(this property)</span>}
                            <button
                              type="button"
                              onClick={() => toggleHotel(h.id)}
                              className="w-4 h-4 rounded-full border border-neutral-400 hover:border-black hover:text-black flex items-center justify-center cursor-pointer text-[9px] leading-none"
                              aria-label={`Remove ${h.name}`}
                            >×</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 5. Notes */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Share any details about your celebration…"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black resize-none"
                    />
                  </div>

                  {/* 6. Consent checkboxes — kept as-is */}
                  <div className="space-y-2 pt-1">
                    <label className="flex items-start space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={consentMandatory}
                        onChange={(e) => setConsentMandatory(e.target.checked)}
                        className="mt-0.5 w-3.5 h-3.5 shrink-0 accent-black cursor-pointer"
                      />
                      <span className="text-[11px] text-neutral-600 font-light leading-relaxed">
                        I confirm that I am at least 18 years of age &amp; I agree to the General Terms and Conditions and the Privacy Policy of IHG. <span className="text-[10px] uppercase tracking-wider text-neutral-500">(Mandatory)</span>
                      </span>
                    </label>

                    <label className="flex items-start space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentNewsletter}
                        onChange={(e) => setConsentNewsletter(e.target.checked)}
                        className="mt-0.5 w-3.5 h-3.5 shrink-0 accent-black cursor-pointer"
                      />
                      <span className="text-[11px] text-neutral-600 font-light leading-relaxed">
                        I wish to receive regular newsletters and updates about future news. <span className="text-[10px] uppercase tracking-wider text-neutral-500">(Optional)</span>
                      </span>
                    </label>

                    <label className="flex items-start space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentContact}
                        onChange={(e) => setConsentContact(e.target.checked)}
                        className="mt-0.5 w-3.5 h-3.5 shrink-0 accent-black cursor-pointer"
                      />
                      <span className="text-[11px] text-neutral-600 font-light leading-relaxed">
                        I consent to sharing my contact number so the IHG Team can contact me via email. <span className="text-[10px] uppercase tracking-wider text-neutral-500">(Optional)</span>
                      </span>
                    </label>
                  </div>

                  {/* Submit — sticky at the bottom of the popup on Mobile */}
                  <div className={mobile ? 'mobile-sticky-submit sticky bottom-0 -mx-5 px-5 pt-3 pb-4 bg-white border-t border-neutral-200 z-10' : 'pt-2'}>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-black hover:bg-neutral-800 text-white py-3.5 rounded-xl font-medium tracking-wider uppercase text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                    >
                      <span>{submitting ? "Submitting…" : "Submit Query"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </form>

                <div className="text-center text-[10px] text-neutral-400 mt-4 px-2">
                  Protected by IHG Privacy Protocol.
                </div>
              </div>
            )}
          </div>
        </div>
        )}

        {/* Main content — dynamically spreads when the side form collapses */}
        <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${sideFormOpen ? 'lg:pr-[400px]' : 'lg:pr-0'}`}>
          {feature ? (
            <FeatureBody hotel={shown} onPreview={handleOpenPreview} onNavigateToInquiry={() => onNavigateToInquiry(hotel.name)} />
          ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="space-y-14">

            {/* Quick Metrics Bar — Capacity / Total Rooms / No of Venues / Setting / Transit */}
            <div className="hotel-metrics grid grid-cols-2 sm:grid-cols-5 gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-center">
              <div>
                <span className="text-[9px] uppercase text-neutral-400 font-semibold block mb-0.5">Capacity</span>
                <div className="font-serif text-sm font-bold text-black flex items-center justify-center space-x-1">
                  <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                  <span>{hotel.capacityMin}–{hotel.capacityMax}</span>
                </div>
                <span className="text-[10px] text-neutral-500">Guests</span>
              </div>

              <div>
                <span className="text-[9px] uppercase text-neutral-400 font-semibold block mb-0.5">Total Rooms</span>
                <div className="font-serif text-sm font-bold text-black flex items-center justify-center space-x-1">
                  <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                  <span>{hotel.roomsCount}</span>
                </div>
                <span className="text-[10px] text-neutral-500">Keys, Suites &amp; Villas</span>
              </div>

              <div>
                <span className="text-[9px] uppercase text-neutral-400 font-semibold block mb-0.5">No of Venues</span>
                <div className="font-serif text-sm font-bold text-black flex items-center justify-center space-x-1">
                  <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                  <span>{(hotel.curatedSpaces || []).length}</span>
                </div>
                <span className="text-[10px] text-neutral-500">Curated Spaces</span>
              </div>

              <div>
                <span className="text-[9px] uppercase text-neutral-400 font-semibold block mb-0.5">Setting</span>
                <div className="font-serif text-[11px] font-semibold text-black mt-1 truncate px-1">
                  {hotel.genre}
                </div>
                <span className="text-[10px] text-neutral-500">{hotel.city}</span>
              </div>

              <div>
                <span className="text-[9px] uppercase text-neutral-400 font-semibold block mb-0.5">Transit</span>
                <div className="font-serif text-[11px] font-semibold text-black mt-1 truncate px-1">
                  {hotel.airportDistance ? hotel.airportDistance.split('from')[0].trim() : 'International Hub'}
                </div>
                <span className="text-[10px] text-neutral-500 truncate block px-1">
                  {hotel.airportDistance ? hotel.airportDistance.split('from')[1]?.trim() || 'Nearest Hub' : 'Arrival Gate'}
                </span>
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
                <span aria-hidden="true" className="w-5 h-5  shrink-0 inline-block border border-current"></span>
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

              {/* Venue Jump Pills — sticky index; click scrolls venue to top of viewport */}
              <div ref={pillBarRef} className="sticky top-[110px] sm:top-[146px] z-20 bg-white/95 backdrop-blur-sm py-2.5 border-y border-neutral-200 shadow-sm">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                  {(hotel.curatedSpaces || []).map((venue, vIndex) => (
                    <button
                      key={vIndex}
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(`venue-anchor-${vIndex}`);
                        if (!el) return;
                        const barRect = (pillBarRef.current || {}).getBoundingClientRect ? pillBarRef.current.getBoundingClientRect() : { bottom: 64 };
                        const offset = Math.max(64, barRect.bottom + 12);
                        const top = el.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }}
                      className="shrink-0 w-32 rounded-xl border border-neutral-300 bg-white overflow-hidden hover:border-black transition-colors cursor-pointer group/thmb"
                    >
                      <div className="aspect-[4/3] w-full bg-neutral-900 relative overflow-hidden">
                        <img
                          src={(venue.gallery && venue.gallery[0]) || ''}
                          alt={`${venue.name} thumbnail`}
                          className="w-full h-full object-cover filter grayscale contrast-110 group-hover/thmb:scale-105 transition-transform"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="px-2 py-1.5 text-[10px] font-sans font-medium text-neutral-700 group-hover/thmb:text-black transition-colors truncate">
                        Venue {vIndex + 1} - {venue.capacity}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Venue cards — compact: stacked, scrollable, one anchor each */}
              <div className="space-y-5">
                {(hotel.curatedSpaces || []).map((venue, vIndex) => (
                  <div 
                    key={vIndex} 
                    id={`venue-anchor-${vIndex}`}
                    className="scroll-mt-28 bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden flex flex-col"
                  >
                    {/* TOP: venue title + one-line description */}
                    <div className="px-5 pt-4 pb-3">
                      <h4 className="font-serif text-lg sm:text-xl font-normal text-black leading-tight">
                        Venue {vIndex + 1} - Placeholder Text
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-light leading-relaxed mt-1 line-clamp-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                      </p>
                    </div>

                    {/* MIDDLE: 16:9 carousel media, full card width */}
                    <div>
                      <VenueCarousel 
                        venue={venue} 
                        onPreviewImage={handleOpenPreview}
                        compact
                      />
                    </div>

                    {/* BELOW: Key Highlights in 2 columns, airy spacing */}
                    <div className="px-5 py-4">

                      {/* Key Highlights — 4 top row + 3 bottom row, centered, equidistant */}
                      <div className="grid grid-cols-4 gap-x-4 gap-y-3 text-xs font-sans">
                        <div className="text-left flex items-start gap-1.5">
                          <span aria-hidden="true" className="w-1.5 h-1.5 border border-neutral-400 shrink-0 mt-1.5 inline-block"></span>
                          <div>
                            <span className="text-neutral-500 text-[10px] font-light leading-snug block">Venue Size</span>
                            <span className="text-neutral-600 font-extralight text-[11px] leading-snug block">Lorem ipsum sq.ft</span>
                          </div>
                        </div>
                        <div className="text-left flex items-start gap-1.5">
                          <span aria-hidden="true" className="w-1.5 h-1.5 border border-neutral-400 shrink-0 mt-1.5 inline-block"></span>
                          <div>
                            <span className="text-neutral-500 text-[10px] font-light leading-snug block">Seating Capacity</span>
                            <span className="text-neutral-600 font-extralight text-[11px] leading-snug block">Cluster · Classroom · Theatre</span>
                          </div>
                        </div>
                        <div className="text-left flex items-start gap-1.5">
                          <span aria-hidden="true" className="w-1.5 h-1.5 border border-neutral-400 shrink-0 mt-1.5 inline-block"></span>
                          <div>
                            <span className="text-neutral-500 text-[10px] font-light leading-snug block">Floating Capacity</span>
                            <span className="text-neutral-600 font-extralight text-[11px] leading-snug block">Lorem ipsum guests</span>
                          </div>
                        </div>
                        <div className="text-left flex items-start gap-1.5">
                          <span aria-hidden="true" className="w-1.5 h-1.5 border border-neutral-400 shrink-0 mt-1.5 inline-block"></span>
                          <div>
                            <span className="text-neutral-500 text-[10px] font-light leading-snug block">In-Built Stage</span>
                            <span className="text-neutral-600 font-extralight text-[11px] leading-snug block">Lorem ipsum</span>
                          </div>
                        </div>
                        <div className="text-left flex items-start gap-1.5">
                          <span aria-hidden="true" className="w-1.5 h-1.5 border border-neutral-400 shrink-0 mt-1.5 inline-block"></span>
                          <div>
                            <span className="text-neutral-500 text-[10px] font-light leading-snug block">Location</span>
                            <span className="text-neutral-600 font-extralight text-[11px] leading-snug block">Indoor / Outdoor / Poolside</span>
                          </div>
                        </div>
                        <div className="text-left flex items-start gap-1.5">
                          <span aria-hidden="true" className="w-1.5 h-1.5 border border-neutral-400 shrink-0 mt-1.5 inline-block"></span>
                          <div>
                            <span className="text-neutral-500 text-[10px] font-light leading-snug block">Vendor Policies</span>
                            <span className="text-neutral-600 font-extralight text-[11px] leading-snug block">In-House / Outside</span>
                          </div>
                        </div>
                        <div className="text-left flex items-start gap-1.5">
                          <span aria-hidden="true" className="w-1.5 h-1.5 border border-neutral-400 shrink-0 mt-1.5 inline-block"></span>
                          <div>
                            <span className="text-neutral-500 text-[10px] font-light leading-snug block">Venue Timing Slots</span>
                            <span className="text-neutral-600 font-extralight text-[11px] leading-snug block">Lorem ipsum</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Us — dummy contact card (replaces Wedding Director) */}
            <div className="pt-4 border-t border-neutral-200">
              <div className={`bg-black text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${mobile ? 'mobile-contact-card' : ''}`}>
                <div className="flex items-center space-x-4">
                  {/* Monogram avatar */}
                  <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center bg-neutral-900 shrink-0">
                    <span className="font-serif text-lg tracking-wider">
                      {(() => {
                        const parts = hotel.name.replace(/^(Six Senses|Crowne Plaza|InterContinental|Holiday Inn Resort|Holiday Inn|voco)\s+/i, '').trim();
                        const initials = parts.split(/[\s,]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
                        return initials || 'IHG';
                      })()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block mb-1">
                      Get in Touch
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-normal text-white">
                      Contact Us — {hotel.name}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-sans shrink-0">
                  <div className="space-y-1.5">
                    <a href="tel:+919876543210" className="flex items-center space-x-2 text-neutral-200 hover:text-white transition-colors cursor-pointer">
                      <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-[10px]">✆</span>
                      <span>+91 98765 43210</span>
                    </a>
                    <a href="mailto:weddings@ihg.com" className="flex items-center space-x-2 text-neutral-200 hover:text-white transition-colors cursor-pointer">
                      <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-[10px]">✉</span>
                      <span>weddings@ihg.com</span>
                    </a>
                    <div className="flex items-center space-x-2 text-neutral-400">
                      <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                      <span>Mon–Sat · 09:00–19:00 IST</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => (mobile ? setSideFormOpen(true) : onNavigateToInquiry(hotel.name))}
                    className="bg-white text-black hover:bg-neutral-200 px-5 py-2.5 rounded-lg text-[11px] uppercase tracking-wider font-medium transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Begin the Conversation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            </div>
          </div>
          )}
        </div>

      </div>


      {mobile && zoomSrc && createPortal(
        <div className="mobile-zoom mobile-frame-fixed fixed top-0 bottom-0 z-[160] flex items-center justify-center p-3 animate-fade-in"
             style={{ background: 'rgba(0,0,0,.88)' }} role="dialog" aria-modal="true" aria-label="Enlarged photo" onClick={() => setZoomSrc(null)}>
          <img src={zoomSrc} alt="" className="max-w-full max-h-[80vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          <button type="button" aria-label="Close photo" onClick={() => setZoomSrc(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg cursor-pointer">
            <X strokeWidth={1.5} className="w-5 h-5" />
          </button>
        </div>, document.body)}

      {/* Hotel selector popup with visual images (side-rail form) */}
      <HotelSelectorModal
        isOpen={hotelModalOpen}
        selectedHotelIds={selectedHotelIds}
        hotelNameFilter={availableHotels.map((h) => h.name)}
        
      
        onClose={() => setHotelModalOpen(false)}
        onConfirmSelection={(ids) => setSelectedHotelIds(ids)}
      />

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
                  className="group/x p-1.5 rounded-full hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                  aria-label="Close image preview overlay"
                >
                  {feature
                    ? <X strokeWidth={1.25} aria-hidden="true" className="w-5 h-5 transition-transform duration-700 group-hover/x:rotate-90" />
                    : <span aria-hidden="true" className="w-5 h-5 inline-block border border-current"></span>}
                </button>
              </div>
            </div>

            {/* Full High-Resolution Visual Container */}
            <div className="relative bg-black flex-1 min-h-[340px] sm:min-h-[460px] flex items-center justify-center overflow-hidden">
              <span className="relative block max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full object-contain filter grayscale contrast-115"><span className="relative block max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full object-contain filter grayscale contrast-115"><img
                src={activeLightboxSlide.url}
                alt={activeLightboxSlide.caption}
                className="max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full object-contain filter grayscale contrast-115"
              /><span aria-hidden="true" className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none text-[10px] font-sans uppercase tracking-widest text-neutral-500 font-medium">Image here</span></span><span aria-hidden="true" className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none text-[10px] font-sans uppercase tracking-widest text-neutral-500 font-medium">Image here</span></span>

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
                      <span className="relative block w-full h-full object-cover filter grayscale contrast-110"><span className="relative block w-full h-full object-cover filter grayscale contrast-110"><img
                        src={slide.url}
                        alt={slide.caption}
                        className="w-full h-full object-cover filter grayscale contrast-110"
                      /><span aria-hidden="true" className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none text-[10px] font-sans uppercase tracking-widest text-neutral-500 font-medium">Image here</span></span><span aria-hidden="true" className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none text-[10px] font-sans uppercase tracking-widest text-neutral-500 font-medium">Image here</span></span>
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
