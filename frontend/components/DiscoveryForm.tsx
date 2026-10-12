import React, { useState } from 'react';
import { InquiryFormData, UserPersona } from '../types';
import { HOTELS_DATA } from '../constants';
import { HotelSelectorModal } from './HotelSelectorModal';
import { ArrowRight } from 'lucide-react';

interface DiscoveryFormProps {
  onSubmitSuccess?: (data: InquiryFormData) => void;
  onOpenConversationPage?: () => void;
  onOpenCharter?: () => void;
}

export const DiscoveryForm: React.FC<DiscoveryFormProps> = ({
  onSubmitSuccess,
  onOpenCharter
}) => {
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
  const [hotelModalOpen, setHotelModalOpen] = useState<boolean>(false);
  const [consentMandatory, setConsentMandatory] = useState<boolean>(false);
  const [consentNewsletter, setConsentNewsletter] = useState<boolean>(false);
  const [consentContact, setConsentContact] = useState<boolean>(false);

  const [formData, setFormData] = useState<InquiryFormData>({
    primaryContactName: '',
    email: '',
    phone: '',
    decisionRole: 'Bride',
    destinations: ['20 Nov 2025 — Kartik Purnima Muhurtham'],
    selectedHotelIds: [],
    selectedHotelNames: [],
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    targetWindow: formatWindowString(defaultStartDate, defaultEndDate),
    guestRange: '150 – 350',
    estimatedGuests: 250,
    ceremonyTraditions: ['North Indian Mandap'],
    priorityDietary: ['Dedicated Jain Kitchen'],
    notes: '',
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
    { label: '50 – 150', defaultCount: 120 },
    { label: '150 – 350', defaultCount: 250 },
    { label: '350 – 650', defaultCount: 450 },
    { label: '650 – 1,500+', defaultCount: 850 }
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

  const handleOpenHotelOverlay = () => {
    setHotelModalOpen(true);
    const formCard = document.getElementById('discovery-form-card');
    if (formCard) {
      formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHotelSelectionSaved = (ids: string[], names: string[]) => {
    setFormData((prev) => ({
      ...prev,
      selectedHotelIds: ids,
      selectedHotelNames: names
    }));
  };

  const handleRemoveHotel = (idToRemove: string) => {
    setFormData((prev) => {
      const updatedIds = (prev.selectedHotelIds || []).filter((id) => id !== idToRemove);
      const updatedNames = HOTELS_DATA.filter((h) => updatedIds.includes(h.id)).map((h) => h.name);
      return {
        ...prev,
        selectedHotelIds: updatedIds,
        selectedHotelNames: updatedNames
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Description */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-sans font-medium block mb-2">
            Consultation &amp; Reservation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-black font-normal mb-3">
            Begin the Conversation
          </h2>
          <p className="font-sans text-neutral-600 text-sm font-light leading-relaxed">
            Share your preliminary celebration plans. Connect directly with an assigned Luxury Wedding Director to reserve auspicious date blocks, coordinate sanctuary properties, and tailor ceremonial catering across India.
          </p>

          {onOpenCharter && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onOpenCharter}
                className="inline-flex items-center space-x-1.5 text-xs font-sans uppercase tracking-wider text-black border border-neutral-300 hover:border-black px-4 py-1.5 rounded-full bg-white transition-colors cursor-pointer"
              >
                <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                <span>Inspect IHG Philosophy &amp; SLA Guidelines</span>
              </button>
            </div>
          )}
        </div>

        {/* The Open Discovery Intake Form Directly on Landing Page - With Relative Positioning for in-place hotel popup overlay */}
        <div 
          id="discovery-form-card"
          className="relative bg-white rounded-3xl border border-neutral-300 p-5 sm:p-8 shadow-sm font-sans text-xs"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* 1. Persona — compact single row */}
            <div className="flex items-center justify-between gap-4">
              <label className="font-serif text-base text-black font-normal shrink-0">
                Describe your persona
              </label>
              <div className="grid grid-cols-4 gap-2 flex-1 max-w-md">
                {(['Bride', 'Groom', 'Parent', 'Wedding Planner'] as UserPersona[]).map((persona) => {
                  const isSelected = formData.decisionRole === persona;
                  return (
                    <button
                      type="button"
                      key={persona}
                      onClick={() => setFormData({ ...formData, decisionRole: persona })}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
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

            {/* 2. Persona-Specific Dynamic Fields — compact, side by side */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 animate-fade-in">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold mb-3">
                <span aria-hidden="true" className="w-3 h-3 inline-block border border-current"></span>
                <span>Tailored for: {formData.decisionRole}</span>
              </div>

              {/* BRIDE Specific Fields */}
              {formData.decisionRole === 'Bride' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Bride's Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formData.primaryContactName}
                      onChange={(e) => setFormData({ ...formData, primaryContactName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Groom / Partner's Name</label>
                    <input
                      type="text"
                      placeholder="Partner's name"
                      value={formData.partnerName || ''}
                      onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                </div>
              )}

              {/* GROOM Specific Fields */}
              {formData.decisionRole === 'Groom' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Groom's Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Partner's name"
                      value={formData.primaryContactName}
                      onChange={(e) => setFormData({ ...formData, primaryContactName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Bride / Partner's Name</label>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={formData.partnerName || ''}
                      onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                </div>
              )}

              {/* PARENT Specific Fields */}
              {formData.decisionRole === 'Parent' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Parent / Family Representative Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contact name"
                      value={formData.primaryContactName}
                      onChange={(e) => setFormData({ ...formData, primaryContactName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Couple Being Celebrated</label>
                    <input
                      type="text"
                      placeholder="Couple being celebrated"
                      value={formData.coupleReference || ''}
                      onChange={(e) => setFormData({ ...formData, coupleReference: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                </div>
              )}

              {/* WEDDING PLANNER Specific Fields */}
              {formData.decisionRole === 'Wedding Planner' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Lead Wedding Planner Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Planner name"
                      value={formData.primaryContactName}
                      onChange={(e) => setFormData({ ...formData, primaryContactName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Planning Agency / Production Firm</label>
                    <input
                      type="text"
                      placeholder="Agency name"
                      value={formData.planningAgency || ''}
                      onChange={(e) => setFormData({ ...formData, planningAgency: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                </div>
              )}

              {/* Common Contact Fields (Phone & Email) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Phone / Contact Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                  />
                </div>
              </div>
            </div>

            {/* Specific Hotels — native select-style trigger (full width) */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">
                Specific Hotels (Select via Overlay)
              </label>
              <button
                type="button"
                onClick={handleOpenHotelOverlay}
                className="w-full bg-white border border-neutral-300 hover:border-black rounded-xl p-2.5 text-left text-xs text-black flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className={formData.selectedHotelIds?.length ? 'font-medium' : 'text-neutral-400 font-light'}>
                  {formData.selectedHotelIds?.length
                    ? `${formData.selectedHotelIds.length} propert${formData.selectedHotelIds.length > 1 ? 'ies' : 'y'} selected`
                    : 'Choose properties'}
                </span>
                <span className="flex items-center space-x-1.5 shrink-0">
                  {formData.selectedHotelIds?.length > 0 && (
                    <span className="text-[10px] text-neutral-400 font-light max-w-[140px] truncate">
                      {formData.selectedHotelNames?.slice(0, 2).join(', ')}{formData.selectedHotelIds.length > 2 ? '…' : ''}
                    </span>
                  )}
                  <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
                </span>
              </button>
            </div>

            {/* 5 & 6. Guests + Celebration Window — single-line row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* No of Guests */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">
                  No of Guests
                </label>
                <select
                  value={formData.guestRange}
                  onChange={(e) => handleRangeChange(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black cursor-pointer font-medium"
                >
                  {guestRanges.map((range) => (
                    <option key={range.label} value={range.label}>
                      {range.label} guests
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Celebration Window */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">
                  Celebration Window
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="date"
                    required
                    min="2025-01-01"
                    max="2028-12-31"
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 text-xs text-black font-medium focus:outline-none focus:border-black cursor-pointer"
                  />
                  <input
                    type="date"
                    required
                    min={startDate || '2025-01-01'}
                    max="2028-12-31"
                    value={endDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 text-xs text-black font-medium focus:outline-none focus:border-black cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Consent Checkboxes — mandatory terms + optional marketing/WhatsApp */}
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
                  I consent to sharing my phone number so the IHG Team can contact me via WhatsApp or email. <span className="text-[10px] uppercase tracking-wider text-neutral-500">(Optional)</span>
                </span>
              </label>
            </div>

            {/* Single Full-Width Action Button (Instant connect via WhatsApp removed) */}
            <div className="pt-4 border-t border-neutral-200">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black hover:bg-neutral-800 text-white py-4 rounded-xl font-medium tracking-wider uppercase text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
              >
                <span>{submitting ? "Submitting Inquiry..." : "Submit Inquiry to Wedding Director"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

          {/* Interactive Hotel Selector Popup Overlay Directly Aligned and Positioned Over the Form */}
          <HotelSelectorModal
            isOpen={hotelModalOpen}
            selectedHotelIds={formData.selectedHotelIds || []}
            onClose={() => setHotelModalOpen(false)}
            onConfirmSelection={handleHotelSelectionSaved}
          />
        </div>

        {/* Subtle Assurance Indicators */}
        <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-center gap-6 text-[11px] font-sans text-neutral-500 font-light">
          <span className="flex items-center space-x-1.5">
            <span aria-hidden="true" className="w-3.5 h-3.5 inline-block border border-current"></span>
            <span>Dedicated Director Assignment</span>
          </span>
          <span>•</span>
          <span>Multi-Location Hold Capability</span>
          <span>•</span>
          <span>Confidentiality &amp; NDA Enforced</span>
        </div>

      </div>
    </section>
  );
};
