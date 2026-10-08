import React, { useState } from 'react';
import { LegalTab } from '../types';
import { ArrowLeft, ArrowRight, ShieldCheck, ChevronDown, Check } from 'lucide-react';

interface LegalInfoPageProps {
  initialTab?: LegalTab;
  onNavigateBack: () => void;
  onNavigateToInquiry: () => void;
}

export const LegalInfoPage: React.FC<LegalInfoPageProps> = ({
  initialTab = 'terms',
  onNavigateBack,
  onNavigateToInquiry
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0, 1]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const faqItems = [
    {
      q: 'How far in advance should we block an IHG destination sanctuary for an Indian wedding?',
      a: 'For high-demand auspicious Muhurtham windows (October through March), we recommend reserving 8 to 14 months in advance to secure optimal room inventory blocks, private lawn access, and required ceremonial permits.'
    },
    {
      q: 'How does IHG ensure 100% kitchen segregation for strict Jain and Sattvic dining?',
      a: 'We operate dedicated satellite kitchens completely sealed off from non-vegetarian cooking areas. These kitchens maintain an independent inventory of brass and copper cookware, separate dishwashing machines, and strict zero root vegetable, onion, and garlic standards, certified by visiting family priests.'
    },
    {
      q: 'What is the noise curfew policy for Sangeet afterparties and live DJ performances?',
      a: 'Per statutory regulations in coastal and heritage zones, outdoor acoustic music transitions indoors by 10:00 PM. Our sanctuaries offer acoustically treated, pillarless ballrooms soundproofed up to 98dB, allowing celebration until 03:00 AM without external disruption.'
    },
    {
      q: 'What is the Two-Hour Weather Contingency Guarantee?',
      a: 'Every open-air lawn or beachside mandap reservation includes an automatic pre-reserved, climate-controlled indoor ballroom or glasshouse with mirrored decor readiness, capable of transitioning smoothly within 120 minutes in case of unseasonal rain or wind.'
    },
    {
      q: 'Can we bring our own external wedding planners, pandits, and bridal makeup teams?',
      a: 'Yes. Our on-ground Luxury Wedding Directors work alongside your chosen event planners, family elders, pandits, and production teams, providing direct technical drawings, rigging points, and 24-hour staging access.'
    },
    {
      q: 'What privacy protocols are in place for high-profile weddings and dignitaries?',
      a: 'We offer comprehensive Non-Disclosure Agreements (NDAs) enforced across all hotel staff, dedicated private charter airport arrival gates, secure elevator keycards, and restricted guest floor access.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">
      
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Exploration</button>
            <span>/</span>
            <span className="text-black font-medium">
              {activeTab === 'terms' ? 'Terms & Conditions' : activeTab === 'privacy' ? 'Privacy Policy' : 'Frequently Asked Questions'}
            </span>
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block">
            Institutional Trust &amp; Governance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-black leading-tight">
            Legal, Privacy &amp; FAQs
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-2xl leading-relaxed">
            Review the contractual standards, ceremonial safeguards, guest data privacy protocols, and frequently asked operational questions across all IHG Hotels &amp; Resorts in India.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex space-x-2 border-b border-neutral-200 pb-3 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-5 py-2 rounded-xl text-xs font-sans uppercase tracking-wider font-medium transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-black text-white shadow-xs'
                : 'bg-neutral-50 border border-neutral-200 text-neutral-700 hover:border-black'
            }`}
          >
            Terms &amp; Conditions
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-5 py-2 rounded-xl text-xs font-sans uppercase tracking-wider font-medium transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-black text-white shadow-xs'
                : 'bg-neutral-50 border border-neutral-200 text-neutral-700 hover:border-black'
            }`}
          >
            Privacy Policy
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`px-5 py-2 rounded-xl text-xs font-sans uppercase tracking-wider font-medium transition-all cursor-pointer ${
              activeTab === 'faq'
                ? 'bg-black text-white shadow-xs'
                : 'bg-neutral-50 border border-neutral-200 text-neutral-700 hover:border-black'
            }`}
          >
            Frequently Asked Questions
          </button>
        </div>

        {/* TAB 1: TERMS & CONDITIONS */}
        {activeTab === 'terms' && (
          <div className="space-y-8 animate-fade-in text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
            
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 block">
                Contractual Framework
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-black">
                Ceremonial Booking &amp; Venue Engagement Terms
              </h2>
              <p className="text-xs text-neutral-500">
                Last updated: January 2025 • Applicable across all IHG Destination Properties in India.
              </p>
            </div>

            <section className="space-y-3">
              <h3 className="font-serif text-lg font-normal text-black">1. Reservation &amp; Room Block Allocation</h3>
              <p>
                Auspicious celebration dates are officially secured upon execution of the formal Destination Wedding Agreement and receipt of the initial advance commitment deposit. Room inventory blocks for guest entourages are held with agreed cutoff timelines, after which unconfirmed allocations return to general sanctuary availability.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-serif text-lg font-normal text-black">2. Sacred Vedic Fire (Havan) &amp; Fire Safety Protocol</h3>
              <p>
                All indoor and outdoor sacred Vedic fire rituals must be conducted within IHG-approved, fire-certified stone hearths and consecrated zones. Airflow dampers, fire suppression standbys, and certified ceremony attendants are mandatory provisions coordinated directly with your presiding pandit.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-serif text-lg font-normal text-black">3. Sound Regulations &amp; Outdoor Acoustic Curfew</h3>
              <p>
                In compliance with municipal and environmental guidelines, amplified outdoor music on lawns and beachfront decks must cease at 10:00 PM. High-energy musical performances, Sangeet parties, and DJ sets may continue seamlessly past this hour inside our acoustically insulated pillarless ballrooms.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-serif text-lg font-normal text-black">4. External Production &amp; Vendor Access</h3>
              <p>
                Couples may engage certified external event production houses, floral artisans, and decor teams. Production partners must complete an on-site safety induction, adhere to load-in/load-out schedules, and comply with structural ceiling weight limits.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-serif text-lg font-normal text-black">5. Cancellation &amp; Force Majeure Provisions</h3>
              <p>
                In the event of unforeseen natural events, travel restrictions, or force majeure occurrences, IHG provides transparent rescheduling rights to alternate mutually agreed dates within a 12-month period without loss of primary commitment deposits.
              </p>
            </section>

          </div>
        )}

        {/* TAB 2: PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <div className="space-y-8 animate-fade-in text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
            
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 block">
                Data Protection
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-black">
                Guest Privacy &amp; Dignitary Confidentiality Policy
              </h2>
              <p className="text-xs text-neutral-500">
                InterContinental Hotels Group PLC • India Wedding Division.
              </p>
            </div>

            <section className="space-y-3">
              <h3 className="font-serif text-lg font-normal text-black">1. Information We Collect</h3>
              <p>
                When you initiate an inquiry via our Discovery Intake form or direct director concierge, we collect your primary contact details (name, email, phone number), wedding role persona, estimated guest scale, preferred destinations, and specific dietary or ceremonial requirements.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-serif text-lg font-normal text-black">2. Use of Information</h3>
              <p>
                Your celebration data is utilized exclusively by assigned IHG Destination Directors and sanctuary executive chefs to check room availability, curate bespoke floorplans, verify dietary custody, and prepare formal pricing dossiers. We never sell, rent, or trade family information to third-party commercial marketing brokers.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-serif text-lg font-normal text-black">3. Dignitary Confidentiality &amp; Staff NDAs</h3>
              <p>
                For high-profile ceremonies requiring absolute privacy, we enforce strict Non-Disclosure Agreements across all sanctuary staff and contractors. Unauthorized mobile photography, guest list dissemination, or social media publishing by hotel personnel is strictly prohibited.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-serif text-lg font-normal text-black">4. Data Security &amp; Retention</h3>
              <p>
                All personal and celebration details submitted through this platform are encrypted via industry-standard protocols. Inquiries that do not materialize into confirmed reservations are securely archived or purged in accordance with our institutional retention schedule.
              </p>
            </section>

          </div>
        )}

        {/* TAB 3: FREQUENTLY ASKED QUESTIONS (FAQ) */}
        {activeTab === 'faq' && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 block">
                Operational Guidance
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-black">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-neutral-500">
                Clear answers to common questions regarding logistics, catering, timings, and property reservations.
              </p>
            </div>

            <div className="space-y-3">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndices.includes(idx);
                return (
                  <div
                    key={idx}
                    className="border border-neutral-200 rounded-2xl overflow-hidden transition-all bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                    >
                      <span className="font-serif text-base font-normal text-black">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed border-t border-neutral-100">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* Bottom CTA to Enquire */}
        <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-normal text-black">
              Have specific legal or dietary questions?
            </h3>
            <p className="text-xs text-neutral-500 font-light">
              Speak directly with an assigned IHG Destination Director for customized addendums.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToInquiry}
            className="bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium px-6 py-3 rounded-full transition-colors flex items-center space-x-2 shrink-0 cursor-pointer shadow-xs"
          >
            <span>Proceed to Inquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
