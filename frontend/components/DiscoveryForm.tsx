import React, { useState } from 'react';
import { InquiryFormData, UserPersona } from '../types';
import { HOTELS_DATA } from '../constants';
import { HotelSelectorModal } from './HotelSelectorModal';
import { ArrowRight, ShieldCheck, Check, Sparkles, Calendar, Clock, Building2, Plus } from 'lucide-react';

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

  const [formData, setFormData] = useState<InquiryFormData>({
    primaryContactName: '',
    email: '',
    phone: '',
    decisionRole: 'Bride',
    destinations: ['Royal Wedding: Rajasthan (Jaipur & Ranthambore)'],
    selectedHotelIds: ['six-senses-fort-barwara'],
    selectedHotelNames: ['Six Senses Fort Barwara'],
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    targetWindow: formatWindowString(defaultStartDate, defaultEndDate),
    guestRange: 'Mid-Sized Celebration (150 – 350 guests)',
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

  // Available Indian destinations by genre for multi-select
  const destinationOptions = [
    'Royal Wedding: Rajasthan (Jaipur & Ranthambore)',
    'Beachside: Goa Coastal Coastline',
    'Mountain & Wilderness: Corbett Foothills',
    'Temple Shoreline: Mahabalipuram & Coromandel',
    'Backwater Serenity: Kerala Backwaters & Kochi'
  ];

  const guestRanges = [
    { label: 'Intimate Gathering (50 – 150 guests)', defaultCount: 120 },
    { label: 'Mid-Sized Celebration (150 – 350 guests)', defaultCount: 250 },
    { label: 'Grand Destination (350 – 650 guests)', defaultCount: 450 },
    { label: 'Monumental Royal (650 – 1,500+ guests)', defaultCount: 850 }
  ];

  const toggleDestination = (dest: string) => {
    setFormData((prev) => {
      const exists = prev.destinations.includes(dest);
      if (exists) {
        if (prev.destinations.length === 1) return prev;
        return { ...prev, destinations: prev.destinations.filter((d) => d !== dest) };
      } else {
        return { ...prev, destinations: [...prev.destinations, dest] };
      }
    });
  };

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
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Inspect Wedding Charter &amp; SLA Guidelines</span>
              </button>
            </div>
          )}
        </div>

        {/* The Open Discovery Intake Form Directly on Landing Page - With Relative Positioning for in-place hotel popup overlay */}
        <div 
          id="discovery-form-card"
          className="relative bg-white rounded-3xl border border-neutral-300 p-6 sm:p-12 shadow-sm font-sans text-xs min-h-[700px]"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Describe your persona */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-serif text-lg text-black font-normal">
                  Describe your persona
                </label>
                <span className="text-[11px] text-neutral-400 font-light">
                  Input fields adjust based on your role
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['Bride', 'Groom', 'Parent', 'Wedding Planner'] as UserPersona[]).map((persona) => {
                  const isSelected = formData.decisionRole === persona;
                  return (
                    <button
                      type="button"
                      key={persona}
                      onClick={() => setFormData({ ...formData, decisionRole: persona })}
                      className={`py-3 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-black bg-black text-white font-medium shadow-2xs'
                          : 'border-neutral-200 text-neutral-700 hover:border-black bg-neutral-50'
                      }`}
                    >
                      <span className="block text-xs">{persona}</span>
                      <span className={`text-[10px] block opacity-70 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {persona === 'Parent' ? 'Father / Mother' : persona === 'Wedding Planner' ? 'Agency Lead' : 'Couple'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Persona-Specific Dynamic Fields */}
            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4 animate-fade-in">
              <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-black" />
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
                      placeholder="e.g. Meera Singhania"
                      value={formData.primaryContactName}
                      onChange={(e) => setFormData({ ...formData, primaryContactName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Groom / Partner's Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Siddharth Kapur"
                      value={formData.partnerName || ''}
                      onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-neutral-600 mb-1 font-medium">Bridal Suite, Vanity &amp; Sanctuary Privacy Preferences</label>
                    <input
                      type="text"
                      placeholder="e.g. Dual bridal dressing suite with natural daylight, private garden access for family portraits"
                      value={formData.bridalStylingNeeds || ''}
                      onChange={(e) => setFormData({ ...formData, bridalStylingNeeds: e.target.value })}
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
                      placeholder="e.g. Siddharth Kapur"
                      value={formData.primaryContactName}
                      onChange={(e) => setFormData({ ...formData, primaryContactName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Bride / Partner's Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Meera Singhania"
                      value={formData.partnerName || ''}
                      onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-neutral-600 mb-1 font-medium">Baraat Procession &amp; Arrival Protocol</label>
                    <input
                      type="text"
                      placeholder="e.g. Vintage open-top car, acoustic live brass band + dholis, 60-min processional route"
                      value={formData.baraatSpec || ''}
                      onChange={(e) => setFormData({ ...formData, baraatSpec: e.target.value })}
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
                      placeholder="e.g. Ramesh Singhania (Father of Bride)"
                      value={formData.primaryContactName}
                      onChange={(e) => setFormData({ ...formData, primaryContactName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Couple Being Celebrated</label>
                    <input
                      type="text"
                      placeholder="e.g. Meera &amp; Siddharth"
                      value={formData.coupleReference || ''}
                      onChange={(e) => setFormData({ ...formData, coupleReference: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-neutral-600 mb-1 font-medium">Elder Comfort, Golf Cart Transit &amp; Traditional Pandit Ritual Needs</label>
                    <input
                      type="text"
                      placeholder="e.g. Step-free access for grandparents, golf buggy fleet to mandap, 05:30 AM sunrise muhurtham setup"
                      value={formData.elderAccessibilityNeeds || ''}
                      onChange={(e) => setFormData({ ...formData, elderAccessibilityNeeds: e.target.value })}
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
                      placeholder="e.g. Sonam Verma"
                      value={formData.primaryContactName}
                      onChange={(e) => setFormData({ ...formData, primaryContactName: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1 font-medium">Planning Agency / Production Firm</label>
                    <input
                      type="text"
                      placeholder="e.g. Artisan Celebrations LLP"
                      value={formData.planningAgency || ''}
                      onChange={(e) => setFormData({ ...formData, planningAgency: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-neutral-600 mb-1 font-medium">Client Family Reference &amp; Production Staging Requirements</label>
                    <input
                      type="text"
                      placeholder="e.g. Singhania–Kapur Wedding; Requires 24-hr load-in for kinetic LED stage and sound isolation"
                      value={formData.vendorProductionNotes || ''}
                      onChange={(e) => setFormData({ ...formData, vendorProductionNotes: e.target.value })}
                      className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black"
                    />
                  </div>
                </div>
              )}

              {/* Common Contact Fields (Phone & Email) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <label className="block text-neutral-600 mb-1 font-medium">Phone / Contact Number *</label>
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
                  <label className="block text-neutral-600 mb-1 font-medium">Official Email Address *</label>
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

            {/* 3. MULTI-SELECT LOCATIONS BY GENRE */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-serif text-lg text-black font-normal">
                  Preferred Sanctuary Genres &amp; Locations (Select Multiple)
                </label>
                <span className="text-[11px] text-neutral-400 font-light">
                  {formData.destinations.length} location{formData.destinations.length > 1 ? 's' : ''} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {destinationOptions.map((dest) => {
                  const isSelected = formData.destinations.includes(dest);
                  return (
                    <button
                      type="button"
                      key={dest}
                      onClick={() => toggleDestination(dest)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-black bg-black text-white shadow-2xs'
                          : 'border-neutral-200 hover:border-black bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      <span className="text-xs font-medium pr-2">{dest}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-white bg-white text-black'
                            : 'border-neutral-300 text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. CHOOSE HOTELS FROM ALL PROPERTIES VIA POPUP OVERLAY */}
            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="font-serif text-lg text-black font-normal flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-black" />
                    <span>Choose Specific Hotels &amp; Palaces</span>
                  </label>
                  <p className="text-[11px] text-neutral-500 font-light mt-0.5">
                    Browse and select properties across India via our interactive portfolio overlay.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenHotelOverlay}
                  className="bg-black hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium flex items-center justify-center space-x-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-2xs shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Choose Hotels Overlay</span>
                </button>
              </div>

              {/* Selected Hotels Chips */}
              {formData.selectedHotelIds && formData.selectedHotelIds.length > 0 ? (
                <div className="pt-2 border-t border-neutral-200">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                    Selected Properties ({formData.selectedHotelIds.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedHotelIds.map((id) => {
                      const h = HOTELS_DATA.find((item) => item.id === id);
                      if (!h) return null;
                      return (
                        <div
                          key={h.id}
                          className="bg-white border border-neutral-300 rounded-full px-3 py-1 flex items-center space-x-2 text-xs text-black shadow-2xs"
                        >
                          <span className="font-medium">{h.name}</span>
                          <span className="text-[10px] text-neutral-400">({h.city})</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveHotel(h.id)}
                            className="text-neutral-400 hover:text-black cursor-pointer ml-1"
                            title="Remove property"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="pt-2 text-xs text-neutral-500 font-light italic">
                  No specific properties picked yet. Click "Choose Hotels Overlay" above to select.
                </div>
              )}
            </div>

            {/* 5. NO OF GUESTS */}
            <div className="space-y-2">
              <label className="font-serif text-lg text-black font-normal block">
                No of Guests
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                    Select Guest Scale / Range Preset:
                  </label>
                  <select
                    value={formData.guestRange}
                    onChange={(e) => handleRangeChange(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black cursor-pointer font-medium"
                  >
                    {guestRanges.map((range) => (
                      <option key={range.label} value={range.label}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                    Approximate Attendees:
                  </label>
                  <input
                    type="number"
                    min="25"
                    max="2000"
                    placeholder="Guest Count"
                    value={formData.estimatedGuests}
                    onChange={(e) => setFormData({ ...formData, estimatedGuests: Number(e.target.value) })}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 focus:outline-none focus:border-black text-xs text-black font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 6. TARGET CELEBRATION WINDOW */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-serif text-lg text-black font-normal block">
                  Target Celebration Window
                </label>
                <span className="text-[11px] text-neutral-400 font-light flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Calendar Date Selection</span>
                </span>
              </div>

              {/* Dual Date Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200">
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    <span>From Date (Day / Month / Year):</span>
                  </label>
                  <input
                    type="date"
                    required
                    min="2025-01-01"
                    max="2028-12-31"
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 text-xs text-black font-medium focus:outline-none focus:border-black cursor-pointer"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block font-light">
                    Commencement / Arrival Date
                  </span>
                </div>

                <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200">
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    <span>To Date (Day / Month / Year):</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={startDate || '2025-01-01'}
                    max="2028-12-31"
                    value={endDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-2.5 text-xs text-black font-medium focus:outline-none focus:border-black cursor-pointer"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block font-light">
                    Conclusion / Farewell Date
                  </span>
                </div>
              </div>

              {/* Live Formatted Summary Badge */}
              <div className="p-3 bg-neutral-100 rounded-xl border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-700">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
                    Celebration Window:
                  </span>
                  <span className="font-serif font-medium text-black text-sm">
                    {formData.targetWindow}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 hidden sm:inline">
                  Auspicious dates confirmed with Director
                </span>
              </div>
            </div>

            {/* 7. Notes & Dietary Safeguards */}
            <div>
              <label className="font-serif text-lg text-black font-normal block mb-1.5">
                Ceremony Notes &amp; Dietary Safeguards
              </label>
              <textarea
                rows={3}
                placeholder="Share any special Pandit preferences, strict Jain kitchen mandates, or specific sacred dates you have blocked..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full border border-neutral-300 rounded-xl p-3 focus:outline-none focus:border-black resize-none text-xs text-black"
              />
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
            <Sparkles className="w-3.5 h-3.5 text-black" />
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
