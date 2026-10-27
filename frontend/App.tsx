import React, { useState, useEffect, useRef } from 'react';
import { PageView, InquiryFormData, LegalTab } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WebMotionDirector, PALETTE } from './components/webMotion';
import { useMobileLayout } from './components/useMobileLayout';
import { AboutUs } from './components/AboutUs';
import { DestinationDiscovery } from './components/DestinationDiscovery';
import { HotelsExploration } from './components/HotelsExploration';
import { RealWeddings } from './components/RealWeddings';
import { DiscoveryForm } from './components/DiscoveryForm';
import { EnquiryConsentFlowModal } from './components/EnquiryConsentFlowModal';
import { Footer } from './components/Footer';

// Standalone Full-Page Views (NO POPUPS)
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { GenreDetailPage } from './pages/GenreDetailPage';
import { GenreListingPage } from './pages/GenreListingPage';
import { AllHotelsPage } from './pages/AllHotelsPage';
import { AboutPage } from './pages/AboutPage';
import { LoremIpsumPage } from './pages/LoremIpsumPage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { AllStoriesPage } from './pages/AllStoriesPage';
import { ConversationPage } from './pages/ConversationPage';
import { SitemapPage } from './pages/SitemapPage';
import { LegalInfoPage } from './pages/LegalInfoPage';
import { GoToTopButton } from './components/GoToTopButton';

export const App: React.FC = () => {
  // Navigation state (Default is home)
  const [currentView, setCurrentView] = useState<PageView>({ type: 'home' });

  // --- Client commenting system (prototype-only overlay) ---
  // Tracks which genre the homepage carousel is currently showing (for header nav)
  const genreIndexRef = useRef<number>(0);
  // Re-render the layer when a comment is added outside React state (e.g. screenshot attach)

  // Post-submission Consent & Notification popup states
  const mobileLayout = useMobileLayout(); // Web/Mobile toggle — web-only landing styling keys off this
  const [pendingInquiryData, setPendingInquiryData] = useState<InquiryFormData | null>(null);
  const [consentFlowStep, setConsentFlowStep] = useState<'none' | 'notification'>('none');

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

  const handleNavigateToGenreListing = () => {
    setCurrentView({ type: 'genre-listing' });
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

  const handleNavigateToAboutPage = () => {
    setCurrentView({ type: 'about-page' });
  };

  const handleNavigateToLoremPage = () => {
    setCurrentView({ type: 'lorem-page' });
  };

  const handleNavigateToLegal = (tab: LegalTab = 'terms') => {
    setCurrentView({ type: 'legal-info', initialTab: tab });
  };

  const handleNavigateToConversation = (prefilledDestination?: string, prefilledHotel?: string) => {
    // Always open the dedicated Conversation (lead form) page — no inline scroll on home
    setCurrentView({ type: 'conversation', prefilledDestination, prefilledHotel });
  };

  // Called when user submits the inquiry form:
  // Step 1: Open the Consent Form Popup
  const handleFormSubmitted = (data: InquiryFormData) => {
    setPendingInquiryData(data);
    setConsentFlowStep('notification');
  };

  // User acknowledges the notification popup -> Return back to exploration smoothly
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
        onNavigateToConversation={() => handleNavigateToConversation()}
        onNavigateToAboutPage={handleNavigateToAboutPage}
        onNavigateToGenre={handleNavigateToGenreListing}
        onNavigateToAllHotels={() => handleNavigateToAllHotels()}
        onNavigateToAllStories={() => handleNavigateToAllStories()}
        onNavigateToLoremPage={handleNavigateToLoremPage}
      />

      {/* 2. Page View Routing */}
      <main className="flex-grow">
        {currentView.type === 'about-page' && (
          <AboutPage
            onNavigateBack={() => handleNavigateHome()}
            onNavigateToInquiry={() => handleNavigateToConversation()}
          />
        )}

        {currentView.type === 'lorem-page' && (
          <LoremIpsumPage
            onNavigateBack={() => handleNavigateHome()}
          />
        )}

        {currentView.type === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section (Splash Screen Carousel) */}
            <HeroSection />

            {/* About Us — IHG Weddings */}
            <AboutUs onOpenAboutPage={handleNavigateToAboutPage} />

            {/* Section 1: Discover by Genre */}
            <DestinationDiscovery
              onOpenDetail={() => handleNavigateToGenreListing()}
            />

            {/* Section 2: Hotels & Sanctuaries Exploration */}
            <HotelsExploration
              onSelectHotel={(hotel) => handleNavigateToHotel(hotel.id)}
              onViewAll={() => handleNavigateToAllHotels()}
            />

            {/* Section 4: Loyalty Packages teaser */}
            <section className={`loyalty-band ${mobileLayout ? 'max-w-7xl mx-auto border-t border-neutral-200' : ''} px-4 sm:px-6 lg:px-8 py-14`} data-tone={!mobileLayout ? 'light' : undefined} style={!mobileLayout ? { backgroundColor: PALETTE.saffron } : undefined}>
              <div data-wm={!mobileLayout ? '' : undefined} className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
                    Loyalty Packages
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed max-w-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleNavigateToLoremPage}
                  className="inline-flex items-center space-x-2 text-[11px] font-sans uppercase tracking-wider bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-full transition-colors font-medium cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <span>View Loyalty Packages</span>
                </button>
              </div>
            </section>

            {/* Section 3: Real Weddings Cultural Confluence */}
            <RealWeddings
              onSelectStory={(wedding) => handleNavigateToStory(wedding.id)}
              onViewAllStories={() => handleNavigateToAllStories()}
            />

            {/* Section 5: Begin the Conversation Form */}
            <DiscoveryForm
              onSubmitSuccess={handleFormSubmitted}
              onOpenConversationPage={() => handleNavigateToConversation()}
            />
          </div>
        )}

        {/* Separate Page 0: All Curated Wedding Types (Genre Listing) */}
        {currentView.type === 'genre-listing' && (
          <GenreListingPage
            onNavigateBack={() => handleNavigateHome('destinations')}
            onNavigateToHotelDetail={handleNavigateToHotel}
            onNavigateToDestinationProperties={handleNavigateToAllHotels}
          />
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
          />
        )}

        {/* Separate Page 8: Dedicated Terms & Conditions, Privacy Policy Page */}
        {currentView.type === 'legal-info' && (
          <LegalInfoPage
            initialTab={currentView.initialTab || 'terms'}
            onNavigateBack={() => handleNavigateHome()}
            onNavigateToInquiry={() => handleNavigateHome('contact')}
          />
        )}

        {/* Separate Page 9: Site Map Directory */}
        {currentView.type === 'sitemap' && (
          <SitemapPage
            onNavigateBack={() => handleNavigateHome()}
            onNavigateHome={handleNavigateHome}
            onNavigateToGenre={handleNavigateToGenre}
            onNavigateToAllHotels={() => handleNavigateToAllHotels()}
            onNavigateToHotel={handleNavigateToHotel}
            onNavigateToAllStories={() => handleNavigateToAllStories()}
            onNavigateToStory={handleNavigateToStory}
            onNavigateToConversation={() => handleNavigateToConversation()}
                        onNavigateToLegal={handleNavigateToLegal}
          />
        )}
      </main>

      {/* 3. Footer with Terms, Privacy Policy, and FAQ Links */}
      <Footer
        onNavigateToLegal={handleNavigateToLegal}
                onNavigateToSitemap={() => setCurrentView({ type: 'sitemap' })}
      />

      {/* 4. Two-Step Post-Submission Flow: Consent Form Popup -> Notification of Registration Popup */}
      <EnquiryConsentFlowModal
        isOpen={consentFlowStep !== 'none'}
        step={consentFlowStep}
        data={pendingInquiryData}
        onAcknowledgeNotification={handleAcknowledgeNotification}
      />

      {/* 5. Floating Go-to-Top Button — on all pages */}
      <GoToTopButton />
      <WebMotionDirector />

    </div>
  );
};

export default App;
