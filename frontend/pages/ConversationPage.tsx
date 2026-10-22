import React, { useState, useMemo } from 'react';
import { InquiryFormData, UserPersona } from '../types';
import { HOTELS_DATA } from '../constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ConversationPageProps {
  prefilledDestination?: string;
  prefilledHotel?: string;
  onNavigateBack: () => void;
  onSubmitSuccess: (data: InquiryFormData) => void;
}

export const ConversationPage: React.FC<ConversationPageProps> = ({
  prefilledDestination,
  prefilledHotel,
  onNavigateBack,
  onSubmitSuccess,
}) => {
    // Pre-fill from hotel page navigation (prefilledHotel is a hotel name)
  const matchedHotel = prefilledHotel
    ? HOTELS_DATA.find((h) => h.name.toLowerCase().includes(prefilledHotel.toLowerCase()))
    : undefined;

  const COUNTRY_DESTINATIONS = [
    { label: 'All Destinations', regions: [] as string[] },
    { label: 'Destination 1', regions: ['North India'] },
    { label: 'Destination 2', regions: ['West India'] },
    { label: 'Destination 3', regions: ['South India'] },
    { label: 'Destination 4', regions: ['East India'] },
  ];
  const OCCASIONS = ['Occasion 1', 'Occasion 2', 'Occasion 3', 'Occasion 4', 'Occasion 5'];

  const [formDataPersona, setFormDataPersona] = useState<string>('Bride or Groom');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [notes, setNotes] = useState(prefilledHotel ? `Inquiry initiated for ${prefilledHotel}.` : '');
  const [occasion, setOccasion] = useState('Occasion 1');
  const [countryDestination, setCountryDestination] = useState('All Destinations');
  const [selectedHotelIds, setSelectedHotelIds] = useState<string[]>(
    matchedHotel ? [matchedHotel.id] : []
  );
  const [consentMandatory, setConsentMandatory] = useState<boolean>(false);
  const [consentNewsletter, setConsentNewsletter] = useState<boolean>(false);
  const [consentContact, setConsentContact] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);

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
      onSubmitSuccess(payload);
    }, 600);
  };


  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">
      
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Exploration</button>
            <span>/</span>
            <span className="text-black font-medium">Begin the Conversation</span>
          </div>

          <button
            onClick={onNavigateBack}
            className="inline-flex items-center space-x-1.5 text-black hover:text-neutral-600 font-medium uppercase tracking-wider text-[11px] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Exploration</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
            <span aria-hidden="true" className="w-4 h-4 inline-block border border-current"></span>
            <span>Bespoke Sanctuary Intake</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-black leading-tight">
            Begin the Conversation
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-2xl leading-relaxed">
            Share your preliminary celebration plans. Our luxury wedding directors will review your dates, dietary requirements, and room inventory across your selected genres before orchestrating your personalized itinerary.
          </p>
        </div>

        {/* Form Container Card */}
        <div 
          id="conversation-form-card"
          className="relative bg-white rounded-3xl border border-neutral-300 p-6 sm:p-12 shadow-sm font-sans text-xs min-h-[700px]"
        >
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* 1. Persona */}
            <div>
              <label className="font-serif text-lg text-black font-normal block mb-2">Persona</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Bride or Groom', 'Family', 'Wedding Planner'] as string[]).map((persona) => {
                  const isSelected = formDataPersona === persona;
                  return (
                    <button
                      type="button"
                      key={persona}
                      onClick={() => setFormDataPersona(persona)}
                      className={`py-3 px-3 rounded-xl border text-center transition-all cursor-pointer ${
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

            {/* 2. Core fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">First Name *</label>
                <input type="text" required placeholder="First name" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">Last Name *</label>
                <input type="text" required placeholder="Last name" value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">Email *</label>
                <input type="email" required placeholder="name@example.com" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">Occasion</label>
                <select value={occasion} onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black cursor-pointer font-medium">
                  {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">Expected Date</label>
                <input type="date" min="2025-01-01" max="2028-12-31" value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black cursor-pointer font-medium" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">Number of Guests</label>
                <input type="number" min="20" max="2000" placeholder="e.g. 250" value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black" />
              </div>
            </div>

            {/* 3. Destination (country-level) */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">Destination</label>
              <select value={countryDestination} onChange={(e) => setCountryDestination(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black cursor-pointer font-medium">
                {COUNTRY_DESTINATIONS.map((c) => <option key={c.label} value={c.label}>{c.label}</option>)}
              </select>
            </div>

            {/* 4. Hotels — multi-select, filtered by destination, pre-filled hotel stays */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">
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

            {/* 5. Notes */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">Notes</label>
              <textarea
                rows={3}
                placeholder="Share any details about your celebration…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black resize-none"
              />
            </div>

            {/* Consent Checkboxes — kept as-is */}
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
                className="w-full bg-black hover:bg-neutral-800 text-white py-4 rounded-xl font-medium tracking-wider uppercase text-xs transition-colors cursor-pointer shadow-xs"
              >
                {submitting ? "Submitting…" : "Submit Query"}
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
