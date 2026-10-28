/* STANDALONE HOTEL 1 PAGE (local preview only) — http://localhost:5180/hotel-1.html
   Opens straight onto Hotel 1 (Crowne Plaza Today) in the Web design.
   Reuses the existing page and components; the main site (index.html / App.tsx) is untouched.
   Any link that leaves the hotel page goes to the main site. Delete hotel-1.html + hotel-1.tsx to remove. */
import './vertex-ai-proxy-interceptor.js';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { InquiryFormData } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { EnquiryConsentFlowModal } from './components/EnquiryConsentFlowModal';
import { GoToTopButton } from './components/GoToTopButton';
import { WebMotionDirector } from './components/webMotion';
import { FEATURE_HOTEL_ID } from './components/HotelFeature';

const toMainSite = () => { window.location.href = '/'; };

const Hotel1Standalone: React.FC = () => {
  const [pending, setPending] = useState<InquiryFormData | null>(null);
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2937] font-body">
      <Header
        currentView={{ type: 'hotel-detail', hotelId: FEATURE_HOTEL_ID }}
        onNavigateHome={toMainSite}
        onNavigateToConversation={toMainSite}
        onNavigateToAboutPage={toMainSite}
        onNavigateToGenre={toMainSite}
        onNavigateToAllHotels={toMainSite}
        onNavigateToAllStories={toMainSite}
        onNavigateToLoremPage={toMainSite}
      />
      <main className="flex-grow">
        <HotelDetailPage
          hotelId={FEATURE_HOTEL_ID}
          onNavigateBack={toMainSite}
          onNavigateToInquiry={toMainSite}
          onSubmitSuccess={(data) => setPending(data)}
        />
      </main>
      <Footer onNavigateToLegal={toMainSite} onNavigateToSitemap={toMainSite} />
      {/* same thank-you popup as the main site; acknowledging it returns to the main site */}
      <EnquiryConsentFlowModal
        isOpen={!!pending}
        step={pending ? 'notification' : 'none'}
        data={pending}
        onAcknowledgeNotification={() => { setPending(null); toMainSite(); }}
      />
      <GoToTopButton />
      <WebMotionDirector />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Hotel1Standalone />
  </React.StrictMode>
);
