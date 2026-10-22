import React, { useState, useMemo } from 'react';
import { InquiryFormData, UserPersona } from '../types';
import { HOTELS_DATA } from '../constants';
import { ArrowRight } from 'lucide-react';

interface DiscoveryFormProps {
  onSubmitSuccess?: (data: InquiryFormData) => void;
  onOpenConversationPage?: () => void;
  /** When embedded on a hotel detail page, the hotel id to pre-select */
  preselectedHotelId?: string;
}

// Country-level destination options (placeholder labels; map to regions for filtering)
const COUNTRY_DESTINATIONS = [
  { label: 'All Destinations', regions: [] as string[] },
  { label: 'Destination 1', regions: ['North India'] },
  { label: 'Destination 2', regions: ['West India'] },
  { label: 'Destination 3', regions: ['South India'] },
  { label: 'Destination 4', regions: ['East India'] },
];

const OCCASIONS = ['Occasion 1', 'Occasion 2', 'Occasion 3', 'Occasion 4', 'Occasion 5'];

export const DiscoveryForm: React.FC<DiscoveryFormProps> = ({
  onSubmitSuccess,
  preselectedHotelId,
}) => {
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
  const [expectedDate, setExpectedDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [notes, setNotes] = useState('');
  const [occasion, setOccasion] = useState('Occasion 1');
  const [countryDestination, setCountryDestination] = useState('All Destinations');

  const [selectedHotelIds, setSelectedHotelIds] = useState<string[]>(
    preselectedHotel ? [preselectedHotel.id] : []
  );

  // Destination (country-level) filters the selectable hotels
  const availableHotels = useMemo(() => {
    const chosen = COUNTRY_DESTINATIONS.find((c) => c.label === countryDestination);
    if (!chosen || chosen.regions.length === 0) return HOTELS_DATA;
    return HOTELS_DATA.filter((h) => chosen.regions.includes(h.region));
  }, [countryDestination]);

  const toggleHotel = (id: string) => {
    setSelectedHotelIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload: InquiryFormData = {
      primaryContactName: `${firstName} ${lastName}`.trim(),
      email,
      phone: '',
      decisionRole: (formDataPersona === 'Family' ? 'Parent' : formDataPersona === 'Wedding Planner' ? 'Wedding Planner' : 'Bride') as UserPersona,
      destinations: [countryDestination],
      selectedHotelIds,
      selectedHotelNames: HOTELS_DATA.filter((h) => selectedHotelIds.includes(h.id)).map((h) => h.name),
      targetWindow: expectedDate || 'Dates to be finalized',
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
    <section id="contact" className="py-20 lg:py-24 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title & Description */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-sans font-medium block mb-2">
            Consultation &amp; Reservation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-black font-normal mb-3">
            Placeholder Text (Lead Form Capture)
          </h2>
          <p className="font-sans text-neutral-600 text-sm font-light leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>

        <div
          id="discovery-form-card"
          className="relative bg-white rounded-3xl border border-neutral-300 p-5 sm:p-8 shadow-sm font-sans text-xs"
        >
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* 1. Persona */}
            <div>
              <label className="font-serif text-base text-black font-normal block mb-2">
                Persona
              </label>
              <div className="grid grid-cols-3 gap-2">
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
                <label className={labelCls}>Occasion</label>
                <select value={occasion} onChange={(e) => setOccasion(e.target.value)}
                  className={inputCls + " cursor-pointer font-medium"}>
                  {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Expected Date</label>
                <input type="date" min="2025-01-01" max="2028-12-31" value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)} className={inputCls + " cursor-pointer font-medium"} />
              </div>
              <div>
                <label className={labelCls}>Number of Guests</label>
                <input type="number" min="20" max="2000" placeholder="e.g. 250" value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* 3. Destination (country-level) — filters hotels */}
            <div>
              <label className={labelCls}>Destination</label>
              <select value={countryDestination} onChange={(e) => setCountryDestination(e.target.value)}
                className={inputCls + " cursor-pointer font-medium"}>
                {COUNTRY_DESTINATIONS.map((c) => <option key={c.label} value={c.label}>{c.label}</option>)}
              </select>
            </div>

            {/* 4. Hotel multi-select — filtered by destination, chips for selection */}
            <div>
              <label className={labelCls}>
                Select Hotels {selectedHotelIds.length > 0 && `(${selectedHotelIds.length} selected — enquiry routes to all)`}
              </label>
              {availableHotels.length === 0 ? (
                <p className="text-neutral-400 font-light">No hotels in this destination yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {availableHotels.map((h) => {
                    const selected = selectedHotelIds.includes(h.id);
                    return (
                      <button
                        type="button"
                        key={h.id}
                        onClick={() => toggleHotel(h.id)}
                        className={`px-3 py-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                          selected
                            ? 'border-black bg-black text-white font-medium'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-black'
                        }`}
                      >
                        {h.name}
                        {preselectedHotel && h.id === preselectedHotel.id && !selected && (
                          <span className="block text-[9px] opacity-60">tap to re-add</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
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
    </section>
  );
};
