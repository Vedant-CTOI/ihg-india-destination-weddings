import React, { useState, useEffect } from 'react';
import { PageView, InquiryFormData, LegalTab } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutUs } from './components/AboutUs';
import { DestinationDiscovery } from './components/DestinationDiscovery';
import { HotelsExploration } from './components/HotelsExploration';
import { RealWeddings } from './components/RealWeddings';
import { FaqSection } from './components/FaqSection';
import { DiscoveryForm } from './components/DiscoveryForm';
import { EnquiryConsentFlowModal } from './components/EnquiryConsentFlowModal';
import { Footer } from './components/Footer';

// Standalone Full-Page Views (NO POPUPS)
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { GenreDetailPage } from './pages/GenreDetailPage';
import { AllHotelsPage } from './pages/AllHotelsPage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { AllStoriesPage } from './pages/AllStoriesPage';
import { ConversationPage } from './pages/ConversationPage';
import { PlanningCharterPage } from './pages/PlanningCharterPage';
import { LegalInfoPage } from './pages/LegalInfoPage';

export const App: React.FC = () => {
  // Navigation state (Default is home)
  const [currentView, setCurrentView] = useState<PageView>({ type: 'home' });

  // Post-submission Consent & Notification popup states
  const [pendingInquiryData, setPendingInquiryData] = useState<InquiryFormData | null>(null);
  const [consentFlowStep, setConsentFlowStep] = useState<'none' | 'consent' | 'notification'>('none');

  // Scroll to top whenever navigating to a separate page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigateHome = (anchor?: string) => {
    setCurrentView({ type: 'home' });
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleNavigateToGenre = (genreId: string) => {
    setCurrentView({ type: 'genre-detail', genreId });
  };

  const handleNavigateToDestination = (destinationId: string) => {
    setCurrentView({ type: 'destination-detail', destinationId });
  };

  const handleNavigateToAllHotels = (city?: string) => {
    setCurrentView({ type: 'all-hotels', selectedCity: city });
  };

  const handleNavigateToHotel = (hotelId: string) => {
    setCurrentView({ type: 'hotel-detail', hotelId });
  };

  const handleNavigateToStory = (storyId: string) => {
    setCurrentView({ type: 'story-detail', storyId });
  };

  const handleNavigateToAllStories = (category?: string) => {
    setCurrentView({ type: 'all-stories', selectedCategory: category });
  };

  const handleNavigateToCharter = () => {
    setCurrentView({ type: 'planning-charter' });
  };

  const handleNavigateToLegal = (tab: LegalTab = 'terms') => {
    setCurrentView({ type: 'legal-info', initialTab: tab });
  };

  const handleNavigateToConversation = (prefilledDestination?: string, prefilledHotel?: string) => {
    if (currentView.type === 'home') {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    setCurrentView({ type: 'conversation', prefilledDestination, prefilledHotel });
  };

  // Called when user submits the inquiry form:
  // Step 1: Open the Consent Form Popup
  const handleFormSubmitted = (data: InquiryFormData) => {
    setPendingInquiryData(data);
    setConsentFlowStep('consent');
  };

  // Step 2: User accepts consent form popup -> Transition to notification popup
  const handleAcceptConsent = () => {
    setConsentFlowStep('notification');
  };

  // User cancels/goes back from consent form popup
  const handleCancelConsent = () => {
    setConsentFlowStep('none');
  };

  // Step 3: User acknowledges the notification popup -> Return back to exploration smoothly
  const handleAcknowledgeNotification = () => {
    setConsentFlowStep('none');
    setPendingInquiryData(null);
    handleNavigateHome();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2937] font-body">
      
      {/* 1. Main Sticky Header */}
      <Header
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onNavigateToCharter={handleNavigateToCharter}
        onNavigateToConversation={() => handleNavigateToConversation()}
      />

      {/* 2. Page View Routing */}
      <main className="flex-grow">
        {currentView.type === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section (Splash Screen Carousel) */}
            <HeroSection />

            {/* About Us — IHG Weddings */}
            <AboutUs />

            {/* Section 1: Discover by Genre */}
            <DestinationDiscovery
              onOpenDetail={(genre) => handleNavigateToGenre(genre.id)}
            />

            {/* Section 2: Hotels & Sanctuaries Exploration */}
            <HotelsExploration
              onSelectHotel={(hotel) => handleNavigateToHotel(hotel.id)}
              onViewAll={() => handleNavigateToAllHotels()}
            />

            {/* Section 3: Real Weddings Cultural Confluence */}
            <RealWeddings
              onSelectStory={(wedding) => handleNavigateToStory(wedding.id)}
              onViewAllStories={() => handleNavigateToAllStories()}
            />

            {/* Section 4: Frequently Asked Questions */}
            <FaqSection
              onOpenAllFaqs={() => handleNavigateToLegal('faq')}
            />

            {/* Section 5: Begin the Conversation Form */}
            <DiscoveryForm
              onSubmitSuccess={handleFormSubmitted}
              onOpenConversationPage={() => handleNavigateToConversation()}
              onOpenCharter={handleNavigateToCharter}
            />
          </div>
        )}

        {/* Separate Page 1: Wedding Genre Atmosphere & Property List Page */}
        {currentView.type === 'genre-detail' && (
          <GenreDetailPage
            genreId={currentView.genreId}
            onNavigateBack={() => handleNavigateHome('destinations')}
            onNavigateToHotel={handleNavigateToHotel}
            onNavigateToInquiry={(name) => handleNavigateToConversation(name)}
          />
        )}

        {/* Separate Page 1b: Destination Genre Dossier Page */}
        {currentView.type === 'destination-detail' && (
          <DestinationDetailPage
            destinationId={currentView.destinationId}
            onNavigateBack={() => handleNavigateHome('destinations')}
            onNavigateToHotel={handleNavigateToHotel}
            onNavigateToInquiry={(name) => handleNavigateToConversation(name)}
          />
        )}

        {/* Separate Page 2: All Hotels Page with top Cities in India filter, popup preview overlay & direct full-page opening */}
        {currentView.type === 'all-hotels' && (
          <AllHotelsPage
            initialCity={currentView.selectedCity || 'All Cities'}
            onNavigateBack={() => handleNavigateHome('hotels-exploration')}
            onNavigateToInquiry={(hotelName) => handleNavigateToConversation(undefined, hotelName)}
            onNavigateToHotelDetail={handleNavigateToHotel}
          />
        )}

        {/* Separate Page 3: Comprehensive Hotel Page with About Us, Venue 1/2/3 Galleries, and embedded Begin the Conversation Form on the Right */}
        {currentView.type === 'hotel-detail' && (
          <HotelDetailPage
            hotelId={currentView.hotelId}
            onNavigateBack={() => handleNavigateHome('hotels-exploration')}
            onNavigateToInquiry={(name) => handleNavigateToConversation(undefined, name)}
            onSubmitSuccess={handleFormSubmitted}
          />
        )}

        {/* Separate Page 4: All Real Weddings Page */}
        {currentView.type === 'all-stories' && (
          <AllStoriesPage
            initialCategory={currentView.selectedCategory || 'All'}
            onNavigateBack={() => handleNavigateHome('real-weddings')}
            onSelectStory={handleNavigateToStory}
          />
        )}

        {/* Separate Page 5: Comprehensive Real Wedding Case Study Page */}
        {currentView.type === 'story-detail' && (
          <StoryDetailPage
            storyId={currentView.storyId}
            onNavigateBack={() => handleNavigateToAllStories()}
            onNavigateToInquiry={(title) => handleNavigateToConversation(undefined, title)}
          />
        )}

        {/* Separate Page 6: Dedicated 'Begin the Conversation' Full Intake Page */}
        {currentView.type === 'conversation' && (
          <ConversationPage
            prefilledDestination={currentView.prefilledDestination}
            prefilledHotel={currentView.prefilledHotel}
            onNavigateBack={() => handleNavigateHome('contact')}
            onSubmitSuccess={handleFormSubmitted}
            onOpenCharter={handleNavigateToCharter}
          />
        )}

        {/* Separate Page 7: Official Luxury Wedding Charter & Protocol Page */}
        {currentView.type === 'planning-charter' && (
          <PlanningCharterPage
            onNavigateBack={() => handleNavigateHome('contact')}
            onProceedToForm={() => handleNavigateToConversation()}
          />
        )}

        {/* Separate Page 8: Dedicated Terms & Conditions, Privacy Policy & FAQ Page */}
        {currentView.type === 'legal-info' && (
          <LegalInfoPage
            initialTab={currentView.initialTab || 'terms'}
            onNavigateBack={() => handleNavigateHome()}
            onNavigateToInquiry={() => handleNavigateHome('contact')}
          />
        )}
      </main>

      {/* 3. Footer with Terms, Privacy Policy, and FAQ Links */}
      <Footer
        onNavigateToLegal={handleNavigateToLegal}
        onNavigateToCharter={handleNavigateToCharter}
      />

      {/* 4. Two-Step Post-Submission Flow: Consent Form Popup -> Notification of Registration Popup */}
      <EnquiryConsentFlowModal
        isOpen={consentFlowStep !== 'none'}
        step={consentFlowStep}
        data={pendingInquiryData}
        onAcceptConsent={handleAcceptConsent}
        onCancelConsent={handleCancelConsent}
        onAcknowledgeNotification={handleAcknowledgeNotification}
      />

    </div>
  );
};

export default App;
