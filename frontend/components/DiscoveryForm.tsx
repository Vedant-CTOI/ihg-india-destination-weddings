import React, { useState, useMemo } from 'react';
import { InquiryFormData, UserPersona } from '../types';
import { HOTELS_DATA } from '../constants';
import { ArrowRight } from 'lucide-react';
import { HotelSelectorModal } from './HotelSelectorModal';
import { COUNTRY_DEST_MAP, DestinationDropdown } from './DestinationDropdown';
import { OccasionDropdown } from './OccasionDropdown';
import { useWeb, SplitText, PALETTE } from './webMotion';

interface DiscoveryFormProps {
  onSubmitSuccess?: (data: InquiryFormData) => void;
  onOpenConversationPage?: () => void;
  /** When embedded on a hotel detail page, the hotel id to pre-select */
  preselectedHotelId?: string;
}

// Destination filter data — countries -> destinations -> hotels

const OCCASIONS = ['Occasion 1', 'Occasion 2', 'Occasion 3', 'Occasion 4', 'Occasion 5'];

export const DiscoveryForm: React.FC<DiscoveryFormProps> = ({
  onSubmitSuccess,
  preselectedHotelId,
}) => {
  const web = useWeb(); // WEB VERSION ONLY styling/motion (form fields + logic untouched)
  const [formDataPersona, setFormDataPersona] = useState<string>('Bride or Groom');
  const [consentMandatory, setConsentMandatory] = useState<boolean>(false);
  const [consentNewsletter, setConsentNewsletter] = useState<boolean>(false);
  const [consentContact, setConsentContact] = useState<boolean>(false);

  // Pre-select the embedded hotel, if given
  const preselectedHotel = preselectedHotelId
    ? HOTELS_DATA.find((h) => h.id === preselectedHotelId)
    : undefined;

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

  const [selectedHotelIds, setSelectedHotelIds] = useState<string[]>(
    preselectedHotel ? [preselectedHotel.id] : []
  );

  // Destinations filter (multi) across ALL countries — Country field removed
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

  const [hotelModalOpen, setHotelModalOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload: InquiryFormData = {
      primaryContactName: `${firstName} ${lastName}`.trim(),
      email,
      phone: '',
      decisionRole: (formDataPersona === 'Family' ? 'Parent' : formDataPersona === 'Wedding Planner' ? 'Wedding Planner' : 'Bride') as UserPersona,
      destinations: selectedDestinations.length > 0 ? selectedDestinations : [selectedCountry],
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

  const inputCls = "w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black";
  const labelCls = "block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5";

  return (
    <section id="contact" className="py-20 lg:py-24 bg-neutral-50 border-b border-neutral-200" data-tone={web ? 'light' : undefined} style={web ? { backgroundColor: PALETTE.marigold, borderColor: 'transparent' } : undefined}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title & Description */}
        <div className="sec-head text-center max-w-2xl mx-auto mb-12">
          <span data-wm={web ? '' : undefined} className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-sans font-medium block mb-2">
            Consultation &amp; Reservation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-black font-normal mb-3">
            {web ? <SplitText text="Placeholder Text (Lead Form Capture)" /> : 'Placeholder Text (Lead Form Capture)'}
          </h2>
          <p data-wm={web ? '' : undefined} style={{ ['--d' as any]: '300ms' }} className="font-sans text-neutral-600 text-sm font-light leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>

        <div
          id="discovery-form-card"
          data-wm={web ? '' : undefined}
          style={{ ['--d' as any]: '400ms' }}
          className="relative bg-white rounded-3xl border border-neutral-300 p-5 sm:p-8 shadow-sm font-sans text-xs"
        >
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* 1. Persona */}
            <div>
              <label className="font-serif text-base text-black font-normal block mb-2">
                Persona
              </label>
              {/* Mobile-only: persona as single-select dropdown (CSS toggles button row vs select) */}
              <select
                value={formDataPersona}
                onChange={(e) => setFormDataPersona(e.target.value)}
                className="persona-select-mobile w-full border border-neutral-300 rounded-xl px-3 py-2.5 text-sm font-sans bg-white cursor-pointer hidden"
                aria-label="Persona"
              >
                {(['Bride or Groom', 'Family', 'Wedding Planner'] as string[]).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <div className="persona-buttons-web grid grid-cols-3 gap-2">
                {(['Bride or Groom', 'Family', 'Wedding Planner'] as string[]).map((persona) => {
                  const isSelected = formDataPersona === persona;
                  return (
                    <button
                      type="button"
                      key={persona}
                      onClick={() => setFormDataPersona(persona)}
                      className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-black bg-black text-white font-medium shadow-2xs'
                          : 'border-neutral-200 text-neutral-700 hover:border-black bg-neutral-50'
                      }`}
                    >
                      <span className="block text-xs">{persona}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Core fields — First / Last name, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mobile-fullname-wrap">
                <label className={labelCls}>Full Name *</label>
                <input type="text" required placeholder="Full name"
                  value={[firstName, lastName].filter(Boolean).join(' ')}
                  onChange={(e) => {
                    const parts = e.target.value.trim().split(/\s+/);
                    setFirstName(parts[0] || '');
                    setLastName(parts.slice(1).join(' ') || '');
                  }}
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>First Name *</label>
                <input type="text" required placeholder="First name" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Last Name *</label>
                <input type="text" required placeholder="Last name" value={lastName}
                  onChange={(e) => setLastName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email *</label>
                <input type="email" required placeholder="name@example.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Occasion{occasion.length > 0 && ` (${occasion.length} selected)`}</label>
                <OccasionDropdown
                  selectedOccasions={occasion}
                  onChange={setOccasion}
                  inputCls={inputCls}
                />
              </div>
              <div className="form-field-date">
                <label className={labelCls}>Date From</label>
                <input type="date" min="2025-01-01" max="2028-12-31" value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)} className={inputCls + " cursor-pointer font-medium"} />
                <label className={labelCls + ' ihtm-lbl'}>Date To</label>
                <input type="date" min={dateFrom || "2025-01-01"} max="2028-12-31" value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)} className={inputCls + " cursor-pointer font-medium"} />
              </div>
              <div className="form-field-guests">
                <label className={labelCls}>Number of Guests</label>
                <input type="number" min="20" max="2000" placeholder="e.g. 250" value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* 3. Select Destination — Country dropdown + Destination multi-checkbox dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-field-destination">
                <label className={labelCls}>Destination {selectedDestinations.length > 0 && `(${selectedDestinations.length} selected)`}</label>
                <DestinationDropdown
                  selectedCountry={selectedCountry}
                  selectedDestinations={selectedDestinations}
                  onChange={setSelectedDestinations}
                  inputCls={inputCls}
                />
              </div>
            </div>

            {/* 4. Hotel multi-select — popup with visual images */}
            <div>
              <label className={labelCls}>
                Select Hotels {selectedHotelIds.length > 0 && `(${selectedHotelIds.length} selected — enquiry routes to all)`}
              </label>
              <button
                type="button"
                onClick={() => {
                  document.getElementById('discovery-form-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
              {selectedHotelIds.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {HOTELS_DATA.filter((h) => selectedHotelIds.includes(h.id)).map((h) => (
                    <span key={h.id} className="inline-flex items-center gap-1.5 border border-neutral-300 bg-neutral-50 rounded-full pl-3 pr-1.5 py-1 text-[10px] text-neutral-700">
                      {h.name}
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

            {/* 5. Notes — free text */}
            <div>
              <label className={labelCls}>Notes</label>
              <textarea
                rows={3}
                placeholder="Share any details about your celebration…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={inputCls + " resize-none"}
              />
            </div>

            {/* Consent Checkboxes — kept as-is (mandatory terms + optional marketing/contact) */}
            <div className="space-y-2.5">
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
                  I wish to receive regular newsletters and updates about future news. <button type="button" className="underline hover:text-black transition-colors cursor-pointer">View more.</button> <span className="text-[10px] uppercase tracking-wider text-neutral-500">(Optional)</span>
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

            {/* CTA */}
            <div className="pt-4 border-t border-neutral-200">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black hover:bg-neutral-800 text-white py-4 rounded-xl font-medium tracking-wider uppercase text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
              >
                <span>{submitting ? "Submitting…" : "Submit Query"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>


        </div>

      </div>

      {/* Hotel selector popup with visual images — page level */}
      <HotelSelectorModal
        isOpen={hotelModalOpen}
        selectedHotelIds={selectedHotelIds}
        hotelNameFilter={availableHotels.map((h) => h.name)}
        onClose={() => setHotelModalOpen(false)}
        onConfirmSelection={(ids) => setSelectedHotelIds(ids)}
      />
    </section>
  );
};
